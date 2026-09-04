import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { PROGRAM } from "@/components/site/data";

// fs access + base64 → needs the Node runtime, not Edge.
export const runtime = "nodejs";

const BREVO_API = "https://api.brevo.com/v3";

// The welcome email attaches both PDFs. Keep these slugs in sync with
// next.config.ts `outputFileTracingIncludes` so they ship in the serverless bundle.
const GUIDE_SLUG = "growthlab-digital-marketing-guide.pdf";
const PROGRAM_SLUG = "growthlab-cohort-program.pdf";

const ATTACHMENTS = [
  {
    path: join(process.cwd(), "public", PROGRAM_SLUG),
    name: "GrowthLab Program Details.pdf",
  },
  {
    path: join(process.cwd(), "public", GUIDE_SLUG),
    name: "GrowthLab Digital Marketing Strategy Guide.pdf",
  },
];

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
  // Internal "new applicant" notification. LEAD_NOTIFY_EMAIL is the recipient;
  // LEAD_NOTIFY_FROM lets it send from a different verified address than the
  // recipient (from == to via a relay is a common spam trigger).
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL || PROGRAM.email;
  const notifyFrom = process.env.LEAD_NOTIFY_FROM || senderEmail;

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

    // 2 — send the welcome email with both PDFs attached
    const attachment = (
      await Promise.all(
        ATTACHMENTS.map(async ({ path, name }) => {
          try {
            const pdf = await readFile(path);
            return { content: pdf.toString("base64"), name };
          } catch (err) {
            console.error("[lead] could not read attachment", name, err);
            return null;
          }
        }),
      )
    ).filter((a): a is { content: string; name: string } => a !== null);

    const emailRes = await fetch(`${BREVO_API}/smtp/email`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email, name }],
        replyTo: { email: senderEmail, name: senderName },
        subject: "Welcome to GrowthLab, your program details & guide inside",
        htmlContent: welcomeEmailHtml(firstName),
        attachment: attachment.length ? attachment : undefined,
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

    // 3 — notify the team. Best-effort: a failure here must not fail the request,
    // the applicant is already captured in the list and has their welcome email.
    try {
      const notifyRes = await fetch(`${BREVO_API}/smtp/email`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          sender: { name: senderName, email: notifyFrom },
          to: [{ email: notifyEmail }],
          // reply goes straight to the applicant
          replyTo: { email, name },
          subject: `New GrowthLab application: ${name}`,
          htmlContent: leadNotificationHtml({ name, email, phone }),
          tags: ["lead-notification"],
        }),
      });
      if (!notifyRes.ok) {
        console.error(
          "[lead] team notification failed",
          notifyRes.status,
          await notifyRes.text(),
        );
      }
    } catch (err) {
      console.error("[lead] team notification error", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] unexpected error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

function welcomeEmailHtml(firstName: string) {
  const hi = firstName ? `Hi ${firstName},` : "Hi,";
  const waUrl = `https://wa.me/${PROGRAM.whatsappNumber}`;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      @media only screen and (max-width:600px){
        .gl-outer{padding:12px 6px!important}
        .gl-card{padding:24px 18px!important;border-radius:10px!important}
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#f2eee2;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#16171d">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2eee2">
      <tr>
        <td align="center" class="gl-outer" style="padding:28px 12px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:14px">
            <tr><td class="gl-card" style="padding:32px 30px">
              <p style="margin:0 0 8px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#d8451c">GrowthLab</p>
              <h1 style="margin:0 0 18px;font-size:22px;line-height:1.25">Welcome to GrowthLab</h1>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6">${hi}</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6">
                Thank you for filling out the form and showing interest in <strong>GrowthLab</strong>.
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6">
                We&rsquo;re excited that you&rsquo;re taking the first step toward gaining
                real-world digital marketing experience.
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6">
                Attached to this email, you&rsquo;ll find:
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px">
                <tr><td style="padding:14px 16px;background:#f7f5ec;border-left:3px solid #d8451c;border-radius:8px">
                  <p style="margin:0 0 4px;font-size:15px;line-height:1.4;font-weight:700">&#128196; GrowthLab Program Details</p>
                  <p style="margin:0;font-size:14px;line-height:1.6;color:#4b4c55">
                    Everything you need to know about the 8-week program, including the
                    learning experience, real client projects, training sessions, and
                    what you&rsquo;ll gain from the program.
                  </p>
                </td></tr>
                <tr><td style="height:10px;line-height:10px;font-size:0">&nbsp;</td></tr>
                <tr><td style="padding:14px 16px;background:#f7f5ec;border-left:3px solid #d8451c;border-radius:8px">
                  <p style="margin:0 0 4px;font-size:15px;line-height:1.4;font-weight:700">&#128216; Free Digital Marketing Strategy Guide</p>
                  <p style="margin:0;font-size:14px;line-height:1.6;color:#4b4c55">
                    A practical guide covering the key elements of an effective digital
                    marketing strategy, from market research and audience definition to
                    objectives, channel selection, campaign planning, and performance
                    measurement.
                  </p>
                </td></tr>
              </table>

              <h2 style="margin:0 0 8px;font-size:15px;line-height:1.3;text-transform:uppercase;letter-spacing:0.02em">What happens next?</h2>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6">
                Someone from the GrowthLab team will get in touch with you soon to
                answer any questions and help you finalize your registration for the program.
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6">
                In the meantime, take a look through the attached documents and get a
                feel for what the GrowthLab experience is all about.
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6">
                If you have any questions, simply reply to this email or
                <a href="${waUrl}" style="color:#d8451c;font-weight:600;text-decoration:none">message us on WhatsApp</a>.
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6">
                We look forward to having you with us!
              </p>
              <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#4b4c55">
                GrowthLab Team
              </p>
            </td></tr>
          </table>
          <p style="margin:16px 0 0;font-size:12px;color:#8a8b93">© ${new Date().getFullYear()} GrowthLab</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!,
  );

function leadNotificationHtml(lead: {
  name: string;
  email: string;
  phone: string;
}) {
  const name = escapeHtml(lead.name);
  const email = escapeHtml(lead.email);
  const phone = escapeHtml(lead.phone);
  const phoneDigits = lead.phone.replace(/\D/g, "");
  const when = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Beirut",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 0;font-size:13px;color:#8a8b93;width:90px;vertical-align:top">${label}</td>
      <td style="padding:6px 0;font-size:15px;color:#16171d">${value}</td>
    </tr>`;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      @media only screen and (max-width:600px){
        .gl-outer{padding:12px 6px!important}
        .gl-card{padding:24px 18px!important;border-radius:10px!important}
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#f2eee2;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#16171d">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2eee2">
      <tr>
        <td align="center" class="gl-outer" style="padding:28px 12px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:14px">
            <tr><td class="gl-card" style="padding:30px 26px">
              <p style="margin:0 0 8px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#d8451c">GrowthLab · New application</p>
              <h1 style="margin:0 0 20px;font-size:20px;line-height:1.3">${name} just applied</h1>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Name", name)}
                ${row("Email", `<a href="mailto:${email}" style="color:#d8451c;text-decoration:none">${email}</a>`)}
                ${row(
                  "Phone",
                  phoneDigits
                    ? `<a href="tel:${phoneDigits}" style="color:#d8451c;text-decoration:none">${phone}</a> &nbsp;·&nbsp; <a href="https://wa.me/${phoneDigits}" style="color:#d8451c;text-decoration:none">WhatsApp</a>`
                    : phone || "&mdash;",
                )}
                ${row("Submitted", when + " (Beirut)")}
              </table>
              <p style="margin:22px 0 0;font-size:13px;line-height:1.6;color:#8a8b93">
                They&rsquo;ve been added to the Brevo list and sent the welcome email
                with both PDFs. Reply to this email to reach them directly.
              </p>
            </td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
