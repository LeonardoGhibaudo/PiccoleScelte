/**
 * ===================================================
 * App.tsx — Componente principale di "Piccole Scelte"
 * ===================================================
 * Gestisce la navigazione tra le viste (Menu, Dashboard,
 * ScenarioBuilder, Selezione Paziente, Simulatore, Flowchart).
 */
import { useState, useEffect } from 'react';
import type { Patient, Scenario, SessionResult } from './types';
import { MainMenu } from './components/MainMenu';
import { TherapistDashboard } from './components/therapist/TherapistDashboard';
import { PatientSelect } from './components/PatientSelect';
import { ScenarioSelect } from './components/game/ScenarioSelect';
import { PatientDetail } from './components/therapist/PatientDetail';
import { Settings } from './components/Settings';
import { Simulator } from './components/game/Simulator';
import { FlowchartEnd } from './components/game/FlowchartEnd';
import { ReflectionTest } from './components/game/ReflectionTest';
import { LoginScreen } from './components/LoginScreen';
import AudioManager from './utils/AudioManager';
import './App.css';

/* ===================================================================
 * SCENARI PRE-IMPOSTATI — Un albero narrativo stile visual novel
 * Ogni scenario ha sfondo, personaggio, dialogo e 3 scelte
 * con conseguenze e suggerimenti su "cosa sarebbe stato meglio".
 * =================================================================== */
