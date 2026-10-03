import Image from "next/image";

/** A thin-bezel display around a screenshot. With no screenshot it shows a quiet blank screen with the product's name. */
export function Display({
  src,
  alt = "",
  name,
  priority,
  sizes = "(min-width: 1120px) 1080px, 96vw",
}: {
  src?: string;
  alt?: string;
  name?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="rounded-[clamp(12px,2vw,26px)] bg-[#1d1d1f] p-[clamp(5px,0.9vw,12px)] shadow-[0_50px_100px_-40px_rgb(0_0_0/0.45)]">
      <div className="overflow-hidden rounded-[clamp(7px,1.2vw,15px)] bg-white">
        {src ? (
          <Image src={src} alt={alt} width={2880} height={1800} sizes={sizes} priority={priority} className="block h-auto w-full" />
        ) : (
          <Blank ratio="16 / 10" name={name} />
        )}
      </div>
    </div>
  );
}

/** A phone around a screenshot, or a blank screen with the product's name */
export function Phone({ src, alt = "", name, sizes = "260px" }: { src?: string; alt?: string; name?: string; sizes?: string }) {
  return (
    <div className="rounded-[2.4rem] bg-[#1d1d1f] p-[7px] shadow-[0_40px_70px_-30px_rgb(0_0_0/0.5)]">
      <div className="overflow-hidden rounded-[2rem] bg-white">
        {src ? <Image src={src} alt={alt} width={780} height={1688} sizes={sizes} className="block h-auto w-full" /> : <Blank ratio="390 / 844" name={name} />}
      </div>
    </div>
  );
}

function Blank({ ratio, name }: { ratio: string; name?: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 bg-[linear-gradient(160deg,#fbfbfd,#e8e8ed)] p-6 text-center"
      style={{ aspectRatio: ratio }}
    >
      <span className="text-[clamp(1.1rem,2.4vw,2rem)] font-bold tracking-[-0.03em] text-[#1d1d1f]">{name}</span>
      <span className="text-[0.95rem] text-[#6e6e73]">Screens coming soon</span>
    </div>
  );
}
