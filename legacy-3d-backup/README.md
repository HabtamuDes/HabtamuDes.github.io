# Habtamu Assegahegn — Portfolio

Personal portfolio site (single-page, dark theme) hosted on GitHub Pages.

## Stack

- Static HTML/CSS/JS (no jQuery)
- [Font Awesome 6](https://fontawesome.com/) for icons
- [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts)

## Run locally

```bash
npm install
npm start
# Open http://localhost:3333
```

Or open `index.html` directly in a browser.

## View in Playwright

To open the site in a browser and take screenshots:

```bash
npm install
npx playwright install
npm run test:headed
```

To capture a full-page screenshot:

```bash
npm test
# Screenshot saved to test-results/portfolio-full.png
```

## Deploy

Push to the `main` branch of your `HabtamuDes.github.io` repo. GitHub Pages will serve the site automatically.
