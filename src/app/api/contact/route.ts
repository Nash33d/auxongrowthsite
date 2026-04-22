import { Resend } from 'resend';
import { NextResponse } from 'next/server';

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, website, vertical, message } = body;

    console.log("[v0] Contact form received:", { name, email, website, vertical, message });

    // Validate required fields
    if (!name || !email || !message) {
      console.log("[v0] Validation failed - missing required fields");
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const resend = getResend();
    if (!resend) {
      console.log("[v0] RESEND_API_KEY not configured - skipping email send");
      return NextResponse.json({ success: true, mock: true });
    }

    console.log("[v0] Attempting to send email via Resend...");
    const { data, error } = await resend.emails.send({
      from: 'Auxon Growth <onboarding@resend.dev>',
      to: 'custodio@auxongrowth.com',
      subject: `New Lead: ${name} - ${vertical || 'No vertical specified'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Website:</strong> ${website || 'Not provided'}</p>
        <p><strong>Vertical:</strong> ${vertical || 'Not selected'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    });

    if (error) {
      console.log("[v0] Resend error:", error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    console.log("[v0] Email sent successfully! ID:", data?.id);
    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
