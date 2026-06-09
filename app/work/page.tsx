import type { Metadata } from "next";
import WorkClientPage from "@/components/labs/WorkClientPage";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from SKTR Labs — mobile apps, SaaS platforms, and custom software.",
  openGraph: {
    title: "Work — SKTR Labs",
    description:
      "Selected projects from SKTR Labs — mobile apps, SaaS platforms, and custom software.",
  },
};

export default function Page() {
  return <WorkClientPage />;
}
