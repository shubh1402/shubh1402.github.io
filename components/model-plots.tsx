import results from "@/lib/model-results.json";

const TEAL = "#0E5C52";
const RULE = "#E2E6E0";

/** ROC curve from the attrition model, as produced by its own pipeline. */
export function RocCurve() {
  const S = 132;
  const pad = 8;
  const inner = S - pad * 2;
  const pts = (results.attrition.roc as number[][])
    .map(([f, t]) => `${(pad + f * inner).toFixed(1)},${(S - pad - t * inner).toFixed(1)}`)
    .join(" ");

  return (
    <figure className="m-0 w-[8.25rem] max-w-full text-left">
      <svg viewBox={`0 0 ${S} ${S}`} className="w-full" role="img" aria-label={`ROC curve, area under curve ${results.attrition.auc}`}>
        <rect x={pad} y={pad} width={inner} height={inner} fill="none" stroke={RULE} />
        <line x1={pad} y1={S - pad} x2={S - pad} y2={pad} stroke={RULE} strokeDasharray="3 3" />
        <polyline points={pts} fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
      <figcaption className="mt-1.5 text-sm leading-snug text-muted">
        True positives against false positives.
      </figcaption>
    </figure>
  );
}

/** Predicted against actual admission chance, held-out applicants. */
export function PredictedActual() {
  const S = 132;
  const pad = 8;
  const inner = S - pad * 2;
  const pts = results.admission.points as number[][];
  const all = pts.flat();
  const lo = Math.min(...all);
  const hi = Math.max(...all);
  const pos = (v: number) => ((v - lo) / (hi - lo)) * inner;

  return (
    <figure className="m-0 w-[8.25rem] max-w-full text-left">
      <svg viewBox={`0 0 ${S} ${S}`} className="w-full" role="img" aria-label={`Predicted against actual values, R squared ${results.admission.r2}`}>
        <rect x={pad} y={pad} width={inner} height={inner} fill="none" stroke={RULE} />
        <line x1={pad} y1={S - pad} x2={S - pad} y2={pad} stroke={RULE} strokeDasharray="3 3" />
        {pts.map(([actual, predicted], i) => (
          <circle key={i} cx={pad + pos(actual)} cy={S - pad - pos(predicted)} r="1.7" fill={TEAL} fillOpacity="0.45" />
        ))}
      </svg>
      <figcaption className="mt-1.5 text-sm leading-snug text-muted">
        Predicted against actual. The dashes are a perfect call.
      </figcaption>
    </figure>
  );
}
