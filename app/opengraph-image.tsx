import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SKTR — Innovation Group";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px",
          background: "linear-gradient(135deg, #050608 0%, #0a0d14 60%, #0d1220 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Blue accent glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "480px",
            height: "480px",
            background: "radial-gradient(circle, rgba(62,105,255,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(131,145,190,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(131,145,190,0.06) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            color: "#3e69ff",
            fontSize: "18px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            marginBottom: "24px",
            fontWeight: 500,
          }}
        >
          Innovation Group
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "96px",
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: "-0.05em",
            color: "#e8ebf0",
            marginBottom: "32px",
          }}
        >
          BUILDING
          <br />
          FORWARD.
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(232,235,240,0.65)",
            lineHeight: 1.6,
            maxWidth: "620px",
            marginBottom: "48px",
          }}
        >
          Building companies, platforms, and ecosystems across athletics,
          technology, media, and ventures.
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(131,145,190,0.2)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#e8ebf0",
            }}
          >
            SKTR
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "rgba(232,235,240,0.4)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            sktr.live
          </div>
        </div>
      </div>
    ),
    size
  );
}
