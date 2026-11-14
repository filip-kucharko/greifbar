import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { RUBRIKEN } from './rubriken';

const slugs = RUBRIKEN.map((r) => r.slug) as [string, ...string[]];

const artikel = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artikel' }),
  schema: z.object({
    titel: z.string(),
    lead: z.string(),
    datum: z.coerce.date(),
    rubrik: z.enum(slugs),
    autor: z.string().default('Filip Kucharko'),
    bild: z.string().optional(),
    bildAlt: z.string().optional(),
    bildQuelle: z.string().optional(),
    einordnung: z.string().optional(),
    quellen: z
      .array(z.object({ name: z.string(), url: z.string().url() }))
      .default([]),
    aufmacher: z.boolean().default(false),
    entwurf: z.boolean().default(false),
    muster: z.boolean().default(false),
  }),
});

export const collections = { artikel };
