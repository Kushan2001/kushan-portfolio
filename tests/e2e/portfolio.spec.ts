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

test("hero remains within the viewport at supported widths", async ({
  page,
}) => {
  const viewportWidths = [
    320, 375, 430, 640, 768, 1024, 1280, 1440, 1920,
  ];

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: viewportWidths[0], height: 1000 });
  await page.goto("/");

  const card = page.getByRole("complementary", { name: "Current focus" });
  const hero = page.getByRole("region", { name: "Kushan M Jayaweera" });
  const name = page.getByRole("heading", {
    level: 1,
    name: "Kushan M Jayaweera",
  });

  for (const width of viewportWidths) {
    await page.setViewportSize({ width, height: 1000 });
    await expect(card).toBeVisible();
    await expect(name).toBeVisible();
    await expect(
      hero.getByRole("link", { name: "View Projects" }),
    ).toBeVisible();
    await expect(hero.getByRole("link", { name: "Contact Me" })).toBeVisible();

    const layout = await page.evaluate(() => {
      const focusCard = document.querySelector<HTMLElement>(
        'aside[aria-label="Current focus"]',
      );
      const bounds = focusCard?.getBoundingClientRect();
      const nameBounds = document
        .querySelector<HTMLElement>("#hero-title")
        ?.getBoundingClientRect();

      return {
        cardLeft: bounds?.left ?? -1,
        cardRight: bounds?.right ?? -1,
        cardWidth: bounds?.width ?? 0,
        cardOpacity: focusCard ? getComputedStyle(focusCard).opacity : "0",
        cardTransform: focusCard
          ? getComputedStyle(focusCard).transform
          : "none",
        documentWidth: document.documentElement.scrollWidth,
        nameLeft: nameBounds?.left ?? -1,
        nameRight: nameBounds?.right ?? -1,
        viewportWidth: document.documentElement.clientWidth,
      };
    });

    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
    expect(layout.cardLeft).toBeGreaterThanOrEqual(0);
    expect(layout.cardRight).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.cardOpacity).toBe("1");
    expect(layout.cardTransform).toBe("none");
    expect(layout.nameLeft).toBeGreaterThanOrEqual(0);
    expect(layout.nameRight).toBeLessThanOrEqual(layout.viewportWidth + 1);

    if (width >= 1280) {
      expect(layout.cardWidth).toBeGreaterThanOrEqual(420);
      expect(layout.cardWidth).toBeLessThanOrEqual(480);
    }
  }
});

test("desktop navbar navigates to homepage sections", async ({ page }) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });

  const aboutLink = navigation.getByRole("link", { name: "About" });
  await aboutLink.click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(aboutLink).toHaveAttribute("aria-current", "location");
  await expect(
    page.getByRole("heading", { level: 2, name: "About Me" }),
  ).toBeVisible();

  await navigation.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(
    page.getByRole("heading", { level: 2, name: "Featured Projects" }),
  ).toBeVisible();
});

test("navbar remains responsive across desktop breakpoints", async ({ page }) => {
  const viewportWidths = [1024, 1280, 1440, 1600, 1920];

  await page.goto("/");

  for (const width of viewportWidths) {
    await page.setViewportSize({ width, height: 900 });

    const navigation = page.getByRole("navigation", {
      name: "Primary navigation",
    });
    const menuButton = page.getByRole("button", {
      name: "Open navigation menu",
    });

    if (width >= 1280) {
      await expect(navigation).toBeVisible();
      await expect(
        page.getByRole("banner").getByRole("link", {
          name: "GitHub profile (opens in a new tab)",
        }),
      ).toBeVisible();
      await expect(menuButton).toBeHidden();
    } else {
      await expect(navigation).toBeHidden();
      await expect(menuButton).toBeVisible();
    }

    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));

    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth,
    );
  }
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

