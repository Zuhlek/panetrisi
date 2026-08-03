# panetrisi

Statische Seite mit Backrezepten. Inhalte werden in Markdown geschrieben, gebaut
wird mit [Astro](https://astro.build).

Live: <https://zuhlek.github.io/panetrisi/>

## Neues Rezept anlegen

1. `vorlagen/rezept.md` nach `src/inhalt/rezepte/` kopieren und umbenennen.
   Der Dateiname wird zur Adresse: `roggenbrot.md` → `/rezepte/roggenbrot`.
2. Frontmatter ausfüllen, Text schreiben.
3. Bilder nach `src/inhalt/bilder/` legen — unverändert, um die Grösse kümmert
   sich der Build.

Mehr braucht es nicht. Die Kachel auf der Startseite, die Navigation und die
Vor-/Zurück-Links entstehen automatisch aus den Dateien; es gibt keine Liste,
die nachgeführt werden müsste.

Eine Wissensseite entsteht genauso aus `vorlagen/wissen.md` in
`src/inhalt/wissen/`.

**Die vollständige Referenz mit Beispielen steht auf der Seite selbst:**
[/schreiben](https://zuhlek.github.io/panetrisi/schreiben) —
Quelle: `src/pages/schreiben.mdx`.

## Aufbau

```
src/inhalt/wissen/     Grundlagenseiten (Markdown)
src/inhalt/rezepte/    Rezepte (Markdown)
src/inhalt/bilder/     Fotos und Grafiken im Original
src/content.config.ts  Schema des Frontmatters — Tippfehler brechen den Build
src/components/        Kennzahlen, Zutaten, die zwei Diagramme, Karte, Navigation
src/layouts/           Seitengerüst, Wissens- und Rezeptlayout
src/pages/             Startseite, Übersichten, Referenz, 404
src/plugins/           Drei kleine Markdown-Erweiterungen (siehe unten)
src/styles/site.css    Das gesamte Layout. Gestaltungsänderungen passieren hier.
vorlagen/              Kopiervorlagen
public/                Wird unverändert ausgeliefert (Favicon, Platzhalterbild)
```

## Markdown-Erweiterungen

Drei kleine Plugins in `src/plugins/` schliessen die Lücken zwischen Markdown
und dem Gestaltungsraster:

- **`remark-bausteine.mjs`** — übersetzt `:::info`, `:::tipp`, `:::achtung`,
  `:::zutaten`, `:::schritte` und `:::checkliste` in die Bausteine aus
  `site.css`.
- **`rehype-huellen.mjs`** — macht aus einem allein stehenden Bild eine
  `<figure>` (Bildtitel wird zur Legende) und stellt Tabellen in einen
  seitlich rollbaren Rahmen.
- **`rehype-basispfad.mjs`** — setzt `/panetrisi` vor interne Links. Im Markdown
  schreibt man `/wissen/grundlagen#fenstertest`, das Präfix steht nur in
  `astro.config.mjs`.

Begriffslisten (`Begriff` / `:   Erklärung`) kommen von
`remark-definition-list`.

## Diagramme

Bäckerprozente und Zeitplan sind reines CSS, ohne Diagramm-Bibliothek. Beide
werden im Frontmatter beschrieben, nicht im Text. Die Farbstufen des Zeitplans
ergeben sich aus der Reihenfolge der Phasen — früh hell, spät dunkel.

## Farben

Alle Farben stehen als Custom Properties zuoberst in `src/styles/site.css`,
jeweils für hell und dunkel. Die Seite folgt der Systemeinstellung; ein
`data-theme="light"` oder `data-theme="dark"` am `<html>` würde sie überstimmen,
falls später ein Umschalter dazukommt.

Die Diagrammfarben sind gegen die Flächenfarben geprüft (Helligkeitsband,
Chroma-Untergrenze, Kontrast, monotone Ordinalrampe). Wer sie ändert, sollte das
nachrechnen statt nach Augenmass gehen.

## Lokal arbeiten

```sh
npm install
npm run dev        # http://localhost:4321/panetrisi
```

Der Entwicklungsserver lädt bei jeder Änderung neu. `npm run build` baut nach
`dist/`, `npm run preview` zeigt das Ergebnis so, wie es später live steht.

## Veröffentlichen

Jeder Push auf `main` (oder `master`) startet den Workflow unter
`.github/workflows/deploy.yml`: `npm ci`, `npm run build`, `dist/` nach GitHub
Pages. Der Stand ist nach ein bis zwei Minuten live. Der Deploy lässt sich im
Actions-Tab auch von Hand starten.

Bricht der Build wegen eines Fehlers im Frontmatter ab, wird nichts
veröffentlicht — die alte Fassung bleibt online stehen.

### Eigene Domain

Bei einer eigenen Domain ändert sich der Basispfad von `/panetrisi/` auf `/`.
Dafür in `astro.config.mjs` `BASIS` auf `'/'` setzen und `site` anpassen. Sonst
nichts — alle Links laufen über diese eine Stelle.

## Inhalt

Die Texte unter `src/inhalt/` stammen aus dem eigenen Notion-Dokument
«Sauerteig Einführung».
