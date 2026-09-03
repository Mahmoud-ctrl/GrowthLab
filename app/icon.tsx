import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 300,
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
