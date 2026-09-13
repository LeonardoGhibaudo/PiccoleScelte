import type { Scenario } from '../types';

export const CHAPTERS_21_25: Record<string, Scenario> = {
  // CHAPTER 21
  "scen-friends-party-1": {
    id: "scen-friends-party-1",
    title: "La Festa a Sorpresa",
    description: "Sei appena arrivato alla festa di un tuo amico, ma la musica è fortissima e ci sono troppe persone.",
    dialogue: [{ speaker: "Amico", text: "Ehi! Finalmente sei arrivato, entra c'è un sacco di gente!" }],
    background: "/assets/backgrounds/bg_home.jpg",
    character: "/assets/characters/friend.png",
    characterName: "Amico",
    isStartingNode: true,
    choices: [
      {
        id: "c21-1-1",
        text: "Spingi via le persone per entrare e urli di abbassare la musica.",
        type: "impulsive",
        emoji: "🤬",
        consequence: "Fai una scenata e tutti si girano a guardarti male. Il tuo amico ci resta malissimo.",
        betterAlternative: "Prova a chiedere con calma o a prenderti un momento di pausa prima di entrare nel caos.",
        nextScenarioId: "scen-friends-party-2",
        isCriticalFailure: true
      },
      {
        id: "c21-1-2",
        text: "Sorridi, saluti e gli dici che sei felice di esserci, cercando un posto più tranquillo.",
        type: "assertive",
        emoji: "😊",
        consequence: "Riesci a salutare tutti senza farti sopraffare e trovi un angolo meno caotico per ambientarti.",
        betterAlternative: "",
        nextScenarioId: "scen-friends-party-2"
      },
      {
        id: "c21-1-3",
        text: "Non dici niente e ti nascondi subito dietro al divano sperando che nessuno ti veda.",
        type: "passive",
        emoji: "🙈",
        consequence: "Passi inosservato ma il tuo amico pensa che tu te ne sia andato subito.",
        betterAlternative: "Cerca di comunicare al tuo amico che hai bisogno di un po' di tranquillità.",
        nextScenarioId: "scen-friends-party-2"
      },
      {
        id: "c21-1-4",
        text: "Gli chiedi se c'è un posto dove puoi posare il giubbotto per abituarti un attimo al rumore.",
        type: "assertive",
        emoji: "🧥",
        consequence: "Il tuo amico capisce e ti mostra una stanza più silenziosa per qualche minuto.",
        betterAlternative: "",
        nextScenarioId: "scen-friends-party-2"
      },
      {
        id: "c21-1-5",
        text: "Ti giri e te ne vai senza dire una parola.",
        type: "impulsive",
        emoji: "🏃",
        consequence: "Il tuo amico si offende e pensa che tu ce l'abbia con lui.",
        betterAlternative: "Invece di fuggire, prova a spiegare come ti senti o cerca un angolo tranquillo.",
        nextScenarioId: "scen-friends-party-2",
        isCriticalFailure: true
      },
      {
        id: "c21-1-6",
        text: "Annuisci fingendo che vada tutto bene mentre senti il cuore a mille.",
        type: "passive",
        emoji: "😬",
        consequence: "L'ansia sale rapidamente perché non stai rispettando i tuoi bisogni.",
        betterAlternative: "Non forzarti a mascherare il disagio, cerca una soluzione per sentirti meglio.",
        nextScenarioId: "scen-friends-party-2"
      }
    ]
  },
  "scen-friends-party-2": {
    id: "scen-friends-party-2",
    title: "Sovraccarico Sensoriale",
    description: "Il rumore è troppo. Senti le voci mescolate alla musica e le luci lampeggianti ti infastidiscono.",
    dialogue: [{ speaker: "Compagno", text: "Vieni a ballare al centro della stanza! Dai, non fare l'asociale!" }],
    background: "/assets/backgrounds/bg_home.jpg",
    character: "/assets/characters/student.png",
    characterName: "Compagno",
    isStartingNode: false,
    choices: [
      {
        id: "c21-2-1",
        text: "Borbotti un 'sì' e ti lasci trascinare, anche se stai per esplodere.",
        type: "passive",
        emoji: "😵",
        consequence: "Finisci in mezzo alla folla e il tuo senso di panico aumenta a dismisura.",
        betterAlternative: "Impara a dire di no quando senti che una situazione è troppo stressante per te.",
        nextScenarioId: "scen-friends-party-3"
      },
      {
        id: "c21-2-2",
        text: "Rispondi: 'No, la musica è troppo forte, vado a prendere qualcosa da bere'.",
        type: "assertive",
        emoji: "🥤",
        consequence: "Metti dei confini chiari e ti prendi lo spazio necessario per respirare.",
        betterAlternative: "",
        nextScenarioId: "scen-friends-party-3"
      },
      {
        id: "c21-2-3",
        text: "Gli lanci un'occhiataccia e gli dici 'Lasciami in pace, stupido!'.",
        type: "impulsive",
        emoji: "😠",
        consequence: "Il tuo compagno si offende e inizia a prenderti in giro con gli altri.",
        betterAlternative: "Esprimi il tuo rifiuto senza attaccare l'altra persona.",
        nextScenarioId: "scen-friends-party-3",
        isCriticalFailure: true
      },
      {
        id: "c21-2-4",
        text: "Abbassi lo sguardo e ti sposti senza dire nulla, sentendoti in colpa.",
        type: "passive",
        emoji: "😔",
        consequence: "Il compagno insiste e tu continui a subire la pressione senza difenderti.",
        betterAlternative: "Non vergognarti dei tuoi limiti. Comunica in modo semplice il tuo bisogno.",
        nextScenarioId: "scen-friends-party-3"
      },
      {
        id: "c21-2-5",
        text: "Spingi forte la persona per allontanarla e scappi via dal gruppo.",
        type: "impulsive",
        emoji: "🚫",
        consequence: "Fai cadere qualcosa e attiri l'attenzione in modo negativo.",
        betterAlternative: "Reagire fisicamente non risolve la situazione. Usa le parole per allontanarti.",
        nextScenarioId: "scen-friends-party-3",
        isCriticalFailure: true
      },
      {
        id: "c21-2-6",
        text: "Spieghi: 'Non mi sento a mio agio nella calca, preferisco stare qui un po'.'",
        type: "assertive",
        emoji: "🧘",
        consequence: "L'altro capisce che non è niente di personale e ti lascia il tuo spazio.",
        betterAlternative: "",
        nextScenarioId: "scen-friends-party-3"
      }
    ]
  },
  "scen-friends-party-3": {
    id: "scen-friends-party-3",
    title: "Un Momento di Pausa",
    description: "Sei uscito fuori per prendere aria. Un amico ti raggiunge.",
    dialogue: [{ speaker: "Amico", text: "Ehi, tutto bene? Ti ho visto uscire di fretta, non ti stai divertendo?" }],
    background: "/assets/backgrounds/bg_park.jpg",
    character: "/assets/characters/friend.png",
    characterName: "Amico",
    isStartingNode: false,
    choices: [
      {
        id: "c21-3-1",
        text: "Gli urli: 'La tua festa fa schifo, c'è troppo rumore e mi scoppia la testa!'.",
        type: "impulsive",
        emoji: "🧨",
        consequence: "L'amico è ferito e si allontana deluso. Avete rovinato il rapporto.",
        betterAlternative: "Ricorda che non è colpa sua se la festa ti sovraccarica. Spiega il tuo problema senza insultare.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c21-3-2",
        text: "Ti stringi nelle spalle: 'Sì, tutto bene' sperando che non faccia altre domande.",
        type: "passive",
        emoji: "🤐",
        consequence: "Il tuo amico non capisce il tuo disagio e pensa che tu sia semplicemente annoiato.",
        betterAlternative: "Sii onesto con gli amici veri, ti aiuteranno a stare meglio.",
        nextScenarioId: null
      },
      {
        id: "c21-3-3",
        text: "Spieghi: 'Sì, ma dentro c'è troppa confusione per me. Mi fermo un po' qui fuori a respirare'.",
        type: "assertive",
        emoji: "🍃",
        consequence: "L'amico comprende perfettamente e decide di tenerti compagnia un po' fuori.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c21-3-4",
        text: "Menti: 'Devo andare a casa, mi fa malissimo la pancia'.",
        type: "passive",
        emoji: "🤥",
        consequence: "Vai a casa sentendoti sconfitto, senza aver affrontato la situazione.",
        betterAlternative: "Invece di inventare scuse, esprimi chiaramente il tuo stato d'animo legato all'ambiente.",
        nextScenarioId: null
      },
      {
        id: "c21-3-5",
        text: "Prendi a calci una panchina: 'Non sopporto più questa situazione!'.",
        type: "impulsive",
        emoji: "🦶",
        consequence: "Il tuo amico si spaventa per la tua reazione sproporzionata e si ritrae.",
        betterAlternative: "La rabbia non aiuta a gestire il sovraccarico. Prova a focalizzarti sul respiro.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c21-3-6",
        text: "Sorridi: 'Mi fa piacere stare con te, ma avevo solo bisogno di una pausa dal rumore'.",
        type: "assertive",
        emoji: "🤝",
        consequence: "Rassicuri il tuo amico sul fatto che apprezzi l'invito, tutelando al tempo stesso i tuoi bisogni.",
        betterAlternative: "",
        nextScenarioId: null
      }
    ]
  },

  // CHAPTER 22
  "scen-family-phone-1": {
    id: "scen-family-phone-1",
    title: "Il Telefono Sequestrato",
    description: "I tuoi genitori hanno scoperto che hai passato la notte a giocare sul telefono invece di dormire.",
    dialogue: [{ speaker: "Genitore", text: "Basta così. Dammi il telefono. Per una settimana non lo vedi." }],
    background: "/assets/backgrounds/bg_home.jpg",
    character: "/assets/characters/char_parent.png",
    characterName: "Genitore",
    isStartingNode: true,
    choices: [
      {
        id: "c22-1-1",
        text: "Lanci il telefono contro il muro urlando 'Tienitelo!'.",
        type: "impulsive",
        emoji: "💥",
        consequence: "Rompi il telefono e ti prendi una punizione molto più severa.",
        betterAlternative: "Controlla la rabbia. Gli scatti d'ira peggiorano solo le conseguenze.",
        nextScenarioId: "scen-family-phone-2",
        isCriticalFailure: true
      },
      {
        id: "c22-1-2",
        text: "Consegni il telefono in silenzio guardando per terra.",
        type: "passive",
        emoji: "⬇️",
        consequence: "Ti senti arrabbiato e frustrato, ma non provi neanche a spiegare il perché del tuo comportamento.",
        betterAlternative: "Anche se hai sbagliato, è importante dialogare per trovare un compromesso.",
        nextScenarioId: "scen-family-phone-2"
      },
      {
        id: "c22-1-3",
        text: "Dici: 'Capisco di aver sbagliato, ecco il telefono, ma possiamo parlarne?'",
        type: "assertive",
        emoji: "🗣️",
        consequence: "Il genitore apprezza la tua maturità, pur prendendo il telefono.",
        betterAlternative: "",
        nextScenarioId: "scen-family-phone-2"
      },
      {
        id: "c22-1-4",
        text: "Ammetti l'errore: 'Hai ragione, ho perso la cognizione del tempo. Lo prendo io'.",
        type: "assertive",
        emoji: "🕰️",
        consequence: "Dimostri responsabilità. Il genitore è più propenso a ridurre la punizione in futuro.",
        betterAlternative: "",
        nextScenarioId: "scen-family-phone-2"
      },
      {
        id: "c22-1-5",
        text: "Urli che ti odiano e che ti rovinano la vita per niente.",
        type: "impulsive",
        emoji: "😭",
        consequence: "La discussione degenera in un pesante litigio familiare senza risolvere nulla.",
        betterAlternative: "Le esagerazioni non aiutano a far valere le tue ragioni. Prova a stare calmo.",
        nextScenarioId: "scen-family-phone-2",
        isCriticalFailure: true
      },
      {
        id: "c22-1-6",
        text: "Mugugni un lamento e glielo dai, poi ti chiudi in camera piangendo.",
        type: "passive",
        emoji: "😢",
        consequence: "Ti isoli. La situazione ti fa stare male ma eviti il confronto.",
        betterAlternative: "Non chiuderti in te stesso, cerca di capire perché la regola esiste.",
        nextScenarioId: "scen-family-phone-2"
      }
    ]
  },
  "scen-family-phone-2": {
    id: "scen-family-phone-2",
    title: "Senza Connessione",
    description: "Sei in camera tua. Non sai cosa fare e ti senti disconnesso dai tuoi amici.",
    dialogue: [{ speaker: "Te Stesso", text: "Ora cosa faccio? Non posso nemmeno avvisare che non sarò online per la partita." }],
    background: "/assets/backgrounds/bg_bedroom.jpg",
    character: "/assets/characters/student.png",
    characterName: "Te Stesso",
    isStartingNode: false,
    choices: [
      {
        id: "c22-2-1",
        text: "Sbatti le porte della camera e butti all'aria la scrivania per rabbia.",
        type: "impulsive",
        emoji: "🌪️",
        consequence: "I tuoi genitori ti sentono, si arrabbiano ancora di più e perdi altri privilegi.",
        betterAlternative: "Sfoga la frustrazione in modi sani, come disegnare o fare esercizio, non distruggendo le cose.",
        nextScenarioId: "scen-family-phone-3",
        isCriticalFailure: true
      },
      {
        id: "c22-2-2",
        text: "Decidi di usare il computer di nascosto per avvisarli.",
        type: "impulsive",
        emoji: "💻",
        consequence: "Vieni scoperto quasi subito e perdi la fiducia dei tuoi genitori.",
        betterAlternative: "Non violare le regole, affrontale apertamente.",
        nextScenarioId: "scen-family-phone-3",
        isCriticalFailure: true
      },
      {
        id: "c22-2-3",
        text: "Vai dai tuoi genitori e chiedi gentilmente se puoi usare il telefono solo per 2 minuti per avvisare gli amici.",
        type: "assertive",
        emoji: "⏱️",
        consequence: "Apprezzano che tu lo abbia chiesto apertamente e ti concedono i due minuti.",
        betterAlternative: "",
        nextScenarioId: "scen-family-phone-3"
      },
      {
        id: "c22-2-4",
        text: "Fissi il soffitto disperandoti e credendo che tutti ti odieranno per la tua assenza.",
        type: "passive",
        emoji: "🙄",
        consequence: "L'ansia peggiora inutilmente la tua giornata.",
        betterAlternative: "Metti in prospettiva le cose: i tuoi amici capiranno se non ci sei per qualche giorno.",
        nextScenarioId: "scen-family-phone-3"
      },
      {
        id: "c22-2-5",
        text: "Invece di disperarti, prendi un libro o provi a riordinare per distrarti.",
        type: "assertive",
        emoji: "📚",
        consequence: "Riesci a trasformare la noia in un momento per te, calmando l'impulso.",
        betterAlternative: "",
        nextScenarioId: "scen-family-phone-3"
      },
      {
        id: "c22-2-6",
        text: "Dormi tutto il pomeriggio per non pensare a nulla.",
        type: "passive",
        emoji: "💤",
        consequence: "Ti svegli stordito e ancora frustrato, non avendo risolto i tuoi pensieri.",
        betterAlternative: "Cerca un'attività più costruttiva che ti aiuti a canalizzare l'energia in modo positivo.",
        nextScenarioId: "scen-family-phone-3"
      }
    ]
  },
  "scen-family-phone-3": {
    id: "scen-family-phone-3",
    title: "La Negoziazione",
    description: "Il giorno dopo incontri tuo genitore in cucina. Vuoi cercare di recuperare il telefono prima del tempo.",
    dialogue: [{ speaker: "Genitore", text: "Buongiorno. Spero che ieri ti sia servito da lezione." }],
    background: "/assets/backgrounds/bg_kitchen.jpg",
    character: "/assets/characters/char_parent.png",
    characterName: "Genitore",
    isStartingNode: false,
    choices: [
      {
        id: "c22-3-1",
        text: "Pretendi che te lo ridia subito, urlando che non è giusto.",
        type: "impulsive",
        emoji: "🔥",
        consequence: "Il genitore si irrigidisce e prolunga la punizione a due settimane.",
        betterAlternative: "Evita l'arroganza. Se vuoi ottenere qualcosa, mostra che stai imparando dai tuoi errori.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c22-3-2",
        text: "Mormori: 'Non serve a niente, tanto sarò escluso da tutti' e te ne vai a testa bassa.",
        type: "passive",
        emoji: "😞",
        consequence: "Fai la vittima ma non fai passi avanti per risolvere il conflitto.",
        betterAlternative: "Invece di fare la vittima, cerca di mostrare maturità proponendo una soluzione.",
        nextScenarioId: null
      },
      {
        id: "c22-3-3",
        text: "Proponi: 'Capisco che devo riposare, possiamo accordarci che ti lascio il telefono fuori dalla camera ogni sera?'",
        type: "assertive",
        emoji: "🤝",
        consequence: "Il genitore è colpito dalla tua proposta costruttiva e decide di accettare il compromesso.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c22-3-4",
        text: "Dici: 'Sì, ho capito che esagero di notte. Posso avere indietro il telefono e mettermi un limite di orario?'",
        type: "assertive",
        emoji: "⏳",
        consequence: "L'ammissione di colpa e la proposta concreta ti fanno riguadagnare la fiducia.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c22-3-5",
        text: "Prendi le tue chiavi e scappi di casa senza colazione per fare un dispetto.",
        type: "impulsive",
        emoji: "🏃‍♂️",
        consequence: "I genitori sono in pensiero e la situazione si aggrava enormemente.",
        betterAlternative: "Fuggire non risolve i problemi familiari, li peggiora. Prova a comunicare.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c22-3-6",
        text: "Non rispondi, mangi e torni in camera rassegnato per tutta la settimana.",
        type: "passive",
        emoji: "🥣",
        consequence: "Sconti la punizione, ma perdi l'opportunità di dimostrare che sai autogestirti.",
        betterAlternative: "La rassegnazione non insegna l'autogestione. Usa le parole per migliorare le cose.",
        nextScenarioId: null
      }
    ]
  },

  // CHAPTER 23
  "scen-school-sport-1": {
    id: "scen-school-sport-1",
    title: "L'Allenamento",
    description: "Durante l'ora di educazione fisica fai fatica a concentrarti sulle regole del gioco. Sbagli un passaggio importante.",
    dialogue: [{ speaker: "Prof. di Motoria", text: "Ancora una volta fuori posizione! Devi prestare attenzione, non stai giocando da solo!" }],
    background: "/assets/backgrounds/bg_park.jpg",
    character: "/assets/characters/teacher.png",
    characterName: "Prof. di Motoria",
    isStartingNode: true,
    choices: [
      {
        id: "c23-1-1",
        text: "Rispondi a tono: 'È un gioco stupido e lei spiega male!' e te ne vai dal campo.",
        type: "impulsive",
        emoji: "😡",
        consequence: "Ti prendi una nota disciplinare per il linguaggio e l'atteggiamento.",
        betterAlternative: "Evita di attaccare l'insegnante. Se hai difficoltà, chiedi chiarimenti.",
        nextScenarioId: "scen-school-sport-2",
        isCriticalFailure: true
      },
      {
        id: "c23-1-2",
        text: "Chiedi scusa e domandi: 'Prof, potrebbe rispiegarmi il mio ruolo per favore?'",
        type: "assertive",
        emoji: "🙋",
        consequence: "L'insegnante si calma e ti spiega la posizione con più chiarezza.",
        betterAlternative: "",
        nextScenarioId: "scen-school-sport-2"
      },
      {
        id: "c23-1-3",
        text: "Ti scusi balbettando e rimani immobile sul campo, paralizzato dalla vergogna.",
        type: "passive",
        emoji: "😨",
        consequence: "Non partecipi più attivamente al gioco per paura di sbagliare ancora.",
        betterAlternative: "Non lasciare che un errore ti blocchi, tutti possono sbagliare.",
        nextScenarioId: "scen-school-sport-2"
      },
      {
        id: "c23-1-4",
        text: "Lanci la palla contro il muro con rabbia per scaricare la frustrazione.",
        type: "impulsive",
        emoji: "⚽",
        consequence: "Rischi di fare male a qualcuno e l'insegnante ti esclude dalla lezione.",
        betterAlternative: "Gestisci l'iperattività in modo sicuro, senza mettere a rischio gli altri.",
        nextScenarioId: "scen-school-sport-2",
        isCriticalFailure: true
      },
      {
        id: "c23-1-5",
        text: "Annuisci in silenzio e continui a giocare provando a imitare gli altri senza chiedere nulla.",
        type: "passive",
        emoji: "😶",
        consequence: "Continui a non capire le regole e la tua frustrazione cresce nel silenzio.",
        betterAlternative: "Se non capisci, chiedi aiuto. Nascondere il problema non lo risolve.",
        nextScenarioId: "scen-school-sport-2"
      },
      {
        id: "c23-1-6",
        text: "Ammetti: 'Faccio fatica a concentrarmi sulle posizioni, cercherò di fare più attenzione.'",
        type: "assertive",
        emoji: "🧠",
        consequence: "L'insegnante apprezza la tua onestà e ti dà suggerimenti per tenere il ritmo.",
        betterAlternative: "",
        nextScenarioId: "scen-school-sport-2"
      }
    ]
  },
  "scen-school-sport-2": {
    id: "scen-school-sport-2",
    title: "Le Prese in Giro",
    description: "Il gioco riprende. Durante una pausa, alcuni compagni ridono di te.",
    dialogue: [{ speaker: "Bullo", text: "Ma che fai, dormi in piedi? A causa tua stiamo perdendo!" }],
    background: "/assets/backgrounds/bg_park.jpg",
    character: "/assets/characters/bully.png",
    characterName: "Compagno Prepotente",
    isStartingNode: false,
    choices: [
      {
        id: "c23-2-1",
        text: "Tieni lo sguardo basso e fingi di non aver sentito niente.",
        type: "passive",
        emoji: "🙈",
        consequence: "Il bullo continua a prenderti di mira vedendo che non ti difendi.",
        betterAlternative: "Difendi te stesso in modo calmo per disinnescare la prepotenza.",
        nextScenarioId: "scen-school-sport-3"
      },
      {
        id: "c23-2-2",
        text: "Gli vai addosso spingendolo: 'Almeno io non sono un cretino come te!'",
        type: "impulsive",
        emoji: "🥊",
        consequence: "Finisci nei guai passando dalla parte del torto per la reazione violenta.",
        betterAlternative: "Non reagire alla violenza verbale con quella fisica, passa dalla parte della ragione.",
        nextScenarioId: "scen-school-sport-3",
        isCriticalFailure: true
      },
      {
        id: "c23-2-3",
        text: "Rispondi con calma: 'Faccio del mio meglio, ma se credi di fare meglio tu, copri il mio ruolo'.",
        type: "assertive",
        emoji: "🛡️",
        consequence: "Il prepotente ammutolisce, stupito dalla tua reazione controllata e pacata.",
        betterAlternative: "",
        nextScenarioId: "scen-school-sport-3"
      },
      {
        id: "c23-2-4",
        text: "Urli minacciando che gli farai vedere tu fuori da scuola.",
        type: "impulsive",
        emoji: "🤬",
        consequence: "Crei una situazione pericolosa e la cosa degenera rapidamente.",
        betterAlternative: "Le minacce portano solo ad altre minacce. Evita di alimentare il ciclo.",
        nextScenarioId: "scen-school-sport-3",
        isCriticalFailure: true
      },
      {
        id: "c23-2-5",
        text: "Ti allontani dal gruppo mormorando che vuoi smettere di giocare.",
        type: "passive",
        emoji: "🚶",
        consequence: "Ti auto-escludi perdendo l'occasione di divertirti per colpa degli altri.",
        betterAlternative: "Non rinunciare a qualcosa solo perché qualcuno cerca di sminuirti.",
        nextScenarioId: "scen-school-sport-3"
      },
      {
        id: "c23-2-6",
        text: "Gli dici: 'Stiamo imparando tutti, non c'è bisogno di essere così aggressivi'.",
        type: "assertive",
        emoji: "✋",
        consequence: "Dimostri maturità. Alcuni compagni annuiscono e prendono le tue difese.",
        betterAlternative: "",
        nextScenarioId: "scen-school-sport-3"
      }
    ]
  },
  "scen-school-sport-3": {
    id: "scen-school-sport-3",
    title: "L'Ultima Azione",
    description: "Manca poco alla fine della lezione. La palla arriva verso di te per un'azione decisiva.",
    dialogue: [{ speaker: "Prof. di Motoria", text: "Coraggio! Ora tocca a te, fai vedere cosa sai fare!" }],
    background: "/assets/backgrounds/bg_park.jpg",
    character: "/assets/characters/teacher.png",
    characterName: "Prof. di Motoria",
    isStartingNode: false,
    choices: [
      {
        id: "c23-3-1",
        text: "Ti fai prendere dal panico e lasci passare la palla senza provarci.",
        type: "passive",
        emoji: "😱",
        consequence: "Perdi un'occasione per metterti alla prova, confermando le tue insicurezze.",
        betterAlternative: "Meglio provare e fallire che arrendersi senza averci tentato.",
        nextScenarioId: null
      },
      {
        id: "c23-3-2",
        text: "Tiri con tutta la forza senza guardare, rischiando di colpire qualcuno al volto.",
        type: "impulsive",
        emoji: "☄️",
        consequence: "Colpisci male e in modo pericoloso. Il prof ti riprende per la foga eccessiva.",
        betterAlternative: "L'azione richiede controllo e concentrazione, non solo forza cieca.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c23-3-3",
        text: "Fai un respiro profondo, guardi il compagno libero e gli passi la palla con cura.",
        type: "assertive",
        emoji: "🎯",
        consequence: "Fai un'ottima azione. Magari non vincete, ma sei soddisfatto di esserti concentrato.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c23-3-4",
        text: "Provi a fare un'acrobazia inutile per farti notare e finisci a terra in modo buffo.",
        type: "impulsive",
        emoji: "🤸",
        consequence: "Tutti ridono di te. L'eccesso di esibizionismo ti ha danneggiato.",
        betterAlternative: "Cerca di eseguire il tuo compito bene invece di cercare l'approvazione con gesti estremi.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c23-3-5",
        text: "Ti concentri sul momento e fai un tiro semplice ma preciso.",
        type: "assertive",
        emoji: "👟",
        consequence: "Ricevi i complimenti dal professore per la calma dimostrata.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c23-3-6",
        text: "Chiudi gli occhi e colpisci a caso, sperando in bene.",
        type: "passive",
        emoji: "🎲",
        consequence: "La palla va fuori, non hai preso il controllo dell'azione per timore.",
        betterAlternative: "Mantieni l'attenzione viva, cerca di gestire l'ansia da prestazione restando concentrato.",
        nextScenarioId: null
      }
    ]
  },

  // CHAPTER 24
  "scen-friends-lie-1": {
    id: "scen-friends-lie-1",
    title: "Bugie Innocenti",
    description: "Avevi promesso a un amico di aiutarlo, ma te ne sei dimenticato. Invece hai detto che stavi male, ma ti ha visto al parco.",
    dialogue: [{ speaker: "Amico", text: "Non ci posso credere. Mi hai detto che avevi la febbre, ma ieri eri al parco con altri!" }],
    background: "/assets/backgrounds/bg_hallway.jpg",
    character: "/assets/characters/friend.png",
    characterName: "Amico",
    isStartingNode: true,
    choices: [
      {
        id: "c24-1-1",
        text: "Ti inventi subito una bugia ancora più assurda dicendo che era un sosia.",
        type: "impulsive",
        emoji: "🤥",
        consequence: "L'amico perde definitivamente la pazienza e non ti crede più.",
        betterAlternative: "Aggiungere bugie ad altre bugie peggiora solo la situazione. Sii sincero.",
        nextScenarioId: "scen-friends-lie-2",
        isCriticalFailure: true
      },
      {
        id: "c24-1-2",
        text: "Dici: 'Scusami tanto, ho avuto un vuoto di memoria e mi sono vergognato a dirtelo'.",
        type: "assertive",
        emoji: "😔",
        consequence: "L'amico è ancora ferito, ma apprezza la tua onestà e il tuo pentimento.",
        betterAlternative: "",
        nextScenarioId: "scen-friends-lie-2"
      },
      {
        id: "c24-1-3",
        text: "Fai scena muta e guardi il pavimento, sentendoti un inetto.",
        type: "passive",
        emoji: "😶",
        consequence: "Il silenzio non chiarisce la situazione e l'amico se ne va irritato.",
        betterAlternative: "Fuggire il confronto non fa sparire il problema, trova il coraggio di spiegare.",
        nextScenarioId: "scen-friends-lie-2"
      },
      {
        id: "c24-1-4",
        text: "Gli urli in faccia: 'E tu non spiarmi! Non sono affari tuoi!'.",
        type: "impulsive",
        emoji: "🤬",
        consequence: "Aggredisci chi ha ragione, perdendo totalmente la sua amicizia.",
        betterAlternative: "Quando sbagli, ammettilo. Attaccare l'altro è una reazione immatura.",
        nextScenarioId: "scen-friends-lie-2",
        isCriticalFailure: true
      },
      {
        id: "c24-1-5",
        text: "Spieghi: 'Hai ragione ad essere arrabbiato. Ho gestito male la cosa per paura di deluderti'.",
        type: "assertive",
        emoji: "🗣️",
        consequence: "Metti le carte in tavola in modo maturo, avviando un vero chiarimento.",
        betterAlternative: "",
        nextScenarioId: "scen-friends-lie-2"
      },
      {
        id: "c24-1-6",
        text: "Inizi a piangere cercando pietà e sperando che lui lasci perdere.",
        type: "passive",
        emoji: "😭",
        consequence: "Fai sentire in colpa lui per aver chiesto spiegazioni, manipolando la realtà.",
        betterAlternative: "Assumiti le tue responsabilità senza cercare scorciatoie emotive.",
        nextScenarioId: "scen-friends-lie-2"
      }
    ]
  },
  "scen-friends-lie-2": {
    id: "scen-friends-lie-2",
    title: "Le Conseguenze",
    description: "La voce della tua bugia gira in classe e alcune persone iniziano a evitarti.",
    dialogue: [{ speaker: "Sconosciuto", text: "Occhio a quello che gli dite, poi si inventa le scuse per non esserci..." }],
    background: "/assets/backgrounds/bg_classroom.jpg",
    character: "/assets/characters/stranger.png",
    characterName: "Compagno",
    isStartingNode: false,
    choices: [
      {
        id: "c24-2-1",
        text: "Fingi di niente, sedendoti da solo in un angolo senza parlare con nessuno.",
        type: "passive",
        emoji: "🪑",
        consequence: "La distanza aumenta e le malelingue continuano per molto tempo.",
        betterAlternative: "L'isolamento consolida il pettegolezzo. Cerca di mostrare il tuo lato migliore.",
        nextScenarioId: "scen-friends-lie-3"
      },
      {
        id: "c24-2-2",
        text: "Prendi un banco e lo lanci per la classe urlando a tutti di tacere.",
        type: "impulsive",
        emoji: "🧨",
        consequence: "Vieni sospeso. Ora hanno tutti un motivo reale per sparlare di te.",
        betterAlternative: "Comportamenti del genere confermano che non sai gestire le emozioni. Sii calmo.",
        nextScenarioId: "scen-friends-lie-3",
        isCriticalFailure: true
      },
      {
        id: "c24-2-3",
        text: "Ti avvicini dicendo: 'Ho fatto un errore e ho chiesto scusa, ma non serve ingigantire la cosa'.",
        type: "assertive",
        emoji: "✋",
        consequence: "Zittisci le dicerie difendendoti civilmente. Dimostri sicurezza.",
        betterAlternative: "",
        nextScenarioId: "scen-friends-lie-3"
      },
      {
        id: "c24-2-4",
        text: "Ti metti a piangere di fronte a tutta la classe e corri fuori.",
        type: "passive",
        emoji: "🏃",
        consequence: "Ti senti ancora più esposto e vulnerabile di prima.",
        betterAlternative: "Scappare non ti aiuterà a recuperare il rispetto.",
        nextScenarioId: "scen-friends-lie-3"
      },
      {
        id: "c24-2-5",
        text: "Cerchi il tuo amico per chiarire pubblicamente e chiudere la questione.",
        type: "assertive",
        emoji: "🤝",
        consequence: "Affrontando il problema alla radice, spegni il pettegolezzo sul nascere.",
        betterAlternative: "",
        nextScenarioId: "scen-friends-lie-3"
      },
      {
        id: "c24-2-6",
        text: "Insulti pesantemente chi parlava, scatenando una rissa verbale.",
        type: "impulsive",
        emoji: "🤬",
        consequence: "Finisci in presidenza e passi definitivamente dalla parte del torto.",
        betterAlternative: "Usa le parole per spegnere il fuoco, non per alimentarlo.",
        nextScenarioId: "scen-friends-lie-3",
        isCriticalFailure: true
      }
    ]
  },
  "scen-friends-lie-3": {
    id: "scen-friends-lie-3",
    title: "Fare Ammenda",
    description: "Incontri il tuo amico da solo. È il momento di provare a sistemare le cose.",
    dialogue: [{ speaker: "Amico", text: "Dimmi la verità questa volta, perché hai mentito?" }],
    background: "/assets/backgrounds/bg_park.jpg",
    character: "/assets/characters/friend.png",
    characterName: "Amico",
    isStartingNode: false,
    choices: [
      {
        id: "c24-3-1",
        text: "Dici: 'Perché sei noioso e non avevo voglia di venire! Ecco la verità!'",
        type: "impulsive",
        emoji: "🔥",
        consequence: "Rompi definitivamente l'amicizia con una cattiveria gratuita.",
        betterAlternative: "La sincerità non deve essere crudeltà. Spiega la tua difficoltà senza ferire l'altro.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c24-3-2",
        text: "Dici: 'Mi ero scordato e ho avuto paura della tua reazione. Perdonami, voglio rimediare'.",
        type: "assertive",
        emoji: "❤️",
        consequence: "L'amico capisce che il tuo problema è stata la gestione della situazione e ti perdona.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c24-3-3",
        text: "Dici di non ricordartelo e cerchi di cambiare argomento.",
        type: "passive",
        emoji: "🤷",
        consequence: "L'amico si sente preso in giro e se ne va indignato.",
        betterAlternative: "Essere elusivi dopo una bugia dimostra solo che non sei ancora affidabile.",
        nextScenarioId: null
      },
      {
        id: "c24-3-4",
        text: "Spieghi: 'Il mio cervello a volte va in tilt e faccio cose stupide. Lavorerò per migliorare, te lo prometto'.",
        type: "assertive",
        emoji: "🧠",
        consequence: "Dimostri consapevolezza dei tuoi limiti e la volontà di migliorare.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c24-3-5",
        text: "Dai la colpa ai tuoi genitori inventando che ti hanno obbligato a uscire.",
        type: "impulsive",
        emoji: "🤥",
        consequence: "Vieni smentito poco dopo e perdi l'ultima occasione di salvataggio.",
        betterAlternative: "Mai usare un'altra menzogna per giustificare la precedente.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c24-3-6",
        text: "Inizi a scusarti decine di volte senza farlo parlare, sperando di impietosirlo.",
        type: "passive",
        emoji: "🥺",
        consequence: "L'amico si stanca della tua scena pietosa e chiede un po' di spazio.",
        betterAlternative: "Chiedere scusa è giusto, ma devi anche ascoltare i sentimenti dell'altra persona.",
        nextScenarioId: null
      }
    ]
  },

  // CHAPTER 25
  "scen-family-grades-1": {
    id: "scen-family-grades-1",
    title: "La Pagella",
    description: "Il professore distribuisce le pagelle. Hai preso dei brutti voti nonostante i tuoi sforzi per concentrarti.",
    dialogue: [{ speaker: "Insegnante", text: "Ecco la tua scheda. Mi aspettavo molto di più, francamente." }],
    background: "/assets/backgrounds/bg_classroom.jpg",
    character: "/assets/characters/teacher.png",
    characterName: "Insegnante",
    isStartingNode: true,
    choices: [
      {
        id: "c25-1-1",
        text: "Strappi la pagella davanti a lui e urli: 'Questa scuola fa schifo!'",
        type: "impulsive",
        emoji: "📄",
        consequence: "Finisci in presidenza e i tuoi genitori vengono chiamati immediatamente.",
        betterAlternative: "Esplodere di rabbia non cambierà i voti. Mantieni il controllo.",
        nextScenarioId: "scen-family-grades-2",
        isCriticalFailure: true
      },
      {
        id: "c25-1-2",
        text: "Prendi la pagella e la nascondi subito nello zaino stringendo i denti per non piangere.",
        type: "passive",
        emoji: "🎒",
        consequence: "Accumuli moltissima ansia, sentendoti un totale fallimento.",
        betterAlternative: "Non nascondere il problema. Cerca di affrontarlo, magari chiedendo consiglio all'insegnante.",
        nextScenarioId: "scen-family-grades-2"
      },
      {
        id: "c25-1-3",
        text: "Dici: 'Capisco professore, farò in modo di trovare un metodo di studio migliore.'",
        type: "assertive",
        emoji: "📚",
        consequence: "L'insegnante apprezza che tu non cerchi scuse, mostrandosi disponibile ad aiutarti.",
        betterAlternative: "",
        nextScenarioId: "scen-family-grades-2"
      },
      {
        id: "c25-1-4",
        text: "Rispondi sfidandolo: 'E lei non sa insegnare in modo interessante!'",
        type: "impulsive",
        emoji: "😤",
        consequence: "Crei un grosso conflitto con il docente, peggiorando le tue future valutazioni.",
        betterAlternative: "Attaccare l'insegnante è un errore di impulsività. Impara ad accettare la critica.",
        nextScenarioId: "scen-family-grades-2",
        isCriticalFailure: true
      },
      {
        id: "c25-1-5",
        text: "Dici: 'Sì, faccio molta fatica a restare concentrato, potrei chiederle dei consigli più tardi?'",
        type: "assertive",
        emoji: "🙋‍♂️",
        consequence: "Il prof comprende le tue vere difficoltà e si dimostra aperto al dialogo.",
        betterAlternative: "",
        nextScenarioId: "scen-family-grades-2"
      },
      {
        id: "c25-1-6",
        text: "Annuisci debolmente e passi il resto della giornata a sentirti uno stupido.",
        type: "passive",
        emoji: "😞",
        consequence: "Lasci che i voti definiscano il tuo valore e perdi autostima.",
        betterAlternative: "Un brutto voto non ti definisce. Cerca di reagire proponendo un piano di recupero.",
        nextScenarioId: "scen-family-grades-2"
      }
    ]
  },
  "scen-family-grades-2": {
    id: "scen-family-grades-2",
    title: "La Strada Verso Casa",
    description: "Stai tornando a casa a piedi e non fai che pensare a come reagiranno i tuoi genitori.",
    dialogue: [{ speaker: "Te Stesso", text: "Si arrabbieranno tantissimo... mi toglieranno di sicuro tutte le mie cose." }],
    background: "/assets/backgrounds/bg_street.jpg",
    character: "/assets/characters/student.png",
    characterName: "Te Stesso",
    isStartingNode: false,
    choices: [
      {
        id: "c25-2-1",
        text: "Ti prende il panico e decidi di buttare la pagella in un cestino per dire di averla persa.",
        type: "impulsive",
        emoji: "🗑️",
        consequence: "La verità verrà a galla a breve e perderai la fiducia dei tuoi genitori.",
        betterAlternative: "Non scappare dai tuoi errori. Mentire aggrava solo le conseguenze.",
        nextScenarioId: "scen-family-grades-3",
        isCriticalFailure: true
      },
      {
        id: "c25-2-2",
        text: "Decidi di non tornare a casa e vai al parco fino a sera tardi per scappare.",
        type: "impulsive",
        emoji: "🏃",
        consequence: "I tuoi genitori sono terrorizzati e, una volta tornato, la pagella è l'ultimo dei problemi.",
        betterAlternative: "Fuggire non risolve i problemi, impara ad affrontarli a testa alta.",
        nextScenarioId: "scen-family-grades-3",
        isCriticalFailure: true
      },
      {
        id: "c25-2-3",
        text: "Pensi: 'Non importa, andrà male ma sarò onesto. Dirò che ho bisogno di aiuto.'",
        type: "assertive",
        emoji: "💡",
        consequence: "Affronti la paura pianificando un approccio costruttivo, che ti calma moltissimo.",
        betterAlternative: "",
        nextScenarioId: "scen-family-grades-3"
      },
      {
        id: "c25-2-4",
        text: "Ti convinci che non ce la farai mai e che è inutile anche solo provare a studiare.",
        type: "passive",
        emoji: "🥀",
        consequence: "Arrivi a casa demotivato e depresso, abbassando le tue difese per il confronto.",
        betterAlternative: "Cerca di scacciare i pensieri autodistruttivi; hai solo bisogno di un metodo diverso.",
        nextScenarioId: "scen-family-grades-3"
      },
      {
        id: "c25-2-5",
        text: "Decidi di presentare la pagella subito, senza aspettare, così da levarti il pensiero.",
        type: "assertive",
        emoji: "⏱️",
        consequence: "Prendi in mano la situazione, riducendo l'ansia dell'attesa.",
        betterAlternative: "",
        nextScenarioId: "scen-family-grades-3"
      },
      {
        id: "c25-2-6",
        text: "Torni a casa lentamente e rimandi il momento il più possibile, chiudendoti in camera.",
        type: "passive",
        emoji: "🚪",
        consequence: "L'attesa diventa insostenibile e l'ansia ti mangia vivo.",
        betterAlternative: "Rimandare prolunga solo l'agonia. Meglio togliere il dente subito.",
        nextScenarioId: "scen-family-grades-3"
      }
    ]
  },
  "scen-family-grades-3": {
    id: "scen-family-grades-3",
    title: "Il Confronto",
    description: "Sei di fronte ai tuoi genitori in salotto con la pagella in mano.",
    dialogue: [{ speaker: "Genitore", text: "Allora, l'insegnante ha caricato i voti, ma vogliamo vederla da te. Com'è andata?" }],
    background: "/assets/backgrounds/bg_home.jpg",
    character: "/assets/characters/char_parent.png",
    characterName: "Genitore",
    isStartingNode: false,
    choices: [
      {
        id: "c25-3-1",
        text: "Gliela butti addosso: 'Fate quello che vi pare, rovinatemi la vita come sempre!'",
        type: "impulsive",
        emoji: "💥",
        consequence: "I tuoi genitori si arrabbiano moltissimo e ti mettono in punizione severa.",
        betterAlternative: "Non usare la rabbia preventiva per difenderti dalle critiche.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c25-3-2",
        text: "La consegni con calma: 'È andata male, mi dispiace. Ho fatto fatica quest'anno, vorrei riprovarci meglio.'",
        type: "assertive",
        emoji: "💬",
        consequence: "I genitori apprezzano il tuo approccio maturo e decidono di aiutarti a trovare una soluzione.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c25-3-3",
        text: "Cerchi scuse dicendo che i prof ti odiano e che gli altri barano.",
        type: "passive",
        emoji: "🤥",
        consequence: "I genitori non ci credono e si infastidiscono per la tua mancanza di responsabilità.",
        betterAlternative: "Accetta i tuoi risultati senza cercare capri espiatori.",
        nextScenarioId: null
      },
      {
        id: "c25-3-4",
        text: "Piangi disperato dicendo che sei stupido e che non vuoi più andare a scuola.",
        type: "passive",
        emoji: "😭",
        consequence: "Crei forte allarmismo, ma non mostri un vero piano d'azione costruttivo.",
        betterAlternative: "Esprimere il disagio va bene, ma non esagerare con parole autodistruttive.",
        nextScenarioId: null
      },
      {
        id: "c25-3-5",
        text: "Dici: 'Ecco qua. So che non siete felici, ma prometto che cercherò un nuovo metodo di studio.'",
        type: "assertive",
        emoji: "📈",
        consequence: "Mostri voglia di riscatto e i genitori si calmano, pronti a supportarti.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c25-3-6",
        text: "Strappi la pagella davanti a loro per rabbia e scappi in camera.",
        type: "impulsive",
        emoji: "🌪️",
        consequence: "Peggiori gravemente le cose, distruggendo ogni dialogo.",
        betterAlternative: "La rabbia esplosiva ti toglie ogni possibilità di confronto sereno. Respira.",
        nextScenarioId: null,
        isCriticalFailure: true
      }
    ]
  }
};
