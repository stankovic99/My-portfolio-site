import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders'; // NOVO: Uvozimo glob loader

// Šema za Portfolio Projekte
const projectsCollection = defineCollection({
  // NOVO: Koristimo loader umesto type: 'content'
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }), 
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string().optional(),
    tags: z.array(z.string()),
    heroImage: z.string().optional(),
    liveLink: z.string().url().optional(),
  }),
});

// Šema za Blog
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    // Astro v5 preporučuje da datume prebacimo u prave objekte
    description: z.string(),
    date: z.coerce.date(), 
  }),
});

export const collections = {
  'projects': projectsCollection,
  'blog': blogCollection,
};