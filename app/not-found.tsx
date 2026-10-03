import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/work", label: "See our work" },
  { href: "/services", label: "What we build" },
  { href: "/contact", label: "Start a project" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="top" className="w-full max-w-[1200px] mx-auto px-8 sm:px-14 lg:px-20 pt-40 pb-16">
        <p className="m-0 font-extrabold text-blue leading-none" style={{ fontSize: "clamp(5rem, 18vw, 12rem)", letterSpacing: "-0.05em" }}>
          404
        </p>
        <h1 className="mt-6 mb-0 font-bold text-ink" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 mb-0 max-w-[34rem] leading-[1.7]" style={{ fontSize: "1.05rem", color: "var(--ink-68)" }}>
          The link may be old or mistyped. Here is where most people are trying to get to.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/" className="inline-flex items-center justify-center min-h-[3rem] px-8 bg-blue text-white font-semibold border border-blue" style={{ fontSize: "0.92rem" }}>
            Back to home
          </Link>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex items-center justify-center min-h-[3rem] px-6 font-semibold text-ink border border-[var(--border-mid)] hover:border-blue transition-colors duration-150" style={{ fontSize: "0.92rem" }}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="mt-24">
          <Footer />
        </div>
      </main>
    </>
  );
}
