import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { techStack } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tech Stack — Shubham Gupta",
};

export default function TechStackPage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-electric">
          <span className="h-1.5 w-1.5 rounded-full bg-electric glow-dot" />
          Tech Stack
        </div>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
          Tools I actually use.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Grouped by where each tool sits in the pipeline — not a wall of logos.
        </p>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group) => (
            <div key={group.group} className="glass rounded-lg p-6">
              <h2 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-electric">
                {group.group}
              </h2>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-line px-2.5 py-1 text-sm text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
