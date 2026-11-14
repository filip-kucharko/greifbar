// Alle Rubriken der Seite. Neue Rubrik? Hier eintragen UND in public/admin/config.yml.
export const RUBRIKEN = [
  { slug: 'industrie', name: 'Industrie' },
  { slug: 'medizin', name: 'Medizin' },
  { slug: 'mobilitaet', name: 'Mobilität' },
  { slug: 'logistik', name: 'Logistik' },
  { slug: 'forschung', name: 'Forschung' },
  { slug: 'startups', name: 'Startups & Kapital' },
  { slug: 'wochenrueckblick', name: 'Wochenrückblick' },
] as const;

export type RubrikSlug = (typeof RUBRIKEN)[number]['slug'];

export const rubrikName = (slug: string) =>
  RUBRIKEN.find((r) => r.slug === slug)?.name ?? slug;

export const datumLang = (d: Date) =>
  d.toLocaleDateString('de-AT', { day: 'numeric', month: 'long', year: 'numeric' });

export const datumKurz = (d: Date) =>
  d.toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' });

export const lesezeit = (text: string) =>
  Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));
