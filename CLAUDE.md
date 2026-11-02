# CLAUDE.md

Personal career site + blog for Stefan Stankovic, live at https://stefanstankovic.me.
Static Astro site, deployed to GitHub Pages.

## Purpose and audience
- **What it's about:** Stefan's career. That means D365 F&O development, Power Platform, skills, certifications and a technical blog. Web projects are shown too, but as secondary work.
- **Who reads it:** recruiters, D365 partners and general visitors.
- **Copy rules:** write plain, everyday language. Avoid buzzwords and slogans ("no code bloat", "zero-latency", "flawless", "seamless", "top-tier", "testament to", …).
- **Facts:** never invent facts about Stefan (projects, clients, dates, certifications, numbers). Ask instead.
- **Placeholders:** some headings and intros are neutral placeholders that Stefan will rewrite, for example the `/blog` intro and the "What I do" and "Certifications" headings.

## Stack & commands
- **Astro 6** (static output), **Tailwind CSS v4** (via `@tailwindcss/vite`), `@tailwindcss/typography`, `@astrojs/sitemap`.
- Vanilla JS only for interactivity. Do **not** add React/Vue/Svelte or UI libraries; ask before adding any new dependency.
- Node `>=22.12`.
- `npm run dev`: local dev server.
- `npm run build`: production build into `dist/`. Run it after every change; it must finish without errors.
- Deploy: pushing to `main` runs `.github/workflows/deploy.yml` (withastro/action → GitHub Pages). Only commit/push when asked.

## Routes
| URL | Source | Notes |
|---|---|---|
| `/` | `pages/index.astro` | Hero, skills marquee, "Three Disciplines", Certifications, featured projects, contact CTA |
| `/about` | `pages/about.astro` | Intro, What I do, Certifications, My Approach, Skills & Tools |
| `/portfolio` | `pages/portfolio.astro` | All projects (cards generated from the collection) |
| `/projects/<file>` | `pages/projects/[slug].astro` | Case study page |
| `/blog` | `pages/blog/index.astro` | All posts, newest first |
| `/blog/<file>` | `pages/blog/[slug].astro` | Blog post page |
| `/contact` | `pages/contact.astro` | Contact form (Web3Forms) |
| `/services` | `astro.config.mjs` `redirects` | Redirects to `/about` (old page, merged into "What I do") |

Navbar and Footer links: Home / About / Portfolio / Blog / Contact. In the Navbar, Contact is the cyan button.
The active link highlights Portfolio on `/projects/*` and Blog on `/blog/*`.

## Project structure
```
src/
  layouts/BaseLayout.astro     Every page: <html>, BaseHead, Navbar, Footer, ScrollToTop, scrollReveal
  components/
    BaseHead.astro             <head>: meta, canonical, Open Graph/Twitter, favicons, <Font> tags
    Navbar.astro               Fixed top nav, `links` array, active-page highlight, mobile menu
    Footer.astro
    ProjectCard.astro          Card for one project entry (prop `project`)
    Prose.astro                Typography wrapper for Markdown bodies (projects + blog)
    Certifications.astro       Certifications section (takes `class` for the section background)
    ScrollToTop.astro          Bottom-right "back to top" button
  pages/                       See Routes
  content/projects/*.md        Case studies
  content/blog/*.md            Blog posts
  content.config.ts            Collection schemas (zod)
  data/
    certifications.ts          Certifications list (code, name, optional date/link/badge)
    skills.ts                  Single skills list (Home marquee + About "Skills & Tools")
  utils/content.ts             getProjects, getFeaturedProjects, getPosts, readingTime, formatDate
  scripts/                     scrollReveal.js, contactForm.js
  styles/global.css            Tailwind import, @theme fonts, shared component classes
  images/                      bg.png (photo), logo.svg, projects/<slug>.png (project hero images)
public/                        Served as-is: favicons, og-image.png, StefanCV.pdf, robots.txt, manifest
tools/og-image.html            Source design for public/og-image.png
```

## Content collections (`src/content.config.ts`)
The filename (kebab-case) becomes the URL slug.
Always load entries through `src/utils/content.ts`, never with `getCollection` directly in pages, so drafts are filtered out everywhere. That applies to `getStaticPaths` too.

**projects** (`src/content/projects/<slug>.md`):
| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `description` | string | required; card text + meta description |
| `tags` | string[] | required |
| `heroImage` | `image()` | required; path relative to the .md, e.g. `"../../images/projects/<slug>.png"`; optimized by Astro |
| `client` | string? | shown as "Client: …" on the case study |
| `liveLink` | URL? | "Visit Live Site" button |
| `featured` | boolean, default `false` | shown on Home |
| `order` | number? | lower first; without `order` → last, sorted by title |
| `draft` | boolean, default `false` | not listed, not built |

Cards on Home (featured) and Portfolio (all) are generated automatically. Adding a project means one `.md` file plus one image.

