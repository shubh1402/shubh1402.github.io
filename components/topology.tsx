"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import raw from "@/lib/utilization-days.json";

type RawDay = { date: string; label: string; sites: { name: string; primary: string; secondary: string }[] };
const DAY = (raw as { days: RawDay[] }).days[0];

const W = 420;
const H = 300;
const CX = W / 2;
const CY = H / 2;

function peakOf(encoded: string) {
  let peak = 0;
  for (let i = 0; i < encoded.length; i++) {
    const c = encoded.charCodeAt(i);
    if (c !== 32 && c - 33 > peak) peak = c - 33;
  }
  return peak;
}

function tone(peak: number) {
  if (peak > 90) return "#B92D36";
  if (peak > 80) return "#D2691E";
  if (peak > 70) return "#A87F16";
  return "#0E5C52";
}

/**
 * The seven sites as a hub and spoke, each spoke carrying that site's real
 * peak for the day: colour by threshold band, thickness by load, and a dash
 * that drifts towards the hub like traffic.
 */
export function Topology() {
  const [on, setOn] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  const nodes = useMemo(
    () =>
      DAY.sites.map((site, i) => {
        const angle = (i / DAY.sites.length) * Math.PI * 2 - Math.PI / 2;
        const peak = peakOf(site.primary);
        return {
          name: site.name,
          peak,
          x: CX + Math.cos(angle) * 118,
          y: CY + Math.sin(angle) * 104,
          anchor: (Math.cos(angle) > 0.25 ? "start" : Math.cos(angle) < -0.25 ? "end" : "middle") as "start" | "end" | "middle",
          dy: Math.sin(angle) > 0.5 ? 20 : Math.sin(angle) < -0.5 ? -12 : 4,
        };
      }),
    [],
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver((e) => setOn(e.some((x) => x.isIntersecting)), { threshold: 0.2 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label="Seven monitored sites connected to one collector, coloured by how hard each link ran"
    >
      {nodes.map((n) => (
        <g key={n.name}>
          <line x1={CX} y1={CY} x2={n.x} y2={n.y} stroke="#DCE0DA" strokeWidth="3" />
          <line
            x1={CX}
            y1={CY}
            x2={n.x}
            y2={n.y}
            stroke={tone(n.peak)}
            strokeWidth={1 + (n.peak / 100) * 2.2}
            strokeDasharray="5 9"
            opacity={0.9}
          >
            {on && (
              <animate attributeName="stroke-dashoffset" from="28" to="0" dur={`${2.6 - (n.peak / 100) * 1.6}s`} repeatCount="indefinite" />
            )}
          </line>
        </g>
      ))}

      {nodes.map((n) => (
        <g key={n.name}>
          <circle cx={n.x} cy={n.y} r="7" fill="#FBFBF9" stroke={tone(n.peak)} strokeWidth="2" />
          <circle cx={n.x} cy={n.y} r="3" fill={tone(n.peak)} />
          <text
            x={n.x + (n.anchor === "start" ? 12 : n.anchor === "end" ? -12 : 0)}
            y={n.y + n.dy}
            textAnchor={n.anchor}
            className="fill-ink"
            style={{ fontSize: 11 }}
          >
            {n.name}
          </text>
          <text
            x={n.x + (n.anchor === "start" ? 12 : n.anchor === "end" ? -12 : 0)}
            y={n.y + n.dy + 12}
            textAnchor={n.anchor}
            fill={tone(n.peak)}
            style={{ fontSize: 10, fontFamily: "Plex Mono, monospace" }}
          >
            {n.peak}%
          </text>
        </g>
      ))}

      <circle cx={CX} cy={CY} r="26" fill="#FBFBF9" stroke="#15211E" strokeWidth="1.5" />
      <text x={CX} y={CY - 1} textAnchor="middle" className="fill-ink" style={{ fontSize: 10, fontWeight: 600 }}>
        collector
      </text>
      <text x={CX} y={CY + 11} textAnchor="middle" fill="#637069" style={{ fontSize: 9, fontFamily: "Plex Mono, monospace" }}>
        1 min
      </text>
    </svg>
  );
}
