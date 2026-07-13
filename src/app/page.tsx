import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/layout/WhatsAppWidget";
import StickyCTA from "@/components/layout/StickyCTA";
import CookieConsent from "@/components/layout/CookieConsent";
import BackToTop from "@/components/layout/BackToTop";
import AIChatWidget from "@/components/layout/AIChatWidget";
import Hero from "@/components/sections/Hero";
import StatsTicker from "@/components/sections/StatsTicker";
import ClientLogoWall from "@/components/sections/ClientLogoWall";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import WhySocialViens from "@/components/sections/WhySocialViens";
import Process from "@/components/sections/Process";
import Results from "@/components/sections/Results";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-sv-bg">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsTicker />
        <ClientLogoWall />
        <Services />
        <CaseStudies />
        <WhySocialViens />
        <Process />
        <Results />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppWidget />
      <StickyCTA />
      <CookieConsent />
      <BackToTop />
      <AIChatWidget />
    </div>
  );
}
