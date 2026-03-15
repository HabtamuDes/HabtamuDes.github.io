import { expect, test, type Page } from "@playwright/test";

const waitForDesktopReady = async (page: Page) => {
  await page.goto("/");
  await expect(page.locator(".boot-overlay")).toBeHidden();
  await expect(page.locator(".ubuntu-panel")).toContainText("Habtamu Workspace");
};

const dismissGuideIfVisible = async (page: Page) => {
  const guideClose = page.getByTestId("guide-close");
  if (await guideClose.isVisible()) {
    await guideClose.click();
  }
};

const closeNotesIfVisible = async (page: Page) => {
  const notesWindow = page.getByTestId("window-notes");
  if (await notesWindow.isVisible()) {
    await page.getByTestId("window-close-notes").click();
    await expect(notesWindow).toHaveCount(0);
  }
};

const openDesktopIcon = async (page: Page, id: string, isMobile: boolean) => {
  if (isMobile) {
    const icon = page.getByTestId(`dock-icon-${id}`);
    await icon.click({ force: true });
    return;
  }

  const icon = page.getByTestId(`desktop-icon-${id}`);
  await icon.dblclick();
};

test.describe("portfolio desktop shell", () => {
  test("boots and shows first-time guide", async ({ page }) => {
    await waitForDesktopReady(page);

    await expect(page.getByRole("heading", { name: "Welcome to Habtamu's workspace" })).toBeVisible();
    await expect(page.getByText("How To Explore", { exact: true })).toBeVisible();
    await expect(page.getByText("What To Open First", { exact: true })).toBeVisible();
  });

  test("opens core portfolio windows", async ({ page, isMobile }) => {
    await waitForDesktopReady(page);
    await dismissGuideIfVisible(page);
    await closeNotesIfVisible(page);

    await openDesktopIcon(page, "about", isMobile);
    const aboutWindow = page.getByTestId("window-about");
    await expect(aboutWindow).toBeVisible();
    await expect(aboutWindow.getByRole("heading", { name: "Habtamu Assegahegn" })).toBeVisible();

    await openDesktopIcon(page, "experience", isMobile);
    const experienceWindow = page.getByTestId("window-experience");
    await expect(experienceWindow).toBeVisible();
    await expect(experienceWindow.getByRole("heading", { name: "Experience" })).toBeVisible();

    await openDesktopIcon(page, "projects", isMobile);
    const projectsWindow = page.getByTestId("window-projects");
    await expect(projectsWindow).toBeVisible();
    await expect(projectsWindow.getByRole("heading", { name: "Projects" })).toBeVisible();
    await expect(projectsWindow.getByRole("heading", { name: "Smart Farming" })).toBeVisible();
  });

  test("opens apps from the launcher", async ({ page, isMobile, browserName }) => {
    test.skip(isMobile, "Launcher shortcut flow is covered on desktop.");
    test.skip(browserName !== "chromium", "Current suite uses Chromium projects only.");

    await waitForDesktopReady(page);
    await page.keyboard.press("Control+K");

    const palette = page.getByTestId("command-palette");
    await expect(palette).toBeVisible();
    await page.getByPlaceholder("Search apps, tools, projects, notes...").fill("docker");
    await palette.getByRole("button", { name: /docker/i }).first().click();

    const dockerWindow = page.getByTestId("window-docker");
    await expect(dockerWindow).toBeVisible();
    await expect(dockerWindow.getByRole("heading", { name: "Docker Desktop" })).toBeVisible();
  });

  test("opens settings and changes theme", async ({ page, isMobile }) => {
    test.skip(isMobile, "Theme switching is validated in desktop mode.");

    await waitForDesktopReady(page);
    await dismissGuideIfVisible(page);
    await openDesktopIcon(page, "settings", false);

    const settingsWindow = page.getByTestId("window-settings");
    await expect(settingsWindow).toBeVisible();
    await settingsWindow.getByTestId("theme-option-aurora").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "aurora");
  });

  test("switches desktop language", async ({ page, isMobile }) => {
    test.skip(isMobile, "Language selector is validated in desktop mode.");

    await waitForDesktopReady(page);
    await page.getByTestId("language-select").selectOption("fr");
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await expect(page.getByRole("button", { name: "Lanceur" })).toBeVisible();
  });

  test("opens apps from the files explorer", async ({ page, isMobile }) => {
    test.skip(isMobile, "Files explorer flow is covered on desktop.");

    await waitForDesktopReady(page);
    await dismissGuideIfVisible(page);
    await openDesktopIcon(page, "files", false);

    const filesWindow = page.getByTestId("window-files");
    await expect(filesWindow).toBeVisible();
    await filesWindow.getByTestId("files-section-engineering").click();
    await filesWindow.getByTestId("files-entry-docker-file").getByRole("button", { name: /open app/i }).click();

    const dockerWindow = page.getByTestId("window-docker");
    await expect(dockerWindow).toBeVisible();
    await expect(dockerWindow.getByRole("heading", { name: "Docker Desktop" })).toBeVisible();
  });

  test("opens developer tooling windows", async ({ page, isMobile }) => {
    await waitForDesktopReady(page);
    await dismissGuideIfVisible(page);
    await closeNotesIfVisible(page);

    await openDesktopIcon(page, "vscode", isMobile);
    const vscodeWindow = page.getByTestId("window-vscode");
    await expect(vscodeWindow).toBeVisible();
    await expect(vscodeWindow.getByRole("heading", { name: "Visual Studio Code" })).toBeVisible();

    await openDesktopIcon(page, "docker", isMobile);
    const dockerWindow = page.getByTestId("window-docker");
    await expect(dockerWindow).toBeVisible();
    await expect(dockerWindow.getByRole("heading", { name: "Docker Desktop" })).toBeVisible();
    await expect(dockerWindow.getByText("portfolio-web", { exact: true })).toBeVisible();
  });

  test("uses mobile-friendly shell layout", async ({ page, isMobile }, testInfo) => {
    test.skip(!isMobile, "Mobile layout assertion only.");

    await waitForDesktopReady(page);
    await expect(page.getByRole("button", { name: "Apps" })).toBeVisible();
    await expect(page.getByTestId("dock-icon-about")).toBeVisible();

    await closeNotesIfVisible(page);
    await openDesktopIcon(page, "files", true);

    const filesWindow = page.getByTestId("window-files");
    await expect(filesWindow).toBeVisible();
    await expect(filesWindow).toHaveCSS("left", "0px");
    await testInfo.attach("mobile-shell", {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
  });

  test("shows project details cleanly on mobile", async ({ page, isMobile }, testInfo) => {
    test.skip(!isMobile, "Mobile project layout assertion only.");

    await waitForDesktopReady(page);
    await dismissGuideIfVisible(page);
    await closeNotesIfVisible(page);
    await openDesktopIcon(page, "projects", true);

    const projectsWindow = page.getByTestId("window-projects");
    await expect(projectsWindow).toBeVisible();
    await expect(projectsWindow.getByRole("heading", { name: "Projects" })).toBeVisible();
    await expect(projectsWindow.getByRole("heading", { name: "Smart Farming" })).toBeVisible();
    await expect(projectsWindow.getByText("Embedded | IoT Monitoring")).toBeVisible();
    await testInfo.attach("mobile-projects", {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
  });
});
