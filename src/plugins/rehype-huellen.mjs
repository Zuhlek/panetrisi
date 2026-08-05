/**
 * Zwei Hüllen, die Markdown selbst nicht ausdrücken kann.
 *
 * 1. Ein Bild, das allein in einem Absatz steht, wird zur <figure>. Der Titel
 *    im Markdown wird dabei zur Bildlegende:
 *
 *      ![Hände spannen den Teig auf](../bilder/fenstertest.jpg "Bestanden: hauchdünn, ohne zu reissen.")
 *
 * 2. Tabellen bekommen einen Rahmen, in dem sie auf schmalen Bildschirmen
 *    seitlich rollen können, ohne dass die ganze Seite wandert.
 *
 * Beide Male bleibt der ursprüngliche Knoten unangetastet, er wird nur umhüllt,
 * damit Astros Bildverarbeitung das <img> weiterhin findet.
 */
import { visit } from 'unist-util-visit';

const istLeererText = (knoten) =>
  knoten.type === 'text' && knoten.value.trim() === '';

const element = (tagName, properties, children) => ({
  type: 'element', tagName, properties, children,
});

export function rehypeHuellen() {
  return (baum) => {
    visit(baum, 'element', (knoten, index, eltern) => {
      if (!eltern || index === undefined) return;

      // Tabelle → rollbarer Rahmen
      if (knoten.tagName === 'table') {
        if (eltern.type === 'element' && eltern.tagName === 'div'
            && eltern.properties?.className?.includes?.('tabelle-rollen')) return;
        eltern.children[index] = element(
          'div', { className: ['tabelle-rollen'] }, [knoten],
        );
        return;
      }

      // Bild allein im Absatz → figure mit optionaler Legende
      if (knoten.tagName !== 'p') return;

      const inhalt = knoten.children.filter((k) => !istLeererText(k));
      if (inhalt.length !== 1) return;

      const bild = inhalt[0];
      if (bild.type !== 'element' || bild.tagName !== 'img') return;

      const legende = bild.properties?.title;
      if (legende) delete bild.properties.title;

      eltern.children[index] = element('figure', {}, [
        bild,
        ...(legende
          ? [element('figcaption', {}, [{ type: 'text', value: String(legende) }])]
          : []),
      ]);
    });
  };
}
