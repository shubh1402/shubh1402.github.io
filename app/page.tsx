import { NetworkMonitor } from "@/components/network-monitor";
import { PredictedActual, RocCurve } from "@/components/model-plots";
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

function Section({
  id,
  title,
  children,
  panel = false,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  panel?: boolean;
}) {
  return (
    <section
      id={id}
      className={
        panel
          ? "scroll-mt-8 border border-rule bg-card px-6 py-9 sm:px-9"
          : "scroll-mt-8 border-t border-rule pt-10"
      }
    >
      <h2 className="display m-0 text-[1.85rem] text-ink">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <div id="top" className="mx-auto grid max-w-[78rem] grid-cols-1 gap-x-14 px-6 py-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:py-0">
      <Rail />

      <main className="min-w-0 space-y-14 py-10 lg:py-14">
        <header>
          <h1 className="display m-0 max-w-[16ch] text-[clamp(2.3rem,5.6vw,3.9rem)] text-ink">
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
        </header>

        <div>
          <NetworkMonitor />
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-faint">
            Three days of real output from the pipeline below. Switch the day, switch to the backup link,
            move the threshold, or open a site to see its whole day.
          </p>
        </div>

        <Section id="work" title="Network Utilization Automation" panel>
          <p className="m-0 max-w-prose leading-relaxed text-muted">{featured.summary}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={featured.demo}
              target="_blank"
              rel="noopener"
              className="border border-accent bg-accent px-4 py-2 text-sm text-paper transition-colors hover:bg-ink hover:border-ink"
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

          <p className="mt-7 max-w-prose text-sm leading-relaxed text-faint">
            Built with {featured.stack.join(", ")}.
          </p>
        </Section>

        <Section id="projects" title="Projects">
          <ul className="m-0 list-none space-y-0 p-0">
            {projects.map((p) => (
              <li key={p.name} className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-rule py-7 first:pt-0 sm:grid-cols-[minmax(0,1fr)_10.5rem]">
                <div className="min-w-0">
                  <h3 className="m-0 text-[1.05rem] font-medium text-ink">
                    <a href={p.code} target="_blank" rel="noopener" className="link-underline">
                      {p.name}
                    </a>
                  </h3>
                  <p className="m-0 mt-2 max-w-prose text-sm leading-relaxed text-muted">{p.blurb}</p>
                  <p className="m-0 mt-3 text-sm text-faint">{p.stack.join(", ")}</p>
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

          <div className="mt-7 border border-dashed border-rule p-5">
            <h3 className="m-0 text-[1.05rem] font-medium text-ink">
              {building.name}
              <span className="ml-3 align-middle text-sm font-normal text-muted">building now</span>
            </h3>
            <p className="m-0 mt-2 max-w-prose text-sm leading-relaxed text-muted">{building.blurb}</p>
            <p className="m-0 mt-3 text-sm text-faint">{building.stack.join(", ")}</p>
          </div>
        </Section>

        <Section id="skills" title="Skills, with the proof">
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
                  <li key={point} className="max-w-prose border-l border-rule pl-4 text-sm leading-relaxed text-muted">
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
