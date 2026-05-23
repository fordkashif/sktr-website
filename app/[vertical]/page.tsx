import { notFound } from "next/navigation";
import { getVertical, verticals } from "@/lib/verticals";
import VerticalPage from "./VerticalPage";
import type { Metadata } from "next";

const BASE_URL = "https://thesktr.com";

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

  const title = v.title;
  const ogTitle = `${v.title} | SKTR`;
  const description = v.description;
  const url = `${BASE_URL}/${v.slug}`;
  const ogImage = `${BASE_URL}/${v.slug}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: "SKTR",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: vertical.title,
    url: `${BASE_URL}/${vertical.slug}`,
    description: vertical.description,
    parentOrganization: {
      "@type": "Organization",
      name: "SKTR",
      url: BASE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VerticalPage vertical={vertical} />
    </>
  );
}
