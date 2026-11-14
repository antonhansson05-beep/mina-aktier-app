# Mina aktier – appen på hemskärmen

Ett litet skal som gör min aktie-dashboard till en app på telefonens hemskärm, med egen ikon och notiser.
Själva dashboarden körs på Streamlit och visas inuti skalet. Här finns inga uppgifter om portföljen.

- `index.html` – visar appen, sparar "kom ihåg mig" och slår på notiser
- `sw.js` – tar emot notiser och öppnar rätt sida när du trycker på dem
- `manifest.webmanifest` och ikonerna – namn och ikon på hemskärmen
