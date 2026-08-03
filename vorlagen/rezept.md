---
# Kopiere diese Datei nach src/inhalt/rezepte/ und benenne sie um.
# Der Dateiname wird zur Adresse: roggenbrot.md → /rezepte/roggenbrot
#
# Alle Felder ausser titel und lead sind freiwillig. Was leer bleibt,
# wird auf der Seite auch nicht angezeigt.
# Referenz mit Beispielen: /schreiben

titel: Name des Brotes
lead: >-
  Ein bis zwei Sätze: Was ist das für ein Brot, was macht es besonders,
  wie viel ergibt das Rezept.

reihenfolge: 100
bild: ../bilder/platzhalter-ersetzen.jpg
bildAlt: Beschreibung des Bildes für Screenreader.
kartentext: Kurztext für die Kachel auf der Startseite.
kartenmeta:
  - 00 % Hydration
  - ca. 00 h

kennzahlen:
  - { label: "Hydration", wert: "00",  einheit: "%" }
  - { label: "Ofen",      wert: "000", einheit: "°C" }
  - { label: "Backzeit",  wert: "00",  einheit: "Min." }
  - { label: "Gesamt",    wert: "00",  einheit: "Std." }

# Achtung: Werte mit Komma gehören in Anführungszeichen ("2,5 g").
zutaten:
  - posten:
      - { name: "Mehl",   menge: "000 g" }
      - { name: "Wasser", menge: "000 g" }
  - posten:
      - { name: "Sauerteig", menge: "000 g" }
      - { name: "Salz",      menge: "00 g" }

# Weglassen, wenn kein Diagramm gewünscht ist.
baeckerprozente:
  unterzeile: Alle Zutaten im Verhältnis zum Rezeptmehl (000 g = 100 %)
  max: 100
  werte:
    - { name: "Mehl",      wert: 100 }
    - { name: "Wasser",    wert: 0 }
    - { name: "Sauerteig", wert: 0 }
    - { name: "Salz",      wert: 0 }

zeitplan:
  titel: Vom Anrühren bis aus dem Ofen
  unterzeile: Rund 00 Stunden, davon etwa 00 Minuten aktive Arbeit
  phasen:
    - { name: "Autolyse",  minuten: 60 }
    - { name: "Kneten",    minuten: 20 }
    - { name: "Stockgare", minuten: 180 }
    - { name: "Kaltgare",  minuten: 600 }
    - { name: "Formen",    minuten: 90 }
    - { name: "Backen",    minuten: 35 }
---

## Vorgehen

::::schritte
1. ### Erster Schritt

   Was zu tun ist.

2. ### Zweiter Schritt

   Was zu tun ist.

   :::tipp
   Erfahrungswert, der an dieser Stelle hilft. Panels gibt es als
   info, tipp, achtung und zutaten.
   :::
::::
