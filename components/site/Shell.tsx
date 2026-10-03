import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const primary =
  "inline-flex h-12 items-center justify-center gap-2 bg-[var(--sk-btn)] px-7 text-[1.0625rem] font-semibold text-[var(--sk-btn-ink)] transition-opacity hover:opacity-85";
export const secondary =
  "inline-flex h-12 items-center justify-center gap-2 border border-[var(--sk-line-strong)] px-7 text-[1.0625rem] font-semibold text-[var(--sk-ink)] transition-colors hover:bg-[var(--sk-panel-2)]";
export const h2 = "sk-h2 m-0 text-[clamp(2.25rem,5vw,3.75rem)]";
export const panel = "border border-[var(--sk-line)] bg-[var(--sk-panel)]";

/** The frame every inner page shares: header, page content, closing call to action, footer */
export default function Shell({ children, cta = true }: { children: ReactNode; cta?: boolean }) {
  return (
    <div className="sk overflow-x-clip">
      <a href="#main" className="fixed left-4 top-[-100%] z-[100] bg-[var(--sk-btn)] px-4 py-2 font-semibold text-[var(--sk-btn-ink)] focus:top-4">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        {children}
        {cta && <Cta />}
      </main>
      <SiteFooter />
    </div>
  );
}

/** The top of an inner page: a large title and one or two sentences */
export function PageHead({ title, lead, children }: { title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative">
      <div className="sk-hero-bg pointer-events-none absolute inset-x-0 top-0 h-[34rem]" aria-hidden="true" />
      <div className="sk-wrap relative pb-14 pt-16 md:pb-20 md:pt-24">
        <h1 className="sk-h1 sk-lit sk-rise m-0 max-w-[58rem] pb-2 text-[clamp(3rem,7vw,5.5rem)]">{title}</h1>
        {lead && (
          <p className="sk-rise m-0 mt-6 max-w-[40rem] text-[1.25rem] leading-snug text-[var(--sk-muted)] md:text-[1.375rem]" style={{ animationDelay: "0.15s" }}>
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

export function Cta() {
  return (
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
  );
}
