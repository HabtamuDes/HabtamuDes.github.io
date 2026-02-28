// View the portfolio in Playwright:
//   npx playwright test --headed
// Take a full-page screenshot:
//   npx playwright test
// Screenshots save to test-results/
const { test, expect } = require('@playwright/test');

test('portfolio loads and looks correct', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1.hero-name')).toHaveText('Habtamu Assegahegn');
  await expect(page.locator('nav a[href="#about"]')).toBeVisible();
});

test('take full-page screenshot of portfolio', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({
    path: 'test-results/portfolio-full.png',
    fullPage: true,
  });
});
