# Osteria del Borgo: sito vetrina statico

HTML, CSS e JavaScript puri, senza build e senza WordPress. Il form usa una funzione serverless Vercel (`api/prenota.js`).

## Pubblicare
1. Crea un repository su GitHub e carica tutto il contenuto di questa cartella.
2. Su Vercel: Add New > Project, importa il repository. Framework Preset: **Other**, nessun build command.
3. Imposta le variabili d'ambiente (Settings > Environment Variables) e rifai il deploy:
   - `RESEND_API_KEY`: chiave API di [Resend](https://resend.com)
   - `BOOKING_TO`: email che riceve le richieste
   - `BOOKING_FROM`: mittente verificato su Resend (es. `Prenotazioni <prenotazioni@tuodominio.it>`)

## Personalizzare
- **Testi e dati**: indirizzo, telefono, email e orari sono già inseriti (footer e `contatti.html`). Menù, prezzi ed eventi sono ancora di esempio.
- **Menù**: `menu-ristorante.html`, `menu-pizze.html`, `menu-bere.html`, `caffe-amari.html`, `dolci.html`. **Eventi**: `news-eventi.html`.
- **Foto**: JPG in `images/` (formato verticale 3:4). Per cambiarne una, sostituisci il file mantenendo lo stesso nome.
- **Mappa**: iframe Google Maps in `contatti.html`, con l'indirizzo nel parametro `q`.
- **Colori e font**: variabili all'inizio di `css/style.css`.

## Provare in locale
`npx vercel dev` (il form richiede la funzione). Le pagine si aprono anche con un qualsiasi server statico, ma l'invio del form no.
