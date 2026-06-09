import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/lib/projects";
import WorkDetailClientPage from "@/components/labs/WorkDetailClientPage";

const BASE_URL = "https://thesktr.com";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} — SKTR Labs`,
      description: project.description,
      url: `${BASE_URL}/work/${project.slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <WorkDetailClientPage project={project} />;
}
