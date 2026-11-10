import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  topic?: string;
  course?: string | null;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Please submit valid JSON." },
        { status: 400 }
      );
    }

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json(
        { error: "Please submit a valid contact form." },
        { status: 400 }
      );
    }

    const body = payload as ContactPayload;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const topic =
      typeof body.topic === "string" ? body.topic.trim() : "Course Inquiry";
    const course = typeof body.course === "string" ? body.course.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (name.length > 120 || topic.length > 120 || course.length > 120) {
      return NextResponse.json(
        { error: "Name, topic, or course name is too long." },
        { status: 400 }
      );
    }

    if (!message || message.length < 5) {
      return NextResponse.json(
        { error: "Please enter a message (at least 5 characters)." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long (maximum 5000 characters)." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !recipientEmail || !fromEmail) {
      return NextResponse.json(
        { error: "Email service is not configured on the server." },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(name || "Music School Visitor");
    const safeEmail = escapeHtml(email);
    const safeTopic = escapeHtml(topic);
    const safeCourse = escapeHtml(course);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
    const courseText = course ? `\nCourse: ${course}` : "";
    const courseHtml = course
      ? `<tr>
                <td style="padding: 8px 0; color: #a1a1aa;">Course:</td>
                <td style="padding: 8px 0; color: #ffffff;">${safeCourse}</td>
              </tr>`
      : "";

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        reply_to: email,
        subject: `[Harmony Academy] ${topic}${course ? ` — ${course}` : ""} from ${name || email}`,
        text: `New contact form submission\n\nName: ${name || "Not provided"}\nEmail: ${email}\nTopic: ${topic}${courseText}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #09090b; color: #f4f4f5; border-radius: 12px; border: 1px solid #27272a;">
            <h2 style="margin: 0 0 16px; color: #2dd4bf; font-size: 20px;">New Contact Inquiry — Harmony Academy</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #a1a1aa; width: 90px;">Name:</td>
                <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #a1a1aa;">Email:</td>
                <td style="padding: 8px 0; color: #2dd4bf;">${safeEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #a1a1aa;">Topic:</td>
                <td style="padding: 8px 0; color: #ffffff;">${safeTopic}</td>
              </tr>
              ${courseHtml}
            </table>
            <div style="padding: 16px; background: #18181b; border-radius: 8px; border: 1px solid #27272a; font-size: 14px; line-height: 1.6; color: #e4e4e7;">
              ${safeMessage}
            </div>
            <p style="margin: 16px 0 0; font-size: 12px; color: #71717a;">
              Tip: Click Reply in Gmail to respond directly to ${safeEmail}.
            </p>
          </div>
        `,
      }),
    });

    const resendData = (await resendResponse.json()) as {
      id?: string;
      message?: string;
      name?: string;
    };

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      return NextResponse.json(
        {
          error:
            resendData.message ||
            "Failed to send your message. Please try again shortly.",
        },
        { status: resendResponse.status >= 400 ? resendResponse.status : 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: resendData.id,
        message: "Your message has been sent.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { error: "Unexpected server error while sending message." },
      { status: 500 }
    );
  }
}
