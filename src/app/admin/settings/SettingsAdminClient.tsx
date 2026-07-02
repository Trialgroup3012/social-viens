"use client";

import { useState, useEffect } from "react";
import {
  Save,
  RotateCcw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Bot,
  Mail,
  Settings as SettingsIcon,
  Eye,
  EyeOff,
  Zap,
  Send,
  Sparkles,
  ShieldCheck,
  Info,
} from "lucide-react";
import { toast } from "sonner";

interface SettingItem {
  key: string;
  value: string;
}

/* ------------------------------------------------------------------ */
/* Tab definitions                                                    */
/* ------------------------------------------------------------------ */

type TabKey = "site" | "chatbot" | "smtp";

const TABS: Array<{
  key: TabKey;
  label: string;
  icon: typeof Bot;
  desc: string;
}> = [
  {
    key: "site",
    label: "Site Configuration",
    icon: SettingsIcon,
    desc: "Site name, contact info, social links",
  },
  {
    key: "chatbot",
    label: "Chatbot AI API",
    icon: Bot,
    desc: "Choose AI provider & paste API key",
  },
  {
    key: "smtp",
    label: "Email / SMTP",
    icon: Mail,
    desc: "Gmail app password or business mail SMTP",
  },
];

/* ------------------------------------------------------------------ */
/* Field configs per tab                                              */
/* ------------------------------------------------------------------ */

const SITE_FIELDS: Record<string, { label: string; type: "text" | "textarea" }> = {
  siteName: { label: "Site Name", type: "text" },
  tagline: { label: "Tagline", type: "text" },
  phone: { label: "Phone Number", type: "text" },
  email: { label: "Email Address", type: "text" },
  address: { label: "Address", type: "text" },
  hours: { label: "Business Hours", type: "text" },
  instagram: { label: "Instagram URL", type: "text" },
  linkedin: { label: "LinkedIn URL", type: "text" },
  facebook: { label: "Facebook URL", type: "text" },
};

