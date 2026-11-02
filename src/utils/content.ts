import { getCollection, type CollectionEntry } from 'astro:content';

// Svi projekti bez draft-ova, sortirani po `order` (bez order-a idu na kraj, po naslovu)
export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => {
    const byOrder = (a.data.order ?? Infinity) - (b.data.order ?? Infinity);
    return byOrder || a.data.title.localeCompare(b.data.title, 'en');
  });
}

export async function getFeaturedProjects(): Promise<CollectionEntry<'projects'>[]> {
  return (await getProjects()).filter((project) => project.data.featured);
}

// Svi postovi bez draft-ova, najnoviji prvi (isti datum -> po naslovu)
export async function getPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title, 'en'),
  );
}

// Procena vremena čitanja (~200 reči u minuti)
export function readingTime(body = ''): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Datumi iz frontmatter-a su ponoć UTC, pa formatiramo u UTC da se dan ne pomeri
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

// Vrednost za <time datetime>: 'YYYY-MM-DD'
export function toDateAttr(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// 'YYYY-MM' -> 'May 2026'; pogrešan format ruši build umesto da prikaže "Invalid Date"
export function formatMonth(yyyyMm: string): string {
  if (!/^\d{4}-\d{2}$/.test(yyyyMm)) {
    throw new Error(`Certification date "${yyyyMm}" must be YYYY-MM`);
  }
  return new Date(`${yyyyMm}-01T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}
