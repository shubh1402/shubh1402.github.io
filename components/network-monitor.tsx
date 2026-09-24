"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import raw from "@/lib/utilization-days.json";

type RawSite = { name: string; primary: string; secondary: string };
type RawDay = { date: string; label: string; note: string; sites: RawSite[] };

const DAYS = (raw as { days: RawDay[] }).days;
const CELLS = 96;
const PER_CELL = 1440 / CELLS;

/** One character per minute: 0-100 encoded from 33, space means no sample. */
function decode(s: string): (number | null)[] {
  const out = new Array<number | null>(s.length);
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    out[i] = c === 32 ? null : c - 33;
  }
  return out;
}

const decoded = DAYS.map((day) => ({
  ...day,
  sites: day.sites.map((s) => ({ name: s.name, primary: decode(s.primary), secondary: decode(s.secondary) })),
}));

const LINKS = [
  { key: "primary", label: "Primary link" },
  { key: "secondary", label: "Backup link" },
] as const;
type LinkKey = (typeof LINKS)[number]["key"];

function band(value: number, threshold: number) {
  if (value > Math.max(threshold, 90)) return 90;
  if (value > Math.max(threshold, 80)) return 80;
  if (value > threshold) return 70;
  return 0;
}

const BAND_FILL: Record<number, string> = { 90: "#B92D36", 80: "#D2691E", 70: "#A87F16" };

function cellFill(value: number | null, threshold: number) {
  if (value === null) return "repeating-linear-gradient(135deg,#C9CFC9 0 2px,transparent 2px 4px)";
  const b = band(value, threshold);
  if (b) return BAND_FILL[b];
  const t = Math.min(value / Math.max(threshold, 1), 1);
  return `color-mix(in srgb, #0E5C52 ${6 + t * 52}%, #E9ECE8)`;
}

