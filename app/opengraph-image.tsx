import { ImageResponse } from "next/og";

export const alt =
  "GrowthLab: an 8-week online digital marketing agency experience. You don't need another marketing course. You need real agency experience.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f2eee2",
          color: "#12203a",
          padding: "72px 80px",
          borderTop: "14px solid #e08324",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.28em",
            fontWeight: 700,
            color: "#5c6a80",
          }}
        >
          GROWTHLAB
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            You don&apos;t need another marketing course.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 800,
              color: "#e08324",
            }}
          >
            You need real agency experience.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.16em",
            fontWeight: 700,
            color: "#5c6a80",
          }}
        >
          8 WEEKS · ONLINE · REAL CLIENT PROJECT · SEPTEMBER 2026
        </div>
      </div>
    ),
    { ...size },
  );
}
