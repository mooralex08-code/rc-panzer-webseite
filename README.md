# RC Panzer Webseite – gemeinsame Admin-Version

Diese Version speichert Admin-Änderungen nicht mehr nur im Browser. Die öffentliche Webseite lädt ihre Inhalte aus `site-data.json`. Über `admin.html` kann diese Datei direkt im GitHub-Repository aktualisiert werden. Dadurch sehen alle Besucher dieselben Preise, Kontaktdaten, Panzer, Beiträge und Bilder.

## Neu
- Preise und Angebotsdaten werden für alle Besucher gemeinsam aktualisiert.
- E-Mail, Telefon und Kontakttexte werden für alle Besucher gemeinsam aktualisiert.
- Beliebig viele Panzer können im Admin-Bereich hinzugefügt und gelöscht werden.
- Beliebig viele Beiträge/Neuigkeiten können hinzugefügt und gelöscht werden.
- Bilder können bei Panzern, Teilen, Beiträgen und auf der Startseite ausgetauscht werden.
- Neue Bilder werden beim Speichern in `images/admin/` im GitHub-Repository hochgeladen.
- Der GitHub-Token wird nur in der aktuellen Browser-Sitzung gespeichert und nicht in die Webseite geschrieben.

## Installation auf GitHub Pages
1. Alle Dateien dieser Version in dein bestehendes GitHub-Pages-Repository hochladen und die alten Dateien ersetzen.
2. Prüfen, dass `site-data.json` im gleichen Ordner wie `index.html` liegt.
3. Webseite öffnen und über „Admin Login“ anmelden.
4. Im Admin-Bereich unter „GitHub-Verbindung“ Besitzer, Repository und Branch eintragen.
5. Einen Fine-grained GitHub Personal Access Token verwenden, der nur für dieses Repository freigeschaltet ist und bei Repository permissions mindestens `Contents: Read and write` besitzt.
6. „Verbindung testen“ klicken. Wenn `site-data.json` gefunden wird, ist die Verbindung korrekt.
7. Änderungen vornehmen und „Für alle speichern“ klicken.

GitHub Pages kann nach einem Commit kurz benötigen, bis die aktualisierte Version überall ausgeliefert wird. Die Webseite lädt `site-data.json` ohne Browser-Cache, damit Besucher danach die aktuelle Version erhalten.

## Sicherheit
GitHub Pages ist eine statische Webseite und kann keinen wirklich sicheren Benutzer-Login allein im Browser bereitstellen. Der Schreibschutz dieser Version kommt deshalb vom GitHub-Token: Ohne gültigen Token mit Schreibrecht können keine gemeinsamen Daten ins Repository gespeichert werden. Den Token niemals in `index.html`, JavaScript-Dateien oder `site-data.json` eintragen und nicht weitergeben.
