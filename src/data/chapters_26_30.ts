import type { Scenario } from '../types';

export const CHAPTERS_26_30: Record<string, Scenario> = {
  // CHAPTER 26
  "scen-school-project-1": {
    id: "scen-school-project-1",
    title: "Il Progetto di Gruppo",
    description: "La prof assegna un progetto di gruppo, ma i tuoi compagni non sembrano interessati a collaborare.",
    dialogue: [{ speaker: "Prof", text: "Questo progetto farà media. Organizzatevi per dividere le parti equamente." }],
    background: "/assets/backgrounds/bg_classroom.jpg",
    character: "/assets/characters/teacher.png",
    characterName: "Prof",
    isStartingNode: true,
    choices: [
      {
        id: "c26-1",
        text: "Ignoro tutti e decido di fare tutto io da solo fin dall'inizio.",
        type: "impulsive",
        emoji: "🏃",
        consequence: "Ti sobbarchi un lavoro enorme e finirai per esaurirti.",
        betterAlternative: "È meglio proporre fin da subito una divisione chiara dei compiti.",
        nextScenarioId: "scen-school-project-2",
        isCriticalFailure: true
      },
      {
        id: "c26-2",
        text: "Non dico nulla e aspetto che qualcuno mi dica cosa fare.",
        type: "passive",
        emoji: "😶",
        consequence: "Nessuno prende l'iniziativa e il tempo passa.",
        betterAlternative: "Potresti proporre un brainstorming per rompere il ghiaccio.",
        nextScenarioId: "scen-school-project-2"
      },
      {
        id: "c26-3",
        text: "Propongo di creare una chat di gruppo per dividere subito i capitoli.",
        type: "assertive",
        emoji: "📱",
        consequence: "Avviate la comunicazione, anche se non tutti rispondono subito.",
        betterAlternative: "",
        nextScenarioId: "scen-school-project-2"
      },
      {
        id: "c26-4",
        text: "Mi alzo e dico a voce alta che non voglio lavorare con loro.",
        type: "impulsive",
        emoji: "🤬",
        consequence: "La prof ti riprende per il tono e il gruppo ti guarda male.",
        betterAlternative: "Cerca di parlare prima con loro per trovare un accordo.",
        nextScenarioId: "scen-school-project-2",
        isCriticalFailure: true
      },
      {
        id: "c26-5",
        text: "Dico: 'Ognuno scelga una parte, io prendo l'introduzione'.",
        type: "assertive",
        emoji: "✅",
        consequence: "Dai il buon esempio scegliendo per primo e invitando gli altri a fare lo stesso.",
        betterAlternative: "",
        nextScenarioId: "scen-school-project-2"
      },
      {
        id: "c26-6",
        text: "Guardo il telefono e faccio finta di niente, sperando che se ne occupino loro.",
        type: "passive",
        emoji: "📱",
        consequence: "Il gruppo rimane senza guida e non si decide nulla.",
        betterAlternative: "Partecipa attivamente, altrimenti il progetto fallirà.",
        nextScenarioId: "scen-school-project-2"
      }
    ]
  },
  "scen-school-project-2": {
    id: "scen-school-project-2",
    title: "Nessuno ha fatto nulla",
    description: "Manca un giorno alla consegna e scopri che gli altri non hanno ancora preparato la loro parte.",
    dialogue: [{ speaker: "Compagno", text: "Scusa, me ne sono dimenticato... possiamo improvvisare?" }],
    background: "/assets/backgrounds/bg_hallway.jpg",
    character: "/assets/characters/friend.png",
    characterName: "Compagno",
    isStartingNode: false,
    choices: [
      {
        id: "c26-7",
        text: "Spiego chiaramente che non posso fare anche il loro lavoro e che devono finirlo stasera.",
        type: "assertive",
        emoji: "✋",
        consequence: "Metti dei confini sani, anche se loro dovranno fare una faticaccia.",
        betterAlternative: "",
        nextScenarioId: "scen-school-project-3"
      },
      {
        id: "c26-8",
        text: "Urlo: 'Siete degli irresponsabili, mi farete prendere un brutto voto!' e me ne vado.",
        type: "impulsive",
        emoji: "😡",
        consequence: "La tua rabbia è comprensibile, ma la scenata non risolve il problema.",
        betterAlternative: "Esprimi la tua frustrazione mantenendo la calma e chiedi una soluzione immediata.",
        nextScenarioId: "scen-school-project-3",
        isCriticalFailure: true
      },
      {
        id: "c26-9",
        text: "Dico: 'Va bene, cerchiamo di mettere insieme almeno i punti principali ora'.",
        type: "assertive",
        emoji: "🤝",
        consequence: "Cerchi di salvare il salvabile in modo costruttivo.",
        betterAlternative: "",
        nextScenarioId: "scen-school-project-3"
      },
      {
        id: "c26-10",
        text: "Faccio io le loro parti per paura di prendere un'insufficienza.",
        type: "passive",
        emoji: "😓",
        consequence: "Ti affatichi enormemente e loro non imparano la lezione.",
        betterAlternative: "Non è giusto che tu faccia tutto, avresti dovuto pretendere che facessero la loro parte.",
        nextScenarioId: "scen-school-project-3"
      },
      {
        id: "c26-11",
        text: "Strappo i miei appunti per rabbia e dico che non consegneremo niente.",
        type: "impulsive",
        emoji: "💥",
        consequence: "Distruggi anche il tuo lavoro, rovinando tutto.",
        betterAlternative: "Proteggi il lavoro che hai fatto e pensa a come presentarlo, anche da solo se necessario.",
        nextScenarioId: "scen-school-project-3",
        isCriticalFailure: true
      },
      {
        id: "c26-12",
        text: "Annuisco e accetto di improvvisare, anche se so che andrà male.",
        type: "passive",
        emoji: "🫠",
        consequence: "Ti rassegni a un fallimento che non è colpa tua.",
        betterAlternative: "Prova a organizzare il materiale all'ultimo minuto per strutturare meglio l'esposizione.",
        nextScenarioId: "scen-school-project-3"
      }
    ]
  },
  "scen-school-project-3": {
    id: "scen-school-project-3",
    title: "La Presentazione",
    description: "È il momento di esporre alla lavagna. Il progetto è visibilmente squilibrato o incompleto.",
    dialogue: [{ speaker: "Prof", text: "Sembra che solo alcuni di voi abbiano approfondito l'argomento. Come vi siete organizzati?" }],
    background: "/assets/backgrounds/bg_classroom.jpg",
    character: "/assets/characters/teacher.png",
    characterName: "Prof",
    isStartingNode: false,
    choices: [
      {
        id: "c26-13",
        text: "Fisso il vuoto e spero che la prof non faccia altre domande.",
        type: "passive",
        emoji: "👀",
        consequence: "La prof nota il disagio ma non capisce la situazione reale.",
        betterAlternative: "Dovresti spiegare la situazione con calma per difendere il tuo impegno.",
        nextScenarioId: null
      },
      {
        id: "c26-14",
        text: "Dico la verità: 'Io ho fatto la mia parte, gli altri non hanno consegnato la loro'.",
        type: "assertive",
        emoji: "🗣️",
        consequence: "Sei onesto ma professionale, mettendo in luce il tuo lavoro senza fare una scenata.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c26-15",
        text: "Punto il dito e urlo: 'È colpa loro, sono dei fannulloni!'",
        type: "impulsive",
        emoji: "👉",
        consequence: "La prof ti rimprovera per l'atteggiamento poco collaborativo e aggressivo.",
        betterAlternative: "Mantieni un tono calmo mentre spieghi oggettivamente come vi siete divisi il lavoro.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c26-16",
        text: "Prendo la colpa dicendo che non ci siamo capiti.",
        type: "passive",
        emoji: "😔",
        consequence: "Ti assumi colpe non tue, sminuendo il tuo vero impegno.",
        betterAlternative: "Non difendere chi non ha lavorato, sii trasparente sulle responsabilità.",
        nextScenarioId: null
      },
      {
        id: "c26-17",
        text: "Esponendo la mia parte, spiego come avremmo voluto sviluppare il resto se avessimo avuto tempo.",
        type: "assertive",
        emoji: "🧠",
        consequence: "Mostri intelligenza e capacità di problem solving, salvando in parte l'esposizione.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c26-18",
        text: "Lancio il foglio sulla cattedra e dico 'Mi rifiuto di continuare'.",
        type: "impulsive",
        emoji: "📄",
        consequence: "Prendi una nota e un grave richiamo disciplinare.",
        betterAlternative: "Completa la tua esposizione per dimostrare alla prof quello che hai preparato.",
        nextScenarioId: null,
        isCriticalFailure: true
      }
    ]
  },

  // CHAPTER 27
  "scen-online-cyber-1": {
    id: "scen-online-cyber-1",
    title: "Cyberbullismo",
    description: "Apri il telefono in camera e vedi che un tuo compagno ha creato un meme offensivo su di te.",
    dialogue: [{ speaker: "Compagno", text: "Hai visto cosa ti hanno fatto nel gruppo della classe? Ahahah!" }],
    background: "/assets/backgrounds/bg_bedroom.jpg",
    character: "/assets/characters/student.png",
    characterName: "Compagno",
    isStartingNode: true,
    choices: [
      {
        id: "c27-1",
        text: "Rispondo sul gruppo con una raffica di insulti a chi ha fatto il meme.",
        type: "impulsive",
        emoji: "🤬",
        consequence: "Fornisci loro la reazione esagerata che volevano e la situazione degenera.",
        betterAlternative: "Non rispondere a caldo, prenditi del tempo per sbollire.",
        nextScenarioId: "scen-online-cyber-2",
        isCriticalFailure: true
      },
      {
        id: "c27-2",
        text: "Faccio gli screenshot di tutto e silenzio il gruppo per ora.",
        type: "assertive",
        emoji: "📸",
        consequence: "Raccogli le prove e ti allontani dalla tossicità.",
        betterAlternative: "",
        nextScenarioId: "scen-online-cyber-2"
      },
      {
        id: "c27-3",
        text: "Chiudo l'app, mi butto sul letto e piango in silenzio.",
        type: "passive",
        emoji: "😢",
        consequence: "Ti senti sopraffatto e isolato col tuo dolore.",
        betterAlternative: "Parlane subito con un familiare o un amico fidato, non stare solo.",
        nextScenarioId: "scen-online-cyber-2"
      },
      {
        id: "c27-4",
        text: "Cancello l'app e faccio finta di non aver visto niente.",
        type: "passive",
        emoji: "🙈",
        consequence: "Il problema continua a esistere alle tue spalle senza che tu possa gestirlo.",
        betterAlternative: "Ignorare il problema online non lo farà sparire nel mondo reale.",
        nextScenarioId: "scen-online-cyber-2"
      },
      {
        id: "c27-5",
        text: "Scrivo in privato all'amministratore del gruppo chiedendo di rimuovere l'immagine.",
        type: "assertive",
        emoji: "✉️",
        consequence: "Agisci in modo mirato e calmo per fermare la diffusione.",
        betterAlternative: "",
        nextScenarioId: "scen-online-cyber-2"
      },
      {
        id: "c27-6",
        text: "Pubblico una mia foto imbarazzante per fare finta che la cosa mi diverta.",
        type: "impulsive",
        emoji: "🤡",
        consequence: "Ti umili da solo peggiorando la situazione, gli altri non rideranno con te, ma di te.",
        betterAlternative: "Non assecondare chi ti prende in giro.",
        nextScenarioId: "scen-online-cyber-2",
        isCriticalFailure: true
      }
    ]
  },
  "scen-online-cyber-2": {
    id: "scen-online-cyber-2",
    title: "Tutti hanno visto",
    description: "Il giorno dopo a scuola, nei corridoi, senti delle risatine e capisci che tutti hanno visto il meme.",
    dialogue: [{ speaker: "Bullo", text: "Ehi, bello il tuo nuovo ritratto! Sei famoso ora!" }],
    background: "/assets/backgrounds/bg_hallway.jpg",
    character: "/assets/characters/bully.png",
    characterName: "Bullo",
    isStartingNode: false,
    choices: [
      {
        id: "c27-7",
        text: "Spingo violentemente il bullo contro gli armadietti.",
        type: "impulsive",
        emoji: "🤜",
        consequence: "Passi dalla parte del torto per l'aggressione fisica e rischi la sospensione.",
        betterAlternative: "Non usare mai la violenza, affronta il problema verbalmente o tramite i professori.",
        nextScenarioId: "scen-online-cyber-3",
        isCriticalFailure: true
      },
      {
        id: "c27-8",
        text: "Abbasso lo sguardo e corro in bagno a nascondermi.",
        type: "passive",
        emoji: "🏃‍♂️",
        consequence: "Il bullo si sente forte e continuerà a tormentarti.",
        betterAlternative: "Cerca di mantenere il contatto visivo o allontanati con dignità, senza correre.",
        nextScenarioId: "scen-online-cyber-3"
      },
      {
        id: "c27-9",
        text: "Lo guardo dritto negli occhi e dico: 'Non è divertente, smettila'.",
        type: "assertive",
        emoji: "👁️",
        consequence: "La tua fermezza lo disorienta e mostra che non sei una vittima facile.",
        betterAlternative: "",
        nextScenarioId: "scen-online-cyber-3"
      },
      {
        id: "c27-10",
        text: "Faccio una risatina nervosa e dico 'Sì, molto divertente'.",
        type: "passive",
        emoji: "😅",
        consequence: "Sembra che tu stia accettando la presa in giro.",
        betterAlternative: "Non ridere alle loro battute offensive, legittimi il loro comportamento.",
        nextScenarioId: "scen-online-cyber-3"
      },
      {
        id: "c27-11",
        text: "Gli prendo il telefono di mano e lo scaravento a terra.",
        type: "impulsive",
        emoji: "📱",
        consequence: "Dovrai ripagare il telefono e subirai seri provvedimenti disciplinari.",
        betterAlternative: "Controlla la rabbia, distruggere le cose degli altri ti metterà solo nei guai.",
        nextScenarioId: "scen-online-cyber-3",
        isCriticalFailure: true
      },
      {
        id: "c27-12",
        text: "Mi giro verso i miei amici e dico ad alta voce: 'Andiamo, non perdiamo tempo con chi non ha una vita'.",
        type: "assertive",
        emoji: "🚶",
        consequence: "Sminuisci l'importanza del bullo appoggiandoti alla tua rete di amici.",
        betterAlternative: "",
        nextScenarioId: "scen-online-cyber-3"
      }
    ]
  },
  "scen-online-cyber-3": {
    id: "scen-online-cyber-3",
    title: "L'intervento",
    description: "Entri in classe visibilmente scosso. La professoressa nota che qualcosa non va.",
    dialogue: [{ speaker: "Prof", text: "Tutto bene? Ti vedo turbato, vuoi parlarne?" }],
    background: "/assets/backgrounds/bg_classroom.jpg",
    character: "/assets/characters/teacher.png",
    characterName: "Prof",
    isStartingNode: false,
    choices: [
      {
        id: "c27-13",
        text: "Dico: 'Non le importa niente, si faccia gli affari suoi!'",
        type: "impulsive",
        emoji: "😡",
        consequence: "Allontani l'unica persona che può aiutarti autorevolmente nella scuola.",
        betterAlternative: "Se non vuoi parlarne davanti a tutti, chiedi di farlo in disparte in modo educato.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c27-14",
        text: "Le chiedo se possiamo parlare un attimo fuori dalla classe.",
        type: "assertive",
        emoji: "🚪",
        consequence: "Ottieni uno spazio sicuro per mostrare le prove e spiegare la situazione.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c27-15",
        text: "Dico 'Sì tutto bene', e mi siedo sperando che finisca la giornata.",
        type: "passive",
        emoji: "😶",
        consequence: "La prof lascia perdere, ma il problema rimane irrisolto.",
        betterAlternative: "Accetta l'aiuto, i professori sanno come gestire il cyberbullismo.",
        nextScenarioId: null
      },
      {
        id: "c27-16",
        text: "Inizio a piangere di fronte a tutti e corro fuori dall'aula senza spiegazioni.",
        type: "impulsive",
        emoji: "😭",
        consequence: "Aumenti il senso di imbarazzo e ti ritrovi solo nei corridoi.",
        betterAlternative: "Respira, cerca di mantenere il controllo e chiedi di uscire regolarmente.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c27-17",
        text: "Scuoto la testa, ma a fine lezione mi fermo alla cattedra per parlarle in privato.",
        type: "assertive",
        emoji: "🕒",
        consequence: "Prendi tempo per calmarti, ma affronti il problema con la persona giusta.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c27-18",
        text: "Dico di avere mal di testa per essere mandato a casa.",
        type: "passive",
        emoji: "🤒",
        consequence: "Scappi dal problema, ma domani sarai punto e a capo.",
        betterAlternative: "Affronta il disagio parlandone con un adulto.",
        nextScenarioId: null
      }
    ]
  },

  // CHAPTER 28
  "scen-school-trip-1": {
    id: "scen-school-trip-1",
    title: "La Gita Scolastica",
    description: "Si sale sul pullman per la gita, ma nessuno vuole che ti sieda vicino a loro.",
    dialogue: [{ speaker: "Compagno", text: "Scusa, questo posto è occupato. Prova in fondo." }],
    background: "/assets/backgrounds/bg_bus.jpg",
    character: "/assets/characters/bully.png",
    characterName: "Compagno",
    isStartingNode: true,
    choices: [
      {
        id: "c28-1",
        text: "Butto lo zaino sul suo sedile e gli urlo in faccia: 'Io mi siedo qui!'",
        type: "impulsive",
        emoji: "🎒",
        consequence: "Si crea scompiglio nel pullman e il professore deve intervenire.",
        betterAlternative: "Non costringere le persone, cerca qualcuno che accetti la tua compagnia.",
        nextScenarioId: "scen-school-trip-2",
        isCriticalFailure: true
      },
      {
        id: "c28-2",
        text: "Dico: 'Va bene, cerco un altro posto', in modo calmo.",
        type: "assertive",
        emoji: "🚶",
        consequence: "Mantieni la calma e cerchi una soluzione senza creare drammi.",
        betterAlternative: "",
        nextScenarioId: "scen-school-trip-2"
      },
      {
        id: "c28-3",
        text: "Vado in fondo e mi siedo da solo fissando il finestrino.",
        type: "passive",
        emoji: "🪟",
        consequence: "Inizi la gita sentendoti escluso e triste.",
        betterAlternative: "Prova a chiedere di sederti vicino a qualcun altro prima di isolarti del tutto.",
        nextScenarioId: "scen-school-trip-2"
      },
      {
        id: "c28-4",
        text: "Mi lamento con la prof: 'Nessuno mi vuole vicino!'",
        type: "passive",
        emoji: "😩",
        consequence: "La prof ti affianca a qualcuno, ma la compagnia risulta forzata.",
        betterAlternative: "Prova a gestire la cosa autonomamente con un po' più di sicurezza prima di chiedere l'intervento della prof.",
        nextScenarioId: "scen-school-trip-2"
      },
      {
        id: "c28-5",
        text: "Do un calcio al suo sedile passando per il corridoio.",
        type: "impulsive",
        emoji: "🦵",
        consequence: "Il compagno si arrabbia e si crea un'atmosfera ostile fin dall'inizio.",
        betterAlternative: "Ignora le provocazioni ed evita reazioni fisiche.",
        nextScenarioId: "scen-school-trip-2",
        isCriticalFailure: true
      },
      {
        id: "c28-6",
        text: "Vedo un altro compagno da solo e gli chiedo 'Posso sedermi qui?' con un sorriso.",
        type: "assertive",
        emoji: "😊",
        consequence: "Trovi compagnia e inizi il viaggio in modo molto più piacevole.",
        betterAlternative: "",
        nextScenarioId: "scen-school-trip-2"
      }
    ]
  },
  "scen-school-trip-2": {
    id: "scen-school-trip-2",
    title: "Perso nel Parco",
    description: "Durante la visita al parco, ti distrai per guardare qualcosa e perdi di vista il gruppo.",
    dialogue: [{ speaker: "Sconosciuto", text: "Ehi ragazzo, ti sei perso? Cerchi qualcuno?" }],
    background: "/assets/backgrounds/bg_park.jpg",
    character: "/assets/characters/stranger.png",
    characterName: "Sconosciuto",
    isStartingNode: false,
    choices: [
      {
        id: "c28-7",
        text: "Inizio a correre a caso tra gli alberi urlando i nomi dei miei compagni.",
        type: "impulsive",
        emoji: "🏃",
        consequence: "Ti stanchi e ti disorienti ancora di più.",
        betterAlternative: "Fermati dove sei e contatta il professore dal telefono.",
        nextScenarioId: "scen-school-trip-3",
        isCriticalFailure: true
      },
      {
        id: "c28-8",
        text: "Ringrazio ma declino, mi fermo lì e chiamo il prof dal cellulare.",
        type: "assertive",
        emoji: "📱",
        consequence: "Agisci nel modo più sicuro ed efficiente, la prof viene a recuperarti.",
        betterAlternative: "",
        nextScenarioId: "scen-school-trip-3"
      },
      {
        id: "c28-9",
        text: "Faccio finta di sapere dove sto andando ed evito di rispondere allo sconosciuto.",
        type: "passive",
        emoji: "🚶",
        consequence: "Ti allontani sempre di più dal punto in cui ti hanno perso.",
        betterAlternative: "Ammetti di esserti perso, almeno a te stesso, e cerca il professore.",
        nextScenarioId: "scen-school-trip-3"
      },
      {
        id: "c28-10",
        text: "Vado in panico totale, piango e mi affido completamente allo sconosciuto.",
        type: "impulsive",
        emoji: "😭",
        consequence: "Ti metti in una situazione di potenziale pericolo.",
        betterAlternative: "Mantieni la calma, non seguire persone sconosciute e usa il telefono.",
        nextScenarioId: "scen-school-trip-3",
        isCriticalFailure: true
      },
      {
        id: "c28-11",
        text: "Chiedo allo sconosciuto se ha visto un gruppo scolastico e vado in quella direzione da solo.",
        type: "assertive",
        emoji: "🗺️",
        consequence: "Prendi un'informazione utile senza metterti in pericolo seguendo uno sconosciuto.",
        betterAlternative: "",
        nextScenarioId: "scen-school-trip-3"
      },
      {
        id: "c28-12",
        text: "Mi siedo su una panchina ad aspettare, sperando che qualcuno mi cerchi.",
        type: "passive",
        emoji: "🪑",
        consequence: "Prima o poi ti troveranno, ma perderete tutti molto tempo.",
        betterAlternative: "Prendi l'iniziativa e manda un messaggio ai compagni o al prof.",
        nextScenarioId: "scen-school-trip-3"
      }
    ]
  },
  "scen-school-trip-3": {
    id: "scen-school-trip-3",
    title: "Il Rimprovero",
    description: "Ti ricongiungi col gruppo, ma tutti ti guardano male perché li hai fatti ritardare sulla tabella di marcia.",
    dialogue: [{ speaker: "Prof", text: "Per colpa della tua distrazione abbiamo perso la visita al museo. Dovevi stare attento." }],
    background: "/assets/backgrounds/bg_street.jpg",
    character: "/assets/characters/teacher.png",
    characterName: "Prof",
    isStartingNode: false,
    choices: [
      {
        id: "c28-13",
        text: "Mi scuso sinceramente con tutti spiegando che mi sono distratto, senza cercare scuse.",
        type: "assertive",
        emoji: "🙏",
        consequence: "I compagni apprezzano l'onestà e la tensione si abbassa in fretta.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c28-14",
        text: "Urlo: 'Non è colpa mia se voi andavate troppo veloci e mi avete lasciato indietro!'",
        type: "impulsive",
        emoji: "😤",
        consequence: "La classe si infastidisce molto per il tuo scaricabarile e la prof si arrabbia.",
        betterAlternative: "Prenditi la responsabilità della tua disattenzione.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c28-15",
        text: "Guardo per terra muto, sentendomi il peggiore del mondo.",
        type: "passive",
        emoji: "😞",
        consequence: "Rimani chiuso nel tuo senso di colpa per il resto della giornata.",
        betterAlternative: "Scusarsi apertamente aiuta a chiudere l'incidente.",
        nextScenarioId: null
      },
      {
        id: "c28-16",
        text: "Incolpo qualcun altro dicendo 'Lui non mi ha aspettato!'.",
        type: "impulsive",
        emoji: "👉",
        consequence: "Causi una lite inutile, peggiorando le cose.",
        betterAlternative: "Non puntare il dito contro gli altri se sei stato tu a distrarti.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c28-17",
        text: "Chiedo scusa e chiedo se c'è un'altra attività che possiamo fare adesso.",
        type: "assertive",
        emoji: "💡",
        consequence: "Ti assumi la responsabilità e proponi di andare avanti, migliorando il clima.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c28-18",
        text: "Mi allontano un po' dal gruppo facendo finta di non sentirli.",
        type: "passive",
        emoji: "🎧",
        consequence: "Sembra che a te non importi nulla di aver causato il ritardo.",
        betterAlternative: "Dimostra che hai capito l'errore e che ti dispiace.",
        nextScenarioId: null
      }
    ]
  },

  // CHAPTER 29
  "scen-family-siblings-1": {
    id: "scen-family-siblings-1",
    title: "Fratelli e Sorelle",
    description: "Torni in camera tua e scopri che tuo fratello/sorella ti ha preso delle cose senza chiedere il permesso.",
    dialogue: [{ speaker: "Fratello", text: "Oh dai, non fare così, mi serviva solo per un attimo, poi te lo ridavo." }],
    background: "/assets/backgrounds/bg_bedroom.jpg",
    character: "/assets/characters/student.png",
    characterName: "Fratello",
    isStartingNode: true,
    choices: [
      {
        id: "c29-1",
        text: "Gli/le strappo l'oggetto dalle mani e gli tiro un pugno.",
        type: "impulsive",
        emoji: "🥊",
        consequence: "Inizia una rissa, ci si fa male e passerai tu dalla parte del torto.",
        betterAlternative: "Niente violenza. Riprendi le tue cose a parole.",
        nextScenarioId: "scen-family-siblings-2",
        isCriticalFailure: true
      },
      {
        id: "c29-2",
        text: "Dico in tono fermo: 'Non puoi prendere le mie cose senza chiedere. Ridammelo subito'.",
        type: "assertive",
        emoji: "🛑",
        consequence: "Stabilisci i tuoi confini in modo netto ma civile.",
        betterAlternative: "",
        nextScenarioId: "scen-family-siblings-2"
      },
      {
        id: "c29-3",
        text: "Lascio perdere, tanto lo fa sempre e non cambierà mai.",
        type: "passive",
        emoji: "😩",
        consequence: "Continuerà a invadere il tuo spazio, sapendo che non reagisci.",
        betterAlternative: "Difendi i tuoi spazi e le tue cose.",
        nextScenarioId: "scen-family-siblings-2"
      },
      {
        id: "c29-4",
        text: "Prendo qualcosa di suo e la butto fuori dalla finestra per vendetta.",
        type: "impulsive",
        emoji: "🗑️",
        consequence: "Distruggi la fiducia e causi danni economici, facendo arrabbiare tutti.",
        betterAlternative: "Non scendere al suo livello, due torti non fanno una ragione.",
        nextScenarioId: "scen-family-siblings-2",
        isCriticalFailure: true
      },
      {
        id: "c29-5",
        text: "Gli chiedo di restituirmelo promettendo di prestarglielo la prossima volta se me lo chiede per favore.",
        type: "assertive",
        emoji: "🤝",
        consequence: "Educhi al rispetto reciproco lasciando aperta la porta per il futuro.",
        betterAlternative: "",
        nextScenarioId: "scen-family-siblings-2"
      },
      {
        id: "c29-6",
        text: "Mi chiudo in bagno e aspetto che se ne vada.",
        type: "passive",
        emoji: "🚪",
        consequence: "Non risolvi il problema e perdi il controllo delle tue cose.",
        betterAlternative: "Affronta il conflitto a viso aperto, senza fuggire.",
        nextScenarioId: "scen-family-siblings-2"
      }
    ]
  },
  "scen-family-siblings-2": {
    id: "scen-family-siblings-2",
    title: "I Genitori Intervengono",
    description: "Sentendo trambusto, arriva un genitore. Sembra prendere subito le parti dell'altro, dicendoti di essere più flessibile.",
    dialogue: [{ speaker: "Genitore", text: "Ma insomma! È più piccolo/a, lascialo/a fare, non fare sempre storie per le tue cose!" }],
    background: "/assets/backgrounds/bg_home.jpg",
    character: "/assets/characters/char_parent.png",
    characterName: "Genitore",
    isStartingNode: false,
    choices: [
      {
        id: "c29-7",
        text: "Urlo: 'Siete ingiusti! Preferite sempre lui/lei!' e sbatto la porta.",
        type: "impulsive",
        emoji: "💥",
        consequence: "Sembri capriccioso e non fai valere le tue vere ragioni.",
        betterAlternative: "Spiega con calma che non si tratta di essere flessibili, ma del rispetto della tua privacy.",
        nextScenarioId: "scen-family-siblings-3",
        isCriticalFailure: true
      },
      {
        id: "c29-8",
        text: "Abbasso la testa e dico 'Va bene, scusa', sentendomi incompreso.",
        type: "passive",
        emoji: "😔",
        consequence: "I tuoi genitori penseranno di aver risolto, ma tu accumulerai rancore.",
        betterAlternative: "Fai capire le tue ragioni invece di arrenderti.",
        nextScenarioId: "scen-family-siblings-3"
      },
      {
        id: "c29-9",
        text: "Dico calmo: 'Non mi dà fastidio prestare, mi dà fastidio che prenda senza permesso. Ho bisogno dei miei spazi'.",
        type: "assertive",
        emoji: "🗣️",
        consequence: "Il genitore si ferma a riflettere capendo il vero fulcro del problema.",
        betterAlternative: "",
        nextScenarioId: "scen-family-siblings-3"
      },
      {
        id: "c29-10",
        text: "Me ne vado via di casa in silenzio.",
        type: "impulsive",
        emoji: "🚶",
        consequence: "Fai preoccupare tutti inutilmente senza risolvere la questione.",
        betterAlternative: "Rimani e cerca di comunicare le tue emozioni in modo chiaro.",
        nextScenarioId: "scen-family-siblings-3",
        isCriticalFailure: true
      },
      {
        id: "c29-11",
        text: "Propongo: 'Possiamo fare una regola uguale per tutti in casa sulle cose private?'",
        type: "assertive",
        emoji: "⚖️",
        consequence: "Mostri molta maturità e promuovi l'equità.",
        betterAlternative: "",
        nextScenarioId: "scen-family-siblings-3"
      },
      {
        id: "c29-12",
        text: "Do ragione ai miei genitori e faccio finta che la cosa non mi pesi.",
        type: "passive",
        emoji: "🎭",
        consequence: "Reprimenti i tuoi veri sentimenti e il problema si ripresenterà.",
        betterAlternative: "Sii onesto con loro su quanto questa cosa ti dia fastidio.",
        nextScenarioId: "scen-family-siblings-3"
      }
    ]
  },
  "scen-family-siblings-3": {
    id: "scen-family-siblings-3",
    title: "La Pace Armata",
    description: "Siete in cucina più tardi. La tensione è ancora alta e tuo fratello/sorella ti lancia uno sguardo di sfida.",
    dialogue: [{ speaker: "Genitore", text: "Forza, cercate di fare pace. Siete fratelli." }],
    background: "/assets/backgrounds/bg_kitchen.jpg",
    character: "/assets/characters/char_parent.png",
    characterName: "Genitore",
    isStartingNode: false,
    choices: [
      {
        id: "c29-13",
        text: "Gli rovescio il bicchiere d'acqua addosso 'per sbaglio'.",
        type: "impulsive",
        emoji: "💦",
        consequence: "Riaccedi la lite e vieni punito, passando tu totalmente dalla parte del torto.",
        betterAlternative: "Smetti di vendicarti e cerca una riconciliazione.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c29-14",
        text: "Lo ignoro totalmente e mangio in silenzio fissando il piatto.",
        type: "passive",
        emoji: "🍽️",
        consequence: "La cena procede con un clima gelido e pesante.",
        betterAlternative: "Fare un piccolo passo avanti aiuta a distendere l'aria.",
        nextScenarioId: null
      },
      {
        id: "c29-15",
        text: "Dico: 'Se la prossima volta mi chiedi il permesso, te lo presto volentieri'.",
        type: "assertive",
        emoji: "💬",
        consequence: "Sei costruttivo e chiarisci le tue condizioni di pace.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c29-16",
        text: "Urlo 'Non farò mai pace!' e lascio la tavola.",
        type: "impulsive",
        emoji: "🏃",
        consequence: "Ti rovini la serata ed esasperi i tuoi genitori.",
        betterAlternative: "Puoi essere ancora arrabbiato senza bisogno di fare scenate, rimani a tavola.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c29-17",
        text: "Accetto la scusa anche se lui non sembra sincero, per far contenti i genitori.",
        type: "passive",
        emoji: "🤷",
        consequence: "Apparentemente è tutto a posto, ma la vera questione rimane irrisolta.",
        betterAlternative: "Esigi sincerità o chiarisci che il tuo perdono dipende dal suo comportamento futuro.",
        nextScenarioId: null
      },
      {
        id: "c29-18",
        text: "Gli do una pacca amichevole e gli spiego perché per me le mie cose sono importanti.",
        type: "assertive",
        emoji: "🫂",
        consequence: "Fai un gesto di apertura accompagnato da una comunicazione onesta.",
        betterAlternative: "",
        nextScenarioId: null
      }
    ]
  },

  // CHAPTER 30
  "scen-school-lastday-1": {
    id: "scen-school-lastday-1",
    title: "L'Ultimo Giorno",
    description: "È l'ultimo giorno di scuola. C'è euforia nell'aria, ma anche una forte ansia per cosa accadrà il prossimo anno.",
    dialogue: [{ speaker: "Prof", text: "Ragazzi, vi auguro buone vacanze e in bocca al lupo per il prossimo anno. Rilassatevi, ma non dimenticate tutto!" }],
    background: "/assets/backgrounds/bg_classroom.jpg",
    character: "/assets/characters/teacher.png",
    characterName: "Prof",
    isStartingNode: true,
    choices: [
      {
        id: "c30-1",
        text: "Salto sui banchi e inizio a strappare i quaderni lanciandoli per aria.",
        type: "impulsive",
        emoji: "📄",
        consequence: "Vieni ripreso e richiami un'attenzione negativa, rovinando il momento.",
        betterAlternative: "Festeggia con entusiasmo ma senza distruggere le cose.",
        nextScenarioId: "scen-school-lastday-2",
        isCriticalFailure: true
      },
      {
        id: "c30-2",
        text: "Vado a salutare la prof e la ringrazio per l'anno trascorso.",
        type: "assertive",
        emoji: "🤝",
        consequence: "Lasci un bel ricordo e chiudi l'anno in modo maturo.",
        betterAlternative: "",
        nextScenarioId: "scen-school-lastday-2"
      },
      {
        id: "c30-3",
        text: "Scappo via appena suona la campanella senza salutare nessuno per l'ansia.",
        type: "passive",
        emoji: "🏃",
        consequence: "Perdi l'occasione di condividere la gioia della fine dell'anno con i compagni.",
        betterAlternative: "Rimani qualche minuto per i saluti, l'ansia passerà condividendo il momento.",
        nextScenarioId: "scen-school-lastday-2"
      },
      {
        id: "c30-4",
        text: "Urlo alla prof che la sua materia era la peggiore di tutte.",
        type: "impulsive",
        emoji: "🗣️",
        consequence: "Ti lasci andare a una cattiveria inutile che rovina il clima festoso.",
        betterAlternative: "Se non ti è piaciuta la materia, puoi semplicemente tacere o sorridere educatamente.",
        nextScenarioId: "scen-school-lastday-2",
        isCriticalFailure: true
      },
      {
        id: "c30-5",
        text: "Mi siedo con i miei amici e propongo di scambiarci i numeri per l'estate.",
        type: "assertive",
        emoji: "📱",
        consequence: "Ti assicuri di mantenere i contatti importanti.",
        betterAlternative: "",
        nextScenarioId: "scen-school-lastday-2"
      },
      {
        id: "c30-6",
        text: "Mi metto in un angolo aspettando che qualcuno venga a salutarmi.",
        type: "passive",
        emoji: "🧍",
        consequence: "Molti potrebbero non notarti in mezzo al caos.",
        betterAlternative: "Prendi l'iniziativa, fai tu il primo passo per salutare chi ti è simpatico.",
        nextScenarioId: "scen-school-lastday-2"
      }
    ]
  },
  "scen-school-lastday-2": {
    id: "scen-school-lastday-2",
    title: "La Partenza",
    description: "Andando verso casa, passi per il parco. Il tuo migliore amico ti dice che forse l'anno prossimo si trasferirà.",
    dialogue: [{ speaker: "Amico", text: "Ascolta... forse a settembre non sarò più in questa scuola. I miei si trasferiscono." }],
    background: "/assets/backgrounds/bg_park.jpg",
    character: "/assets/characters/friend.png",
    characterName: "Amico",
    isStartingNode: false,
    choices: [
      {
        id: "c30-7",
        text: "Mi arrabbio con lui: 'Come puoi abbandonarmi?!' e me ne vado.",
        type: "impulsive",
        emoji: "😡",
        consequence: "Lo fai sentire in colpa per qualcosa che non dipende da lui.",
        betterAlternative: "Mostra comprensione, non è stata una sua scelta.",
        nextScenarioId: "scen-school-lastday-3",
        isCriticalFailure: true
      },
      {
        id: "c30-8",
        text: "Faccio finta di niente e cambio subito discorso.",
        type: "passive",
        emoji: "🤐",
        consequence: "L'amico pensa che a te non importi nulla di lui.",
        betterAlternative: "Esprimi il tuo dispiacere e fai domande sul suo trasferimento.",
        nextScenarioId: "scen-school-lastday-3"
      },
      {
        id: "c30-9",
        text: "Gli dico: 'Mi dispiacerà tantissimo, ma troveremo il modo di sentirci!'",
        type: "assertive",
        emoji: "🫂",
        consequence: "Condividi la tristezza ma mantieni un atteggiamento positivo per il futuro.",
        betterAlternative: "",
        nextScenarioId: "scen-school-lastday-3"
      },
      {
        id: "c30-10",
        text: "Gli propongo di goderci al massimo questa estate prima di pensare a settembre.",
        type: "assertive",
        emoji: "☀️",
        consequence: "Sposti l'attenzione sul presente e su ciò che potete ancora controllare.",
        betterAlternative: "",
        nextScenarioId: "scen-school-lastday-3"
      },
      {
        id: "c30-11",
        text: "Scoppio a piangere disperatamente abbracciandolo in mezzo al parco senza fermarmi.",
        type: "impulsive",
        emoji: "😭",
        consequence: "Ti lasci sopraffare dall'emozione mettendo in imbarazzo il tuo amico.",
        betterAlternative: "Va bene emozionarsi, ma cerca di mantenere un dialogo calmo con lui.",
        nextScenarioId: "scen-school-lastday-3",
        isCriticalFailure: true
      },
      {
        id: "c30-12",
        text: "Guardo a terra dicendo 'Ah, ok. Peccato'.",
        type: "passive",
        emoji: "😐",
        consequence: "Sembri molto freddo e distaccato.",
        betterAlternative: "Mostra il tuo affetto e interesse, non nasconderti dietro all'indifferenza.",
        nextScenarioId: "scen-school-lastday-3"
      }
    ]
  },
  "scen-school-lastday-3": {
    id: "scen-school-lastday-3",
    title: "Verso il Futuro",
    description: "Torni a casa camminando da solo. L'ansia per l'incertezza del futuro si fa sentire, ma sai che devi fare una promessa a te stesso.",
    dialogue: [{ speaker: "Tu", text: "(È finita un'altra tappa. Come voglio affrontare il prossimo anno?)" }],
    background: "/assets/backgrounds/bg_street.jpg",
    character: "/assets/characters/student.png",
    characterName: "Tu",
    isStartingNode: false,
    choices: [
      {
        id: "c30-13",
        text: "Tiro un calcio forte a un bidone per sfogare la tensione accumulata.",
        type: "impulsive",
        emoji: "🗑️",
        consequence: "Ti fai male al piede e attiri gli sguardi della gente.",
        betterAlternative: "Respira profondo, l'aggressività non ti aiuta a superare l'ansia.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c30-14",
        text: "Prometto a me stesso che lavorerò per essere più organizzato e meno impulsivo.",
        type: "assertive",
        emoji: "🌱",
        consequence: "Ti poni un obiettivo di crescita realistico e positivo per il futuro.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c30-15",
        text: "Penso che non cambierà mai nulla, farò sempre fatica.",
        type: "passive",
        emoji: "🌧️",
        consequence: "Ti riempi di negatività sabotando te stesso fin da ora.",
        betterAlternative: "Credi nelle tue capacità di miglioramento e focalizzati sulle cose belle.",
        nextScenarioId: null
      },
      {
        id: "c30-16",
        text: "Urlo: 'Al diavolo la scuola, non mi importa di niente!' in mezzo alla strada.",
        type: "impulsive",
        emoji: "🗣️",
        consequence: "Agisci fuori controllo, alimentando la tua stessa ansia invece di placarla.",
        betterAlternative: "Accetta che la scuola è una parte della tua vita e impara a conviverci meglio.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c30-17",
        text: "Mi fermo un attimo a riflettere su tutte le cose buone che ho fatto quest'anno.",
        type: "assertive",
        emoji: "🏆",
        consequence: "Ti dai la giusta gratificazione per i tuoi sforzi e alzi la tua autostima.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c30-18",
        text: "Spero solo che il prossimo anno sia più facile per magia, senza impegnarmi.",
        type: "passive",
        emoji: "✨",
        consequence: "La passività non ti permetterà di crescere né di affrontare le sfide.",
        betterAlternative: "Sii proattivo: le cose migliorano se tu ti impegni per migliorarle.",
        nextScenarioId: null
      }
    ]
  }
};
