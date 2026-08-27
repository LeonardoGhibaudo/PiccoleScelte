import type { Scenario } from '../types';

export const INITIAL_SCENARIOS: Record<string, Scenario> = {
  "scen-school-pressione-1": {
    "id": "scen-school-pressione-1",
    "title": "Pressione alla Lavagna",
    "description": "Un insegnante ti critica davanti a tutti e la tua concentrazione crolla.",
    "dialogue": [
      {
        "speaker": "Professoressa",
        "text": "Non riesci mai a concentrarti! Guardami quando ti parlo!"
      }
    ],
    "background": "/assets/backgrounds/bg_classroom.jpg",
    "character": "/assets/characters/teacher.jpg",
    "characterName": "Professoressa",
    "choices": [
      {
        "id": "c1-1",
        "text": "Urli e lanci la matita.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Ti sbatte fuori.",
        "betterAlternative": "Cerca di spiegarti con calma.",
        "nextScenarioId": "scen-school-pressione-2",
        "isCriticalFailure": true
      },
      {
        "id": "c1-2",
        "text": "Ti chiudi in te stesso e smetti di ascoltare.",
        "type": "passive",
        "emoji": "",
        "consequence": "Prendi un brutto voto.",
        "betterAlternative": "Prova a partecipare.",
        "nextScenarioId": "scen-school-pressione-2"
      },
      {
        "id": "c1-3",
        "text": "'Mi scusi, faccio fatica oggi. Posso provarci?'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Apprezza lo sforzo.",
        "betterAlternative": "",
        "nextScenarioId": "scen-school-pressione-2"
      },
      {
        "text": "Sbatti i pugni sul banco gridando 'Basta!'",
        "type": "impulsive",
        "consequence": "Prendi una nota e la classe ride.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-school-pressione-1-0",
        "emoji": "",
        "nextScenarioId": "scen-school-pressione-2"
      },
      {
        "text": "Fingi di prendere appunti senza ascoltare.",
        "type": "passive",
        "consequence": "La prof se ne accorge e si arrabbia di più.",
        "betterAlternative": "Chiedi scusa e prova a concentrarti.",
        "id": "ext-scen-school-pressione-1-1",
        "emoji": "",
        "nextScenarioId": "scen-school-pressione-2"
      },
      {
        "text": "Respiri a fondo e chiedi di poter rileggere la domanda.",
        "type": "assertive",
        "consequence": "La prof apprezza che ci stai provando.",
        "betterAlternative": "",
        "id": "ext-scen-school-pressione-1-2",
        "emoji": "",
        "nextScenarioId": "scen-school-pressione-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-school-pressione-2": {
    "id": "scen-school-pressione-2",
    "title": "Concentrazione a Zero",
    "description": "Non riesci proprio a concentrarti sull'esercizio assegnato.",
    "dialogue": [
      {
        "speaker": "Pensiero",
        "text": "Le parole sul foglio si muovono, non riesco a capire nulla..."
      }
    ],
    "background": "/assets/backgrounds/bg_classroom.jpg",
    "character": "/assets/characters/student.jpg",
    "characterName": "Pensiero",
    "choices": [
      {
        "id": "c1-4",
        "text": "Strappi il foglio per la frustrazione.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Distruggi il lavoro.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c1-5",
        "text": "Resti fermo a fissare il vuoto.",
        "type": "passive",
        "emoji": "",
        "consequence": "Il tempo scade.",
        "betterAlternative": "Chiedi aiuto.",
        "nextScenarioId": null
      },
      {
        "id": "c1-6",
        "text": "Chiedi alla prof se puoi fare una pausa di 2 minuti.",
        "type": "assertive",
        "emoji": "",
        "consequence": "Ti calmi e poi riprendi.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Scrivi insulti sul foglio.",
        "type": "impulsive",
        "consequence": "Finisci dal preside.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-school-pressione-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Appoggi la testa sul banco e dormi.",
        "type": "passive",
        "consequence": "Zero nell'esercizio.",
        "betterAlternative": "Chiedi di uscire a sciacquarti il viso.",
        "id": "ext-scen-school-pressione-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Dividi l'esercizio in parti più piccole per farcela.",
        "type": "assertive",
        "consequence": "Riesci a farne almeno metà bene.",
        "betterAlternative": "",
        "id": "ext-scen-school-pressione-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-school-distrazioni-1": {
    "id": "scen-school-distrazioni-1",
    "title": "Distrazioni Pericolose",
    "description": "Ti senti sopraffatto dalle troppe cose da fare e continui a essere interrotto.",
    "dialogue": [
      {
        "speaker": "Compagno",
        "text": "Ehi, passami gli appunti! Dai muoviti!"
      }
    ],
    "background": "/assets/backgrounds/bg_classroom.jpg",
    "character": "/assets/characters/student.jpg",
    "characterName": "Compagno",
    "choices": [
      {
        "id": "c2-1",
        "text": "Gli tiri il quaderno in faccia.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Fai male al compagno.",
        "betterAlternative": "",
        "nextScenarioId": "scen-school-distrazioni-2",
        "isCriticalFailure": true
      },
      {
        "id": "c2-2",
        "text": "Gliele dai e perdi il filo di quello che stavi facendo.",
        "type": "passive",
        "emoji": "",
        "consequence": "Non riesci a finire il tuo lavoro.",
        "betterAlternative": "Digli di aspettare.",
        "nextScenarioId": "scen-school-distrazioni-2"
      },
      {
        "id": "c2-3",
        "text": "'Un attimo, finisco questo e te li do.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Rispetta il tuo tempo.",
        "betterAlternative": "",
        "nextScenarioId": "scen-school-distrazioni-2"
      },
      {
        "text": "Gli tiri il quaderno in faccia.",
        "type": "impulsive",
        "consequence": "Fai male al compagno e vieni sospeso.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-school-distrazioni-1-0",
        "emoji": "",
        "nextScenarioId": "scen-school-distrazioni-2"
      },
      {
        "text": "Gli passi gli appunti subito smettendo di lavorare.",
        "type": "passive",
        "consequence": "Prendi un brutto voto tu.",
        "betterAlternative": "Digli di aspettare 5 minuti.",
        "id": "ext-scen-school-distrazioni-1-1",
        "emoji": "",
        "nextScenarioId": "scen-school-distrazioni-2"
      },
      {
        "text": "'Te li do appena finisco questa frase, dammi un attimo.'",
        "type": "assertive",
        "consequence": "Lui aspetta e tu finisci.",
        "betterAlternative": "",
        "id": "ext-scen-school-distrazioni-1-2",
        "emoji": "",
        "nextScenarioId": "scen-school-distrazioni-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-school-distrazioni-2": {
    "id": "scen-school-distrazioni-2",
    "title": "Interruzioni Continue",
    "description": "Mentre cerchi di spiegare il progetto, un altro compagno ti interrompe continuamente.",
    "dialogue": [
      {
        "speaker": "Compagno",
        "text": "No, ma guarda che si fa così, non capisci niente!"
      }
    ],
    "background": "/assets/backgrounds/bg_hallway.jpg",
    "character": "/assets/characters/bully.jpg",
    "characterName": "Compagno",
    "choices": [
      {
        "id": "c2-4",
        "text": "Lo insulti pesantemente.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Si crea un litigio.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c2-5",
        "text": "Ti arrendi e smetti di parlare.",
        "type": "passive",
        "emoji": "",
        "consequence": "Non esprimi la tua opinione.",
        "betterAlternative": "Chiedi di finire il discorso.",
        "nextScenarioId": null
      },
      {
        "id": "c2-6",
        "text": "'Per favore, lasciami finire di parlare.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Punto per te.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Lo insulti e abbandoni il progetto.",
        "type": "impulsive",
        "consequence": "Il gruppo prende un'insufficienza.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-school-distrazioni-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Gli lasci fare tutto annuendo in silenzio.",
        "type": "passive",
        "consequence": "Non impari nulla e ti senti frustrato.",
        "betterAlternative": "Pretendi il tuo spazio.",
        "id": "ext-scen-school-distrazioni-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "'Fammi finire di parlare, poi ascolto la tua idea.'",
        "type": "assertive",
        "consequence": "Riuscite a trovare un compromesso.",
        "betterAlternative": "",
        "id": "ext-scen-school-distrazioni-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-friends-messaggio-1": {
    "id": "scen-friends-messaggio-1",
    "title": "Un Messaggio nel Vuoto",
    "description": "Scrivi a qualcuno che non risponde, innescando paure legate al rifiuto.",
    "dialogue": [
      {
        "speaker": "Pensiero",
        "text": "Ha visualizzato da un'ora... mi odia, lo so."
      }
    ],
    "background": "/assets/backgrounds/bg_bedroom.jpg",
    "character": "/assets/characters/friend.jpg",
    "characterName": "Pensiero",
    "choices": [
      {
        "id": "c3-1",
        "text": "Lo blocchi su tutti i social.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Rovini l'amicizia impulsivamente.",
        "betterAlternative": "",
        "nextScenarioId": "scen-friends-messaggio-2",
        "isCriticalFailure": true
      },
      {
        "id": "c3-2",
        "text": "Piangi sentendoti sbagliato.",
        "type": "passive",
        "emoji": "",
        "consequence": "Stai malissimo tutto il giorno.",
        "betterAlternative": "Distraiti con altro.",
        "nextScenarioId": "scen-friends-messaggio-2"
      },
      {
        "id": "c3-3",
        "text": "Metti via il telefono e vai a fare una passeggiata.",
        "type": "assertive",
        "emoji": "",
        "consequence": "Gestisci bene l'ansia.",
        "betterAlternative": "",
        "nextScenarioId": "scen-friends-messaggio-2"
      },
      {
        "text": "Lo blocchi su tutti i social per ripicca.",
        "type": "impulsive",
        "consequence": "Rovini un'amicizia per niente.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-friends-messaggio-1-0",
        "emoji": "",
        "nextScenarioId": "scen-friends-messaggio-2"
      },
      {
        "text": "Inizi a scusarti compulsivamente per non aver fatto nulla.",
        "type": "passive",
        "consequence": "Lui pensa che tu sia strano.",
        "betterAlternative": "Aspetta semplicemente che risponda.",
        "id": "ext-scen-friends-messaggio-1-1",
        "emoji": "",
        "nextScenarioId": "scen-friends-messaggio-2"
      },
      {
        "text": "Metti giù il telefono e fai altro, risponderà quando può.",
        "type": "assertive",
        "consequence": "Più tardi ti risponde scusandosi per il ritardo.",
        "betterAlternative": "",
        "id": "ext-scen-friends-messaggio-1-2",
        "emoji": "",
        "nextScenarioId": "scen-friends-messaggio-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-friends-messaggio-2": {
    "id": "scen-friends-messaggio-2",
    "title": "Gelosia Tossica",
    "description": "Poi vedi una sua foto in cui è fuori con altri amici importanti.",
    "dialogue": [
      {
        "speaker": "Pensiero",
        "text": "Ecco perché non rispondeva! Si diverte senza di me!"
      }
    ],
    "background": "/assets/backgrounds/bg_park.jpg",
    "character": "/assets/characters/stranger.jpg",
    "characterName": "Pensiero",
    "choices": [
      {
        "id": "c3-4",
        "text": "Scrivi un commento cattivo sotto la foto.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Fai una figuraccia pubblica.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c3-5",
        "text": "Ti convinci di essere un peso e smetti di scrivergli per mesi.",
        "type": "passive",
        "emoji": "",
        "consequence": "Perdi un amico.",
        "betterAlternative": "Accetta che può avere altri amici.",
        "nextScenarioId": null
      },
      {
        "id": "c3-6",
        "text": "Accetti che ha diritto di uscire con chi vuole e ti rassereni.",
        "type": "assertive",
        "emoji": "",
        "consequence": "Maturità emotiva dimostrata.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Gli scrivi un messaggio pieno di insulti.",
        "type": "impulsive",
        "consequence": "Ti blocca per sempre.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-friends-messaggio-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Piangi da solo in camera e decidi di non uscirci più.",
        "type": "passive",
        "consequence": "Perdi un amico senza parlargliene.",
        "betterAlternative": "Affronta la situazione con maturità.",
        "id": "ext-scen-friends-messaggio-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Gli scrivi: 'Mi è dispiaciuto non essere stato invitato.'",
        "type": "assertive",
        "consequence": "Ti spiega che era una cena di famiglia coi cugini.",
        "betterAlternative": "",
        "id": "ext-scen-friends-messaggio-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-friends-scherzo-1": {
    "id": "scen-friends-scherzo-1",
    "title": "Lo Scherzo di Troppo",
    "description": "Vieni preso in giro davanti a tutti e inizi a sentirti escluso.",
    "dialogue": [
      {
        "speaker": "Marco",
        "text": "Ahahah ma guarda come ti sei vestito oggi, sembri un clown!"
      }
    ],
    "background": "/assets/backgrounds/bg_street.jpg",
    "character": "/assets/characters/friend.jpg",
    "characterName": "Marco",
    "choices": [
      {
        "id": "c4-1",
        "text": "Lo spintoni con violenza.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Violenza ingiustificata.",
        "betterAlternative": "",
        "nextScenarioId": "scen-friends-scherzo-2",
        "isCriticalFailure": true
      },
      {
        "id": "c4-2",
        "text": "Fai una risatina finta mentre muori dentro.",
        "type": "passive",
        "emoji": "",
        "consequence": "Incoraggi altre prese in giro.",
        "betterAlternative": "Difenditi verbalmente.",
        "nextScenarioId": "scen-friends-scherzo-2"
      },
      {
        "id": "c4-3",
        "text": "'Questo non fa ridere, a me piace come mi vesto.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Gli altri smettono di ridere.",
        "betterAlternative": "",
        "nextScenarioId": "scen-friends-scherzo-2"
      },
      {
        "text": "Gli dai uno spintone fortissimo.",
        "type": "impulsive",
        "consequence": "Scoppia una rissa e passi dalla parte del torto.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-friends-scherzo-1-0",
        "emoji": "",
        "nextScenarioId": "scen-friends-scherzo-2"
      },
      {
        "text": "Fingi di ridere anche se dentro stai male.",
        "type": "passive",
        "consequence": "Continueranno a prenderti in giro.",
        "betterAlternative": "Fagli capire che non fa ridere.",
        "id": "ext-scen-friends-scherzo-1-1",
        "emoji": "",
        "nextScenarioId": "scen-friends-scherzo-2"
      },
      {
        "text": "'Non fai ridere nessuno con queste battute.'",
        "type": "assertive",
        "consequence": "Gli altri smettono di ridere e lui si scusa.",
        "betterAlternative": "",
        "id": "ext-scen-friends-scherzo-1-2",
        "emoji": "",
        "nextScenarioId": "scen-friends-scherzo-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-friends-scherzo-2": {
    "id": "scen-friends-scherzo-2",
    "title": "Sentirsi Esclusi",
    "description": "Dopo lo scherzo, il gruppo decide di andare a mangiare ma non ti invitano chiaramente.",
    "dialogue": [
      {
        "speaker": "Marco",
        "text": "Noi andiamo in pizzeria. Ciao!"
      }
    ],
    "background": "/assets/backgrounds/bg_street.jpg",
    "character": "/assets/characters/friend.jpg",
    "characterName": "Marco",
    "choices": [
      {
        "id": "c4-4",
        "text": "Sputi per terra e urli 'Andate al diavolo!'.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Reazione eccessiva.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c4-5",
        "text": "Torni a casa deprimendoti e sentendoti sbagliato.",
        "type": "passive",
        "emoji": "",
        "consequence": "Nutri l'isolamento.",
        "betterAlternative": "Cerca altri amici.",
        "nextScenarioId": null
      },
      {
        "id": "c4-6",
        "text": "'Buona pizza, io mi organizzo diversamente, ciao.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Mantieni la dignità e volta pagina.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Gli urli dietro 'Tanto mi fate schifo!'",
        "type": "impulsive",
        "consequence": "Ti isoli completamente dal resto della classe.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-friends-scherzo-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Torni a casa da solo a testa bassa.",
        "type": "passive",
        "consequence": "Ti senti ancora più solo.",
        "betterAlternative": "Cerca altri amici.",
        "id": "ext-scen-friends-scherzo-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Scrivi a un altro compagno simpatico per fare qualcosa.",
        "type": "assertive",
        "consequence": "Passi un bel pomeriggio con una persona nuova.",
        "betterAlternative": "",
        "id": "ext-scen-friends-scherzo-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-friends-segreti-1": {
    "id": "scen-friends-segreti-1",
    "title": "Segreti Svelati",
    "description": "Qualcuno tradisce la tua fiducia rompendo una promessa importante.",
    "dialogue": [
      {
        "speaker": "Amica",
        "text": "Ops, mi è scappato il tuo segreto davanti a tutti, scusa..."
      }
    ],
    "background": "/assets/backgrounds/bg_park.jpg",
    "character": "/assets/characters/friend.jpg",
    "characterName": "Amica",
    "choices": [
      {
        "id": "c5-1",
        "text": "Le tiri uno schiaffo.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Violenza inaccettabile.",
        "betterAlternative": "",
        "nextScenarioId": "scen-friends-segreti-2",
        "isCriticalFailure": true
      },
      {
        "id": "c5-2",
        "text": "Scappi via piangendo.",
        "type": "passive",
        "emoji": "",
        "consequence": "Mostri vulnerabilità a chi ti ha ferito.",
        "betterAlternative": "Esprimi il tuo disappunto.",
        "nextScenarioId": "scen-friends-segreti-2"
      },
      {
        "id": "c5-3",
        "text": "'Mi avevi promesso di non dirlo. Sono molto deluso.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Le fai capire la gravità.",
        "betterAlternative": "",
        "nextScenarioId": "scen-friends-segreti-2"
      },
      {
        "text": "Rivelare a tutti il suo segreto più intimo per vendetta.",
        "type": "impulsive",
        "consequence": "Diventi crudele quanto lei e tutti vi evitano.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-friends-segreti-1-0",
        "emoji": "",
        "nextScenarioId": "scen-friends-segreti-2"
      },
      {
        "text": "Non dire nulla e scappare via.",
        "type": "passive",
        "consequence": "Lei pensa che tu non te la sia presa troppo.",
        "betterAlternative": "Chiarisci la tua delusione.",
        "id": "ext-scen-friends-segreti-1-1",
        "emoji": "",
        "nextScenarioId": "scen-friends-segreti-2"
      },
      {
        "text": "'Mi hai ferito molto, ti avevo chiesto di non dirlo.'",
        "type": "assertive",
        "consequence": "Si rende conto dell'errore e si scusa sinceramente.",
        "betterAlternative": "",
        "id": "ext-scen-friends-segreti-1-2",
        "emoji": "",
        "nextScenarioId": "scen-friends-segreti-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-friends-segreti-2": {
    "id": "scen-friends-segreti-2",
    "title": "Scuse Non Accettate",
    "description": "Prova a giustificarsi dicendo che 'non era una cosa importante'.",
    "dialogue": [
      {
        "speaker": "Amica",
        "text": "Dai, non fare il permaloso, non è mica grave!"
      }
    ],
    "background": "/assets/backgrounds/bg_park.jpg",
    "character": "/assets/characters/friend.jpg",
    "characterName": "Amica",
    "choices": [
      {
        "id": "c5-4",
        "text": "Le rompi il telefono.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Danno enorme.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c5-5",
        "text": "Dici 'ok hai ragione' reprimendo la rabbia.",
        "type": "passive",
        "emoji": "",
        "consequence": "Sminuisci i tuoi sentimenti.",
        "betterAlternative": "Falle capire che per te era importante.",
        "nextScenarioId": null
      },
      {
        "id": "c5-6",
        "text": "'Per me lo era. Ho bisogno di tempo.' e te ne vai.",
        "type": "assertive",
        "emoji": "",
        "consequence": "Metti un confine chiaro.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Le tiri una bibita addosso.",
        "type": "impulsive",
        "consequence": "Azione inaccettabile che rovina tutto.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-friends-segreti-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Fingi di perdonarla subito per non litigare.",
        "type": "passive",
        "consequence": "Continuererà a non rispettarti.",
        "betterAlternative": "Metti dei confini chiari.",
        "id": "ext-scen-friends-segreti-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "'Per me era importante. Mi serve tempo per fidarmi di nuovo.'",
        "type": "assertive",
        "consequence": "Dimostri maturità e imponi rispetto.",
        "betterAlternative": "",
        "id": "ext-scen-friends-segreti-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-family-scontri-1": {
    "id": "scen-family-scontri-1",
    "title": "Scontri in Salotto",
    "description": "Una discussione accesa in cui un genitore, stressato, ti urla contro.",
    "dialogue": [
      {
        "speaker": "Papà",
        "text": "Non fai mai niente in questa casa! Sono stufo!"
      }
    ],
    "background": "/assets/backgrounds/bg_home.jpg",
    "character": "/assets/characters/char_parent.jpg",
    "characterName": "Papà",
    "choices": [
      {
        "id": "c6-1",
        "text": "Tiri un calcio al tavolino.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Rompi le cose, peggiorando la situazione.",
        "betterAlternative": "",
        "nextScenarioId": "scen-family-scontri-2",
        "isCriticalFailure": true
      },
      {
        "id": "c6-2",
        "text": "Abbozzi e ti fai venire l'ansia.",
        "type": "passive",
        "emoji": "",
        "consequence": "Accumuli stress tossico.",
        "betterAlternative": "Rispondi con calma.",
        "nextScenarioId": "scen-family-scontri-2"
      },
      {
        "id": "c6-3",
        "text": "'Capisco che sei stanco, ma non urlare, per favore.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Disinneschi la sua rabbia.",
        "betterAlternative": "",
        "nextScenarioId": "scen-family-scontri-2"
      },
      {
        "text": "Urli e sbatti fortissimo la porta di camera tua.",
        "type": "impulsive",
        "consequence": "Peggiori solo la situazione e rompi la porta.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-family-scontri-1-0",
        "emoji": "",
        "nextScenarioId": "scen-family-scontri-2"
      },
      {
        "text": "Subisci in silenzio stringendo i pugni.",
        "type": "passive",
        "consequence": "La tensione rimane accumulata dentro di te.",
        "betterAlternative": "Chiedi di abbassare i toni.",
        "id": "ext-scen-family-scontri-1-1",
        "emoji": "",
        "nextScenarioId": "scen-family-scontri-2"
      },
      {
        "text": "'Papà, per favore non urlare, ne possiamo parlare con calma.'",
        "type": "assertive",
        "consequence": "Si rende conto di aver esagerato con la voce.",
        "betterAlternative": "",
        "id": "ext-scen-family-scontri-1-2",
        "emoji": "",
        "nextScenarioId": "scen-family-scontri-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-family-scontri-2": {
    "id": "scen-family-scontri-2",
    "title": "Calmare le Acque",
    "description": "Il genitore si ferma un attimo e sospira.",
    "dialogue": [
      {
        "speaker": "Papà",
        "text": "Sì, ma tu devi dare una mano... scusa se ho urlato."
      }
    ],
    "background": "/assets/backgrounds/bg_home.jpg",
    "character": "/assets/characters/char_parent.jpg",
    "characterName": "Papà",
    "choices": [
      {
        "id": "c6-4",
        "text": "'Non me ne frega niente delle tue scuse!'",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Riaccendi la lite.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c6-5",
        "text": "Fai spallucce senza guardarlo in faccia.",
        "type": "passive",
        "emoji": "",
        "consequence": "Freddezza che lascia irrisolto il nodo.",
        "betterAlternative": "Accetta le scuse.",
        "nextScenarioId": null
      },
      {
        "id": "c6-6",
        "text": "'Ok. Dimmi cosa posso fare ora per aiutarti.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Risolvete il conflitto pacificamente.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Gli rispondi: 'Ora è tardi, vaffanculo!'",
        "type": "impulsive",
        "consequence": "Punizione durissima.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-family-scontri-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Lo ignori e guardi il muro.",
        "type": "passive",
        "consequence": "La comunicazione si interrompe.",
        "betterAlternative": "Accetta le scuse e spiega il tuo punto.",
        "id": "ext-scen-family-scontri-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "'Scuse accettate. Domani pulisco io il salotto, promesso.'",
        "type": "assertive",
        "consequence": "Trovate un accordo pacifico.",
        "betterAlternative": "",
        "id": "ext-scen-family-scontri-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-family-regole-1": {
    "id": "scen-family-regole-1",
    "title": "Regole e Ribellione",
    "description": "Ti viene imposta una regola che non accetti, seguita da una punizione ingiusta.",
    "dialogue": [
      {
        "speaker": "Mamma",
        "text": "Da oggi non puoi più usare il computer dopo le 20. Punto."
      }
    ],
    "background": "/assets/backgrounds/bg_kitchen.jpg",
    "character": "/assets/characters/char_parent.jpg",
    "characterName": "Mamma",
    "choices": [
      {
        "id": "c7-1",
        "text": "Urli parolacce alla mamma.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Punizione raddoppiata.",
        "betterAlternative": "",
        "nextScenarioId": "scen-family-regole-2",
        "isCriticalFailure": true
      },
      {
        "id": "c7-2",
        "text": "Ubbidisci ciecamente ma passi la notte a rimuginare.",
        "type": "passive",
        "emoji": "",
        "consequence": "La frustrazione ti logora.",
        "betterAlternative": "Prova a negoziare.",
        "nextScenarioId": "scen-family-regole-2"
      },
      {
        "id": "c7-3",
        "text": "'Possiamo parlarne? Dopo le 20 è quando ci sono i miei amici online.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Apre una spiraglio di dialogo.",
        "betterAlternative": "",
        "nextScenarioId": "scen-family-regole-2"
      },
      {
        "text": "Lanci il computer contro il muro.",
        "type": "impulsive",
        "consequence": "Hai distrutto un oggetto costoso.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-family-regole-1-0",
        "emoji": "",
        "nextScenarioId": "scen-family-regole-2"
      },
      {
        "text": "Vai in camera a piangere sotto le coperte.",
        "type": "passive",
        "consequence": "Non risolvi la situazione e ti senti impotente.",
        "betterAlternative": "Prova a negoziare la regola.",
        "id": "ext-scen-family-regole-1-1",
        "emoji": "",
        "nextScenarioId": "scen-family-regole-2"
      },
      {
        "text": "'Possiamo fare le 21 se faccio prima tutti i compiti?'",
        "type": "assertive",
        "consequence": "La mamma ci pensa e accetta il compromesso.",
        "betterAlternative": "",
        "id": "ext-scen-family-regole-1-2",
        "emoji": "",
        "nextScenarioId": "scen-family-regole-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-family-regole-2": {
    "id": "scen-family-regole-2",
    "title": "Punizione Ingiusta",
    "description": "A causa di un malinteso, ti dà comunque la punizione.",
    "dialogue": [
      {
        "speaker": "Mamma",
        "text": "Non mi interessa. Per stasera sei in punizione."
      }
    ],
    "background": "/assets/backgrounds/bg_kitchen.jpg",
    "character": "/assets/characters/char_parent.jpg",
    "characterName": "Mamma",
    "choices": [
      {
        "id": "c7-4",
        "text": "Spacchi un piatto.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Atto pericoloso.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c7-5",
        "text": "Ti chiudi in camera in silenzio totale.",
        "type": "passive",
        "emoji": "",
        "consequence": "Tristezza profonda.",
        "betterAlternative": "Esprimi il dissenso pacifico.",
        "nextScenarioId": null
      },
      {
        "id": "c7-6",
        "text": "'La trovo ingiusta, ma rispetterò la regola per stasera.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Mostri grande maturità.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Inizi a spaccare le cose sulla scrivania.",
        "type": "impulsive",
        "consequence": "Comportamento violento.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-family-regole-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Accetti l'ingiustizia e non le parli per una settimana.",
        "type": "passive",
        "consequence": "Il clima in casa diventa tossico.",
        "betterAlternative": "Spiega il malinteso con calma.",
        "id": "ext-scen-family-regole-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "'C'è stato un equivoco, lascia che ti spieghi come sono andate le cose.'",
        "type": "assertive",
        "consequence": "Capisce l'errore e ti toglie la punizione.",
        "betterAlternative": "",
        "id": "ext-scen-family-regole-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-family-aspettative-1": {
    "id": "scen-family-aspettative-1",
    "title": "Il Peso delle Aspettative",
    "description": "Vieni confrontato ingiustamente con i tuoi fratelli.",
    "dialogue": [
      {
        "speaker": "Papà",
        "text": "Tua sorella prende tutti 10 e tu fai fatica. Perché non sei come lei?"
      }
    ],
    "background": "/assets/backgrounds/bg_home.jpg",
    "character": "/assets/characters/char_parent.jpg",
    "characterName": "Papà",
    "choices": [
      {
        "id": "c8-1",
        "text": "Tiri un pugno al muro.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Ti fai male e spaventi tutti.",
        "betterAlternative": "",
        "nextScenarioId": "scen-family-aspettative-2",
        "isCriticalFailure": true
      },
      {
        "id": "c8-2",
        "text": "Pensi davvero di essere inferiore e un fallimento.",
        "type": "passive",
        "emoji": "",
        "consequence": "Rovina l'autostima in modo permanente.",
        "betterAlternative": "Difendi la tua unicità.",
        "nextScenarioId": "scen-family-aspettative-2"
      },
      {
        "id": "c8-3",
        "text": "'Io ho le mie sfide. Non è giusto paragonarmi a lei.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Metti il genitore di fronte al suo errore.",
        "betterAlternative": "",
        "nextScenarioId": "scen-family-aspettative-2"
      },
      {
        "text": "Urli che odi tua sorella.",
        "type": "impulsive",
        "consequence": "Fai soffrire tua sorella per niente.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-family-aspettative-1-0",
        "emoji": "",
        "nextScenarioId": "scen-family-aspettative-2"
      },
      {
        "text": "Ti convinci di essere un fallito.",
        "type": "passive",
        "consequence": "La tua autostima va a zero.",
        "betterAlternative": "Ricordagli i tuoi punti di forza.",
        "id": "ext-scen-family-aspettative-1-1",
        "emoji": "",
        "nextScenarioId": "scen-family-aspettative-2"
      },
      {
        "text": "'Io non sono lei. Faccio fatica, ma sto cercando di migliorare a modo mio.'",
        "type": "assertive",
        "consequence": "Il papà riflette su quanto ti abbia ferito.",
        "betterAlternative": "",
        "id": "ext-scen-family-aspettative-1-2",
        "emoji": "",
        "nextScenarioId": "scen-family-aspettative-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-family-aspettative-2": {
    "id": "scen-family-aspettative-2",
    "title": "Giudicati dagli altri",
    "description": "Anche gli altri parenti sembrano darti sguardi di disapprovazione.",
    "dialogue": [
      {
        "speaker": "Zio",
        "text": "Eh sì, lui è sempre stato quello problematico della famiglia."
      }
    ],
    "background": "/assets/backgrounds/bg_home.jpg",
    "character": "/assets/characters/stranger.jpg",
    "characterName": "Zio",
    "choices": [
      {
        "id": "c8-4",
        "text": "Versi l'acqua addosso allo zio.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Crei un putiferio.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c8-5",
        "text": "Ti alzi da tavola con le lacrime agli occhi.",
        "type": "passive",
        "emoji": "",
        "consequence": "Non affronti il commento.",
        "betterAlternative": "Rispondi educatamente.",
        "nextScenarioId": null
      },
      {
        "id": "c8-6",
        "text": "'Problematico no, solo diverso. E sto facendo del mio meglio.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Tutti ammutoliscono. Ottimo lavoro.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Lo mandi al diavolo davanti a tutta la famiglia.",
        "type": "impulsive",
        "consequence": "Crei uno scandalo al pranzo di famiglia.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-family-aspettative-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Esci dalla stanza e ti nascondi in bagno per ore.",
        "type": "passive",
        "consequence": "Eviti il problema ma soffri tantissimo.",
        "betterAlternative": "Rispondi con educazione e ironia.",
        "id": "ext-scen-family-aspettative-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "'Ognuno ha le sue sfide, zio. L'importante è lavorarci su.'",
        "type": "assertive",
        "consequence": "Lo zio ammutolisce e i genitori ti guardano con orgoglio.",
        "betterAlternative": "",
        "id": "ext-scen-family-aspettative-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-family-spazio-1": {
    "id": "scen-family-spazio-1",
    "title": "Spazio Violato",
    "description": "I genitori controllano il tuo telefono violando i tuoi confini.",
    "dialogue": [
      {
        "speaker": "Mamma",
        "text": "Chi è questo con cui messaggi? Dammi il telefono, voglio leggere!"
      }
    ],
    "background": "/assets/backgrounds/bg_bedroom.jpg",
    "character": "/assets/characters/char_parent.jpg",
    "characterName": "Mamma",
    "choices": [
      {
        "id": "c9-1",
        "text": "Glielo strappi di mano facendole male.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Azione violenta.",
        "betterAlternative": "",
        "nextScenarioId": "scen-family-spazio-2",
        "isCriticalFailure": true
      },
      {
        "id": "c9-2",
        "text": "Glielo lasci leggere sentendoti violato.",
        "type": "passive",
        "emoji": "",
        "consequence": "Zero privacy.",
        "betterAlternative": "Difendi i tuoi spazi.",
        "nextScenarioId": "scen-family-spazio-2"
      },
      {
        "id": "c9-3",
        "text": "'Mamma, il telefono è personale. Ho diritto alla mia privacy.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Le fai capire il limite.",
        "betterAlternative": "",
        "nextScenarioId": "scen-family-spazio-2"
      },
      {
        "text": "Glielo strappi di mano facendole male.",
        "type": "impulsive",
        "consequence": "Uso di violenza fisica.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-family-spazio-1-0",
        "emoji": "",
        "nextScenarioId": "scen-family-spazio-2"
      },
      {
        "text": "Glielo lasci leggere tutto per paura.",
        "type": "passive",
        "consequence": "La tua privacy viene totalmente violata.",
        "betterAlternative": "Imponi il rispetto della tua privacy.",
        "id": "ext-scen-family-spazio-1-1",
        "emoji": "",
        "nextScenarioId": "scen-family-spazio-2"
      },
      {
        "text": "'È privato. Mettilo giù o ne parliamo dopo, non c'è nulla di male.'",
        "type": "assertive",
        "consequence": "Capisce di aver esagerato ed evita di ficcanasare.",
        "betterAlternative": "",
        "id": "ext-scen-family-spazio-1-2",
        "emoji": "",
        "nextScenarioId": "scen-family-spazio-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-family-spazio-2": {
    "id": "scen-family-spazio-2",
    "title": "Interrompere l'ira",
    "description": "Inizi ad arrabbiarti e lei ti interrompe mentre cerchi di spiegare.",
    "dialogue": [
      {
        "speaker": "Mamma",
        "text": "Taci! Finché vivi sotto questo tetto decido io!"
      }
    ],
    "background": "/assets/backgrounds/bg_bedroom.jpg",
    "character": "/assets/characters/char_parent.jpg",
    "characterName": "Mamma",
    "choices": [
      {
        "id": "c9-4",
        "text": "Rompi una lampada per farti ascoltare.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Fallimento drastico.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c9-5",
        "text": "Smetti di parlare e le porti rancore infinito.",
        "type": "passive",
        "emoji": "",
        "consequence": "Chiusura emotiva.",
        "betterAlternative": "Prenditi una pausa.",
        "nextScenarioId": null
      },
      {
        "id": "c9-6",
        "text": "'Ne parliamo quando saremo più calmi entrambi.' ed esci dalla stanza.",
        "type": "assertive",
        "emoji": "",
        "consequence": "Allontani l'escalation tossica.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Sbatti il tavolo fortissimo.",
        "type": "impulsive",
        "consequence": "Reazione sproporzionata.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-family-spazio-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Mormori 'Hai ragione tu' e spegni il cervello.",
        "type": "passive",
        "consequence": "Il problema rimarrà per sempre.",
        "betterAlternative": "Fermati e riprendi quando è calma.",
        "id": "ext-scen-family-spazio-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "'Ne riparliamo quando sei più calma e pronta ad ascoltare.'",
        "type": "assertive",
        "consequence": "Esci dalla stanza, evitando uno scontro inutile.",
        "betterAlternative": "",
        "id": "ext-scen-family-spazio-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-family-emozioni-1": {
    "id": "scen-family-emozioni-1",
    "title": "Emozioni Invalidate",
    "description": "Stai malissimo per un brutto voto, ma un genitore minimizza tutto.",
    "dialogue": [
      {
        "speaker": "Papà",
        "text": "Ma non è niente, cosa vuoi che sia un 4! Sei sempre il solito drammatico."
      }
    ],
    "background": "/assets/backgrounds/bg_home.jpg",
    "character": "/assets/characters/char_parent.jpg",
    "characterName": "Papà",
    "choices": [
      {
        "id": "c10-1",
        "text": "Gli tiri il quaderno in faccia.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Aggressione inaccettabile.",
        "betterAlternative": "",
        "nextScenarioId": "scen-family-emozioni-2",
        "isCriticalFailure": true
      },
      {
        "id": "c10-2",
        "text": "Ti convinci di essere sbagliato a provare quelle emozioni.",
        "type": "passive",
        "emoji": "",
        "consequence": "Impari a nascondere ciò che provi.",
        "betterAlternative": "Valida le tue emozioni.",
        "nextScenarioId": "scen-family-emozioni-2"
      },
      {
        "id": "c10-3",
        "text": "'Per me è importante, e mi fa male sentirmelo dire.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Lo spingi a riflettere.",
        "betterAlternative": "",
        "nextScenarioId": "scen-family-emozioni-2"
      },
      {
        "text": "Gli tiri il quaderno addosso.",
        "type": "impulsive",
        "consequence": "Azione inaccettabile.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-family-emozioni-1-0",
        "emoji": "",
        "nextScenarioId": "scen-family-emozioni-2"
      },
      {
        "text": "Pensi che forse ha ragione e tu esageri sempre.",
        "type": "passive",
        "consequence": "Invalidi le tue stesse emozioni.",
        "betterAlternative": "Spiegagli perché per te è importante.",
        "id": "ext-scen-family-emozioni-1-1",
        "emoji": "",
        "nextScenarioId": "scen-family-emozioni-2"
      },
      {
        "text": "'A me importa. Ci tenevo e sono dispiaciuto, volevo solo un po' di conforto.'",
        "type": "assertive",
        "consequence": "Si scusa per non essere stato empatico.",
        "betterAlternative": "",
        "id": "ext-scen-family-emozioni-1-2",
        "emoji": "",
        "nextScenarioId": "scen-family-emozioni-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-family-emozioni-2": {
    "id": "scen-family-emozioni-2",
    "title": "Sempre il Solito",
    "description": "Aggiunge il carico da novanta con un etichetta pesante.",
    "dialogue": [
      {
        "speaker": "Papà",
        "text": "Sei proprio pesante certe volte... sempre il solito tu."
      }
    ],
    "background": "/assets/backgrounds/bg_home.jpg",
    "character": "/assets/characters/char_parent.jpg",
    "characterName": "Papà",
    "choices": [
      {
        "id": "c10-4",
        "text": "Urli 'Ti odio!'",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Esplosione inutile.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c10-5",
        "text": "Inizi a disprezzarti.",
        "type": "passive",
        "emoji": "",
        "consequence": "Danneggia l'autostima profondamente.",
        "betterAlternative": "Respingi l'etichetta.",
        "nextScenarioId": null
      },
      {
        "id": "c10-6",
        "text": "'Essere sensibile non significa essere pesante.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Reazione perfetta e matura.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Urli 'Sei il peggior padre del mondo!'",
        "type": "impulsive",
        "consequence": "Fai un'affermazione gravissima e inutile.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-family-emozioni-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Vai via senza dire nulla.",
        "type": "passive",
        "consequence": "Non cambia la situazione.",
        "betterAlternative": "Fagli notare che l'etichetta fa male.",
        "id": "ext-scen-family-emozioni-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "'Questo tuo commento non mi aiuta. Mi serve supporto, non critiche.'",
        "type": "assertive",
        "consequence": "Riconosce di aver sbagliato approccio.",
        "betterAlternative": "",
        "id": "ext-scen-family-emozioni-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-anger-attesa-1": {
    "id": "scen-anger-attesa-1",
    "title": "L'Attesa Infinita",
    "description": "Devi aspettare il tuo turno alle poste, la fila è lunghissima e perdi la pazienza.",
    "dialogue": [
      {
        "speaker": "Pensiero",
        "text": "Non ce la faccio più, sto esplodendo! Devo muovermi!"
      }
    ],
    "background": "/assets/backgrounds/bg_street.jpg",
    "character": "/assets/characters/stranger.jpg",
    "characterName": "Pensiero",
    "choices": [
      {
        "id": "c11-1",
        "text": "Spintoni la gente urlando di sbrigarsi.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Caos e intervento sicurezza.",
        "betterAlternative": "",
        "nextScenarioId": "scen-anger-attesa-2",
        "isCriticalFailure": true
      },
      {
        "id": "c11-2",
        "text": "Rimani lì fremendo e digrignando i denti fino a star male.",
        "type": "passive",
        "emoji": "",
        "consequence": "Picco di cortisolo e stress.",
        "betterAlternative": "Trova un modo per distrarti.",
        "nextScenarioId": "scen-anger-attesa-2"
      },
      {
        "id": "c11-3",
        "text": "Metti le cuffie con musica rilassante per passare il tempo.",
        "type": "assertive",
        "emoji": "",
        "consequence": "Gestisci egregiamente l'impulsività.",
        "betterAlternative": "",
        "nextScenarioId": "scen-anger-attesa-2"
      },
      {
        "text": "Scavalchi tutti urlando che devi passare prima tu.",
        "type": "impulsive",
        "consequence": "Vieni cacciato via dalla sicurezza.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-anger-attesa-1-0",
        "emoji": "",
        "nextScenarioId": "scen-anger-attesa-2"
      },
      {
        "text": "Continui a sbuffare sonoramente dando fastidio a tutti.",
        "type": "passive",
        "consequence": "Tutti ti guardano male, aumenti lo stress.",
        "betterAlternative": "Trova una distrazione.",
        "id": "ext-scen-anger-attesa-1-1",
        "emoji": "",
        "nextScenarioId": "scen-anger-attesa-2"
      },
      {
        "text": "Metti le cuffie e ascolti la tua canzone preferita mentre aspetti.",
        "type": "assertive",
        "consequence": "Il tempo passa più velocemente e ti calmi.",
        "betterAlternative": "",
        "id": "ext-scen-anger-attesa-1-2",
        "emoji": "",
        "nextScenarioId": "scen-anger-attesa-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-anger-attesa-2": {
    "id": "scen-anger-attesa-2",
    "title": "Disturbo Esterno",
    "description": "Qualcuno ti chiede una cosa sciocca proprio mentre sei al limite.",
    "dialogue": [
      {
        "speaker": "Signora",
        "text": "Scusa, sai a che ora chiudono?"
      }
    ],
    "background": "/assets/backgrounds/bg_street.jpg",
    "character": "/assets/characters/stranger.jpg",
    "characterName": "Signora",
    "choices": [
      {
        "id": "c11-4",
        "text": "Le urli 'Che ne so io, vecchia!'",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Sei maleducato senza motivo.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c11-5",
        "text": "Fai finta di non sentirla e guardi altrove.",
        "type": "passive",
        "emoji": "",
        "consequence": "Sembri molto maleducato.",
        "betterAlternative": "Rispondi brevemente.",
        "nextScenarioId": null
      },
      {
        "id": "c11-6",
        "text": "'Mi scusi, non lo so proprio.' (Con gentilezza)",
        "type": "assertive",
        "emoji": "",
        "consequence": "Ottimo controllo.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "'Ma che ne so io, ti sembro il padrone?!'",
        "type": "impulsive",
        "consequence": "Insulti una signora senza motivo.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-anger-attesa-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Ti giri dall'altra parte facendo finta di non aver sentito.",
        "type": "passive",
        "consequence": "La signora ci resta male.",
        "betterAlternative": "Rispondi brevemente ed educatamente.",
        "id": "ext-scen-anger-attesa-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "'Non lo so signora, mi dispiace.'",
        "type": "assertive",
        "consequence": "La signora ringrazia e tu mantieni la calma.",
        "betterAlternative": "",
        "id": "ext-scen-anger-attesa-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-anger-partita-1": {
    "id": "scen-anger-partita-1",
    "title": "La Partita Decisiva",
    "description": "Perdi malamente una partita a cui tenevi tanto.",
    "dialogue": [
      {
        "speaker": "Pensiero",
        "text": "Ho sbagliato il tiro finale... è tutta colpa mia!"
      }
    ],
    "background": "/assets/backgrounds/bg_park.jpg",
    "character": "/assets/characters/friend.jpg",
    "characterName": "Pensiero",
    "choices": [
      {
        "id": "c12-1",
        "text": "Lanci via il pallone oltre il recinto per rabbia.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Rovini il gioco a tutti.",
        "betterAlternative": "",
        "nextScenarioId": "scen-anger-partita-2",
        "isCriticalFailure": true
      },
      {
        "id": "c12-2",
        "text": "Ti siedi in un angolo a sentirti un perdente nato.",
        "type": "passive",
        "emoji": "",
        "consequence": "Auto-sabotaggio.",
        "betterAlternative": "Accetta la sconfitta.",
        "nextScenarioId": "scen-anger-partita-2"
      },
      {
        "id": "c12-3",
        "text": "Fai un respiro profondo e vai a stringere la mano ai vincitori.",
        "type": "assertive",
        "emoji": "",
        "consequence": "Vero spirito sportivo.",
        "betterAlternative": "",
        "nextScenarioId": "scen-anger-partita-2"
      },
      {
        "text": "Spacchi il controller/racchetta a terra.",
        "type": "impulsive",
        "consequence": "Hai distrutto una cosa tua.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-anger-partita-1-0",
        "emoji": "",
        "nextScenarioId": "scen-anger-partita-2"
      },
      {
        "text": "Decidi che non giocherai mai più a questo gioco.",
        "type": "passive",
        "consequence": "Ti privi di una tua passione per un errore.",
        "betterAlternative": "Accetta la sconfitta sportivamente.",
        "id": "ext-scen-anger-partita-1-1",
        "emoji": "",
        "nextScenarioId": "scen-anger-partita-2"
      },
      {
        "text": "'Pazienza, mi allenerò di più per la prossima volta.'",
        "type": "assertive",
        "consequence": "Accetti l'errore e maturi sportivamente.",
        "betterAlternative": "",
        "id": "ext-scen-anger-partita-1-2",
        "emoji": "",
        "nextScenarioId": "scen-anger-partita-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-anger-partita-2": {
    "id": "scen-anger-partita-2",
    "title": "Provocazioni",
    "description": "Un avversario ti provoca intenzionalmente per farti esplodere.",
    "dialogue": [
      {
        "speaker": "Avversario",
        "text": "Eri davvero imbarazzante oggi, quasi facevi tenerezza."
      }
    ],
    "background": "/assets/backgrounds/bg_park.jpg",
    "character": "/assets/characters/bully.jpg",
    "characterName": "Avversario",
    "choices": [
      {
        "id": "c12-4",
        "text": "Gli salti addosso.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Folle.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c12-5",
        "text": "Abbassi lo sguardo e gli dai ragione mentalmente.",
        "type": "passive",
        "emoji": "",
        "consequence": "Ti fai ferire.",
        "betterAlternative": "Ignoralo.",
        "nextScenarioId": null
      },
      {
        "id": "c12-6",
        "text": "Sorridi: 'Si vince e si perde. Bella partita.' e te ne vai.",
        "type": "assertive",
        "emoji": "",
        "consequence": "Lo disarmi completamente.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Gli tiri un pugno in faccia.",
        "type": "impulsive",
        "consequence": "Fai male a qualcuno. Gesto intollerabile.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-anger-partita-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Inizi a piangere di rabbia davanti a tutti.",
        "type": "passive",
        "consequence": "Gli dai la soddisfazione di averti ferito.",
        "betterAlternative": "Ignoralo con classe.",
        "id": "ext-scen-anger-partita-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "'Bravo per la vittoria.' e te ne vai senza dargli retta.",
        "type": "assertive",
        "consequence": "Lo lasci senza parole e vinci moralmente.",
        "betterAlternative": "",
        "id": "ext-scen-anger-partita-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-anger-limite-1": {
    "id": "scen-anger-limite-1",
    "title": "Oltre il Limite",
    "description": "Durante un aspro litigio hai fortissima voglia di colpire qualcosa o qualcuno.",
    "dialogue": [
      {
        "speaker": "Amico",
        "text": "Non sai fare niente di buono, sei un disastro!"
      }
    ],
    "background": "/assets/backgrounds/bg_bus.jpg",
    "character": "/assets/characters/bully.jpg",
    "characterName": "Amico",
    "choices": [
      {
        "id": "c13-1",
        "text": "Gli molli un pugno sul viso.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Violenza fisica grave.",
        "betterAlternative": "",
        "nextScenarioId": "scen-anger-limite-2",
        "isCriticalFailure": true
      },
      {
        "id": "c13-2",
        "text": "Ti tieni tutto dentro ma inizi a tremare.",
        "type": "passive",
        "emoji": "",
        "consequence": "Stai fisicamente male per la tensione.",
        "betterAlternative": "Allontanati subito.",
        "nextScenarioId": "scen-anger-limite-2"
      },
      {
        "id": "c13-3",
        "text": "'Sono troppo arrabbiato ora, devo andarmene.' Ti giri e te ne vai.",
        "type": "assertive",
        "emoji": "",
        "consequence": "Salvi la situazione allontanandoti.",
        "betterAlternative": "",
        "nextScenarioId": "scen-anger-limite-2"
      },
      {
        "text": "Lo spingi via con tutta la forza.",
        "type": "impulsive",
        "consequence": "Alzi le mani. Ti metti nei guai seri.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-anger-limite-1-0",
        "emoji": "",
        "nextScenarioId": "scen-anger-limite-2"
      },
      {
        "text": "Continui a farti insultare senza dire nulla.",
        "type": "passive",
        "consequence": "Ti fa sentire inutile e distrutto.",
        "betterAlternative": "Allontanati dalla situazione tossica.",
        "id": "ext-scen-anger-limite-1-1",
        "emoji": "",
        "nextScenarioId": "scen-anger-limite-2"
      },
      {
        "text": "'Non ho intenzione di farmi parlare così. Ciao.' e te ne vai.",
        "type": "assertive",
        "consequence": "Dimostri un grande controllo emotivo.",
        "betterAlternative": "",
        "id": "ext-scen-anger-limite-1-2",
        "emoji": "",
        "nextScenarioId": "scen-anger-limite-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-anger-limite-2": {
    "id": "scen-anger-limite-2",
    "title": "La Rottura",
    "description": "Una volta solo, la rabbia è ancora alta. C'è un oggetto di vetro vicino a te.",
    "dialogue": [
      {
        "speaker": "Pensiero",
        "text": "Se rompo qualcosa magari questa rabbia uscirà..."
      }
    ],
    "background": "/assets/backgrounds/bg_bedroom.jpg",
    "character": "/assets/characters/student.jpg",
    "characterName": "Pensiero",
    "choices": [
      {
        "id": "c13-4",
        "text": "Prendi il bicchiere e lo schianti a terra.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Rompi l'oggetto e rischi di ferirti.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c13-5",
        "text": "Ti sdrai per terra fissando il soffitto paralizzato.",
        "type": "passive",
        "emoji": "",
        "consequence": "L'energia non viene scaricata.",
        "betterAlternative": "Sfoga la rabbia in modo sano.",
        "nextScenarioId": null
      },
      {
        "id": "c13-6",
        "text": "Stringi fortissimo un cuscino e lo tiri sul letto.",
        "type": "assertive",
        "emoji": "",
        "consequence": "Sfoghi la fisicità senza danni.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Prendi l'oggetto di vetro e lo scagli contro il muro.",
        "type": "impulsive",
        "consequence": "Devasti la stanza e rischi di farti male.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-anger-limite-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Tieni tutto dentro fino a stare male fisicamente.",
        "type": "passive",
        "consequence": "Ti viene un attacco di mal di pancia per lo stress.",
        "betterAlternative": "Trova uno sfogo sano.",
        "id": "ext-scen-anger-limite-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Fai 20 flessioni per scaricare l'energia accumulata.",
        "type": "assertive",
        "consequence": "La rabbia scende e il corpo si rilassa.",
        "betterAlternative": "",
        "id": "ext-scen-anger-limite-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-social-parola-1": {
    "id": "scen-social-parola-1",
    "title": "La Parola Sbagliata",
    "description": "In classe fai una figuraccia pronunciando una parola molto imbarazzante per sbaglio.",
    "dialogue": [
      {
        "speaker": "Classe",
        "text": "Ahahahahah! Cos'ha appena detto?!"
      }
    ],
    "background": "/assets/backgrounds/bg_classroom.jpg",
    "character": "/assets/characters/teacher.jpg",
    "characterName": "Classe",
    "choices": [
      {
        "id": "c14-1",
        "text": "Scagli un libro in aria urlando 'Zitti!'.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Aggravi pesantemente la situazione.",
        "betterAlternative": "",
        "nextScenarioId": "scen-social-parola-2",
        "isCriticalFailure": true
      },
      {
        "id": "c14-2",
        "text": "Nascondi la faccia tra le braccia, piangendo.",
        "type": "passive",
        "emoji": "",
        "consequence": "Provi enorme vergogna prolungata.",
        "betterAlternative": "Usa l'ironia.",
        "nextScenarioId": "scen-social-parola-2"
      },
      {
        "id": "c14-3",
        "text": "Ridi tu stesso: 'Okay, questa è uscita proprio male!'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Disinneschi l'imbarazzo con l'autoironia.",
        "betterAlternative": "",
        "nextScenarioId": "scen-social-parola-2"
      },
      {
        "text": "Tiri un libro in faccia al compagno che ride di più.",
        "type": "impulsive",
        "consequence": "Reazione violenta del tutto fuori luogo.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-social-parola-1-0",
        "emoji": "",
        "nextScenarioId": "scen-social-parola-2"
      },
      {
        "text": "Diventi rosso e corri a nasconderti in bagno piangendo.",
        "type": "passive",
        "consequence": "La figuraccia pesa ancora di più.",
        "betterAlternative": "Ridici su.",
        "id": "ext-scen-social-parola-1-1",
        "emoji": "",
        "nextScenarioId": "scen-social-parola-2"
      },
      {
        "text": "'Scusate, volevo dire tutt'altro! Ops!' ridi anche tu.",
        "type": "assertive",
        "consequence": "La prendono come una gaffe simpatica e finisce lì.",
        "betterAlternative": "",
        "id": "ext-scen-social-parola-1-2",
        "emoji": "",
        "nextScenarioId": "scen-social-parola-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-social-parola-2": {
    "id": "scen-social-parola-2",
    "title": "La Battuta di Ritorno",
    "description": "Subito dopo qualcuno rincara la dose con una battuta che ti ferisce.",
    "dialogue": [
      {
        "speaker": "Compagno",
        "text": "Beh non mi sorprende, sei un po' speciale tu, eh?"
      }
    ],
    "background": "/assets/backgrounds/bg_classroom.jpg",
    "character": "/assets/characters/bully.jpg",
    "characterName": "Compagno",
    "choices": [
      {
        "id": "c14-4",
        "text": "Ti alzi e gli tiri un pugno.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Violenza ingiustificabile.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c14-5",
        "text": "Fai finta di non sentire.",
        "type": "passive",
        "emoji": "",
        "consequence": "Rimani con la ferita dentro.",
        "betterAlternative": "Mettilo al suo posto a parole.",
        "nextScenarioId": null
      },
      {
        "id": "c14-6",
        "text": "'Questo commento è inopportuno e maleducato.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Fai valere il tuo rispetto.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Inizi a bestemmiare o insultare pesantemente.",
        "type": "impulsive",
        "consequence": "Vieni punito e isolato.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-social-parola-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Gli dai ragione, facendoti umiliare ulteriormente.",
        "type": "passive",
        "consequence": "Ti senti una nullità.",
        "betterAlternative": "Smonta la battuta.",
        "id": "ext-scen-social-parola-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "'Si, dai, fai la battuta, l'abbiamo capita tutti. Andiamo avanti.'",
        "type": "assertive",
        "consequence": "Lo zittisci con molta eleganza e la classe passa oltre.",
        "betterAlternative": "",
        "id": "ext-scen-social-parola-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  },
  "scen-frust-no-1": {
    "id": "scen-frust-no-1",
    "title": "Il No Insopportabile",
    "description": "Ricevi un secco 'NO' per qualcosa a cui tenevi moltissimo (una gita).",
    "dialogue": [
      {
        "speaker": "Mamma",
        "text": "No, non ci vai, costa troppo e tu non lo meriti in questo periodo."
      }
    ],
    "background": "/assets/backgrounds/bg_kitchen.jpg",
    "character": "/assets/characters/char_parent.jpg",
    "characterName": "Mamma",
    "choices": [
      {
        "id": "c15-1",
        "text": "Butti tutto all'aria e scappi di casa.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Reazione gravissima.",
        "betterAlternative": "",
        "nextScenarioId": "scen-frust-no-2",
        "isCriticalFailure": true
      },
      {
        "id": "c15-2",
        "text": "Piangi da solo rinunciando immediatamente.",
        "type": "passive",
        "emoji": "",
        "consequence": "Nessuna negoziazione, solo tristezza.",
        "betterAlternative": "Chiedi il perché con calma.",
        "nextScenarioId": "scen-frust-no-2"
      },
      {
        "id": "c15-3",
        "text": "'Ci tengo davvero tanto. C'è un modo per guadagnarmelo?'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Apri una porta alla negoziazione adulta.",
        "betterAlternative": "",
        "nextScenarioId": "scen-frust-no-2"
      },
      {
        "text": "Urli e rubi i soldi dal portafoglio di tua madre.",
        "type": "impulsive",
        "consequence": "Furto e perdita totale della fiducia.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-frust-no-1-0",
        "emoji": "",
        "nextScenarioId": "scen-frust-no-2"
      },
      {
        "text": "Smetti di parlarle per un mese e vai male a scuola per dispetto.",
        "type": "passive",
        "consequence": "Danneggi solo te stesso.",
        "betterAlternative": "Cerca di comprendere e trovare una soluzione alternativa.",
        "id": "ext-scen-frust-no-1-1",
        "emoji": "",
        "nextScenarioId": "scen-frust-no-2"
      },
      {
        "text": "'Capisco. Posso fare dei lavoretti in casa per guadagnarmi i soldi da solo?'",
        "type": "assertive",
        "consequence": "La madre apprezza tantissimo e accetta.",
        "betterAlternative": "",
        "id": "ext-scen-frust-no-1-2",
        "emoji": "",
        "nextScenarioId": "scen-frust-no-2"
      }
    ],
    "isStartingNode": true
  },
  "scen-frust-no-2": {
    "id": "scen-frust-no-2",
    "title": "Stanchi Morti",
    "description": "La sera stessa sei stanco morto ma ti chiedono ancora attenzione o lavori da fare.",
    "dialogue": [
      {
        "speaker": "Papà",
        "text": "Vai a buttare la spazzatura e sistema il garage, muoviti."
      }
    ],
    "background": "/assets/backgrounds/bg_kitchen.jpg",
    "character": "/assets/characters/char_parent.jpg",
    "characterName": "Papà",
    "choices": [
      {
        "id": "c15-4",
        "text": "Lanci il secchio dell'immondizia addosso a lui.",
        "type": "impulsive",
        "emoji": "",
        "consequence": "Incredibilmente grave.",
        "betterAlternative": "",
        "nextScenarioId": null,
        "isCriticalFailure": true
      },
      {
        "id": "c15-5",
        "text": "Fai tutto trascinandoti e odiando la tua vita.",
        "type": "passive",
        "emoji": "",
        "consequence": "Zero confini personali.",
        "betterAlternative": "Spiega la stanchezza.",
        "nextScenarioId": null
      },
      {
        "id": "c15-6",
        "text": "'Papà, sono esausto oggi. Prometto che butto la spazzatura, ma il garage lo faccio domani.'",
        "type": "assertive",
        "emoji": "",
        "consequence": "Stile maturo di negoziazione.",
        "betterAlternative": "",
        "nextScenarioId": null
      },
      {
        "text": "Spingi tuo padre e butti la spazzatura in salotto.",
        "type": "impulsive",
        "consequence": "Disastro in casa.",
        "betterAlternative": "",
        "isCriticalFailure": true,
        "id": "ext-scen-frust-no-2-0",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "Lo fai malissimo sbuffando in continuazione.",
        "type": "passive",
        "consequence": "Lavori controvoglia e tuo padre si arrabbia lo stesso.",
        "betterAlternative": "Chiedi di rimandare a domani.",
        "id": "ext-scen-frust-no-2-1",
        "emoji": "",
        "nextScenarioId": null
      },
      {
        "text": "'Papà, sono esausto oggi. Posso svegliarmi 10 minuti prima e farlo domani mattina?'",
        "type": "assertive",
        "consequence": "Papà accetta perché capisce la stanchezza.",
        "betterAlternative": "",
        "id": "ext-scen-frust-no-2-2",
        "emoji": "",
        "nextScenarioId": null
      }
    ],
    "isStartingNode": false
  }
};
