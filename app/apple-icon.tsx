import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#12203a",
          fontSize: 104,
          fontWeight: 800,
          letterSpacing: "-0.06em",
        }}
      >
        <span style={{ color: "#f2eee2" }}>G</span>
        <span style={{ color: "#e08324" }}>L</span>
      </div>
    ),
    { ...size },
  );
}
