---
titel: ETH-Roboter wandert mit KI-Hilfe über 10 Kilometer durch die Alpen
lead: Das Robotic Systems Lab der ETH Zürich hat ein System namens ROAM entwickelt, das ein KI-Sprachmodell mit Bildverständnis nutzt. Damit ist es dem Team gelungen, dass sein vierbeiniger Roboter fast selbstständig kilometerweit durch die Alpen gewandert ist. Die Ergebnisse sind in der Fachzeitschrift Science Robotics erschienen.
datum: 2026-11-28
rubrik: forschung
autor: Filip Kucharko
bild: /bilder/anthony-rosset-EER1-E87V2k-unsplash.jpg
bildAlt: Wanderweg bei Zermatt mit Blick auf das Matterhorn (Symbolbild)
bildQuelle: Anthony Rosset / Unsplash
einordnung: |-
  Schon 2022 lief der ETH-Roboter allein auf den Etzel im Kanton Schwyz. Wohin er gehen sollte, musste ihm jedoch noch ein Mensch mitteilen. Neu ist nun, dass der Roboter die Situation selbst abwägt und seinen Weg selbst wählt.
  Für Roboter, die künftig Wege mit Menschen teilen, reicht es nicht aus, zwischen Felsen, Schildern und Lebewesen zu unterscheiden. Sie müssen auch wissen, wie sie sich der Situation entsprechend zu verhalten haben.
  Zugleich nennen die Forschenden Grenzen, an die sie gestoßen sind. Laut IT Boltwise funktioniert das System derzeit nur mit einer Internetverbindung, da das Sprachmodell in der Cloud läuft. Außerdem gilt schlechte Sicht, etwa durch Nebel, Regen oder Dunkelheit, noch als ungelöstes Problem. Im Paper schreiben die Forschenden selbst, dass Sprachmodelle noch keine vollständige Lösung sind.
  An diesem Punkt steht nicht nur das Team der ETH. Aktuelle Fachartikel beschreiben das räumliche Verständnis von Sprachmodellen als zentralen Engpass für Roboter. Viele Forschungsgruppen setzen deshalb wie ROAM auf eine Arbeitsteilung: Das Sprachmodell übernimmt die Einschätzung der Lage, die eigentliche Steuerung eine eigene Software.
quellen:
  - name: ROAM-Projektseite (ETH Zürich)
    url: https://roam-hiking.github.io/#hikes
  - name: IT Boltwise
    url: https://www.it-boltwise.de/roam-system-roboterhund-wandert-fast-allein-ueber-10-kilometer-in-den-alpen.html
  - name: Tagesspiegel
    url: https://www.tagesspiegel.de/wissen/wenn-die-ki-wandern-geht-schweizer-robo-hund-navigiert-autonom-durch-die-alpen-16300311.html
  - name: Netzwoche (2022)
    url: https://www.netzwoche.ch/news/2022-01-31/wie-roboter-wandern-lernen
  - name: Übersichtsarbeit zu Sprachmodellen in der Roboternavigation (arXiv, 2026)
    url: https://arxiv.org/html/2606.28760v1
aufmacher: false
entwurf: false
---

Das System ROAM (Robust Open-world Autonomous Mobility) basiert technisch auf der Trennung von Wahrnehmung und Bewegungssteuerung. Laut IT Boltwise sammelt der Roboter über mehrere Sensoren Signale, unter anderem über Hochkontrast-, Weitwinkel- und Tiefenkameras sowie Lidar. Diese Daten werden dann vom System interpretiert, und das Sprachmodell unterscheidet zwischen Lebewesen, Wanderwegen, Felsen oder Schildern. Für die erkannten Elemente wird jeweils ein Risikowert von 0 bis 1 gesetzt, aus dem das System eine Risikokarte erstellt. Aus dieser Karte leiten zwei trainierte Steuerungen die Bewegungen ab, die der Roboter dann ausführt. Die Bewegungssteuerung ist hochdynamisch und reagiert etwa 50-mal pro Sekunde, um die Stabilität aufrechtzuerhalten. Ganz im Gegensatz zum Sprachmodell, das nur etwa alle 10 Sekunden eine Antwort liefert.

Dem Paper zufolge wurden unter anderem zwei Langzeittests durchgeführt. Einer davon fand im August 2024 bei Zermatt auf einer Strecke von 10,1 Kilometern statt, mit 1.220 Metern Abstieg und unterschiedlichen Untergründen wie Kies, Fels, Wiese und Bahngleisen. Ein weiterer Test am Seealpsee führte über 2,38 Kilometer, wobei sich der Roboter die Wege mit Kühen und anderen Wanderern teilte. Laut den Forschenden waren insgesamt nur minimale Eingriffe nötig. Eine konkrete Zahl, wie oft eingegriffen wurde, nennt das Paper nicht.

Die Testbeispiele zeigen, dass das System nicht nur Hindernisse erkennt und ihnen ausweicht, sondern Wege auch kontextbasiert neu einschätzt. Laut IT Boltwise stand bei einem Test ein Schild, das auf eine Sperrung wegen Bauarbeiten hinwies. ROAM bewertete die Situation neu und wich stattdessen über eine benachbarte Wiese aus.
