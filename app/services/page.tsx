import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import Shell, { PageHead } from "@/components/site/Shell";
import { services } from "@/lib/services-data";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description: "Mobile apps, web platforms, SaaS products, UI/UX design, APIs, MVPs and ongoing support from SKTR.",
  openGraph: { title: "Services | SKTR", description: "Mobile apps, web platforms, SaaS products, UI/UX design, APIs, MVPs and ongoing support." },
};

export default function Page() {
  return (
    <Shell>
      <PageHead title="What we build" lead="Seven services from one studio. Take one, or the whole journey from first wireframe to production.">
        <nav aria-label="Services" className="mt-10 flex flex-wrap gap-2">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="inline-flex min-h-11 items-center border border-[var(--sk-line-strong)] px-4 text-[1rem] font-medium transition-colors hover:bg-[var(--sk-panel-2)]">
              {s.title}
            </a>
          ))}
        </nav>
      </PageHead>

      <div className="sk-wrap pb-12 md:pb-20">
        {services.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="grid scroll-mt-24 gap-8 border-t border-[var(--sk-line)] py-14 md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 id={`${s.id}-title`} className="sk-h2 m-0 text-[clamp(2rem,4vw,3rem)]">
                {s.title}
              </h2>
              <p className="m-0 mt-5 text-[1.1875rem] leading-relaxed text-[var(--sk-muted)]">{s.description}</p>
              <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-[1.0625rem] font-semibold text-[var(--sk-blue)] hover:underline">
                Start this project
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </Link>
            </div>

            <div>
              <ul className="m-0 list-none border-t border-[var(--sk-line)] p-0">
                {s.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-[var(--sk-line)] py-4 text-[1.125rem]">
                    <Check size={20} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-[var(--sk-cyan)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <dl className="m-0 mt-8 grid gap-6 sm:grid-cols-3">
                <div>
                  <dt className="text-[0.9375rem] text-[var(--sk-muted)]">Typical timeline</dt>
                  <dd className="m-0 mt-1 text-[1.125rem] font-semibold">{s.timeline.replace(/\s–\s/, " to ")}</dd>
                </div>
                <div>
                  <dt className="text-[0.9375rem] text-[var(--sk-muted)]">Best for</dt>
                  <dd className="m-0 mt-1 text-[1.125rem] font-semibold">{s.bestFor}</dd>
                </div>
                <div>
                  <dt className="text-[0.9375rem] text-[var(--sk-muted)]">Built with</dt>
                  <dd className="m-0 mt-1 text-[1.125rem] font-semibold">{s.stack.join(", ")}</dd>
                </div>
              </dl>
            </div>
          </section>
        ))}
      </div>
    </Shell>
  );
}
