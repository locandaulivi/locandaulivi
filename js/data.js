// ============================================================
//  LOCANDA ULIVI – Dati del sito (modificabili)
// ============================================================
const SDATA = {
  ristorante: {
    nome:        "Locanda Ulivi",
    tagline:     "Dove ogni pasto è un ricordo",
    sottotitolo: "Cucina della tradizione veronese",
    descrizione: "Un luogo dove il tempo rallenta, tra i profumi della terra veronese e i sapori autentici di una cucina che racconta storie. La Locanda Ulivi è il rifugio perfetto per chi cerca qualità, calore e genuinità.",
    indirizzo:   "Località Alpi 3",
    cap:         "37010 Cavaion Veronese (VR)",
    telefono:    "+39 045 000 0000",
    email:       "locandaulivi2026@gmail.com",
    piva:        "IT00000000000",
    facebook:    "#",
    instagram:   "#"
  },
  orari: {
    pranzo: { giorni: "Lunedì – Venerdì", orario: "12:00 – 14:30" },
    cena:   { giorni: "Martedì – Sabato", orario: "19:30 – 22:30" },
    chiusura: "Domenica sera e tutto il Lunedì sera"
  },
  pranzo_lavoro: {
    titolo:      "Pranzo di Lavoro",
    prezzo:      "€ 15,00",
    descrizione: "Menu completo pensato per chi vuole pranzare bene senza perdere tempo. Dal lunedì al venerdì, dalle 12:00 alle 14:30.",
    incluso: ["Primo piatto a scelta","Secondo piatto a scelta","Contorno","Acqua 0,5L","Caffè"],
    note: "Vino e coperto non inclusi. Prenotazione consigliata."
  },
  menu: {
    antipasti: [
      { nome: "Tagliere di salumi e formaggi locali", prezzo: "12", descrizione: "Selezione di salumi veronesi e formaggi del territorio con miele e mostarda" },
      { nome: "Carpaccio di manzo con rucola e grana", prezzo: "11", descrizione: "Fettine di manzo crudo, rucola fresca, scaglie di Grana Padano e olio EVO" },
      { nome: "Bruschette al pomodoro fresco", prezzo: "7", descrizione: "Pane casereccio tostato con pomodoro fresco, basilico e aglio" },
      { nome: "Polenta e baccalà mantecato", prezzo: "10", descrizione: "Polenta morbida con baccalà mantecato alla veneziana" }
    ],
    primi: [
      { nome: "Bigoli all'anatra", prezzo: "14", descrizione: "Bigoli artigianali con ragù d'anatra e rosmarino" },
      { nome: "Risotto all'Amarone", prezzo: "16", descrizione: "Risotto Carnaroli mantecato con Amarone della Valpolicella" },
      { nome: "Tortelloni di ricotta e spinaci al burro e salvia", prezzo: "13", descrizione: "Pasta fresca ripiena con ricotta e spinaci, burro aromatizzato alla salvia" },
      { nome: "Tagliatelle al ragù di cinghiale", prezzo: "15", descrizione: "Tagliatelle fresche con ragù di cinghiale e bacche di ginepro" }
    ],
    secondi: [
      { nome: "Bollito misto con pearà", prezzo: "18", descrizione: "Classico bollito veronese con la tradizionale salsa pearà" },
      { nome: "Costine di maiale alla brace", prezzo: "17", descrizione: "Costine marinate e grigliate su brace di legno di ciliegio" },
      { nome: "Filetto di trota salmonata al limone", prezzo: "16", descrizione: "Filetto di trota del Garda con salsa al limone e capperi" },
      { nome: "Brasato all'Amarone con polenta", prezzo: "20", descrizione: "Guancia di manzo brasata nell'Amarone, servita con polenta" }
    ],
    contorni: [
      { nome: "Patate al forno con rosmarino", prezzo: "5", descrizione: "" },
      { nome: "Verdure grigliate di stagione", prezzo: "6", descrizione: "" },
      { nome: "Insalata mista dell'orto", prezzo: "4", descrizione: "" },
      { nome: "Radicchio veronese saltato", prezzo: "5", descrizione: "" }
    ],
    dolci: [
      { nome: "Tiramisù della casa", prezzo: "6", descrizione: "Ricetta tradizionale con mascarpone e savoiardi al caffè" },
      { nome: "Sbrisolona con zabaione", prezzo: "7", descrizione: "Sbrisolona mantovana con zabaione caldo al Marsala" },
      { nome: "Pannacotta con frutti di bosco", prezzo: "6", descrizione: "Crema di panna con coulis di frutti di bosco freschi" },
      { nome: "Gelato artigianale (3 palline)", prezzo: "5", descrizione: "Selezione del giorno di gelati artigianali locali" }
    ]
  },
  vini: [
    { nome: "Custoza DOC",                     tipo: "bianco",    produttore: "Cantina locale",           anno: "2023", prezzo: "18", descrizione: "Fresco e floreale, ideale con antipasti e pesce" },
    { nome: "Bardolino Classico DOC",          tipo: "rosso",     produttore: "Cantina del Garda",        anno: "2022", prezzo: "20", descrizione: "Leggero e fruttato, perfetto con primi e carni bianche" },
    { nome: "Valpolicella Ripasso DOC",        tipo: "rosso",     produttore: "Vigneti Veronesi",         anno: "2021", prezzo: "28", descrizione: "Corposo e speziato, ideale con carni e formaggi stagionati" },
    { nome: "Amarone della Valpolicella DOCG", tipo: "rosso",     produttore: "Castel San Giorgio",       anno: "2019", prezzo: "55", descrizione: "Il re dei vini veronesi, strutturato e persistente" },
    { nome: "Lugana DOC",                      tipo: "bianco",    produttore: "Riviera del Garda",        anno: "2023", prezzo: "22", descrizione: "Elegante e minerale, straordinario con il pesce di lago" },
    { nome: "Prosecco Superiore DOCG",         tipo: "bollicine", produttore: "Conegliano Valdobbiadene", anno: "NV",   prezzo: "16", descrizione: "Frizzante e delicato, perfetto come aperitivo" }
  ],
  galleria: {
    interno: [],
    esterno: [],
    piatti:  [],
    vini:    []
  }
};
