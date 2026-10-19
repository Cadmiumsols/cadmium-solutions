# Cadmium Solutions — Website

A lightweight, responsive static website built with plain HTML, CSS and JavaScript. No build step or framework required; suitable for Netlify static hosting.

## Preview locally
Open `index.html` in a browser, or run a local static server from this directory:
- Python: `python -m http.server 8000`
- Then visit `http://localhost:8000`

## Deploy to Netlify
1. Extract the ZIP.
2. Drag the `cadmium-solutions-site` folder (or its contents) into Netlify Drop, or connect the folder to a Git repository.
3. No build command is needed. Publish directory: `.`

## Supplied brand assets
- `assets/cadmium-mark.jpg` — supplied square emblem.
- `assets/cadmium-wordmark.jpg` — supplied wordmark/typography reference.
These files are used without redrawing or altering the logo artwork.

## Add the three original creative assets
The supplied message included the brand mark and wordmark only. The three creative campaign images have not yet been added, so the site uses explicit editorial placeholders rather than fabricated or AI-recreated campaign art.

When available, add optimized images in `assets/` and replace the relevant `.asset-placeholder` contents in `index.html`:
- Lantern Ring concept → `assets/creative-01-lantern.webp`
- “This Is Not an Algorithm” chain creative → `assets/creative-02-chain.webp`
- “+300% Inbound Profile Taps” creative → `assets/creative-03-profile-taps.webp`

Use descriptive alt text and keep the performance concept clearly labeled as concept work unless the metric is supported by verified campaign data.

## Contact form
The form validates required fields and opens a pre-filled email draft addressed to `cadmiumsolutions@gmail.com`. It does not store or transmit form data to a server. For server-side submissions, connect a service such as Netlify Forms or a dedicated endpoint and update the form handler accordingly.

## Before launch
- Verify the canonical domain and social links.
- Add the three original creative assets.
- Test the email draft flow on target devices.
- If preferred, replace the Google Fonts imports with locally hosted font files.
- Run Lighthouse against the deployed URL.