test("featured project remains responsive across supported widths", async ({
  page,
}) => {
  const viewportWidths = [
    320, 375, 430, 640, 768, 1024, 1280, 1440, 1920,
  ];

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const section = page.getByRole("region", { name: "Featured Projects" });
  const project = section.getByRole("article", {
    name: "Student Management System",
  });
  const viewAll = section.getByRole("link", { name: "View all projects" });
  const caseStudy = project.getByRole("link", { name: "Case Study" });
  const github = project.getByRole("link", {
    name: "Student Management System on GitHub (opens in a new tab)",
  });

  for (const width of viewportWidths) {
    await page.setViewportSize({ width, height: 900 });
    await project.scrollIntoViewIfNeeded();

    await expect(viewAll).toBeVisible();
    await expect(caseStudy).toBeVisible();
    await expect(github).toBeVisible();

    const [cardBounds, viewAllBounds, caseStudyBounds, githubBounds] =
      await Promise.all([
        project.boundingBox(),
        viewAll.boundingBox(),
        caseStudy.boundingBox(),
        github.boundingBox(),
      ]);
    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));

    expect(cardBounds).not.toBeNull();
    expect(viewAllBounds).not.toBeNull();
    expect(caseStudyBounds).not.toBeNull();
    expect(githubBounds).not.toBeNull();
    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth,
    );
    expect(cardBounds!.x).toBeGreaterThanOrEqual(0);
    expect(cardBounds!.x + cardBounds!.width).toBeLessThanOrEqual(
      dimensions.viewportWidth + 1,
    );

    if (width < 640) {
      expect(githubBounds!.y).toBeGreaterThanOrEqual(
        caseStudyBounds!.y + caseStudyBounds!.height,
      );
    }

    if (width >= 1024) {
      expect(cardBounds!.width).toBeLessThanOrEqual(768);
    }
  }
});

test("DevOps roadmap remains factual and responsive", async ({ page }) => {
  const viewportWidths = [
    320, 375, 430, 640, 768, 1024, 1280, 1440, 1920,
  ];

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: viewportWidths[0], height: 1000 });
  await page.goto("/");

  const section = page
    .getByRole("region", { name: "DevOps Journey" })
    .filter({
      has: page.getByRole("list", { name: "DevOps roadmap summary" }),
    });
  const completed = section.getByRole("article", {
    name: "Foundation built",
  });
  const learning = section.getByRole("article", { name: "Current focus" });
  const planned = section.getByRole("article", {
    name: "Next on the roadmap",
  });
  const summary = section.getByRole("list", {
    name: "DevOps roadmap summary",
  });

  await expect(summary).toContainText("4 Completed");
  await expect(summary).toContainText("1 Learning");
  await expect(summary).toContainText("4 Planned");
  await expect(completed).toContainText("Linux fundamentals");
  await expect(completed).toContainText("Git");
  await expect(completed).toContainText("GitHub");
  await expect(completed).toContainText("Bash basics");
  await expect(learning).toContainText("Docker");
  await expect(planned).toContainText("CI/CD");
  await expect(planned).toContainText("AWS");
  await expect(planned).toContainText("Terraform");
  await expect(planned).toContainText("Kubernetes");

  for (const width of viewportWidths) {
    await page.setViewportSize({ width, height: 1000 });
    await section.scrollIntoViewIfNeeded();

    const cards = await Promise.all([
      completed.boundingBox(),
      learning.boundingBox(),
      planned.boundingBox(),
    ]);
    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));

    expect(cards.every(Boolean)).toBe(true);
    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth,
    );

    for (const card of cards) {
      expect(card!.x).toBeGreaterThanOrEqual(0);
      expect(card!.x + card!.width).toBeLessThanOrEqual(
        dimensions.viewportWidth + 1,
      );
    }

    if (width >= 1280) {
      expect(Math.max(...cards.map((card) => card!.y))).toBeLessThanOrEqual(
        Math.min(...cards.map((card) => card!.y)) + 2,
      );
    } else {
      expect(cards[1]!.y).toBeGreaterThan(cards[0]!.y + cards[0]!.height);
      expect(cards[2]!.y).toBeGreaterThan(cards[1]!.y + cards[1]!.height);
    }
  }
});

