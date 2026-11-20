import type { APIRoute } from 'astro';
import { alleArtikel } from '../lib';
import { rubrikName } from '../rubriken';
import { SEITE } from '../config';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// RSS-Feed mit den 30 neuesten Artikeln: https://greifbar.eu/rss.xml
export const GET: APIRoute = async ({ site }) => {
  const basis = site ?? new URL('https://greifbar.eu');
  const artikel = (await alleArtikel()).slice(0, 30);
  const items = artikel
    .map((a) => {
      const url = new URL(`/artikel/${a.id}/`, basis).href;
      return `    <item>
      <title>${esc(a.data.titel)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${a.data.datum.toUTCString()}</pubDate>
      <category>${esc(rubrikName(a.data.rubrik))}</category>
      <description>${esc(a.data.lead)}</description>
    </item>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Greifbar – Robotik aus dem DACH-Raum</title>
    <link>${basis.href}</link>
    <description>${esc(SEITE.beschreibung)}</description>
    <language>de-AT</language>
    <atom:link href="${new URL('/rss.xml', basis).href}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
