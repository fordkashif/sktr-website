import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import QuoteDemo from "@/components/site/QuoteDemo";
import { Phone, Window } from "@/components/site/Frames";
import { services } from "@/lib/services-data";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const STEPS = [
  { title: "Discovery", text: "We define the problem and the scope before writing a line of code." },
  { title: "Design", text: "Flows, screens and a clickable prototype you review before we build." },
  { title: "Build", text: "Working software at every milestone, so you see progress as it happens." },
  { title: "Launch", text: "We ship it, watch it in production, and stay on for what comes next." },
];

const STACK = ["React Native", "Expo", "Next.js", "Spring Boot", "Supabase", "PostgreSQL", "Firebase", "Stripe"];

const primary =
  "inline-flex h-12 items-center justify-center gap-2 rounded-none bg-[var(--sk-btn)] px-7 text-[1.0625rem] font-semibold text-[var(--sk-btn-ink)] transition-opacity hover:opacity-85";
const secondary =
  "inline-flex h-12 items-center justify-center gap-2 rounded-none border border-[var(--sk-line-strong)] px-7 text-[1.0625rem] font-semibold text-[var(--sk-ink)] transition-colors hover:bg-[var(--sk-panel-2)]";
const card = "group relative overflow-hidden rounded-none border border-[var(--sk-line)] bg-[var(--sk-panel)] transition-colors hover:border-[var(--sk-line-strong)]";

function CardLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-[1.0625rem] font-semibold text-[var(--sk-blue)] after:absolute after:inset-0 hover:underline">
      {children}
      <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
    </Link>
  );
}

