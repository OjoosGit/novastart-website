/**
 * Rate Limiting Utility
 * 
 * Eenvoudige in-memory rate limiter voor API endpoints.
 * Voor productie met meerdere servers: gebruik Upstash Redis of Vercel KV
 * 
 * Installeer voor productie:
 * npm install @upstash/redis @upstash/ratelimit
 */

interface RateLimitStore {
  count: number;
  resetTime: number;
}

// In-memory store (wordt gereset bij deployment)
const store = new Map<string, RateLimitStore>();

// Cleanup oude entries elke 10 minuten
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of store.entries()) {
      if (value.resetTime < now) {
        store.delete(key);
      }
    }
  }, 10 * 60 * 1000);
}

interface RateLimitOptions {
  /** Maximaal aantal requests */
  limit: number;
  /** Tijdvenster in milliseconden */
  window: number;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Rate limiter op basis van identifier (bijv. IP adres)
 */
export async function rateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 5, window: 60 * 60 * 1000 } // Default: 5 per uur
): Promise<RateLimitResult> {
  const now = Date.now();
  const key = `rate_limit:${identifier}`;
  
  const existing = store.get(key);
  
  // Als geen entry of reset tijd verstreken, maak nieuwe entry
  if (!existing || existing.resetTime < now) {
    const resetTime = now + options.window;
    store.set(key, { count: 1, resetTime });
    
    return {
      success: true,
      limit: options.limit,
      remaining: options.limit - 1,
      reset: resetTime,
    };
  }
  
  // Als limiet bereikt
  if (existing.count >= options.limit) {
    return {
      success: false,
      limit: options.limit,
      remaining: 0,
      reset: existing.resetTime,
    };
  }
  
  // Verhoog counter
  existing.count++;
  store.set(key, existing);
  
  return {
    success: true,
    limit: options.limit,
    remaining: options.limit - existing.count,
    reset: existing.resetTime,
  };
}

/**
 * Haal IP adres uit request
 */
export function getClientIp(request: Request): string {
  // Probeer verschillende headers (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  return 'unknown';
}

/*
 * PRODUCTIE IMPLEMENTATIE MET UPSTASH REDIS:
 * 
 * import { Ratelimit } from "@upstash/ratelimit";
 * import { Redis } from "@upstash/redis";
 * 
 * const redis = Redis.fromEnv();
 * 
 * export const ratelimit = new Ratelimit({
 *   redis,
 *   limiter: Ratelimit.slidingWindow(5, "1 h"),
 *   analytics: true,
 *   prefix: "novastart",
 * });
 * 
 * // Gebruik in API route:
 * const { success, limit, reset, remaining } = await ratelimit.limit(ip);
 */

