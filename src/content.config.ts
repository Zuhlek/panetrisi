import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Eine Kachel in der Kennzahlenleiste: «Hydration · 77 %» */
const kennzahl = z.object({
  label: z.string(),
  wert: z.string(),
  einheit: z.string().optional(),
});

/** Ein Posten in der Zutatenliste — oder ein Trenner wie «oder». */
const posten = z.union([
  z.object({ trenner: z.string() }),
  z.object({
    name: z.string(),
    menge: z.string().optional(),
    hinweis: z.string().optional(),
  }),
]);

/** Zutaten werden in Gruppen gegliedert, zwischen den Gruppen entsteht Luft. */
const zutatengruppe = z.object({
  posten: z.array(posten).min(1),
});

const baeckerprozente = z.object({
  titel: z.string().default('Bäckerprozente'),
  unterzeile: z.string().optional(),
  legende: z.string().optional(),
  /** Grösster Wert im Diagramm, in der Regel das Mehl mit 100. */
  max: z.number().default(100),
  werte: z.array(z.object({
    name: z.string(),
    wert: z.number(),
    /** Abweichende Beschriftung, sonst wird der Wert formatiert. */
    anzeige: z.string().optional(),
  })).min(1),
});

const zeitplan = z.object({
  titel: z.string().default('Zeitplan'),
  unterzeile: z.string().optional(),
  legende: z.string().optional(),
  /** Die Farbstufe ergibt sich aus der Position — früh hell, spät dunkel. */
  phasen: z.array(z.object({
    name: z.string(),
    minuten: z.number().positive(),
    anzeige: z.string().optional(),
  })).min(2),
});

const gemeinsam = {
  titel: z.string(),
  kicker: z.string().optional(),
  lead: z.string(),
  beschreibung: z.string().optional(),
  reihenfolge: z.number().default(100),
  /** Inhaltsverzeichnis aus den H2-Überschriften erzeugen. */
  verzeichnis: z.boolean().default(false),
};

const wissen = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/inhalt/wissen' }),
  schema: ({ image }) =>
    z.object({
      ...gemeinsam,
      bild: image().optional(),
      bildAlt: z.string().default(''),
      kartentext: z.string().optional(),
      kartenmeta: z.array(z.string()).default([]),
    }),
});

const rezepte = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/inhalt/rezepte' }),
  schema: ({ image }) =>
    z.object({
      ...gemeinsam,
      kicker: z.string().default('Rezept'),
      bild: image().optional(),
      bildAlt: z.string().default(''),
      kartentext: z.string().optional(),
      kartenmeta: z.array(z.string()).default([]),
      kennzahlen: z.array(kennzahl).default([]),
      zutaten: z.array(zutatengruppe).default([]),
      baeckerprozente: baeckerprozente.optional(),
      zeitplan: zeitplan.optional(),
    }),
});

export const collections = { wissen, rezepte };
