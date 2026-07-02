import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ProjectCard({
  name,
  desc,
  url,
}: {
  name: string;
  desc: string;
  url: string;
}) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener"
      className="glass glass-hover group flex flex-col gap-2 rounded-lg p-5"
    >
      <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-electric">
        <span className="h-1 w-1 rounded-full bg-electric glow-dot" />
        Built
      </div>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-ink">{name}</h3>
        <ArrowUpRight
          size={15}
          className="mt-1 shrink-0 text-muted transition-colors group-hover:text-electric"
        />
      </div>
      <p className="text-sm leading-relaxed text-muted">{desc}</p>
    </Link>
  );
}
