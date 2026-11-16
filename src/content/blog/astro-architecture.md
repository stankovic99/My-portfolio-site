---
title: "Why I use Astro for content websites"
description: "Astro sends plain HTML and adds JavaScript only where a page needs it. Why that fits blogs, portfolios and small business sites."
date: 2026-05-15
tags: ["Web", "Astro", "Tailwind CSS"]
takeaways:
  - "Astro builds every page into plain HTML and sends no JavaScript by default."
  - "Only the interactive parts of a page get their own script."
  - "That fits blogs, portfolios and small business sites."
  - "For apps with a lot of state in the browser, React or Vue are still the better choice."
---

Most of my working day goes into large ERP systems. That teaches you to like tools that do the job and nothing more. On the web, the usual choice for years was a single-page application (SPA) built with React, Vue or Angular, even when the site was only a few pages of text.

For a blog, a portfolio or a restaurant site, that means sending a lot of JavaScript to show content that never changes. Astro takes the opposite approach.

## HTML first, JavaScript only where needed

Astro builds every page into plain HTML ahead of time. By default it ships no JavaScript to the browser at all.

When a part of the page does need to be interactive, such as a mobile menu, an image slider or a form, only that part gets its script. Astro calls these parts "islands". The rest of the page stays plain HTML.

## What the browser has to do

With a typical SPA, the browser has to:

1. Download a nearly empty HTML file.
2. Download the JavaScript bundle.
3. Run it.
4. Only then show the content.

With Astro, the first response already contains the content. Someone who opens a menu from a QR code on a slow mobile connection sees the page sooner, and search engines get the full text without running any scripts.

## Writing components

An `.astro` file is HTML with a small script block at the top. The script runs when the site is built, not in the browser:

```astro
---
const { title, items } = Astro.props;
---

<section>
  <h2>{title}</h2>
  <ul>
    {items.map((item) => <li>{item}</li>)}
  </ul>
</section>
```

Styling is done with Tailwind CSS, which only includes the classes that are actually used.

## This site

This site is built the same way: Astro with static output, Tailwind CSS, and a few small plain JavaScript files for the mobile menu, the scroll animations and the contact form. Blog posts and case studies are Markdown files, so adding a post means adding one file. It is hosted on GitHub Pages.

## When I would not use it

Astro is not a replacement for React or Vue where they are really needed: dashboards, portals and apps with a lot of state in the browser. For sites where the content is the main thing, it is the simplest tool I know that still feels modern to work with.
