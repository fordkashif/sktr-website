import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-white">
      <div className="sk-wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Image src="/sktr-logo-dark.png" alt="SKTR" width={798} height={236} className="h-9 w-auto" />
          <p className="mt-5 max-w-sm text-lg text-[var(--sk-muted)]">
            We design and build mobile apps, web platforms, SaaS products and APIs. Based in Kingston, Jamaica.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="m-0 text-lg font-bold">Explore</h2>
          <ul className="m-0 mt-3 list-none p-0">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center text-lg text-[var(--sk-muted)] hover:text-[var(--sk-blue)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="m-0 text-lg font-bold">Get in touch</h2>
          <a href="mailto:signal@thesktr.com" className="mt-3 inline-flex min-h-10 items-center text-lg font-semibold text-[var(--sk-blue)] hover:underline">
            signal@thesktr.com
          </a>
          <p className="m-0 mt-1 text-lg text-[var(--sk-muted)]">We reply within 48 hours.</p>
        </div>
      </div>
      <div className="sk-wrap border-t border-[var(--sk-line)] py-6 text-[var(--sk-muted)]">&copy; {new Date().getFullYear()} SKTR</div>
    </footer>
  );
}
