import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Naam moet minimaal 2 karakters zijn"),
  email: z.string().email("Ongeldig e-mailadres"),
  phone: z.string().min(10, "Telefoonnummer moet minimaal 10 cijfers zijn"),
  role: z.enum(["ouder", "jongere", "verwijzer", "anders"], {
    required_error: "Selecteer een rol",
  }),
  message: z.string().min(10, "Bericht moet minimaal 10 karakters zijn"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Je moet akkoord gaan met het privacybeleid",
  }),
  // Honeypot field - moet leeg blijven
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

