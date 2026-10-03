import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { BrowserFrame, PhoneFrame } from "@/components/site/Frames";
import { services } from "@/lib/services-data";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const d = (s: number, r = 0) => ({ "--d": `${s}s`, "--r": `${r}deg` }) as CSSProperties;

const STEPS = [
  { title: "Discovery", text: "We define the problem and the scope before writing a line of code." },
  { title: "Design", text: "Flows, screens and a clickable prototype you review before we build." },
  { title: "Build", text: "Working software at every milestone, so you see progress as it happens." },
  { title: "Launch", text: "We ship it, watch it in production, and stay on for what comes next." },
];

const btn =
  "inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-lg font-bold transition-[background-color,transform] hover:scale-[1.02]";

export default function Page() {
  return (
    <div className="sk overflow-x-clip">
      <a href="#main" className="fixed left-4 top-[-100%] z-[100] rounded-full bg-[var(--sk-blue)] px-4 py-2 font-semibold text-white focus:top-4">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        {/* Hero: one headline on the left, real work on a leaning blue panel on the right */}
        <section className="relative">
          <div className="sk-wrap grid items-center gap-10 pb-0 pt-12 md:pt-16 lg:min-h-[calc(100vh-4.25rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-0 lg:pb-16">
            <div className="relative z-10">
              <h1 className="sk-display m-0 text-[clamp(3.5rem,9.5vw,8.5rem)]">
                <span className="sk-rise block" style={d(0.05)}>
                  Your idea,
                </span>
                <span className="sk-rise block" style={d(0.15)}>
                  built right.
                </span>
              </h1>
              <p className="sk-rise m-0 mt-7 max-w-[30rem] text-xl leading-relaxed text-[var(--sk-muted)] md:text-[1.35rem]" style={d(0.3)}>
                SKTR designs and builds mobile apps, web platforms, SaaS products and APIs for businesses ready to move faster.
              </p>
              <div className="sk-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={d(0.4)}>
                <Link href="/contact" className={`${btn} bg-[var(--sk-blue)] text-white hover:bg-[var(--sk-blue-deep)]`}>
                  Start a project
                  <ArrowRight size={20} weight="bold" aria-hidden="true" />
                </Link>
                <Link href="/work" className={`${btn} bg-[var(--sk-sky)] text-[var(--sk-ink)]`}>
                  See our work
                </Link>
              </div>
            </div>

            {/* The work, on the logo's slant */}
            <div className="relative -mx-5 h-[25rem] sm:h-[32rem] md:-mx-10 lg:mx-0 lg:h-[38rem]" aria-hidden="true">
              <div className="sk-slant-panel sk-wipe absolute inset-y-0 left-0 right-0 bg-[var(--sk-blue)] lg:-right-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]" />
              <div className="absolute bottom-[14%] left-[12%] h-3 w-[38%] -skew-x-[20deg] bg-[var(--sk-lime)] lg:left-[4%]" />
              <div className="sk-slide absolute left-[16%] top-[12%] w-[92%] sm:w-[80%] lg:left-[14%] lg:w-[112%]" style={d(0.5, -3)}>
                <BrowserFrame src="/work/abis-kitchen/home.webp" address="abiskitchenja.com" priority />
              </div>
              <div className="sk-pop absolute bottom-[-4%] left-[6%] w-[30%] max-w-[190px] sm:w-[24%] lg:left-[-2%] lg:w-[34%] lg:max-w-[230px]" style={d(0.8, 5)}>
                <PhoneFrame src="/work/abis-kitchen/m-quote.webp" />
              </div>
            </div>
          </div>
        </section>

        {/* What makes the studio different, said once and plainly */}
        <section className="sk-wrap py-20 md:py-32">
          <p className="m-0 max-w-[62rem] text-[clamp(1.75rem,3.6vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.03em]">
            One team designs it and builds it. You talk to the people writing the code, from the first sketch to launch day.
          </p>
        </section>

        {/* Work */}
        <section aria-labelledby="work-title" className="pb-10 md:pb-20">
          <div className="sk-wrap flex flex-wrap items-end justify-between gap-4">
            <h2 id="work-title" className="sk-display m-0 text-[clamp(2.75rem,7vw,6rem)]">
              Selected work
            </h2>
            <Link href="/work" className="inline-flex min-h-11 items-center gap-2 text-lg font-bold text-[var(--sk-blue)] hover:underline">
              All projects
              <ArrowRight size={20} weight="bold" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 space-y-4 px-3 md:mt-14 md:space-y-6 md:px-6">
            {/* Abi's Kitchen */}
            <article className="overflow-hidden rounded-[2rem] bg-[#fff1e0] md:rounded-[3rem]">
              <div className="sk-wrap grid items-center gap-10 py-12 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <div>
                  <p className="m-0 text-lg font-semibold text-[#a3401f]">Website and booking system</p>
                  <h3 className="sk-display m-0 mt-3 text-[clamp(2.5rem,5.5vw,4.75rem)]">Abi&apos;s Kitchen</h3>
                  <p className="m-0 mt-5 max-w-md text-xl leading-relaxed text-[var(--sk-ink)]/75">
                    A catering website that prices an event in minutes, takes popup kitchen orders, and sends branded invoices from one admin.
                  </p>
                  <p className="m-0 mt-5 text-[1.05rem] font-medium text-[var(--sk-ink)]/60">Next.js, Supabase, Vercel</p>
                  <Link href="/work/abis-kitchen" className={`${btn} mt-8 bg-[var(--sk-ink)] text-white`}>
                    Read the case study
                    <ArrowUpRight size={20} weight="bold" aria-hidden="true" />
                  </Link>
                </div>
                <div className="relative pb-10 pl-[14%] lg:pb-14">
                  <BrowserFrame src="/work/abis-kitchen/menu.webp" alt="The Abi's Kitchen menu page" address="abiskitchenja.com/menu" sizes="(min-width: 1024px) 55vw, 90vw" />
                  <div className="absolute bottom-0 left-0 w-[30%] max-w-[210px] -rotate-3">
                    <PhoneFrame src="/work/abis-kitchen/m-home.webp" alt="The Abi's Kitchen home page on a phone" />
                  </div>
                </div>
              </div>
            </article>

            <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
              {/* bhbooking */}
              <article className="overflow-hidden rounded-[2rem] bg-[#e6f8ee] px-6 pt-12 md:rounded-[3rem] md:px-12 md:pt-16">
                <p className="m-0 text-lg font-semibold text-[#17734a]">SaaS platform</p>
                <h3 className="sk-display m-0 mt-3 text-[clamp(2.25rem,4.5vw,3.75rem)]">bhbooking</h3>
                <p className="m-0 mt-4 max-w-md text-xl leading-relaxed text-[var(--sk-ink)]/75">
                  Scheduling, client management and payments in one place for small service businesses.
                </p>
                <Link href="/work/bhbooking" className="mt-6 inline-flex min-h-11 items-center gap-2 text-lg font-bold hover:underline">
                  View project
                  <ArrowUpRight size={20} weight="bold" aria-hidden="true" />
                </Link>
                <div className="-mb-[12%] mt-10 translate-x-[6%] rotate-[-2deg]">
                  <BrowserFrame address="bhbooking" placeholder="bhbooking dashboard screenshot goes here" />
                </div>
              </article>

              {/* ABC Fast or Slow */}
              <article className="relative overflow-hidden rounded-[2rem] bg-[var(--sk-sky)] px-6 pt-12 md:rounded-[3rem] md:px-12 md:pt-16">
                <p className="m-0 text-lg font-semibold text-[var(--sk-blue)]">Mobile game</p>
                <h3 className="sk-display m-0 mt-3 text-[clamp(2.25rem,4.5vw,3.75rem)]">ABC Fast or Slow</h3>
                <p className="m-0 mt-4 max-w-md text-xl leading-relaxed text-[var(--sk-ink)]/75">
                  A fast alphabet game for iOS and Android with real-time leaderboards.
                </p>
                <Link href="/work/abc-fast-or-slow" className="mt-6 inline-flex min-h-11 items-center gap-2 text-lg font-bold hover:underline">
                  View project
                  <ArrowUpRight size={20} weight="bold" aria-hidden="true" />
                </Link>
                <div className="mt-10 flex justify-center gap-5">
                  <div className="-mb-[30%] w-[38%] max-w-[220px] rotate-[-5deg]">
                    <PhoneFrame placeholder="Game screenshot goes here" />
                  </div>
                  <div className="-mb-[30%] mt-10 w-[38%] max-w-[220px] rotate-[4deg]">
                    <PhoneFrame placeholder="Leaderboard screenshot goes here" />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Services: a plain list, each row a link */}
        <section aria-labelledby="services-title" className="sk-wrap py-20 md:py-32">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 id="services-title" className="sk-display m-0 text-[clamp(2.75rem,7vw,6rem)]">
                What we build
              </h2>
              <p className="m-0 mt-6 max-w-sm text-xl leading-relaxed text-[var(--sk-muted)]">
                Seven services, one studio. Take one, or the whole journey from first wireframe to production.
              </p>
            </div>
            <ul className="m-0 list-none border-t border-[var(--sk-line)] p-0">
              {services.map((s) => (
                <li key={s.id} className="border-b border-[var(--sk-line)]">
                  <Link href={`/services#${s.id}`} className="group flex items-center gap-5 py-6 transition-[padding,background-color] hover:bg-[var(--sk-sky)] hover:px-5 md:py-7">
                    <span className="min-w-0 flex-1">
                      <span className="block text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-tight tracking-[-0.02em]">{s.title}</span>
                      <span className="mt-1 block text-lg text-[var(--sk-muted)]">{s.shortDesc}</span>
                    </span>
                    <span className="hidden shrink-0 text-right text-[1.05rem] font-semibold text-[var(--sk-muted)] sm:block">{s.timeline.replace(/\s–\s/, " to ")}</span>
                    <ArrowRight size={26} weight="bold" aria-hidden="true" className="shrink-0 text-[var(--sk-blue)] transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How a project runs, on blue with the logo's slant along the top */}
        <section aria-labelledby="process-title" className="sk-slant-top bg-[var(--sk-blue)] text-white">
          <div className="sk-wrap py-20 md:py-28">
            <h2 id="process-title" className="sk-display m-0 text-[clamp(2.75rem,7vw,6rem)]">
              How we work
            </h2>
            <ol className="m-0 mt-12 grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="border-t-2 border-white/30 pt-5">
                  <span className="block text-[4.5rem] font-extrabold leading-none tracking-[-0.05em] text-[var(--sk-lime)]">{i + 1}</span>
                  <h3 className="m-0 mt-4 text-[1.75rem] font-bold tracking-[-0.02em]">{s.title}</h3>
                  <p className="m-0 mt-2 text-lg leading-relaxed text-white/85">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="bg-[var(--sk-lime)]">
          <div className="sk-wrap py-20 md:py-32">
            <h2 className="sk-display m-0 max-w-[60rem] text-[clamp(3rem,9vw,8rem)]">Ready to build something?</h2>
            <p className="m-0 mt-6 max-w-xl text-xl leading-relaxed text-[var(--sk-ink)]/75 md:text-2xl">
              Tell us what you&apos;re working on. We reply within 48 hours.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className={`${btn} bg-[var(--sk-ink)] text-white`}>
                Start a project
                <ArrowRight size={20} weight="bold" aria-hidden="true" />
              </Link>
              <a href="mailto:signal@thesktr.com" className="inline-flex min-h-11 items-center px-2 text-lg font-bold underline-offset-4 hover:underline">
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
