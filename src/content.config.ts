import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Une conférence = un fichier Markdown dans src/content/conferences/.
const conferences = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/conferences' }),
  schema: ({ image }) =>
    z.object({
      titre: z.string(),
      accroche: z.string().optional(),
      date: z.coerce.date(),          // ex. 2026-11-24T19:00:00
      heure: z.string(),              // texte affiché, ex. « 19 h »
      lieu: z.string(),
      ville: z.string(),
      prix: z.string().optional(),
      // « complet » force l'affichage « Complet » ; sinon la date suffit
      statut: z.enum(['ouvert', 'complet']).default('ouvert'),
      inscription: z.string().optional(),
      affiche: image().optional(),
      afficheAlt: z.string().optional(),
    }),
});

// Préparé pour la future vente du livre de recettes (non affiché tant que
// features.boutique vaut false dans src/data/site.ts).
const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: ({ image }) =>
    z.object({
      titre: z.string(),
      resume: z.string(),
      prix: z.string().optional(),
      couverture: image().optional(),
      lienPaiement: z.string().url().optional(), // lien Payhip ou Lemon Squeezy
      brouillon: z.boolean().default(true),
    }),
});

export const collections = { conferences, publications };
