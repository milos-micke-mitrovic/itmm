import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { rateLimit } from "@/lib/rate-limit";
import { isValidEmail } from "@/lib/sanitize";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!rateLimit(ip, 3, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { email, _honey } = await req.json();

    if (_honey) return NextResponse.json({ success: true });

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (!resend || !process.env.RESEND_AUDIENCE_ID) {
      console.log("Subscription:", email);
      return NextResponse.json({ success: true });
    }

    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
