import Image from "next/image";

/** A browser window around a screenshot. With no screenshot it shows a quiet blank screen with the product's name. */
export function Window({
  src,
  alt = "",
  name,
  address,
  priority,
  sizes = "(min-width: 1200px) 760px, 94vw",
}: {
  src?: string;
  alt?: string;
  name?: string;
  address?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="overflow-hidden rounded-none border border-[var(--sk-line-strong)] bg-[var(--sk-panel)] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)]">
      <div className="flex h-9 items-center gap-3 border-b border-[var(--sk-line)] px-3.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="block h-2.5 w-2.5 rounded-full bg-[var(--sk-line-strong)]" />
          <i className="block h-2.5 w-2.5 rounded-full bg-[var(--sk-line-strong)]" />
          <i className="block h-2.5 w-2.5 rounded-full bg-[var(--sk-line-strong)]" />
        </span>
        {address && <span className="truncate text-[0.875rem] text-[var(--sk-muted)]">{address}</span>}
      </div>
      {src ? (
        <Image src={src} alt={alt} width={2880} height={1800} sizes={sizes} priority={priority} className="block h-auto w-full" />
      ) : (
        <Blank ratio="16 / 10" name={name} />
      )}
    </div>
  );
}

/** A phone around a screenshot, or a blank screen with the product's name */
export function Phone({ src, alt = "", name, sizes = "240px" }: { src?: string; alt?: string; name?: string; sizes?: string }) {
  return (
    <div className="rounded-[2.2rem] border border-[var(--sk-line-strong)] bg-[#0b0d12] p-[6px] shadow-[0_40px_70px_-30px_rgb(0_0_0/0.8)]">
      <div className="overflow-hidden rounded-[1.85rem] bg-[var(--sk-panel)]">
        {src ? <Image src={src} alt={alt} width={780} height={1688} sizes={sizes} className="block h-auto w-full" /> : <Blank ratio="390 / 844" name={name} />}
      </div>
    </div>
  );
}

function Blank({ ratio, name }: { ratio: string; name?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 bg-[var(--sk-panel-2)] p-5 text-center" style={{ aspectRatio: ratio }}>
      <span className="text-[clamp(1.1rem,2.2vw,1.75rem)] font-bold tracking-[-0.03em] text-[var(--sk-ink)]">{name}</span>
      <span className="text-[0.9375rem] text-[var(--sk-muted)]">Screens coming soon</span>
    </div>
  );
}
