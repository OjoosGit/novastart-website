import { z } from "zod";

// Nederlandse telefoonnummer regex (mobiel en vast)
const dutchPhoneRegex = /^(\+31|0|0031)[1-9][0-9]{8}$/;

// Bekende wegwerp email providers blokkeren
const disposableEmailDomains = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com',
  'throwaway.email', 'mailinator.com', 'temp-mail.org',
  'fakeinbox.com', 'throwawaymail.com', 'trashmail.com'
];

// Spam keywords voor basis detectie
const spamKeywords = [
  'viagra', 'casino', 'loan', 'crypto', 'bitcoin',
  'click here', 'buy now', 'limited offer', 'act now'
];

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Naam moet minimaal 2 karakters zijn")
    .max(100, "Naam mag maximaal 100 karakters zijn")
    .regex(/^[a-zA-ZÀ-ÿ\s\-.']+$/, "Naam bevat ongeldige karakters"),
  
  email: z.string()
    .email("Ongeldig e-mailadres")
    .toLowerCase()
    .max(255, "E-mailadres is te lang")
    .refine((email) => {
      const domain = email.split('@')[1];
      return domain && !disposableEmailDomains.includes(domain);
    }, "Wegwerp e-mailadressen zijn niet toegestaan"),
  
  phone: z.string()
    .min(10, "Telefoonnummer moet minimaal 10 cijfers zijn")
    .transform((val) => val.replace(/[\s\-]/g, '')) // Verwijder spaties en streepjes
    .refine((val) => dutchPhoneRegex.test(val), {
      message: "Voer een geldig Nederlands telefoonnummer in (bijv. 06 12345678 of 045 1234567)"
    }),
  
  role: z.enum(["ouder", "jongere", "verwijzer", "anders"], {
    required_error: "Selecteer een rol",
  }),
  
  message: z.string()
    .min(10, "Bericht moet minimaal 10 karakters zijn")
    .max(5000, "Bericht mag maximaal 5000 karakters zijn")
    .refine((msg) => {
      const lowerMsg = msg.toLowerCase();
      return !spamKeywords.some(keyword => lowerMsg.includes(keyword));
    }, "Bericht bevat mogelijk ongewenste inhoud"),
  
  privacy: z.boolean().refine((val) => val === true, {
    message: "Je moet akkoord gaan met het privacybeleid",
  }),
  
  // Honeypot field - moet leeg blijven
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;



