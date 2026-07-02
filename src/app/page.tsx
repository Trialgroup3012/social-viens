import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/layout/WhatsAppWidget";
import StickyCTA from "@/components/layout/StickyCTA";
import ExitIntentPopup from "@/components/layout/ExitIntentPopup";
import CookieConsent from "@/components/layout/CookieConsent";
import BackToTop from "@/components/layout/BackToTop";
import AIChatWidget from "@/components/layout/AIChatWidget";
import SocialProofPopup from "@/components/layout/SocialProofPopup";
import Preloader from "@/components/layout/Preloader";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Hero from "@/components/sections/Hero";
import VideoShowreel from "@/components/sections/VideoShowreel";
import StatsTicker from "@/components/sections/StatsTicker";
import ClientLogoWall from "@/components/sections/ClientLogoWall";
import Partners from "@/components/sections/Partners";
import FreeAudit from "@/components/sections/FreeAudit";
import Services from "@/components/sections/Services";
import AnalysisLab from "@/components/sections/AnalysisLab";
import DeepScan from "@/components/sections/DeepScan";
import Transformation from "@/components/sections/Transformation";
import CaseStudies from "@/components/sections/CaseStudies";
import Portfolio from "@/components/sections/Portfolio";
import Industries from "@/components/sections/Industries";
import LocationServices from "@/components/sections/LocationServices";
import WhySocialViens from "@/components/sections/WhySocialViens";
// Team section temporarily hidden — will be re-added later
// import Team from "@/components/sections/Team";
import Awards from "@/components/sections/Awards";
import Comparison from "@/components/sections/Comparison";
import ROICalculator from "@/components/sections/ROICalculator";
import Process from "@/components/sections/Process";
import CustomerJourney from "@/components/sections/CustomerJourney";
import Results from "@/components/sections/Results";
import GrowthMetrics from "@/components/sections/GrowthMetrics";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import InsightsHub from "@/components/sections/InsightsHub";
import FAQ from "@/components/sections/FAQ";
import ScheduleCall from "@/components/sections/ScheduleCall";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <Preloader>
      <div className="min-h-screen flex flex-col bg-sv-bg">
        <ScrollProgress />
        <TopBar />
        <Navbar />
        <main className="flex-1">
          <Hero />
          <VideoShowreel />
          <StatsTicker />
          <ClientLogoWall />
          <Partners />
          <FreeAudit />
          <Services />
          <AnalysisLab />
          <DeepScan />
          <Transformation />
          <CaseStudies />
          <Portfolio />
          <Industries />
          <LocationServices />
          <WhySocialViens />
          {/* Team section temporarily hidden — will be re-added later */}
          {/* <Team /> */}
          <Awards />
          <Comparison />
          <Process />
          <CustomerJourney />
          <Results />
          <GrowthMetrics />
          <Pricing />
          <ROICalculator />
          <Testimonials />
          <InsightsHub />
          <FAQ />
          <ScheduleCall />
          <FinalCTA />
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
    </Preloader>
  );
}
