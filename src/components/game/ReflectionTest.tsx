import React, { useState } from 'react';
import type { Patient, Scenario, SessionResult } from '../../types';
import AudioManager from '../../utils/AudioManager';

interface ReflectionTestProps {
  patient: Patient;
  session: SessionResult;
  scenarios: Record<string, Scenario>;
  onUnlockAndContinue: (nextScenarioId: string) => Promise<void>;
  onSkip: () => void;
}

export const ReflectionTest: React.FC<ReflectionTestProps> = ({ patient, session, scenarios, onUnlockAndContinue, onSkip }) => {
  const [reflectionText, setReflectionText] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Find the chapter we just played (the first node in the path)
  const playedChapterId = session.pathTaken[0]?.scenarioId;
  const startingScenarios = Object.values(scenarios).filter(s => s.isStartingNode);
  const playedIndex = startingScenarios.findIndex(s => s.id === playedChapterId);
  
  const nextScenarioToUnlock = playedIndex !== -1 && playedIndex < startingScenarios.length - 1 
    ? startingScenarios[playedIndex + 1] 
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim() && !fileUploaded) return;
    
    setLoading(true);
    AudioManager.playSuccess();
    
    if (nextScenarioToUnlock) {
      await onUnlockAndContinue(nextScenarioToUnlock.id);
    } else {
      onSkip(); // Everything is unlocked
    }
  };

  if (!nextScenarioToUnlock) {
    return (
      <div className="container fade-in slide-up" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'white' }}>Hai completato l'avventura!</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Hai completato tutti i capitoli disponibili.</p>
        <button className="btn btn-primary mt-4" onClick={() => { AudioManager.playClick(); onSkip(); }}>
          Torna al Menu Capitoli
        </button>
      </div>
    );
  }

  return (
    <div className="container fade-in slide-up" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(17, 24, 39, 0.85)', backdropFilter: 'blur(16px)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', color: 'white', marginBottom: '1rem', textAlign: 'center' }}>
          Test di Riflessione
        </h1>
        <p style={{ textAlign: 'center', color: 'rgba(243, 244, 246, 0.8)', marginBottom: '2rem', fontSize: '1.2rem' }}>
          Per sbloccare <strong>{nextScenarioToUnlock.title}</strong>, pensa a una situazione della vita reale simile a quella appena giocata e raccontami come sei riuscito a mantenere la calma.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-bold" style={{ color: '#F3F4F6' }}>Racconta la tua esperienza:</label>
            <textarea 
              className="form-control" 
              rows={5} 
              placeholder="Una volta è successo che..."
              value={reflectionText}
              onChange={e => setReflectionText(e.target.value)}
              style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.15)' }}
            />
          </div>

          <div className="mb-4 text-center">
            <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontWeight: 'bold' }}>— OPPURE —</span>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold" style={{ color: '#F3F4F6' }}>Carica una foto o un disegno che rappresenta la tua calma:</label>
            <input 
              type="file" 
              className="form-control" 
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFileUploaded(true);
                }
              }}
            />
            {fileUploaded && <div className="mt-2 text-success">✓ File selezionato pronto per l'invio!</div>}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-5">
            <button type="button" className="btn btn-secondary" onClick={() => { AudioManager.playClick(); onSkip(); }}>
              Salta per ora (Non sblocca)
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading || (!reflectionText.trim() && !fileUploaded)}
              style={{ fontSize: '1.2rem', padding: '0.8rem 2rem' }}
            >
              {loading ? 'Sbloccando...' : 'Invia e Sblocca 🔓'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
