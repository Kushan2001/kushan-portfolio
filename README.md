# Kushan M Jayaweera — Portfolio

A personal portfolio for Kushan M Jayaweera, an ICT undergraduate focused on software development and learning DevOps. The site presents verified profile information, education, a DevOps learning roadmap, projects, and contact links. Portfolio content lives in typed data files rather than in page components.

## Features

- Responsive homepage with a hero, featured projects, About, DevOps Journey, Education, Contact, and footer.
- All-projects page at `/projects`, with category filters shown only for categories that contain projects.
- Generated case-study pages at `/projects/[slug]`. Optional case-study sections and images appear only when their project data exists; unknown slugs return a 404.
- System, light, and dark themes, plus desktop navigation and an accessible mobile menu.
- Email and social contact links, with a copy-email button and status feedback.
- Optional Skills and Certifications sections. Both are currently hidden because their data files are empty.
- A configurable CV download link, currently hidden because `cvAvailable` is `false`. No PDF is included yet.

The current project data includes the **Student Management System**, marked as in progress. The site does not display invented skills, certifications, employment, or project details.

## Technology stack

| Area | Technology |
| --- | --- |
| Application | Next.js 16 App Router, React 19, TypeScript |
| Styling and UI | Tailwind CSS 4, local shadcn-style UI components, Base UI, Lucide icons |
| Themes and motion | `next-themes`, Motion, CSS transitions |
| Testing | Vitest, Playwright (Chromium) |
| CI | GitHub Actions |

## Screenshots

No portfolio UI screenshots are committed yet. Add real captures here when available; this README intentionally has no broken or placeholder image links. The existing profile portrait is stored in `public/images/profile/`, while project images can be added under `public/projects/` and referenced from project data.

## Project architecture

Next.js App Router pages compose the portfolio from reusable components. Content is kept in `data/` and checked against interfaces in `types/`; `lib/` holds pure helpers for project lookup/filtering, DevOps grouping, content guards, themes, and SEO. Pages and data-driven sections use Server Components by default. Client Components are limited to browser interactions such as the mobile menu, theme selector, copy-email button, and motion-enhanced presentation.

### Folder structure

```text
app/                     Home, projects, case-study routes, layout, metadata routes
components/
  layout/                Navbar, footer, container, section
  projects/              Project cards, filters, case-study presentation
  sections/              Homepage sections
  seo/                   JSON-LD rendering
  theme/                 Theme provider and selector
  ui/                    Reusable UI components
data/                    Profile, projects, milestones, education, optional content
lib/                     Data, theme, and SEO helpers
types/                   Portfolio TypeScript models
public/
  images/profile/        Profile portrait
  projects/              Future project images
  cv/                    Future CV PDF
tests/
  unit/                  Vitest tests for data and helper logic
  e2e/                   Playwright browser tests
.github/workflows/ci.yml  Quality and E2E CI jobs
```

## Local setup

Use **Node.js 24** and **pnpm 12.3.4** (the version pinned in `package.json`). Clone the repository, install from the committed lockfile, and start the development server:

