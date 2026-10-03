"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="sk-wrap flex h-14 items-center justify-between gap-6">
        <Link href="/" aria-label="SKTR home" className="shrink-0">
          <Image src="/sktr-logo-dark.png" alt="SKTR" width={798} height={236} priority className="h-6 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`py-2 text-[0.95rem] transition-colors hover:text-[var(--sk-ink)] ${active ? "font-semibold text-[var(--sk-ink)]" : "text-[#424245]"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden h-9 items-center rounded-full bg-[var(--sk-blue)] px-4 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[var(--sk-blue-deep)] md:inline-flex"
        >
          Start a project
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="sk-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center text-[var(--sk-ink)] md:hidden"
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {open && (
        <nav id="sk-mobile-nav" aria-label="Main" className="h-[calc(100dvh-3.5rem)] bg-white px-6 pt-4 md:hidden">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex min-h-16 items-center text-[1.75rem] font-semibold tracking-[-0.02em]">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-6 flex h-13 min-h-12 items-center justify-center rounded-full bg-[var(--sk-blue)] text-lg font-semibold text-white">
            Start a project
          </Link>
        </nav>
      )}
    </header>
  );
}