function minutesText(total: number) {
  if (total === 0) return "none";
  if (total < 60) return `${total} min`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

function clock(minute: number) {
  return `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
}

/** 24-hour trace for one site, drawn from the same per-minute data. */
function SiteTrace({ primary, secondary, threshold }: { primary: (number | null)[]; secondary: (number | null)[]; threshold: number }) {
  const W = 720;
  const H = 120;
  const path = (values: (number | null)[]) => {
    let d = "";
    let pen = false;
    for (let m = 0; m < values.length; m += 3) {
      const v = values[m];
      if (v === null) {
        pen = false;
        continue;
      }
      const x = (m / 1440) * W;
      const y = H - (v / 100) * H;
      d += `${pen ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)} `;
      pen = true;
    }
    return d.trim();
  };
  const y = (v: number) => H - (v / 100) * H;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-[7.5rem] w-full" role="img" aria-label="Utilization through the day">
      {[25, 50, 75].map((v) => (
        <line key={v} x1="0" x2={W} y1={y(v)} y2={y(v)} stroke="#E2E6E0" strokeWidth="1" />
      ))}
      <line x1="0" x2={W} y1={y(threshold)} y2={y(threshold)} stroke="#A87F16" strokeWidth="1" strokeDasharray="4 4" />
      <path d={path(secondary)} fill="none" stroke="#8E79C9" strokeWidth="1.5" strokeLinejoin="round" />
      <path d={path(primary)} fill="none" stroke="#0E5C52" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function NetworkMonitor() {
  const [dayIndex, setDayIndex] = useState(0);
  const [link, setLink] = useState<LinkKey>("primary");
  const [threshold, setThreshold] = useState(70);
  const [open, setOpen] = useState<string | null>(null);
  const [hover, setHover] = useState<{ site: string; minute: number; value: number | null } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // One orchestrated moment: the strip fills in once, when it first comes into view.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const day = decoded[dayIndex];

  const rows = useMemo(
    () =>
      day.sites.map((site) => {
        const values = site[link];
        const cells = Array.from({ length: CELLS }, (_, i) => {
          let max: number | null = null;
          for (let m = i * PER_CELL; m < (i + 1) * PER_CELL; m++) {
            const v = values[m];
            if (v !== null && (max === null || v > max)) max = v;
          }
          return max;
        });
        let over = 0;
        let peak = 0;
        let peakAt = 0;
        for (let m = 0; m < values.length; m++) {
          const v = values[m];
          if (v === null) continue;
          if (v > threshold) over++;
          if (v > peak) {
            peak = v;
            peakAt = m;
          }
        }
        return { name: site.name, cells, over, peak, peakAt, primary: site.primary, secondary: site.secondary };
      }),
    [day, link, threshold],
  );

  const hot = rows.filter((r) => r.over > 0);
  const worst = hot.length ? hot.reduce((a, b) => (b.over > a.over ? b : a)) : null;

  return (
    <div ref={ref} className="border border-rule bg-card">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-rule px-4 py-3 sm:px-5">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Choose a day">
          {decoded.map((d, i) => (
            <button
              key={d.date}
              type="button"
              onClick={() => {
                setDayIndex(i);
                setOpen(null);
              }}
              aria-pressed={i === dayIndex}
              className={`border px-2.5 py-1 text-sm transition-colors ${
                i === dayIndex ? "border-accent bg-accent text-paper" : "border-rule text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5" role="group" aria-label="Choose a link">
          {LINKS.map((l) => (
            <button
              key={l.key}
              type="button"
              onClick={() => setLink(l.key)}
              aria-pressed={link === l.key}
              className={`border px-2.5 py-1 text-sm transition-colors ${
                link === l.key ? "border-ink text-ink" : "border-transparent text-faint hover:text-accent"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <label htmlFor="threshold" className="text-sm text-muted">
            Busy above
          </label>
          <input
            id="threshold"
            type="range"
            min={40}
            max={95}
            step={5}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="h-1 w-28 cursor-pointer appearance-none rounded-full bg-rule accent-accent"
          />
          <output htmlFor="threshold" className="fig w-9 text-sm font-medium text-ink">
            {threshold}%
          </output>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-5">
        <div className="grid grid-cols-1 items-center gap-x-3 pb-1.5 sm:grid-cols-[6.5rem_1fr_5.5rem]">
          <span className="hidden sm:block" />
          <div className="relative h-4 text-xs text-faint">
            {[0, 6, 12, 18].map((h) => (
              <span key={h} className="num absolute" style={{ left: `${(h / 24) * 100}%` }}>
                {String(h).padStart(2, "0")}:00
              </span>
            ))}
          </div>
          <span className="hidden text-right text-xs text-faint sm:block">Time hot</span>
        </div>

        {rows.map((row, rowIndex) => {
          const isOpen = open === row.name;
          return (
            <div key={row.name} className="border-t border-rule/70">
              <div className="grid grid-cols-[1fr_4.5rem] items-center gap-x-3 gap-y-1 py-2 sm:grid-cols-[6.5rem_1fr_5.5rem] sm:py-1.5">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : row.name)}
                  aria-expanded={isOpen}
                  className="truncate text-left text-sm text-ink transition-colors hover:text-accent"
                >
                  {row.name}
                </button>

                <div
                  className="order-last col-span-2 flex h-4 gap-px sm:order-none sm:col-span-1"
                  onMouseLeave={() => setHover(null)}
                >
                  {row.cells.map((value, i) => (
                    <span
                      key={i}
                      className="flex-1 transition-opacity duration-300"
                      style={{
                        background: cellFill(value, threshold),
                        opacity: revealed ? 1 : 0,
                        transitionDelay: revealed ? `${rowIndex * 60 + i * 4}ms` : "0ms",
                      }}
                      onMouseEnter={() => setHover({ site: row.name, minute: i * PER_CELL, value })}
                    />
                  ))}
                </div>

                <span className={`fig text-right text-sm ${row.over ? "text-ink" : "text-faint"}`}>
                  {row.over ? minutesText(row.over) : "—"}
                </span>
              </div>

              {isOpen && (
                <div className="border-t border-rule/70 bg-paper/60 px-1 pb-4 pt-3 sm:pl-[7.25rem] sm:pr-[6.25rem]">
                  <div className="mb-2 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-sm">
                    <span className="text-muted">
                      Peak <span className="fig text-ink">{row.peak}%</span> at{" "}
                      <span className="fig text-ink">{clock(row.peakAt)}</span>
                    </span>
                    <span className="text-muted">
                      Above <span className="fig">{threshold}%</span> for{" "}
                      <span className="fig text-ink">{minutesText(row.over)}</span>
                    </span>
                    <span className="text-faint">
                      Primary in teal, backup in violet, the dashed line is your threshold
                    </span>
                  </div>
                  <SiteTrace primary={row.primary} secondary={row.secondary} threshold={threshold} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule px-4 py-3 text-sm sm:px-5" aria-live="polite">
        <p className="m-0 text-muted">
          {hover ? (
            <>
              <span className="text-ink">{hover.site}</span> at <span className="fig">{clock(hover.minute)}</span>{" "}
              {hover.value === null ? "had no samples" : <>reached <span className="fig text-ink">{hover.value}%</span></>}
            </>
          ) : worst ? (
            <>
              <span className="text-ink">{worst.name}</span> ran above <span className="fig">{threshold}%</span> for{" "}
              <span className="fig text-ink">{minutesText(worst.over)}</span>, peaking at{" "}
              <span className="fig text-ink">{worst.peak}%</span>
              {hot.length > 1 ? <> — {hot.length - 1} other {hot.length === 2 ? "site" : "sites"} went over too</> : null}
            </>
          ) : (
            <>
              Every site stayed below <span className="fig">{threshold}%</span> all day
            </>
          )}
        </p>
        <p className="m-0 text-faint">{day.note}</p>
      </div>
    </div>
  );
}
