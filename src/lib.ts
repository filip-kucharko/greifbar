import { getCollection } from 'astro:content';

// Alle veröffentlichten Artikel, neueste zuerst (Entwürfe werden ausgeblendet)
export async function alleArtikel() {
  const liste = await getCollection('artikel', ({ data }) => !data.entwurf);
  return liste.sort((a, b) => b.data.datum.valueOf() - a.data.datum.valueOf());
}
