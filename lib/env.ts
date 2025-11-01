import { z } from 'zod';

/**
 * Environment Variables Validatie
 * 
 * Dit bestand valideert alle environment variables bij build/runtime
 * om ervoor te zorgen dat de applicatie correct is geconfigureerd.
 */

const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
  
  // Sanity CMS - Required
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, 'NEXT_PUBLIC_SANITY_PROJECT_ID is verplicht'),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, 'NEXT_PUBLIC_SANITY_DATASET is verplicht'),
  
  // Sanity API Token - Optional (alleen voor server-side queries)
  SANITY_API_READ_TOKEN: z.string().optional(),
  SANITY_API_WRITE_TOKEN: z.string().optional(),
  
  // Resend Email Service - Required voor contact formulier
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is verplicht voor email functionaliteit'),
  RESEND_FROM: z.string().email('RESEND_FROM moet een geldig email adres zijn').optional(),
  RESEND_TO: z.string().email('RESEND_TO moet een geldig email adres zijn').optional(),
  
  // Site URL
  NEXT_PUBLIC_SITE_URL: z.string().url('NEXT_PUBLIC_SITE_URL moet een geldige URL zijn').optional(),
});

// Server-side validatie
export function validateEnv() {
  try {
    const parsed = envSchema.safeParse(process.env);
    
    if (!parsed.success) {
      console.error('❌ Ongeldige environment variables:');
      console.error(parsed.error.format());
      
      // In productie: throw error
      // In development: waarschuwing maar ga door
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Ongeldige environment configuratie');
      }
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.log('✅ Environment variables zijn geldig');
      }
    }
    
    return parsed.success ? parsed.data : process.env;
  } catch (error) {
    console.error('❌ Fout bij valideren environment variables:', error);
    throw error;
  }
}

// Type-safe environment export
export type Env = z.infer<typeof envSchema>;

