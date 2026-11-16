import type { ImageMetadata } from 'astro';

export interface Certification {
  code: string;            // npr. 'MB-500'
  name: string;
  date?: string;           // 'YYYY-MM', npr. '2026-05'
  credentialUrl?: string;  // Microsoft Learn / Credly link
  badge?: ImageMetadata;   // import iz src/images/certifications/
}

// Nova sertifikacija: dodaj objekat u niz ispod (redosled u nizu = redosled na sajtu).
// Datum i link su opcioni: `date: '2026-05'` (format YYYY-MM) i `credentialUrl: 'https://...'`.
// Bedž: sacuvaj sliku u src/images/certifications/, importuj je na vrhu fajla
// (npr. `import mb500Badge from '../images/certifications/mb-500.png';`) pa dodaj `badge: mb500Badge`.
// Bez bedža kartica prikazuje ikonicu u kvadratu (kapa za Fundamentals, medalja za ostale).
export const certifications: Certification[] = [
  { code: 'MB-500', name: 'Dynamics 365: Finance and Operations Apps Developer Associate' },
  { code: 'PL-400', name: 'Power Platform Developer Associate' },
  { code: 'PL-900', name: 'Power Platform Fundamentals' },
];
