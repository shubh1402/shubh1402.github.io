"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const commands = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Tech Stack", href: "/tech-stack" },
  { label: "Contact", href: "/contact" },
  { label: "GitHub Profile", href: "https://github.com/shubh1402/", external: true },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    function onCustomOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onCustomOpen);
    };
  }, []);

  if (!open) return null;

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  function go(cmd: (typeof commands)[number]) {
    setOpen(false);
    setQuery("");
    if (cmd.external) {
      window.open(cmd.href, "_blank", "noopener");
    } else {
      router.push(cmd.href);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="glass w-full max-w-lg overflow-hidden rounded-lg shadow-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <Search size={16} className="text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a page…"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px] text-muted">
            ESC
          </kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted">No results.</li>
          )}
          {filtered.map((c) => (
            <li key={c.href}>
              <button
                onClick={() => go(c)}
                className="flex w-full items-center px-4 py-2.5 text-left text-sm text-ink transition-colors hover:bg-electric-soft"
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
