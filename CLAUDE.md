# CLAUDE.md

Personal portfolio + engineering blog for Stefan Stankovic, live at https://stefanstankovic.me.
Static Astro site, deployed to GitHub Pages.

## Stack & commands
- **Astro 6** (static output), **Tailwind CSS v4** (via `@tailwindcss/vite`), `@tailwindcss/typography`, `@astrojs/sitemap`.
- Vanilla JS only for interactivity. Do **not** add React/Vue/Svelte or UI libraries; ask before adding any new dependency.
- Node `>=22.12`.
- `npm run dev`: local dev server.
- `npm run build`: production build into `dist/`. Run it after every change; it must finish without errors.
- Deploy: pushing to `main` runs `.github/workflows/deploy.yml` (withastro/action → GitHub Pages). Only commit/push when asked.

## Project structure
```
src/
  layouts/BaseLayout.astro   Every page uses this: <html>, BaseHead, Navbar, Footer, ScrollToTop, scrollReveal
  components/
    BaseHead.astro           <head>: meta, canonical, Open Graph/Twitter, favicons, <Font> tags
    Navbar.astro             Fixed top nav, `links` array, active-page highlight, mobile menu
    Footer.astro
    ProjectCard.astro        Project card (image via astro:assets <Image>)
    ScrollToTop.astro        Bottom-right "back to top" button
  pages/                     index, about, services, portfolio, contact
    projects/[slug].astro    Case study page from the `projects` collection
    blog/[slug].astro        Blog post page from the `blog` collection
  content/projects/*.md      Case studies
  content/blog/*.md          Blog posts
  content.config.ts          Collection schemas (zod)
  scripts/                   scrollReveal.js, contactForm.js
  styles/global.css          Tailwind import, @theme fonts, shared component classes
  images/                    Images that go through Astro's optimizer
public/                      Served as-is: favicons, og-image.png, StefanCV.pdf, robots.txt, manifest
tools/og-image.html          Source design for public/og-image.png
```

## Page conventions
- New pages: wrap content in `<BaseLayout title="Stefan Stankovic | X" description="…">` and put a `<main class="pt-32 pb-20">` inside (the fixed navbar needs the top padding).
- New top-level pages also need to be added to the `links` array in `Navbar.astro` and to `Footer.astro`.
- Section width: `container-custom`. Full-bleed sections with top border: `section-wrapper`.
- Mobile-first: base classes for mobile, then `md:` / `lg:`.
- Repeated markup (cards, list items, timeline entries) → frontmatter array + `.map()`, or a component in `src/components/`. Don't copy-paste blocks.
- Images: import from `src/images/` and render with `<Image>` from `astro:assets` (with `widths` + `sizes`). Never use `image.src` in `<img>` or `background-image`, because that ships the full original file (the mockups are ~6 MB).
- Code comments in this repo are written in Serbian; keep that style.

## Design system

### Colors
| Role | Value | Tailwind |
|---|---|---|
| Page background | `#040D14` | `bg-[#040D14]` |
| Alternate (darker) section background | `#02080D` | `bg-[#02080D]` |
| Cards / surfaces / inputs | `#08131D` | `bg-[#08131D]` |
| Accent (links, highlights, primary button) | `#00E5CC` | `text-[#00E5CC]`, `bg-[#00E5CC]`, `border-[#00E5CC]/20…/50` |
| Text on accent | `#040D14` | `text-[#040D14]` |
| Headings | white | `text-white` |
| Body text | gray-400 | `text-gray-400` (secondary: `gray-300`, meta: `gray-500`) |
| Borders | gray-800 | `border-gray-800` (subtle: `border-gray-800/50`) |
| Accent glow | `rgba(0,229,204,0.1–0.2)` | `shadow-[0_0_35px_rgba(0,229,204,0.1)]` |

Use `#08131D` for new surfaces. (`#0a151f` / `#0a1520` are older near-duplicates still used on the home and services cards.)
Hover pattern: gray → `#00E5CC` text; card border → `border-[#00E5CC]/50` + glow; primary button cyan → white.
`theme-color` (BaseHead) and `site.webmanifest` both use `#040D14`.

### Fonts
Self-hosted through the Astro Fonts API (`fonts` in `astro.config.mjs` → `<Font>` in `BaseHead.astro`). There are no Google Fonts requests at runtime.
| Tailwind | Font | Used for |
|---|---|---|
| `font-sans` (default) | Bricolage Grotesque, 200–800 | Headings, buttons, nav |
| `font-serif` | Instrument Serif, normal + italic | Italic cyan accent words in headings |
| `font-mono` | JetBrains Mono, 400–700 | Body paragraphs (`text-body`), labels, meta |

`global.css` maps `--font-sans/serif/mono` to `--font-bricolage/instrument/jetbrains`. To add a font or weight, change `astro.config.mjs` (weights not listed there aren't downloaded).

### Shared classes (`src/styles/global.css`)
Use these before writing long utility strings:
- Layout: `section-wrapper`, `container-custom`
- Type: `heading-primary` (home hero only), `heading-page` (page H1), `heading-section` (H2), `text-body`
- Labels: `pill-badge` (eyebrow above headings), `tag` (tech chips)
- Cards: `card-base` + `card-title` (title turns cyan on card hover; card needs `group` for inner `group-hover:`)
- Buttons: `btn-primary` (cyan, square `rounded-sm`), `btn-secondary` (outlined)
- Motion: `fade-in-up` (CSS on load, stagger with `style="animation-delay: Nms"`); `reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700` (revealed by `scrollReveal.js` on scroll; `translate-x-10` is also supported)
- Reduced motion is handled in `global.css`. Keep new animations covered by it.

## Content collections (`src/content.config.ts`)
- **projects**: `title`, `description`, `tags: string[]`, optional `client`, `heroImage`, `liveLink` (URL). Route: `/projects/<filename>`.
- **blog**: `title`, `description`, `date` (YYYY-MM-DD), optional `category`. Route: `/blog/<filename>`. The portfolio page lists posts automatically (newest first).
- Project cards on `index.astro` and `portfolio.astro` are written by hand with `ProjectCard` (they need an imported mockup image). A new case study needs a card added there too.
- `src/content/projects/season-tech.md` has no card yet, so its page builds but nothing links to it.

## SEO & assets
- `BaseHead` builds canonical + OG/Twitter tags from `title`/`description`; `site` is set in `astro.config.mjs`.
- Default share image: `public/og-image.png` (1200×630). Pass `image="/…"` to `BaseLayout` to override it for a page.
- **Link preview image**: edit `tools/og-image.html`, then render it at 1200×630 with headless Edge/Chrome (`--headless=new --window-size=1200,630 --screenshot=…`) and compress it with `sharp` into `public/og-image.png`.
- Sitemap is generated automatically; `public/robots.txt` points to it.
- Contact form posts to Web3Forms (`contact.astro` + `scripts/contactForm.js`). The access key is public by design.

## Specialist agents (`.claude/agents/`)
| Agent | Use for |
|---|---|
| `frontend-builder` | New/changed pages, components, styling, interactivity |
| `content-writer` | New blog posts and case studies (Markdown + frontmatter) |
| `seo-perf-reviewer` | Meta/OG tags, image weight, fonts, accessibility, build health (read-only) |
| `code-reviewer` | Bugs, dead code, unused classes, duplication in changes (read-only) |
