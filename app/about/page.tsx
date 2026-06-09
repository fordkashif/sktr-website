import type { Metadata } from "next";
import AboutClientPage from "@/components/labs/AboutClientPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "SKTR Labs is a software studio. We design and build mobile apps, web platforms, SaaS products, and APIs — built to work.",
  openGraph: {
    title: "About — SKTR Labs",
    description:
      "SKTR Labs is a software studio. We design and build mobile apps, web platforms, SaaS products, and APIs.",
  },
};

export default function Page() {
  return <AboutClientPage />;
}
