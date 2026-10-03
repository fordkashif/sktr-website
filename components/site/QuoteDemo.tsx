"use client";

import { useEffect, useRef, useState } from "react";

/** Example packages, priced per person in Jamaican dollars */
const PACKAGES = [
  { id: "blossom", name: "Blossom", perPerson: 6388, detail: "1 protein, 1 side" },
  { id: "orchid", name: "Orchid", perPerson: 8728, detail: "2 proteins, 2 sides" },
  { id: "rose-gold", name: "Rose Gold", perPerson: 11380, detail: "3 proteins, 2 sides" },
];

const jmd = (n: number) => "J$" + n.toLocaleString("en-US");

/** A value in the code pane that flashes whenever it changes */
function Live({ value, className }: { value: string; className: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;
    el.classList.remove("sk-flash");
    void el.offsetWidth;
    el.classList.add("sk-flash");
  }, [value]);
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/**
 * A working, simplified copy of the quote engine SKTR built for Abi's Kitchen. Choosing a
 * package or moving the guest slider updates the price on the left and the request and reply
 * on the right, so a visitor sees an interface and the code behind it move together.
 */
export default function QuoteDemo() {
  const [pkg, setPkg] = useState(PACKAGES[1]);
  const [guests, setGuests] = useState(120);
  const total = pkg.perPerson * guests;

  const key = "text-[#8fb4ff]";
  const str = "text-[#7ee2a8]";
  const num = "text-[#ffc777]";
  const dim = "text-[#6b7385]";

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--sk-line-strong)] bg-[var(--sk-panel)] text-left shadow-[0_60px_120px_-50px_rgb(0_0_0/0.8)]">
      <div className="flex h-11 items-center gap-3 border-b border-[var(--sk-line)] px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="block h-2.5 w-2.5 rounded-full bg-[var(--sk-line-strong)]" />
          <i className="block h-2.5 w-2.5 rounded-full bg-[var(--sk-line-strong)]" />
          <i className="block h-2.5 w-2.5 rounded-full bg-[var(--sk-line-strong)]" />
        </span>
        <span className="text-[0.9375rem] text-[var(--sk-muted)]">Live demo. Try it.</span>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* What the customer sees */}
        <div className="p-5 sm:p-8">
          <p className="m-0 text-[0.9375rem] text-[var(--sk-muted)]">What the customer sees</p>
          <fieldset className="m-0 mt-4 border-0 p-0">
            <legend className="p-0 text-[1.0625rem] font-semibold">Choose a package</legend>
            <div className="mt-3 grid gap-2">
              {PACKAGES.map((p) => {
                const on = p.id === pkg.id;
                return (
                  <label
                    key={p.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${on ? "border-[#3e69ff] bg-[rgb(62_105_255/0.12)]" : "border-[var(--sk-line)] hover:border-[var(--sk-line-strong)]"}`}
                  >
                    <input type="radio" name="sk-demo-package" className="sr-only" checked={on} onChange={() => setPkg(p)} />
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${on ? "border-[#3e69ff]" : "border-[var(--sk-line-strong)]"}`} aria-hidden="true">
                      {on && <span className="h-2.5 w-2.5 rounded-full bg-[#3e69ff]" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{p.name}</span>
                      <span className="block text-[0.9375rem] text-[var(--sk-muted)]">{p.detail}</span>
                    </span>
                    <span className="shrink-0 text-[0.9375rem] font-medium text-[var(--sk-muted)]">{jmd(p.perPerson)} pp</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <label htmlFor="sk-demo-guests" className="mt-6 flex items-baseline justify-between text-[1.0625rem] font-semibold">
            Guests
            <span className="text-[var(--sk-muted)]">{guests}</span>
          </label>
          <input
            id="sk-demo-guests"
            type="range"
            min={20}
            max={300}
            step={10}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-2 h-8 w-full cursor-pointer"
          />

          <div className="mt-5 flex items-end justify-between gap-4 border-t border-[var(--sk-line)] pt-5">
            <span className="text-[0.9375rem] text-[var(--sk-muted)]">Instant estimate</span>
            <output htmlFor="sk-demo-guests" aria-live="polite" className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-none tracking-[-0.03em]">
              {jmd(total)}
            </output>
          </div>
        </div>

        {/* What runs behind it */}
        <div className="border-t border-[var(--sk-line)] bg-[#0a0c11] p-5 text-[#d6dbe6] sm:p-8 lg:border-l lg:border-t-0">
          <p className="m-0 text-[0.9375rem] text-[#8c94a5]">What runs behind it</p>
          <pre className="sk-code m-0 mt-4 overflow-x-auto text-[0.875rem] leading-[1.75] sm:text-[0.9375rem]">
            <code>
              <span className={dim}>{"// request"}</span>
              {"\n"}
              <span className="text-[#c9a5ff]">POST</span> /api/quotes{"\n"}
              {"{\n"}
              {"  "}
              <span className={key}>&quot;event&quot;</span>: <span className={str}>&quot;wedding&quot;</span>,{"\n"}
              {"  "}
              <span className={key}>&quot;package&quot;</span>: <Live value={`"${pkg.id}"`} className={str} />,{"\n"}
              {"  "}
              <span className={key}>&quot;guests&quot;</span>: <Live value={String(guests)} className={num} />
              {"\n}\n\n"}
              <span className={dim}>{"// reply"}</span>
              {"\n"}
              <span className={str}>200 OK</span>
              {"\n{\n"}
              {"  "}
              <span className={key}>&quot;reference&quot;</span>: <span className={str}>&quot;Q-2026-0001&quot;</span>,{"\n"}
              {"  "}
              <span className={key}>&quot;perPerson&quot;</span>: <Live value={String(pkg.perPerson)} className={num} />,{"\n"}
              {"  "}
              <span className={key}>&quot;estimate&quot;</span>: <Live value={String(total)} className={num} />,{"\n"}
              {"  "}
              <span className={key}>&quot;currency&quot;</span>: <span className={str}>&quot;JMD&quot;</span>
              {"\n}"}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
