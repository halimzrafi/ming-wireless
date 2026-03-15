import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, device, issue, preferredContact } = data;

    // Send notification to owner
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Email to owner
      await resend.emails.send({
        from: process.env.EMAIL_FROM || "Ming Wireless <noreply@mingwireless.com>",
        to: process.env.OWNER_EMAIL || "info@mingwireless.com",
        subject: `New Quote Request: ${device} - ${name}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Device:</strong> ${device}</p>
          <p><strong>Issue:</strong> ${issue}</p>
          <p><strong>Preferred Contact:</strong> ${preferredContact}</p>
        `,
      });

      // Auto-reply to customer
      await resend.emails.send({
        from: process.env.EMAIL_FROM || "Ming Wireless <noreply@mingwireless.com>",
        to: email,
        subject: "Your Repair Quote Request - Ming Wireless",
        html: `
          <h2>Thanks for your quote request, ${name}!</h2>
          <p>We've received your request for <strong>${device}</strong> repair and will get back to you within 30 minutes during business hours.</p>
          <p><strong>Your issue:</strong> ${issue}</p>
          <br/>
          <p>In the meantime, feel free to call us at <strong>(416) 979-8848</strong> or visit us at <strong>250 Dundas St W, Unit 106, Toronto</strong>.</p>
          <br/>
          <p>— The Ming Wireless Team</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json({ error: "Failed to process quote" }, { status: 500 });
  }
}
