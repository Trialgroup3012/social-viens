"use client";

import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppWidget from "./WhatsAppWidget";
import StickyCTA from "./StickyCTA";
import ExitIntentPopup from "./ExitIntentPopup";
import CookieConsent from "./CookieConsent";
import BackToTop from "./BackToTop";
import AIChatWidget from "./AIChatWidget";
import SocialProofPopup from "./SocialProofPopup";
import ScrollProgress from "./ScrollProgress";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export default function PageShell({
  children,
  breadcrumbs,
  hideBreadcrumbsOnMobile = true,
}: {
  children: React.ReactNode;
  breadcrumbs?: Crumb[];
  hideBreadcrumbsOnMobile?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-sv-bg">
      <ScrollProgress />
      <TopBar />
      <Navbar />
      <main className="flex-1 pt-32 md:pt-36">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className={`max-w-7xl mx-auto px-6 pt-6 ${hideBreadcrumbsOnMobile ? "hidden md:block" : ""}`}>
            <Breadcrumb>
              <BreadcrumbList className="text-sv-muted">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((crumb, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return (
                    <span key={i} className="contents">
                      <BreadcrumbSeparator className="text-gold/40" />
                      <BreadcrumbItem>
                        {isLast || !crumb.href ? (
                          <BreadcrumbPage className="text-gold">{crumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={crumb.href} className="hover:text-gold transition-colors">{crumb.label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </span>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}
        {children}
      </main>
      <Footer />
      <WhatsAppWidget />
      <StickyCTA />
      <ExitIntentPopup />
      <CookieConsent />
      <BackToTop />
      <AIChatWidget />
      <SocialProofPopup />
    </div>
  );
}
