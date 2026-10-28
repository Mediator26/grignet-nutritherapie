import type { APIRoute } from 'astro';

// La préversion (PUBLIC_NOINDEX=true) est fermée aux moteurs de recherche.
export const GET: APIRoute = ({ site }) => {
  const body =
    import.meta.env.PUBLIC_NOINDEX === 'true'
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', new URL(import.meta.env.BASE_URL, site))}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
