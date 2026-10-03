import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Shell, { PageHead } from "@/components/site/Shell";
import { Window } from "@/components/site/Frames";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  title: "Work",
  description: "Case studies from SKTR: websites, mobile apps, SaaS platforms and custom software.",
  openGraph: { title: "Work | SKTR", description: "Case studies from SKTR: websites, mobile apps, SaaS platforms and custom software." },
};

export default function Page() {
  return (
    <Shell>
      <PageHead title="Work" lead="What we have designed and built, for clients and as our own products." />
      <section aria-label="Case studies" className="sk-wrap grid gap-4 pb-24 md:pb-32 lg:grid-cols-2">
        {projects.map((p, i) => {
          const shot = p.shots?.desktop?.[0];
          return (
            <article
              key={p.slug}
              className={`group relative overflow-hidden border border-[var(--sk-line)] bg-[var(--sk-panel)] transition-colors hover:border-[var(--sk-line-strong)] ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <div className={i === 0 ? "grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr]" : ""}>
                <div className="p-7 md:p-10">
                  <p className="m-0 text-[1.0625rem] text-[var(--sk-muted)]">
                    {p.category}, {p.year}
                  </p>
                  <h2 className="sk-h2 m-0 mt-3 text-[clamp(2rem,3.6vw,3rem)]">{p.name}</h2>
                  <p className="m-0 mt-3 max-w-md text-[1.1875rem] leading-relaxed text-[var(--sk-muted)]">{p.tagline}</p>
                  <Link href={`/work/${p.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-[1.0625rem] font-semibold text-[var(--sk-blue)] after:absolute after:inset-0 hover:underline">
                    Read the case study
                    <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                  </Link>
                </div>
                <div className={i === 0 ? "-mb-[6%] ml-7 lg:-mr-[5%] lg:ml-0 lg:mt-10" : "-mb-[10%] ml-7 md:ml-10"}>
                  <Window src={shot?.src} alt={shot?.alt} name={p.name} address={p.url?.replace("https://www.", "") ?? p.name} priority={i === 0} />
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </Shell>
  );
}
