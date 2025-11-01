import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the form data
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validatiefout", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check honeypot field
    if (data.website && data.website.length > 0) {
      // This is likely a bot, pretend everything is OK
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Send email via Resend
    const result = await sendContactEmail(data);

    if (!result.success) {
      console.error("Failed to send email:", result.error);
      return NextResponse.json(
        { error: "E-mail kon niet worden verzonden" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het verwerken van je verzoek" },
      { status: 500 }
    );
  }
}



