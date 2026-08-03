---
titel: Seiten schreiben
reihenfolge: 900
beschreibung: Wie eine neue Seite entsteht.
---

# Seiten schreiben

Jede Seite ist eine Markdown-Datei unter `src/inhalt/`. Der Ordnerbaum dort ist zugleich der Baum links und die Adressstruktur — es gibt keine Liste, die nachgeführt werden müsste. Eine neue Datei anlegen genügt, ein neuer Ordner erscheint automatisch als Gruppe.

```
src/inhalt/index.md             →  /
src/inhalt/sauerteig.md         →  /sauerteig/
src/inhalt/rezepte/baguette.md  →  /rezepte/baguette/
src/inhalt/bilder/              Bilder, keine Seiten
```

Es gibt keine Sondersyntax. Was in einer normalen Markdown-Datei steht, funktioniert — nicht mehr und nicht weniger. Die Dateien lassen sich in VS Code, auf GitHub oder in jedem anderen Betrachter genauso lesen wie hier.

## Der Kopf der Datei

Der Block zwischen den `---` ist freiwillig. Eine Datei ganz ohne funktioniert auch, dann kommt der Titel aus dem Dateinamen.

```yaml
---
titel: Baguette          # Beschriftung im Baum und im Browser-Tab
reihenfolge: 10          # Kleinere Zahl steht weiter oben, sonst alphabetisch
beschreibung: …          # Für Suchmaschinen und beim Teilen
---
```

Die Seitenüberschrift schreibt man als `# Titel` in den Text. Der erste Absatz danach wird automatisch etwas grösser gesetzt.

## Hinweise und Zitate

Ein Blockquote mit einem Emoji davor. Das ist gewöhnliches Markdown und wird überall gleich dargestellt.

```markdown
> 📌 Lagere den Teig in einem Gefäss, an dem sich die Volumenänderung ablesen lässt.
```

> 📌 Lagere den Teig in einem Gefäss, an dem sich die Volumenänderung ablesen lässt.

> 💡 Für Wissenswertes, 📌 für Erfahrungswerte, 🚨 für alles, was schiefgehen kann. Fett am Anfang gibt dem Kasten eine Überschrift.

> 🚨 **Achtung.** Wird der Teig beim Kneten wärmer als 28 Grad, kann sich das Glutennetzwerk zurückentwickeln.

## Bilder

Ein Bild, das allein in einer Zeile steht, wird zur Abbildung. Der Text in Anführungszeichen wird zur Legende, der in eckigen Klammern zum Alternativtext.

```markdown
![Hände spannen ein dünnes Teigfenster auf.](./bilder/fenstertest.jpg "Bestanden: hauchdünn, ohne zu reissen.")
```

![Hände spannen ein dünnes Teigfenster auf.](./bilder/fenstertest.jpg "Bestanden: hauchdünn, ohne zu reissen.")

Um Grösse und Format muss man sich nicht kümmern — beim Bauen wird auf WebP umgerechnet und verkleinert. Originale gehören nach `src/inhalt/bilder/`.

## Tabellen

Tabellen werden auf schmalen Bildschirmen seitlich rollbar. Eine mit `---:` rechtsbündig gesetzte Spalte bekommt Ziffern in gleicher Breite.

```markdown
| Zutat | Menge |
| --- | ---: |
| Mehl | 500 g |
| Wasser | 350 g |
```

| Zutat | Menge |
| --- | ---: |
| Mehl | 500 g |
| Wasser | 350 g |

## Links

Interne Links beginnen mit `/`, ohne `/panetrisi` davor — das Präfix setzt der Build. Die Sprungmarke hinter dem `#` ist die Überschrift in Kleinbuchstaben, Sonderzeichen werden zu Bindestrichen.

```markdown
Kneten, bis der [Fenstertest](/grundlagen#fenstertest) bestanden ist.
```

Kneten, bis der [Fenstertest](/grundlagen#fenstertest) bestanden ist.