**blog** (`src/content/blog/<slug>.md`):
| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `description` | string | required; list text + meta description |
| `date` | date (`YYYY-MM-DD`) | required; sort order |
| `category` | string? | label (falls back to "Blog") |
| `tags` | string[], default `[]` | chips on the post page |
| `draft` | boolean, default `false` | not listed, not built |

Reading time is calculated from the body (~200 words/min). Adding a post means one `.md` file.

**Markdown features:**
- Images: put them next to the .md file or in `src/images/` and reference them with a relative path. They're optimized automatically.
- Code: Shiki theme `github-dark-default`. ```` ```csharp ```` works natively.
- X++: Shiki has no X++ grammar, so ```` ```xpp ```` / ```` ```x++ ```` are aliased to C# (`markdown.shikiConfig.langAlias` in `astro.config.mjs`). X++-only keywords (`ttsbegin`, `select`, …) aren't colored.
- Code block and inline code styles live in `global.css` (`/* --- MARKDOWN / KOD --- */`).

## Data files
- `src/data/certifications.ts`: `{ code, name, date?: 'YYYY-MM', credentialUrl?, badge?: ImageMetadata }`, in display order. Badges go in `src/images/certifications/` and are imported at the top of the file. Without a badge, the card shows the code in a cyan box. Rendered by `Certifications.astro` on Home and About.
- `src/data/skills.ts`: one ordered `string[]` (D365 → Power Platform → web → tools). Home marquee speed scales with the list length.

## Page conventions
- New pages: wrap content in `<BaseLayout title="Stefan Stankovic | X" description="…">` and put a `<main class="pt-32 pb-20">` inside (the fixed navbar needs the top padding).
- New top-level pages also need to be added to the `links` array in `Navbar.astro` and to `Footer.astro`.
- Section width: `container-custom`. Full-bleed sections with top border: `section-wrapper`.
- Section backgrounds alternate between `#040D14` and `#02080D`. Keep neighbours different when inserting a section.
- Mobile-first: base classes for mobile, then `md:` / `lg:`.
- Repeated markup (cards, list items) → array + `.map()`, a data file in `src/data/`, or a component in `src/components/`. Don't copy-paste blocks.
- Images: render with `<Image>` from `astro:assets` (with `widths` + `sizes`). Never use `image.src` in `<img>` or `background-image`, because that ships the full original file (the project mockups are ~6 MB).
- Code comments in this repo are written in Serbian; keep that style.

## Design system

### Colors
| Role | Value | Tailwind |
|---|---|---|
| Page background | `#040D14` | `bg-[#040D14]` |
| Alternate (darker) section background | `#02080D` | `bg-[#02080D]` |
| Cards / surfaces / inputs / code blocks | `#08131D` | `bg-[#08131D]` |
| Accent (links, highlights, primary button) | `#00E5CC` | `text-[#00E5CC]`, `bg-[#00E5CC]`, `border-[#00E5CC]/20…/50` |
| Text on accent | `#040D14` | `text-[#040D14]` |
| Headings | white | `text-white` |
| Body text | gray-400 | `text-gray-400` (secondary: `gray-300`, meta: `gray-500`) |
| Borders | gray-800 | `border-gray-800` (subtle: `border-gray-800/50`) |
| Accent glow | `rgba(0,229,204,0.1–0.2)` | `shadow-[0_0_35px_rgba(0,229,204,0.1)]` |

Only these colors are used; don't introduce near-duplicates.
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
- Motion:
  - `fade-in-up`: CSS animation on load; stagger with `style="animation-delay: Nms"`.
  - `reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700`: revealed by `scrollReveal.js` on scroll; `translate-x-10` is also supported.
- Reduced motion is handled in `global.css`. Keep new animations covered by it.

## SEO & assets
- `BaseHead` builds canonical + OG/Twitter tags from `title`/`description`; `site` is set in `astro.config.mjs`.
- Default share image: `public/og-image.png` (1200×630). Pass `image="/…"` to `BaseLayout` to override it for a page.
- **Link preview image**: edit `tools/og-image.html`, then render it at 1200×630 with headless Edge/Chrome (`--headless=new --window-size=1200,630 --screenshot=…`) and compress it with `sharp` into `public/og-image.png`.
- Sitemap is generated automatically (drafts and the `/services` redirect aren't in it); `public/robots.txt` points to it.
- Contact form posts to Web3Forms (`contact.astro` + `scripts/contactForm.js`). The access key is public by design.

## Specialist agents (`.claude/agents/`)
| Agent | Use for |
|---|---|
| `frontend-builder` | New/changed pages, components, styling, interactivity |
| `content-writer` | New blog posts and case studies, frontmatter changes (Markdown) |
| `seo-perf-reviewer` | Meta/OG tags, image weight, fonts, accessibility, build health (read-only) |
| `code-reviewer` | Bugs, dead code, unused classes, duplication in changes (read-only) |
