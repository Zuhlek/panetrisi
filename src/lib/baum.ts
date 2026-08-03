import { getCollection } from 'astro:content';
import { pfad } from './pfad';

export interface Knoten {
  /** Beschriftung im Dateibaum. */
  titel: string;
  /** Adresse — fehlt bei Ordnern. */
  ziel?: string;
  /** Sammlungs-ID der Seite, für die Hervorhebung der aktuellen Seite. */
  id?: string;
  kinder: Knoten[];
  reihenfolge: number;
}

/** "roggen-sauerteigbrot" → "Roggen sauerteigbrot" */
function ausDateiname(name: string): string {
  const wörter = name.replace(/[-_]+/g, ' ').trim();
  return wörter.charAt(0).toUpperCase() + wörter.slice(1);
}

function vergleich(a: Knoten, b: Knoten): number {
  return a.reihenfolge - b.reihenfolge || a.titel.localeCompare(b.titel, 'de');
}

function sortiere(knoten: Knoten[]): Knoten[] {
  knoten.sort(vergleich);
  for (const k of knoten) if (k.kinder.length) sortiere(k.kinder);
  return knoten;
}

/**
 * Baut aus den Dateipfaden den Navigationsbaum. Ordner entstehen von selbst,
 * sobald eine Datei darin liegt — es gibt keine Liste, die nachgeführt wird.
 */
export async function dateibaum(): Promise<Knoten[]> {
  const eintraege = await getCollection('seiten');
  const wurzel: Knoten[] = [];

  for (const eintrag of eintraege) {
    // "index" ist die Startseite und gehört nicht als Eintrag in den Baum
    if (eintrag.id === 'index') continue;

    const teile = eintrag.id.split('/');
    let ebene = wurzel;

    teile.forEach((teil, i) => {
      const istBlatt = i === teile.length - 1;

      if (!istBlatt) {
        let ordner = ebene.find((k) => k.titel === ausDateiname(teil) && !k.ziel);
        if (!ordner) {
          ordner = { titel: ausDateiname(teil), kinder: [], reihenfolge: 500 };
          ebene.push(ordner);
        }
        ebene = ordner.kinder;
        return;
      }

      ebene.push({
        titel: eintrag.data.titel ?? ausDateiname(teil),
        ziel: pfad(eintrag.id),
        id: eintrag.id,
        kinder: [],
        reihenfolge: eintrag.data.reihenfolge ?? 100,
      });
    });
  }

  return sortiere(wurzel);
}
