# CLAUDE.md

Personal career site + blog for Stefan Stankovic, live at https://stefanstankovic.me.
Static Astro site, deployed to GitHub Pages.

## Purpose and audience
- **What it's about:** Stefan's career. That means D365 F&O development, Power Platform, skills, certifications and a technical blog. Web projects are shown too, but as secondary work.
- **Who reads it:** recruiters, D365 partners and general visitors.
- **Copy rules:** write plain, everyday language. Avoid buzzwords and slogans ("no code bloat", "zero-latency", "flawless", "seamless", "top-tier", "testament to", …).
- **Facts:** never invent facts about Stefan (projects, clients, dates, certifications, numbers). Ask instead.
- **Confirmed facts** (from Stefan, Nov 2026): job title on the site is "D365 F&O Developer"; D365/AX work since June 2022 (`d365Start` in `src/data/experience.ts`, shown as "4+ years", computed at build); employers may be named (Infinite Solutions, 42Dynamics, Elikosoft); clients stay anonymous; Sep 2020 – Jun 2022 were studies. He owns a small UPVC window/door manufacturing business (keep it unnamed), handles quotes/orders, BOMs/cutting lists, production planning, purchasing/stock himself, and is designing a system for it (planned, not built). UDE: learning on his own; has a working UDE environment and uses Claude Code on X++ code there. AI: uses Claude, Claude Code and GitHub Copilot daily (Claude Code for this website, X++/D365 work and learning); has not built AI features yet. PL-900 passed in May 2026 with 1000/1000. PL-400 passed (no date given); prepared with Microsoft Learn, practice tests, hands-on building and video courses. BYOD at work: set up the export, scheduled the jobs, built/extended data entities, fixed problems.
- **Blog posts:** written as plain technical guides. First-person sentences only for the confirmed facts above; everything else is general advice ("you"), never an invented story about Stefan.
- **Design feedback** (Stefan, Nov 2026): no arch, oval or other symmetric "frame" around his portrait; an arch behind the photo read as a gravestone. He wants backdrops that are specific to him, not generic.
- **Placeholders:** some headings and intros are neutral placeholders that Stefan will rewrite, for example the `/blog` intro.
- **Tone:** Stefan is employed. The site presents his work and blog; it must not read as job- or client-seeking (no "available for projects/hire", "discuss your project", "have a role in mind"). Contact is framed as questions, feedback on posts, or saying hi. No phone number and no CV download.

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
| `/` | `pages/index.astro` | Hero (photo in front of the `CodeWindow` backdrop, desktop only), skills marquee, "What I do", Certifications, latest 3 posts, featured projects, contact CTA |
| `/about` | `pages/about.astro` | Intro, Experience timeline (+ education), UPVC business, grouped Skills (+ cert codes linking to `/#certifications`), How I use AI, contact. One column story, no hover effects |
| `/portfolio` | `pages/portfolio.astro` | All projects (cards generated from the collection) |
| `/projects/<file>` | `pages/projects/[slug].astro` | Case study page |
| `/blog` | `pages/blog/index.astro` | All posts, newest first, as one column of `PostCard`s (`max-w-4xl`) |
| `/blog/<file>` | `pages/blog/[slug].astro` | Blog post page, one `max-w-4xl` column: "All posts" link, date + read time + tag pills, title, author row (photo, name, current role from `jobs[0]`), description as intro, "Key takeaways" box, then the Markdown body |
| `/contact` | `pages/contact.astro` | Two columns from the top: heading + direct email on the left, the form (Web3Forms) on the right, visible without scrolling |
| `/services` | `astro.config.mjs` `redirects` | Redirects to `/about` (old page, merged into "What I do") |

