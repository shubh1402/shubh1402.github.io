"use client";

import { useEffect, useRef, useState } from "react";

/** Captured from an actual run: python -m src.main --mode date --date 22-09-2026 */
const LOG: [string, string][] = [
  ["cmd", "python -m src.main --mode date --date 22-09-2026"],
  ["info", "Utilization report started | source: demo | period: 22-09-2026 | 1440 minutes expected per link"],
  ["info", "Collected 20,076 merged samples across 7 sites"],
  ["info", "Pune: primary in/out 1439/1440, secondary in/out 1438/1438 -> 2880 merged minutes"],
  ["info", "Hyderabad: primary in/out 1440/1439, secondary in/out 1438/1438 -> 2880 merged minutes"],
  ["info", "Lyon: primary in/out 1396/1397, secondary in/out 1396/1398 -> 2796 merged minutes"],
  ["head", "Hyderabad's primary link ran above 90% for 19 minutes, peaking at 100.0%."],
  ["warn", "Check 'Sample coverage': Lyon Primary missing 42 of 1440 minutes"],
  ["info", "Accuracy checks: 4 of 5 passed"],
  ["info", "Graphs completed | success=7 | failed=0"],
  ["info", "Sites eligible for FortiGate captures: ['Pune', 'Mumbai', 'Hyderabad', 'Frankfurt']"],
  ["info", "Excel saved: Utilization_Report_22-09-2026.xlsx"],
  ["done", "Report ready in 1.1s"],
];

const COLOR: Record<string, string> = {
  cmd: "text-ink",
  info: "text-muted",
  warn: "text-t80",
  head: "text-ink",
  done: "text-accent",
};

const TAG: Record<string, string> = { info: "info", warn: "warn", head: "info", done: "info" };

export function RunLog() {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(LOG.length);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          let i = 0;
          const tick = () => {
            i += 1;
            setShown(i);
            if (i < LOG.length) window.setTimeout(tick, i === 1 ? 420 : 130);
          };
          tick();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="border border-rule bg-card">
      <div className="flex items-center gap-2 border-b border-rule px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="font-mono text-xs text-faint">one scheduled run, start to finish</span>
      </div>
      <div className="px-3 py-3">
        <pre className="m-0 whitespace-pre-wrap break-words font-mono text-[0.7rem] leading-[1.7] sm:text-[0.74rem]">
          {LOG.slice(0, Math.max(shown, 1)).map(([kind, text], i) => (
            <div key={i} className={`pl-[4.5ch] -indent-[4.5ch] ${COLOR[kind]}`}>
              {kind === "cmd" ? (
                <>
                  <span className="text-accent">$</span> {text}
                </>
              ) : (
                <>
                  <span className="text-faint">[{TAG[kind]}]</span> {text}
                </>
              )}
            </div>
          ))}
          {shown < LOG.length && <span className="inline-block h-3 w-[7px] translate-y-[2px] bg-accent" />}
        </pre>
      </div>
    </div>
  );
}
