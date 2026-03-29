import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { getContactEmail } from "@/lib/contacts";
import { rateLimit } from "@/lib/rate-limit";
import { sanitize, isValidEmail } from "@/lib/sanitize";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    // Rate limit: 5 submissions per minute per IP
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!rateLimit(ip, 5)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const name = sanitize(body.name || "");
    const email = sanitize(body.email || "");
    const phone = sanitize(body.phone || "");
    const description = sanitize(body.description || "");
    const budget = sanitize(body.budget || "");
    const source = body.source === "marketing" ? "marketing" : "web";

    if (!name || !email || !description) {
      return NextResponse.json({ error: "Name, email, and description are required" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Honeypot: if a hidden field is filled, it's a bot
    if (body._honey) {
      return NextResponse.json({ success: true }); // fake success
    }

    const isMarketing = source === "marketing";
    const contactEmail = getContactEmail(source);

    if (!resend || !contactEmail) {
      console.log(`[${isMarketing ? "Marketing" : "Web"}] Contact form:`, { name, email, phone, budget, description });
      return NextResponse.json({ success: true });
    }

    await resend.emails.send({
      from: "ITMM Contact <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: email,
      subject: `New ${isMarketing ? "marketing" : "project"} inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Source:</strong> ${isMarketing ? "Digital Marketing" : "Web Development"}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
        <p><strong>Project description:</strong></p>
        <p>${description}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