Navbar and Footer links: Home / About / Portfolio / Blog / Contact, all from `src/data/nav.ts` (`navLinks` + `contactLink`). In the Navbar, Contact is the cyan button.
The active link highlights Portfolio on `/projects/*` and Blog on `/blog/*`.
Internal page links end with a trailing slash (`/about/`, `/blog/<slug>/`), matching the canonicals and the sitemap; otherwise GitHub Pages answers with a 301.

## Project structure
```
src/
  layouts/BaseLayout.astro     Every page: <html>, BaseHead, Navbar, Footer, ScrollToTop, scrollReveal
  components/
    BaseHead.astro             <head>: meta, canonical, Open Graph/Twitter, favicons, <Font> tags
    Navbar.astro               Fixed top nav, `links` array, active-page highlight, mobile menu
    Footer.astro
    ProjectCard.astro          Card for one project entry (prop `project`)
    PostCard.astro             Card for one post (props `post`, `headingLevel` 2|3, `class`, `style`): date, read time, tag pills, title,
                               description, "Read more". /blog (one column) and Home "Latest posts" (three across from `lg`)
    ContactCta.astro           Closing "Have a question?" box (Home + About); prop `class` sets the section padding
    Prose.astro                Typography wrapper for Markdown bodies (projects + blog)
    Certifications.astro       Certifications section (props: `class` for the section background, optional `heading`, default "Microsoft certified.").
                               A card is a link with hover only when it has `credentialUrl`; otherwise it's static (no hover)
    ScrollToTop.astro          Bottom-right "back to top" button
    Icon.astro                 Inline SVG icons (Lucide shapes), `<Icon name="mail" class="h-5 w-5" />`; add new shapes to its map.
                               Every icon on the site goes through it (no hand-written `<svg>` in pages)
    GlassPane.astro            About: moving "glass" disc behind the photo (sliding lines + sheen). `class` sets shape, position and background
    CodeWindow.astro           Home hero: tilted "code editor" window with real X++ behind the photo (decorative, aria-hidden).
                               `class` sets position and size; the code lines and the typed line are arrays at the top of the file
  pages/                       See Routes
  content/projects/*.md        Case studies
  content/blog/*.md            Blog posts
  content.config.ts            Collection schemas (zod)
  data/
    certifications.ts          Certifications list (code, name, optional date/link/badge)
    skills.ts                  Short skills list for the Home marquee
    experience.ts              Jobs (About timeline), d365Start (years counter), education
    nav.ts                     navLinks + contactLink (Navbar and Footer); linkedInUrl, email, githubUrl (the only copies of those)
  utils/content.ts             getProjects, getFeaturedProjects, getPosts, readingTime,
                               formatDate (UTC; second argument 'short' gives "Nov 16, 2026"), toDateAttr (<time datetime>), formatMonth ('YYYY-MM'),
                               yearsSince ('YYYY-MM' -> full years, at build time)
  scripts/                     scrollReveal.js, contactForm.js
  styles/global.css            Tailwind import, @theme fonts, shared component classes
  images/                      bg.png (photo), logo.svg, projects/<slug>.png (project hero images)
public/                        Served as-is: favicons, og-image.png, robots.txt, manifest (no CV on purpose)
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
| `tags` | string[], default `[]` | cyan pills on the card and in the post header; keep it to 3–4 |
| `takeaways` | string[], default `[]` | 3–4 short points for the "Key takeaways" box; only what the post itself says. Without them the box is hidden |
| `draft` | boolean, default `false` | not listed, not built |

Reading time is calculated from the body (~200 words/min). Adding a post means one `.md` file.

**Markdown features:**
- Images: put them next to the .md file or in `src/images/` and reference them with a relative path. They're optimized automatically.
- Code: Shiki theme `github-dark-default`. ```` ```csharp ```` works natively.
- X++: Shiki has no X++ grammar, so ```` ```xpp ```` / ```` ```x++ ```` are aliased to C# (`markdown.shikiConfig.langAlias` in `astro.config.mjs`). X++-only keywords (`ttsbegin`, `select`, …) aren't colored.
- Code block and inline code styles live in `global.css` (`/* --- MARKDOWN / KOD --- */`).

