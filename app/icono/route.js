import { ImageResponse } from "next/og";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pedido = Number(searchParams.get("s"));
  const s = [180, 192, 512].includes(pedido) ? pedido : 512;
  const c = Math.round(s * 0.34);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7c3aed, #2563eb)",
        }}
      >
        <div style={{ display: "flex", position: "relative", width: Math.round(c * 1.6), height: c }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: c,
              height: c,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: Math.round(c * 0.6),
              top: 0,
              width: c,
              height: c,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.55)",
            }}
          />
        </div>
      </div>
    ),
    { width: s, height: s }
  );
}