export default function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9990] overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#grain)"
          style={{ opacity: 0.055, mixBlendMode: "soft-light" }}
        />
      </svg>
    </div>
  );
}
