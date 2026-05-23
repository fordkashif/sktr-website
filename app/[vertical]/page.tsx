import { notFound } from "next/navigation";
import { getVertical, verticals } from "@/lib/verticals";
import VerticalPage from "./VerticalPage";
import type { Metadata } from "next";

export function generateStaticParams() {
  return verticals.map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}): Promise<Metadata> {
  const { vertical: slug } = await params;
  const v = getVertical(slug);
  if (!v) return {};
  const ogDescription = `${v.storyCopy} — Part of the SKTR ecosystem.`;
  return {
    title: v.title,
    description: ogDescription,
    openGraph: {
      title: `${v.title} | SKTR`,
      description: ogDescription,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical: slug } = await params;
  const vertical = getVertical(slug);
  if (!vertical) notFound();
  return <VerticalPage vertical={vertical} />;
}