const SMTP_PRESETS: Array<{
  id: string;
  label: string;
  host: string;
  port: string;
  secure: string;
  hint: string;
}> = [
  {
    id: "gmail",
    label: "Gmail (App Password)",
    host: "smtp.gmail.com",
    port: "465",
    secure: "true",
    hint: "Use your Gmail address + a 16-char App Password (enable 2FA first → Google Account → Security → App passwords).",
  },
  {
    id: "hostinger",
    label: "Hostinger Business Email",
    host: "smtp.hostinger.com",
    port: "465",
    secure: "true",
    hint: "Use your full business email (e.g. info@socialviens.in) + the mailbox password from hPanel.",
  },
  {
    id: "outlook",
    label: "Outlook / Hotmail",
    host: "smtp-mail.outlook.com",
    port: "587",
    secure: "false",
    hint: "Use your Outlook email + password (App Password if 2FA is enabled).",
  },
  {
    id: "zoho",
    label: "Zoho Mail",
    host: "smtp.zoho.com",
    port: "465",
    secure: "true",
    hint: "Use your Zoho email + App-specific password.",
  },
  {
    id: "sendgrid",
    label: "SendGrid (API)",
    host: "smtp.sendgrid.net",
    port: "587",
    secure: "false",
    hint: "Username: 'apikey'. Password: your SendGrid API key.",
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function SettingsAdminClient() {
  const [activeTab, setActiveTab] = useState<TabKey>("site");
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState<null | "ai" | "smtp">(null);
  const [showAiKey, setShowAiKey] = useState(false);
  const [showSmtpPass, setShowSmtpPass] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, string> = {};
        if (data.settings) {
          data.settings.forEach((s: SettingItem) => {
            map[s.key] = s.value;
          });
        } else if (typeof data === "object") {
          Object.entries(data).forEach(([k, v]) => {
            if (typeof v === "string") map[k] = v;
          });
        }
        setSettings(map);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load settings");
        setLoading(false);
      });
  }, []);

  function handleSave() {
    setSaving(true);
    fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Settings saved successfully");
        setSaving(false);
      })
      .catch(() => {
        toast.error("Failed to save settings");
        setSaving(false);
      });
  }

  async function handleTest(type: "ai" | "smtp") {
    setTesting(type);
    try {
      // Save first so the test endpoint reads the latest values
      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      const res = await fetch("/api/admin/settings/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Connection successful!");
      } else {
        toast.error(data.message || "Connection failed");
      }
    } catch (err) {
      toast.error("Test request failed");
    } finally {
      setTesting(null);
    }
  }

  function applySmtpPreset(presetId: string) {
    const preset = SMTP_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setSettings((s) => ({
      ...s,
      smtp_host: preset.host,
      smtp_port: preset.port,
      smtp_secure: preset.secure,
    }));
    toast.info(`Preset applied: ${preset.label}`);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Helpers                                                          */
  /* ---------------------------------------------------------------- */

  function setField(key: string, value: string) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  const aiProvider = settings.ai_provider || "none";
  const activePreset = SMTP_PRESETS.find(
    (p) => p.host === settings.smtp_host && p.port === settings.smtp_port
  );

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-[#D4AF37]" />
            Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage site config, chatbot AI provider, and email/SMTP credentials
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#D4AF37] text-white rounded-lg hover:bg-[#F5D680] transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-left p-4 rounded-xl border transition-all ${
                active
                  ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-sm"
                  : "border-border bg-card hover:border-[#D4AF37]/40 hover:bg-muted/40"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${active ? "text-[#D4AF37]" : "text-muted-foreground"}`} />
                <span className={`font-semibold text-sm ${active ? "text-foreground" : "text-muted-foreground"}`}>
                  {tab.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{tab.desc}</p>
            </button>
          );
        })}
      </div>

      {/* ===================== SITE CONFIG TAB ===================== */}
      {activeTab === "site" && (
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <SettingsIcon className="h-5 w-5 text-[#D4AF37]" />
            <h2 className="text-lg font-semibold">Site Configuration</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            These values appear across the website (header, footer, contact sections).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(SITE_FIELDS).map(([key, config]) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium text-foreground">{config.label}</label>
                {config.type === "textarea" ? (
                  <textarea
                    value={settings[key] || ""}
                    onChange={(e) => setField(key, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                ) : (
                  <input
                    type="text"
                    value={settings[key] || ""}
                    onChange={(e) => setField(key, e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-start gap-3">
            <Info className="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Admin Notification Email</p>
              <p>
                Lead notifications are sent to{" "}
                <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">
                  {settings.admin_notify_email || settings.email || "socialviens@gmail.com"}
                </code>
                . Add a dedicated{" "}
                <code className="px-1 py-0.5 rounded bg-muted">admin_notify_email</code>{" "}
                setting below to override.
              </p>
              <input
                type="email"
                placeholder="admin_notify_email (e.g. leads@socialviens.in)"
                value={settings.admin_notify_email || ""}
                onChange={(e) => setField("admin_notify_email", e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ===================== CHATBOT API TAB ===================== */}
      {activeTab === "chatbot" && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-5 w-5 text-[#D4AF37]" />
              <h2 className="text-lg font-semibold">Chatbot AI Provider</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Choose your AI provider and paste the API key. The website chatbot will use
              this to talk to your visitors. No code changes or redeploy needed.
            </p>

            {/* Provider selection — numbered list 1, 2, 3 */}
            <label className="text-sm font-medium text-foreground mb-3 block">
              1. Select AI Provider
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              <ProviderOption
                number={1}
                value="openai"
                currentValue={aiProvider}
                onChange={(v) => setField("ai_provider", v)}
                title="OpenAI"
                badge="GPT-4o"
                desc="Best quality. Paid. $0.15 / 1M tokens (gpt-4o-mini)."
                icon={<Sparkles className="h-4 w-4" />}
              />
              <ProviderOption
                number={2}
                value="gemini"
                currentValue={aiProvider}
                onChange={(v) => setField("ai_provider", v)}
                title="Google Gemini"
                badge="FREE tier"
                desc="Generous free tier. Gemini 1.5 Flash is fast & cheap."
                icon={<Zap className="h-4 w-4" />}
              />
              <ProviderOption
                number={3}
                value="zai"
                currentValue={aiProvider}
                onChange={(v) => setField("ai_provider", v)}
                title="Z.AI (sandbox only)"
                badge="internal"
                desc="Only works in this dev sandbox. Not for production."
                icon={<ShieldCheck className="h-4 w-4" />}
              />
            </div>

            {/* API Key */}
            <label className="text-sm font-medium text-foreground mb-2 block">
              2. Enter API Key
            </label>
            <div className="relative mb-2">
              <input
                type={showAiKey ? "text" : "password"}
                value={settings.ai_api_key || ""}
                onChange={(e) => setField("ai_api_key", e.target.value)}
                placeholder={
                  aiProvider === "openai"
                    ? "sk-proj-xxxxxxxxxxxxxxxxxxxx"
                    : aiProvider === "gemini"
                    ? "AIzaSyXXXXXXXXXXXXXXXXXXXX"
                    : "Z.AI API key (sandbox only)"
                }
                className="w-full px-3 py-2 pr-10 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37] font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowAiKey((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                aria-label={showAiKey ? "Hide key" : "Show key"}
              >
                {showAiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-5">
              {aiProvider === "openai" && (
                <>
                  Get your key from{" "}
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] underline hover:no-underline"
                  >
                    platform.openai.com/api-keys
                  </a>
                  . Requires a paid OpenAI account with billing set up.
                </>
              )}
              {aiProvider === "gemini" && (
                <>
                  Get your FREE key from{" "}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] underline hover:no-underline"
                  >
                    aistudio.google.com/app/apikey
                  </a>
                  . Free tier: 15 req/min, 1500/day.
                </>
              )}
              {aiProvider === "zai" && (
                <span className="text-amber-600 dark:text-amber-400">
                  ⚠ This provider only works in the Z.ai sandbox. It will NOT work on
                  Vercel/Hostinger. Use OpenAI or Gemini for production.
                </span>
              )}
              {aiProvider === "none" && (
                <span className="text-amber-600 dark:text-amber-400">
                  Select a provider above first.
                </span>
              )}
            </p>

            {/* Model */}
            <label className="text-sm font-medium text-foreground mb-2 block">
              3. Model Name (optional — defaults shown)
            </label>
            <input
              type="text"
              value={settings.ai_model || ""}
              onChange={(e) => setField("ai_model", e.target.value)}
              placeholder={
                aiProvider === "openai"
                  ? "gpt-4o-mini"
                  : aiProvider === "gemini"
                  ? "gemini-1.5-flash"
                  : "auto"
              }
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37] font-mono text-sm mb-4"
            />

            {/* Test button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <button
                onClick={() => handleTest("ai")}
                disabled={testing === "ai"}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/10 transition-colors disabled:opacity-50"
              >
                {testing === "ai" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
                Test AI Connection
              </button>
              <p className="text-xs text-muted-foreground self-center">
                Saves settings first, then sends a tiny test prompt to verify the key works.
              </p>
            </div>
          </div>

          {/* Help box */}
          <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-5 flex items-start gap-3">
            <Info className="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-1.5">
              <p className="font-medium text-foreground">How the chatbot uses this config</p>
              <ul className="list-disc list-inside space-y-1 ml-1">
                <li>The AI provider is read from the database on every chat message.</li>
                <li>Config is cached for 30 seconds — changes take effect within 30s.</li>
                <li>API keys are stored in the <code className="px-1 py-0.5 rounded bg-muted">SiteSetting</code> table.</li>
                <li>If no key is set, the bot replies with a fallback message pointing visitors to your phone/email.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SMTP / EMAIL TAB ===================== */}
      {activeTab === "smtp" && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-[#D4AF37]" />
              <h2 className="text-lg font-semibold">Email / SMTP Configuration</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Used for lead notification emails (to you) and PDF report emails (to clients).
              Pick a preset or enter custom SMTP details.
            </p>

            {/* SMTP Presets */}
            <label className="text-sm font-medium text-foreground mb-3 block">
              1. Quick Preset (optional)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
              {SMTP_PRESETS.map((preset) => {
                const isActive = activePreset?.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => applySmtpPreset(preset.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isActive
                        ? "border-[#D4AF37] bg-[#D4AF37]/10"
                        : "border-border bg-background hover:border-[#D4AF37]/40"
                    }`}
                  >
                    <span className={`text-xs font-semibold block ${isActive ? "text-[#D4AF37]" : "text-foreground"}`}>
                      {preset.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {preset.host}:{preset.port}
                    </span>
                  </button>
                );
              })}
            </div>

            {activePreset && (
              <div className="mb-6 p-3 rounded-lg bg-muted/50 border border-border flex items-start gap-2">
                <Info className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">{activePreset.hint}</p>
              </div>
            )}

            {/* SMTP fields */}
            <label className="text-sm font-medium text-foreground mb-3 block">
              2. SMTP Server Details
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs text-muted-foreground">SMTP Host</label>
                <input
                  type="text"
                  value={settings.smtp_host || ""}
                  onChange={(e) => setField("smtp_host", e.target.value)}
                  placeholder="smtp.gmail.com"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37] font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Port</label>
                <input
                  type="text"
                  value={settings.smtp_port || ""}
                  onChange={(e) => setField("smtp_port", e.target.value)}
                  placeholder="465"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37] font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Secure (SSL/TLS)</label>
                <select
                  value={settings.smtp_secure || "true"}
                  onChange={(e) => setField("smtp_secure", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="true">true (port 465 — SSL)</option>
                  <option value="false">false (port 587 — STARTTLS)</option>
                </select>
              </div>
            </div>

            <label className="text-sm font-medium text-foreground mb-3 block">
              3. Authentication
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Username / Email</label>
                <input
                  type="text"
                  value={settings.smtp_user || ""}
                  onChange={(e) => setField("smtp_user", e.target.value)}
                  placeholder="socialviens@gmail.com  OR  info@socialviens.in"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">
                  Password / App Password
                </label>
                <div className="relative">
                  <input
                    type={showSmtpPass ? "text" : "password"}
                    value={settings.smtp_pass || ""}
                    onChange={(e) => setField("smtp_pass", e.target.value)}
                    placeholder="16-char App Password (no spaces)"
                    className="w-full px-3 py-2 pr-10 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37] font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSmtpPass((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                    aria-label={showSmtpPass ? "Hide password" : "Show password"}
                  >
                    {showSmtpPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <label className="text-sm font-medium text-foreground mb-3 block">
              4. From Address (optional)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">From Name</label>
                <input
                  type="text"
                  value={settings.smtp_from_name || ""}
                  onChange={(e) => setField("smtp_from_name", e.target.value)}
                  placeholder="SOCIAL VIENS"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">From Email</label>
                <input
                  type="email"
                  value={settings.smtp_from_email || ""}
                  onChange={(e) => setField("smtp_from_email", e.target.value)}
                  placeholder="socialviens@gmail.com  (defaults to username)"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            {/* Test SMTP button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <button
                onClick={() => handleTest("smtp")}
                disabled={testing === "smtp"}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/10 transition-colors disabled:opacity-50"
              >
                {testing === "smtp" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Test SMTP Connection
              </button>
              <p className="text-xs text-muted-foreground self-center">
                Saves settings first, then verifies the SMTP server accepts your credentials.
              </p>
            </div>
          </div>

          {/* Help box */}
          <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-5 flex items-start gap-3">
            <Info className="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">Gmail App Password — quick steps</p>
              <ol className="list-decimal list-inside space-y-1 ml-1">
                <li>Enable 2-Step Verification on your Google Account.</li>
                <li>
                  Visit{" "}
                  <a
                    href="https://myaccount.google.com/apppasswords"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] underline hover:no-underline"
                  >
                    myaccount.google.com/apppasswords
                  </a>
                </li>
                <li>Create an app password (select "Mail" + your device).</li>
                <li>Copy the 16-character password (ignore spaces) → paste above.</li>
                <li>Username = your full Gmail address.</li>
              </ol>
              <p className="text-xs pt-1">
                💡 For business mail (info@socialviens.in on Hostinger), use the mailbox
                password directly — no App Password needed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Provider option card (1, 2, 3 numbered list)                       */
/* ------------------------------------------------------------------ */

function ProviderOption({
  number,
  value,
  currentValue,
  onChange,
  title,
  badge,
  desc,
  icon,
}: {
  number: number;
  value: string;
  currentValue: string;
  onChange: (v: string) => void;
  title: string;
  badge: string;
  desc: string;
  icon: React.ReactNode;
}) {
  const selected = currentValue === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`relative text-left p-4 rounded-xl border-2 transition-all ${
        selected
          ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-sm"
          : "border-border bg-background hover:border-[#D4AF37]/40 hover:bg-muted/40"
      }`}
    >
      {/* Number badge */}
      <div
        className={`absolute -top-3 -left-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
          selected ? "bg-[#D4AF37] text-white" : "bg-muted text-muted-foreground border border-border"
        }`}
      >
        {number}
      </div>

      <div className="flex items-start justify-between gap-2 mb-2">
        <div
          className={`flex items-center gap-2 ${
            selected ? "text-[#D4AF37]" : "text-foreground"
          }`}
        >
          {icon}
          <span className="font-semibold text-sm">{title}</span>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            value === "gemini"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : value === "zai"
              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
          }`}
        >
          {badge}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>

      {selected && (
        <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-[#D4AF37]">
          <CheckCircle2 className="h-3 w-3" />
          Selected
        </div>
      )}
    </button>
  );
}
