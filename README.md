# FORMORA – GitHub Pages

Dieses Paket ist vollständig für GitHub Pages vorbereitet.

## Diese Dateien müssen direkt ins Hauptverzeichnis des Repositories

- `index.html`
- `404.html`
- `.nojekyll`
- `README.md`

## GitHub Pages aktivieren

1. Repository auf GitHub öffnen.
2. **Settings** öffnen.
3. Links **Pages** auswählen.
4. Unter **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Speichern.
6. Kurz warten, bis GitHub die Pages-Adresse anzeigt.

Die `index.html` enthält bereits CSS und JavaScript direkt in der Datei.
Es werden deshalb keine extra CSS- oder JS-Ordner benötigt.

## Eigene Domain

Wenn später eine eigene Domain verbunden werden soll:
GitHub → Settings → Pages → Custom domain.

Danach muss beim Domain-Anbieter noch der passende DNS-Eintrag gesetzt werden.
