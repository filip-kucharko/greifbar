import type { APIRoute } from 'astro';
import { alleArtikel } from '../lib';
import { RUBRIKEN } from '../rubriken';

// Sitemap für Suchmaschinen: https://greifbar.eu/sitemap.xml
export const GET: APIRoute = async ({ site }) => {
  const basis = site ?? new URL('https://greifbar.eu');
  const u = (p: string) => new URL(p, basis).href;
  const artikel = await alleArtikel();
  const neueste = artikel[0]?.data.datum.toISOString().slice(0, 10);
  const eintraege: { loc: string; lastmod?: string }[] = [
    { loc: u('/'), lastmod: neueste },
    { loc: u('/archiv/'), lastmod: neueste },
    ...RUBRIKEN.map((r) => ({ loc: u(`/rubrik/${r.slug}/`) })),
    ...artikel.map((a) => ({ loc: u(`/artikel/${a.id}/`), lastmod: a.data.datum.toISOString().slice(0, 10) })),
    { loc: u('/ueber/') },
    { loc: u('/impressum/') },
    { loc: u('/datenschutz/') },
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${eintraege
  .map((e) => `  <url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`)
  .join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
