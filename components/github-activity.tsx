"use client";

import { useEffect, useState } from "react";

type Repo = { name: string; html_url: string; description: string | null; pushed_at: string; language: string | null };

function ago(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  return months === 1 ? "last month" : `${months} months ago`;
}

export function GithubActivity({ username }: { username: string }) {
  const [repo, setRepo] = useState<Repo | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=1`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((rows: Repo[]) => live && rows.length && setRepo(rows[0]))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [username]);

  if (failed || !repo) return null;

  return (
    <p className="m-0 text-sm text-muted">
      Last push{" "}
      <a href={repo.html_url} target="_blank" rel="noopener" className="link-underline text-ink">
        {repo.name}
      </a>
      , {ago(repo.pushed_at)}.
    </p>
  );
}
