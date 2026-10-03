import type { Metadata } from "next";
import Image from "next/image";
import Shell, { PageHead, h2 } from "@/components/site/Shell";
import { founder } from "@/lib/home-content";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description: "SKTR is a software studio in Kingston, Jamaica. We design and build mobile apps, web platforms, SaaS products and APIs.",
  openGraph: { title: "About | SKTR", description: "SKTR is a software studio in Kingston, Jamaica." },
};

const PRINCIPLES = [
  { title: "Scope before code", text: "We define the problem clearly before we write a line of code. No guessing, and no building for requirements that don't exist." },
  { title: "Design and build together", text: "We design the interfaces we build, so what ships matches what was designed." },
  { title: "Ship working software", text: "We build in small steps and ship each one working. A smaller product built right beats a finished one built wrong." },
  { title: "One point of contact", text: "You work directly with the people building your product, not account managers. Decisions stay fast." },
];

const FACTS = [
  ["Founded", "2024"],
  ["Based in", "Kingston, Jamaica"],
  ["Works with", "Startups, founders and established businesses"],
  ["Email", "signal@thesktr.com"],
];

export default function Page() {
  return (
    <Shell>
      <PageHead title="A software studio that builds things that work." />

      <section className="sk-wrap grid gap-10 pb-20 md:pb-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="flex flex-col gap-6 text-[clamp(1.1875rem,1.8vw,1.375rem)] leading-relaxed">
          <p className="m-0">
            SKTR is a software studio. We design and build mobile apps, web platforms, SaaS products and APIs. We work with startups, independent
            founders and businesses that need software done properly.
          </p>
          <p className="m-0 text-[var(--sk-muted)]">
            The work covers the full stack, from interface design to production deployment. We&apos;ve built mobile games with live leaderboards,
            booking platforms, and custom software for clients.
          </p>
          <p className="m-0 text-[var(--sk-muted)]">
            We don&apos;t separate design from engineering. The same people who design the interface build it, which means fewer surprises and faster
            decisions.
          </p>
        </div>
        <dl className="m-0 self-start border-t border-[var(--sk-line)]">
          {FACTS.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 border-b border-[var(--sk-line)] py-4 text-[1.0625rem]">
              <dt className="text-[var(--sk-muted)]">{k}</dt>
              <dd className="m-0 text-right font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="founder-title" className="border-y border-[var(--sk-line)] bg-[var(--sk-panel)]">
        <div className="sk-wrap grid items-center gap-10 py-20 md:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          {founder.photo ? (
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={founder.photo} alt={founder.name} fill sizes="(min-width: 1024px) 400px, 90vw" className="object-cover" />
            </div>
          ) : (
            <div className="sk-todo flex aspect-[4/5] max-w-sm items-center justify-center p-6 text-center">
              <span className="sk-todo-tag">Photo to add</span>
            </div>
          )}
          <div>
            <h2 id="founder-title" className={h2}>
              Who you&apos;ll work with
            </h2>
            <p className="m-0 mt-6 text-[1.625rem] font-semibold tracking-[-0.02em]">{founder.name}</p>
            <p className="m-0 text-[1.1875rem] text-[var(--sk-muted)]">{founder.role}</p>
            <div className={`mt-6 max-w-[38rem] text-[1.1875rem] leading-relaxed ${founder.bio.todo ? "sk-todo p-5" : "text-[var(--sk-muted)]"}`}>
              {founder.bio.todo && (
                <>
                  <span className="sk-todo-tag">To add</span>
                  <br />
                </>
              )}
              {founder.bio.text}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="sk-wrap py-20 md:py-28">
        <h2 id="principles-title" className={h2}>
          How we work
        </h2>
        <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 md:mt-14">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="border-t border-[var(--sk-line-strong)] pt-5">
              <h3 className="m-0 text-[1.625rem] font-semibold tracking-[-0.025em]">{p.title}</h3>
              <p className="m-0 mt-3 max-w-[30rem] text-[1.125rem] leading-relaxed text-[var(--sk-muted)]">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
