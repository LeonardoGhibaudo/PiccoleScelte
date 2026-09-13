import type { Scenario } from '../types';

export const CHAPTERS_16_20: Record<string, Scenario> = {
  // CHAPTER 16: Il Compito Impossibile
  "scen-school-compito-1": {
    id: "scen-school-compito-1",
    title: "Una Montagna di Compiti",
    description: "La prof ha appena assegnato una ricerca lunghissima. Ti sembra impossibile da finire e non sai da dove iniziare.",
    dialogue: [{ speaker: "Prof", text: "Ragazzi, questa ricerca vale per il voto finale. Voglio almeno 10 pagine entro lunedì." }],
    background: "/assets/backgrounds/bg_classroom.jpg",
    character: "/assets/characters/teacher.png",
    characterName: "Prof",
    isStartingNode: true,
    choices: [
      {
        id: "c16-1-1",
        text: "Alzi la mano e chiedi se puoi presentare il lavoro a tappe.",
        type: "assertive",
        emoji: "",
        consequence: "La prof apprezza la tua proposta e accetta di farti consegnare una prima bozza giovedì.",
        betterAlternative: "",
        nextScenarioId: "scen-school-compito-2"
      },
      {
        id: "c16-1-2",
        text: "Stracci il foglio degli appunti urlando che non lo farai mai.",
        type: "impulsive",
        emoji: "",
        consequence: "La prof si arrabbia per la tua reazione e ti mette una nota sul registro.",
        betterAlternative: "Urlando peggiori solo la situazione, prova a fare un respiro e chiedere chiarimenti.",
        nextScenarioId: "scen-school-compito-2",
        isCriticalFailure: true
      },
      {
        id: "c16-1-3",
        text: "Metti via il foglio nello zaino e fai finta di non averlo ricevuto.",
        type: "passive",
        emoji: "",
        consequence: "Arrivi a casa e l'ansia aumenta perché sai che prima o poi dovrai affrontarlo.",
        betterAlternative: "Ignorare il problema lo renderà solo più grande.",
        nextScenarioId: "scen-school-compito-2"
      },
      {
        id: "c16-1-4",
        text: "Inizi a lamentarti ad alta voce disturbando tutta la classe.",
        type: "impulsive",
        emoji: "",
        consequence: "Vieni rimproverato davanti a tutti e ti senti ancora più frustrato.",
        betterAlternative: "Esprimere il disagio disturbando gli altri non ti aiuta a risolvere il compito.",
        nextScenarioId: "scen-school-compito-2",
        isCriticalFailure: true
      },
      {
        id: "c16-1-5",
        text: "Fissi il vuoto sentendoti incapace di fare qualsiasi cosa.",
        type: "passive",
        emoji: "",
        consequence: "Perdi l'occasione di chiedere aiuto mentre sei ancora in classe.",
        betterAlternative: "Rimanere bloccati nei propri pensieri non cambia la situazione, chiedi supporto.",
        nextScenarioId: "scen-school-compito-2"
      },
      {
        id: "c16-1-6",
        text: "Segni subito sul diario cosa ti serve per iniziare, così da non pensarci ora.",
        type: "assertive",
        emoji: "",
        consequence: "Scrivere i materiali ti aiuta a calmare la mente per il momento.",
        betterAlternative: "",
        nextScenarioId: "scen-school-compito-2"
      }
    ]
  },
  "scen-school-compito-2": {
    id: "scen-school-compito-2",
    title: "Bloccati a Casa",
    description: "Sei a casa da solo davanti al foglio bianco. L'ansia sale e la concentrazione è zero.",
    dialogue: [{ speaker: "Pensiero", text: "È troppo difficile... non ce la farò mai, è inutile provarci." }],
    background: "/assets/backgrounds/bg_bedroom.jpg",
    character: "/assets/characters/student.png",
    characterName: "Pensiero",
    isStartingNode: false,
    choices: [
      {
        id: "c16-2-1",
        text: "Chiudi tutto e vai a giocare ai videogiochi ignorando il dovere.",
        type: "impulsive",
        emoji: "",
        consequence: "Giochi per ore ma l'ansia di fondo non ti fa divertire davvero.",
        betterAlternative: "Procrastinare all'estremo aumenterà lo stress in seguito.",
        nextScenarioId: "scen-school-compito-3",
        isCriticalFailure: true
      },
      {
        id: "c16-2-2",
        text: "Resti fermo a fissare il quaderno, piangendo di frustrazione in silenzio.",
        type: "passive",
        emoji: "",
        consequence: "Passi il pomeriggio sentendoti malissimo, senza fare progressi.",
        betterAlternative: "Piangere va bene per sfogarsi, ma poi prova a spezzare il lavoro in parti minuscole.",
        nextScenarioId: "scen-school-compito-3"
      },
      {
        id: "c16-2-3",
        text: "Punti un timer a 10 minuti per fare solo l'introduzione e poi pausa.",
        type: "assertive",
        emoji: "",
        consequence: "Inizi a scrivere e scopri che, una volta partiti, è meno terribile del previsto.",
        betterAlternative: "",
        nextScenarioId: "scen-school-compito-3"
      },
      {
        id: "c16-2-4",
        text: "Strappi un'altra volta le bozze fatte male e le lanci per la stanza.",
        type: "impulsive",
        emoji: "",
        consequence: "La stanza è in disordine e hai sprecato i pochi appunti buoni.",
        betterAlternative: "La rabbia ti fa distruggere il tuo stesso lavoro. Fai una passeggiata invece.",
        nextScenarioId: "scen-school-compito-3",
        isCriticalFailure: true
      },
      {
        id: "c16-2-5",
        text: "Chiami un compagno per chiedergli come si è organizzato lui.",
        type: "assertive",
        emoji: "",
        consequence: "Il tuo compagno ti dà uno schema utile da seguire e ti rassicura.",
        betterAlternative: "",
        nextScenarioId: "scen-school-compito-3"
      },
      {
        id: "c16-2-6",
        text: "Fai finta di stare studiando nel caso entri qualcuno in camera, ma navighi su internet.",
        type: "passive",
        emoji: "",
        consequence: "La finzione ti fa sentire in colpa e non risolve il problema dei compiti.",
        betterAlternative: "Sii onesto con te stesso: se non riesci a studiare, chiedi aiuto alla tua famiglia.",
        nextScenarioId: "scen-school-compito-3"
      }
    ]
  },
  "scen-school-compito-3": {
    id: "scen-school-compito-3",
    title: "Chiedere Aiuto",
    description: "Il giorno dopo, torni a scuola. Hai fatto molto poco, ma la prof ti chiede come procede.",
    dialogue: [{ speaker: "Prof", text: "Allora, come sta andando l'inizio della ricerca? Ci sono problemi?" }],
    background: "/assets/backgrounds/bg_classroom.jpg",
    character: "/assets/characters/teacher.png",
    characterName: "Prof",
    isStartingNode: false,
    choices: [
      {
        id: "c16-3-1",
        text: "Menti dicendo che hai già fatto tre pagine perfette.",
        type: "passive",
        emoji: "",
        consequence: "La prof si aspetta molto e tu sei terrorizzato per quando dovrai consegnarle davvero.",
        betterAlternative: "Le bugie creano aspettative che ti genereranno ancora più ansia in futuro.",
        nextScenarioId: null
      },
      {
        id: "c16-3-2",
        text: "Ammetti la difficoltà: 'Prof, mi sono bloccato subito. Mi serve un consiglio.'",
        type: "assertive",
        emoji: "",
        consequence: "La prof apprezza la tua onestà e ti mostra un metodo per iniziare le ricerche.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c16-3-3",
        text: "Ti arrabbi con la prof: 'È colpa sua se dà cose impossibili da fare!'",
        type: "impulsive",
        emoji: "",
        consequence: "Finisci in presidenza per aver alzato la voce e insultato l'insegnante.",
        betterAlternative: "Incolpare gli altri in modo aggressivo non ti insegna a gestire lo stress e peggiora la relazione.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c16-3-4",
        text: "Chiedi scusa umilmente, dicendo che sei stupido e non ci riuscirai mai.",
        type: "passive",
        emoji: "",
        consequence: "La prof cerca di consolarti ma ti senti mortificato davanti ai compagni.",
        betterAlternative: "Non svilirti: avere difficoltà a iniziare è comune, non significa essere stupidi.",
        nextScenarioId: null
      },
      {
        id: "c16-3-5",
        text: "Interrompi la prof dicendo ad alta voce 'Non me ne frega niente di questa ricerca!'",
        type: "impulsive",
        emoji: "",
        consequence: "Crei tensione in classe e allontani la possibilità di ricevere un vero aiuto.",
        betterAlternative: "Fare finta che non ti importi è una difesa, ma alla fine ti danneggia.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c16-3-6",
        text: "Le mostri l'unico paragrafo che sei riuscito a fare e le chiedi se va bene così.",
        type: "assertive",
        emoji: "",
        consequence: "Ti fa i complimenti per l'impegno iniziale e ti dà un feedback costruttivo per continuare.",
        betterAlternative: "",
        nextScenarioId: null
      }
    ]
  },

  // CHAPTER 17: Il Litigio Online
  "scen-friends-litigio-1": {
    id: "scen-friends-litigio-1",
    title: "Messaggio Offensivo",
    description: "Sei in camera e guardi il telefono. Un amico manda una foto buffa di te nel gruppo classe, prendendoti in giro pesantemente.",
    dialogue: [{ speaker: "Amico", text: "Ahaha guardate che faccia ha fatto oggi! Sembra proprio uno sfigato." }],
    background: "/assets/backgrounds/bg_bedroom.jpg",
    character: "/assets/characters/friend.png",
    characterName: "Amico",
    isStartingNode: true,
    choices: [
      {
        id: "c17-1-1",
        text: "Rispondi immediatamente insultandolo con le parole peggiori che conosci.",
        type: "impulsive",
        emoji: "",
        consequence: "Gli altri screenshottono il tuo messaggio e la situazione degenera in pochi minuti.",
        betterAlternative: "Rispondere con rabbia ti mette dalla parte del torto, prenditi un minuto prima di scrivere.",
        nextScenarioId: "scen-friends-litigio-2",
        isCriticalFailure: true
      },
      {
        id: "c17-1-2",
        text: "Ignori il messaggio, chiudi la chat e fai finta di non averlo mai letto.",
        type: "passive",
        emoji: "",
        consequence: "Tieni dentro la rabbia, ma la prendicolazione continua mentre tu ci stai male in silenzio.",
        betterAlternative: "Ignorarlo ti farà accumulare tristezza, devi difendere te stesso in modo sano.",
        nextScenarioId: "scen-friends-litigio-2"
      },
      {
        id: "c17-1-3",
        text: "Esci d'impulso dal gruppo senza dire niente a nessuno.",
        type: "impulsive",
        emoji: "",
        consequence: "Sembra che tu sia scappato, e l'amico continua a parlare male di te indisturbato.",
        betterAlternative: "Uscire bruscamente dà agli altri più potere, prova a esprimere prima come ti senti.",
        nextScenarioId: "scen-friends-litigio-2",
        isCriticalFailure: true
      },
      {
        id: "c17-1-4",
        text: "Scrivi nel gruppo: 'Questa foto non mi fa ridere, per favore cancellala.'",
        type: "assertive",
        emoji: "",
        consequence: "Alcuni compagni si rendono conto dell'esagerazione e chiedono di smetterla.",
        betterAlternative: "",
        nextScenarioId: "scen-friends-litigio-2"
      },
      {
        id: "c17-1-5",
        text: "Mandi un vocale piangendo, chiedendo perché ti odiano tutti.",
        type: "passive",
        emoji: "",
        consequence: "Ti rendi vulnerabile davanti a persone che in quel momento stanno ridendo, e ti penti subito.",
        betterAlternative: "Condividere le proprie debolezze con chi ti bullizza può esporti a ulteriori attacchi.",
        nextScenarioId: "scen-friends-litigio-2"
      },
      {
        id: "c17-1-6",
        text: "Scrivi in privato all'amico spiegandogli che la sua battuta ti ha ferito.",
        type: "assertive",
        emoji: "",
        consequence: "In privato l'amico smette di fare il gradasso e si scusa, ammettendo di aver esagerato.",
        betterAlternative: "",
        nextScenarioId: "scen-friends-litigio-2"
      }
    ]
  },
  "scen-friends-litigio-2": {
    id: "scen-friends-litigio-2",
    title: "Le Fazioni",
    description: "La chat è nel caos. Altri compagni iniziano a prendere le parti tue o dell'amico, litigando tra loro.",
    dialogue: [{ speaker: "Pensiero", text: "Ora tutti stanno litigando per colpa mia. Cosa dovrei fare?" }],
    background: "/assets/backgrounds/bg_bedroom.jpg",
    character: "/assets/characters/student.png",
    characterName: "Pensiero",
    isStartingNode: false,
    choices: [
      {
        id: "c17-2-1",
        text: "Scrivi un messaggio chiaro invitando tutti a calmarsi e non ingigantire la cosa.",
        type: "assertive",
        emoji: "",
        consequence: "Alcuni smettono di litigare, la discussione pian piano si sgonfia.",
        betterAlternative: "",
        nextScenarioId: "scen-friends-litigio-3"
      },
      {
        id: "c17-2-2",
        text: "Metti il telefono in silenzioso e lasci che gli altri si scannino al posto tuo.",
        type: "passive",
        emoji: "",
        consequence: "Il litigio prosegue per ore, creando spaccature pesanti nella classe.",
        betterAlternative: "Evitare del tutto la situazione quando sei coinvolto ti impedisce di risolverla.",
        nextScenarioId: "scen-friends-litigio-3"
      },
      {
        id: "c17-2-3",
        text: "Inizi a prendere in giro chi non è d'accordo con te per vendicarti.",
        type: "impulsive",
        emoji: "",
        consequence: "Diventi a tua volta un bullo e perdi anche il supporto di chi voleva aiutarti.",
        betterAlternative: "Restituire l'offesa peggiora la situazione e ti mette al loro stesso livello.",
        nextScenarioId: "scen-friends-litigio-3",
        isCriticalFailure: true
      },
      {
        id: "c17-2-4",
        text: "Mandi messaggi privati a chi ti difende per alimentare la rabbia contro l'altro ragazzo.",
        type: "impulsive",
        emoji: "",
        consequence: "Crei complotti segreti, generando ancora più drammi e pettegolezzi.",
        betterAlternative: "Aizzare le persone di nascosto è un comportamento tossico che non risolve nulla.",
        nextScenarioId: "scen-friends-litigio-3",
        isCriticalFailure: true
      },
      {
        id: "c17-2-5",
        text: "Chiedi scusa a tutti, addossandoti colpe non tue pur di farli smettere.",
        type: "passive",
        emoji: "",
        consequence: "Tutti pensano che tu abbia torto e tu ti senti uno straccio.",
        betterAlternative: "Non scusarti per colpe degli altri solo per evitare un conflitto.",
        nextScenarioId: "scen-friends-litigio-3"
      },
      {
        id: "c17-2-6",
        text: "Disattivi le notifiche del gruppo e ne parli con i tuoi genitori per avere un consiglio.",
        type: "assertive",
        emoji: "",
        consequence: "Un adulto ti dà una prospettiva utile e ti senti meno solo in questa situazione.",
        betterAlternative: "",
        nextScenarioId: "scen-friends-litigio-3"
      }
    ]
  },
  "scen-friends-litigio-3": {
    id: "scen-friends-litigio-3",
    title: "Confronto a Scuola",
    description: "È il mattino dopo, incontri nei corridoi il ragazzo che ha fatto partire tutto. L'aria è tesa.",
    dialogue: [{ speaker: "Amico", text: "Ehi, non fare l'offeso, era solo uno scherzo ieri..." }],
    background: "/assets/backgrounds/bg_hallway.jpg",
    character: "/assets/characters/friend.png",
    characterName: "Amico",
    isStartingNode: false,
    choices: [
      {
        id: "c17-3-1",
        text: "Lo spintoni contro gli armadietti per fargli capire che non scherzi.",
        type: "impulsive",
        emoji: "",
        consequence: "Finisci dritto dal preside, e passi tu per l'aggressore invece che la vittima.",
        betterAlternative: "L'uso della violenza ti fa sempre passare automaticamente dalla parte del torto.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c17-3-2",
        text: "Abbassi lo sguardo e gli dai ragione, sorridendo in modo finto.",
        type: "passive",
        emoji: "",
        consequence: "Lui capisce che può continuarti a prendere in giro perché non ti difendi.",
        betterAlternative: "Sottometterti per paura dà il via libera a nuovi episodi simili in futuro.",
        nextScenarioId: null
      },
      {
        id: "c17-3-3",
        text: "Gli rispondi calmo: 'Per te sarà stato uno scherzo, ma a me ha dato fastidio. Non farlo più.'",
        type: "assertive",
        emoji: "",
        consequence: "Rimane colpito dalla tua fermezza, abbozza delle scuse sincere e cambia atteggiamento.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c17-3-4",
        text: "Giri i tacchi e corri a chiuderti in bagno per saltare la prima ora.",
        type: "passive",
        emoji: "",
        consequence: "Scappi dal problema e perdi una lezione, aumentando il disagio.",
        betterAlternative: "Fuggire ti protegge sul momento, ma ti lascia addosso l'ansia perenne di incontrarlo.",
        nextScenarioId: null
      },
      {
        id: "c17-3-5",
        text: "Gli chiedi di parlare in disparte per sistemare la cosa da soli, senza pubblico.",
        type: "assertive",
        emoji: "",
        consequence: "Senza spettatori davanti a cui fare il bullo, si dimostra molto più ragionevole e capisce l'errore.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c17-3-6",
        text: "Gli urli contro davanti a tutti i professori sperando che qualcuno intervenga.",
        type: "impulsive",
        emoji: "",
        consequence: "Vieni ripreso per le urla e la situazione crea grande imbarazzo.",
        betterAlternative: "Chiedere l'intervento degli adulti va bene, ma va fatto con calma, non sbraitando in corridoio.",
        nextScenarioId: null,
        isCriticalFailure: true
      }
    ]
  },

  // CHAPTER 18: La Cena Disastrosa
  "scen-family-cena-1": {
    id: "scen-family-cena-1",
    title: "A Tavola Non Si Sta Fermi",
    description: "È l'ora di cena, tutti sono nervosi per la giornata. Fai fatica a stare seduto, continui a dondolarti sulla sedia e toccare le posate.",
    dialogue: [{ speaker: "Genitore", text: "Puoi stare fermo un secondo?! Mi fai venire il mal di testa, sembri tarantolato." }],
    background: "/assets/backgrounds/bg_kitchen.jpg",
    character: "/assets/characters/char_parent.png",
    characterName: "Genitore",
    isStartingNode: true,
    choices: [
      {
        id: "c18-1-1",
        text: "Dici: 'Scusa, sono molto agitato oggi. Posso alzarmi due minuti e poi tornare?'",
        type: "assertive",
        emoji: "",
        consequence: "Il genitore si calma un po', capisce la situazione e ti concede di sgranchirti le gambe.",
        betterAlternative: "",
        nextScenarioId: "scen-family-cena-2"
      },
      {
        id: "c18-1-2",
        text: "Batti un pugno sul tavolo urlando: 'Smettetela di riprendermi sempre!'",
        type: "impulsive",
        emoji: "",
        consequence: "I tuoi ti puniscono immediatamente mandandoti in camera tua senza cena.",
        betterAlternative: "La rabbia improvvisa distrugge ogni possibilità di comunicazione e porta solo punizioni.",
        nextScenarioId: "scen-family-cena-2",
        isCriticalFailure: true
      },
      {
        id: "c18-1-3",
        text: "Ti irrigidisci, smetti di mangiare e fissi il piatto senza dire una parola.",
        type: "passive",
        emoji: "",
        consequence: "L'atmosfera diventa pesantissima, e tutti mangiano in un silenzio tombale e carico di tensione.",
        betterAlternative: "Trattenere tutto non aiuta. Impara a spiegare cosa provi in quel momento.",
        nextScenarioId: "scen-family-cena-2"
      },
      {
        id: "c18-1-4",
        text: "Cerchi un modo silenzioso per scaricare l'energia, come muovere una pallina antistress in tasca.",
        type: "assertive",
        emoji: "",
        consequence: "Ti aiuta a ridurre il movimento visibile e riesci a concludere la cena più serenamente.",
        betterAlternative: "",
        nextScenarioId: "scen-family-cena-2"
      },
      {
        id: "c18-1-5",
        text: "Inizi a prendere a calci la gamba del tavolo in modo frenetico sfidando le regole.",
        type: "impulsive",
        emoji: "",
        consequence: "Fai cadere un bicchiere che si frantuma, facendo arrabbiare tutti ancora di più.",
        betterAlternative: "Comportarti in modo volutamente fastidioso crea solo più stress in famiglia.",
        nextScenarioId: "scen-family-cena-2",
        isCriticalFailure: true
      },
      {
        id: "c18-1-6",
        text: "Cerchi di scusarti continuamente, sentendoti un peso per la famiglia.",
        type: "passive",
        emoji: "",
        consequence: "I tuoi genitori ti dicono di smetterla di scusarti e tu ti senti ancora più goffo.",
        betterAlternative: "Le scuse continue possono risultare irritanti per gli altri, e a te tolgono autostima.",
        nextScenarioId: "scen-family-cena-2"
      }
    ]
  },
  "scen-family-cena-2": {
    id: "scen-family-cena-2",
    title: "Le Provocazioni del Fratello",
    description: "Mentre cerchi di stare calmo, tuo fratello minore inizia a darti dei calcetti sotto il tavolo, ghignando di nascosto.",
    dialogue: [{ speaker: "Pensiero", text: "Lo sta facendo apposta per farmi esplodere e prendersi lui i meriti del 'bravo ragazzo'." }],
    background: "/assets/backgrounds/bg_kitchen.jpg",
    character: "/assets/characters/student.png",
    characterName: "Pensiero",
    isStartingNode: false,
    choices: [
      {
        id: "c18-2-1",
        text: "Tiri un calcio fortissimo sotto il tavolo per fargli male.",
        type: "impulsive",
        emoji: "",
        consequence: "Tuo fratello si mette a piangere forte, i genitori incolpano solo te.",
        betterAlternative: "Rispondere alla provocazione fisicamente ti dà torto agli occhi degli altri.",
        nextScenarioId: "scen-family-cena-3",
        isCriticalFailure: true
      },
      {
        id: "c18-2-2",
        text: "Sposti le gambe lontano e decidi di ignorarlo completamente finché non si stufa.",
        type: "assertive",
        emoji: "",
        consequence: "Senza ottenere reazioni, il fratello si annoia e smette rapidamente.",
        betterAlternative: "",
        nextScenarioId: "scen-family-cena-3"
      },
      {
        id: "c18-2-3",
        text: "Subisci in silenzio stringendo i denti e trattenendo le lacrime di nervoso.",
        type: "passive",
        emoji: "",
        consequence: "Ti senti umiliato e l'ansia sale alle stelle, rendendo la cena insopportabile.",
        betterAlternative: "Subire senza reagire non ti fa stare bene, trova un modo per difenderti.",
        nextScenarioId: "scen-family-cena-3"
      },
      {
        id: "c18-2-4",
        text: "Prendi un bicchiere d'acqua e glielo butti addosso all'improvviso.",
        type: "impulsive",
        emoji: "",
        consequence: "Scoppia un caos indescrivibile a tavola e la cena è rovinata per tutti.",
        betterAlternative: "Un gesto così drastico non farà capire il problema, causerà solo danni materiali e urla.",
        nextScenarioId: "scen-family-cena-3",
        isCriticalFailure: true
      },
      {
        id: "c18-2-5",
        text: "Dici a voce alta: 'Mamma, papà, per favore dite a lui di smettere di darmi calci.'",
        type: "assertive",
        emoji: "",
        consequence: "I genitori intervengono, sgridano tuo fratello e ristabiliscono l'ordine.",
        betterAlternative: "",
        nextScenarioId: "scen-family-cena-3"
      },
      {
        id: "c18-2-6",
        text: "Ti alzi di scatto da tavola, vai in bagno senza dire nulla e ti chiudi dentro.",
        type: "passive",
        emoji: "",
        consequence: "I tuoi pensano tu stia facendo di nuovo i capricci senza motivo.",
        betterAlternative: "Fuggire non spiega il problema agli altri, devono sapere perché te ne sei andato.",
        nextScenarioId: "scen-family-cena-3"
      }
    ]
  },
  "scen-family-cena-3": {
    id: "scen-family-cena-3",
    title: "Genitori sotto Pressione",
    description: "I genitori, già stressati, iniziano a litigare tra loro per una bolletta. La tensione è altissima e tu ti senti in mezzo.",
    dialogue: [{ speaker: "Genitore", text: "È colpa tua se siamo in ritardo coi pagamenti! Non fai mai attenzione a queste cose!" }],
    background: "/assets/backgrounds/bg_kitchen.jpg",
    character: "/assets/characters/char_parent.png",
    characterName: "Genitore",
    isStartingNode: false,
    choices: [
      {
        id: "c18-3-1",
        text: "Ti metti a urlare più forte di loro per farli zittire.",
        type: "impulsive",
        emoji: "",
        consequence: "Si arrabbiano entrambi con te per esserti intromesso, la situazione esplode.",
        betterAlternative: "Urlare su delle urla genera solo rumore, non calma le acque.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c18-3-2",
        text: "Ti tappi le orecchie con le mani, guardi in basso e speri che finisca presto.",
        type: "passive",
        emoji: "",
        consequence: "Resti immobile a tavola caricandoti di tutta la loro ansia, sentendoti in gabbia.",
        betterAlternative: "Non sei costretto a restare fisicamente ad assorbire il loro stress.",
        nextScenarioId: null
      },
      {
        id: "c18-3-3",
        text: "Dici con voce ferma: 'Per favore, potete non litigare mentre mangiamo? Mi fa venire l'ansia.'",
        type: "assertive",
        emoji: "",
        consequence: "I genitori si rendono conto di averti coinvolto, si scusano e decidono di parlarne dopo.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c18-3-4",
        text: "Ti alzi dicendo: 'Ho finito di mangiare, posso andare in camera? C'è troppa tensione qui.'",
        type: "assertive",
        emoji: "",
        consequence: "Capiscono che il clima è sbagliato, annuiscono e tu riesci ad allontanarti pacificamente.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c18-3-5",
        text: "Lanci il piatto nel lavandino rompendolo e te ne vai sbattendo la porta.",
        type: "impulsive",
        emoji: "",
        consequence: "I tuoi genitori smettono di litigare tra loro ma iniziano a urlare contro di te per i danni.",
        betterAlternative: "Rompi cose e diventi tu il nuovo problema, evita azioni distruttive.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c18-3-6",
        text: "Cerchi di fare da paciere dando ragione a uno e torto all'altro.",
        type: "passive",
        emoji: "",
        consequence: "Ti intrometti prendendo una posizione e l'altro genitore se la prende con te.",
        betterAlternative: "I litigi dei genitori non sono affare tuo, non fare il giudice delle loro dispute.",
        nextScenarioId: null
      }
    ]
  },

  // CHAPTER 19: Il Nuovo Compagno
  "scen-school-compagno-1": {
    id: "scen-school-compagno-1",
    title: "Il Bersaglio Facile",
    description: "In corridoio vedi il bullo della scuola prendere in giro il nuovo ragazzo, che sembra impacciato e non si difende.",
    dialogue: [{ speaker: "Bullo", text: "Ma come ti vesti? Sembri uscito da un film dell'orrore, sfigato." }],
    background: "/assets/backgrounds/bg_hallway.jpg",
    character: "/assets/characters/bully.png",
    characterName: "Bullo",
    isStartingNode: true,
    choices: [
      {
        id: "c19-1-1",
        text: "Fai finta di non vedere e tiri dritto, per paura di essere preso di mira a tua volta.",
        type: "passive",
        emoji: "",
        consequence: "Ti senti in colpa per non aver fatto nulla, e il ragazzo nuovo rimane solo.",
        betterAlternative: "Voltarsi dall'altra parte è facile, ma aiuta il bullo, non la vittima.",
        nextScenarioId: "scen-school-compagno-2"
      },
      {
        id: "c19-1-2",
        text: "Vai dal bullo e gli tiri uno schiaffo dicendogli di smetterla.",
        type: "impulsive",
        emoji: "",
        consequence: "Il bullo reagisce colpendoti, finisce in una rissa e vieni sospeso.",
        betterAlternative: "Usare le mani non fa giustizia, ti rende colpevole quanto il bullo.",
        nextScenarioId: "scen-school-compagno-2",
        isCriticalFailure: true
      },
      {
        id: "c19-1-3",
        text: "Ti avvicini al nuovo compagno e gli dici: 'Vieni con me, andiamo in classe.' ignorando il bullo.",
        type: "assertive",
        emoji: "",
        consequence: "Porti via il ragazzo dalla situazione di pericolo senza scatenare ulteriori reazioni nel bullo.",
        betterAlternative: "",
        nextScenarioId: "scen-school-compagno-2"
      },
      {
        id: "c19-1-4",
        text: "Ridi per finta insieme agli altri, per uniformarti alla massa e non sembrare debole.",
        type: "passive",
        emoji: "",
        consequence: "Il nuovo compagno ti guarda con delusione, credendo tu sia uno di loro.",
        betterAlternative: "Se ridi alle battute dei bulli diventi loro complice, non farlo mai.",
        nextScenarioId: "scen-school-compagno-2"
      },
      {
        id: "c19-1-5",
        text: "Inizi a urlare insulti al bullo da lontano per distrarlo.",
        type: "impulsive",
        emoji: "",
        consequence: "Il bullo si accorge di te e decide che sei il suo nuovo bersaglio principale.",
        betterAlternative: "Attirare l'attenzione con insulti ti mette in pericolo e non risolve il problema alla radice.",
        nextScenarioId: "scen-school-compagno-2",
        isCriticalFailure: true
      },
      {
        id: "c19-1-6",
        text: "Vai a cercare velocemente un professore o un bidello per segnalare l'accaduto.",
        type: "assertive",
        emoji: "",
        consequence: "L'adulto interviene immediatamente, sgridando il bullo e mettendo fine alla prepotenza.",
        betterAlternative: "",
        nextScenarioId: "scen-school-compagno-2"
      }
    ]
  },
  "scen-school-compagno-2": {
    id: "scen-school-compagno-2",
    title: "Una Richiesta di Aiuto",
    description: "Più tardi in classe, il nuovo ragazzo si siede vicino a te. Sembra confuso sugli esercizi e ti chiede timidamente aiuto.",
    dialogue: [{ speaker: "Compagno Nuovo", text: "Scusa... non ho capito niente di cosa ha spiegato di matematica, puoi darmi una mano?" }],
    background: "/assets/backgrounds/bg_classroom.jpg",
    character: "/assets/characters/stranger.png",
    characterName: "Compagno Nuovo",
    isStartingNode: false,
    choices: [
      {
        id: "c19-2-1",
        text: "Prendi il suo quaderno e gli scarabocchi sopra scrivendo cavolate per farlo ridere.",
        type: "impulsive",
        emoji: "",
        consequence: "Lui si spaventa per il tuo gesto, prende le sue cose e cambia banco.",
        betterAlternative: "Cercare di essere simpatico in modo così invasivo lo ha solo messo in allarme.",
        nextScenarioId: "scen-school-compagno-3",
        isCriticalFailure: true
      },
      {
        id: "c19-2-2",
        text: "Gli rispondi gentilmente e gli mostri come risolvere il primo esercizio.",
        type: "assertive",
        emoji: "",
        consequence: "Si sente sollevato, vi mettete a studiare insieme e capisci che è un ragazzo simpatico.",
        betterAlternative: "",
        nextScenarioId: "scen-school-compagno-3"
      },
      {
        id: "c19-2-3",
        text: "Fai spallucce e sussurri: 'Neanche io lo so', per non farti vedere dagli altri mentre gli parli.",
        type: "passive",
        emoji: "",
        consequence: "Rimane solo con le sue difficoltà e pensa di non poter contare su di te.",
        betterAlternative: "Per paura del giudizio degli altri stai rinunciando a fare una cosa buona.",
        nextScenarioId: "scen-school-compagno-3"
      },
      {
        id: "c19-2-4",
        text: "Alzi la voce e dici: 'Oh ma perché chiedi a me? Non mi scocciare!'",
        type: "impulsive",
        emoji: "",
        consequence: "Lo umili davanti a tutti, facendolo sentire sbagliato e rifiutato.",
        betterAlternative: "Aggredire chi ti chiede aiuto gentilmente è sbagliato e ingiustificato.",
        nextScenarioId: "scen-school-compagno-3",
        isCriticalFailure: true
      },
      {
        id: "c19-2-5",
        text: "Gli proponi di fare metà per uno: tu gli spieghi, e lui ti aiuta con la materia dopo.",
        type: "assertive",
        emoji: "",
        consequence: "Lui accetta contento e in questo modo fate entrambi i compiti più in fretta.",
        betterAlternative: "",
        nextScenarioId: "scen-school-compagno-3"
      },
      {
        id: "c19-2-6",
        text: "Gli passi direttamente il tuo quaderno per fargli copiare tutto, senza parlare.",
        type: "passive",
        emoji: "",
        consequence: "Lui copia ma non capisce nulla, e la prof si accorge che i compiti sono identici.",
        betterAlternative: "Farlo copiare passivamente non lo aiuta a imparare e ti mette a rischio rimprovero.",
        nextScenarioId: "scen-school-compagno-3"
      }
    ]
  },
  "scen-school-compagno-3": {
    id: "scen-school-compagno-3",
    title: "La Pressione del Gruppo",
    description: "All'uscita da scuola, i tuoi amici ti prendono in disparte al parco. Vogliono organizzare una festa ma non vogliono invitare il nuovo compagno.",
    dialogue: [{ speaker: "Amico", text: "Dai, non invitiamo quello nuovo, è strano. Se viene lui rovinata la festa." }],
    background: "/assets/backgrounds/bg_park.jpg",
    character: "/assets/characters/friend.png",
    characterName: "Amico",
    isStartingNode: false,
    choices: [
      {
        id: "c19-3-1",
        text: "Dici: 'Va bene, facciamo come volete.' anche se dentro di te non sei d'accordo.",
        type: "passive",
        emoji: "",
        consequence: "Ti senti un ipocrita per averlo abbandonato solo per farti belli con il gruppo.",
        betterAlternative: "Assecondare il gruppo contro i tuoi principi ti fa perdere rispetto per te stesso.",
        nextScenarioId: null
      },
      {
        id: "c19-3-2",
        text: "Rispondi calmo: 'Secondo me dovremmo invitarlo. Non lo conoscete bene, è simpatico.'",
        type: "assertive",
        emoji: "",
        consequence: "I tuoi amici ci pensano su e decidono di dargli una possibilità, invitandolo.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c19-3-3",
        text: "Ti infuri: 'Siete dei falliti! Siete solo bulli e non meritate la mia amicizia!' e te ne vai.",
        type: "impulsive",
        emoji: "",
        consequence: "Rompi con tutti i tuoi amici storici in un colpo solo per una reazione esagerata.",
        betterAlternative: "Puoi non essere d'accordo senza insultarli e troncare i rapporti all'improvviso.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c19-3-4",
        text: "Rispondi: 'Io non ci vengo alla festa se lo escludete apposta.'",
        type: "assertive",
        emoji: "",
        consequence: "Il gruppo capisce che ci tieni davvero, e pur di non perdere te, invitano anche lui.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c19-3-5",
        text: "Inizi a prendere in giro anche tu il nuovo ragazzo per sembrare forte davanti al gruppo.",
        type: "impulsive",
        emoji: "",
        consequence: "Il ragazzo nuovo passa di lì in quel momento e sente tutto, sentendosi tradito da te.",
        betterAlternative: "Usare gli altri per farti bello non funziona mai, alla fine ti si ritorcerà contro.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c19-3-6",
        text: "Cambi subito argomento per non dover prendere posizione sulla questione.",
        type: "passive",
        emoji: "",
        consequence: "Il gruppo prende la decisione per te e lui viene escluso definitivamente.",
        betterAlternative: "Non schierarti significa accettare tacitamente le scelte sbagliate degli altri.",
        nextScenarioId: null
      }
    ]
  },

  // CHAPTER 20: Tempo Scaduto
  "scen-school-scaduto-1": {
    id: "scen-school-scaduto-1",
    title: "Il Risveglio Amaro",
    description: "In classe la professoressa ricorda a tutti che domani c'è una verifica di storia importante, e tu avevi completamente dimenticato di studiare.",
    dialogue: [{ speaker: "Prof", text: "Ragazzi, spero siate pronti per domani: la verifica coprirà tutti gli ultimi tre capitoli." }],
    background: "/assets/backgrounds/bg_classroom.jpg",
    character: "/assets/characters/teacher.png",
    characterName: "Prof",
    isStartingNode: true,
    choices: [
      {
        id: "c20-1-1",
        text: "Chiedi subito alla prof se puoi parlarle alla fine dell'ora per spiegarle la situazione.",
        type: "assertive",
        emoji: "",
        consequence: "La prof apprezza che tu ne parli in anticipo, e ti dà consigli su quali parti ripassare con urgenza.",
        betterAlternative: "",
        nextScenarioId: "scen-school-scaduto-2"
      },
      {
        id: "c20-1-2",
        text: "Fai un sospiro disperato e appoggi la testa sul banco, rassegnandoti al 4 in pagella.",
        type: "passive",
        emoji: "",
        consequence: "Passi il resto della mattinata abbattuto e non ascolti nulla di ciò che viene spiegato.",
        betterAlternative: "Rassegnarsi subito ti impedisce di cercare soluzioni che potrebbero salvarti la sufficienza.",
        nextScenarioId: "scen-school-scaduto-2"
      },
      {
        id: "c20-1-3",
        text: "Ti alzi urlando: 'Non è giusto! Non ci aveva detto nulla! È colpa sua!'",
        type: "impulsive",
        emoji: "",
        consequence: "Vieni ripreso severamente e ti prendi una nota per insolenza.",
        betterAlternative: "Dare la colpa agli altri per una tua disattenzione ti mette solo nei guai.",
        nextScenarioId: "scen-school-scaduto-2",
        isCriticalFailure: true
      },
      {
        id: "c20-1-4",
        text: "Fai finta di nulla con gli altri, ma dentro di te decidi che domani fingerai di stare male.",
        type: "passive",
        emoji: "",
        consequence: "Programmare una scusa non risolve il problema: dovrai comunque fare il test più avanti, e si accumulerà al resto.",
        betterAlternative: "Scappare dai problemi non li fa sparire, affronta la situazione subito.",
        nextScenarioId: "scen-school-scaduto-2"
      },
      {
        id: "c20-1-5",
        text: "Strappi rabbiosamente la pagina del diario dove dovevi scriverlo e la butti a terra.",
        type: "impulsive",
        emoji: "",
        consequence: "La prof ti vede, si irrita e ti impone di ripulire, facendoti perdere altro tempo.",
        betterAlternative: "Uno sfogo fisico come questo non recupera il tempo perso.",
        nextScenarioId: "scen-school-scaduto-2",
        isCriticalFailure: true
      },
      {
        id: "c20-1-6",
        text: "Chiedi a un compagno bravo in storia se può farti i riassunti chiave nel pomeriggio.",
        type: "assertive",
        emoji: "",
        consequence: "Il compagno accetta di inviarti i suoi schemi vocali, aiutandoti moltissimo per il pomeriggio.",
        betterAlternative: "",
        nextScenarioId: "scen-school-scaduto-2"
      }
    ]
  },
  "scen-school-scaduto-2": {
    id: "scen-school-scaduto-2",
    title: "Corsa Contro il Tempo",
    description: "Sei a casa, è pomeriggio inoltrato e devi recuperare tre capitoli, ma il telefono continua a vibrare con notifiche di amici.",
    dialogue: [{ speaker: "Pensiero", text: "Ho mille notifiche... forse dovrei solo rispondere a questa e poi inizio." }],
    background: "/assets/backgrounds/bg_bedroom.jpg",
    character: "/assets/characters/student.png",
    characterName: "Pensiero",
    isStartingNode: false,
    choices: [
      {
        id: "c20-2-1",
        text: "Lancii il telefono contro il muro dalla rabbia perché continui a distrarti.",
        type: "impulsive",
        emoji: "",
        consequence: "Il telefono si ammacca e passi i successivi 20 minuti a preoccuparti dei danni invece di studiare.",
        betterAlternative: "Agire d'impulso verso gli oggetti aumenta lo stress, metti semplicemente in modalità aereo.",
        nextScenarioId: "scen-school-scaduto-3",
        isCriticalFailure: true
      },
      {
        id: "c20-2-2",
        text: "Prendi il telefono per rispondere e finisci per scrollare i social per due ore.",
        type: "passive",
        emoji: "",
        consequence: "Arriva la sera, non hai studiato nulla e la tua ansia è ormai paralizzante.",
        betterAlternative: "Cedere subito alla tentazione è la trappola più comune. Allontana la fonte.",
        nextScenarioId: "scen-school-scaduto-3"
      },
      {
        id: "c20-2-3",
        text: "Metti il telefono in un'altra stanza, o lo consegni ai tuoi genitori fino a cena.",
        type: "assertive",
        emoji: "",
        consequence: "Senza la distrazione a portata di mano, riesci a studiare decentemente almeno due capitoli.",
        betterAlternative: "",
        nextScenarioId: "scen-school-scaduto-3"
      },
      {
        id: "c20-2-4",
        text: "Usi un'app che blocca i social e metti un timer di 25 minuti (metodo Pomodoro) per iniziare.",
        type: "assertive",
        emoji: "",
        consequence: "Il timer ti dà il senso di urgenza giusto e ti aiuta a partire senza sentirti sopraffatto.",
        betterAlternative: "",
        nextScenarioId: "scen-school-scaduto-3"
      },
      {
        id: "c20-2-5",
        text: "Chiudi i libri pensando che tanto in un giorno è impossibile, e decidi di guardare una serie TV.",
        type: "passive",
        emoji: "",
        consequence: "Fuggi nella TV ma non ti godi la serie per i sensi di colpa persistenti.",
        betterAlternative: "Rinunciare a priori è una scusa della mente. Anche leggere poco è meglio di niente.",
        nextScenarioId: "scen-school-scaduto-3"
      },
      {
        id: "c20-2-6",
        text: "Inizi a studiare, ma dopo la prima riga difficile stracci la pagina del libro.",
        type: "impulsive",
        emoji: "",
        consequence: "Hai distrutto il libro e ora ti manca il materiale essenziale per studiare.",
        betterAlternative: "La frustrazione è tanta, ma se distruggi le tue cose peggiori solo la situazione.",
        nextScenarioId: "scen-school-scaduto-3",
        isCriticalFailure: true
      }
    ]
  },
  "scen-school-scaduto-3": {
    id: "scen-school-scaduto-3",
    title: "Il Vuoto Totale",
    description: "È il momento della verifica. Davanti al foglio, ti sembra di non ricordare assolutamente nulla. La mente è annebbiata.",
    dialogue: [{ speaker: "Prof", text: "Avete un'ora di tempo. Nessuno deve parlare, iniziate." }],
    background: "/assets/backgrounds/bg_classroom.jpg",
    character: "/assets/characters/teacher.png",
    characterName: "Prof",
    isStartingNode: false,
    choices: [
      {
        id: "c20-3-1",
        text: "Consegni il foglio in bianco dopo cinque minuti con aria di sfida.",
        type: "impulsive",
        emoji: "",
        consequence: "Prendi un gravissimo insufficienza e vieni rimproverato aspramente.",
        betterAlternative: "Non usare la resa come un'arma. Potevi provarci o chiedere una spiegazione.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c20-3-2",
        text: "Fai dei bei respiri profondi, chiudi gli occhi e leggi solo la prima domanda senza guardare le altre.",
        type: "assertive",
        emoji: "",
        consequence: "Isolando il problema, riesci a ricordare qualcosa e inizi a scrivere, superando il blocco iniziale.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c20-3-3",
        text: "Inizi a copiare disperatamente dal compagno vicino, allungando palesemente il collo.",
        type: "impulsive",
        emoji: "",
        consequence: "Vieni beccato all'istante, ti viene annullato il compito e devi chiamare a casa.",
        betterAlternative: "Barare d'impulso porta a conseguenze peggiori del semplice impreparazione.",
        nextScenarioId: null,
        isCriticalFailure: true
      },
      {
        id: "c20-3-4",
        text: "Resti pietrificato per tutta l'ora e scrivi a malapena il tuo nome.",
        type: "passive",
        emoji: "",
        consequence: "Sprechi il tempo e consegni in bianco, perdendo l'opportunità di scrivere anche solo cose semplici.",
        betterAlternative: "Scrivere anche solo ciò di cui sei sicuro ti avrebbe garantito almeno qualche punto.",
        nextScenarioId: null
      },
      {
        id: "c20-3-5",
        text: "Alzi la mano e dici onestamente: 'Prof, mi scusi, ho un vuoto totale e non riesco a concentrarmi. Può rispiegarmi la prima domanda?'",
        type: "assertive",
        emoji: "",
        consequence: "La prof nota il tuo sforzo genuino. Rispiega a parole sue la domanda e la nebbia mentale si dirada un po'.",
        betterAlternative: "",
        nextScenarioId: null
      },
      {
        id: "c20-3-6",
        text: "Piangi silenziosamente sentendoti un fallimento, bagnando il foglio con le lacrime.",
        type: "passive",
        emoji: "",
        consequence: "L'ora passa tra tristezza e angoscia, e non riesci ad affrontare il compito.",
        betterAlternative: "Piangere va bene, ma non ti aiuta a superare la prova. Devi provare a chiedere aiuto se sei bloccato.",
        nextScenarioId: null
      }
    ]
  }
};
