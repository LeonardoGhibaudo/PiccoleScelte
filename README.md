# Piccole Scelte 🎮

Benvenuto in **Piccole Scelte**, una visual novel interattiva e un "serious game" sviluppato appositamente per ragazzi con **ADHD** (Sindrome da Deficit di Attenzione e Iperattività). 

Il videogioco si propone come uno strumento terapeutico e di supporto, ideato per mettere i giocatori di fronte a situazioni quotidiane per loro potenzialmente difficili o stressanti. Attraverso scelte mirate, l'obiettivo è guidare i ragazzi a comprendere l'impatto delle proprie decisioni e a trovare strategie per uscire da momenti di tensione in modo controllato, riflessivo e tranquillo.

## 🚀 Funzionalità Principali

- **Serious Gaming per l'ADHD:** Scenari simulati (scuola, trasporti pubblici, interazioni sociali) pensati per allenare l'autoregolazione, la gestione dell'impulsività e l'intelligenza emotiva.
- **Narrativa Ramificata Terapeutica:** Ogni decisione presa influisce sull'andamento della storia. Sbagliare fa parte del percorso: il gioco permette di esplorare le conseguenze delle proprie azioni in un ambiente sicuro e protetto.
- **Sfondi Immersivi Quotidiani:** Ambientazioni grafiche familiari per i ragazzi (camera da letto, autobus, aula scolastica, corridoio) per aumentare l'immedesimazione.
- **Integrazione Clinica e Sistema Paywall:**
  - I livelli avanzati di base sono protetti da un *paywall* (in fase di implementazione).
  - **Sblocco Clinico:** I contenuti bloccati possono essere attivati direttamente dalla **psicologa** o dal terapeuta che ha commissionato il gioco. Questo permette al professionista di sbloccare i livelli pertinenti durante le sedute, integrando il videogioco nel percorso terapeutico personalizzato del ragazzo.

## 📂 Struttura del Progetto

Il progetto è organizzato nel seguente modo:

```text
PiccoleScelte/
├── public/
│   └── assets/
│       └── backgrounds/       # Ambientazioni dei contesti difficili quotidiani
│           ├── bg_bedroom.jpg   # Gestione della routine e dello spazio personale
│           ├── bg_bus.jpg       # Gestione dello stress nei trasporti e stimoli esterni
│           ├── bg_classroom.jpg # Situazioni scolastiche, focus e interazione con i docenti
│           ├── bg_friends_*.jpg # Dinamiche sociali, peer-pressure e conflitti
│           ├── bg_hallway.jpg   # Transizioni tra ambienti e momenti di pausa
│           └── bg_home_*.jpg    # Contesto familiare e gestione dei compiti/regole
├── eslint.config.js           # Configurazione per la qualità del codice (Linter)
├── index.html                 # Punto di ingresso dell'applicazione web
├── package.json               # Dipendenze e script del progetto
└── package-lock.json          # Blocco delle versioni delle dipendenze
```

## 🛠️ Requisiti e Installazione

Per eseguire il progetto in locale, assicurati di avere [Node.js](https://nodejs.org/) installato sul tuo computer.

1. **Clona la repository o estrai i file:**
   ```bash
   git clone <url-repository>
   cd PiccoleScelte
   ```

2. **Installa le dipendenze:**
   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo:**
   ```bash
   npm run dev
   ```

4. **Apri il browser:**
   Apri l'indirizzo locale mostrato nel terminale (solitamente `http://localhost:5173`).

## ⚙️ Strumenti di Sviluppo

- **Linting:** Il progetto utilizza **ESLint** per garantire uno stile di codice pulito, robusto e privo di errori. Puoi verificare la conformità del codice eseguendo:
  ```bash
  npm run lint
  ```

---
*Sviluppato con l'obiettivo di trasformare le scelte quotidiane in un'opportunità di crescita, autocontrollo e serenità.*