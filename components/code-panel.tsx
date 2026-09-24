import React from "react";

const SOURCE = `def find_episodes(points, threshold=70, merge_gap=5):
    """Congestion periods: minutes above the threshold, where breaches
    separated by a dip of merge_gap minutes or less count as one period."""
    episodes, current = [], None
    gap = timedelta(minutes=merge_gap + 1)

    for when, value in points:
        if value <= threshold:
            continue
        if current is not None and when - current["end"] <= gap:
            current["end"] = when
            current["minutes"] += 1
        else:
            if current is not None:
                episodes.append(current)
            current = {"start": when, "end": when, "minutes": 1}

    return episodes`;

const KEYWORDS = new Set([
  "def", "return", "for", "in", "if", "else", "elif", "is", "not", "None", "and", "or", "continue", "while", "import", "from",
]);

/** Small Python tokeniser: enough for one readable excerpt, no dependency. */
function highlight(line: string, inDoc: boolean): { nodes: React.ReactNode[]; inDoc: boolean } {
  const nodes: React.ReactNode[] = [];
  let doc = inDoc;
  let rest = line;
  let key = 0;

  const push = (text: string, cls?: string) =>
    nodes.push(cls ? <span key={key++} className={cls}>{text}</span> : <span key={key++}>{text}</span>);

  if (doc) {
    const end = rest.indexOf('"""');
    if (end === -1) {
      push(rest, "text-faint");
      return { nodes, inDoc: true };
    }
    push(rest.slice(0, end + 3), "text-faint");
    rest = rest.slice(end + 3);
    doc = false;
  }

  const pattern = /("""[\s\S]*?(?:"""|$)|"[^"]*"|\b\d+\b|\b[A-Za-z_]\w*\b|\s+|.)/g;
  for (const token of rest.match(pattern) || []) {
    if (token.startsWith('"""')) {
      push(token, "text-faint");
      if (!token.endsWith('"""') || token.length === 3) doc = true;
    } else if (token.startsWith('"')) {
      push(token, "text-t80");
    } else if (/^\d+$/.test(token)) {
      push(token, "text-accent");
    } else if (KEYWORDS.has(token)) {
      push(token, "text-[#8E4EC6]");
    } else if (/^[A-Za-z_]\w*$/.test(token)) {
      push(token, "text-ink");
    } else {
      push(token, "text-muted");
    }
  }
  return { nodes, inDoc: doc };
}

export function CodePanel() {
  const lines = SOURCE.split("\n");
  let inDoc = false;
  const rendered = lines.map((line) => {
    const r = highlight(line, inDoc);
    inDoc = r.inDoc;
    return r.nodes;
  });

  return (
    <figure className="m-0 border border-rule bg-card">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-rule px-3 py-2">
        <span className="font-mono text-xs text-faint">src/services/utilization_service.py</span>
        <a
          href="https://github.com/shubh1402/Network-utilization-automation/blob/main/src/services/utilization_service.py"
          target="_blank"
          rel="noopener"
          className="link-underline text-sm text-muted"
        >
          Open the file
        </a>
      </figcaption>
      <div className="overflow-x-auto px-3 py-3">
        <pre className="m-0 font-mono text-[0.7rem] leading-[1.7] sm:text-[0.74rem]">
          {rendered.map((nodes, i) => (
            <div key={i} className="grid grid-cols-[2ch_minmax(0,1fr)] gap-x-3">
              <span className="select-none text-right text-rule">{i + 1}</span>
              <span>{nodes}</span>
            </div>
          ))}
        </pre>
      </div>
    </figure>
  );
}
