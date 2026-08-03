# panetrisi

Betrachter für Backrezepte: links ein Dateibaum, rechts die gerenderte
Markdown-Datei. Geschrieben wird in VS Code, gebaut mit
[Astro](https://astro.build).

Live: <https://zuhlek.github.io/panetrisi/>

## Neue Seite anlegen

Eine `.md`-Datei unter `src/inhalt/` anlegen. Mehr nicht — der Ordnerbaum dort
ist zugleich die Navigation und die Adressstruktur:

```
src/inhalt/index.md             →  /
src/inhalt/sauerteig.md         →  /sauerteig/
src/inhalt/rezepte/baguette.md  →  /rezepte/baguette/
src/inhalt/bilder/              Bilder, keine Seiten
```

Ein neuer Ordner erscheint automatisch als Gruppe im Baum. Es gibt keine Liste,
die nachgeführt werden müsste.

**Reines Markdown, keine Sondersyntax.** Die Dateien lesen sich in VS Code, auf
GitHub und in jedem anderen Betrachter genauso wie auf der Website. Details auf
[/schreiben](https://zuhlek.github.io/panetrisi/schreiben/), Quelle:
`src/inhalt/schreiben.md`.

Freiwilliger Kopf für Titel und Sortierung:

```yaml
---
titel: Baguette
reihenfolge: 10
beschreibung: Ein Satz für Suchmaschinen.
---
```

Ohne Kopf funktioniert die Datei auch; der Titel kommt dann aus dem Dateinamen.

## Aufbau

```
src/inhalt/            Alle Seiten als Markdown
src/pages/[...pfad]    Eine Route für alles
src/layouts/Basis      Seitengerüst: Leiste links, Text rechts
src/components/        Dateibaum
src/lib/               Baum bauen, Basispfad setzen
src/plugins/           Zwei kleine Aufräumer (siehe unten)
src/styles/site.css    Das ganze Aussehen
```

## Die zwei Plugins

Beide ändern nichts an der Markdown-Syntax; sie räumen nur das fertige HTML auf.

- **`rehype-huellen.mjs`** — macht aus einem allein stehenden Bild eine
  `<figure>` (der Bildtitel wird zur Legende) und stellt Tabellen in einen
  seitlich rollbaren Rahmen, damit sie auf dem Handy nicht die Seite sprengen.
- **`rehype-basispfad.mjs`** — setzt `/panetrisi` vor interne Links. Im Markdown
  schreibt man `/grundlagen#fenstertest`, das Präfix steht nur in
  `astro.config.mjs`.

## Bilder

Originale nach `src/inhalt/bilder/` legen, im Markdown mit relativem Pfad
einbinden. Beim Bauen werden sie auf WebP umgerechnet und verkleinert.

## Lokal arbeiten

```sh
npm install
npm run dev        # http://localhost:4321/panetrisi
```

`npm run build` baut nach `dist/`, `npm run preview` zeigt das Ergebnis so, wie
es später live steht.

## Veröffentlichen

Jeder Push auf `main` startet `.github/workflows/deploy.yml`: `npm ci`,
`npm run build`, `dist/` nach GitHub Pages. Nach ein bis zwei Minuten ist der
Stand live. Bricht der Build ab, bleibt die alte Fassung online.

### Eigene Domain

`BASIS` in `astro.config.mjs` auf `'/'` setzen und `site` anpassen. Sonst
nichts — alle Links laufen über diese eine Stelle.

## Inhalt

Die Texte stammen aus dem eigenen Notion-Dokument «Sauerteig Einführung».
