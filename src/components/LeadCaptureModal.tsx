"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  User,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Download,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  url?: string;
  analysisData?: any;
  scores?: any;
  /** Optional extra context label shown under the title */
  subtitle?: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function LeadCaptureModal({
  isOpen,
  onClose,
  toolName,
  url,
  analysisData,
  scores,
  subtitle,
}: LeadCaptureModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [emailPreviewUrl, setEmailPreviewUrl] = useState<string | undefined>();
  const [emailSent, setEmailSent] = useState<boolean>(true);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "submitting") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, status]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen && status !== "idle") {
      const t = setTimeout(() => {
        setStatus("idle");
        setErrorMsg("");
        setWhatsappUrl("");
        setEmailPreviewUrl(undefined);
        setName("");
        setPhone("");
        setEmail("");
      }, 250);
      return () => clearTimeout(t);
    }
  }, [isOpen, status]);

  const validate = useCallback(() => {
    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return false;
    }
    if (phone.trim() && !/^[\d\s+()-]{7,20}$/.test(phone.trim())) {
      setErrorMsg("Please enter a valid phone number.");
      return false;
    }
    return true;
  }, [name, email, phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          url,
          toolName,
          analysisData,
          scores,
          source: `modal-${toolName}`.toLowerCase().replace(/\s+/g, "-"),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setWhatsappUrl(data.whatsappUrl || "");
        setEmailPreviewUrl(data.emailPreviewUrl);
        setEmailSent(data.emailSent !== false);
        if (data.emailSent === false && data.emailError) {
          // Soft-warning — we still surface success because the lead was saved + PDF generated
          console.warn("[LeadCaptureModal] email send failed:", data.emailError);
        }
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Network error. Please try again."
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMsg("");
    setWhatsappUrl("");
    setEmailPreviewUrl(undefined);
  };

  /* ---------- Render ---------- */

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => status !== "submitting" && onClose()}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-[#00FF88]/40 bg-[#0a0a0a] shadow-[0_0_40px_rgba(0,255,136,0.15)]"
            initial={{ y: "100%", opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#00FF88] to-transparent" />

            {/* Close button */}
            <button
              type="button"
              onClick={() => status !== "submitting" && onClose()}
              disabled={status === "submitting"}
              className="absolute top-3 right-3 p-2 rounded-lg text-sv-muted hover:text-cream hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-7">
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/5 text-[#00FF88] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                  <FileText className="w-3 h-3" />
                  Free PDF Report
                </div>
                <h2
                  id="lead-modal-title"
                  className="text-xl sm:text-2xl font-bold text-cream mb-1.5 leading-tight"
                >
                  Get My Free Report
                </h2>
                <p className="text-sm text-sv-muted leading-relaxed">
                  {subtitle ||
                    `We'll email you a detailed PDF of your ${toolName} results — scores, checks, and actionable recommendations.`}
                </p>
                {url && (
                  <p className="mt-2 text-[11px] font-mono text-[#00FF88]/70 truncate">
                    URL: {url}
                  </p>
                )}
              </div>

              {/* Body — switched by status */}
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-center py-4"
                  >
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", damping: 14, stiffness: 280, delay: 0.05 }}
                      className="w-16 h-16 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/40 flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle2 className="w-9 h-9 text-[#00FF88]" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-cream mb-1">
                      Report Sent to Your Email!
                    </h3>
                    <p className="text-sm text-sv-muted leading-relaxed mb-5">
                      Check <span className="text-cream font-medium">{email}</span> for your{" "}
                      <span className="text-[#00FF88]">{toolName}</span> PDF report. It should
                      arrive within 2&ndash;5 minutes.
                    </p>

                    {/* Soft warning if email backend used fallback */}
                    {!emailSent && (
                      <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-left">
                        <p className="text-xs text-amber-300 leading-relaxed">
                          <AlertCircle className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
                          Our email gateway reported a temporary issue — your lead was saved and
                          our team will manually email your report within 24 hours.
                        </p>
                      </div>
                    )}

                    {/* Email preview link (Ethereal only) */}
                    {emailPreviewUrl && (
                      <a
                        href={emailPreviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-3 inline-flex items-center gap-1.5 text-[11px] text-sv-muted hover:text-[#00FF88] underline underline-offset-2"
                      >
                        <Download className="w-3 h-3" />
                        View test email preview (dev mode)
                      </a>
                    )}

                    <div className="flex flex-col gap-2">
                      {whatsappUrl && (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neon-btn w-full px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Open WhatsApp for Instant Follow-up
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-xs text-sv-muted hover:text-cream transition-colors py-1"
                      >
                        Send to another email
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    onSubmit={handleSubmit}
                    className="space-y-3"
                  >
                    {/* Name */}
                    <div className="relative">
                      <label
                        htmlFor="lead-name"
                        className="block text-[10px] font-bold uppercase tracking-wider text-[#00FF88]/80 mb-1.5"
                      >
                        Full Name <span className="text-[#FF4D5E]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00FF88]/50 pointer-events-none" />
                        <input
                          id="lead-name"
                          type="text"
                          autoComplete="name"
                          placeholder="Jane Doe"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errorMsg) setErrorMsg("");
                          }}
                          className="terminal-input w-full pl-10 pr-3 py-3 rounded-lg text-cream text-sm"
                          disabled={status === "submitting"}
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <label
                        htmlFor="lead-phone"
                        className="block text-[10px] font-bold uppercase tracking-wider text-[#00FF88]/80 mb-1.5"
                      >
                        Phone (WhatsApp)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00FF88]/50 pointer-events-none" />
                        <input
                          id="lead-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+91 81780 04800"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errorMsg) setErrorMsg("");
                          }}
                          className="terminal-input w-full pl-10 pr-3 py-3 rounded-lg text-cream text-sm"
                          disabled={status === "submitting"}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label
                        htmlFor="lead-email"
                        className="block text-[10px] font-bold uppercase tracking-wider text-[#00FF88]/80 mb-1.5"
                      >
                        Email <span className="text-[#FF4D5E]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00FF88]/50 pointer-events-none" />
                        <input
                          id="lead-email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errorMsg) setErrorMsg("");
                          }}
                          className="terminal-input w-full pl-10 pr-3 py-3 rounded-lg text-cream text-sm"
                          disabled={status === "submitting"}
                          required
                        />
                      </div>
                    </div>

                    {/* Error message */}
                    <AnimatePresence>
                      {errorMsg && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-[#FF4D5E] flex items-start gap-1.5 pt-1">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                            <span>{errorMsg}</span>
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="neon-btn w-full px-4 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-2"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating PDF &amp; Sending…
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4" />
                          Get My Free Report
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-sv-muted/60 text-center pt-1 leading-relaxed">
                      By submitting, you agree to receive your report and occasional growth tips
                      from SOCIAL VIENS. No spam, unsubscribe anytime.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LeadCaptureModal;
