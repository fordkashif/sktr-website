import Image from "next/image";
import type { ReactNode } from "react";

/** A browser window around a screenshot (or a marked placeholder when there is no screenshot yet) */
export function BrowserFrame({
  src,
  alt,
  address,
  placeholder,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src?: string;
  alt?: string;
  address: string;
  placeholder?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_34px_70px_-28px_rgb(11_16_32/0.45)] ring-1 ring-[rgb(11_16_32/0.08)]">
      <div className="flex h-9 items-center gap-3 bg-[#f1f3f8] px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="block h-2.5 w-2.5 rounded-full bg-[#c9cfdd]" />
          <i className="block h-2.5 w-2.5 rounded-full bg-[#c9cfdd]" />
          <i className="block h-2.5 w-2.5 rounded-full bg-[#c9cfdd]" />
        </span>
        <span className="truncate rounded-full bg-white px-3 py-0.5 text-[0.72rem] font-medium text-[var(--sk-muted)]">{address}</span>
      </div>
      {src ? (
        <Image src={src} alt={alt ?? ""} width={1440} height={900} sizes={sizes} priority={priority} className="block h-auto w-full" />
      ) : (
        <Placeholder ratio="16 / 10">{placeholder}</Placeholder>
      )}
    </div>
  );
}

/** A phone around a screenshot (or a marked placeholder) */
export function PhoneFrame({ src, alt, placeholder, sizes = "280px" }: { src?: string; alt?: string; placeholder?: string; sizes?: string }) {
  return (
    <div className="rounded-[2.3rem] bg-[var(--sk-ink)] p-[7px] shadow-[0_34px_60px_-24px_rgb(11_16_32/0.55)]">
      <div className="overflow-hidden rounded-[1.9rem] bg-white">
        {src ? (
          <Image src={src} alt={alt ?? ""} width={780} height={1688} sizes={sizes} className="block h-auto w-full" />
        ) : (
          <Placeholder ratio="390 / 844">{placeholder}</Placeholder>
        )}
      </div>
    </div>
  );
}

function Placeholder({ ratio, children }: { ratio: string; children?: ReactNode }) {
  return (
    <div className="sk-placeholder flex items-center justify-center p-6 text-center" style={{ aspectRatio: ratio }}>
      <span className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[var(--sk-muted)] ring-1 ring-[var(--sk-line)]">
        {children ?? "Screenshot to be added"}
      </span>
    </div>
  );
}
