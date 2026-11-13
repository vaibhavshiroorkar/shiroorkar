import { ImageResponse } from "next/og";

export const alt = "Udaykumar Shiroorkar: Experience. Responsibility. Impact.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Typographic share card. Swap for a real photo-based card once portraits arrive. */
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
          background: "#173d32",
          color: "#f6f5ef",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 26, letterSpacing: 10 }}>
          <div style={{ width: 48, height: 2, background: "#c69a5a" }} />
          SHIROORKAR
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.02 }}>Udaykumar Shiroorkar</div>
          <div style={{ marginTop: 28, fontSize: 36, color: "#9aaa91" }}>
            Experience. Responsibility. Impact.
          </div>
        </div>
        <div style={{ fontSize: 22, color: "rgba(246,245,239,0.7)" }}>
          Speaking, workshops and environmental collaborations
        </div>
      </div>
    ),
    size,
  );
}
