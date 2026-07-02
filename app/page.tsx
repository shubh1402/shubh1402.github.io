import { Hero } from "@/components/hero";
import { GithubStats } from "@/components/github-stats";
import { Footer } from "@/components/footer";
import { profile, experience } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <GithubStats username={profile.githubUsername} />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-wider text-muted">
          Experience
        </h2>
        <div className="flex flex-col gap-4">
          {experience.map((exp) => (
            <div key={exp.role} className="glass rounded-lg p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-medium text-ink">{exp.role}</h3>
                <span className="font-mono text-xs text-muted">{exp.period}</span>
              </div>
              <p className="mt-1 text-sm text-electric">{exp.org}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {exp.points.map((p) => (
                  <li key={p} className="flex gap-2 text-sm leading-relaxed text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-electric" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
