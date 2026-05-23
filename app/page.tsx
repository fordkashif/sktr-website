import { MotionConfig } from "framer-motion";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EcosystemSection from "@/components/EcosystemSection";
import PlatformsSection from "@/components/PlatformsSection";
import ManifestoSection from "@/components/ManifestoSection";
import StatementSection from "@/components/StatementSection";
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
      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 pb-12">
        <ErrorBoundary>
          <EcosystemSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <PlatformsSection />
        </ErrorBoundary>
        <StatementSection />
        <ManifestoSection />
        <ContactSection />
        <Footer />
      </main>
      <ScrollToTop />
    </MotionConfig>
  );
}
