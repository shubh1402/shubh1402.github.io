import Image from "next/image";
import { NetworkMonitor } from "@/components/network-monitor";
import { PredictedActual, RocCurve } from "@/components/model-plots";
import { Topology } from "@/components/topology";
import { RunLog } from "@/components/run-log";
import { CodePanel } from "@/components/code-panel";
import { GithubActivity } from "@/components/github-activity";
import { building, education, experience, featured, profile, projects, skills } from "@/lib/data";

const sections = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
];

function Rail() {
  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen lg:py-14">
      <div className="flex h-full flex-col justify-between gap-8 border-b border-rule pb-8 lg:border-b-0 lg:pb-0">
        <div>
          <a href="#top" className="block text-[1.35rem] leading-tight text-ink" style={{ fontStretch: "88%", fontWeight: 600 }}>
            {profile.name}
          </a>
          <p className="mt-1 text-sm text-muted">{profile.role}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-accent">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
            Open to work
          </p>

          <nav aria-label="Sections" className="mt-7 hidden lg:block">
            <ul className="m-0 list-none space-y-1.5 p-0">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sm text-muted transition-colors hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden space-y-1.5 text-sm lg:block">
          <a href={profile.resume} className="link-underline block text-ink" download>
            Download résumé
          </a>
          <a href={profile.github} target="_blank" rel="noopener" className="link-underline block text-muted">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener" className="link-underline block text-muted">
            LinkedIn
          </a>
        </div>
      </div>
    </aside>
  );
}

