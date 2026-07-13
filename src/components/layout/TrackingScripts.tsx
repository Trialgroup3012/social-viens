"use client";

import { useEffect } from "react";

type TrackingConfig = {
  gtm_container_id?: string;
  ga_measurement_id?: string;
  google_site_verification?: string;
  meta_pixel_id?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function loadScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function addSearchConsoleVerification(token: string) {
  if (document.querySelector('meta[name="google-site-verification"]')) return;
  const meta = document.createElement("meta");
  meta.name = "google-site-verification";
  meta.content = token;
  document.head.appendChild(meta);
}

function initialise(config: TrackingConfig) {
  if (config.google_site_verification) {
    addSearchConsoleVerification(config.google_site_verification);
  }

  if (config.gtm_container_id) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    loadScript("sv-gtm", `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.gtm_container_id)}`);
  } else if (config.ga_measurement_id) {
    loadScript("sv-ga4", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.ga_measurement_id)}`);
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag("js", new Date());
    window.gtag("config", config.ga_measurement_id, { anonymize_ip: true });
  }

  if (config.meta_pixel_id && !window.fbq) {
    const fbq = (...args: unknown[]) => fbq.callMethod?.(...args) ?? fbq.queue.push(args);
    fbq.queue = [] as unknown[];
    fbq.callMethod = undefined as ((...args: unknown[]) => void) | undefined;
    window.fbq = fbq;
    window._fbq = fbq;
    fbq("init", config.meta_pixel_id);
    fbq("track", "PageView");
    loadScript("sv-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
  }
}

export default function TrackingScripts() {
  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      if (localStorage.getItem("sv-cookie-consent") !== "accepted") return;
      try {
        const response = await fetch("/api/public/tracking", { cache: "force-cache" });
        const data = await response.json();
        if (!cancelled && data.tracking) initialise(data.tracking as TrackingConfig);
      } catch {
        // Analytics must never interrupt the visitor experience.
      }
    };

    void start();
    window.addEventListener("sv-consent-change", start);
    return () => {
      cancelled = true;
      window.removeEventListener("sv-consent-change", start);
    };
  }, []);

  return null;
}
