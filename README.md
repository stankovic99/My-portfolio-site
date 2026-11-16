# Stefan Stankovic | Personal Site

The personal site and blog of Stefan Stankovic, D365 F&O Developer and web developer. It covers my work with Dynamics 365 F&O and Power Platform, my skills and certifications, selected projects, and a technical blog.

Live at https://stefanstankovic.me.

## 🏗️ Tech Stack

The site is generated as static HTML, with very little JavaScript in the browser.

* **Framework:** [Astro](https://astro.build/) (static site generation)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + `@tailwindcss/typography` for Markdown pages
* **Interactivity:** Vanilla JavaScript (scroll reveals, mobile menu, contact form)
* **Content:** Markdown files in Astro content collections
* **Design:** Dark theme (`#061219` background, `#00E5CC` accent), fonts self-hosted via the Astro Fonts API

## 📂 Repository Structure

* `/src/pages` - Routes: Home, About, Portfolio, Blog, Contact, plus `projects/[slug]` and `blog/[slug]`
* `/src/content/projects` - One Markdown file per project
* `/src/content/blog` - One Markdown file per blog post
* `/src/data` - `certifications.ts` and `skills.ts`
* `/src/components` - Navbar, Footer, ProjectCard, Prose, Certifications, ScrollToTop, BaseHead
* `/src/layouts` - BaseLayout.astro, the shared page shell (head, navbar, footer)
* `/src/utils` - Helpers for loading posts and projects (sorting, drafts, reading time)
* `/src/styles` - Global CSS and Tailwind directives
* `/src/images` - Images optimized at build time (`projects/` holds project hero images)

## ✍️ How to add a blog post

1. Create `src/content/blog/my-post-name.md`. The filename becomes the URL: `/blog/my-post-name`.
2. Start it with this frontmatter, then write the post in Markdown below it:

```markdown
---
title: "Extending a D365 F&O form with Chain of Command"
description: "A short summary, 1–2 sentences. Shown in the blog list and in search results."
date: 2026-11-02
tags: ["X++", "D365 F&O"]  # optional – shown as pills on the card and the post
takeaways:                 # optional – 3–4 short points for the "Key takeaways" box
  - "First point."
  - "Second point."
draft: true                # optional – remove (or set to false) to publish
---

## First section

Text…
```

3. Code blocks: use a language after the three backticks, e.g. ```` ```xpp ```` for X++ (highlighted like C#), ```` ```csharp ````, ```` ```sql ````.
4. Images: put the image next to the `.md` file and reference it with a relative path: `![Short description](./my-image.png)`.

The post appears on `/blog` automatically (newest first), with its reading time calculated for you.

## 🧩 How to add a project

1. Put the project image in `src/images/projects/`, e.g. `src/images/projects/my-project.png`.
2. Create `src/content/projects/my-project.md`. The filename becomes the URL: `/projects/my-project`.
3. Start it with this frontmatter, then write the case study in Markdown below it:

```markdown
---
title: "Project name"
description: "A short summary. Shown on the project card and in search results."
tags: ["Power Automate", "Dataverse"]
heroImage: "../../images/projects/my-project.png"
client: "Client name"            # optional
liveLink: "https://example.com"  # optional
featured: true                   # optional – also show it on the Home page
order: 3                         # optional – lower numbers come first
draft: true                      # optional – remove (or set to false) to publish
---

## The Goal

Text…
```

The project card on `/portfolio` (and on Home, if `featured: true`) is created automatically.

## 🏅 Certifications and skills

* Certifications: edit `src/data/certifications.ts`. Each entry has a code and name, plus an optional date (`'2026-05'`), credential link and badge image.
* Skills: edit the list in `src/data/skills.ts`. It feeds both the Home page strip and the About page.

## 🚀 Local Development

To run this project locally, ensure you have Node.js installed, then execute the following commands:

1. **Install dependencies:**
   `npm install`

2. **Start the development server:**
   `npm run dev` (The site will be available at http://localhost:4321)

3. **Build for production:**
   `npm run build` (Generates static HTML/CSS/JS inside the dist/ directory)

4. **Preview the production build:**
   `npm run preview`

Pushing to `main` deploys the site to GitHub Pages automatically.

## 📬 Contact

For questions about D365 F&O, Power Platform or web projects, reach out via:

* **Email:** stefan.stankovicc99@gmail.com
* **Agency:** Season Tech (Launching Summer 2026)

---
*© 2026 Stefan Stankovic.*
