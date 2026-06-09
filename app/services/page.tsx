import type { Metadata } from "next";
import ServicesClientPage from "@/components/labs/ServicesClientPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Mobile app development, web platforms, SaaS products, UI/UX design, APIs, and MVP builds. Full breakdown of what SKTR Labs builds and how.",
  openGraph: {
    title: "Services — SKTR Labs",
    description:
      "Mobile apps, web platforms, SaaS products, APIs, and more. See what SKTR Labs builds.",
  },
};

export default function Page() {
  return <ServicesClientPage />;
}
