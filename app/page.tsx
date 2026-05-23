import { MotionConfig } from "framer-motion";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import EcosystemSection from "@/components/EcosystemSection";
import PlatformsSection from "@/components/PlatformsSection";
import InnovationSection from "@/components/InnovationSection";
import ThinkingSection from "@/components/ThinkingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <a
        href="#ecosystem"
        className="fixed top-[-100%] left-4 z-[100] bg-blue text-white px-4 py-2 mono text-[0.78rem] focus:top-4 transition-all duration-200"
      >
        Skip to content
      </a>
      <Header />
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <StatsSection />
      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 pb-12">
        <ErrorBoundary>
          <EcosystemSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <PlatformsSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <InnovationSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <ThinkingSection />
        </ErrorBoundary>
        <ContactSection />
        <Footer />
      </main>
      <ScrollToTop />
    </MotionConfig>
  );
}
