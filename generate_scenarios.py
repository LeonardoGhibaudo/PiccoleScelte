import json

scenarios = {}

def add_scenario(sid, title, description, dialogue, bg, char, charName, choices, is_start):
    scenarios[sid] = {
        "id": sid,
        "title": title,
        "description": description,
        "dialogue": dialogue,
        "background": bg,
        "character": char,
        "characterName": charName,
        "choices": choices,
        "isStartingNode": is_start
    }

# CHAP 1: Pressione alla Lavagna (Critica, concentrazione)
add_scenario("scen-school-pressione-1", "Pressione alla Lavagna", "Un insegnante ti critica davanti a tutti e la tua concentrazione crolla.", 
[{"speaker": "Professoressa", "text": "Non riesci mai a concentrarti! Guardami quando ti parlo!"}], 
"/assets/backgrounds/bg_classroom.jpg", "/assets/characters/teacher.jpg", "Professoressa", [
{"id": "c1-1", "text": "Urli e lanci la matita.", "type": "impulsive", "emoji": "", "consequence": "Ti sbatte fuori.", "betterAlternative": "Cerca di spiegarti con calma.", "nextScenarioId": "scen-school-pressione-2", "isCriticalFailure": True},
{"id": "c1-2", "text": "Ti chiudi in te stesso e smetti di ascoltare.", "type": "passive", "emoji": "", "consequence": "Prendi un brutto voto.", "betterAlternative": "Prova a partecipare.", "nextScenarioId": "scen-school-pressione-2"},
{"id": "c1-3", "text": "'Mi scusi, faccio fatica oggi. Posso provarci?'", "type": "assertive", "emoji": "", "consequence": "Apprezza lo sforzo.", "betterAlternative": "", "nextScenarioId": "scen-school-pressione-2"}
], True)
add_scenario("scen-school-pressione-2", "Concentrazione a Zero", "Non riesci proprio a concentrarti sull'esercizio assegnato.",
[{"speaker": "Pensiero", "text": "Le parole sul foglio si muovono, non riesco a capire nulla..."}],
"/assets/backgrounds/bg_classroom.jpg", "/assets/characters/student.jpg", "Pensiero", [
{"id": "c1-4", "text": "Strappi il foglio per la frustrazione.", "type": "impulsive", "emoji": "", "consequence": "Distruggi il lavoro.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c1-5", "text": "Resti fermo a fissare il vuoto.", "type": "passive", "emoji": "", "consequence": "Il tempo scade.", "betterAlternative": "Chiedi aiuto.", "nextScenarioId": None},
{"id": "c1-6", "text": "Chiedi alla prof se puoi fare una pausa di 2 minuti.", "type": "assertive", "emoji": "", "consequence": "Ti calmi e poi riprendi.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 2: Distrazioni Pericolose (Troppe cose, interruzioni)
add_scenario("scen-school-distrazioni-1", "Distrazioni Pericolose", "Ti senti sopraffatto dalle troppe cose da fare e continui a essere interrotto.",
[{"speaker": "Compagno", "text": "Ehi, passami gli appunti! Dai muoviti!"}],
"/assets/backgrounds/bg_classroom.jpg", "/assets/characters/student.jpg", "Compagno", [
{"id": "c2-1", "text": "Gli tiri il quaderno in faccia.", "type": "impulsive", "emoji": "", "consequence": "Fai male al compagno.", "betterAlternative": "", "nextScenarioId": "scen-school-distrazioni-2", "isCriticalFailure": True},
{"id": "c2-2", "text": "Gliele dai e perdi il filo di quello che stavi facendo.", "type": "passive", "emoji": "", "consequence": "Non riesci a finire il tuo lavoro.", "betterAlternative": "Digli di aspettare.", "nextScenarioId": "scen-school-distrazioni-2"},
{"id": "c2-3", "text": "'Un attimo, finisco questo e te li do.'", "type": "assertive", "emoji": "", "consequence": "Rispetta il tuo tempo.", "betterAlternative": "", "nextScenarioId": "scen-school-distrazioni-2"}
], True)
add_scenario("scen-school-distrazioni-2", "Interruzioni Continue", "Mentre cerchi di spiegare il progetto, un altro compagno ti interrompe continuamente.",
[{"speaker": "Compagno", "text": "No, ma guarda che si fa così, non capisci niente!"}],
"/assets/backgrounds/bg_hallway.jpg", "/assets/characters/bully.jpg", "Compagno", [
{"id": "c2-4", "text": "Lo insulti pesantemente.", "type": "impulsive", "emoji": "", "consequence": "Si crea un litigio.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c2-5", "text": "Ti arrendi e smetti di parlare.", "type": "passive", "emoji": "", "consequence": "Non esprimi la tua opinione.", "betterAlternative": "Chiedi di finire il discorso.", "nextScenarioId": None},
{"id": "c2-6", "text": "'Per favore, lasciami finire di parlare.'", "type": "assertive", "emoji": "", "consequence": "Punto per te.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 3: Un Messaggio nel Vuoto (Non risponde, gelosia)
add_scenario("scen-friends-messaggio-1", "Un Messaggio nel Vuoto", "Scrivi a qualcuno che non risponde, innescando paure legate al rifiuto.",
[{"speaker": "Pensiero", "text": "Ha visualizzato da un'ora... mi odia, lo so."}],
"/assets/backgrounds/bg_bedroom.jpg", "/assets/characters/friend.jpg", "Pensiero", [
{"id": "c3-1", "text": "Lo blocchi su tutti i social.", "type": "impulsive", "emoji": "", "consequence": "Rovini l'amicizia impulsivamente.", "betterAlternative": "", "nextScenarioId": "scen-friends-messaggio-2", "isCriticalFailure": True},
{"id": "c3-2", "text": "Piangi sentendoti sbagliato.", "type": "passive", "emoji": "", "consequence": "Stai malissimo tutto il giorno.", "betterAlternative": "Distraiti con altro.", "nextScenarioId": "scen-friends-messaggio-2"},
{"id": "c3-3", "text": "Metti via il telefono e vai a fare una passeggiata.", "type": "assertive", "emoji": "", "consequence": "Gestisci bene l'ansia.", "betterAlternative": "", "nextScenarioId": "scen-friends-messaggio-2"}
], True)
add_scenario("scen-friends-messaggio-2", "Gelosia Tossica", "Poi vedi una sua foto in cui è fuori con altri amici importanti.",
[{"speaker": "Pensiero", "text": "Ecco perché non rispondeva! Si diverte senza di me!"}],
"/assets/backgrounds/bg_park.jpg", "/assets/characters/stranger.jpg", "Pensiero", [
{"id": "c3-4", "text": "Scrivi un commento cattivo sotto la foto.", "type": "impulsive", "emoji": "", "consequence": "Fai una figuraccia pubblica.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c3-5", "text": "Ti convinci di essere un peso e smetti di scrivergli per mesi.", "type": "passive", "emoji": "", "consequence": "Perdi un amico.", "betterAlternative": "Accetta che può avere altri amici.", "nextScenarioId": None},
{"id": "c3-6", "text": "Accetti che ha diritto di uscire con chi vuole e ti rassereni.", "type": "assertive", "emoji": "", "consequence": "Maturità emotiva dimostrata.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 4: Lo Scherzo di Troppo (Presa in giro, escluso)
add_scenario("scen-friends-scherzo-1", "Lo Scherzo di Troppo", "Vieni preso in giro davanti a tutti e inizi a sentirti escluso.",
[{"speaker": "Marco", "text": "Ahahah ma guarda come ti sei vestito oggi, sembri un clown!"}],
"/assets/backgrounds/bg_street.jpg", "/assets/characters/friend.jpg", "Marco", [
{"id": "c4-1", "text": "Lo spintoni con violenza.", "type": "impulsive", "emoji": "", "consequence": "Violenza ingiustificata.", "betterAlternative": "", "nextScenarioId": "scen-friends-scherzo-2", "isCriticalFailure": True},
{"id": "c4-2", "text": "Fai una risatina finta mentre muori dentro.", "type": "passive", "emoji": "", "consequence": "Incoraggi altre prese in giro.", "betterAlternative": "Difenditi verbalmente.", "nextScenarioId": "scen-friends-scherzo-2"},
{"id": "c4-3", "text": "'Questo non fa ridere, a me piace come mi vesto.'", "type": "assertive", "emoji": "", "consequence": "Gli altri smettono di ridere.", "betterAlternative": "", "nextScenarioId": "scen-friends-scherzo-2"}
], True)
add_scenario("scen-friends-scherzo-2", "Sentirsi Esclusi", "Dopo lo scherzo, il gruppo decide di andare a mangiare ma non ti invitano chiaramente.",
[{"speaker": "Marco", "text": "Noi andiamo in pizzeria. Ciao!"}],
"/assets/backgrounds/bg_street.jpg", "/assets/characters/friend.jpg", "Marco", [
{"id": "c4-4", "text": "Sputi per terra e urli 'Andate al diavolo!'.", "type": "impulsive", "emoji": "", "consequence": "Reazione eccessiva.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c4-5", "text": "Torni a casa deprimendoti e sentendoti sbagliato.", "type": "passive", "emoji": "", "consequence": "Nutri l'isolamento.", "betterAlternative": "Cerca altri amici.", "nextScenarioId": None},
{"id": "c4-6", "text": "'Buona pizza, io mi organizzo diversamente, ciao.'", "type": "assertive", "emoji": "", "consequence": "Mantieni la dignità e volta pagina.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 5: Segreti Svelati (Tradimento fiducia)
add_scenario("scen-friends-segreti-1", "Segreti Svelati", "Qualcuno tradisce la tua fiducia rompendo una promessa importante.",
[{"speaker": "Amica", "text": "Ops, mi è scappato il tuo segreto davanti a tutti, scusa..."}],
"/assets/backgrounds/bg_park.jpg", "/assets/characters/friend.jpg", "Amica", [
{"id": "c5-1", "text": "Le tiri uno schiaffo.", "type": "impulsive", "emoji": "", "consequence": "Violenza inaccettabile.", "betterAlternative": "", "nextScenarioId": "scen-friends-segreti-2", "isCriticalFailure": True},
{"id": "c5-2", "text": "Scappi via piangendo.", "type": "passive", "emoji": "", "consequence": "Mostri vulnerabilità a chi ti ha ferito.", "betterAlternative": "Esprimi il tuo disappunto.", "nextScenarioId": "scen-friends-segreti-2"},
{"id": "c5-3", "text": "'Mi avevi promesso di non dirlo. Sono molto deluso.'", "type": "assertive", "emoji": "", "consequence": "Le fai capire la gravità.", "betterAlternative": "", "nextScenarioId": "scen-friends-segreti-2"}
], True)
add_scenario("scen-friends-segreti-2", "Scuse Non Accettate", "Prova a giustificarsi dicendo che 'non era una cosa importante'.",
[{"speaker": "Amica", "text": "Dai, non fare il permaloso, non è mica grave!"}],
"/assets/backgrounds/bg_park.jpg", "/assets/characters/friend.jpg", "Amica", [
{"id": "c5-4", "text": "Le rompi il telefono.", "type": "impulsive", "emoji": "", "consequence": "Danno enorme.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c5-5", "text": "Dici 'ok hai ragione' reprimendo la rabbia.", "type": "passive", "emoji": "", "consequence": "Sminuisci i tuoi sentimenti.", "betterAlternative": "Falle capire che per te era importante.", "nextScenarioId": None},
{"id": "c5-6", "text": "'Per me lo era. Ho bisogno di tempo.' e te ne vai.", "type": "assertive", "emoji": "", "consequence": "Metti un confine chiaro.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 6: Scontri in Salotto (Famiglia, litigi)
add_scenario("scen-family-scontri-1", "Scontri in Salotto", "Una discussione accesa in cui un genitore, stressato, ti urla contro.",
[{"speaker": "Papà", "text": "Non fai mai niente in questa casa! Sono stufo!"}],
"/assets/backgrounds/bg_home.jpg", "/assets/characters/parent.jpg", "Papà", [
{"id": "c6-1", "text": "Tiri un calcio al tavolino.", "type": "impulsive", "emoji": "", "consequence": "Rompi le cose, peggiorando la situazione.", "betterAlternative": "", "nextScenarioId": "scen-family-scontri-2", "isCriticalFailure": True},
{"id": "c6-2", "text": "Abbozzi e ti fai venire l'ansia.", "type": "passive", "emoji": "", "consequence": "Accumuli stress tossico.", "betterAlternative": "Rispondi con calma.", "nextScenarioId": "scen-family-scontri-2"},
{"id": "c6-3", "text": "'Capisco che sei stanco, ma non urlare, per favore.'", "type": "assertive", "emoji": "", "consequence": "Disinneschi la sua rabbia.", "betterAlternative": "", "nextScenarioId": "scen-family-scontri-2"}
], True)
add_scenario("scen-family-scontri-2", "Calmare le Acque", "Il genitore si ferma un attimo e sospira.",
[{"speaker": "Papà", "text": "Sì, ma tu devi dare una mano... scusa se ho urlato."}],
"/assets/backgrounds/bg_home.jpg", "/assets/characters/parent.jpg", "Papà", [
{"id": "c6-4", "text": "'Non me ne frega niente delle tue scuse!'", "type": "impulsive", "emoji": "", "consequence": "Riaccendi la lite.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c6-5", "text": "Fai spallucce senza guardarlo in faccia.", "type": "passive", "emoji": "", "consequence": "Freddezza che lascia irrisolto il nodo.", "betterAlternative": "Accetta le scuse.", "nextScenarioId": None},
{"id": "c6-6", "text": "'Ok. Dimmi cosa posso fare ora per aiutarti.'", "type": "assertive", "emoji": "", "consequence": "Risolvete il conflitto pacificamente.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 7: Regole e Ribellione (Famiglia, ingiustizia)
add_scenario("scen-family-regole-1", "Regole e Ribellione", "Ti viene imposta una regola che non accetti, seguita da una punizione ingiusta.",
[{"speaker": "Mamma", "text": "Da oggi non puoi più usare il computer dopo le 20. Punto."}],
"/assets/backgrounds/bg_kitchen.jpg", "/assets/characters/parent.jpg", "Mamma", [
{"id": "c7-1", "text": "Urli parolacce alla mamma.", "type": "impulsive", "emoji": "", "consequence": "Punizione raddoppiata.", "betterAlternative": "", "nextScenarioId": "scen-family-regole-2", "isCriticalFailure": True},
{"id": "c7-2", "text": "Ubbidisci ciecamente ma passi la notte a rimuginare.", "type": "passive", "emoji": "", "consequence": "La frustrazione ti logora.", "betterAlternative": "Prova a negoziare.", "nextScenarioId": "scen-family-regole-2"},
{"id": "c7-3", "text": "'Possiamo parlarne? Dopo le 20 è quando ci sono i miei amici online.'", "type": "assertive", "emoji": "", "consequence": "Apre una spiraglio di dialogo.", "betterAlternative": "", "nextScenarioId": "scen-family-regole-2"}
], True)
add_scenario("scen-family-regole-2", "Punizione Ingiusta", "A causa di un malinteso, ti dà comunque la punizione.",
[{"speaker": "Mamma", "text": "Non mi interessa. Per stasera sei in punizione."}],
"/assets/backgrounds/bg_kitchen.jpg", "/assets/characters/parent.jpg", "Mamma", [
{"id": "c7-4", "text": "Spacchi un piatto.", "type": "impulsive", "emoji": "", "consequence": "Atto pericoloso.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c7-5", "text": "Ti chiudi in camera in silenzio totale.", "type": "passive", "emoji": "", "consequence": "Tristezza profonda.", "betterAlternative": "Esprimi il dissenso pacifico.", "nextScenarioId": None},
{"id": "c7-6", "text": "'La trovo ingiusta, ma rispetterò la regola per stasera.'", "type": "assertive", "emoji": "", "consequence": "Mostri grande maturità.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 8: Il Peso delle Aspettative (Confronto)
add_scenario("scen-family-aspettative-1", "Il Peso delle Aspettative", "Vieni confrontato ingiustamente con i tuoi fratelli.",
[{"speaker": "Papà", "text": "Tua sorella prende tutti 10 e tu fai fatica. Perché non sei come lei?"}],
"/assets/backgrounds/bg_home.jpg", "/assets/characters/parent.jpg", "Papà", [
{"id": "c8-1", "text": "Tiri un pugno al muro.", "type": "impulsive", "emoji": "", "consequence": "Ti fai male e spaventi tutti.", "betterAlternative": "", "nextScenarioId": "scen-family-aspettative-2", "isCriticalFailure": True},
{"id": "c8-2", "text": "Pensi davvero di essere inferiore e un fallimento.", "type": "passive", "emoji": "", "consequence": "Rovina l'autostima in modo permanente.", "betterAlternative": "Difendi la tua unicità.", "nextScenarioId": "scen-family-aspettative-2"},
{"id": "c8-3", "text": "'Io ho le mie sfide. Non è giusto paragonarmi a lei.'", "type": "assertive", "emoji": "", "consequence": "Metti il genitore di fronte al suo errore.", "betterAlternative": "", "nextScenarioId": "scen-family-aspettative-2"}
], True)
add_scenario("scen-family-aspettative-2", "Giudicati dagli altri", "Anche gli altri parenti sembrano darti sguardi di disapprovazione.",
[{"speaker": "Zio", "text": "Eh sì, lui è sempre stato quello problematico della famiglia."}],
"/assets/backgrounds/bg_home.jpg", "/assets/characters/stranger.jpg", "Zio", [
{"id": "c8-4", "text": "Versi l'acqua addosso allo zio.", "type": "impulsive", "emoji": "", "consequence": "Crei un putiferio.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c8-5", "text": "Ti alzi da tavola con le lacrime agli occhi.", "type": "passive", "emoji": "", "consequence": "Non affronti il commento.", "betterAlternative": "Rispondi educatamente.", "nextScenarioId": None},
{"id": "c8-6", "text": "'Problematico no, solo diverso. E sto facendo del mio meglio.'", "type": "assertive", "emoji": "", "consequence": "Tutti ammutoliscono. Ottimo lavoro.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 9: Spazio Violato (Privacy, interrompere arrabbiati)
add_scenario("scen-family-spazio-1", "Spazio Violato", "I genitori controllano il tuo telefono violando i tuoi confini.",
[{"speaker": "Mamma", "text": "Chi è questo con cui messaggi? Dammi il telefono, voglio leggere!"}],
"/assets/backgrounds/bg_bedroom.jpg", "/assets/characters/parent.jpg", "Mamma", [
{"id": "c9-1", "text": "Glielo strappi di mano facendole male.", "type": "impulsive", "emoji": "", "consequence": "Azione violenta.", "betterAlternative": "", "nextScenarioId": "scen-family-spazio-2", "isCriticalFailure": True},
{"id": "c9-2", "text": "Glielo lasci leggere sentendoti violato.", "type": "passive", "emoji": "", "consequence": "Zero privacy.", "betterAlternative": "Difendi i tuoi spazi.", "nextScenarioId": "scen-family-spazio-2"},
{"id": "c9-3", "text": "'Mamma, il telefono è personale. Ho diritto alla mia privacy.'", "type": "assertive", "emoji": "", "consequence": "Le fai capire il limite.", "betterAlternative": "", "nextScenarioId": "scen-family-spazio-2"}
], True)
add_scenario("scen-family-spazio-2", "Interrompere l'ira", "Inizi ad arrabbiarti e lei ti interrompe mentre cerchi di spiegare.",
[{"speaker": "Mamma", "text": "Taci! Finché vivi sotto questo tetto decido io!"}],
"/assets/backgrounds/bg_bedroom.jpg", "/assets/characters/parent.jpg", "Mamma", [
{"id": "c9-4", "text": "Rompi una lampada per farti ascoltare.", "type": "impulsive", "emoji": "", "consequence": "Fallimento drastico.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c9-5", "text": "Smetti di parlare e le porti rancore infinito.", "type": "passive", "emoji": "", "consequence": "Chiusura emotiva.", "betterAlternative": "Prenditi una pausa.", "nextScenarioId": None},
{"id": "c9-6", "text": "'Ne parliamo quando saremo più calmi entrambi.' ed esci dalla stanza.", "type": "assertive", "emoji": "", "consequence": "Allontani l'escalation tossica.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 10: Emozioni Invalidate (Minimizzare)
add_scenario("scen-family-emozioni-1", "Emozioni Invalidate", "Stai malissimo per un brutto voto, ma un genitore minimizza tutto.",
[{"speaker": "Papà", "text": "Ma non è niente, cosa vuoi che sia un 4! Sei sempre il solito drammatico."}],
"/assets/backgrounds/bg_home.jpg", "/assets/characters/parent.jpg", "Papà", [
{"id": "c10-1", "text": "Gli tiri il quaderno in faccia.", "type": "impulsive", "emoji": "", "consequence": "Aggressione inaccettabile.", "betterAlternative": "", "nextScenarioId": "scen-family-emozioni-2", "isCriticalFailure": True},
{"id": "c10-2", "text": "Ti convinci di essere sbagliato a provare quelle emozioni.", "type": "passive", "emoji": "", "consequence": "Impari a nascondere ciò che provi.", "betterAlternative": "Valida le tue emozioni.", "nextScenarioId": "scen-family-emozioni-2"},
{"id": "c10-3", "text": "'Per me è importante, e mi fa male sentirmelo dire.'", "type": "assertive", "emoji": "", "consequence": "Lo spingi a riflettere.", "betterAlternative": "", "nextScenarioId": "scen-family-emozioni-2"}
], True)
add_scenario("scen-family-emozioni-2", "Sempre il Solito", "Aggiunge il carico da novanta con un etichetta pesante.",
[{"speaker": "Papà", "text": "Sei proprio pesante certe volte... sempre il solito tu."}],
"/assets/backgrounds/bg_home.jpg", "/assets/characters/parent.jpg", "Papà", [
{"id": "c10-4", "text": "Urli 'Ti odio!'", "type": "impulsive", "emoji": "", "consequence": "Esplosione inutile.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c10-5", "text": "Inizi a disprezzarti.", "type": "passive", "emoji": "", "consequence": "Danneggia l'autostima profondamente.", "betterAlternative": "Respingi l'etichetta.", "nextScenarioId": None},
{"id": "c10-6", "text": "'Essere sensibile non significa essere pesante.'", "type": "assertive", "emoji": "", "consequence": "Reazione perfetta e matura.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 11: L'Attesa Infinita (Fila, pazienza)
add_scenario("scen-anger-attesa-1", "L'Attesa Infinita", "Devi aspettare il tuo turno alle poste, la fila è lunghissima e perdi la pazienza.",
[{"speaker": "Pensiero", "text": "Non ce la faccio più, sto esplodendo! Devo muovermi!"}],
"/assets/backgrounds/bg_street.jpg", "/assets/characters/stranger.jpg", "Pensiero", [
{"id": "c11-1", "text": "Spintoni la gente urlando di sbrigarsi.", "type": "impulsive", "emoji": "", "consequence": "Caos e intervento sicurezza.", "betterAlternative": "", "nextScenarioId": "scen-anger-attesa-2", "isCriticalFailure": True},
{"id": "c11-2", "text": "Rimani lì fremendo e digrignando i denti fino a star male.", "type": "passive", "emoji": "", "consequence": "Picco di cortisolo e stress.", "betterAlternative": "Trova un modo per distrarti.", "nextScenarioId": "scen-anger-attesa-2"},
{"id": "c11-3", "text": "Metti le cuffie con musica rilassante per passare il tempo.", "type": "assertive", "emoji": "", "consequence": "Gestisci egregiamente l'impulsività.", "betterAlternative": "", "nextScenarioId": "scen-anger-attesa-2"}
], True)
add_scenario("scen-anger-attesa-2", "Disturbo Esterno", "Qualcuno ti chiede una cosa sciocca proprio mentre sei al limite.",
[{"speaker": "Signora", "text": "Scusa, sai a che ora chiudono?"}],
"/assets/backgrounds/bg_street.jpg", "/assets/characters/stranger.jpg", "Signora", [
{"id": "c11-4", "text": "Le urli 'Che ne so io, vecchia!'", "type": "impulsive", "emoji": "", "consequence": "Sei maleducato senza motivo.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c11-5", "text": "Fai finta di non sentirla e guardi altrove.", "type": "passive", "emoji": "", "consequence": "Sembri molto maleducato.", "betterAlternative": "Rispondi brevemente.", "nextScenarioId": None},
{"id": "c11-6", "text": "'Mi scusi, non lo so proprio.' (Con gentilezza)", "type": "assertive", "emoji": "", "consequence": "Ottimo controllo.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 12: La Partita Decisiva (Competizione)
add_scenario("scen-anger-partita-1", "La Partita Decisiva", "Perdi malamente una partita a cui tenevi tanto.",
[{"speaker": "Pensiero", "text": "Ho sbagliato il tiro finale... è tutta colpa mia!"}],
"/assets/backgrounds/bg_park.jpg", "/assets/characters/friend.jpg", "Pensiero", [
{"id": "c12-1", "text": "Lanci via il pallone oltre il recinto per rabbia.", "type": "impulsive", "emoji": "", "consequence": "Rovini il gioco a tutti.", "betterAlternative": "", "nextScenarioId": "scen-anger-partita-2", "isCriticalFailure": True},
{"id": "c12-2", "text": "Ti siedi in un angolo a sentirti un perdente nato.", "type": "passive", "emoji": "", "consequence": "Auto-sabotaggio.", "betterAlternative": "Accetta la sconfitta.", "nextScenarioId": "scen-anger-partita-2"},
{"id": "c12-3", "text": "Fai un respiro profondo e vai a stringere la mano ai vincitori.", "type": "assertive", "emoji": "", "consequence": "Vero spirito sportivo.", "betterAlternative": "", "nextScenarioId": "scen-anger-partita-2"}
], True)
add_scenario("scen-anger-partita-2", "Provocazioni", "Un avversario ti provoca intenzionalmente per farti esplodere.",
[{"speaker": "Avversario", "text": "Eri davvero imbarazzante oggi, quasi facevi tenerezza."}],
"/assets/backgrounds/bg_park.jpg", "/assets/characters/bully.jpg", "Avversario", [
{"id": "c12-4", "text": "Gli salti addosso.", "type": "impulsive", "emoji": "", "consequence": "Folle.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c12-5", "text": "Abbassi lo sguardo e gli dai ragione mentalmente.", "type": "passive", "emoji": "", "consequence": "Ti fai ferire.", "betterAlternative": "Ignoralo.", "nextScenarioId": None},
{"id": "c12-6", "text": "Sorridi: 'Si vince e si perde. Bella partita.' e te ne vai.", "type": "assertive", "emoji": "", "consequence": "Lo disarmi completamente.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 13: Oltre il Limite (Colpire, Rompere)
add_scenario("scen-anger-limite-1", "Oltre il Limite", "Durante un aspro litigio hai fortissima voglia di colpire qualcosa o qualcuno.",
[{"speaker": "Amico", "text": "Non sai fare niente di buono, sei un disastro!"}],
"/assets/backgrounds/bg_bus.jpg", "/assets/characters/bully.jpg", "Amico", [
{"id": "c13-1", "text": "Gli molli un pugno sul viso.", "type": "impulsive", "emoji": "", "consequence": "Violenza fisica grave.", "betterAlternative": "", "nextScenarioId": "scen-anger-limite-2", "isCriticalFailure": True},
{"id": "c13-2", "text": "Ti tieni tutto dentro ma inizi a tremare.", "type": "passive", "emoji": "", "consequence": "Stai fisicamente male per la tensione.", "betterAlternative": "Allontanati subito.", "nextScenarioId": "scen-anger-limite-2"},
{"id": "c13-3", "text": "'Sono troppo arrabbiato ora, devo andarmene.' Ti giri e te ne vai.", "type": "assertive", "emoji": "", "consequence": "Salvi la situazione allontanandoti.", "betterAlternative": "", "nextScenarioId": "scen-anger-limite-2"}
], True)
add_scenario("scen-anger-limite-2", "La Rottura", "Una volta solo, la rabbia è ancora alta. C'è un oggetto di vetro vicino a te.",
[{"speaker": "Pensiero", "text": "Se rompo qualcosa magari questa rabbia uscirà..."}],
"/assets/backgrounds/bg_bedroom.jpg", "/assets/characters/student.jpg", "Pensiero", [
{"id": "c13-4", "text": "Prendi il bicchiere e lo schianti a terra.", "type": "impulsive", "emoji": "", "consequence": "Rompi l'oggetto e rischi di ferirti.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c13-5", "text": "Ti sdrai per terra fissando il soffitto paralizzato.", "type": "passive", "emoji": "", "consequence": "L'energia non viene scaricata.", "betterAlternative": "Sfoga la rabbia in modo sano.", "nextScenarioId": None},
{"id": "c13-6", "text": "Stringi fortissimo un cuscino e lo tiri sul letto.", "type": "assertive", "emoji": "", "consequence": "Sfoghi la fisicità senza danni.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 14: La Parola Sbagliata (Figuracce, Battute)
add_scenario("scen-social-parola-1", "La Parola Sbagliata", "In classe fai una figuraccia pronunciando una parola molto imbarazzante per sbaglio.",
[{"speaker": "Classe", "text": "Ahahahahah! Cos'ha appena detto?!"}],
"/assets/backgrounds/bg_classroom.jpg", "/assets/characters/teacher.jpg", "Classe", [
{"id": "c14-1", "text": "Scagli un libro in aria urlando 'Zitti!'.", "type": "impulsive", "emoji": "", "consequence": "Aggravi pesantemente la situazione.", "betterAlternative": "", "nextScenarioId": "scen-social-parola-2", "isCriticalFailure": True},
{"id": "c14-2", "text": "Nascondi la faccia tra le braccia, piangendo.", "type": "passive", "emoji": "", "consequence": "Provi enorme vergogna prolungata.", "betterAlternative": "Usa l'ironia.", "nextScenarioId": "scen-social-parola-2"},
{"id": "c14-3", "text": "Ridi tu stesso: 'Okay, questa è uscita proprio male!'", "type": "assertive", "emoji": "", "consequence": "Disinneschi l'imbarazzo con l'autoironia.", "betterAlternative": "", "nextScenarioId": "scen-social-parola-2"}
], True)
add_scenario("scen-social-parola-2", "La Battuta di Ritorno", "Subito dopo qualcuno rincara la dose con una battuta che ti ferisce.",
[{"speaker": "Compagno", "text": "Beh non mi sorprende, sei un po' speciale tu, eh?"}],
"/assets/backgrounds/bg_classroom.jpg", "/assets/characters/bully.jpg", "Compagno", [
{"id": "c14-4", "text": "Ti alzi e gli tiri un pugno.", "type": "impulsive", "emoji": "", "consequence": "Violenza ingiustificabile.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c14-5", "text": "Fai finta di non sentire.", "type": "passive", "emoji": "", "consequence": "Rimani con la ferita dentro.", "betterAlternative": "Mettilo al suo posto a parole.", "nextScenarioId": None},
{"id": "c14-6", "text": "'Questo commento è inopportuno e maleducato.'", "type": "assertive", "emoji": "", "consequence": "Fai valere il tuo rispetto.", "betterAlternative": "", "nextScenarioId": None}
], False)

# CHAP 15: Il No Insopportabile (Frustrazione, stanchezza)
add_scenario("scen-frust-no-1", "Il No Insopportabile", "Ricevi un secco 'NO' per qualcosa a cui tenevi moltissimo (una gita).",
[{"speaker": "Mamma", "text": "No, non ci vai, costa troppo e tu non lo meriti in questo periodo."}],
"/assets/backgrounds/bg_kitchen.jpg", "/assets/characters/parent.jpg", "Mamma", [
{"id": "c15-1", "text": "Butti tutto all'aria e scappi di casa.", "type": "impulsive", "emoji": "", "consequence": "Reazione gravissima.", "betterAlternative": "", "nextScenarioId": "scen-frust-no-2", "isCriticalFailure": True},
{"id": "c15-2", "text": "Piangi da solo rinunciando immediatamente.", "type": "passive", "emoji": "", "consequence": "Nessuna negoziazione, solo tristezza.", "betterAlternative": "Chiedi il perché con calma.", "nextScenarioId": "scen-frust-no-2"},
{"id": "c15-3", "text": "'Ci tengo davvero tanto. C'è un modo per guadagnarmelo?'", "type": "assertive", "emoji": "", "consequence": "Apri una porta alla negoziazione adulta.", "betterAlternative": "", "nextScenarioId": "scen-frust-no-2"}
], True)
add_scenario("scen-frust-no-2", "Stanchi Morti", "La sera stessa sei stanco morto ma ti chiedono ancora attenzione o lavori da fare.",
[{"speaker": "Papà", "text": "Vai a buttare la spazzatura e sistema il garage, muoviti."}],
"/assets/backgrounds/bg_kitchen.jpg", "/assets/characters/parent.jpg", "Papà", [
{"id": "c15-4", "text": "Lanci il secchio dell'immondizia addosso a lui.", "type": "impulsive", "emoji": "", "consequence": "Incredibilmente grave.", "betterAlternative": "", "nextScenarioId": None, "isCriticalFailure": True},
{"id": "c15-5", "text": "Fai tutto trascinandoti e odiando la tua vita.", "type": "passive", "emoji": "", "consequence": "Zero confini personali.", "betterAlternative": "Spiega la stanchezza.", "nextScenarioId": None},
{"id": "c15-6", "text": "'Papà, sono esausto oggi. Prometto che butto la spazzatura, ma il garage lo faccio domani.'", "type": "assertive", "emoji": "", "consequence": "Stile maturo di negoziazione.", "betterAlternative": "", "nextScenarioId": None}
], False)

# generate TS file
ts_code = f"""import type {{ Scenario }} from '../types';

export const INITIAL_SCENARIOS: Record<string, Scenario> = {json.dumps(scenarios, indent=2)};
"""
with open('src/data/scenarios.ts', 'w') as f:
    f.write(ts_code)

print("Created src/data/scenarios.ts with 15 chapters")
