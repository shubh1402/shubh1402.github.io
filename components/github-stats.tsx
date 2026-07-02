"use client";

import { useEffect, useState } from "react";

type Stats = {
  repos: number | string;
  followers: number | string;
  stars: number | string;
  since: number | string;
};

export function GithubStats({ username }: { username: string }) {
  const [stats, setStats] = useState<Stats>({
    repos: "—",
    followers: "—",
    stars: "—",
    since: "—",
  });
  const [note, setNote] = useState("fetching live telemetry…");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("rate-limited-or-error");
        const user = await userRes.json();

        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        let totalStars = 0;
        if (reposRes.ok) {
          const repos = await reposRes.json();
          if (Array.isArray(repos)) {
            totalStars = repos.reduce(
              (sum: number, r: { stargazers_count?: number }) =>
                sum + (r.stargazers_count || 0),
              0
            );
          }
        }

        if (cancelled) return;
        setStats({
          repos: user.public_repos ?? "—",
          followers: user.followers ?? "—",
          stars: totalStars,
          since: new Date(user.created_at).getFullYear(),
        });
        setNote(`live · github.com/${username} · synced ${new Date().toLocaleTimeString()}`);
      } catch {
        if (cancelled) return;
        setNote(
          "GitHub API rate limit reached from this browser — refresh in a bit, or view the profile directly."
        );
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const items = [
    { label: "Public Repos", value: stats.repos },
    { label: "Total Stars", value: stats.stars },
    { label: "Followers", value: stats.followers },
    { label: "Building Since", value: stats.since },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="glass !border-0 !rounded-none px-5 py-6">
            <div className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
              <span className="h-1 w-1 rounded-full bg-electric glow-dot" />
              {item.label}
            </div>
            <div className="font-mono text-2xl font-semibold text-ink tabular-nums">
              {item.value}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-muted">{note}</p>
    </div>
  );
}
