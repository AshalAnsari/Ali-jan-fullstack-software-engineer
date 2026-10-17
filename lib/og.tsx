import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const C = {
  bg: "#0b0c0e",
  surface: "#141519",
  border: "#30333a",
  fg: "#edeae4",
  muted: "#a9abb1",
  subtle: "#878a92",
  primary: "#ff6a3d",
};

async function fonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [medium, semibold, mono, serif] = await Promise.all([
    readFile(join(dir, "Geist-Medium.ttf")),
    readFile(join(dir, "Geist-SemiBold.ttf")),
    readFile(join(dir, "GeistMono-Regular.ttf")),
    readFile(join(dir, "InstrumentSerif-Italic.ttf")),
  ]);
  return [
    { name: "Geist", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
    { name: "Instrument Serif", data: serif, weight: 400 as const, style: "italic" as const },
  ];
}

function Mark({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="8" fill={C.surface} stroke={C.border} strokeWidth="1.5" />
      <path d="M7 23.5 11.75 8.5l4.75 15" fill="none" stroke={C.fg} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 18h5.5" stroke={C.fg} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24.5 8.5v10.25a4.25 4.25 0 0 1-6.9 3.3" fill="none" stroke={C.primary} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

const layers = ["UI", "Frontend", "APIs", "Backend", "Data", "AI", "Cloud", "Integrations"];

type OgInput = {
  eyebrow: string;
  title: string;
  /** Rendered in serif italic after the title, e.g. the surname. */
  accent?: string;
  subtitle: string;
  footer?: string;
};

export async function renderOg({ eyebrow, title, accent, subtitle, footer }: OgInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: C.bg,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          fontFamily: "Geist",
          color: C.fg,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            backgroundImage: "radial-gradient(circle at 88% 12%, rgba(255,106,61,0.2) 0%, rgba(255,106,61,0) 42%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Mark />
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Geist Mono", fontSize: 18, color: C.muted, letterSpacing: 3 }}>
            <div style={{ width: 10, height: 10, borderRadius: 9999, background: "#7fd1a8" }} />
            {eyebrow.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", fontSize: title.length > 18 ? 92 : 116, lineHeight: 1, letterSpacing: -4, fontWeight: 500 }}>
            <span>{title}</span>
            {accent && (
              <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400, marginLeft: 26, letterSpacing: -2 }}>
                {accent}
              </span>
            )}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: C.muted, lineHeight: 1.35, maxWidth: 940 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: 26 }}>
          <div style={{ display: "flex", gap: 14, fontFamily: "Geist Mono", fontSize: 17, color: C.subtle }}>
            {layers.map((l, i) => (
              <div key={l} style={{ display: "flex", gap: 14 }}>
                {i > 0 && <span style={{ color: C.border }}>→</span>}
                <span style={{ color: i === 0 ? C.primary : C.subtle }}>{l}</span>
              </div>
            ))}
          </div>
          {footer && <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 17, color: C.muted }}>{footer}</div>}
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
