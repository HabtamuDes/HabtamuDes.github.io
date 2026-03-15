const { test, expect } = require('@playwright/test');

async function waitForDesktop(page) {
  await page.goto('/');
  await page.waitForTimeout(3500);
  await expect(page.locator('#loading')).toHaveClass(/hidden/);
  await expect(page.locator('canvas')).toBeVisible();
}

async function openDesktopWindow(page) {
  for (let y = 180; y <= 560; y += 20) {
    for (let x = 480; x <= 980; x += 20) {
      await page.mouse.click(x, y);
      await page.waitForTimeout(40);
      const activeCount = await page.locator('.ubuntu-window.active').count();
      if (activeCount > 0) {
        return;
      }
    }
  }

  throw new Error('Could not open any desktop window from the monitor region.');
}

test('3D desktop loads and opens a portfolio window', async ({ page }) => {
  await waitForDesktop(page);
  await openDesktopWindow(page);
  await expect(page.locator('.ubuntu-window.active')).toHaveCount(1);
});

test('take full-page screenshot of 3D desktop portfolio', async ({ page }) => {
  await waitForDesktop(page);
  await page.screenshot({
    path: 'test-results/portfolio-full.png',
    fullPage: true,
  });
});
