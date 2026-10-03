"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--sk-line)] bg-white/90 backdrop-blur-md">
      <div className="sk-wrap flex h-[4.25rem] items-center justify-between gap-6">
        <Link href="/" aria-label="SKTR home" className="shrink-0">
          <Image src="/sktr-logo-dark.png" alt="SKTR" width={798} height={236} priority className="h-8 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[1rem] font-semibold transition-colors ${active ? "bg-[var(--sk-sky)] text-[var(--sk-blue)]" : "text-[var(--sk-ink)] hover:bg-[var(--sk-sky)]"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden h-11 items-center rounded-full bg-[var(--sk-blue)] px-6 text-[1rem] font-bold text-white transition-colors hover:bg-[var(--sk-blue-deep)] md:inline-flex"
        >
          Start a project
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="sk-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sk-sky)] text-[var(--sk-ink)] md:hidden"
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </div>

      {open && (
        <nav id="sk-mobile-nav" aria-label="Main" className="border-t border-[var(--sk-line)] bg-white px-5 pb-6 pt-2 md:hidden">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center border-b border-[var(--sk-line)] text-2xl font-bold">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-5 flex h-14 items-center justify-center rounded-full bg-[var(--sk-blue)] text-lg font-bold text-white">
            Start a project
          </Link>
        </nav>
      )}
    </header>
  );
}
