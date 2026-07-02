import type { Metadata } from "next";
import { Mail, Github, Linkedin, FileText } from "lucide-react";
import { Footer } from "@/components/footer";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — Shubham Gupta",
};

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "GitHub", value: "github.com/shubh1402", href: profile.github, icon: Github },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/shubhamvmgupta",
    href: profile.linkedin,
    icon: Linkedin,
  },
  { label: "Resume", value: "Download PDF", href: "#", icon: FileText },
];

export default function ContactPage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-electric">
          <span className="h-1.5 w-1.5 rounded-full bg-electric glow-dot" />
          Contact
        </div>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
          Let&rsquo;s build something.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Open to AI engineering roles, collaborations, and interesting problems.
        </p>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {links.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener"
              className="glass glass-hover flex items-center gap-4 rounded-lg p-6"
            >
              <div className="glass flex h-10 w-10 items-center justify-center rounded-md">
                <Icon size={17} className="text-electric" />
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {label}
                </div>
                <div className="text-sm text-ink">{value}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
