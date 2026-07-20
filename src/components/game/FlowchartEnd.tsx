import React from 'react';
import type { SessionResult, Scenario, Patient } from '../../types';
import './FlowchartEnd.css';

interface FlowchartEndProps {
  patient: Patient;
  session: SessionResult;
  scenarios: Record<string, Scenario>;
  onProceedToTest: () => void;
  onPlayNext: (nextScenarioId: string) => void;
  onMainMenu: () => void;
}

export const FlowchartEnd: React.FC<FlowchartEndProps> = ({ patient, session, scenarios, onProceedToTest, onPlayNext, onMainMenu }) => {
  const [showPaywall, setShowPaywall] = React.useState(false);
  const { metrics } = session;

  const passed = metrics.assertivityRatio >= 0.5;

  /** Calcola un "voto" complessivo per la sessione */
  const getOverallGrade = () => {
    if (metrics.assertivityRatio >= 0.7) return { emoji: '🌟', label: 'Fantastico!', color: 'var(--color-assertive)' };
    if (metrics.assertivityRatio >= 0.5) return { emoji: '👍', label: 'Buon lavoro!', color: 'var(--color-sky-dark)' };
    if (metrics.impulsivityRatio >= 0.6) return { emoji: '⚡', label: 'Un po\' impulsivo', color: 'var(--color-impulsive)' };
    return { emoji: '🌱', label: 'Puoi fare scelte migliori!', color: 'var(--color-sun)' };
  };

  const grade = getOverallGrade();

  const getTypeLabel = (type: string) => {
    if (type === 'assertive') return 'Assertiva';
    if (type === 'impulsive') return 'Impulsiva';
    return 'Passiva';
  };

  const getTypeClass = (type: string) => {
    if (type === 'assertive') return 'node-assertive';
    if (type === 'impulsive') return 'node-impulsive';
    return 'node-passive';
  };

  // Find the chapter we just played (the first node in the path)
  const playedChapterId = session.pathTaken[0]?.scenarioId;
  const startingScenarios = Object.values(scenarios).filter(s => s.isStartingNode);
  const playedIndex = startingScenarios.findIndex(s => s.id === playedChapterId);
  
  const nextChapter = playedIndex !== -1 && playedIndex < startingScenarios.length - 1 
    ? startingScenarios[playedIndex + 1] 
    : null;

  const isNextChapterUnlocked = nextChapter && patient.unlockedScenarios?.includes(nextChapter.id);

  return (
    <div className="flowchart-wrapper fade-in">
      <div className="flowchart-container">

        {/* ===== Titolo ===== */}
        <div className="flowchart-hero bounce-in">
          <span className="hero-emoji">{grade.emoji}</span>
          <h1 className="hero-title" style={{ color: grade.color, textShadow: `0 0 20px ${grade.color}40` }}>{grade.label}</h1>
          <p className="hero-subtitle">Ecco il percorso che hai fatto nella tua avventura</p>
        </div>

        {/* ===== Albero delle Scelte ===== */}
        <div className="flowchart-tree">
          <div className="tree-line" />

          {session.pathTaken.map((node, index) => {
            const scenario = scenarios[node.scenarioId];

            return (
              <div
                key={index}
                className={`tree-node ${getTypeClass(node.reactionType)} slide-up`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Scenario Title */}
                <div className="tree-scenario-badge">
                  📍 {scenario?.title || 'Scenario'}
                </div>

                {/* Choice Card */}
                <div className="tree-choice-card">
                  <div className="tree-choice-type">
                    {getTypeLabel(node.reactionType)}
                  </div>
                  <p className="tree-choice-text">"{node.choiceText}"</p>
                  <div className="tree-choice-time">
                    ⏱️ {(node.responseTimeMs / 1000).toFixed(1)}s
                  </div>
                </div>

                {/* Conseguenza */}
                <div className="tree-consequence">
                  <p>{node.consequenceText}</p>
                </div>

                {/* Cosa sarebbe stato meglio */}
                {node.reactionType !== 'assertive' && node.betterText && (
                  <div className="tree-better">
                    <strong>💡 Sarebbe stato meglio:</strong>
                    <p>{node.betterText}</p>
                  </div>
                )}

                {/* Connector dot */}
                <div className="tree-connector-dot" />
              </div>
            );
          })}

          {/* End node */}
          <div className="tree-end-node bounce-in" style={{ animationDelay: `${session.pathTaken.length * 0.15}s` }}>
            🏁 Fine Capitolo
          </div>
        </div>

        {/* ===== Metriche Cliniche ===== */}
        <div className="metrics-section slide-up" style={{ animationDelay: '0.5s' }}>
          <h2 className="metrics-title">📊 Come è andata?</h2>
          <div className="metrics-grid">
            <div className="metric-card metric-assertive">
              <div className="metric-value">{Math.round(metrics.assertivityRatio * 100)}%</div>
              <div className="metric-label">Risposte Assertive</div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: `${metrics.assertivityRatio * 100}%`, background: 'var(--color-assertive)' }} />
              </div>
            </div>
            <div className="metric-card metric-impulsive">
              <div className="metric-value">{Math.round(metrics.impulsivityRatio * 100)}%</div>
              <div className="metric-label">Risposte Impulsive</div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: `${metrics.impulsivityRatio * 100}%`, background: 'var(--color-impulsive)' }} />
              </div>
            </div>
            <div className="metric-card metric-passive">
              <div className="metric-value">{Math.round(metrics.passivityRatio * 100)}%</div>
              <div className="metric-label">Risposte Passive</div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: `${metrics.passivityRatio * 100}%`, background: 'var(--color-passive)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ===== Pulsante Fine ===== */}
        <div className="flowchart-actions slide-up" style={{ animationDelay: '0.8s', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
          {!passed ? (
            <>
              <p style={{ color: 'var(--color-impulsive)', fontSize: '1.2rem', textAlign: 'center' }}>Non hai fatto abbastanza scelte giuste per sbloccare il prossimo capitolo.</p>
              <button className="btn btn-primary" onClick={onMainMenu}>
                Torna al Menu
              </button>
            </>
          ) : !nextChapter ? (
            <>
              <p style={{ color: 'var(--color-assertive)', fontSize: '1.2rem', textAlign: 'center' }}>Hai completato tutti i capitoli disponibili!</p>
              <button className="btn btn-primary" onClick={onMainMenu}>
                Torna al Menu
              </button>
            </>
          ) : isNextChapterUnlocked ? (
            <>
              <button className="btn btn-primary" onClick={() => onPlayNext(nextChapter.id)} style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                Continua e Gioca '{nextChapter.title}'
              </button>
              <button className="btn btn-secondary" onClick={onMainMenu}>
                Torna al Menu
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  if (!patient.isPremium) {
                    setShowPaywall(true);
                    AudioManager.playError();
                  } else {
                    onProceedToTest();
                  }
                }} 
                style={{ fontSize: '1.2rem', padding: '1rem 2rem', background: patient.isPremium ? 'var(--color-sky-dark)' : 'linear-gradient(135deg, #F59E0B, #EA580C)' }}
              >
                {patient.isPremium ? 'Continua (Premium) ✨' : 'Sblocca il Gioco Completo 🔒'}
              </button>
              <button className="btn btn-secondary" onClick={onMainMenu}>
                Torna al Menu
              </button>
            </>
          )}
        </div>
      </div>

      {/* ===== PAYWALL MODAL ===== */}
      {showPaywall && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--overlay-bg)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(12px)' }}>
          <div className="card slide-up" style={{ maxWidth: '600px', width: '100%', background: 'var(--modal-bg)', border: '1px solid var(--panel-border)', boxShadow: 'var(--panel-shadow)', borderRadius: 'var(--radius-xl)', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
            
            {/* Sfondo decorativo Paywall */}
            <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.15), transparent 50%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-text-dark)', marginBottom: '1rem', textShadow: '0 2px 10px rgba(245, 158, 11, 0.3)' }}>Sblocca l'Avventura Completa</h2>
              <p style={{ color: 'var(--color-text)', fontSize: '1.2rem', marginBottom: '2rem' }}>
                Hai completato la demo gratuita! Per continuare la storia di <strong>{patient.firstName}</strong> e affrontare le nuove sfide, sblocca i capitoli successivi.
              </p>
              
              <div style={{ background: 'var(--color-surface-warm)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '2rem', border: '1px solid var(--panel-border)' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li><span style={{ color: 'var(--color-assertive)', marginRight: '1rem' }}>✓</span> Accesso a tutti i capitoli presenti e futuri</li>
                  <li><span style={{ color: 'var(--color-assertive)', marginRight: '1rem' }}>✓</span> Nuovi scenari e finali alternativi</li>
                  <li><span style={{ color: 'var(--color-assertive)', marginRight: '1rem' }}>✓</span> Supporta lo sviluppo del gioco</li>
                </ul>
              </div>

              <button className="btn btn-game" style={{ width: '100%', fontSize: '1.3rem', padding: '1rem', background: 'linear-gradient(135deg, #F59E0B, #EA580C)', color: 'white', boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.4)' }} onClick={() => { alert('Simulazione acquisto Stripe in corso...'); setShowPaywall(false); }}>
                Acquista ora a 4.99€
              </button>
              
              <button className="btn btn-secondary" style={{ marginTop: '1.5rem', background: 'transparent', border: 'none', color: 'var(--color-text-light)' }} onClick={() => setShowPaywall(false)}>
                Torna indietro
              </button>

              <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                Sei in cura presso uno specialista? Chiedi il link terapeutico per accedere gratuitamente.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

