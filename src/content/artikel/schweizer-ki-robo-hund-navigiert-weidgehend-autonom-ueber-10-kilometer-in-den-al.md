---
titel: Schweizer KI Robo-Hund navigiert weidgehend autonom über 10 Kilometer in den Alpen
lead: Das Robotik Team der Robotic Systems Lab der ETH Zürich hat ein neues KI-Sprachmodell namens ROAM mit Bildverständnis entwickelt, womit es ihnen gelungen ist, dass ihr vierbeiniger Roboter fast selbständig kilometerweit durch die Alpen gewandert ist.
datum: 2026-11-27
rubrik: forschung
autor: Filip Kucharko
bild: ''
bildAlt: ''
bildQuelle: ''
einordnung: Das System hat aber auch seine Grenzen wie dass es eine ständige Cloud Verbindung benötigt wird oder bei schlechter Sicht, bspw. verursacht durch Nebel.
quellen:
  - name: Roam Projekt (inkl. Paper)
    url: https://roam-hiking.github.io/#hikes
  - name: IT Boltwise
    url: https://www.it-boltwise.de/roam-system-roboterhund-wandert-fast-allein-ueber-10-kilometer-in-den-alpen.html
  - name: Tagesspiegel
    url: https://www.tagesspiegel.de/wissen/wenn-die-ki-wandern-geht-schweizer-robo-hund-navigiert-autonom-durch-die-alpen-16300311.html
aufmacher: true
entwurf: true
---

Das System ROAM (Robust Open-world Autonomous Mobility) basiert technisch auf der Trenunng von Wahrnehmung und Mobilitätsmuster. Der Roboter sammelt über mehrere Sonsoren Signale wie u.a. durch Hochkontrastkameras, Tiefenkameras und Lidar Systeme. Diese Daten werden dann durch das System Interpretiert und das Sprachmodell differenziert zwischen Lebewesen, Wanderwegen, Felsen oder Schildern. Für die erkannten Elemente wird jeweils ein Risikowert von 0 bis 1 gesetzt aus dem das System eine Risikokarte erstellt. Aus dem gewonnen Wissen werden Handlungen abgeleitet die dann der Roboter ausführen soll. Die Bewegungssteuerung ist bei dem eingesetzten Robotern hochdynamisch und reagiert etwa 50-mal pro Sekunde um Stabilität aufrecht zu erhalten. Ganz im Gegenteil zum Sprachmodell das nur etwa alle 10 Sekunden eine Antwort liefert. 

Dem Paper zufolge wurden 2 konkrete Langzeittests durchgeführt. Einer dieser Tests fand im Sommer 2024 in Zermatt auf einer Strecke von 10,1 Kilometern mit unterschiedlichen Steigungen, Bodenformen und Texturen wie Kies, Fels, Wiese und auf Bahngleise statt. Ein weiterer Test am Seealpsee wurde auf einer Strecke von 2,38 Kilometern durchgeführt, bei dem Wege mit Kühen und anderen Wanderern geteilt wurden. Bei Beiden Überprüfungen mussten laut den Forschenden "minimale Eingriffe" unternommen werden. Eine konrete Zahl, wie oft eingegriffen wurde nennt das Paper nicht.

Die Testbeispiele zeigten, dass das System nicht nur Hindernisse erkennt und ausweicht, sondern auch Wege kontextbasiert neu einschätzt. Wenn aufgrund von Bauarbeiten ein Schild mit Informationen zu einer Sperrung aufgestellt ist, bewertet ROAM die Situation neu und weicht stattdessen über eine benachbarte Wiese aus. Für den Praxis Einsatz sind solche Testsitationen vor allem Wichtig, da nicht alle Fälle in der realen Welt abgedeckt werden können und das System selbständig entscheiden muss ohne das es stecken bleibt.
