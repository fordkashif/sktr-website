import type { Metadata } from "next";
import Link from "next/link";
import Shell, { primary, secondary } from "@/components/site/Shell";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <Shell cta={false}>
      <section className="sk-wrap pb-28 pt-20 md:pb-40 md:pt-28">
        <p className="sk-code m-0 text-[1.0625rem] text-[var(--sk-cyan)]">Error 404</p>
        <h1 className="sk-h1 sk-lit m-0 mt-4 pb-2 text-[clamp(3rem,8vw,6rem)]">
          This page
          <br />
          doesn&apos;t exist.
        </h1>
        <p className="m-0 mt-6 max-w-[30rem] text-[1.25rem] leading-snug text-[var(--sk-muted)]">The link may be old or mistyped. Here is where most people are trying to get to.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={primary}>
            Back to home
          </Link>
          <Link href="/work" className={secondary}>
            See our work
          </Link>
          <Link href="/contact" className={secondary}>
            Start a project
          </Link>
        </div>
      </section>
    </Shell>
  );
}
