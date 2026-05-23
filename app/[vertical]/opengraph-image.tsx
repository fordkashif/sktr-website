import { ImageResponse } from "next/og";
import { getVertical } from "@/lib/verticals";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical: slug } = await params;
  const v = getVertical(slug);

  const title = v?.title ?? "SKTR";
  const description = v?.description ?? "";
  const kicker = v?.kicker ?? "";
  const num = v?.num ?? "";

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
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(131,145,190,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(131,145,190,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Blue glow — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: "480px",
            height: "480px",
            background:
              "radial-gradient(circle, rgba(62,105,255,0.18) 0%, transparent 65%)",
          }}
        />

        {/* Faint large number — top right */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 64,
            fontSize: "200px",
            fontWeight: 800,
            letterSpacing: "-0.08em",
            color: "rgba(62,105,255,0.07)",
            lineHeight: 1,
          }}
        >
          {num}
        </div>

        {/* Top row */}
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
              fontSize: "13px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              color: "rgba(232,235,240,0.28)",
              fontSize: "13px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Company Building Group
          </div>
        </div>

        {/* Centre: title + description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            maxWidth: "820px",
          }}
        >
          <div
            style={{
              fontSize: "88px",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.06em",
              color: "#e8ebf0",
              marginBottom: "28px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "rgba(232,235,240,0.52)",
              lineHeight: 1.55,
              fontWeight: 400,
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom row */}
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
              fontSize: "28px",
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
                fontSize: "14px",
                color: "rgba(232,235,240,0.38)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              thesktr.com/{slug}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
