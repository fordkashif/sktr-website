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
  return {
    title: v.title,
    description: v.description,
    openGraph: {
      title: `${v.title} | SKTR`,
      description: v.description,
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