export default function Page() {
  return (
    <div className="sk overflow-x-clip">
      <a href="#main" className="fixed left-4 top-[-100%] z-[100] rounded-none bg-[var(--sk-btn)] px-4 py-2 font-semibold text-[var(--sk-btn-ink)] focus:top-4">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        {/* Hero: a few words, then software you can actually use */}
        <section className="relative">
          <div className="sk-hero-bg pointer-events-none absolute inset-x-0 top-0 h-[56rem]" aria-hidden="true" />
          <div className="sk-wrap relative pt-20 text-center md:pt-28">
            <h1 className="sk-h1 sk-lit sk-rise m-0 pb-2 text-[clamp(3.25rem,9vw,7rem)]" style={d(0.05)}>
              Your idea,
              <br />
              built right.
            </h1>
            <p className="sk-rise mx-auto mb-0 mt-6 max-w-[36rem] text-[1.25rem] leading-snug text-[var(--sk-muted)] md:text-[1.5rem]" style={d(0.18)}>
              SKTR designs and engineers mobile apps, web platforms, SaaS products and APIs.
            </p>
            <div className="sk-rise mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center" style={d(0.28)}>
              <Link href="/contact" className={primary}>
                Start a project
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </Link>
              <Link href="/work" className={secondary}>
                See our work
              </Link>
            </div>

            <div className="sk-rise mx-auto mt-16 max-w-[1040px] md:mt-20" style={d(0.42)}>
              <QuoteDemo />
              <p className="mx-auto mb-0 mt-5 max-w-[38rem] text-[0.9375rem] leading-relaxed text-[var(--sk-muted)]">
                A simplified, working copy of the quote engine we built for{" "}
                <Link href="/work/abis-kitchen" className="text-[var(--sk-ink)] underline underline-offset-4">
                  Abi&apos;s Kitchen
                </Link>
                . Prices are examples.
              </p>
            </div>
          </div>
        </section>

        {/* What makes the studio different, said once */}
        <section className="sk-wrap py-28 md:py-40">
          <p className="m-0 max-w-[56rem] text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            One team designs it and builds it.{" "}
            <span className="text-[var(--sk-muted)]">You talk to the people writing the code, from the first sketch to launch day.</span>
          </p>
        </section>

        {/* Work */}
        <section aria-labelledby="work-title" className="sk-wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="work-title" className="sk-h2 m-0 text-[clamp(2.5rem,6vw,4.5rem)]">
              Selected work
            </h2>
            <Link href="/work" className="inline-flex min-h-11 items-center gap-1.5 text-[1.0625rem] font-semibold text-[var(--sk-blue)] hover:underline">
              All projects
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:mt-14 lg:grid-cols-2">
            <article className={`${card} lg:col-span-2`}>
              <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="p-7 pb-0 md:p-12 lg:pb-12">
                  <p className="m-0 text-[1.0625rem] text-[var(--sk-muted)]">Website and booking system</p>
                  <h3 className="sk-h2 m-0 mt-3 text-[clamp(2.25rem,4.6vw,3.75rem)]">Abi&apos;s Kitchen</h3>
                  <p className="m-0 mt-4 max-w-md text-[1.1875rem] leading-relaxed text-[var(--sk-muted)]">
                    A catering website that prices an event in minutes, takes popup kitchen orders, and sends branded invoices from one admin.
                  </p>
                  <CardLink href="/work/abis-kitchen">Read the case study</CardLink>
                </div>
                <div className="relative -mb-[8%] ml-7 mt-2 lg:-mr-[6%] lg:ml-0 lg:mt-12">
                  <Window src="/work/abis-kitchen/home.webp" alt="The Abi's Kitchen home page" address="abiskitchenja.com" />
                  <div className="absolute -left-[4%] bottom-[14%] w-[22%] min-w-[84px] max-w-[190px]">
                    <Phone src="/work/abis-kitchen/m-quote.webp" alt="The Abi's Kitchen quote form on a phone" />
                  </div>
                </div>
              </div>
            </article>

            <article className={card}>
              <div className="p-7 md:p-12 md:pb-8">
                <p className="m-0 text-[1.0625rem] text-[var(--sk-muted)]">SaaS platform</p>
                <h3 className="sk-h2 m-0 mt-3 text-[clamp(2rem,3.6vw,3rem)]">bhbooking</h3>
                <p className="m-0 mt-4 max-w-md text-[1.1875rem] leading-relaxed text-[var(--sk-muted)]">
                  Bookings, clients and payments in one place for small service businesses.
                </p>
                <CardLink href="/work/bhbooking">View project</CardLink>
              </div>
              <div className="-mb-[10%] ml-7 md:ml-12">
                <Window name="bhbooking" address="bhbooking" />
              </div>
            </article>

            <article className={card}>
              <div className="p-7 md:p-12 md:pb-8">
                <p className="m-0 text-[1.0625rem] text-[var(--sk-muted)]">Mobile game</p>
                <h3 className="sk-h2 m-0 mt-3 text-[clamp(2rem,3.6vw,3rem)]">ABC Fast or Slow</h3>
                <p className="m-0 mt-4 max-w-md text-[1.1875rem] leading-relaxed text-[var(--sk-muted)]">
                  A fast alphabet game for iOS and Android, with live leaderboards.
                </p>
                <CardLink href="/work/abc-fast-or-slow">View project</CardLink>
              </div>
              <div className="flex justify-center gap-5 px-7">
                <div className="-mb-[34%] w-[34%] max-w-[200px]">
                  <Phone name="ABC" />
                </div>
                <div className="-mb-[34%] mt-10 w-[34%] max-w-[200px]">
                  <Phone name="ABC" />
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Services, set out like a spec sheet */}
        <section aria-labelledby="services-title" className="sk-wrap py-28 md:py-40">
          <h2 id="services-title" className="sk-h2 m-0 text-[clamp(2.5rem,6vw,4.5rem)]">
            What we build
          </h2>
          <ul className="m-0 mt-10 list-none overflow-hidden rounded-none border border-[var(--sk-line)] p-0 md:mt-14">
            {services.map((s, i) => (
              <li key={s.id} className={i ? "border-t border-[var(--sk-line)]" : undefined}>
                <Link
                  href={`/services#${s.id}`}
                  className="group grid items-center gap-x-8 gap-y-1 px-5 py-6 transition-colors hover:bg-[var(--sk-panel)] md:grid-cols-[1.1fr_1.4fr_auto_auto] md:px-8 md:py-7"
                >
                  <span className="text-[clamp(1.375rem,2.2vw,1.75rem)] font-semibold tracking-[-0.025em]">{s.title}</span>
                  <span className="text-[1.0625rem] text-[var(--sk-muted)]">{s.shortDesc}</span>
                  <span className="sk-code text-[0.9375rem] text-[var(--sk-muted)] md:text-right">{s.timeline.replace(/\s–\s/, " to ")}</span>
                  <ArrowRight size={20} aria-hidden="true" className="hidden text-[var(--sk-muted)] transition-[transform,color] group-hover:translate-x-1 group-hover:text-[var(--sk-ink)] md:block" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-4 md:mt-16 md:flex-row md:items-baseline md:gap-10">
            <p className="m-0 shrink-0 text-[1.0625rem] text-[var(--sk-muted)]">Built with</p>
            <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-2 p-0">
              {STACK.map((t) => (
                <li key={t} className="text-[clamp(1.125rem,1.8vw,1.375rem)] font-semibold tracking-[-0.01em]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How a project runs */}
        <section aria-labelledby="process-title" className="border-y border-[var(--sk-line)] bg-[var(--sk-panel)]">
          <div className="sk-wrap py-24 md:py-36">
            <h2 id="process-title" className="sk-h2 m-0 text-[clamp(2.5rem,6vw,4.5rem)]">
              How we work
            </h2>
            <ol className="m-0 mt-12 grid list-none gap-x-8 gap-y-12 p-0 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="border-t border-[var(--sk-line-strong)] pt-5">
                  <span className="sk-code block text-[0.9375rem] text-[var(--sk-cyan)]">Step {i + 1}</span>
                  <h3 className="m-0 mt-3 text-[1.75rem] font-semibold tracking-[-0.025em]">{s.title}</h3>
                  <p className="m-0 mt-3 text-[1.0625rem] leading-relaxed text-[var(--sk-muted)]">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(55%_90%_at_50%_100%,var(--sk-glow),transparent_70%)]" aria-hidden="true" />
          <div className="sk-wrap relative py-28 text-center md:py-44">
            <h2 className="sk-h1 sk-lit m-0 pb-2 text-[clamp(3rem,8vw,6rem)]">
              Ready to build
              <br />
              something?
            </h2>
            <p className="mx-auto mb-0 mt-6 max-w-[30rem] text-[1.25rem] leading-snug text-[var(--sk-muted)] md:text-[1.5rem]">
              Tell us what you&apos;re working on. We reply within 48 hours.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
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
