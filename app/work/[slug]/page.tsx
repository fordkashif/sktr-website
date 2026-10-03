import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Shell, { PageHead, secondary } from "@/components/site/Shell";
import { Phone, Window } from "@/components/site/Frames";
import { getProject, projects } from "@/lib/projects";

const BASE_URL = "https://thesktr.com";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    alternates: { canonical: `/work/${project.slug}` },
    description: project.description,
    openGraph: { title: `${project.name} | SKTR`, description: project.description, url: `${BASE_URL}/work/${project.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const desktop = project.shots?.desktop ?? [];
  const phone = project.shots?.phone ?? [];
  const address = project.url?.replace("https://www.", "") ?? project.name;
  const next = projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length];

  const story = [
    { title: "The problem", text: project.problem },
    { title: "What we built", text: project.solution },
    { title: "The outcome", text: project.outcome },
  ];

  return (
    <Shell>
      <PageHead title={project.name} lead={project.tagline}>
        <Link href="/work" className="absolute left-5 top-6 inline-flex min-h-10 items-center gap-1.5 text-[0.9375rem] text-[var(--sk-muted)] hover:text-[var(--sk-ink)] md:left-8">
          <ArrowLeft size={16} aria-hidden="true" />
          All work
        </Link>
        <dl className="m-0 mt-10 grid max-w-[52rem] grid-cols-2 gap-x-8 gap-y-5 border-t border-[var(--sk-line)] pt-6 sm:grid-cols-4">
          <div>
            <dt className="text-[0.9375rem] text-[var(--sk-muted)]">Type</dt>
            <dd className="m-0 mt-1 text-[1.0625rem] font-semibold">{project.category}</dd>
          </div>
          <div>
            <dt className="text-[0.9375rem] text-[var(--sk-muted)]">Year</dt>
            <dd className="m-0 mt-1 text-[1.0625rem] font-semibold">{project.year}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[0.9375rem] text-[var(--sk-muted)]">Built with</dt>
            <dd className="m-0 mt-1 text-[1.0625rem] font-semibold">{project.tech.join(", ")}</dd>
          </div>
        </dl>
        {project.url && (
          <a href={project.url} target="_blank" rel="noreferrer" className={`${secondary} mt-8`}>
            Visit {address}
            <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
          </a>
        )}
      </PageHead>

      <section className="sk-wrap">
        <Window src={desktop[0]?.src} alt={desktop[0]?.alt} name={project.name} address={address} priority sizes="(min-width: 1200px) 1136px, 94vw" />
      </section>

      <section className="sk-wrap grid gap-10 py-20 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2 className="sk-h2 m-0 text-[clamp(2rem,4vw,3rem)]">Overview</h2>
        <p className="m-0 text-[clamp(1.25rem,2vw,1.5rem)] leading-relaxed">{project.overview}</p>
      </section>

      <section className="border-y border-[var(--sk-line)] bg-[var(--sk-panel)]">
        <div className="sk-wrap grid gap-10 py-20 md:py-28 lg:grid-cols-3 lg:gap-12">
          {story.map((s) => (
            <div key={s.title} className="border-t border-[var(--sk-line-strong)] pt-5">
              <h2 className="m-0 text-[1.625rem] font-semibold tracking-[-0.025em]">{s.title}</h2>
              <p className="m-0 mt-4 text-[1.125rem] leading-relaxed text-[var(--sk-muted)]">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {(desktop.length > 1 || phone.length > 0) && (
        <section aria-label="Screens" className="sk-wrap space-y-4 py-20 md:py-28">
          {phone.length > 0 && (
            <div className="grid grid-cols-3 gap-4 border border-[var(--sk-line)] bg-[var(--sk-panel)] px-5 py-10 md:gap-10 md:px-16 md:py-16">
              {phone.map((s) => (
                <div key={s.src} className="mx-auto w-full max-w-[250px]">
                  <Phone src={s.src} alt={s.alt} sizes="(min-width: 768px) 250px, 30vw" />
                </div>
              ))}
            </div>
          )}
          <div className="grid gap-4 lg:grid-cols-2">
            {desktop.slice(1).map((s, i, all) => (
              <div key={s.src} className={all.length % 2 === 1 && i === 0 ? "lg:col-span-2" : ""}>
                <Window src={s.src} alt={s.alt} address={address} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="sk-wrap pb-20 md:pb-28">
        <Link href={`/work/${next.slug}`} className="group flex items-center justify-between gap-6 border border-[var(--sk-line)] bg-[var(--sk-panel)] p-7 transition-colors hover:border-[var(--sk-line-strong)] md:p-10">
          <span>
            <span className="block text-[1.0625rem] text-[var(--sk-muted)]">Next case study</span>
            <span className="sk-h2 mt-2 block text-[clamp(1.875rem,4vw,3rem)]">{next.name}</span>
          </span>
          <ArrowRight size={32} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1.5" />
        </Link>
      </section>
    </Shell>
  );
}
