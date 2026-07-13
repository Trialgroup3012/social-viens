import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import { SITE_URL } from "@/lib/schema";
import { decryptSetting } from "@/lib/secure-settings";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface SendReportEmailArgs {
  to: string;
  name: string;
  reportBuffer: Buffer;
  reportFilename: string;
  toolName: string;
  url: string;
}

export interface SendReportEmailResult {
  success: boolean;
  previewUrl?: string;
  provider?: "smtp" | "ethereal";
  error?: string;
}

/* ------------------------------------------------------------------ */
/* HTML body                                                          */
/* ------------------------------------------------------------------ */

function buildEmailHtml(args: SendReportEmailArgs): string {
  const { name, toolName, url } = args;
  return `
  <div style="font-family: Arial, 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background:#ffffff; border:1px solid #e5e5e5;">
    <div style="background:#D4AF37; padding:24px 28px; text-align:center;">
      <h1 style="color:#1a1a1a; margin:0; font-size:24px; letter-spacing:2px; font-weight:800;">SOCIAL VIENS</h1>
      <p style="color:#1a1a1a; margin:6px 0 0; font-size:11px; letter-spacing:1px; text-transform:uppercase;">Premium Digital Marketing Agency</p>
    </div>
    <div style="padding:32px 28px; background:#fafafa;">
      <h2 style="color:#1a1a1a; margin:0 0 12px; font-size:20px;">Hi ${escapeHtml(name)},</h2>
      <p style="color:#333; line-height:1.6; font-size:14px; margin:0 0 14px;">
        Thank you for using our <strong style="color:#A87842;">${escapeHtml(toolName)}</strong> tool.
        Your detailed analysis report for
        <strong style="word-break:break-all;">${escapeHtml(url)}</strong>
        is attached to this email as a PDF.
      </p>
      <p style="color:#333; line-height:1.6; font-size:14px; margin:0 0 14px;">
        Inside the report you&apos;ll find:
      </p>
      <ul style="color:#333; line-height:1.7; font-size:14px; padding-left:20px; margin:0 0 18px;">
        <li>Performance &amp; SEO scores with color-coded indicators</li>
        <li>Detailed check results with pass / fail / warning status</li>
        <li>Executive summary written by our growth team</li>
        <li>Actionable recommendations you can implement today</li>
      </ul>
      <div style="text-align:center; margin:24px 0;">
        <a href="${SITE_URL}/contact"
           style="background:#D4AF37; color:#1a1a1a; padding:12px 28px; text-decoration:none; font-weight:700; border-radius:6px; display:inline-block; font-size:14px;">
          Get a Free Consultation &rarr;
        </a>
      </div>
      <p style="color:#666; font-size:13px; line-height:1.6; margin:0 0 0;">
        Ready to improve your scores? Reply to this email or call us — we&apos;ll turn this report into a 90-day action plan
        tailored to your business.
      </p>
    </div>
    <div style="padding:18px 28px; background:#1a1a1a; color:#D4AF37; text-align:center;">
      <p style="margin:0; font-size:12px; letter-spacing:0.5px;">
        SOCIAL VIENS &nbsp;|&nbsp; socialviens.in &nbsp;|&nbsp; +91 81780 04800
      </p>
    </div>
  </div>
  `;
}

function escapeHtml(s: string): string {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ------------------------------------------------------------------ */
/* SMTP config loader (DB → env fallback)                             */
/* ------------------------------------------------------------------ */

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
}

// In-process cache (30s TTL) so we don't hit the DB on every email send.
let smtpCache: { data: SmtpConfig | null; ts: number } = { data: null, ts: 0 };
const SMTP_CACHE_TTL_MS = 30_000;

/**
 * Load SMTP configuration. Priority:
 *   1. DB SiteSetting (admin-controlled via /admin/settings → SMTP tab):
 *        smtp_host, smtp_port, smtp_secure, smtp_user, smtp_pass,
 *        smtp_from_name, smtp_from_email
 *   2. Environment variables (fallback for initial bootstrap):
 *        SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
 *   3. Returns null → caller falls back to Ethereal test account.
 */