const INITIAL_SCENARIOS: Record<string, Scenario> = {
  // ─── CAPITOLO 1: SCUOLA ───
  'scen-school-1': {
    id: 'scen-school-1',
    title: 'Tra i Banchi (Inizio)',
    description: 'Il compagno di banco prende il tuo quaderno.',
    dialogue: [
      { speaker: 'Narratore', text: 'È lunedì mattina. Entri in classe un po\' assonnato.' },
      { speaker: 'Luca', text: 'Ehi! Guardate cosa ho trovato!' },
      { speaker: 'Narratore', text: 'Il tuo compagno di banco, Luca, ha preso il tuo quaderno degli appunti e lo sventola ridendo.' }
    ],
    background: '/assets/backgrounds/bg_classroom.jpg',
    character: '/assets/characters/char_friend.jpg',
    characterName: 'Luca',
    choices: [
      { id: 'c1-1', text: 'Gli strappi il quaderno dalle mani e lo spingi!', type: 'impulsive', emoji: '', consequence: 'Luca cade. Il professore entra e ti guarda male.', betterAlternative: 'Chiedi a Luca con calma di restituirti il quaderno.', nextScenarioId: 'scen-school-2-bad', isCriticalFailure: true },
      { id: 'c1-2', text: 'Ti siedi al banco senza dire nulla e aspetti...', type: 'passive', emoji: '', consequence: 'Luca non ti restituisce il quaderno. Il professore ti vede senza materiale.', betterAlternative: 'Dì a Luca che ti serve il quaderno.', nextScenarioId: 'scen-school-2-bad' },
      { id: 'c1-3', text: '"Dai Luca, ridammelo che mi serve per la lezione!"', type: 'assertive', emoji: '', consequence: 'Luca ride e te lo restituisce.', betterAlternative: '', nextScenarioId: 'scen-school-2-good' }
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
      { id: 'c2b-3', text: '"Mi scusi prof, un malinteso. Ora siamo pronti."', type: 'assertive', emoji: '', consequence: 'Il prof apprezza la sincerità.', betterAlternative: '', nextScenarioId: 'scen-school-3' }
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
      { id: 'c2g-3', text: 'Resti calmo al tuo posto.', type: 'assertive', emoji: '', consequence: 'Il prof interroga un altro.', betterAlternative: '', nextScenarioId: 'scen-school-3' }
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
      { id: 'c3-1', text: 'Gli tiri un pugno.', type: 'impulsive', emoji: '', consequence: 'Sospensione immediata.', betterAlternative: 'Cerca aiuto.', nextScenarioId: null, isCriticalFailure: true },
      { id: 'c3-2', text: 'Gli dai la merenda tremando.', type: 'passive', emoji: '', consequence: 'Rimani senza cibo e triste.', betterAlternative: 'Chiedi aiuto a un prof.', nextScenarioId: null },
      { id: 'c3-3', text: '"No, è mia. Lasciami in pace."', type: 'assertive', emoji: '', consequence: 'Lui sbuffa e se ne va.', betterAlternative: '', nextScenarioId: null }
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
      { id: 'p1-3', text: '"Facciamo calcio e poi basket?"', type: 'assertive', emoji: '', consequence: 'Accettano il compromesso.', betterAlternative: '', nextScenarioId: 'scen-park-2-playing' }
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
      { id: 'p2a-3', text: '"Scusa per prima, gioco!"', type: 'assertive', emoji: '', consequence: 'Ti unisci e ti diverti.', betterAlternative: '', nextScenarioId: 'scen-park-3' }
    ],
    isStartingNode: false,
  },
  'scen-park-2-playing': {
    id: 'scen-park-2-playing',
    title: 'Sotto il Sole (In Gioco)',
    description: 'Sgambetto durante la partita.',
    dialogue: [
      { speaker: 'Narratore', text: 'Marco ti fa uno sgambetto per sbaglio.' },
      { speaker: 'Marco', text: 'Ops, scusa non l\'ho fatto apposta!' }
    ],
    background: '/assets/backgrounds/bg_park.jpg',
    character: '/assets/characters/char_friend.jpg',
    characterName: 'Marco',
    choices: [
      { id: 'p2p-1', text: 'Lo spingi.', type: 'impulsive', emoji: '', consequence: 'Rissa.', betterAlternative: 'Accetta le scuse.', nextScenarioId: 'scen-park-3', isCriticalFailure: true },
      { id: 'p2p-2', text: 'Trattieni le lacrime zitto.', type: 'passive', emoji: '', consequence: 'Nessuno capisce se fa male.', betterAlternative: 'Parla.', nextScenarioId: 'scen-park-3' },
      { id: 'p2p-3', text: '"Tranquillo, fa un po\' male ma ok."', type: 'assertive', emoji: '', consequence: 'Continuate a giocare.', betterAlternative: '', nextScenarioId: 'scen-park-3' }
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
      { id: 'p3-3', text: '"Ciao, a domani!"', type: 'assertive', emoji: '', consequence: 'Torni sereno.', betterAlternative: '', nextScenarioId: null }
    ],
    isStartingNode: false,
  },

  // ─── CAPITOLO 3: BUS E SUPERMERCATO ───
  'scen-bus-1': {
    id: 'scen-bus-1',
    title: 'Rumore e Caos (L\'Autobus)',
    description: 'Musica alta nel bus.',
    dialogue: [
      { speaker: 'Sconosciuto', text: '(Musica trap a tutto volume dal telefono)' }
    ],
    background: '/assets/backgrounds/bg_bus.jpg',
    character: '/assets/characters/char_stranger.jpg',
    characterName: 'Sconosciuto',
    choices: [
      { id: 'b1-1', text: 'Gli strappi il telefono.', type: 'impulsive', emoji: '', consequence: 'L\'autista vi sgrida.', betterAlternative: 'Chiedi di abbassare.', nextScenarioId: 'scen-bus-2', isCriticalFailure: true },
      { id: 'b1-2', text: 'Sopporti in silenzio.', type: 'passive', emoji: '', consequence: 'Mal di testa forte.', betterAlternative: 'Fai notare il fastidio.', nextScenarioId: 'scen-bus-2' },
      { id: 'b1-3', text: '"Scusa, abbassi un po\'?"', type: 'assertive', emoji: '', consequence: 'Lui abbassa.', betterAlternative: '', nextScenarioId: 'scen-bus-2' }
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
      { id: 'b2-1', text: 'La spingi.', type: 'impulsive', emoji: '', consequence: 'Sembri maleducato tu.', betterAlternative: 'Calmati.', nextScenarioId: 'scen-bus-3', isCriticalFailure: true },
      { id: 'b2-2', text: 'Ti sposti zitto.', type: 'passive', emoji: '', consequence: 'Resti amareggiato.', betterAlternative: 'Fatti rispettare.', nextScenarioId: 'scen-bus-3' },
      { id: 'b2-3', text: '"Mi scusi, mi ha fatto male."', type: 'assertive', emoji: '', consequence: 'Lei chiede scusa.', betterAlternative: '', nextScenarioId: 'scen-bus-3' }
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
      { id: 'b3-3', text: 'Cammini con calma.', type: 'assertive', emoji: '', consequence: 'Arrivi pronto per riposare.', betterAlternative: '', nextScenarioId: null }
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
      { id: 'h1-3', text: '"Sono stanco, riposo 20 minuti poi li faccio?"', type: 'assertive', emoji: '', consequence: 'Accetta.', betterAlternative: '', nextScenarioId: 'scen-home-2' }
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
      { id: 'h2-3', text: '"Mamma, mi aiuti a capire?"', type: 'assertive', emoji: '', consequence: 'Lo risolvete insieme.', betterAlternative: '', nextScenarioId: 'scen-home-3' }
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
      { id: 'h3-3', text: '"Vado subito. Buonanotte!"', type: 'assertive', emoji: '', consequence: 'Ti addormenti sereno.', betterAlternative: '', nextScenarioId: null }
    ],
    isStartingNode: false,
  }
};

