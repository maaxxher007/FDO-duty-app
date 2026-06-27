# FDO Duty Allocator

Static browser-based duty allocation app for FDO rosters, random assignments, fixed duties, overrides, CSV export, and print view.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server.

## Deploy

This project is ready for Netlify or Vercel as a static site. Point the deployment root to this folder.

## How to update after changes

1. Edit the files you want to change (`index.html`, `board.js`, `board.css`).
2. Save your changes locally.
3. Open a terminal in this folder.
4. If this repo is not yet a Git repository, initialize it:
   - `git init`
   - `git add .`
   - `git commit -m "Initial version"
   - create a new GitHub repo and connect it as the `origin` remote.
5. If the repo already exists, add and commit your changes:
   - `git add .`
   - `git commit -m "Edited files for update"`
6. Push your changes to GitHub:
   - `git push origin main`
7. Vercel will detect the push and automatically redeploy the site.

If you prefer not to use a GitHub repo, you can also upload the updated files directly in the Vercel dashboard for the same effect.

## Storage

Data is stored in `localStorage` in the browser.
