"use client";

import { useEffect, useState } from "react";

type Repo = { name: string; html_url: string; pushed_at: string };
type Run = { conclusion: string | null; html_url: string };
const CI_REPO = "Network-utilization-automation";

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
  const [ci, setCi] = useState<Run | null>(null);

  useEffect(() => {
    let live = true;
    const ok = (r: Response) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status))));

    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=1`)
      .then(ok)
      .then((rows: Repo[]) => live && rows.length && setRepo(rows[0]))
      .catch(() => undefined);

    fetch(`https://api.github.com/repos/${username}/${CI_REPO}/actions/runs?per_page=1&status=completed`)
      .then(ok)
      .then((d: { workflow_runs?: Run[] }) => live && d.workflow_runs?.length && setCi(d.workflow_runs[0]))
      .catch(() => undefined);

    return () => {
      live = false;
    };
  }, [username]);

  if (!repo && !ci) return null;

  return (
    <p className="m-0 text-sm text-muted">
      {repo && (
        <>
          Last push{" "}
          <a href={repo.html_url} target="_blank" rel="noopener" className="link-underline text-ink">
            {repo.name}
          </a>
          , {ago(repo.pushed_at)}.
        </>
      )}
      {ci?.conclusion === "success" && (
        <>
          {" "}
          <a href={ci.html_url} target="_blank" rel="noopener" className="link-underline text-ink">
            Tests passing
          </a>{" "}
          on the monitoring pipeline.
        </>
      )}
    </p>
  );
}