/** Le viste possibili dell'app */
type AppView = 'menu' | 'login' | 'select-patient' | 'select-scenario' | 'dashboard' | 'patient-detail' | 'builder' | 'simulator' | 'flowchart' | 'settings' | 'reflection';

export default function App() {
  const [view, setView] = useState<AppView>('menu');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Stato dinamico caricato dal DB
  const [patients, setPatients] = useState<Patient[]>([]);
  const [scenarios, setScenarios] = useState<Record<string, Scenario>>(INITIAL_SCENARIOS);
  const [sessions, setSessions] = useState<SessionResult[]>([]);
  const [loading, setLoading] = useState(true);

  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('scen-school-1');
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);

  // Fetch initial data - with localStorage fallback if API unavailable
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try seeding scenarios
        const seedRes = await fetch('/api/seed-scenarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(INITIAL_SCENARIOS)
        });

        if (!seedRes.ok) throw new Error(`Seed failed: ${seedRes.status}`);

        const resP = await fetch('/api/patients');
        if (!resP.ok) throw new Error(`Patients failed: ${resP.status}`);
        const dataP = await resP.json();
        setPatients(Array.isArray(dataP) ? dataP : []);

        const resScen = await fetch('/api/scenarios');
        if (!resScen.ok) throw new Error(`Scenarios failed: ${resScen.status}`);
        const dataScen = await resScen.json();
        if (dataScen && Object.keys(dataScen).length > 0) {
          setScenarios(dataScen);
        }

        const resSess = await fetch('/api/sessions');
        if (!resSess.ok) throw new Error(`Sessions failed: ${resSess.status}`);
        const dataSess = await resSess.json();
        setSessions(Array.isArray(dataSess) ? dataSess : []);

        // Clear old localStorage now that DB is working
        localStorage.removeItem('adhd-patients');
        localStorage.removeItem('adhd-sessions');

      } catch (err) {
        console.warn('API not available, falling back to localStorage:', err);
        // Fallback to localStorage
        const savedPatients = localStorage.getItem('adhd-patients');
        if (savedPatients) {
          try { setPatients(JSON.parse(savedPatients)); } catch { /* ignore */ }
        }
        const savedSessions = localStorage.getItem('adhd-sessions');
        if (savedSessions) {
          try { setSessions(JSON.parse(savedSessions)); } catch { /* ignore */ }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Gestione Audio Globale al cambio di vista
  useEffect(() => {
    if (view === 'simulator' || view === 'menu' || view === 'flowchart' || view === 'select-patient') {
      AudioManager.playBGM(); // Avvia musica
    } else {
      AudioManager.stopBGM(); // Ferma la musica nel gestionale
    }
  }, [view]);

  const transitionToView = (v: AppView) => {
    if (view === v) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setView(v);
      setIsTransitioning(false);
    }, 300);
  };

  const changeView = (v: AppView) => {
    AudioManager.playClick();
    transitionToView(v);
  }

  const handleSelectPatientForGame = (patient: Patient) => {
    AudioManager.playClick();
    setActivePatient(patient);
    transitionToView('select-scenario');
  };

  const handleStartSession = (scenarioId: string) => {
    AudioManager.playClick();
    setActiveScenarioId(scenarioId);
    transitionToView('simulator');
  };

  const handleFinishSession = async (result: SessionResult) => {
    try {
      await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      });
      setSessions(prev => [...prev, result]);
      setSessionResult(result);
      transitionToView('flowchart');
    } catch (e) {
      console.error(e);
      // Fallback update
      setSessions(prev => [...prev, result]);
      setSessionResult(result);
      transitionToView('flowchart');
    }
  };

  // In immersive mode, hide the header
  const isImmersive = view === 'simulator' || view === 'menu' || view === 'select-patient' || view === 'select-scenario' || view === 'flowchart' || view === 'settings' || view === 'reflection';

  if (loading) {
    return <div className="app-wrapper"><div className="loading-screen" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '1.5rem' }}>Caricamento in corso...</div></div>;
  }

  return (
    <div className="app-wrapper">
      {/* Decorative dots background */}
      {!isImmersive && <div className="dots-pattern" />}

      {/* Header (nascosto in modalità immersiva) */}
      {!isImmersive && (
        <header className="app-header">
          <div className="logo" onClick={() => changeView('menu')} style={{ cursor: 'pointer' }}>
            <span className="logo-icon">✨</span>
            <span>Piccole Scelte</span>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => changeView('menu')}>
              Torna al menu principale
            </button>
          </div>
        </header>
      )}

      <main className={isTransitioning ? 'fade-out' : 'fade-in'} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Main Menu — Title Screen */}
        {view === 'menu' && (
          <MainMenu
            onStartGame={() => changeView('select-patient')}
            onOpenDashboard={() => changeView('login')}
            onOpenSettings={() => changeView('settings')}
          />
        )}

        {view === 'login' && (
          <LoginScreen
            onSuccess={() => changeView('dashboard')}
            onBack={() => changeView('menu')}
          />
        )}

        {view === 'settings' && (
          <Settings onBack={() => changeView('menu')} />
        )}

        {/* Patient Selection — before starting a game */}
        {view === 'select-patient' && (
          <PatientSelect
            patients={patients}
            onAddPatient={async (p) => {
              try {
                const res = await fetch('/api/patients', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(p)
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const newPatient = await res.json();
                const updated = [...patients, newPatient];
                setPatients(updated);
                localStorage.setItem('adhd-patients', JSON.stringify(updated));
              } catch (e) {
                console.warn('API failed, saving to localStorage:', e);
                const updated = [...patients, p];
                setPatients(updated);
                localStorage.setItem('adhd-patients', JSON.stringify(updated));
              }
            }}
            onSelect={handleSelectPatientForGame}
            onBack={() => changeView('menu')}
          />
        )}

        {/* Scenario Selection — before starting a game */}
        {view === 'select-scenario' && activePatient && (
          <ScenarioSelect
            scenarios={scenarios}
            patient={activePatient}
            onSelect={handleStartSession}
            onBack={() => changeView('select-patient')}
          />
        )}

        {view === 'dashboard' && (
          <TherapistDashboard
            patients={patients}
            onAddPatient={async (p) => {
              try {
                const res = await fetch('/api/patients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const saved = await res.json();
                const updated = [...patients, saved];
                setPatients(updated);
                localStorage.setItem('adhd-patients', JSON.stringify(updated));
              } catch (e) {
                console.warn('Dashboard: API failed, saving locally:', e);
                const updated = [...patients, p];
                setPatients(updated);
                localStorage.setItem('adhd-patients', JSON.stringify(updated));
              }
            }}
            onDeletePatient={async (id) => {
              try {
                await fetch(`/api/patients/${id}`, { method: 'DELETE' });
              } catch (e) { console.warn('Delete failed:', e); }
              setPatients(patients.filter(p => p.id !== id));
            }}
            onSelectPatient={(p) => { setActivePatient(p); changeView('patient-detail'); }}
            onLogout={() => changeView('menu')}
          />
        )}

        {view === 'patient-detail' && activePatient && (
          <PatientDetail
            patient={activePatient}
            sessions={sessions.filter(s => s.patientId === activePatient.id)}
            onBack={() => changeView('dashboard')}
            onUpdatePatient={async (updatedPatient) => {
              try {
                const res = await fetch(`/api/patients/${updatedPatient.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updatedPatient)
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const saved = await res.json();
                const updated = patients.map(p => p.id === saved.id ? saved : p);
                setPatients(updated);
                setActivePatient(saved);
                localStorage.setItem('adhd-patients', JSON.stringify(updated));
              } catch (e) {
                console.warn('Update failed, saving locally:', e);
                const updated = patients.map(p => p.id === updatedPatient.id ? updatedPatient : p);
                setPatients(updated);
                setActivePatient(updatedPatient);
                localStorage.setItem('adhd-patients', JSON.stringify(updated));
              }
            }}
          />
        )}


        {view === 'simulator' && activePatient && (
          <Simulator
            startingScenarioId={activeScenarioId}
            scenarios={scenarios}
            patient={activePatient}
            onFinishSession={handleFinishSession}
            onAbort={() => changeView('select-scenario')}
          />
        )}

        {view === 'flowchart' && sessionResult && activePatient && (
          <FlowchartEnd
            patient={activePatient}
            session={sessionResult}
            scenarios={scenarios}
            onProceedToTest={() => changeView('reflection')}
            onPlayNext={(nextId) => { setActiveScenarioId(nextId); changeView('simulator'); }}
            onMainMenu={() => changeView('select-scenario')}
          />
        )}

        {view === 'reflection' && activePatient && sessionResult && (
          <ReflectionTest
            patient={activePatient}
            session={sessionResult}
            scenarios={scenarios}
            onUnlockAndContinue={async (nextScenarioId) => {
              try {
                const res = await fetch(`/api/patients/${activePatient.id}/unlock`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ scenarioId: nextScenarioId })
                });
                const updatedPatient = await res.json();
                
                // Update local state
                const updatedPatients = patients.map(p => p.id === updatedPatient.id ? updatedPatient : p);
                setPatients(updatedPatients);
                setActivePatient(updatedPatient);
                
              } catch (e) {
                console.error('Unlock API failed, falling back to local state', e);
                // Fallback update
                const unlocked = activePatient.unlockedScenarios || [];
                if (!unlocked.includes(nextScenarioId)) {
                  const updatedPatient = { ...activePatient, unlockedScenarios: [...unlocked, nextScenarioId] };
                  const updatedPatients = patients.map(p => p.id === updatedPatient.id ? updatedPatient : p);
                  setPatients(updatedPatients);
                  setActivePatient(updatedPatient);
                  localStorage.setItem('adhd-patients', JSON.stringify(updatedPatients));
                }
                changeView('select-scenario');
              }
            }}
            onSkip={() => changeView('select-scenario')}
          />
        )}
      </main>
    </div>
  );
}