export async function loadSmtpConfig(): Promise<SmtpConfig | null> {
  // Cache hit?
  if (smtpCache.data !== null && Date.now() - smtpCache.ts < SMTP_CACHE_TTL_MS) {
    return smtpCache.data;
  }
  if (smtpCache.data === null && Date.now() - smtpCache.ts < SMTP_CACHE_TTL_MS) {
    // We cached a "null" (no config) result — also respect TTL.
    return null;
  }

  let cfg: SmtpConfig | null = null;

  // 1. Try DB settings
  try {
    const rows = await db.siteSetting.findMany({
      where: {
        key: {
          in: [
            "smtp_host",
            "smtp_port",
            "smtp_secure",
            "smtp_user",
            "smtp_pass",
            "smtp_from_name",
            "smtp_from_email",
          ],
        },
      },
    });
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = decryptSetting(r.value);

    if (map.smtp_host && map.smtp_user && map.smtp_pass) {
      cfg = {
        host: map.smtp_host,
        port: parseInt(map.smtp_port || "587", 10),
        secure: map.smtp_secure === "true",
        user: map.smtp_user,
        pass: map.smtp_pass,
        fromName: map.smtp_from_name || "SOCIAL VIENS",
        fromEmail: map.smtp_from_email || map.smtp_user,
      };
    }
  } catch (err) {
    console.error("[email-service] Failed to read SMTP settings from DB:", err);
  }

  // 2. Env fallback
  if (!cfg && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    cfg = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true",
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      fromName: "SOCIAL VIENS",
      fromEmail: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
    };
  }

  // Cache the result (including null) for TTL
  smtpCache = { data: cfg, ts: Date.now() };
  return cfg;
}

/**
 * Force SMTP config refresh (call after admin saves new SMTP settings).
 */
export function refreshSmtpConfig(): void {
  smtpCache = { data: null, ts: 0 };
}

/* ------------------------------------------------------------------ */
/* Transport resolver                                                 */
/* ------------------------------------------------------------------ */

