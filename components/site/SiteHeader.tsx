"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { List, Moon, Sun, X } from "@phosphor-icons/react";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Switches between the dark (default) and light versions of the site */
function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [ready, setReady] = useState(false);
  // The saved choice is only known in the browser, so the icon waits for it
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setReady(true), []);
  const light = ready && resolvedTheme === "light";
  return (
    <button
      type="button"
      onClick={() => setTheme(light ? "dark" : "light")}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="flex h-10 w-10 items-center justify-center rounded-none text-[var(--sk-muted)] transition-colors hover:bg-[var(--sk-panel-2)] hover:text-[var(--sk-ink)]"
    >
      {light ? <Moon size={19} /> : <Sun size={19} />}
    </button>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--sk-line)] bg-[color-mix(in_srgb,var(--sk-bg)_92%,transparent)] backdrop-blur-xl">
      <div className="sk-wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="SKTR home" className="shrink-0">
          <Image src="/sktr-logo.png" alt="SKTR" width={798} height={236} priority className="block h-7 w-auto [html.light_&]:hidden" />
          <Image src="/sktr-logo-dark.png" alt="" width={798} height={236} className="hidden h-7 w-auto [html.light_&]:block" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`py-2 text-[0.9375rem] transition-colors hover:text-[var(--sk-ink)] ${active ? "text-[var(--sk-ink)]" : "text-[var(--sk-muted)]"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeSwitch />
          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-none bg-[var(--sk-btn)] px-5 text-[0.9375rem] font-semibold text-[var(--sk-btn-ink)] transition-opacity hover:opacity-85 md:inline-flex"
          >
            Start a project
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="sk-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-none text-[var(--sk-ink)] md:hidden"
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="sk-mobile-nav" aria-label="Main" className="h-[calc(100dvh-4rem)] bg-[var(--sk-bg)] px-6 pt-4 md:hidden">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex min-h-16 items-center border-b border-[var(--sk-line)] text-[1.75rem] font-semibold tracking-[-0.02em]">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-6 flex min-h-13 h-13 items-center justify-center rounded-none bg-[var(--sk-btn)] py-3.5 text-lg font-semibold text-[var(--sk-btn-ink)]">
            Start a project
          </Link>
        </nav>
      )}
    </header>
  );
}
