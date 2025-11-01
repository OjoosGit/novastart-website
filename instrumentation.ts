/**
 * Next.js Instrumentation
 * Dit bestand wordt uitgevoerd wanneer de Next.js server start
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Importeer en valideer environment variables
    const { validateEnv } = await import('./lib/env');
    validateEnv();
  }
}

