# Extracted Portfolio Site

This folder was organized from the supplied page-source dump.

## Important limitation

The supplied dump contains the HTML shell and a reference to the site's compiled React/JavaScript bundle, but **does not contain the bundle itself**. The original page loads:

`https://dev-portfolio-1866.preview.emergentagent.com/static/js/bundle.js`

Because the application is mounted into `<div id="root"></div>`, the actual React components and interactions live in that bundle. They cannot be reconstructed exactly from the empty HTML root alone.

## What is included

- `public/index.html` — cleaned page shell with Emergent/Cloudflare instrumentation removed.
- `src/extracted-index.html` — same cleaned extracted HTML for reference.
- `package.json` + `vite.config.js` — minimal Vite setup.
- `scripts/fetch-bundle.js` — attempts to fetch the original compiled bundle into `public/static/js/bundle.js`.
- The original uploaded dump is kept separately by ChatGPT and was used as the extraction source.

## Run

1. Install Node.js.
2. Run `npm install`.
3. Run `npm run fetch-bundle` while the preview URL is accessible.
4. Run `npm run dev`.

If the preview bundle is no longer publicly accessible, the exact React source cannot be recovered from this HTML dump alone. In that case, provide the site's downloaded `bundle.js` (and any `.map` source map if present), and the project can be split into real React components.

## Third-party/instrumentation code

The extraction intentionally leaves out the Emergent preview recorder, error overlay, and Cloudflare beacon because they are deployment/instrumentation code rather than the portfolio application's source.
