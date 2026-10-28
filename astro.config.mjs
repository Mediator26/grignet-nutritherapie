// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site statique : le dossier dist/ est envoyé tel quel sur l'hébergement OVH.
// SITE_URL et BASE_PATH permettent de construire la préversion GitHub Pages
// (voir .github/workflows/deploy.yml) sans toucher à la configuration OVH.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://grignet-nutritherapie.be',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !page.includes('/contact/merci/') })],
});
