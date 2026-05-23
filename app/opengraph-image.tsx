import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SKTR — Innovation Group";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const verticals = ["Athletics", "Labs", "Media", "Ventures"];

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "#050608",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(131,145,190,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(131,145,190,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Blue glow — top left */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: "520px",
            height: "520px",
            background:
              "radial-gradient(circle, rgba(62,105,255,0.2) 0%, transparent 65%)",
          }}
        />

        {/* Right accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 120,
            width: "1px",
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent, rgba(62,105,255,0.3) 40%, rgba(62,105,255,0.3) 60%, transparent)",
          }}
        />

        {/* Top row: eyebrow + verticals */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              color: "#3e69ff",
              fontSize: "14px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Innovation Group
          </div>
          <div style={{ display: "flex", gap: "32px" }}>
            {verticals.map((v) => (
              <div
                key={v}
                style={{
                  color: "rgba(232,235,240,0.35)",
                  fontSize: "13px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {v}
              </div>
            ))}
          </div>
        </div>

        {/* Centre: main headline */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              fontSize: "108px",
              fontWeight: 800,
              lineHeight: 0.88,
              letterSpacing: "-0.06em",
              color: "#e8ebf0",
              marginBottom: "28px",
            }}
          >
            BUILDING
            <br />
            FORWARD.
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "rgba(232,235,240,0.55)",
              lineHeight: 1.55,
              maxWidth: "560px",
              fontWeight: 400,
            }}
          >
            Four verticals. Shared infrastructure.
            A single long-term conviction.
          </div>
        </div>

        {/* Bottom row: brand + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(131,145,190,0.18)",
            paddingTop: "24px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: "#e8ebf0",
            }}
          >
            SKTR
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#3e69ff",
              }}
            />
            <div
              style={{
                fontSize: "15px",
                color: "rgba(232,235,240,0.38)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              thesktr.com
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
