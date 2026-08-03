/**
 * Baut einen Link relativ zum Basispfad der Seite.
 *
 * Auf GitHub Pages liegt die Seite unter /panetrisi/, lokal unter /. Alle
 * internen Links gehen deshalb durch diese Funktion, statt den Pfad zu raten.
 *
 *   pfad()                    → /panetrisi/
 *   pfad('rezepte/baguette')  → /panetrisi/rezepte/baguette/
 *   pfad('favicon.svg')       → /panetrisi/favicon.svg
 *
 * Seitenadressen bekommen einen Schrägstrich am Ende, sonst antwortet GitHub
 * Pages mit einer Weiterleitung. Dateinamen (erkennbar an der Endung) nicht.
 */
export function pfad(ziel = ''): string {
  const basis = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const rest = ziel.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!rest) return `${basis}/`;

  const istDatei = /\.[a-z0-9]+$/i.test(rest);
  return `${basis}/${rest}${istDatei ? '' : '/'}`;
}
