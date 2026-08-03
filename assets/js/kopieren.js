/* Kopier-Knöpfe für die Code-Beispiele im Baukasten.
   Progressive Verbesserung: Ohne JavaScript ist der Code weiterhin lesbar
   und markierbar, es fehlt lediglich der Knopf. */
(() => {
  if (!navigator.clipboard) return;

  for (const kasten of document.querySelectorAll('.demo-code')) {
    const code = kasten.querySelector('code');
    if (!code) continue;

    const knopf = document.createElement('button');
    knopf.type = 'button';
    knopf.className = 'kopier-knopf';
    knopf.textContent = 'Kopieren';

    knopf.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        knopf.textContent = 'Kopiert';
      } catch {
        knopf.textContent = 'Ging nicht';
      }
      setTimeout(() => { knopf.textContent = 'Kopieren'; }, 1600);
    });

    kasten.prepend(knopf);
  }
})();
