import type { Metadata } from "next";
import Shell, { PageHead } from "@/components/site/Shell";
import ContactForm from "@/components/site/ContactForm";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: "Start a project with SKTR. Tell us what you're building and we'll reply within 48 hours.",
  openGraph: { title: "Contact | SKTR", description: "Start a project with SKTR. We reply within 48 hours." },
};

const NEXT = ["We read your message.", "We reply with questions or a scope outline.", "We agree the approach and timeline.", "We build."];

export default function Page() {
  return (
    <Shell cta={false}>
      <PageHead title="Start a project" lead="Tell us what you're building. We reply to every enquiry within 48 hours." />
      <section className="sk-wrap grid gap-10 pb-24 md:pb-32 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <ContactForm />
        <aside className="space-y-10">
          <div>
            <h2 className="m-0 text-[1.375rem] font-semibold tracking-[-0.02em]">Prefer email?</h2>
            <a href="mailto:signal@thesktr.com" className="mt-2 inline-flex min-h-11 items-center text-[1.25rem] font-semibold text-[var(--sk-blue)] hover:underline">
              signal@thesktr.com
            </a>
            <p className="m-0 mt-1 text-[1.0625rem] leading-relaxed text-[var(--sk-muted)]">
              For general questions, partnerships, or anything that doesn&apos;t fit the form.
            </p>
          </div>
          <div>
            <h2 className="m-0 text-[1.375rem] font-semibold tracking-[-0.02em]">What happens next</h2>
            <ol className="m-0 mt-4 list-none border-t border-[var(--sk-line)] p-0">
              {NEXT.map((t, i) => (
                <li key={t} className="flex gap-4 border-b border-[var(--sk-line)] py-3.5 text-[1.0625rem]">
                  <span className="sk-code text-[var(--sk-cyan)]">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </section>
    </Shell>
  );
}
