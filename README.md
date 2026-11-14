# Greifbar – Robotik aus dem DACH-Raum

Statische Nachrichtenseite (Astro) mit Redaktionsoberfläche (Sveltia CMS).
Kosten: 0 € Hosting (GitHub Pages) + Domain (ca. 10–15 € / Jahr).

## Aufbau

| Ordner / Datei | Inhalt |
|---|---|
| `src/content/artikel/` | Alle Artikel als Markdown-Dateien |
| `public/bilder/` | Alle Bilder |
| `src/rubriken.ts` | Liste der Rubriken |
| `src/styles/global.css` | Das gesamte Design |
| `public/admin/config.yml` | Felder der Redaktionsoberfläche |

Die Artikel mit `muster: true` sind Musterartikel. Vor dem Start löschen.

## Einmalige Einrichtung

1. **GitHub-Konto** anlegen (falls noch keines) und ein neues Repository `greifbar` erstellen.
2. Diesen Ordner hochladen:
   ```
   git init && git add . && git commit -m "Erste Version"
   git branch -M main
   git remote add origin https://github.com/DEIN-NAME/greifbar.git
   git push -u origin main
   ```
3. Im Repo: **Settings → Pages → Source: GitHub Actions**. Nach ca. 2 Minuten ist die Seite online.
4. In `public/admin/config.yml` bei `repo:` deinen GitHub-Namen eintragen.
5. **Domain verbinden** (greifbar.eu, bei United Domains): Im DNS-Bereich der Domain diese Einträge anlegen:
   | Typ | Name | Wert |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | DEIN-GITHUB-NAME.github.io |
   Danach auf GitHub unter Settings → Pages → Custom domain `greifbar.eu` eintragen und „Enforce HTTPS“ anhaken (kann bis zu 24 h dauern).
6. Impressum (`src/pages/impressum.astro`) und Kontaktadresse (`src/pages/ueber.astro`) ausfüllen.

## Artikel schreiben

1. `https://DEINE-DOMAIN/admin/` öffnen.
2. **Sign in with Token** wählen. Beim ersten Mal führt dich die Seite durch das Erstellen eines GitHub-Tokens
   (Fine-grained Token, nur für das Repo `greifbar`, Berechtigung *Contents: Read and write*).
3. **Neuer Artikel** → Titel, Lead, Rubrik, Bild + Bildquelle, Text, Einordnung, Quellen ausfüllen → **Speichern**.
4. Nach ca. 2 Minuten ist der Artikel online.

Tipp: „Entwurf“ anhaken, solange ein Artikel nicht fertig ist. Entwürfe erscheinen nicht auf der Seite.

## Lokal testen (optional)

```
npm install
npm run dev     # → http://localhost:4321
```
