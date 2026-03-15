# Habtamu Portfolio

Ubuntu-style portfolio desktop for Habtamu Assegahegn, built as a static Vite app and configured for GitHub Pages.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## Local Development

```sh
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Production Build

```sh
npm run build
```

The production output is generated in `dist/`.

## GitHub Pages

This repository is intended to deploy as the GitHub Pages user site `HabtamuDes.github.io`.

Important details:

- `vite.config.ts` uses `base: "/"`, which is correct for a user Pages site
- `.github/workflows/deploy-pages.yml` builds and deploys the site with GitHub Actions
- GitHub Pages should be configured to use `GitHub Actions` as the source

## Portfolio Content

The current app contains:

- About, skills, projects, contact, and terminal windows with Habtamu's portfolio content
- Personalized desktop shell, wallpaper, and branding
- A preserved backup of the old 3D portfolio in `legacy-3d-backup/`

## Notes

- Do not serve the root `index.html` with a plain static server during development; use `npm run dev`
- For deployment, serve the built `dist/` output
