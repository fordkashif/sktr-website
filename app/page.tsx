import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { Phone, Window } from "@/components/site/Frames";
import { services } from "@/lib/services-data";
import { articles, clients, featured, founder, hero, results, serviceGroups, testimonials } from "@/lib/home-content";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const STEPS = [
  { title: "Discovery", text: "We define the problem and the scope before writing a line of code." },
  { title: "Design", text: "Flows, screens and a clickable prototype you review before we build." },
  { title: "Build", text: "Working software at every milestone, so you see progress as it happens." },
  { title: "Launch", text: "We ship it, watch it in production, and stay on for what comes next." },
];

const primary =
  "inline-flex h-12 items-center justify-center gap-2 bg-[var(--sk-btn)] px-7 text-[1.0625rem] font-semibold text-[var(--sk-btn-ink)] transition-opacity hover:opacity-85";
const secondary =
  "inline-flex h-12 items-center justify-center gap-2 border border-[var(--sk-line-strong)] px-7 text-[1.0625rem] font-semibold text-[var(--sk-ink)] transition-colors hover:bg-[var(--sk-panel-2)]";
const h2 = "sk-h2 m-0 text-[clamp(2.25rem,5vw,3.75rem)]";
const lead = "m-0 mt-4 max-w-[36rem] text-[1.1875rem] leading-relaxed text-[var(--sk-muted)]";

/** Marks a slot that is still waiting for real content */
function Todo({ children }: { children?: ReactNode }) {
  return <span className="sk-todo-tag">{children ?? "To add"}</span>;
}

/** A client's words, with who said them */
function Quote({ q, big }: { q: { todo?: boolean; text: string; name: string; role: string }; big?: boolean }) {
  return (
    <figure className={`m-0 flex h-full flex-col p-6 md:p-8 ${q.todo ? "sk-todo" : "border border-[var(--sk-line)] bg-[var(--sk-panel)]"}`}>
      {q.todo && <Todo />}
      <blockquote className={`m-0 flex-1 font-medium leading-snug tracking-[-0.01em] ${q.todo ? "mt-2" : ""} ${big ? "text-[clamp(1.375rem,2.4vw,1.875rem)]" : "text-[1.25rem]"} ${q.todo ? "" : "text-[var(--sk-ink)]"}`}>
        {q.todo ? q.text : `“${q.text}”`}
      </blockquote>
      <figcaption className="mt-6 text-[1.0625rem]">
        <span className={`block font-semibold ${q.todo ? "" : "text-[var(--sk-ink)]"}`}>{q.name}</span>
        <span className="block text-[var(--sk-muted)]">{q.role}</span>
      </figcaption>
    </figure>
  );
}

/** One result: a large figure and what it measures */
function Result({ r }: { r: { todo?: boolean; value: string; label: string } }) {
  return (
    <div className={`p-5 md:p-6 ${r.todo ? "sk-todo" : "border-t border-[var(--sk-line-strong)]"}`}>
      {r.todo && <Todo />}
      <dd className={`m-0 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none tracking-[-0.04em] ${r.todo ? "mt-1 opacity-40" : ""}`}>{r.value}</dd>
      <dt className="mt-2 text-[1.0625rem] leading-snug text-[var(--sk-muted)]">{r.label}</dt>
    </div>
  );
}

