import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Alle Seiten der Website. Der Ordnerbaum unter src/inhalt/ ist zugleich die
 * Navigation und die Adressstruktur:
 *
 *   src/inhalt/index.md            → /
 *   src/inhalt/sauerteig.md        → /sauerteig/
 *   src/inhalt/rezepte/baguette.md → /rezepte/baguette/
 *
 * Frontmatter ist freiwillig. Eine Datei ohne alles funktioniert; der Titel
 * kommt dann aus dem Dateinamen.
 */
const seiten = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/inhalt' }),
  schema: z.object({
    /** Beschriftung im Dateibaum und im Browser-Tab. Sonst der Dateiname. */
    titel: z.string().optional(),
    /** Kleinere Zahl steht im Baum weiter oben. Sonst alphabetisch. */
    reihenfolge: z.number().optional(),
    /** Für Suchmaschinen und beim Teilen. */
    beschreibung: z.string().optional(),
  }),
});

export const collections = { seiten };
