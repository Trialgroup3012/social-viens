import { db } from "@/lib/db";
import { sendLeadNotificationEmail } from "@/lib/email-service";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface LeadNotificationData {
  id: string;
  name: string;
  email: string;
  phone: string;
  business?: string | null;
  service?: string | null;
  message?: string | null;
  source: string;
  createdAt: Date;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const DEFAULT_ADMIN_EMAIL = "socialviens@gmail.com";
const NTFY_TOPIC = "social-viens-leads";

// Cache the admin notification email (30s TTL)
let adminEmailCache: { data: string; ts: number } = { data: "", ts: 0 };
const ADMIN_EMAIL_CACHE_TTL_MS = 30_000;

/**
 * Get the admin notification email address. Priority:
 *   1. DB SiteSetting key "admin_notify_email" (admin-controlled)
 *   2. DB SiteSetting key "email" (the general site email)
 *   3. Fallback to socialviens@gmail.com
 */
async function getAdminNotifyEmail(): Promise<string> {
  if (adminEmailCache.data && Date.now() - adminEmailCache.ts < ADMIN_EMAIL_CACHE_TTL_MS) {
    return adminEmailCache.data;
  }
  let email = "";
  try {
    const rows = await db.siteSetting.findMany({
      where: { key: { in: ["admin_notify_email", "email"] } },
    });
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;
    email = map.admin_notify_email || map.email || "";
  } catch (err) {
    console.error("[notification-service] Failed to read admin email from DB:", err);
  }
  if (!email) email = DEFAULT_ADMIN_EMAIL;
  adminEmailCache = { data: email, ts: Date.now() };
  return email;
}

/**
 * Build a WhatsApp reply link so the admin can instantly message the lead.
 * Returns null if no usable phone number is available.
 */
export function buildWhatsAppLink(lead: {
  name: string;
  phone: string;
  service?: string | null;
}): string | null {
  if (!lead.phone) return null;
  const digits = lead.phone.replace(/\D/g, "");
  if (!digits) return null;
  const text = `Hi ${lead.name}, thank you for reaching out to SOCIAL VIENS! I saw your inquiry about ${
    lead.service || "our services"
  }. How can I help you today?`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/**
 * Send a real push notification via ntfy.sh (free, no signup, no auth).
 * The admin just installs the free ntfy app on their phone and subscribes
 * to the topic `social-viens-leads` once.
 */
async function sendPushNotification(lead: LeadNotificationData): Promise<void> {
  const body =
    `🔔 New Lead: ${lead.name}\n` +
    `Email: ${lead.email}\n` +
    `Phone: ${lead.phone || "—"}\n` +
    `Business: ${lead.business || "—"}\n` +
    `Source: ${lead.source}\n\n` +
    `Tap to view in admin panel.`;

  await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
    method: "POST",
    headers: {
      // HTTP headers must be ASCII — no emoji in Title/Tags.
      Title: `New Lead: ${lead.name}`,
      Tags: "bell,money",
      Priority: "high",
      "Content-Type": "text/plain; charset=utf-8",
    },
    body,
  });
}

/* ------------------------------------------------------------------ */
/* Public API                                                         */
/* ------------------------------------------------------------------ */

/**
 * Central dispatcher: notifies the admin about a freshly-captured lead.
 *
 * Runs all 4 channels (email, ntfy push, DB record, WhatsApp link) — each
 * wrapped in its own try/catch so failures are non-fatal. The lead is
 * already saved in the DB by the time this is called, so notification
 * errors must NEVER propagate to the caller (the API response is already
 * sent to the user).
 *
 * The function is designed to be called fire-and-forget:
 *   notifyNewLead(lead).catch((e) => console.error("[/api/...] ...", e));
 */
export async function notifyNewLead(lead: LeadNotificationData): Promise<void> {
  // Pre-compute the WhatsApp reply link — used by both email and DB metadata.
  const waLink = buildWhatsAppLink(lead);

  // Run all 4 channels in PARALLEL so the DB notification (which powers the
  // admin bell badge + notifications panel) is written instantly, regardless
  // of whether the email or push channels are slow or fail.
  const metadata = JSON.stringify({
    leadId: lead.id,
    leadName: lead.name,
    leadEmail: lead.email,
    leadPhone: lead.phone,
    leadBusiness: lead.business,
    leadService: lead.service,
    leadMessage: lead.message,
    source: lead.source,
    waLink,
  });

  const dbPromise = db.notification.create({
    data: {
      type: "lead",
      title: `New Lead: ${lead.name}`,
      message: `${lead.name} (${lead.email}) submitted a ${lead.source} inquiry${
        lead.business ? ` from ${lead.business}` : ""
      }.`,
      metadata,
      status: "unread",
      actionUrl: "/admin/leads",
    },
  });

  const emailPromise = (async () => {
    const adminEmail = await getAdminNotifyEmail();
    return sendLeadNotificationEmail({
      to: adminEmail,
      lead: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        business: lead.business,
        service: lead.service,
        message: lead.message,
        source: lead.source,
      },
    });
  })();

  const pushPromise = sendPushNotification(lead);

  // Wait for all channels — each has its own error handling via allSettled
  // so no single failure blocks or crashes the others.
  const results = await Promise.allSettled([dbPromise, emailPromise, pushPromise]);

  // Log any failures (non-fatal — the lead is already saved)
  const [dbResult, emailResult, pushResult] = results;
  if (dbResult.status === "rejected") {
    console.error("[notification-service] DB notification create failed:", dbResult.reason);
  }
  if (emailResult.status === "rejected") {
    console.error("[notification-service] sendLeadNotificationEmail failed:", emailResult.reason);
  }
  if (pushResult.status === "rejected") {
    console.error("[notification-service] ntfy push failed:", pushResult.reason);
  }
}

/* ------------------------------------------------------------------ */
/* Convenience overloads for callers that don't have a Lead row yet   */
/* ------------------------------------------------------------------ */

/**
 * Send a notification for a non-lead event (e.g. newsletter signup, chat
 * conversion). Same fire-and-forget semantics as notifyNewLead.
 */
export async function notifyGeneric(args: {
  type: "newsletter" | "chat" | "report" | string;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
  actionUrl?: string;
}): Promise<void> {
  try {
    await db.notification.create({
      data: {
        type: args.type,
        title: args.title,
        message: args.message,
        metadata: args.metadata ? JSON.stringify(args.metadata) : null,
        status: "unread",
        actionUrl: args.actionUrl || null,
      },
    });
  } catch (err) {
    console.error("[notification-service] generic DB notification failed:", err);
  }
}