export default function Page() {
  return (
    <div className="sk overflow-x-clip">
      <a href="#main" className="fixed left-4 top-[-100%] z-[100] bg-[var(--sk-btn)] px-4 py-2 font-semibold text-[var(--sk-btn-ink)] focus:top-4">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        {/* 1. Hero: what SKTR does, and real client work beside it */}
        <section className="relative">
          <div className="sk-hero-bg pointer-events-none absolute inset-x-0 top-0 h-[52rem]" aria-hidden="true" />
          <div className="sk-wrap relative grid items-center gap-12 pb-16 pt-14 md:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pb-24">
            <div>
              <h1 className="sk-h1 sk-lit sk-rise m-0 pb-2 text-[clamp(3.25rem,7.4vw,6rem)]" style={d(0.05)}>
                {hero.headline[0]}
                <br />
                {hero.headline[1]}
              </h1>
              <p className="sk-rise m-0 mt-6 max-w-[32rem] text-[1.25rem] leading-snug text-[var(--sk-muted)] md:text-[1.375rem]" style={d(0.18)}>
                {hero.lead}
              </p>
              <div className="sk-rise mt-9 flex flex-col gap-3 sm:flex-row" style={d(0.28)}>
                <Link href="/contact" className={primary}>
                  Start a project
                  <ArrowRight size={18} weight="bold" aria-hidden="true" />
                </Link>
                <Link href="/work" className={secondary}>
                  See our work
                </Link>
              </div>
            </div>

            <div className="sk-rise relative pb-[9%] pl-[9%] lg:-mr-[14%]" style={d(0.4)}>
              <Window src="/work/abis-kitchen/home.webp" alt="The Abi's Kitchen website, built by SKTR" address="abiskitchenja.com" priority />
              <div className="absolute bottom-0 left-0 w-[23%] min-w-[88px] max-w-[190px]">
                <Phone src="/work/abis-kitchen/m-quote.webp" alt="The Abi's Kitchen quote form on a phone" />
              </div>
            </div>
          </div>

          {/* Who SKTR has built for */}
          <div className="sk-wrap relative pb-20 md:pb-28">
            <p className="m-0 text-[1.0625rem] text-[var(--sk-muted)]">Built for</p>
            <ul className="m-0 mt-4 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-5">
              {clients.map((c, i) => (
                <li
                  key={i}
                  className={`flex h-20 items-center justify-center px-4 text-center ${c.todo ? "sk-todo text-[0.9375rem]" : "border border-[var(--sk-line)] bg-[var(--sk-panel)] text-[1.1875rem] font-semibold"}`}
                >
                  {c.logo ? <Image src={c.logo} alt={c.name} width={160} height={48} className="h-8 w-auto" /> : c.todo ? <Todo>{c.name} to add</Todo> : c.name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 2. The featured case study: what was built, what the client said, what changed */}
        <section aria-labelledby="featured-title" className="border-y border-[var(--sk-line)] bg-[var(--sk-panel)]">
          <div className="sk-wrap py-20 md:py-28">
            <p className="m-0 text-[1.0625rem] text-[var(--sk-muted)]">Featured case study</p>
            <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <h2 id="featured-title" className={h2}>
                  {featured.client}
                </h2>
                <p className={lead}>{featured.summary}</p>
                <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
                  {featured.did.map((t) => (
                    <li key={t} className="border border-[var(--sk-line-strong)] px-3 py-1.5 text-[0.9375rem]">
                      {t}
                    </li>
                  ))}
                </ul>
                <Link href={`/work/${featured.slug}`} className={`${primary} mt-8`}>
                  Read the case study
                  <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                </Link>
              </div>
              <Quote q={featured.quote} big />
            </div>

            <div className="mt-12 md:mt-16">
              <Window src="/work/abis-kitchen/table.webp" alt="Dishes shown as plates on the Abi's Kitchen home page" address="abiskitchenja.com" sizes="(min-width: 1200px) 1136px, 94vw" />
            </div>

            <dl className="m-0 mt-10 grid gap-3 sm:grid-cols-3 md:mt-12">
              {featured.results.map((r, i) => (
                <Result key={i} r={r} />
              ))}
            </dl>
          </div>
        </section>

        {/* 3. More work */}
        <section aria-labelledby="work-title" className="sk-wrap py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="work-title" className={h2}>
              More work
            </h2>
            <Link href="/work" className="inline-flex min-h-11 items-center gap-1.5 text-[1.0625rem] font-semibold text-[var(--sk-blue)] hover:underline">
              All case studies
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {[
              { slug: "bhbooking", kind: "SaaS platform", name: "bhbooking", text: "Bookings, clients and payments in one place for small service businesses." },
              { slug: "abc-fast-or-slow", kind: "Mobile game", name: "ABC Fast or Slow", text: "A fast alphabet game for iOS and Android, with live leaderboards." },
            ].map((p) => (
              <article key={p.slug} className="group relative overflow-hidden border border-[var(--sk-line)] bg-[var(--sk-panel)] transition-colors hover:border-[var(--sk-line-strong)]">
                <div className="p-7 md:p-10 md:pb-8">
                  <p className="m-0 text-[1.0625rem] text-[var(--sk-muted)]">{p.kind}</p>
                  <h3 className="sk-h2 m-0 mt-3 text-[clamp(1.875rem,3.2vw,2.5rem)]">{p.name}</h3>
                  <p className="m-0 mt-3 max-w-md text-[1.1875rem] leading-relaxed text-[var(--sk-muted)]">{p.text}</p>
                  <Link href={`/work/${p.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-[1.0625rem] font-semibold text-[var(--sk-blue)] after:absolute after:inset-0 hover:underline">
                    Read the case study
                    <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                  </Link>
                </div>
                <div className="-mb-[10%] ml-7 md:ml-10">
                  <Window name={p.name} address={p.name} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. Results across all work */}
        <section aria-labelledby="results-title" className="sk-wrap pb-20 md:pb-28">
          <h2 id="results-title" className={h2}>
            Results
          </h2>
          <dl className="m-0 mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {results.map((r, i) => (
              <Result key={i} r={r} />
            ))}
          </dl>
        </section>

        {/* 5. Services, grouped by what the client needs */}
        <section aria-labelledby="services-title" className="border-y border-[var(--sk-line)] bg-[var(--sk-panel)]">
          <div className="sk-wrap py-20 md:py-28">
            <h2 id="services-title" className={h2}>
              How we can help
            </h2>
            <div className="mt-10 grid gap-4 lg:grid-cols-3 md:mt-14">
              {serviceGroups.map((g) => (
                <div key={g.title} className="flex flex-col border border-[var(--sk-line)] bg-[var(--sk-bg)] p-7 md:p-8">
                  <h3 className="m-0 text-[1.625rem] font-semibold tracking-[-0.025em]">{g.title}</h3>
                  <p className="m-0 mt-3 text-[1.0625rem] leading-relaxed text-[var(--sk-muted)]">{g.text}</p>
                  <ul className="m-0 mt-6 list-none border-t border-[var(--sk-line)] p-0">
                    {g.ids.map((id) => {
                      const s = services.find((x) => x.id === id);
                      if (!s) return null;
                      return (
                        <li key={id} className="border-b border-[var(--sk-line)]">
                          <Link href={`/services#${id}`} className="group flex min-h-14 items-center justify-between gap-4 py-3 text-[1.125rem] font-semibold">
                            <span>
                              {s.title}
                              <span className="sk-code block text-[0.875rem] font-normal text-[var(--sk-muted)]">{s.timeline.replace(/\s–\s/, " to ")}</span>
                            </span>
                            <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-[var(--sk-muted)] transition-[transform,color] group-hover:translate-x-1 group-hover:text-[var(--sk-ink)]" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <ol className="m-0 mt-16 grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="border-t border-[var(--sk-line-strong)] pt-5">
                  <span className="sk-code block text-[0.9375rem] text-[var(--sk-cyan)]">Step {i + 1}</span>
                  <h3 className="m-0 mt-3 text-[1.5rem] font-semibold tracking-[-0.025em]">{s.title}</h3>
                  <p className="m-0 mt-2 text-[1.0625rem] leading-relaxed text-[var(--sk-muted)]">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. What clients say */}
        <section aria-labelledby="clients-title" className="sk-wrap py-20 md:py-28">
          <h2 id="clients-title" className={h2}>
            What clients say
          </h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {testimonials.map((q, i) => (
              <Quote key={i} q={q} />
            ))}
          </div>
        </section>

        {/* 7. Who is behind it */}
        <section aria-labelledby="founder-title" className="border-y border-[var(--sk-line)] bg-[var(--sk-panel)]">
          <div className="sk-wrap grid items-center gap-10 py-20 md:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            {founder.photo ? (
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={founder.photo} alt={founder.name} fill sizes="(min-width: 1024px) 400px, 90vw" className="object-cover" />
              </div>
            ) : (
              <div className="sk-todo flex aspect-[4/5] max-w-sm items-center justify-center p-6 text-center">
                <Todo>Photo to add</Todo>
              </div>
            )}
            <div>
              <h2 id="founder-title" className={h2}>
                Who you&apos;ll work with
              </h2>
              <p className="m-0 mt-6 text-[1.625rem] font-semibold tracking-[-0.02em]">{founder.name}</p>
              <p className="m-0 text-[1.1875rem] text-[var(--sk-muted)]">{founder.role}</p>
              <div className={`mt-6 max-w-[38rem] text-[1.1875rem] leading-relaxed ${founder.bio.todo ? "sk-todo p-5" : "text-[var(--sk-muted)]"}`}>
                {founder.bio.todo && (
                  <>
                    <Todo />
                    <br />
                  </>
                )}
                {founder.bio.text}
              </div>
              <Link href="/about" className={`${secondary} mt-8`}>
                About SKTR
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Writing */}
        <section aria-labelledby="insights-title" className="sk-wrap py-20 md:py-28">
          <h2 id="insights-title" className={h2}>
            Insights
          </h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {articles.map((a, i) => (
              <article key={i} className={`p-6 md:p-8 ${a.todo ? "sk-todo" : "border border-[var(--sk-line)] bg-[var(--sk-panel)]"}`}>
                {a.todo && <Todo />}
                <h3 className="m-0 mt-1 text-[1.375rem] font-semibold tracking-[-0.02em]">{a.title}</h3>
                <p className="m-0 mt-2 text-[1.0625rem] leading-relaxed text-[var(--sk-muted)]">{a.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 9. Closing call to action */}
        <section className="relative overflow-hidden border-t border-[var(--sk-line)]">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(55%_90%_at_50%_100%,var(--sk-glow),transparent_70%)]" aria-hidden="true" />
          <div className="sk-wrap relative py-24 md:py-36">
            <h2 className="sk-h1 sk-lit m-0 pb-2 text-[clamp(3rem,7vw,5.5rem)]">
              Ready to build
              <br />
              something?
            </h2>
            <p className="m-0 mt-6 max-w-[30rem] text-[1.25rem] leading-snug text-[var(--sk-muted)] md:text-[1.375rem]">
              Tell us what you&apos;re working on. We reply within 48 hours.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className={primary}>
                Start a project
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </Link>
              <a href="mailto:signal@thesktr.com" className={secondary}>
                signal@thesktr.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
