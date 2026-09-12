/**
 * ===================================================
 * App.tsx — Componente principale di "Piccole Scelte"
 * ===================================================
 * Gestisce la navigazione tra le viste (Menu, Dashboard,
 * ScenarioBuilder, Selezione Paziente, Simulatore, Flowchart).
 */
import { useState, useEffect } from 'react';
import { apiFetch } from './utils/apiFetch';
import type { Patient, Scenario, SessionResult, AuthRole } from './types';
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
import { INITIAL_SCENARIOS } from './data/scenarios';

/* ===================================================================
 * SCENARI PRE-IMPOSTATI — Un albero narrativo stile visual novel
 * Ogni scenario ha sfondo, personaggio, dialogo e 3 scelte
 * con conseguenze e suggerimenti su "cosa sarebbe stato meglio".
 * =================================================================== */

/** Le viste possibili dell'app */
type AppView = 'menu' | 'login' | 'select-patient' | 'select-scenario' | 'dashboard' | 'patient-detail' | 'builder' | 'simulator' | 'flowchart' | 'settings' | 'reflection';

export default function App() {
  const [view, setView] = useState<AppView>('menu');
  const [authRole, setAuthRole] = useState<AuthRole>(
    (localStorage.getItem('authRole') as AuthRole) || null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  

  // Stato dinamico caricato dal DB
  const [patients, setPatients] = useState<Patient[]>([]);
  const [scenarios, setScenarios] = useState<Record<string, Scenario>>(INITIAL_SCENARIOS);
  const [sessions, setSessions] = useState<SessionResult[]>([]);
  const [loading, setLoading] = useState(true);

    const [activePatient, setActivePatient] = useState<Patient | null>(() => {
    const saved = sessionStorage.getItem('activePatient');
    return saved ? JSON.parse(saved) : null;
  });
  const [activeScenarioId, setActiveScenarioId] = useState<string>('scen-school-pressione-1');
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);

  // Fetch initial data - with localStorage fallback if API unavailable
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try seeding scenarios
        const seedRes = await apiFetch('/api/scenarios/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(INITIAL_SCENARIOS)
        });

        if (!seedRes.ok) throw new Error(`Seed failed: ${seedRes.status}`);

        const resP = await apiFetch('/api/patients');
        if (!resP.ok) throw new Error(`Patients failed: ${resP.status}`);
        const dataP = await resP.json();
        const loadedPatients = Array.isArray(dataP) ? dataP : [];
        setPatients(loadedPatients);

        // Se l'utente ha ricaricato la pagina ed è loggato come 'user', rimettiamo activePatient
        const storedRole = localStorage.getItem('authRole');
        const storedEmail = localStorage.getItem('userEmail');
        if (storedRole === 'user' && storedEmail) {
          const myPat = loadedPatients.find((p: any) => p.id === storedEmail);
          if (myPat) setActivePatient(myPat);
        }

        const resScen = await apiFetch('/api/scenarios');
        if (!resScen.ok) throw new Error(`Scenarios failed: ${resScen.status}`);
        const dataScen = await resScen.json();
        if (dataScen && Object.keys(dataScen).length > 0) {
          setScenarios(prev=> ({...prev,...dataScen}));
        }

        const resSess = await apiFetch('/api/sessions');
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
  };

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
      await apiFetch('/api/sessions', {
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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  if (loading) {
    return <div className="app-wrapper"><div className="loading-screen" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '1.5rem' }}>Caricamento in corso...</div></div>;
  }

  const toggleTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="app-wrapper">
      <button 
        onClick={toggleTheme} 
        style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999, background: 'var(--panel-bg)', color: 'var(--color-text-dark)', border: '2px solid var(--panel-border)', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s', padding: 0 }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        title="Cambia Tema"
      >
        <span style={{ fontSize: '1.2rem' }}>🌓</span>
      </button>
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
            authRole={authRole}
            onStartGuest={() => { setAuthRole('guest'); changeView('select-patient'); }}
            onStartGame={() => {
              if (authRole === 'user' && activePatient) {
                changeView('select-scenario');
              } else {
                changeView('select-patient');
              }
            }}
            onOpenDashboard={() => changeView('dashboard')}
            onOpenLogin={() => changeView('login')}
            onOpenSettings={() => changeView('settings')}
            onLogout={() => {
              localStorage.clear(); // Pulisce la cache
              setAuthRole(null);
              changeView('menu');
            }}
          />
        )}

        {view === 'login' && (
          <LoginScreen
            onSuccess={async (role) => {
              setAuthRole(role);
              if (role === 'therapist') {
                changeView('dashboard');
              } else {
                const email = localStorage.getItem('userEmail');
                let mioPersonaggio = patients.find(p => p.id === email);
                
                // Always try to fetch fresh from DB so we get latest unlockedScenarios
                if (email) {
                  try {
                    const res = await apiFetch('/api/patients');
                    if (res.ok) {
                      const allPatients = await res.json();
                      setPatients(allPatients);
                      mioPersonaggio = allPatients.find((p: any) => p.id === email) || mioPersonaggio;
                    }
                  } catch (e) {
                    console.error(e);
                  }
                }

                if (mioPersonaggio) {
                  setActivePatient(mioPersonaggio);
                  
                  // Check if patient has any rejected validation requests
                  if (mioPersonaggio.therapistEmail) {
                    try {
                      const valRes = await apiFetch(`/api/validations/patient/${mioPersonaggio.id}`);
                      if (valRes.ok) {
                        const rejections = await valRes.json();
                        if (rejections.length > 0) {
                          alert(`La tua psicologa ti ha chiesto di rigiocare e riflettere meglio sul capitolo: "${rejections[0].scenarioTitle}"`);
                          // Acknowledge it so it doesn't show again
                          await apiFetch(`/api/validations/${rejections[0]._id}`, { method: 'DELETE' });
                        }
                      }
                    } catch (e) {
                      console.error('Failed to check validations', e);
                    }
                  }
                  
                  
  // Polling per aggiornare l'activePatient (utile per vedere i capitoli sbloccati senza ricaricare)
  React.useEffect(() => {
    if (!activePatient || authRole === 'guest') return;
    
    const pollPatient = async () => {
      try {
        const res = await apiFetch(`/api/patients`);
        if (res.ok) {
          const allPatients = await res.json();
          const updated = allPatients.find((p: Patient) => p.id === activePatient.id);
          if (updated && JSON.stringify(updated.unlockedScenarios) !== JSON.stringify(activePatient.unlockedScenarios)) {
            handleSetActivePatient(updated);
            
            // Aggiorna anche la lista globale patients
            setPatients((prev: Patient[]) => prev.map(p => p.id === updated.id ? updated : p));
          }
        }
      } catch (e) {
        // console.warn('Polling fallito', e);
      }
    };
    
    const interval = setInterval(pollPatient, 5000);
    return () => clearInterval(interval);
  }, [activePatient, authRole]);

                  changeView('select-scenario');
                } else {
                  changeView('select-patient');
                }
              }
            }}
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
                const res = await apiFetch('/api/patients', {
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
            authRole={authRole}
            onSelect={handleStartSession}
            onBack={() => {
              if (authRole === 'therapist') changeView('dashboard');
              else changeView('menu');
            }}
          />
        )}

        {view === 'dashboard' && (
          <TherapistDashboard
            patients={patients}
            onAddPatient={async (p) => {
              try {
                const res = await apiFetch('/api/patients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) });
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
                await apiFetch(`/api/patients/${id}`, { method: 'DELETE' });
              } catch (e) { console.warn('Delete failed:', e); }
              setPatients(patients.filter(p => p.id !== id));
            }}
            onSelectPatient={(p) => { handleSetActivePatient(p); changeView('patient-detail'); }}
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
                const res = await apiFetch(`/api/patients/${updatedPatient.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updatedPatient)
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const saved = await res.json();
                const updated = patients.map(p => p.id === saved.id ? saved : p);
                setPatients(updated);
                handleSetActivePatient(saved);
                localStorage.setItem('adhd-patients', JSON.stringify(updated));
              } catch (e) {
                console.warn('Update failed, saving locally:', e);
                const updated = patients.map(p => p.id === updatedPatient.id ? updatedPatient : p);
                setPatients(updated);
                handleSetActivePatient(updatedPatient);
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
            authRole={authRole}
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
                const res = await apiFetch(`/api/patients/${activePatient.id}/unlock`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ scenarioId: nextScenarioId })
                });
                const updatedPatient = await res.json();
                
                // Update local state
                const updatedPatients = patients.map(p => p.id === updatedPatient.id ? updatedPatient : p);
                setPatients(updatedPatients);
                handleSetActivePatient(updatedPatient);
                
              } catch (e) {
                console.error('Unlock API failed, falling back to local state', e);
                // Fallback update
                const unlocked = activePatient.unlockedScenarios || [];
                if (!unlocked.includes(nextScenarioId)) {
                  const updatedPatient = { ...activePatient, unlockedScenarios: [...unlocked, nextScenarioId] };
                  const updatedPatients = patients.map(p => p.id === updatedPatient.id ? updatedPatient : p);
                  setPatients(updatedPatients);
                  handleSetActivePatient(updatedPatient);
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
