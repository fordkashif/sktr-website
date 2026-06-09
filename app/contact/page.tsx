import type { Metadata } from "next";
import ContactClientPage from "@/components/labs/ContactClientPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with SKTR Labs. Tell us what you're building — mobile app, web platform, SaaS product, or API.",
  openGraph: {
    title: "Contact — SKTR Labs",
    description:
      "Start a project with SKTR Labs. Tell us what you're building.",
  },
};

export default function Page() {
  return <ContactClientPage />;
}