## Data files
- `src/data/certifications.ts`: `{ code, name, date?: 'YYYY-MM', credentialUrl?, badge?: ImageMetadata }`, in display order. Badges go in `src/images/certifications/` and are imported at the top of the file. Without a badge, the card shows an icon in a box (graduation cap for Fundamentals, award for the rest). A `date` not in `YYYY-MM` format fails the build. Rendered by `Certifications.astro` on Home and About.
- `src/data/nav.ts`: navigation links. A new top-level page goes here (Navbar and Footer both read it).
- `src/data/skills.ts`: one ordered `string[]` (D365 → Power Platform → web → tools) for the Home marquee; its speed scales with the list length. The About page has its own grouped, more descriptive list (`skillGroups` in `about.astro`).
- `src/data/experience.ts`: `jobs` (`{ role, company, start: 'YYYY-MM', end?, points[] }`, newest first; no `end` = "Present"), `d365Start` (drives "N+ years" on Home and About), `education`. A new job goes at the top of `jobs`.

## Page conventions
- New pages: wrap content in `<BaseLayout title="Stefan Stankovic | X" description="…">` and put a `<main id="main" class="pt-32 pb-20">` inside (the fixed navbar needs the top padding; `id="main"` is the target of the "Skip to content" link in `BaseLayout`).
- New top-level pages also need an entry in `navLinks` in `src/data/nav.ts`.
- Blog posts pass `type="article" publishedTime={date}` to `BaseLayout` (Open Graph article tags).
- Section width: `container-custom`. Full-bleed sections with top border: `section-wrapper`.
- Section backgrounds alternate between `#061219` and `#081820`. Keep neighbours different when inserting a section.
- Mobile-first: base classes for mobile, then `md:` / `lg:`.
- Repeated markup (cards, list items) → array + `.map()`, a data file in `src/data/`, or a component in `src/components/`. Don't copy-paste blocks.
- Images: render with `<Image>` from `astro:assets` (with `widths` + `sizes`, or `width`/`height` + `densities` for fixed sizes). Never use `image.src` in `<img>` or `background-image`, because that ships the full original file. Exception: the SVG logo in `Navbar.astro` and `Footer.astro`.
- Above-the-fold images (Home hero, About photo, case study hero) use `loading="eager"` + `fetchpriority="high"`; everything else stays lazy.
- Code comments in this repo are written in Serbian; keep that style.

## Design system

### Colors
| Role | Value | Tailwind |
|---|---|---|
| Page background | `#061219` | `bg-[#061219]` |
| Alternate (slightly lighter) section background | `#081820` | `bg-[#081820]` |
| Cards / surfaces / inputs / code blocks | `#0A1A22` | `bg-[#0A1A22]` |
| Accent (links, highlights, primary button) | `#00E5CC` | `text-[#00E5CC]`, `bg-[#00E5CC]`, `border-[#00E5CC]/20…/50` |
| Text on accent | `#061219` | `text-[#061219]` |
| Headings | white | `text-white` |
| Body text | gray-400 | `text-gray-400` (secondary: `gray-300`) |
| Small meta text (dates, labels, back links) | gray-400 | `text-gray-400`. Not gray-500: below 4.5:1 contrast on these backgrounds |
| De-emphasized large text / placeholders | gray-500 | `text-gray-500`, `placeholder-gray-500` |
| Decorative dots / separators | gray-700 | `bg-gray-700` |
| Borders | gray-800 | `border-gray-800` (subtle: `border-gray-800/50`) |
| Tech chips (`.tag`) | slate | `border-slate-400/35 bg-white/5 text-slate-300` |
| LinkedIn pill (brand, old pages) | blue | `text-blue-400`, `border-blue-500/30`. Home uses a neutral `border-white/20` pill |
| Accent glow | `rgba(0,229,204,0.1–0.2)` | `shadow-[0_0_35px_rgba(0,229,204,0.1)]` |

