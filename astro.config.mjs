// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://stefanstankovic.me',
  integrations: [sitemap()],
  // Stara Services stranica je spojena sa About
  redirects: { '/services': '/about/' },
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      // Shiki nema X++ gramatiku; X++ je sintaksno blizak C#-u
      langAlias: { xpp: 'csharp', 'x++': 'csharp' },
    },
  },
  // Fontovi se preuzimaju pri build-u i serviraju sa našeg domena (bez Google requesta u browseru)
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-bricolage',
      weights: ['200 800'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Instrument Serif',
      cssVariable: '--font-instrument',
      // Koristi se samo kurziv (font-serif italic u naslovima)
      styles: ['italic'],
      fallbacks: ['serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      weights: ['400 700'],
      fallbacks: ['monospace'],
    },
  ]
});