function Section({ id, title, tick, children }: { id: string; title: string; tick?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-rule pt-9">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="display m-0 text-[1.85rem] text-ink">{title}</h2>
        {tick && <span className="tick">{tick}</span>}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <div id="top" className="mx-auto grid max-w-[78rem] grid-cols-1 gap-x-14 px-6 py-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:py-0">
      <Rail />

      <main className="min-w-0 space-y-12 py-10 lg:py-14">
        <header className="grid grid-cols-1 items-center gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
          <div>
            <h1 className="display m-0 max-w-[15ch] text-[clamp(2.3rem,5.2vw,3.7rem)] text-ink">
              I automate the work people repeat every morning.
            </h1>
            <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-muted">{profile.intro}</p>
            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span>{profile.location}</span>
              <span className="text-ink">{profile.availability}</span>
              <a href={profile.resume} className="link-underline text-ink lg:hidden" download>
                Download résumé
              </a>
            </p>
          </div>

          <figure className="corner m-0 panel p-4">
            <Topology />
            <figcaption className="mt-2 text-sm leading-snug text-muted">
              Seven sites reporting into one collector every minute, coloured by how hard each link ran on 22 September.
            </figcaption>
          </figure>
        </header>

        <div>
          <NetworkMonitor />
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-faint">
            Three days of real output. Switch the day, switch to the backup link, move the threshold,
            or open a site to see its whole day.
          </p>
        </div>

        <Section id="work" title="Network Utilization Automation" tick="python · fastapi · docker">
          <p className="m-0 max-w-prose leading-relaxed text-muted">{featured.summary}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={featured.demo}
              target="_blank"
              rel="noopener"
              className="border border-accent bg-accent px-4 py-2 text-sm text-paper transition-colors hover:border-ink hover:bg-ink"
            >
              Open the live dashboard
            </a>
            <a
              href={featured.code}
              target="_blank"
              rel="noopener"
              className="border border-rule px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Read the code
            </a>
          </div>

          <dl className="mt-9 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-3">
            {featured.facts.map((f) => (
              <div key={f.label} className="border-t border-accent/35 pt-3">
                <dt className="num text-[2.6rem] leading-[1] text-accent">{f.value}</dt>
                <dd className="m-0 mt-2">
                  <span className="block text-sm text-ink">{f.label}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{f.detail}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 space-y-5">
            <RunLog />
            <CodePanel />
          </div>

          <figure className="corner m-0 mt-5 panel p-3">
            <Image
              src="/dashboard.png"
              alt="The dashboard after a run: a strip of every site's day, the pipeline stages and the report files"
              width={1500}
              height={900}
              className="h-auto w-full border border-rule"
              sizes="(max-width: 1024px) 100vw, 60rem"
            />
            <figcaption className="mt-2 text-sm leading-snug text-muted">
              The dashboard at the end of a run: every site&rsquo;s day, the seven pipeline stages with their timings,
              the accuracy checks, and the files the team receives.
            </figcaption>
          </figure>

          <figure className="m-0 mt-5 panel p-3">
            <Image
              src="/pipeline-graph.png"
              alt="Hyderabad's link utilization for the day, drawn by the pipeline, with threshold lines at 70, 80 and 90 percent"
              width={1210}
              height={374}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 60rem"
            />
            <figcaption className="mt-2 text-sm leading-snug text-muted">
              One of the seven graphs the pipeline draws into the Excel report, straight from the collected data.
            </figcaption>
          </figure>

          <p className="mt-6 max-w-prose text-sm leading-relaxed text-faint">Built with {featured.stack.join(", ")}.</p>
        </Section>

        <Section id="projects" title="Projects" tick="scikit-learn · xgboost · sql">
          <ul className="m-0 list-none space-y-0 p-0">
            {projects.map((p) => (
              <li
                key={p.name}
                className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-rule py-7 first:pt-0 sm:grid-cols-[minmax(0,1fr)_10.5rem]"
              >
                <div className="min-w-0">
                  <h3 className="m-0 text-[1.05rem] font-medium text-ink">
                    <a href={p.code} target="_blank" rel="noopener" className="link-underline">
                      {p.name}
                    </a>
                  </h3>
                  <p className="m-0 mt-2 max-w-prose text-sm leading-relaxed text-muted">{p.blurb}</p>
                  <p className="m-0 mt-3 tick">{p.stack.join(" · ")}</p>
                </div>
                <div className="sm:text-right">
                  <span className="num block text-[1.5rem] leading-none text-accent">{p.metric}</span>
                  <span className="mt-1.5 block text-sm leading-snug text-muted">{p.metricLabel}</span>
                  {p.plot === "roc" && (
                    <div className="mt-4 sm:flex sm:justify-end">
                      <RocCurve />
                    </div>
                  )}
                  {p.plot === "scatter" && (
                    <div className="mt-4 sm:flex sm:justify-end">
                      <PredictedActual />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="corner mt-7 border border-dashed border-accent/40 p-5">
            <h3 className="m-0 text-[1.05rem] font-medium text-ink">
              {building.name}
              <span className="ml-3 align-middle text-sm font-normal text-accent">building now</span>
            </h3>
            <p className="m-0 mt-2 max-w-prose text-sm leading-relaxed text-muted">{building.blurb}</p>
            <p className="m-0 mt-3 tick">{building.stack.join(" · ")}</p>
          </div>
        </Section>

        <Section id="skills" title="Skills, with the proof" tick="every item links to code">
          <p className="m-0 max-w-prose leading-relaxed text-muted">
            Every skill here links to work that shows it. If I could not link to something, I left it off.
          </p>
          <dl className="mt-7 space-y-6">
            {skills.map((group) => (
              <div key={group.group} className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-[11rem_minmax(0,1fr)]">
                <dt className="text-sm text-muted">{group.group}</dt>
                <dd className="m-0 flex flex-wrap gap-x-2 gap-y-2">
                  {group.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target={item.href.startsWith("#") ? undefined : "_blank"}
                      rel="noopener"
                      className="border border-rule bg-card px-2.5 py-1 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      {item.name}
                    </a>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="background" title="Background">
          <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-[11rem_minmax(0,1fr)]">
            <p className="fig m-0 text-sm text-muted">{experience.period}</p>
            <div className="min-w-0">
              <h3 className="m-0 text-[1.05rem] font-medium text-ink">{experience.role}</h3>
              <p className="m-0 mt-1 text-sm text-muted">
                {experience.org}, {experience.focus}
              </p>
              <ul className="m-0 mt-4 list-none space-y-3 p-0">
                {experience.points.map((point) => (
                  <li key={point} className="max-w-prose border-l border-accent/30 pl-4 text-sm leading-relaxed text-muted">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-9 space-y-6">
            {education.map((e) => (
              <div key={e.title} className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-[11rem_minmax(0,1fr)]">
                <p className="fig m-0 text-sm text-muted">{e.period}</p>
                <div className="min-w-0">
                  <h3 className="m-0 text-[1.05rem] font-medium text-ink">{e.title}</h3>
                  <p className="m-0 mt-1 text-sm text-muted">{e.org}</p>
                  <p className="m-0 mt-1 max-w-prose text-sm leading-relaxed text-faint">{e.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Get in touch">
          <p className="m-0 max-w-prose leading-relaxed text-muted">
            I am looking for AI, machine-learning and Python automation roles, and I can start immediately.
          </p>
          <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-x-8 gap-y-3 p-0 sm:grid-cols-2">
            <li>
              <a href={`mailto:${profile.email}`} className="link-underline text-ink">
                {profile.email}
              </a>
            </li>
            <li>
              <a href="tel:+919860605330" className="link-underline text-ink">
                +91 98606 05330
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener" className="link-underline text-ink">
                github.com/shubh1402
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener" className="link-underline text-ink">
                linkedin.com/in/shubhamvmgupta
              </a>
            </li>
          </ul>
          <div className="mt-7">
            <GithubActivity username={profile.githubUsername} />
          </div>
        </Section>

        <footer className="border-t border-rule pt-6 text-sm text-faint">
          <p className="m-0">
            Built with Next.js, deployed from GitHub.{" "}
            <a href="https://github.com/shubh1402/shubh1402.github.io" target="_blank" rel="noopener" className="link-underline">
              Source for this page
            </a>
            .
          </p>
        </footer>
      </main>
    </div>
  );
}
