import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// Šema za Portfolio Projekte
const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    // Putanja relativna u odnosu na .md fajl, slika ide kroz Astro optimizer
    heroImage: image(),
    client: z.string().optional(),
    liveLink: z.string().url().optional(),
    // Prikazuje se na Home stranici
    featured: z.boolean().default(false),
    // Manji broj ide prvi; projekti bez order-a idu na kraj (po naslovu)
    order: z.number().optional(),
    // draft: true -> ne pojavljuje se u listama i ne build-uje se
    draft: z.boolean().default(false),
  }),
});

// Šema za Blog
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'projects': projectsCollection,
  'blog': blogCollection,
};
