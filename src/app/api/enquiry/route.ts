import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { enquirySchema } from "@/schemas/enquiry";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot means a bot: pretend success so it doesn't retry.
    if (typeof body === "object" && body && "company" in body && (body as { company?: string }).company) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again.", fields: z.flattenError(parsed.error).fieldErrors },
      { status: 422 },
    );
  }

  const { name, phone, email, interest, visitDate, message } = parsed.data;
  const payload = { name, phone, email, interest, visitDate, message, source: "website", receivedAt: new Date().toISOString() };

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (error) {
      console.error("[enquiry] forwarding failed", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your enquiry right now. Please call or WhatsApp us." },
        { status: 502 },
      );
    }
  } else {
    // TODO(client): set ENQUIRY_WEBHOOK_URL once the lead destination (email service / CRM) is agreed.
    console.info("[enquiry] received (no webhook configured)", payload);
  }

  return NextResponse.json({ ok: true });
}
