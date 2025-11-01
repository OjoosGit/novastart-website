import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/mail";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: max 3 requests per uur per IP
    const ip = getClientIp(request);
    const rateLimitResult = await rateLimit(ip, {
      limit: 3,
      window: 60 * 60 * 1000, // 1 uur
    });

    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.reset);
      return NextResponse.json(
        {
          error: "Te veel verzoeken. Probeer het later opnieuw.",
          resetTime: resetDate.toISOString(),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

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
      // Log alleen in development
      if (process.env.NODE_ENV !== 'production') {
        console.error("Failed to send email:", result.error);
      }
      return NextResponse.json(
        { error: "E-mail kon niet worden verzonden" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // Log alleen in development
    if (process.env.NODE_ENV !== 'production') {
      console.error("API error:", error);
    }
    return NextResponse.json(
      { error: "Er ging iets mis bij het verwerken van je verzoek" },
      { status: 500 }
    );
  }
}



