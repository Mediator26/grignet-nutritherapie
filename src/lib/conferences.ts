import { getCollection, type CollectionEntry } from 'astro:content';

export type Conference = CollectionEntry<'conferences'>;

// Le site étant statique, « à venir » est évalué au moment du build :
// reconstruire et renvoyer le site après chaque conférence.
export async function getConferences() {
  const toutes = (await getCollection('conferences')).sort(
    (a, b) => a.data.date.getTime() - b.data.date.getTime(),
  );
  const maintenant = Date.now();
  const aVenir = toutes.filter((c) => c.data.date.getTime() >= maintenant);
  const passees = toutes.filter((c) => c.data.date.getTime() < maintenant).reverse();
  return { toutes, aVenir, passees, prochaine: aVenir[0] };
}

const tz = 'Europe/Brussels';

export const formatJour = (d: Date) =>
  new Intl.DateTimeFormat('fr-BE', { day: 'numeric', timeZone: tz }).format(d);

export const formatMoisAnnee = (d: Date) =>
  new Intl.DateTimeFormat('fr-BE', { month: 'long', year: 'numeric', timeZone: tz }).format(d);

export const formatJourSemaine = (d: Date) =>
  new Intl.DateTimeFormat('fr-BE', { weekday: 'long', timeZone: tz }).format(d);

export const formatDateLongue = (d: Date) =>
  new Intl.DateTimeFormat('fr-BE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: tz }).format(d);

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
