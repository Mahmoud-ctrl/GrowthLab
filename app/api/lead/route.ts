import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { PROGRAM } from "@/components/site/data";
import { abs } from "@/lib/site";

// fs access + base64 → needs the Node runtime, not Edge.
export const runtime = "nodejs";

const BREVO_API = "https://api.brevo.com/v3";
const PDF_SLUG = "growthlab-founding-cohort-program.pdf";
const PDF_PATH = join(process.cwd(), "public", PDF_SLUG);
const PDF_FILENAME = "GrowthLab Founding Cohort Program.pdf";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  /** honeypot — real users never see or fill this */
  company?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Bot filled the hidden field — accept and drop it silently.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();

  if (name.length < 2 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const apiKey = process.env.BREVO_API_KEY;

  // Not wired to Brevo yet — keep the form working during setup, but log the lead
  // loudly so nothing is lost while keys are being provisioned.
  if (!apiKey) {
    console.warn(
      "[lead] BREVO_API_KEY not set — lead NOT captured:",
      JSON.stringify({ name, email, phone }),
    );
    return NextResponse.json({ ok: true, configured: false });
  }

  const [firstName, ...restName] = name.split(/\s+/);
  const lastName = restName.join(" ");
  const listId = Number(process.env.BREVO_LIST_ID);
  const senderEmail = process.env.BREVO_SENDER_EMAIL || PROGRAM.email;
  const senderName = process.env.BREVO_SENDER_NAME || PROGRAM.name;

  const headers = {
    "api-key": apiKey,
    "content-type": "application/json",
    accept: "application/json",
  };

  try {
    // 1 — upsert the contact into the list
    const contactRes = await fetch(`${BREVO_API}/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          // NOTE: PHONE must exist as a contact attribute in Brevo
          // (Contacts → Settings → Contact attributes) or Brevo rejects the call.
          PHONE: phone,
        },
        listIds: Number.isFinite(listId) ? [listId] : undefined,
        updateEnabled: true,
      }),
    });
    if (!contactRes.ok && contactRes.status !== 204) {
      console.error(
        "[lead] Brevo contact error",
        contactRes.status,
        await contactRes.text(),
      );
      // don't abort — still try to send the PDF
    }

    // 2 — send the welcome email with the PDF attached
    let attachment: { content: string; name: string }[] | undefined;
    try {
      const pdf = await readFile(PDF_PATH);
      attachment = [{ content: pdf.toString("base64"), name: PDF_FILENAME }];
    } catch (err) {
      console.error("[lead] could not read program PDF", err);
    }

    const emailRes = await fetch(`${BREVO_API}/smtp/email`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email, name }],
        replyTo: { email: senderEmail, name: senderName },
        subject: "Your GrowthLab program details",
        htmlContent: welcomeEmailHtml(firstName),
        attachment,
        tags: ["lead-magnet"],
      }),
    });
    if (!emailRes.ok) {
      console.error(
        "[lead] Brevo email error",
        emailRes.status,
        await emailRes.text(),
      );
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] unexpected error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

function welcomeEmailHtml(firstName: string) {
  const hi = firstName ? `Hi ${firstName},` : "Hi,";
  const pdfUrl = process.env.PROGRAM_PDF_URL || abs(`/${PDF_SLUG}`);

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f2eee2;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#16171d">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2eee2">
      <tr>
        <td align="center" style="padding:40px 20px">
          <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:14px;padding:36px">
            <tr><td>
              <p style="margin:0 0 8px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#d8451c">GrowthLab</p>
              <h1 style="margin:0 0 18px;font-size:22px;line-height:1.25">Thanks for your interest.</h1>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6">${hi}</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6">
                The full GrowthLab program details are attached to this email as a PDF.
                It covers the 8-week structure, the weekly training breakdown, the client
                project, and everything you walk away with.
              </p>
              <p style="margin:0 0 24px">
                <a href="${pdfUrl}"
                   style="display:inline-block;background:#16171d;color:#f2eee2;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:999px">
                  View the program details
                </a>
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6">
                If you have any questions, just reply to this email or message us on WhatsApp.
              </p>
              <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#4b4c55">
                The GrowthLab team
              </p>
            </td></tr>
          </table>
          <p style="margin:20px 0 0;font-size:12px;color:#8a8b93">© ${new Date().getFullYear()} GrowthLab</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
