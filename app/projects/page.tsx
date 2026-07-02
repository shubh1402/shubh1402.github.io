import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { featuredCaseStudy, aiWorkProjects, roadmapProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects — Shubham Gupta",
  description: "Real, shipped projects: network automation and AI/ML case studies.",
};

const domains = Array.from(new Set(aiWorkProjects.map((p) => p.domain)));

export default function ProjectsPage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-electric">
          <span className="h-1.5 w-1.5 rounded-full bg-electric glow-dot" />
          Projects
        </div>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
          What I&rsquo;ve actually shipped.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Two real bodies of work: a production network automation system, and a
          growing ML/analytics portfolio. Everything links to real code.
        </p>
      </header>

      {/* Featured case study */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="glass overflow-hidden rounded-xl">
          <div className="border-b border-line p-8">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-electric">
              {featuredCaseStudy.tag}
            </div>
            <h2 className="text-2xl font-semibold text-ink">{featuredCaseStudy.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {featuredCaseStudy.description}
            </p>
            <a
              href={featuredCaseStudy.github}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-electric hover:text-electric"
            >
              View source →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
            {featuredCaseStudy.flow.map((f, i) => (
              <div key={f.step} className="glass !rounded-none !border-0 p-5">
                <div className="mb-2 font-mono text-[10px] text-electric">
                  0{i + 1} · {f.step.toUpperCase()}
                </div>
                <div className="mb-1 text-sm font-medium text-ink">{f.title}</div>
                <div className="text-xs leading-relaxed text-muted">{f.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 p-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                Sites covered
              </h3>
              <div className="flex flex-wrap gap-2">
                {featuredCaseStudy.sites.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {featuredCaseStudy.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-line px-2.5 py-1 font-mono text-[11px] text-electric"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Work portfolio */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-semibold text-ink">
            AI Engineering Portfolio — Scaler Program
          </h2>
          <span className="font-mono text-xs text-muted">github.com/shubh1402/Ai-Work</span>
        </div>

        {domains.map((domain) => (
          <div key={domain} className="mb-10">
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-electric">
              {domain}
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {aiWorkProjects
                .filter((p) => p.domain === domain)
                .map((p) => (
                  <ProjectCard key={p.name} name={p.name} desc={p.desc} url={p.url} />
                ))}
            </div>
          </div>
        ))}

        <div>
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-muted">
            Expanding next
          </h3>
          <div className="flex flex-wrap gap-2">
            {roadmapProjects.map((r) => (
              <span
                key={r}
                className="rounded border border-dashed border-line px-3 py-2 font-mono text-xs text-muted"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
