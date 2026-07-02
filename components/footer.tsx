import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-line px-6 py-10 font-mono text-xs text-muted">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <div className="flex gap-6">
        <a href={profile.github} target="_blank" rel="noopener" className="hover:text-ink">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener" className="hover:text-ink">
          LinkedIn
        </a>
        <a href={`mailto:${profile.email}`} className="hover:text-ink">
          Email
        </a>
      </div>
    </footer>
  );
}
