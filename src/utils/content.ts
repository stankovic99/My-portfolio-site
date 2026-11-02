import { getCollection, type CollectionEntry } from 'astro:content';

// Svi projekti bez draft-ova, sortirani po `order` (bez order-a idu na kraj, po naslovu)
export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => {
    const byOrder = (a.data.order ?? Infinity) - (b.data.order ?? Infinity);
    return byOrder || a.data.title.localeCompare(b.data.title);
  });
}

export async function getFeaturedProjects(): Promise<CollectionEntry<'projects'>[]> {
  return (await getProjects()).filter((project) => project.data.featured);
}

// Svi postovi bez draft-ova, najnoviji prvi
export async function getPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Procena vremena čitanja (~200 reči u minuti)
export function readingTime(body = ''): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(date: Date, month: 'long' | 'short' = 'long'): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month, day: 'numeric' });
}
