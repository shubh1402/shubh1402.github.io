"use client";

import Link from "next/link";
import { Command } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/tech-stack", label: "Tech Stack" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-electric glow-dot" />
          SG
        </Link>

        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
          className="glass glass-hover flex items-center gap-2 rounded-md px-3 py-1.5 text-xs text-muted"
        >
          <Command size={13} />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden rounded border border-line px-1.5 py-0.5 text-[10px] sm:inline">
            ⌘K
          </kbd>
        </button>
      </nav>
    </header>
  );
}
