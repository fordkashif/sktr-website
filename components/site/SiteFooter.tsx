import Link from "next/link";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--sk-grey)] text-[0.95rem] text-[var(--sk-muted)]">
      <div className="sk-wrap py-10">
        <p className="m-0 max-w-xl leading-relaxed">
          SKTR designs and builds mobile apps, web platforms, SaaS products and APIs. Based in Kingston, Jamaica.
        </p>
        <div className="mt-6 flex flex-col gap-4 border-t border-[var(--sk-line)] pt-6 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-1">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex min-h-10 items-center text-[#424245] hover:text-[var(--sk-ink)] hover:underline">
                {l.label}
              </Link>
            ))}
            <a href="mailto:signal@thesktr.com" className="inline-flex min-h-10 items-center text-[#424245] hover:text-[var(--sk-ink)] hover:underline">
              signal@thesktr.com
            </a>
          </nav>
          <p className="m-0">&copy; {new Date().getFullYear()} SKTR</p>
        </div>
      </div>
    </footer>
  );
}
