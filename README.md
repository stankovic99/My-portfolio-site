# Stefan Stankovic | Digital Workspace

> **No Code Bloat. Just Smart Tech.**

The official personal portfolio and engineering blog of Stefan Stankovic, Senior D365 F&O Architect and modern web developer. This project bridges the gap between complex enterprise ERP logic and lightning-fast, static frontend experiences.

## 🏗️ Architecture & Tech Stack

This platform is built with a strict performance-first, zero-bloat philosophy. It completely avoids heavy Single Page Application (SPA) frameworks in favor of static generation and minimal client-side JavaScript.

* **Framework:** [Astro](https://astro.build/) (Static Site Generation / Island Architecture)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Interactivity:** Vanilla JavaScript (Native Intersection Observers for scroll reveals)
* **Content:** Markdown (`.md`) via Dynamic Routing
* **Design System:** Custom minimalist dark theme (`bg-[#040D14]` with `#00E5CC` teal accents)

## 📂 Repository Structure

The project follows a clean, modular directory structure:

* `/src/components` - Reusable UI blocks (Navbar.astro, Footer.astro)
* `/src/layouts` - Master templates (e.g., ContentLayout.astro for Markdown injection)
* `/src/pages` - File-based router (index, about, services, portfolio)
* `/src/pages/projects` - Dynamic markdown content for portfolio pieces
* `/src/pages/blog` - Dynamic markdown content for engineering logs
* `/src/styles` - Global CSS and Tailwind directives
* `/src/images` - Optimized static assets

## ⚙️ Content Management (Dynamic Routing)

Adding new projects or engineering logs does not require writing HTML. The platform uses Astro's dynamic routing. To add a new entry, simply create a `.md` file in the respective folder (`src/pages/projects/` or `src/pages/blog/`) using the following Frontmatter block at the top of your file:

---
layout: ../../layouts/ContentLayout.astro
title: Project Title
description: A short summary of the architecture and business logic.
category: Full-Stack Web / Architecture / Certification
date: Month Year
liveLink: https://example.com
---

## 🚀 Local Development

To run this project locally, ensure you have Node.js installed, then execute the following commands:

1. **Install dependencies:**
   `npm install`

2. **Start the development server:**
   `npm run dev` (The site will be available at http://localhost:4321)

3. **Build for production:**
   `npm run build` (Generates optimized static HTML/CSS/JS inside the dist/ directory)

4. **Preview the production build:**
   `npm run preview`

## 📬 Contact

For inquiries regarding enterprise architecture, D365 F&O integrations, or headless web solutions, reach out via:

* **Email:** stefan.stankovicc99@gmail.com
* **Agency:** Season Tech (Launching Summer 2026)

---
*Built with precision. © 2026 Stefan Stankovic.*