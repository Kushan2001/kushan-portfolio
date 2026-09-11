<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository guidelines

## Architecture and implementation

- Use TypeScript for application code.
- Use the Next.js App Router and its file conventions.
- Prefer Server Components by default.
- Use Client Components only when browser-side interaction, state, effects, or browser APIs require them. Keep client boundaries as small as practical.
- Keep components focused and reusable without introducing unnecessary abstractions.
- Keep portfolio content and data separate from presentation components.
- Avoid unnecessary dependencies. Reuse the platform, framework, and existing project dependencies where practical.
- Maintain and extend the existing design system rather than introducing unrelated visual patterns.
- Do not modify unrelated files.

## Content integrity

- Never invent personal information.
- Never invent skills.
- Never invent projects.
- Never invent certificates or certifications.
- Never invent employment experience.
- Do not use fake skill percentages or unsupported proficiency scores.
- When required portfolio content is missing, use an explicit placeholder or request the information instead of fabricating it.

## UI quality

- Follow accessibility best practices, including keyboard usability, visible focus states, sufficient contrast, and reduced-motion preferences.
- Use semantic HTML and preserve a logical heading hierarchy.
- Keep the website responsive across mobile, tablet, and desktop sizes.
- Optimize images with appropriate dimensions, formats, loading behavior, and Next.js image tooling where suitable.
- Avoid excessive animation. Motion should be restrained, purposeful, performant, and nonessential to understanding the content.

## Verification

- Run lint and a production build after major changes.
- Resolve relevant lint, type, and build failures before considering a major change complete.
