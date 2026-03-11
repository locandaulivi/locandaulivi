# 🫒 Locanda Ulivi – Sito Web

Sito web ufficiale della **Locanda Ulivi**, Località Alpi 3, 37010 Cavaion Veronese (VR).

---

## 📁 Struttura del progetto

```
locanda-ulivi/
├── index.html          ← Pagina principale del sito
├── data.json           ← Dati di riferimento (non usato direttamente)
├── css/
│   └── style.css       ← Stile del sito
├── js/
│   ├── data.js         ← Tutti i contenuti modificabili (*)
│   └── app.js          ← Logica del sito
├── images/
│   └── stemma.png      ← Stemma/logo (caricabile dal pannello Admin)
├── admin/
│   ├── index.html      ← Pannello di amministrazione
│   ├── admin.css       ← Stile pannello admin
│   └── admin.js        ← Logica pannello admin
└── README.md
```

---

## 🔐 Pannello Admin

**URL:** `tuosito.com/admin/index.html`  
**Password predefinita:** `ulivi2025`

> La password si può cambiare dal pannello Admin → sezione "Sicurezza".

### Cosa si può fare dal pannello Admin:
| Sezione | Cosa si modifica |
|---|---|
| Info Generali | Nome, tagline, descrizione, indirizzo, telefono, email, social |
| Orari | Pranzo, cena, giorni di chiusura |
| Pranzo di Lavoro | Prezzo, incluso, descrizione, note |
| Menu | Tutti i piatti (aggiungi/modifica/elimina) per categoria |
| Vini | Tutta la carta dei vini |
| Foto | Upload drag & drop, riordina trascinando, elimina |
| Stemma | Carica/sostituisci lo stemma del locale |
| Prenotazioni | Visualizza e gestisci le prenotazioni ricevute |
| Sicurezza | Cambia password admin |

---

## 🚀 Guida per pubblicare su GitHub Pages

### 1. Crea un account GitHub
1. Vai su [github.com](https://github.com)
2. Clicca **Sign up** e segui la procedura
3. Verifica l'email

### 2. Crea un nuovo repository
1. Accedi a GitHub
2. Clicca il pulsante **"+"** in alto a destra → **New repository**
3. **Repository name:** `locanda-ulivi` (o il nome che preferisci)
4. Metti **Public** (necessario per GitHub Pages gratuito)
5. Spunta **"Add a README file"** ← NO (ne hai già uno)
6. Clicca **Create repository**

### 3. Carica i file (metodo semplice – senza usare il terminale)
1. Nella pagina del repository appena creato, clicca **"uploading an existing file"**
2. Trascina TUTTA la cartella `locanda-ulivi/` nella finestra  
   *(oppure clicca "choose your files" e seleziona tutti i file)*
3. Scrivi un messaggio di commit: `Prima versione sito`
4. Clicca **Commit changes**

> **Attenzione:** GitHub non accetta cartelle vuote. Assicurati che tutte le cartelle contengano almeno un file.

### 4. Attiva GitHub Pages
1. Nel tuo repository, clicca **Settings** (in alto)
2. Nel menu a sinistra clicca **Pages**
3. Sotto **"Source"** seleziona → **Deploy from a branch**
4. Sotto **"Branch"** seleziona → **main** | **/ (root)**
5. Clicca **Save**
6. Aspetta 1-3 minuti
7. Il tuo sito sarà live su: `https://TUONOMEUTENTE.github.io/locanda-ulivi/`

### 5. Aggiornare il sito in futuro
Per modificare file già caricati:
1. Vai nel repository su GitHub
2. Clicca sul file che vuoi modificare
3. Clicca l'icona ✏️ (matita) per editarlo online
4. Oppure clicca **Add file** → **Upload files** per sostituire file

---

## 💡 Metodo alternativo (con GitHub Desktop – consigliato)

Se devi aggiornare spesso il sito, usa [GitHub Desktop](https://desktop.github.com):
1. Scarica e installa GitHub Desktop
2. Accedi con il tuo account GitHub
3. **File** → **Clone repository** → seleziona `locanda-ulivi`
4. Trovi i file sul tuo computer: modifica, aggiungi foto ecc.
5. In GitHub Desktop clicca **Commit to main** → **Push origin**
6. Il sito si aggiorna automaticamente in pochi minuti

---

## 🌐 Dominio personalizzato (opzionale)

Per usare `www.locandaulivi.it` invece di `github.io`:
1. Acquista il dominio da un provider (es: Aruba, Register.it, GoDaddy)
2. Nelle impostazioni DNS del dominio, aggiungi:
   - Tipo: `CNAME` | Nome: `www` | Valore: `TUONOMEUTENTE.github.io`
3. In GitHub → Settings → Pages → **Custom domain** → inserisci il tuo dominio
4. Spunta **Enforce HTTPS**

---

## 📞 Dati del Locale (*)

> I campi con asterisco (*) sono modificabili dal pannello Admin senza toccare il codice.

- **Nome:** Locanda Ulivi
- **Indirizzo:** Località Alpi 3, 37010 Cavaion Veronese (VR), Italia
- **Telefono:** +39 045 000 0000 *
- **Email:** info@locandaulivi.it *
- **Google Maps:** https://maps.app.goo.gl/huveCtTqLNtj6pEF9

---

## 📝 Note tecniche

- Il sito è **completamente statico** (HTML + CSS + JS puro) – nessun server necessario
- I dati modificati dal pannello Admin vengono salvati nel **localStorage** del browser
- Le prenotazioni vengono salvate localmente (per un sistema di prenotazioni con email vera, contattare uno sviluppatore per integrare un servizio come EmailJS o Formspree)
- La mappa utilizza Google Maps embed con link diretto: https://maps.app.goo.gl/huveCtTqLNtj6pEF9

---

*Sito realizzato per Locanda Ulivi – Cavaion Veronese*
