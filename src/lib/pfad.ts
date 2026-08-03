/**
 * Baut einen Link relativ zum Basispfad der Seite.
 *
 * Auf GitHub Pages liegt die Seite unter /panetrisi/, lokal unter /. Alle
 * internen Links gehen deshalb durch diese Funktion, statt den Pfad zu raten.
 *
 *   pfad()                    → /panetrisi/
 *   pfad('rezepte/baguette')  → /panetrisi/rezepte/baguette
 */
export function pfad(ziel = ''): string {
  const basis = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const rest = ziel.replace(/^\/+/, '');
  return rest ? `${basis}/${rest}` : `${basis}/`;
}
