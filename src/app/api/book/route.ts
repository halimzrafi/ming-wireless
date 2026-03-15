import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, device, issue, date, time } = data;

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Email to owner
      await resend.emails.send({
        from: process.env.EMAIL_FROM || "Ming Wireless <noreply@mingwireless.com>",
        to: process.env.OWNER_EMAIL || "info@mingwireless.com",
        subject: `New Booking: ${device} - ${name} - ${date} at ${time}`,
        html: `
          <h2>New Repair Booking</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Device:</strong> ${device}</p>
          <p><strong>Issue:</strong> ${issue}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
        `,
      });

      // Confirmation to customer
      await resend.emails.send({
        from: process.env.EMAIL_FROM || "Ming Wireless <noreply@mingwireless.com>",
        to: email,
        subject: "Booking Confirmed - Ming Wireless",
        html: `
          <h2>Your repair appointment is confirmed!</h2>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Device:</strong> ${device}</p>
          <p><strong>Issue:</strong> ${issue}</p>
          <br/>
          <p><strong>Location:</strong> 250 Dundas St W, Unit 106, Toronto ON</p>
          <p>If you need to reschedule, call us at <strong>(416) 979-8848</strong>.</p>
          <br/>
          <p>— The Ming Wireless Team</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 });
  }
}
