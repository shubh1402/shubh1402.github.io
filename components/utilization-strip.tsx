"use client";

import { useMemo, useState } from "react";
import day from "@/lib/utilization-day.json";

type Site = { name: string; primary: (number | null)[]; secondary: (number | null)[]; peak: number };

const SITES = day.sites as Site[];
const CELLS = 96; // one cell per 15 minutes
const PER_CELL = 1440 / CELLS;

/** Colour for one cell: threshold bands above the line, a quiet teal ramp below it. */
function cellStyle(value: number | null, threshold: number) {
  if (value === null) return { background: "repeating-linear-gradient(135deg,#C9CFC9 0 2px,transparent 2px 4px)" };
  if (value > Math.max(threshold, 90)) return { background: "#B92D36" };
  if (value > Math.max(threshold, 80)) return { background: "#D2691E" };
  if (value > threshold) return { background: "#A87F16" };
  const t = Math.min(value / Math.max(threshold, 1), 1);
  return { background: `color-mix(in srgb, #0E5C52 ${8 + t * 46}%, #E7EAE6)` };
}

function minutesText(total: number) {
  if (total === 0) return "none";
  if (total < 60) return `${total} min`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

export function UtilizationStrip() {
  const [threshold, setThreshold] = useState(70);
  const [hover, setHover] = useState<{ site: string; cell: number; value: number | null } | null>(null);

  const rows = useMemo(
    () =>
      SITES.map((site) => {
        const cells = Array.from({ length: CELLS }, (_, i) => {
          let max: number | null = null;
          for (let m = i * PER_CELL; m < (i + 1) * PER_CELL; m++) {
            const v = site.primary[m];
            if (v !== null && v !== undefined && (max === null || v > max)) max = v;
          }
          return max;
        });
        const over = site.primary.reduce<number>((n, v) => n + (v !== null && v > threshold ? 1 : 0), 0);
        return { name: site.name, cells, over, peak: site.peak };
      }),
    [threshold],
  );

  const sitesOver = rows.filter((r) => r.over > 0).length;
  const totalOver = rows.reduce((n, r) => n + r.over, 0);

  return (
    <figure className="m-0">
      <div className="border border-rule bg-card">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-rule px-4 py-3 sm:px-5">
          <p className="m-0 max-w-[34rem] text-sm leading-relaxed text-muted">
            One day across seven sites, one cell per quarter hour. Move the line to see how long each site ran hot.
          </p>
          <div className="flex items-center gap-3">
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
              className="h-1 w-32 cursor-pointer appearance-none rounded-full bg-rule accent-accent"
            />
            <output htmlFor="threshold" className="fig w-10 text-sm font-medium text-ink">
              {threshold}%
            </output>
          </div>
        </div>

        <div className="overflow-x-auto px-4 py-4 sm:px-5">
          <div className="min-w-[17rem]">
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

            {rows.map((row) => (
              <div
                key={row.name}
                className="grid grid-cols-[1fr_4.5rem] items-center gap-x-3 gap-y-1 border-t border-rule/70 py-2 sm:grid-cols-[6.5rem_1fr_5.5rem] sm:py-1.5"
              >
                <span className="truncate text-sm text-ink sm:order-none">{row.name}</span>
                <div
                  className="order-last col-span-2 flex h-4 gap-px sm:order-none sm:col-span-1"
                  onMouseLeave={() => setHover(null)}
                  onBlur={() => setHover(null)}
                >
                  {row.cells.map((value, i) => (
                    <span
                      key={i}
                      style={cellStyle(value, threshold)}
                      className="flex-1"
                      onMouseEnter={() => setHover({ site: row.name, cell: i, value })}
                    />
                  ))}
                </div>
                <span className={`fig text-right text-sm ${row.over ? "text-ink" : "text-faint"}`}>
                  {row.over ? minutesText(row.over) : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule px-4 py-3 text-sm sm:px-5"
          aria-live="polite"
        >
          <p className="m-0 text-muted">
            {hover ? (
              <>
                <span className="text-ink">{hover.site}</span> at{" "}
                <span className="fig">
                  {String(Math.floor((hover.cell * PER_CELL) / 60)).padStart(2, "0")}:
                  {String((hover.cell * PER_CELL) % 60).padStart(2, "0")}
                </span>{" "}
                {hover.value === null ? "had no samples" : <>reached <span className="fig">{hover.value}%</span></>}
              </>
            ) : (
              <>
                <span className="fig text-ink">{sitesOver}</span> of{" "}
                <span className="fig text-ink">{rows.length}</span> sites went above{" "}
                <span className="fig">{threshold}%</span>, for{" "}
                <span className="fig text-ink">{minutesText(totalOver)}</span> in total
              </>
            )}
          </p>
          <p className="m-0 text-faint">Generated by the pipeline below</p>
        </div>
      </div>
    </figure>
  );
}
