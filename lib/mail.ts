import { Resend } from "resend";
import { ContactFormData } from "./validations";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, phone, role, message } = data;

  const roleLabels = {
    ouder: "Ouder/verzorger",
    jongere: "Jongere",
    verwijzer: "Verwijzer/professional",
    anders: "Anders",
  };

  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM || "Novastart <no-reply@novastart.nl>",
      to: process.env.RESEND_TO || "info@novastart.nl",
      subject: `Nieuw contactformulier: ${name}`,
      html: `
        <h2>Nieuw bericht via contactformulier</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Telefoon:</strong> ${phone}</p>
        <p><strong>Rol:</strong> ${roleLabels[role]}</p>
        <p><strong>Bericht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Dit bericht is verzonden via het contactformulier op novastart.nl
        </p>
      `,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

