import React, { useState } from 'react';
import type { Scenario, Patient } from '../../types';
import AudioManager from '../../utils/AudioManager';
import './TutorialModal.css';

interface ScenarioSelectProps {
  scenarios: Record<string, Scenario>;
  patient: Patient;
  onSelect: (scenarioId: string) => void;
  onBack: () => void;
}

export const ScenarioSelect: React.FC<ScenarioSelectProps> = ({ scenarios, patient, onSelect, onBack }) => {
  // Find all starting nodes
  const startingScenarios = Object.values(scenarios).filter(s => s.isStartingNode);
  
  // Tutorial Modal logic: Show if patient has no unlocked scenarios or it's empty
  const hasNeverPlayed = !patient.unlockedScenarios || patient.unlockedScenarios.length === 0;
  const [showTutorial, setShowTutorial] = useState(hasNeverPlayed);
  const [tutorialStep, setTutorialStep] = useState(0);

  const tutorialContent = [
    {
      title: 'Benvenuto!',
      text: `Ciao ${patient.firstName}! In questa avventura affronterai situazioni di tutti i giorni. Sei pronto?`,
      icon: '✨'
    },
    {
      title: 'Come funziona',
      text: 'Leggi con attenzione cosa succede e scegli l\'azione che ti sembra migliore. Prenditi tutto il tempo che ti serve!',
      icon: '👀'
    },
    {
      title: 'Rifletti',
      text: 'Ogni scelta ha una conseguenza. A fine capitolo, potrai vedere com\'è andata e imparare dalle tue azioni.',
      icon: '🧠'
    }
  ];

  return (
    <div className="container fade-in slide-up" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '6rem', paddingBottom: '4rem', position: 'relative' }}>
      {/* ===== TUTORIAL MODAL ===== */}
      {showTutorial && (
        <div className="tutorial-overlay">
          <div className="tutorial-modal bounce-in">
            <div className="tutorial-icon">{tutorialContent[tutorialStep].icon}</div>
            <h2 className="tutorial-title">{tutorialContent[tutorialStep].title}</h2>
            <p className="tutorial-text">{tutorialContent[tutorialStep].text}</p>
            
            <div className="tutorial-dots">
              {tutorialContent.map((_, i) => (
                <div key={i} className={`tutorial-dot ${i === tutorialStep ? 'active' : ''}`} />
              ))}
            </div>

            <div className="tutorial-actions">
              {tutorialStep < tutorialContent.length - 1 ? (
                <button className="btn btn-primary tutorial-btn" onClick={() => { AudioManager.playClick(); setTutorialStep(prev => prev + 1); }}>
                  Avanti
                </button>
              ) : (
                <button className="btn btn-primary tutorial-btn start-btn" onClick={() => { AudioManager.playClick(); setShowTutorial(false); }}>
                  Inizia l'Avventura!
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <button 
        className="btn btn-secondary" 
        onClick={() => { AudioManager.playClick(); onBack(); }}
        style={{ position: 'absolute', top: '2rem', left: '2rem' }}
      >
        ◀ Indietro
      </button>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', color: 'var(--color-text-dark)', marginBottom: '1rem', textShadow: '0 0 30px var(--color-border)' }}>
          Scegli un Capitolo
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text)' }}>
          Quale situazione vuoi affrontare oggi?
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        {startingScenarios.map((scenario, index) => {
          const unlockedScenarios = patient.unlockedScenarios && patient.unlockedScenarios.length > 0 ? patient.unlockedScenarios : [];
          // BUG FIX: Il capitolo 1 (scen-school-1) è sempre sbloccato di default
          const isUnlocked = unlockedScenarios.includes(scenario.id) || scenario.id === 'scen-school-1';
          
          return (
            <div 
              key={scenario.id}
              className={`card scenario-card bounce-in ${!isUnlocked ? 'locked' : ''}`}
              style={{ 
                cursor: isUnlocked ? 'pointer' : 'not-allowed', 
                animationDelay: `${index * 0.1}s`,
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                opacity: isUnlocked ? 1 : 0.6,
                filter: isUnlocked ? 'none' : 'grayscale(100%)'
              }}
              onClick={() => {
                if (isUnlocked) {
                  onSelect(scenario.id);
                } else {
                  AudioManager.playError();
                }
              }}
              onMouseEnter={() => isUnlocked && AudioManager.playHover()}
            >
              <div 
                style={{ 
                  height: '180px', 
                  backgroundImage: `url(${scenario.background})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>{scenario.title}</h3>
                  {!isUnlocked && <span style={{ fontSize: '1.5rem' }}>🔒</span>}
                </div>
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ color: 'var(--color-text)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  {scenario.description}
                </p>
                <button className={`btn ${isUnlocked ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }} disabled={!isUnlocked}>
                  {isUnlocked ? 'Gioca ▶' : 'Bloccato'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {startingScenarios.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)' }}>
          <p>Nessuno scenario iniziale disponibile.</p>
        </div>
      )}
    </div>
  );
};
