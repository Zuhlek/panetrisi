# panetrisi

Statische Seite mit Backrezepten. Reines HTML und ein einziges Stylesheet —
kein Build-Schritt, keine Abhängigkeiten.

Live: <https://zuhlek.github.io/panetrisi/>

## Aufbau

```
index.html            Startseite mit den Rezeptkarten
sauerteig.html        Einführung Sauerteig
grundlagen.html       Grundbegriffe und Grundrezept
komponenten.html      Baukasten: alle Bausteine mit Code zum Kopieren
404.html              Fehlerseite (eigenes, eingebettetes CSS)
rezepte/
  baguette.html       Baguetterezept
  vorlage.html        Kopiervorlage für neue Rezepte
assets/
  css/site.css        Das gesamte Layout. Änderungen passieren hier.
  js/kopieren.js      Nur für die Kopier-Knöpfe im Baukasten
  bilder/             Fotos und Grafiken
.github/workflows/    Deploy nach GitHub Pages
```

## Neues Rezept anlegen

1. `rezepte/vorlage.html` kopieren, zum Beispiel nach `rezepte/roggenbrot.html`.
2. Im `<head>` Titel und Beschreibung anpassen und die Zeile
   `<meta name="robots" content="noindex">` löschen.
3. Inhalt einsetzen. Die verfügbaren Bausteine stehen in
   [komponenten.html](komponenten.html) — dort jeweils mit Beispiel und Code.
4. In `index.html` eine Karte für das neue Rezept ergänzen.
5. Bilder nach `assets/bilder/` legen und im HTML mit `width` und `height`
   angeben, damit beim Laden nichts springt.

## Bausteine

Der Baukasten unter `komponenten.html` enthält Seitenkopf, Textabschnitte,
Listen (Aufzählung, Checkliste, Zutaten, Arbeitsschritte, Begriffe), vier
Panel-Varianten (Info, Tipp, Achtung, Zutaten), Zitate, Tabellen, Kennzahlen,
Bilder, Kartenraster, zwei Diagramme (Bäckerprozente, Zeitplan) sowie
Inhaltsverzeichnis und Vor-/Zurück-Navigation.

Die Diagramme sind reines CSS. Werte werden über Custom Properties gesetzt:

- **Bäckerprozente** — `--bp-max` am Container (grösster Wert, in der Regel 100),
  `--pct` an jeder Zeile.
- **Zeitplan** — `--gesamt` am Container (Gesamtdauer in Minuten), `--dauer` und
  `data-stufe` (1–6) an jeder Phase.

## Farben

Alle Farben stehen als Custom Properties zuoberst in `assets/css/site.css`,
jeweils für hell und dunkel. Die Seite folgt der Systemeinstellung; ein
`data-theme="light"` oder `data-theme="dark"` am `<html>` würde sie überstimmen,
falls später ein Umschalter dazukommt.

Die Diagrammfarben sind gegen die Flächenfarben geprüft (Helligkeitsband,
Chroma-Untergrenze, Kontrast, monotone Ordinalrampe). Wer sie ändert, sollte das
nachrechnen statt nach Augenmass gehen.

## Lokal anschauen

Ein Doppelklick auf `index.html` reicht. Wer einen Server möchte:

```sh
python3 -m http.server 8000
# http://localhost:8000
```

## Veröffentlichen

Jeder Push auf `main` (oder `master`) startet den Workflow unter
`.github/workflows/deploy.yml`. Der lädt das Repository unverändert hoch — es
gibt nichts zu bauen. Der Stand ist nach ein bis zwei Minuten live.

Der Deploy lässt sich im Actions-Tab auch von Hand starten.

### Eigene Domain

Bei einer eigenen Domain ändert sich der Basispfad von `/panetrisi/` auf `/`.
Betroffen ist nur `404.html`: dort sind die Pfade absolut, weil die Seite auch
unter Adressen wie `/panetrisi/gibt/es/nicht` ausgeliefert wird. Das Präfix
`/panetrisi` in dieser Datei entfernen, sonst nichts.

## Inhalt

Die Texte auf `sauerteig.html`, `grundlagen.html` und `rezepte/baguette.html`
stammen aus dem eigenen Notion-Dokument «Sauerteig Einführung».