```bash
git clone https://github.com/Kushan2001/kushan-portfolio.git
cd kushan-portfolio
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000>. No environment variable is required for local development.

### pnpm commands

These commands correspond to scripts in `package.json`:

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Next.js development server. |
| `pnpm lint` | Run ESLint. |
| `pnpm typecheck` | Run TypeScript without emitting files. |
| `pnpm test` | Run the Vitest unit suite. |
| `pnpm build` | Create and validate a production build. |
| `pnpm start` | Serve an existing production build. Run `pnpm build` first. |
| `pnpm test:e2e` | Run Playwright browser tests. |

## Development workflow

Edit factual content in `data/` and adjust the corresponding type in `types/portfolio.ts` only if the data shape changes. Keep presentation in components, use Server Components where possible, and do not add unverified personal details. Before opening a pull request, run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Testing

### Vitest

Vitest tests live in `tests/unit/`. They exercise project filtering and slug lookup, DevOps status grouping, URL validation, and other pure helpers; they do not test static markup for its own sake. Run them with `pnpm test`.

### Playwright

Playwright tests live in `tests/e2e/` and use Chromium. Install the browser once, then run the suite:

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

The Playwright configuration builds and starts the app on port `3100` for its tests. The suite covers navigation, themes, project routes and filters, contact links, and responsive behavior.

## GitHub Actions CI

GitHub Actions CI runs on pushes to `main` and pull requests targeting `main`. Its quality job installs dependencies with `pnpm install --frozen-lockfile`, then runs lint, typecheck, Vitest, and a production build. A separate E2E job installs Chromium and runs Playwright after the quality job passes. The workflow cancels superseded runs and uploads the Playwright report.

## SEO

Global and project-specific metadata includes titles, descriptions, Open Graph, and Twitter metadata. The app also generates `robots.txt`, a sitemap, and JSON-LD for the profile and case-study pages. The production origin is centralized in `data/site.ts` through the optional `SITE_URL` variable. Without it, the site does not invent canonical URLs; the sitemap has no absolute entries. Set `SITE_URL` to the **actual production origin** when a deployment domain is known, then rebuild/redeploy.

## Accessibility

The UI uses semantic headings and landmarks, keyboard-accessible navigation, filters, and theme controls, visible focus states, and reduced-motion handling. Images with available data use `next/image` with alt text and dimensions or responsive sizing.

## Deployment

Deploy to a host that supports a normal Next.js application, such as Vercel. Use Node.js 24, pnpm 12.3.4, and `pnpm build`. This repository does not contain a deployment workflow or a configured production domain; GitHub Actions performs checks but does not publish the site. Once the real deployment URL is known, set `SITE_URL` in the hosting environment and redeploy so canonical, social, sitemap, and robots URLs use that origin.

## Updating portfolio content

### Add a project

1. Add a verified entry to `data/projects.ts`, following the existing entry and the `Project` interface in `types/portfolio.ts`. Provide a unique `slug`, title, category, technologies, `featured` flag, and status. Keep required but unknown text as empty strings and list fields as empty arrays; omit optional URLs and architecture until verified.
2. Set `featured: true` only if it should appear on the homepage. The `/projects` page includes every entry; its filters appear only for populated categories.
3. If real screenshots exist, put them in `public/projects/` and add image objects with a `/projects/...` path, descriptive `alt` text, `width`, and `height`. Empty `images` arrays show no image block.

Each slug generates a case-study route; fields such as overview, problem, solution, architecture, challenges, lessons learned, and future improvements are omitted when empty.

### Update DevOps Journey

Edit `data/devops-milestones.ts`. Use `completed`, `in-progress`, or `planned` for each milestone's `status`; the roadmap groups them in that order and hides empty groups. Keep planned technologies marked as planned rather than listing them as current skills. Leave dates empty unless verified.

### Update skills

Add verified `SkillCategory` entries to `data/skills.ts`. Each category needs an `id`, `title`, and `skills` array; each skill needs a `name`. Empty categories are hidden, and the whole Skills section remains hidden while there are no populated categories. Do not add percentages or planned technologies as current skills.

### Add a certification

Add only verified entries to `data/certifications.ts`. `name` and `issuer` are required; issue date, credential ID/URL, description, and image are optional. The Certifications section remains hidden while the array is empty.

### Add a CV

Place the final PDF at `public/cv/kushan-jayaweera-cv.pdf`, or update `cvPath` in `data/cv.ts` if the filename differs. Then set `cvAvailable` to `true` in that same file. Until both steps are complete, leave it `false`; the Hero renders no download link to a missing document.

## Environment variables

| Variable | Required? | Use |
| --- | --- | --- |
| `SITE_URL` | No for local use; recommended for production SEO | Full, real `http` or `https` production origin. Used for absolute canonical, social, sitemap, and robots URLs. |

No other application environment variables are currently defined.
