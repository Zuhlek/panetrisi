/**
 * Setzt den Basispfad vor interne Links, die im Markdown mit "/" beginnen.
 *
 *   [Fenstertest](/wissen/grundlagen#fenstertest)
 *   → /panetrisi/wissen/grundlagen#fenstertest
 *
 * Damit steht das Präfix nur einmal in `astro.config.mjs` und nicht in jeder
 * Markdown-Datei. Externe Adressen, Anker und Protokoll-Links bleiben unberührt.
 */
import { visit } from 'unist-util-visit';

const FELDER = { a: 'href', img: 'src', source: 'src', video: 'src', audio: 'src' };

export function rehypeBasispfad(optionen = {}) {
  const basis = (optionen.basis ?? '/').replace(/\/+$/, '');
  if (!basis) return () => {};

  return (baum) => {
    visit(baum, 'element', (knoten) => {
      const feld = FELDER[knoten.tagName];
      if (!feld) return;

      const wert = knoten.properties?.[feld];
      if (typeof wert !== 'string') return;
      // Nur absolute interne Pfade, nicht "//host" und nicht bereits präfixierte
      if (!wert.startsWith('/') || wert.startsWith('//')) return;
      if (wert === basis || wert.startsWith(`${basis}/`)) return;

      knoten.properties[feld] = `${basis}${wert}`;
    });
  };
}
