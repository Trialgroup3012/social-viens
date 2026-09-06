import { NextRequest, NextResponse } from "next/server";
import { createChatCompletion, getAIProviderConfig } from "@/lib/ai-provider";
import { getAdminSession } from "@/lib/admin-auth";
import { getSettingValues } from "@/lib/secure-settings";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const type = body?.type;

  if (type === "ai") {
    const config = await getAIProviderConfig();
    if (config.provider === "none" || !config.apiKey) {
      return NextResponse.json({ success: false, message: "Add an AI provider and API key first." }, { status: 400 });
    }
    const result = await createChatCompletion([{ role: "user", content: "Reply with: Connection verified." }]);
    if (result.error) {
      return NextResponse.json({ success: false, message: "AI connection could not be verified." }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: `${config.provider} is connected.` });
  }

  if (type === "smtp") {
    const settings = await getSettingValues([
      "smtp_host",
      "smtp_port",
      "smtp_secure",
      "smtp_user",
      "smtp_pass",
    ]);
    const port = Number(settings.smtp_port);
    if (!settings.smtp_host || !settings.smtp_user || !settings.smtp_pass || !Number.isInteger(port)) {
      return NextResponse.json({ success: false, message: "Complete the SMTP host, port, username and password first." }, { status: 400 });
    }

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: settings.smtp_host,
      port,
      secure: settings.smtp_secure === "true",
      auth: { user: settings.smtp_user, pass: settings.smtp_pass },
    });
    await transporter.verify();
    return NextResponse.json({ success: true, message: "SMTP connection verified." });
  }

  return NextResponse.json({ success: false, message: "Unsupported connection test." }, { status: 400 });
}