test("Education remains factual and responsive", async ({ page }) => {
  const viewportWidths = [
    320, 375, 430, 640, 768, 1024, 1280, 1440, 1920,
  ];

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: viewportWidths[0], height: 1000 });
  await page.goto("/");

  const section = page.getByRole("region", { name: "Academic Background" });
  const summary = section.getByRole("complementary", {
    name: "Academic summary",
  });
  const degree = section.getByRole("article", {
    name: "Bachelor of Information and Communication Technology (Honours)",
  });
  const degreeTitle = degree.getByRole("heading", {
    level: 3,
    name: "Bachelor of Information and Communication Technology (Honours)",
  });

  await expect(degree).toContainText("BICT (Hons)");
  await expect(degree).toContainText("South Eastern University of Sri Lanka");
  await expect(degree).toContainText("Software Technology");
  await expect(degree).toContainText(
    "Department of Information and Communication Technology",
  );
  await expect(degree).toContainText("Faculty of Technology");
  await expect(degree).toContainText("In Progress");
  await expect(
    section.getByRole("list", { name: "Academic highlights" }),
  ).toBeVisible();

  for (const width of viewportWidths) {
    await page.setViewportSize({ width, height: 1000 });
    await section.scrollIntoViewIfNeeded();

    const [summaryBox, degreeBox, titleBox] = await Promise.all([
      summary.boundingBox(),
      degree.boundingBox(),
      degreeTitle.boundingBox(),
    ]);
    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));

    expect(summaryBox).not.toBeNull();
    expect(degreeBox).not.toBeNull();
    expect(titleBox).not.toBeNull();
    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth,
    );

    for (const bounds of [summaryBox!, degreeBox!, titleBox!]) {
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(
        dimensions.viewportWidth + 1,
      );
    }

    if (width >= 1024) {
      expect(summaryBox!.x).toBeLessThan(degreeBox!.x);
      expect(Math.abs(summaryBox!.y - degreeBox!.y)).toBeLessThanOrEqual(2);
    } else {
      expect(degreeBox!.y).toBeGreaterThan(
        summaryBox!.y + summaryBox!.height,
      );
    }
  }
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

test("footer exposes profile links and remains responsive", async ({ page }) => {
  const viewportWidths = [320, 375, 430, 768, 1280, 1920];

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: viewportWidths[0], height: 900 });
  await page.goto("/");

  const footer = page.getByRole("contentinfo");
  const footerLinks = footer.getByRole("navigation", {
    name: "Footer contact links",
  });

  await expect(footer).toContainText("Kushan M Jayaweera");
  await expect(footer).toContainText("Software Developer");
  await expect(footer).toContainText("DevOps Learner");
  await expect(footer).toContainText("All rights reserved.");
  await expect(footer).toContainText(
    "Built with Next.js • TypeScript • Tailwind CSS",
  );
  await expect(footerLinks.getByRole("link", { name: "Email" })).toHaveAttribute(
    "href",
    "mailto:malidukushan0421@gmail.com",
  );
  await expect(
    footerLinks.getByRole("link", {
      name: "GitHub profile (opens in a new tab)",
    }),
  ).toHaveAttribute("href", "https://github.com/Kushan2001");
  await expect(
    footerLinks.getByRole("link", {
      name: "LinkedIn profile (opens in a new tab)",
    }),
  ).toHaveAttribute(
    "href",
    "http://www.linkedin.com/in/kushan-m-jayaweera-7163562b1",
  );

  for (const width of viewportWidths) {
    await page.setViewportSize({ width, height: 900 });
    await footer.scrollIntoViewIfNeeded();

    const [footerBounds, linksBounds] = await Promise.all([
      footer.boundingBox(),
      footerLinks.boundingBox(),
    ]);
    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));

    expect(footerBounds).not.toBeNull();
    expect(linksBounds).not.toBeNull();
    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth,
    );
    expect(footerBounds!.x).toBeGreaterThanOrEqual(0);
    expect(footerBounds!.x + footerBounds!.width).toBeLessThanOrEqual(
      dimensions.viewportWidth + 1,
    );
    expect(linksBounds!.x).toBeGreaterThanOrEqual(0);
    expect(linksBounds!.x + linksBounds!.width).toBeLessThanOrEqual(
      dimensions.viewportWidth + 1,
    );
  }
});
