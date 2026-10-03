import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ScrollGrow from "@/components/site/ScrollGrow";
import { Display, Phone } from "@/components/site/Frames";
import { services } from "@/lib/services-data";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const STEPS = [
  { title: "Discovery", text: "We define the problem and the scope before writing a line of code." },
  { title: "Design", text: "Flows, screens and a clickable prototype you review before we build." },
  { title: "Build", text: "Working software at every milestone, so you see progress as it happens." },
  { title: "Launch", text: "We ship it, watch it in production, and stay on for what comes next." },
];

const pill =
  "inline-flex h-12 items-center justify-center rounded-full bg-[var(--sk-blue)] px-7 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-[var(--sk-blue-deep)]";

/** A blue text link with a small chevron, the way product pages point onward */
function More({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const cls = "inline-flex min-h-11 items-center gap-1 text-[1.1875rem] text-[var(--sk-blue)] hover:underline md:text-[1.3125rem]";
  const inner = (
    <>
      {children}
      <CaretRight size={15} weight="bold" aria-hidden="true" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export default function Page() {
  return (
    <div className="sk overflow-x-clip">
      <a href="#main" className="fixed left-4 top-[-100%] z-[100] rounded-full bg-[var(--sk-blue)] px-4 py-2 font-semibold text-white focus:top-4">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        {/* Hero: a few words, then the work itself, growing as you scroll */}
        <section className="pt-16 text-center md:pt-24">
          <div className="sk-wrap">
            <h1 className="sk-h1 sk-rise m-0 text-[clamp(3.25rem,9vw,7rem)]" style={d(0.05)}>
              Your idea,
              <br />
              built right.
            </h1>
            <p className="sk-rise mx-auto mb-0 mt-6 max-w-[34rem] text-[1.3125rem] leading-snug text-[var(--sk-muted)] md:text-[1.6875rem]" style={d(0.2)}>
              Apps, platforms and products, designed and engineered by one team.
            </p>
            <div className="sk-rise mt-8 flex flex-col items-center justify-center gap-x-8 gap-y-2 sm:flex-row" style={d(0.3)}>
              <Link href="/contact" className={pill}>
                Start a project
              </Link>
              <More href="/work">See our work</More>
            </div>
          </div>

          <ScrollGrow className="sk-rise mx-auto mt-14 max-w-[1240px] px-4 md:mt-20 md:px-8">
            <div className="sk-grow relative" style={d(0.45)}>
              <Display src="/work/abis-kitchen/home.webp" alt="The Abi's Kitchen website, built by SKTR" priority sizes="(min-width: 1240px) 1180px, 96vw" />
              <div className="absolute -bottom-[7%] right-[4%] w-[19%] min-w-[92px] max-w-[230px]">
                <Phone src="/work/abis-kitchen/m-quote.webp" alt="The Abi's Kitchen quote form on a phone" />
              </div>
            </div>
          </ScrollGrow>
        </section>

        {/* What makes the studio different, said once */}
        <section className="sk-wrap py-28 text-center md:py-44">
          <p className="mx-auto my-0 max-w-[52rem] text-[clamp(1.75rem,4.2vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            One team designs it and builds it.{" "}
            <span className="text-[var(--sk-muted)]">You talk to the people writing the code, from the first sketch to launch day.</span>
          </p>
        </section>

        {/* Work: one tile per project, picture first */}
        <section aria-label="Selected work" className="space-y-3 px-3">
          <article className="overflow-hidden bg-[var(--sk-grey)] pt-16 text-center md:pt-24">
            <div className="sk-wrap">
              <h2 className="sk-h2 m-0 text-[clamp(2.5rem,6vw,4.5rem)]">Abi&apos;s Kitchen</h2>
              <p className="mx-auto mb-0 mt-3 max-w-[36rem] text-[1.3125rem] leading-snug md:text-[1.6875rem]">
                A catering website that prices an event in minutes.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8">
                <More href="/work/abis-kitchen">Read the case study</More>
                <More href="https://www.abiskitchenja.com" external>
                  Visit the site
                </More>
              </div>
            </div>
            <div className="relative mx-auto mt-12 max-w-[1040px] px-4 md:mt-16">
              <div className="-mb-[16%]">
                <Display src="/work/abis-kitchen/table.webp" alt="Dishes shown as plates on the Abi's Kitchen home page" sizes="(min-width: 1040px) 1000px, 94vw" />
              </div>
              <div className="absolute bottom-0 left-[3%] w-[21%] min-w-[96px] max-w-[220px] translate-y-[22%]">
                <Phone src="/work/abis-kitchen/m-menu.webp" alt="The Abi's Kitchen menu on a phone" />
              </div>
            </div>
          </article>

          <div className="grid gap-3 lg:grid-cols-2">
            <article className="overflow-hidden bg-[var(--sk-grey)] pt-14 text-center md:pt-20">
              <div className="px-6">
                <h2 className="sk-h2 m-0 text-[clamp(2.25rem,4.4vw,3.5rem)]">bhbooking</h2>
                <p className="mx-auto mb-0 mt-3 max-w-[26rem] text-[1.1875rem] leading-snug md:text-[1.3125rem]">
                  Bookings, clients and payments in one place for small service businesses.
                </p>
                <div className="mt-3">
                  <More href="/work/bhbooking">View project</More>
                </div>
              </div>
              <div className="mx-auto -mb-[14%] mt-10 w-[86%]">
                <Display name="bhbooking" />
              </div>
            </article>

            <article className="overflow-hidden bg-[var(--sk-grey)] pt-14 text-center md:pt-20">
              <div className="px-6">
                <h2 className="sk-h2 m-0 text-[clamp(2.25rem,4.4vw,3.5rem)]">ABC Fast or Slow</h2>
                <p className="mx-auto mb-0 mt-3 max-w-[26rem] text-[1.1875rem] leading-snug md:text-[1.3125rem]">
                  A fast alphabet game for iOS and Android, with live leaderboards.
                </p>
                <div className="mt-3">
                  <More href="/work/abc-fast-or-slow">View project</More>
                </div>
              </div>
              <div className="mx-auto -mb-[38%] mt-10 w-[38%] max-w-[250px]">
                <Phone name="ABC" />
              </div>
            </article>
          </div>
        </section>

        {/* Services: a calm list, each row a link */}
        <section aria-labelledby="services-title" className="sk-wrap py-28 md:py-44">
          <h2 id="services-title" className="sk-h2 m-0 text-center text-[clamp(2.5rem,6vw,4.5rem)]">
            What we build.
          </h2>
          <ul className="mx-auto mb-0 mt-12 max-w-[880px] list-none border-t border-[var(--sk-line)] p-0 md:mt-16">
            {services.map((s) => (
              <li key={s.id} className="border-b border-[var(--sk-line)]">
                <Link href={`/services#${s.id}`} className="group flex items-baseline gap-6 py-6 md:py-7">
                  <span className="min-w-0 flex-1">
                    <span className="block text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-tight tracking-[-0.025em] transition-colors group-hover:text-[var(--sk-blue)]">
                      {s.title}
                    </span>
                    <span className="mt-1.5 block text-[1.0625rem] text-[var(--sk-muted)] md:text-[1.1875rem]">{s.shortDesc}</span>
                  </span>
                  <span className="hidden shrink-0 text-[1.0625rem] text-[var(--sk-muted)] sm:block">{s.timeline.replace(/\s–\s/, " to ")}</span>
                  <CaretRight size={18} weight="bold" aria-hidden="true" className="shrink-0 self-center text-[var(--sk-muted)] transition-[transform,color] group-hover:translate-x-1 group-hover:text-[var(--sk-blue)]" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* How a project runs */}
        <section aria-labelledby="process-title" className="px-3">
          <div className="bg-[var(--sk-grey)] py-24 md:py-36">
            <div className="sk-wrap">
              <h2 id="process-title" className="sk-h2 m-0 text-center text-[clamp(2.5rem,6vw,4.5rem)]">
                How we work.
              </h2>
              <ol className="m-0 mt-14 grid list-none gap-x-10 gap-y-12 p-0 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
                {STEPS.map((s, i) => (
                  <li key={s.title}>
                    <span className="block text-[1.0625rem] font-semibold text-[var(--sk-blue)]">Step {i + 1}</span>
                    <h3 className="m-0 mt-2 text-[1.75rem] font-semibold tracking-[-0.025em]">{s.title}</h3>
                    <p className="m-0 mt-3 text-[1.0625rem] leading-relaxed text-[var(--sk-muted)]">{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="sk-wrap py-28 text-center md:py-44">
          <h2 className="sk-h1 m-0 text-[clamp(3rem,8vw,6rem)]">
            Ready to build
            <br />
            something?
          </h2>
          <p className="mx-auto mb-0 mt-6 max-w-[30rem] text-[1.3125rem] leading-snug text-[var(--sk-muted)] md:text-[1.6875rem]">
            Tell us what you&apos;re working on. We reply within 48 hours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-x-8 gap-y-2 sm:flex-row">
            <Link href="/contact" className={pill}>
              Start a project
            </Link>
            <More href="mailto:signal@thesktr.com" external>
              signal@thesktr.com
            </More>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
