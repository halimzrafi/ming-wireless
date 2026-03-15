import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, message } = data;

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: process.env.EMAIL_FROM || "Ming Wireless <noreply@mingwireless.com>",
        to: process.env.OWNER_EMAIL || "info@mingwireless.com",
        subject: `Contact Form: ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
