// Préfixe les liens internes avec le chemin de base du site
// (« / » sur grignet-nutritherapie.be, « /grignet-nutritherapie/ » sur GitHub Pages).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string) => `${base}${path}`;
