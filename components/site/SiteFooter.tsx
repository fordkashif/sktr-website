import Link from "next/link";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--sk-line)] text-[0.9375rem] text-[var(--sk-muted)]">
      <div className="sk-wrap flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="m-0 max-w-md leading-relaxed">
          SKTR designs and builds mobile apps, web platforms, SaaS products and APIs. Based in Kingston, Jamaica.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-1">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex min-h-10 items-center hover:text-[var(--sk-ink)]">
              {l.label}
            </Link>
          ))}
          <a href="mailto:signal@thesktr.com" className="inline-flex min-h-10 items-center hover:text-[var(--sk-ink)]">
            signal@thesktr.com
          </a>
        </nav>
      </div>
      <div className="sk-wrap border-t border-[var(--sk-line)] py-5">&copy; {new Date().getFullYear()} SKTR</div>
    </footer>
  );
}
