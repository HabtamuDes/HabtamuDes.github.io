// Run: npx playwright install  (first time)
// Then: npx playwright test   (run test + screenshot)
// Or:   npx playwright test --headed  (see browser)
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  use: {
    baseURL: 'http://localhost:3333',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx serve -l 3333 .',
    url: 'http://localhost:3333',
    reuseExistingServer: !process.env.CI,
  },
});
