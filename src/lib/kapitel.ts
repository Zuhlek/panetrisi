import { getCollection } from 'astro:content';
import { pfad } from './pfad';

export interface Kapitel {
  sammlung: 'wissen' | 'rezepte';
  id: string;
  titel: string;
  ziel: string;
}

const nachReihenfolge = (a: { data: { reihenfolge: number; titel: string } },
                         b: { data: { reihenfolge: number; titel: string } }) =>
  a.data.reihenfolge - b.data.reihenfolge || a.data.titel.localeCompare(b.data.titel, 'de');

export async function wissenseiten() {
  return (await getCollection('wissen')).sort(nachReihenfolge);
}

export async function rezeptseiten() {
  return (await getCollection('rezepte')).sort(nachReihenfolge);
}

/**
 * Alle Inhaltsseiten in Lesereihenfolge — Grundlagenwissen zuerst, dann die
 * Rezepte. Daraus entsteht die Vor-/Zurück-Navigation am Seitenende.
 */
export async function kapitelkette(): Promise<Kapitel[]> {
  const [wissen, rezepte] = await Promise.all([wissenseiten(), rezeptseiten()]);
  return [
    ...wissen.map((e): Kapitel => ({
      sammlung: 'wissen', id: e.id, titel: e.data.titel, ziel: pfad(`wissen/${e.id}`),
    })),
    ...rezepte.map((e): Kapitel => ({
      sammlung: 'rezepte', id: e.id, titel: e.data.titel, ziel: pfad(`rezepte/${e.id}`),
    })),
  ];
}

export function nachbarn(kette: Kapitel[], sammlung: Kapitel['sammlung'], id: string) {
  const stelle = kette.findIndex((k) => k.sammlung === sammlung && k.id === id);
  return {
    vorher: stelle > 0 ? kette[stelle - 1] : undefined,
    nachher: stelle >= 0 ? kette[stelle + 1] : undefined,
  };
}