Only these colors are used; don't introduce near-duplicates.
Hover pattern: gray → `#00E5CC` text; card border → `border-[#00E5CC]/50` + glow; primary button cyan → white.
`theme-color` (BaseHead) and `site.webmanifest` both use `#061219`.

### Fonts
Self-hosted through the Astro Fonts API (`fonts` in `astro.config.mjs` → `<Font>` in `BaseHead.astro`). There are no Google Fonts requests at runtime.
| Tailwind | Font | Used for |
|---|---|---|
| `font-sans` (default) | Bricolage Grotesque, 200–800 | Headings, footer `STEFAN.` wordmark; nav, buttons and CTA links through `ui-text` (uppercase) |
| `font-serif` | Instrument Serif, italic only | Italic cyan accent words in headings (always use with `italic`) |
| `font-mono` | JetBrains Mono, 400–700 | Body paragraphs (`text-body`), labels, meta |

`global.css` maps `--font-sans/serif/mono` to `--font-bricolage/instrument/jetbrains`. To add a font or weight, change `astro.config.mjs` (weights not listed there aren't downloaded).

### Shared classes (`src/styles/global.css`)
Use these before writing long utility strings:
- Layout: `section-wrapper`, `container-custom`
- Type: `heading-primary` (Home only: hero h1 and the contact CTA h2), `heading-page` (page H1), `heading-section` (H2), `text-body`
- Labels: `eyebrow` (plain cyan mono label above headings; Home and Certifications), `pill-badge` (older pill eyebrow, still on the other pages), `tag` (tech chips on projects), `tag-accent` (cyan pills for blog tags; no hover, because they sit inside the card link)
- Cards: `card-base` + `card-title` (title turns cyan on card hover; card needs `group` for inner `group-hover:`)
- UI text: `ui-text` (custom `@utility`: Bricolage, weight 600, uppercase, `tracking 0.1em`; the old navbar look). Used by nav links, buttons, hero pills and text CTAs like "Read case study". It sets no font size: add one where it's used (`text-xs` pills, `text-[13px]` nav and card links, `text-sm` buttons).
- Buttons: `btn-primary` (cyan, `rounded-lg`, `ui-text text-sm`, optional leading/trailing `<Icon class="h-4 w-4">`), `btn-secondary` (outlined `border-white/20`, identical font, size and padding). Navbar: links sit in a bordered pill group (`bg-[#0A1A22]`), active link `text-[#00E5CC] bg-[#00E5CC]/10`; Contact is `btn-primary text-[13px] px-5 py-2.5`.
- Motion:
  - `fade-in-up`: CSS animation on load; stagger with `style="animation-delay: Nms"`. Use it for anything above the fold (e.g. the Home hero), so it shows without JS.
  - `reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700`: revealed by `scrollReveal.js` on scroll; `translate-x-10` is also supported. Only for content below the fold. On a card with its own hover transition, put these classes (and any `transition-delay`) on a wrapper, not on the card, or the hover gets the same delay. Without JS a `<noscript>` rule in `BaseHead` shows these elements.
  - `glass-lines` / `glass-sheen`: the moving "glass" backdrop behind the photo, used through `GlassPane.astro` on About (thin diagonal lines sliding inside a disc, plus a light sweep, with a dashed ring and corner brackets around it). `glass-lines` moves exactly one 48px period per loop; change the period and the keyframe together.
  - `code-type` / `code-cursor`: the typed line and blinking cursor in `CodeWindow.astro` (Home hero). `code-type` reveals up to 26 characters in 26 steps; change both numbers together if the typed line changes length.
- Reduced motion is handled in `global.css` (marquee, glass backdrop, code window, `fade-in-up`, `reveal-on-scroll`, smooth scroll, back-to-top button). Keep new animations covered by it.

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
