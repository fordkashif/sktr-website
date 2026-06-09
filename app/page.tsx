import { MotionConfig } from "framer-motion";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import LabsHero from "@/components/labs/LabsHero";
import LabsTechStrip from "@/components/labs/LabsTechStrip";
import LabsServicesGrid from "@/components/labs/LabsServicesGrid";
import LabsFeaturedWork from "@/components/labs/LabsFeaturedWork";
import LabsProcess from "@/components/labs/LabsProcess";
import LabsCTABanner from "@/components/labs/LabsCTABanner";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <a
        href="#top"
        className="fixed top-[-100%] left-4 z-[100] bg-blue text-white px-4 py-2 mono text-[0.78rem] focus:top-4 transition-all duration-200"
      >
        Skip to content
      </a>
      <Header />
      <LabsHero />
      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 pb-12">
        <LabsTechStrip />
        <LabsServicesGrid />
        <LabsFeaturedWork />
        <LabsProcess />
        <LabsCTABanner />
        <Footer />
      </main>
      <ScrollToTop />
    </MotionConfig>
  );
}
