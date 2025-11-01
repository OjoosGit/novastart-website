import { Resend } from "resend";
import { ContactFormData } from "./validations";

// Initialize Resend client lazily to avoid build errors when API key is missing
let resend: Resend | null = null;

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// HTML escape functie om XSS te voorkomen
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, phone, role, message } = data;

  const roleLabels = {
    ouder: "Ouder/verzorger",
    jongere: "Jongere",
    verwijzer: "Verwijzer/professional",
    anders: "Anders",
  };

  const client = getResendClient();
  
  if (!client) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("RESEND_API_KEY is not configured");
    }
    return { success: false, error: new Error("Email service not configured") };
  }

  try {
    const result = await client.emails.send({
      from: process.env.RESEND_FROM || "Novastart <no-reply@novastart.nl>",
      to: process.env.RESEND_TO || "info@novastart.nl",
      subject: `Nieuw contactformulier: ${escapeHtml(name)}`,
      html: `
        <h2>Nieuw bericht via contactformulier</h2>
        <p><strong>Naam:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Telefoon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Rol:</strong> ${roleLabels[role]}</p>
        <p><strong>Bericht:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Dit bericht is verzonden via het contactformulier op novastart.nl
        </p>
      `,
    });

    return { success: true, data: result };
  } catch (error) {
    // Log alleen generieke error in productie
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error sending email:", error);
    }
    return { success: false, error };
  }
}