async function resolveTransport(): Promise<{
  transporter: nodemailer.Transporter;
  provider: "smtp" | "ethereal";
  fromName: string;
  fromEmail: string;
}> {
  // Prefer DB / env SMTP config if available
  const cfg = await loadSmtpConfig();
  if (cfg) {
    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: {
        user: cfg.user,
        pass: cfg.pass,
      },
    });
    return {
      transporter,
      provider: "smtp",
      fromName: cfg.fromName,
      fromEmail: cfg.fromEmail,
    };
  }

  // Fallback: Ethereal test account (works in any environment, no creds needed)
  let testAccount;
  try {
    testAccount = await nodemailer.createTestAccount();
  } catch (err) {
    throw new Error(
      `Failed to create Ethereal test account: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return {
    transporter,
    provider: "ethereal",
    fromName: "SOCIAL VIENS",
    fromEmail: "noreply@socialviens.in",
  };
}

/* ------------------------------------------------------------------ */
/* Public API                                                         */
/* ------------------------------------------------------------------ */

export async function sendReportEmail(
  args: SendReportEmailArgs
): Promise<SendReportEmailResult> {
  try {
    const { transporter, provider, fromName, fromEmail } = await resolveTransport();

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: args.to,
      subject: `Your ${args.toolName} Report for ${args.url}`,
      html: buildEmailHtml(args),
      attachments: [
        {
          filename: args.reportFilename,
          content: args.reportBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;

    return {
      success: true,
      previewUrl: typeof previewUrl === "string" ? previewUrl : undefined,
      provider,
    };
  } catch (error: any) {
    console.error("[email-service] Error sending report email:", error);
    return {
      success: false,
      error: error?.message || String(error),
    };
  }
}

/* ================================================================== */
/* Lead Notification Email (admin alert)                              */
/* ================================================================== */
/* Sends an HTML alert to socialviens@gmail.com whenever a new lead is
   captured. Built on top of the existing resolveTransport() helper so
   SMTP vs Ethereal fallback behaviour matches sendReportEmail.        */

export interface LeadNotificationEmailArgs {
  to: string; // always "socialviens@gmail.com"
  lead: {
    name: string;
    email: string;
    phone: string;
    business?: string | null;
    service?: string | null;
    message?: string | null;
    source: string;
  };
}

export interface LeadNotificationEmailResult {
  success: boolean;
  error?: string;
  provider?: "smtp" | "ethereal";
  previewUrl?: string;
}

function buildLeadEmailHtml(lead: LeadNotificationEmailArgs["lead"]): string {
  const rows: Array<{ label: string; value: string; href?: string }> = [
    { label: "Name", value: lead.name },
    {
      label: "Email",
      value: lead.email,
      href: `mailto:${lead.email}`,
    },
    {
      label: "Phone",
      value: lead.phone || "—",
      href: lead.phone ? `tel:${lead.phone.replace(/\s+/g, "")}` : undefined,
    },
    { label: "Business", value: lead.business || "—" },
    { label: "Service", value: lead.service || "—" },
    { label: "Source", value: lead.source },
  ];

  const renderRow = (row: { label: string; value: string; href?: string }) => `
    <tr>
      <td style="padding:10px 14px; background:#F7F3EA; color:#1a1a1a; font-size:13px; font-weight:700; width:120px; border-bottom:1px solid #ece6d4; vertical-align:top;">
        ${escapeHtml(row.label)}
      </td>
      <td style="padding:10px 14px; color:#333; font-size:13px; border-bottom:1px solid #ece6d4; vertical-align:top; word-break:break-word;">
        ${
          row.href
            ? `<a href="${escapeHtml(row.href)}" style="color:#A87842; text-decoration:none;">${escapeHtml(row.value)}</a>`
            : escapeHtml(row.value)
        }
      </td>
    </tr>`;

  const messageHtml =
    lead.message && lead.message.trim()
      ? `
        <tr>
          <td style="padding:10px 14px; background:#F7F3EA; color:#1a1a1a; font-size:13px; font-weight:700; border-bottom:1px solid #ece6d4; vertical-align:top;">
            Message
          </td>
          <td style="padding:10px 14px; color:#333; font-size:13px; border-bottom:1px solid #ece6d4; vertical-align:top; line-height:1.55; white-space:pre-wrap; word-break:break-word;">
            ${escapeHtml(lead.message)}
          </td>
        </tr>`
      : "";

  return `
  <div style="font-family: Arial, 'Helvetica Neue', sans-serif; max-width: 640px; margin: 0 auto; background:#ffffff; border:1px solid #e5e5e5; border-radius:4px; overflow:hidden;">
    <div style="background:#D4AF37; padding:22px 28px; text-align:center;">
      <h1 style="color:#1a1a1a; margin:0; font-size:22px; letter-spacing:2px; font-weight:800;">SOCIAL VIENS</h1>
      <p style="color:#1a1a1a; margin:6px 0 0; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; font-weight:700;">
        🔔 New Lead Alert
      </p>
    </div>

    <div style="padding:28px 28px 16px; background:#ffffff;">
      <h2 style="color:#1a1a1a; margin:0 0 8px; font-size:19px;">
        You have a new lead: ${escapeHtml(lead.name)}
      </h2>
      <p style="color:#666; line-height:1.6; font-size:13px; margin:0;">
        A visitor just submitted the <strong style="color:#A87842;">${escapeHtml(lead.source)}</strong> form on your website.
        Reach out within 5 minutes to maximize conversion rates.
      </p>
    </div>

    <div style="padding:0 28px 24px; background:#ffffff;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; border:1px solid #ece6d4; border-radius:4px; overflow:hidden;">
        ${rows.map(renderRow).join("")}
        ${messageHtml}
      </table>

      <div style="text-align:center; margin:24px 0 6px;">
        <a href="${SITE_URL}/admin/leads"
           style="background:#D4AF37; color:#1a1a1a; padding:12px 30px; text-decoration:none; font-weight:700; border-radius:6px; display:inline-block; font-size:13px; letter-spacing:0.5px;">
          View in Admin Panel &rarr;
        </a>
      </div>
    </div>

    <div style="padding:18px 28px; background:#1a1a1a; color:#D4AF37; text-align:center;">
      <p style="margin:0; font-size:12px; letter-spacing:0.5px; line-height:1.6;">
        <strong style="color:#D4AF37;">SOCIAL VIENS</strong> &nbsp;|&nbsp;
        <a href="${SITE_URL}" style="color:#D4AF37; text-decoration:none;">${SITE_URL.replace(/^https?:\/\//, '')}</a>
        &nbsp;|&nbsp; +91 81780 04800 &nbsp;|&nbsp; socialviens@gmail.com
      </p>
    </div>
  </div>`;
}

export async function sendLeadNotificationEmail(
  args: LeadNotificationEmailArgs
): Promise<LeadNotificationEmailResult> {
  try {
    const { transporter, provider, fromName, fromEmail } = await resolveTransport();

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: args.to,
      subject: `🔔 New Lead: ${args.lead.name} (${args.lead.source})`,
      html: buildLeadEmailHtml(args.lead),
    });

    const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;

    return {
      success: true,
      previewUrl: typeof previewUrl === "string" ? previewUrl : undefined,
      provider,
    };
  } catch (error: any) {
    console.error("[email-service] Error sending lead notification email:", error);
    return {
      success: false,
      error: error?.message || String(error),
    };
  }
}
