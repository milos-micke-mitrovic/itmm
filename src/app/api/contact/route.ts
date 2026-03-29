import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { getContactEmail } from "@/lib/contacts";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, description, budget, source } = body;

    if (!name || !email || !description) {
      return NextResponse.json(
        { error: "Name, email, and description are required" },
        { status: 400 }
      );
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
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
