import { expect, test, type Page } from "@playwright/test";

async function expectThemeState(
  page: Page,
  configuredTheme: "System" | "Light" | "Dark",
  renderedTheme: "light" | "dark",
) {
  await expect(
    page.getByRole("radio", { name: `${configuredTheme} theme` }),
  ).toBeChecked();

  const html = page.locator("html");
  if (renderedTheme === "dark") {
    await expect(html).toHaveClass(/\bdark\b/);
  } else {
    await expect(html).not.toHaveClass(/\bdark\b/);
  }

  await expect
    .poll(() =>
      html.evaluate((element) => getComputedStyle(element).colorScheme),
    )
    .toBe(renderedTheme);
}

test("homepage loads", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", { level: 1, name: "Kushan M Jayaweera" }),
  ).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
});

test("desktop navbar navigates to homepage sections", async ({ page }) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });

  await navigation.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(
    page.getByRole("heading", { level: 2, name: "About Me" }),
  ).toBeVisible();

  await navigation.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(
    page.getByRole("heading", { level: 2, name: "Featured Projects" }),
  ).toBeVisible();
});

test("mobile navigation opens, navigates, and closes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page
    .getByRole("button", { name: "Open navigation menu" })
    .press("Enter");

  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();

  const navigation = dialog.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await navigation.getByRole("link", { name: "Contact" }).click();

  await expect(page).toHaveURL(/\/#contact$/);
  await expect(dialog).toBeHidden();
  await expect(
    page.getByRole("heading", { level: 2, name: "Let’s Connect" }),
  ).toBeVisible();
});

test("system theme follows a dark system preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expectThemeState(page, "System", "dark");
});

test("light theme overrides a dark system preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.getByRole("radio", { name: "Light theme" }).press("Space");

  await expectThemeState(page, "Light", "light");
});

test("dark theme overrides a light system preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.getByRole("radio", { name: "Dark theme" }).press("Space");

  await expectThemeState(page, "Dark", "dark");
});

test("system theme responds when the system preference changes", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expectThemeState(page, "System", "dark");

  await page.emulateMedia({ colorScheme: "light" });

  await expectThemeState(page, "System", "light");
});

test("projects page displays project data and actions", async ({ page }) => {
  await page.goto("/projects");

  await expect(
    page.getByRole("heading", { level: 1, name: "All Projects" }),
  ).toBeVisible();

  const project = page.getByRole("article", {
    name: "Student Management System",
  });
  await expect(project).toBeVisible();
  await expect(project.getByRole("link", { name: "Case Study" })).toBeVisible();
  await expect(
    project.getByRole("link", {
      name: "Student Management System on GitHub (opens in a new tab)",
    }),
  ).toHaveAttribute(
    "href",
    "https://github.com/Kushan2001/StudentManagementSystem",
  );
});

test("project filters update the selected category", async ({ page }) => {
  await page.goto("/projects");

  const filters = page.getByRole("navigation", {
    name: "Filter projects by category",
  });
  await filters.getByRole("link", { name: "Software" }).click();

  await expect(page).toHaveURL(/\/projects\?category=software-development$/);
  await expect(
    filters.getByRole("link", { name: "Software" }),
  ).toHaveAttribute("aria-current", "page");
  await expect(
    page.getByRole("article", { name: "Student Management System" }),
  ).toBeVisible();

  await filters.getByRole("link", { name: "All" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(filters.getByRole("link", { name: "All" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("project case-study route displays the available project details", async ({
  page,
}) => {
  await page.goto("/projects/student-management-system");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Student Management System",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Features" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Technologies" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "All Projects" })).toHaveAttribute(
    "href",
    "/projects",
  );
});

test("invalid project routes return the not-found page", async ({ page }) => {
  const response = await page.goto("/projects/not-a-real-project");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "404" })).toBeVisible();
});

test("contact section exposes the real contact links", async ({ page }) => {
  await page.goto("/#contact");

  const contact = page.getByRole("region", { name: "Let’s Connect" });
  await expect(
    contact.getByRole("link", { name: "malidukushan0421@gmail.com" }),
  ).toHaveAttribute("href", "mailto:malidukushan0421@gmail.com");
  await expect(
    contact.getByRole("link", { name: "Contact Me" }),
  ).toHaveAttribute("href", "mailto:malidukushan0421@gmail.com");
  await expect(
    contact.getByRole("link", {
      name: "GitHub profile (opens in a new tab)",
    }),
  ).toHaveAttribute("href", "https://github.com/Kushan2001");
  await expect(
    contact.getByRole("link", {
      name: "LinkedIn profile (opens in a new tab)",
    }),
  ).toHaveAttribute(
    "href",
    "http://www.linkedin.com/in/kushan-m-jayaweera-7163562b1",
  );
});
