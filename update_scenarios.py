import re

app_path = '/Users/leonardo/adhd-laura/progetto-adhd/src/App.tsx'
with open(app_path, 'r') as f:
    content = f.read()

new_scenarios = """const INITIAL_SCENARIOS: Record<string, Scenario> = {
  // ─── CAPITOLO 1: SCUOLA ───
  'scen-school-1': {
    id: 'scen-school-1',
    title: 'Tra i Banchi (Inizio)',
    description: 'Il compagno di banco prende il tuo quaderno.',
    dialogue: [
      { speaker: 'Narratore', text: 'È lunedì mattina. Entri in classe un po\\' assonnato.' },
      { speaker: 'Luca', text: 'Ehi! Guardate cosa ho trovato!' },
      { speaker: 'Narratore', text: 'Il tuo compagno di banco, Luca, ha preso il tuo quaderno degli appunti e lo sventola ridendo.' }
    ],
    background: '/assets/backgrounds/bg_classroom.jpg',
    character: '/assets/characters/char_friend.jpg',
    characterName: 'Luca',
    choices: [
      { id: 'c1-1', text: 'Gli strappi il quaderno dalle mani e lo spingi!', type: 'impulsive', emoji: '', consequence: 'Luca cade. Il professore entra e ti guarda male.', betterAlternative: 'Chiedi a Luca con calma di restituirti il quaderno.', nextScenarioId: 'scen-school-2-bad' },
      { id: 'c1-2', text: 'Ti siedi al banco senza dire nulla e aspetti...', type: 'passive', emoji: '', consequence: 'Luca non ti restituisce il quaderno. Il professore ti vede senza materiale.', betterAlternative: 'Dì a Luca che ti serve il quaderno.', nextScenarioId: 'scen-school-2-bad' },
      { id: 'c1-3', text: '"Dai Luca, ridammelo che mi serve per la lezione!"', type: 'assertive', emoji: '', consequence: 'Luca ride e te lo restituisce.', betterAlternative: '', nextScenarioId: 'scen-school-2-good' },
      { id: 'c1-4', text: 'Urli "MAESTRO LUCA MI HA RUBATO IL QUADERNO!"', type: 'impulsive', emoji: '', consequence: 'Tutti ridono di te. Il maestro si arrabbia per le urla.', betterAlternative: 'Risolvi da solo con calma.', nextScenarioId: 'scen-school-2-bad' },
      { id: 'c1-5', text: 'Inizi a piangere silenziosamente al banco.', type: 'passive', emoji: '', consequence: 'Luca si sente in colpa ma la situazione è imbarazzante.', betterAlternative: 'Sii assertivo e chiedi il quaderno.', nextScenarioId: 'scen-school-2-bad' },
      { id: 'c1-6', text: '"Luca, per favore, il prof sta arrivando."', type: 'assertive', emoji: '', consequence: 'Luca si spaventa e te lo ridà subito.', betterAlternative: '', nextScenarioId: 'scen-school-2-good' }
    ],
    isStartingNode: true,
  },
  'scen-school-2-bad': {
    id: 'scen-school-2-bad',
    title: 'Tra i Banchi (Sgridata)',
    description: 'Il professore interviene.',
    dialogue: [
      { speaker: 'Prof. Rossi', text: 'Cosa sta succedendo qui?! Perché non siete pronti?' },
      { speaker: 'Narratore', text: 'Il professore sembra molto infastidito.' }
    ],
    background: '/assets/backgrounds/bg_classroom.jpg',
    character: '/assets/characters/char_teacher.jpg',
    characterName: 'Prof. Rossi',
    choices: [
      { id: 'c2b-1', text: 'Urli: "È tutta colpa di Luca!"', type: 'impulsive', emoji: '', consequence: 'Nota sul registro per aver urlato.', betterAlternative: 'Spiega con calma.', nextScenarioId: 'scen-school-3' },
      { id: 'c2b-2', text: 'Abbassi lo sguardo e non dici nulla.', type: 'passive', emoji: '', consequence: 'Rimproverato ingiustamente.', betterAlternative: 'Spiega la situazione.', nextScenarioId: 'scen-school-3' },
      { id: 'c2b-3', text: '"Mi scusi prof, un malinteso. Ora siamo pronti."', type: 'assertive', emoji: '', consequence: 'Il prof apprezza la sincerità.', betterAlternative: '', nextScenarioId: 'scen-school-3' },
      { id: 'c2b-4', text: 'Esci dalla classe sbattendo la porta.', type: 'impulsive', emoji: '', consequence: 'Il preside ti convoca in ufficio.', betterAlternative: 'Resta e affronta la situazione.', nextScenarioId: 'scen-school-3' },
      { id: 'c2b-5', text: 'Incolpi qualcun altro a caso.', type: 'impulsive', emoji: '', consequence: 'Tutti si arrabbiano con te.', betterAlternative: 'Sii onesto.', nextScenarioId: 'scen-school-3' },
      { id: 'c2b-6', text: '"Abbiamo avuto un piccolo problema col materiale, scusi."', type: 'assertive', emoji: '', consequence: 'Il prof annuisce e inizia.', betterAlternative: '', nextScenarioId: 'scen-school-3' }
    ],
    isStartingNode: false,
  },
  'scen-school-2-good': {
    id: 'scen-school-2-good',
    title: 'Tra i Banchi (Lezione)',
    description: 'La lezione inizia.',
    dialogue: [
      { speaker: 'Prof. Rossi', text: 'Bravi ragazzi, vedo che siete già pronti. Chi vuole interrogarsi?' }
    ],
    background: '/assets/backgrounds/bg_classroom.jpg',
    character: '/assets/characters/char_teacher.jpg',
    characterName: 'Prof. Rossi',
    choices: [
      { id: 'c2g-1', text: '"Io non ho studiato niente!" (Sbuffando)', type: 'impulsive', emoji: '', consequence: 'Il prof ti guarda deluso.', betterAlternative: 'Non serviva aggredire.', nextScenarioId: 'scen-school-3' },
      { id: 'c2g-2', text: 'Ti nascondi dietro il compagno.', type: 'passive', emoji: '', consequence: 'Il prof non ti chiama, ma hai ansia.', betterAlternative: 'Resta tranquillo.', nextScenarioId: 'scen-school-3' },
      { id: 'c2g-3', text: 'Resti calmo al tuo posto.', type: 'assertive', emoji: '', consequence: 'Il prof interroga un altro.', betterAlternative: '', nextScenarioId: 'scen-school-3' },
      { id: 'c2g-4', text: 'Lanci una pallina di carta.', type: 'impulsive', emoji: '', consequence: 'Vieni subito sgridato.', betterAlternative: 'Segui la lezione.', nextScenarioId: 'scen-school-3' },
      { id: 'c2g-5', text: 'Fai finta di stare male.', type: 'passive', emoji: '', consequence: 'Ti mandano in infermeria per niente.', betterAlternative: 'Affronta la giornata.', nextScenarioId: 'scen-school-3' },
      { id: 'c2g-6', text: '"Prof, io preferirei la prossima volta."', type: 'assertive', emoji: '', consequence: 'Il prof apprezza l\\'onestà.', betterAlternative: '', nextScenarioId: 'scen-school-3' }
    ],
    isStartingNode: false,
  },
  'scen-school-3': {
    id: 'scen-school-3',
    title: 'Tra i Banchi (Ricreazione)',
    description: 'Pausa ricreazione nel corridoio.',
    dialogue: [
      { speaker: 'Narratore', text: 'Nel corridoio per la ricreazione, incontri il bullo della scuola.' },
      { speaker: 'Bullo', text: 'Dammi la tua merenda, sfigato!' }
    ],
    background: '/assets/backgrounds/bg_hallway.jpg',
    character: '/assets/characters/char_bully.jpg',
    characterName: 'Bullo',
    choices: [
      { id: 'c3-1', text: 'Gli tiri un pugno.', type: 'impulsive', emoji: '', consequence: 'Sospensione immediata.', betterAlternative: 'Cerca aiuto.', nextScenarioId: null },
      { id: 'c3-2', text: 'Gli dai la merenda tremando.', type: 'passive', emoji: '', consequence: 'Rimani senza cibo e triste.', betterAlternative: 'Chiedi aiuto a un prof.', nextScenarioId: null },
      { id: 'c3-3', text: '"No, è mia. Lasciami in pace."', type: 'assertive', emoji: '', consequence: 'Lui sbuffa e se ne va.', betterAlternative: '', nextScenarioId: null },
      { id: 'c3-4', text: 'Gli tiri la merenda in faccia.', type: 'impulsive', emoji: '', consequence: 'Finisci in rissa.', betterAlternative: 'Allontanati.', nextScenarioId: null },
      { id: 'c3-5', text: 'Scappi via piangendo.', type: 'passive', emoji: '', consequence: 'Lui ride di te con i suoi amici.', betterAlternative: 'Resta fermo o cerca un prof.', nextScenarioId: null },
      { id: 'c3-6', text: 'Ti giri e vai verso la sala professori.', type: 'assertive', emoji: '', consequence: 'Lui non ti segue per paura.', betterAlternative: '', nextScenarioId: null }
    ],
    isStartingNode: false,
  },

  // ─── CAPITOLO 2: PARCO ───
  'scen-park-1': {
    id: 'scen-park-1',
    title: 'Sotto il Sole (Inizio)',
    description: 'Decidete a cosa giocare.',
    dialogue: [
      { speaker: 'Narratore', text: 'Dopo scuola vai al parco.' },
      { speaker: 'Marco', text: 'Facciamo le squadre! Calcio!' },
      { speaker: 'Pensiero', text: 'Ma avevamo detto basket...' }
    ],
    background: '/assets/backgrounds/bg_park.jpg',
    character: '/assets/characters/char_friend.jpg',
    characterName: 'Marco',
    choices: [
      { id: 'p1-1', text: 'Calci via il pallone.', type: 'impulsive', emoji: '', consequence: 'Ti escludono.', betterAlternative: 'Proponi un compromesso.', nextScenarioId: 'scen-park-2-alone' },
      { id: 'p1-2', text: 'Giochi a calcio controvoglia.', type: 'passive', emoji: '', consequence: 'Sei di pessimo umore.', betterAlternative: 'Dì la tua.', nextScenarioId: 'scen-park-2-playing' },
      { id: 'p1-3', text: '"Facciamo calcio e poi basket?"', type: 'assertive', emoji: '', consequence: 'Accettano il compromesso.', betterAlternative: '', nextScenarioId: 'scen-park-2-playing' },
      { id: 'p1-4', text: 'Insulti chi vuole giocare a calcio.', type: 'impulsive', emoji: '', consequence: 'Nessuno vuole giocare con te.', betterAlternative: 'Sii gentile.', nextScenarioId: 'scen-park-2-alone' },
      { id: 'p1-5', text: 'Ti siedi da solo senza dire niente.', type: 'passive', emoji: '', consequence: 'Ti ignorano.', betterAlternative: 'Partecipa.', nextScenarioId: 'scen-park-2-alone' },
      { id: 'p1-6', text: '"Io vado al campetto da basket, chi viene?"', type: 'assertive', emoji: '', consequence: 'Alcuni vengono con te.', betterAlternative: '', nextScenarioId: 'scen-park-2-playing' }
    ],
    isStartingNode: true,
  },
  'scen-park-2-alone': {
    id: 'scen-park-2-alone',
    title: 'Sotto il Sole (Solitudine)',
    description: 'Sei seduto in panchina.',
    dialogue: [
      { speaker: 'Marco', text: 'Vuoi unirti o resti lì a fare il muso?' }
    ],
    background: '/assets/backgrounds/bg_park.jpg',
    character: '/assets/characters/char_friend.jpg',
    characterName: 'Marco',
    choices: [
      { id: 'p2a-1', text: '"Siete stupidi!" e te ne vai.', type: 'impulsive', emoji: '', consequence: 'Perdi gli amici.', betterAlternative: 'Unisciti a loro.', nextScenarioId: 'scen-park-3' },
      { id: 'p2a-2', text: 'Guardare a terra.', type: 'passive', emoji: '', consequence: 'Resti triste.', betterAlternative: 'Rispondi.', nextScenarioId: 'scen-park-3' },
      { id: 'p2a-3', text: '"Scusa per prima, gioco!"', type: 'assertive', emoji: '', consequence: 'Ti unisci e ti diverti.', betterAlternative: '', nextScenarioId: 'scen-park-3' },
      { id: 'p2a-4', text: 'Gli tiri un sasso.', type: 'impulsive', emoji: '', consequence: 'Litigate.', betterAlternative: 'Usa le parole.', nextScenarioId: 'scen-park-3' },
      { id: 'p2a-5', text: 'Scuoti la testa e resti zitto.', type: 'passive', emoji: '', consequence: 'Ti lasciano perdere.', betterAlternative: 'Parla.', nextScenarioId: 'scen-park-3' },
      { id: 'p2a-6', text: '"Arrivo subito!"', type: 'assertive', emoji: '', consequence: 'Entri nel gruppo.', betterAlternative: '', nextScenarioId: 'scen-park-3' }
    ],
    isStartingNode: false,
  },
  'scen-park-2-playing': {
    id: 'scen-park-2-playing',
    title: 'Sotto il Sole (In Gioco)',
    description: 'Sgambetto durante la partita.',
    dialogue: [
      { speaker: 'Narratore', text: 'Marco ti fa uno sgambetto per sbaglio.' },
      { speaker: 'Marco', text: 'Ops, scusa non l\\'ho fatto apposta!' }
    ],
    background: '/assets/backgrounds/bg_park.jpg',
    character: '/assets/characters/char_friend.jpg',
    characterName: 'Marco',
    choices: [
      { id: 'p2p-1', text: 'Lo spingi.', type: 'impulsive', emoji: '', consequence: 'Rissa.', betterAlternative: 'Accetta le scuse.', nextScenarioId: 'scen-park-3' },
      { id: 'p2p-2', text: 'Trattieni le lacrime zitto.', type: 'passive', emoji: '', consequence: 'Nessuno capisce se fa male.', betterAlternative: 'Parla.', nextScenarioId: 'scen-park-3' },
      { id: 'p2p-3', text: '"Tranquillo, fa un po\\' male ma ok."', type: 'assertive', emoji: '', consequence: 'Continuate a giocare.', betterAlternative: '', nextScenarioId: 'scen-park-3' },
      { id: 'p2p-4', text: '"Lo hai fatto apposta!"', type: 'impulsive', emoji: '', consequence: 'Crei tensione.', betterAlternative: 'Credigli.', nextScenarioId: 'scen-park-3' },
      { id: 'p2p-5', text: 'Smetti di giocare e te ne vai.', type: 'passive', emoji: '', consequence: 'Rovini la tua giornata.', betterAlternative: 'Riposati e torna.', nextScenarioId: 'scen-park-3' },
      { id: 'p2p-6', text: '"Tutto ok, andiamo avanti."', type: 'assertive', emoji: '', consequence: 'Partita salvata.', betterAlternative: '', nextScenarioId: 'scen-park-3' }
    ],
    isStartingNode: false,
  },
  'scen-park-3': {
    id: 'scen-park-3',
    title: 'Sotto il Sole (Ritorno)',
    description: 'Ora di tornare.',
    dialogue: [
      { speaker: 'Marco', text: 'Io vado, ci vediamo domani!' }
    ],
    background: '/assets/backgrounds/bg_park.jpg',
    character: '/assets/characters/char_friend.jpg',
    characterName: 'Marco',
    choices: [
      { id: 'p3-1', text: '"No! Gioco ancora!"', type: 'impulsive', emoji: '', consequence: 'Resti al buio e ti sgridano.', betterAlternative: 'Vai a casa.', nextScenarioId: null },
      { id: 'p3-2', text: 'Te ne vai senza salutare.', type: 'passive', emoji: '', consequence: 'Sembra che tu sia arrabbiato.', betterAlternative: 'Saluta.', nextScenarioId: null },
      { id: 'p3-3', text: '"Ciao, a domani!"', type: 'assertive', emoji: '', consequence: 'Torni sereno.', betterAlternative: '', nextScenarioId: null },
      { id: 'p3-4', text: 'Getti a terra le tue cose arrabbiato.', type: 'impulsive', emoji: '', consequence: 'Sembri un bambino piccolo.', betterAlternative: 'Accetta la fine.', nextScenarioId: null },
      { id: 'p3-5', text: 'Nascondi il suo zaino.', type: 'impulsive', emoji: '', consequence: 'Lui si arrabbia molto.', betterAlternative: 'Rispetta gli altri.', nextScenarioId: null },
      { id: 'p3-6', text: '"Anch\\'io vado, facciamo la strada insieme?"', type: 'assertive', emoji: '', consequence: 'Chiacchierate tornando.', betterAlternative: '', nextScenarioId: null }
    ],
    isStartingNode: false,
  },

  // ─── CAPITOLO 3: BUS E SUPERMERCATO ───
  'scen-bus-1': {
    id: 'scen-bus-1',
    title: 'Rumore e Caos (L\\'Autobus)',
    description: 'Musica alta nel bus.',
    dialogue: [
      { speaker: 'Sconosciuto', text: '(Musica trap a tutto volume dal telefono)' }
    ],
    background: '/assets/backgrounds/bg_bus.jpg',
    character: '/assets/characters/char_stranger.jpg',
    characterName: 'Sconosciuto',
    choices: [
      { id: 'b1-1', text: 'Gli strappi il telefono.', type: 'impulsive', emoji: '', consequence: 'L\\'autista vi sgrida.', betterAlternative: 'Chiedi di abbassare.', nextScenarioId: 'scen-bus-2' },
      { id: 'b1-2', text: 'Sopporti in silenzio.', type: 'passive', emoji: '', consequence: 'Mal di testa forte.', betterAlternative: 'Fai notare il fastidio.', nextScenarioId: 'scen-bus-2' },
      { id: 'b1-3', text: '"Scusa, abbassi un po\\'?"', type: 'assertive', emoji: '', consequence: 'Lui abbassa.', betterAlternative: '', nextScenarioId: 'scen-bus-2' },
      { id: 'b1-4', text: 'Metti anche tu musica fortissima.', type: 'impulsive', emoji: '', consequence: 'L\\'intero bus vi odia.', betterAlternative: 'Sii la persona matura.', nextScenarioId: 'scen-bus-2' },
      { id: 'b1-5', text: 'Scendi fermate prima.', type: 'passive', emoji: '', consequence: 'Devi camminare tantissimo.', betterAlternative: 'Resta a bordo.', nextScenarioId: 'scen-bus-2' },
      { id: 'b1-6', text: 'Chiedi gentilmente all\\'autista di intervenire.', type: 'assertive', emoji: '', consequence: 'L\\'autista lo richiama.', betterAlternative: '', nextScenarioId: 'scen-bus-2' }
    ],
    isStartingNode: true,
  },
  'scen-bus-2': {
    id: 'scen-bus-2',
    title: 'Rumore e Caos (La Folla)',
    description: 'Folla in strada.',
    dialogue: [
      { speaker: 'Sconosciuto', text: 'Attento ragazzino!' },
      { speaker: 'Narratore', text: 'Una signora ti urta.' }
    ],
    background: '/assets/backgrounds/bg_street.jpg',
    character: '/assets/characters/char_stranger.jpg',
    characterName: 'Signora',
    choices: [
      { id: 'b2-1', text: 'La spingi.', type: 'impulsive', emoji: '', consequence: 'Sembri maleducato tu.', betterAlternative: 'Calmati.', nextScenarioId: 'scen-bus-3' },
      { id: 'b2-2', text: 'Ti sposti zitto.', type: 'passive', emoji: '', consequence: 'Resti amareggiato.', betterAlternative: 'Fatti rispettare.', nextScenarioId: 'scen-bus-3' },
      { id: 'b2-3', text: '"Mi scusi, mi ha fatto male."', type: 'assertive', emoji: '', consequence: 'Lei chiede scusa.', betterAlternative: '', nextScenarioId: 'scen-bus-3' },
      { id: 'b2-4', text: 'Urli "Ma sei cieca?!"', type: 'impulsive', emoji: '', consequence: 'Si crea una scenata inutile.', betterAlternative: 'Non urlare.', nextScenarioId: 'scen-bus-3' },
      { id: 'b2-5', text: 'Inizi a piangere in strada.', type: 'passive', emoji: '', consequence: 'La gente ti fissa stranita.', betterAlternative: 'Usa le parole.', nextScenarioId: 'scen-bus-3' },
      { id: 'b2-6', text: '"Attenzione per favore."', type: 'assertive', emoji: '', consequence: 'La signora sta più attenta.', betterAlternative: '', nextScenarioId: 'scen-bus-3' }
    ],
    isStartingNode: false,
  },
  'scen-bus-3': {
    id: 'scen-bus-3',
    title: 'Rumore e Caos (Fine)',
    description: 'Cammini verso casa.',
    dialogue: [
      { speaker: 'Pensiero', text: 'Che fatica. Voglio riposare.' }
    ],
    background: '/assets/backgrounds/bg_street.jpg',
    character: '/assets/characters/char_stranger.jpg',
    characterName: 'Sconosciuto',
    choices: [
      { id: 'b3-1', text: 'Corri arrabbiato.', type: 'impulsive', emoji: '', consequence: 'Rischi di cadere.', betterAlternative: 'Cammina.', nextScenarioId: null },
      { id: 'b3-2', text: 'Trascini i piedi.', type: 'passive', emoji: '', consequence: 'Non finisce mai.', betterAlternative: 'Tieni la testa alta.', nextScenarioId: null },
      { id: 'b3-3', text: 'Cammini con calma.', type: 'assertive', emoji: '', consequence: 'Arrivi pronto per riposare.', betterAlternative: '', nextScenarioId: null },
      { id: 'b3-4', text: 'Tiri calci ai sassi con rabbia.', type: 'impulsive', emoji: '', consequence: 'Ti rovini le scarpe.', betterAlternative: 'Respira.', nextScenarioId: null },
      { id: 'b3-5', text: 'Ti siedi per strada stanchissimo.', type: 'passive', emoji: '', consequence: 'Arrivi a casa tardissimo.', betterAlternative: 'Continua piano.', nextScenarioId: null },
      { id: 'b3-6', text: 'Fai un respiro profondo e avanzi.', type: 'assertive', emoji: '', consequence: 'Ti rilassi lungo la via.', betterAlternative: '', nextScenarioId: null }
    ],
    isStartingNode: false,
  },

  // ─── CAPITOLO 4: A CASA ───
  'scen-home-1': {
    id: 'scen-home-1',
    title: 'Rifugio Silenzioso (Cucina)',
    description: 'La mamma ti chiede di fare i compiti.',
    dialogue: [
      { speaker: 'Mamma', text: 'I compiti li hai già fatti?' }
    ],
    background: '/assets/backgrounds/bg_kitchen.jpg',
    character: '/assets/characters/char_parent.jpg',
    characterName: 'Mamma',
    choices: [
      { id: 'h1-1', text: '"Basta! Mi lasci in pace?"', type: 'impulsive', emoji: '', consequence: 'Ti toglie internet.', betterAlternative: 'Spiega che sei stanco.', nextScenarioId: 'scen-home-2' },
      { id: 'h1-2', text: 'Vai a farli tristemente.', type: 'passive', emoji: '', consequence: 'Non riesci a concentrarti.', betterAlternative: 'Chiedi una pausa.', nextScenarioId: 'scen-home-2' },
      { id: 'h1-3', text: '"Sono stanco, riposo 20 minuti poi li faccio?"', type: 'assertive', emoji: '', consequence: 'Accetta.', betterAlternative: '', nextScenarioId: 'scen-home-2' },
      { id: 'h1-4', text: 'Sbatti un piatto sul tavolo.', type: 'impulsive', emoji: '', consequence: 'Vieni messo in castigo.', betterAlternative: 'Usa la voce.', nextScenarioId: 'scen-home-2' },
      { id: 'h1-5', text: 'Non rispondi.', type: 'passive', emoji: '', consequence: 'Lei insiste.', betterAlternative: 'Rispondi.', nextScenarioId: 'scen-home-2' },
      { id: 'h1-6', text: '"Facciamo un patto: prima merenda, poi compiti!"', type: 'assertive', emoji: '', consequence: 'Sembra un\\'ottima idea.', betterAlternative: '', nextScenarioId: 'scen-home-2' }
    ],
    isStartingNode: true,
  },
  'scen-home-2': {
    id: 'scen-home-2',
    title: 'Rifugio Silenzioso (Camera)',
    description: 'I compiti difficili.',
    dialogue: [
      { speaker: 'Pensiero', text: 'Non riesco a risolverlo, non capisco niente!' }
    ],
    background: '/assets/backgrounds/bg_bedroom.jpg',
    character: '/assets/characters/char_parent.jpg',
    characterName: 'Mamma',
    choices: [
      { id: 'h2-1', text: 'Strappi la pagina.', type: 'impulsive', emoji: '', consequence: 'Devi ricopiare tutto.', betterAlternative: 'Chiedi aiuto.', nextScenarioId: 'scen-home-3' },
      { id: 'h2-2', text: 'Chiudi il libro arrendendoti.', type: 'passive', emoji: '', consequence: 'Brutto voto.', betterAlternative: 'Prova ancora o chiedi.', nextScenarioId: 'scen-home-3' },
      { id: 'h2-3', text: '"Mamma, mi aiuti a capire?"', type: 'assertive', emoji: '', consequence: 'Lo risolvete insieme.', betterAlternative: '', nextScenarioId: 'scen-home-3' },
      { id: 'h2-4', text: 'Scrivi parolacce sul quaderno.', type: 'impulsive', emoji: '', consequence: 'Il prof se ne accorge.', betterAlternative: 'Controllati.', nextScenarioId: 'scen-home-3' },
      { id: 'h2-5', text: 'Copi da internet senza capire.', type: 'passive', emoji: '', consequence: 'Non impari nulla.', betterAlternative: 'Fatti aiutare.', nextScenarioId: 'scen-home-3' },
      { id: 'h2-6', text: 'Chiami un compagno per farti spiegare.', type: 'assertive', emoji: '', consequence: 'Capisci l\\'esercizio e finisci.', betterAlternative: '', nextScenarioId: 'scen-home-3' }
    ],
    isStartingNode: false,
  },
  'scen-home-3': {
    id: 'scen-home-3',
    title: 'Rifugio Silenzioso (Sera)',
    description: 'È ora di dormire.',
    dialogue: [
      { speaker: 'Mamma', text: 'Lavati i denti e vai a letto.' }
    ],
    background: '/assets/backgrounds/bg_bedroom.jpg',
    character: '/assets/characters/char_parent.jpg',
    characterName: 'Mamma',
    choices: [
      { id: 'h3-1', text: '"No! Voglio stare alzato!"', type: 'impulsive', emoji: '', consequence: 'Litigate.', betterAlternative: 'Vai a dormire.', nextScenarioId: null },
      { id: 'h3-2', text: 'Vai a letto coi vestiti.', type: 'passive', emoji: '', consequence: 'Dormi male.', betterAlternative: 'Curati di te stesso.', nextScenarioId: null },
      { id: 'h3-3', text: '"Vado subito. Buonanotte!"', type: 'assertive', emoji: '', consequence: 'Ti addormenti sereno.', betterAlternative: '', nextScenarioId: null },
      { id: 'h3-4', text: 'Accendi la console di nascosto.', type: 'impulsive', emoji: '', consequence: 'Ti beccano e ti tolgono i giochi.', betterAlternative: 'Rispetta le regole.', nextScenarioId: null },
      { id: 'h3-5', text: 'Fai finta di dormire e poi usi il telefono.', type: 'passive', emoji: '', consequence: 'Domani sarai stanchissimo.', betterAlternative: 'Riposati davvero.', nextScenarioId: null },
      { id: 'h3-6', text: '"Leggo 10 minuti un fumetto e dormo, ok?"', type: 'assertive', emoji: '', consequence: 'Ti rilassi leggendo.', betterAlternative: '', nextScenarioId: null }
    ],
    isStartingNode: false,
  }
};"""

pattern = re.compile(r'const INITIAL_SCENARIOS: Record<string, Scenario> = \{.*?\n\};\n', re.DOTALL)
new_content = pattern.sub(new_scenarios + '\n', content)

with open(app_path, 'w') as f:
    f.write(new_content)

print("Scenarios updated successfully!")
