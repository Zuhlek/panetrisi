/**
 * Übersetzt Container-Direktiven in die Bausteine aus `site.css`.
 *
 * Panels — vier Sorten, Titel und Icon optional:
 *
 *   :::tipp[Die Fingerprobe]
 *   Drückt man mit dem Finger leicht in den Teig …
 *   :::
 *
 *   :::info{icon="💦"}
 *   Der Wassergehalt wird im Verhältnis zum frischen Mehl angegeben.
 *   :::
 *
 * Arbeitsschritte — nummerierte Liste mit Kreis-Ziffern:
 *
 *   :::schritte
 *   1. ### Autolyse
 *
 *      Mehl und Wasser vermengen und 60 Minuten ruhen lassen.
 *   :::
 */
import { visit, SKIP } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

const PANELS = {
  info:    { klasse: 'panel--info',    icon: '💡' },
  tipp:    { klasse: 'panel--tipp',    icon: '📌' },
  achtung: { klasse: 'panel--achtung', icon: '🚨' },
  zutaten: { klasse: 'panel--zutaten', icon: '📃' },
};

/** Hüllt Kindknoten in ein beliebiges Element, ohne die Kinder anzufassen. */
function huelle(tag, klasse, kinder, weitereEigenschaften = {}) {
  return {
    type: 'paragraph', // durch hName ersetzt, erlaubt aber Blockkinder
    data: {
      hName: tag,
      hProperties: { className: [klasse], ...weitereEigenschaften },
    },
    children: kinder,
  };
}

function baueLabel(knoten) {
  const erstes = knoten.children[0];
  if (erstes?.type === 'paragraph' && erstes.data?.directiveLabel) {
    return { titel: toString(erstes), kinder: knoten.children.slice(1) };
  }
  return { titel: undefined, kinder: knoten.children };
}

function panel(knoten, typ) {
  const attribute = knoten.attributes ?? {};
  const { titel: ausLabel, kinder } = baueLabel(knoten);
  const titel = ausLabel ?? attribute.titel;

  knoten.data = {
    hName: 'div',
    hProperties: { className: ['panel', typ.klasse] },
  };

  knoten.children = [
    huelle('span', 'panel-icon', [{ type: 'text', value: attribute.icon ?? typ.icon }],
           { 'aria-hidden': 'true' }),
    titel ? huelle('p', 'panel-titel', [{ type: 'text', value: titel }]) : null,
    huelle('div', 'panel-inhalt', kinder),
  ].filter(Boolean);
}

/** Listen, die eine Klasse brauchen. Der Container löst sich danach auf. */
const LISTEN = {
  schritte:   { klasse: 'schritte',   nummeriert: true },
  checkliste: { klasse: 'checkliste', nummeriert: false },
};

function liste(knoten, art, index, eltern, datei) {
  const treffer = knoten.children.find(
    (k) => k.type === 'list' && (!art.nummeriert || k.ordered),
  );
  if (!treffer) {
    const was = art.nummeriert ? 'eine nummerierte Liste' : 'eine Liste';
    datei.message(`":::${art.klasse}" erwartet ${was}.`, knoten);
    return;
  }
  treffer.data = {
    ...treffer.data,
    hProperties: { ...(treffer.data?.hProperties ?? {}), className: [art.klasse] },
  };
  // Container verschwindet, damit im Markup kein leeres <div> übrig bleibt
  eltern.children.splice(index, 1, ...knoten.children);
  return [SKIP, index];
}

export function remarkBausteine() {
  return (baum, datei) => {
    visit(baum, (knoten, index, eltern) => {
      if (knoten.type !== 'containerDirective') return;

      const art = LISTEN[knoten.name];
      if (art) {
        if (eltern && index !== undefined) return liste(knoten, art, index, eltern, datei);
        return;
      }

      const typ = PANELS[knoten.name];
      if (typ) return panel(knoten, typ);

      const bekannt = [...Object.keys(PANELS), ...Object.keys(LISTEN)].join(', ');
      datei.message(
        `Unbekannte Direktive ":::${knoten.name}". Möglich sind: ${bekannt}.`,
        knoten,
      );
    });
  };
}
