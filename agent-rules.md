# Project: Season Tech Portfolio / Personal Portfolio
# Tech Stack: Astro, Tailwind CSS, Vanilla JS

## Core Philosophy
- Tagline: "No Code Bloat. Just Smart Tech."
- Design: Minimalist, dark theme, high performance, clean UI/UX.
- Execution: Write extremely efficient, production-ready code.

## Coding Rules (STRICT)
1. NO YAP: Output ONLY valid code. Do not explain what you did, do not write markdown explanations unless explicitly asked. 
2. Frameworks: Use ONLY Astro components (`.astro`) and Tailwind CSS for styling. Use Vanilla JS for interactivity (e.g., `scrollReveal.js`). DO NOT introduce React, Vue, or heavy external libraries.
3. Styling: Adhere strictly to the existing dark mode color palette and typography. Always use Tailwind utility classes.
4. Component Structure: Keep components modular and single-responsibility.

## Project Structure (Strictly follow this mapping)
/src
  /components  -> Reusable UI elements (Navbar.astro, Footer.astro, Cards)
  /images      -> Local static assets (SVG, PNG)
  /layouts     -> Shared page wrappers (e.g., MainLayout.astro containing Navbar/Footer)
  /pages       -> Route entry points (index.astro, services.astro)
  /scripts     -> Vanilla JS logic (scrollReveal.js, animations)
  /styles      -> Global CSS (global.css)

## Agent Workflow & Expectations
- When asked to create a new page, ALWAYS wrap it in the appropriate layout component if available, or include Navbar and Footer.
- Ensure all layouts are mobile-responsive first (using Tailwind `md:`, `lg:` prefixes).
- If modifying existing code, DO NOT rewrite the whole file unless asked. Output only the updated sections, or the complete file ONLY if it's small and heavily modified.
- Respect the existing aesthetic: clean lines, alternating layouts, and smooth sticky animations where applicable.