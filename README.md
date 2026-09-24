# shubh1402.github.io

Personal site for Shubham Gupta — AI / ML engineer.

Built with Next.js (static export), Tailwind, and self-hosted IBM Plex.
Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Where the content lives

All copy, projects, skills and links are in `lib/data.ts`. Editing that file is
enough for most updates — no component changes needed.

Each skill in `lib/data.ts` carries a link to work that demonstrates it. If a
skill has nothing to link to, it does not belong on the page.

## The utilization strip

The interactive strip on the homepage is real output from
[Network Utilization Automation](https://github.com/shubh1402/Network-utilization-automation):
one day of per-minute link data for seven sites, exported to
`lib/utilization-day.json`. Moving the threshold recomputes the minutes above it
in the browser from that per-minute data.

To refresh it, run the export from that project and replace the JSON file.

## Résumé

`public/Shubham_Gupta_Resume.pdf` is served at `/Shubham_Gupta_Resume.pdf`.
Replace that file to publish a new version.
