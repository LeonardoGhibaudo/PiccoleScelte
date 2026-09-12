/* eslint-disable react-hooks/purity, react-hooks/set-state-in-effect */
/**
 * ===================================================
 * Simulator.tsx — Il cuore del videogioco visual novel
 * ===================================================
 * Questo componente gestisce l'esperienza di gioco:
 * - Mostra sfondo e personaggio (stile visual novel)
 * - Presenta il dialogo a schermo (carattere per carattere)
 * - Permette al giocatore di scegliere una reazione
 * - Mostra le CONSEGUENZE della scelta
 */
import React, { useState, useEffect, useRef } from 'react';
import type { Scenario, Choice, TelemetryData, SessionResult, Patient } from '../../types';
import AudioManager from '../../utils/AudioManager';
import { PatientAvatar } from '../PatientAvatar';
import './Simulator.css';

interface SimulatorProps {
  startingScenarioId: string;
  scenarios: Record<string, Scenario>;
  patient: Patient;
  onFinishSession: (result: SessionResult) => void;
  onAbort: () => void;
}

/** Fase di gioco: leggere il testo, scegliere, vedere la conseguenza */
type GamePhase = 'reading' | 'choosing' | 'consequence' | 'critical_failure';

export const Simulator: React.FC<SimulatorProps> = ({
  startingScenarioId, scenarios, patient, onFinishSession, onAbort
}) => {
  const [currentScenarioId, setCurrentScenarioId] = useState<string>(startingScenarioId);
  const [pathTaken, setPathTaken] = useState<TelemetryData[]>([]);
  const [phase, setPhase] = useState<GamePhase>('reading');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [displayChoices, setDisplayChoices] = useState<Choice[]>([]);

  // Timer ref per misurare tempi di risposta
  const startTimeRef = useRef<number>(Date.now());

  // Reset ad ogni nuovo scenario
  useEffect(() => {
    startTimeRef.current = Date.now();
    setPhase('reading');
    setDialogueIndex(0);
    setSelectedChoice(null);
    
    // Estrai 3 scelte: 1 impulsive, 1 passive, 1 assertive
    const sc = scenarios[currentScenarioId];
    if (sc && sc.choices) {
      const impulsives = sc.choices.filter(c => c.type === 'impulsive');
      const passives = sc.choices.filter(c => c.type === 'passive');
      const assertives = sc.choices.filter(c => c.type === 'assertive');

      const pickRandom = (arr: typeof sc.choices) => arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;

      let selected = [
        pickRandom(impulsives),
        pickRandom(passives),
        pickRandom(assertives)
      ].filter(Boolean) as Choice[];

      // Se mancano categorie (es. ci sono solo 2 opzioni in tutto o tipi mancanti),
      // rimpiazza con scelte a caso fino ad averne 3 o il massimo disponibile.
      while (selected.length < 3 && selected.length < sc.choices.length) {
        const remaining = sc.choices.filter(c => !selected.includes(c));
        if (remaining.length === 0) break;
        selected.push(pickRandom(remaining) as Choice);
      }

      const shuffled = [...selected].sort(() => Math.random() - 0.5);
      setDisplayChoices(shuffled.slice(0, 3));
    } else {
      setDisplayChoices([]);
    }
  }, [currentScenarioId, scenarios]);

  const scenario = scenarios[currentScenarioId];
  
  const currentDialogue = React.useMemo(() => {
    const fallback = { speaker: scenario?.characterName ?? 'Narratore', text: '...' };
    if (!scenario) return fallback;
    if (!scenario.dialogue || !Array.isArray(scenario.dialogue) || scenario.dialogue.length === 0) {
      return fallback;
    }
    const d = scenario.dialogue[dialogueIndex];
    if (!d || typeof d.speaker === 'undefined') return fallback;
    return d;
  }, [scenario, dialogueIndex]);

  // Safely derive speaker
  const speakerName = currentDialogue?.speaker ?? '';

  // Suono Typewriter per il testo
  useEffect(() => {
    if (phase === 'reading') {
      let count = 0;
      const len = currentDialogue.text.length;
      const maxBlips = Math.min(len, 8); // Non spammiamo troppo audio
      const interval = setInterval(() => {
        AudioManager.playBlip();
        count++;
        if (count >= maxBlips) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [currentDialogue, phase]);

  /** Avanza al prossimo dialogo o alla scelta */
  const handleDialogueAdvance = () => {
    AudioManager.playClick();
    if (scenario && scenario.dialogue && dialogueIndex < scenario.dialogue.length - 1) {
      setDialogueIndex(prev => prev + 1);
    } else {
      setPhase('choosing');
    }
  };

  /** Gestisce il click su una scelta */
  const handleChoiceClick = (choice: Choice) => {
    if (phase !== 'choosing') return;

    if (choice.type === 'assertive') AudioManager.playSuccess();
    else if (choice.type === 'impulsive') AudioManager.playError();
    else AudioManager.playNeutral();

    const responseTimeMs = Date.now() - startTimeRef.current;
    setSelectedChoice(choice);

    const telemetry: TelemetryData = {
      scenarioId: currentScenarioId,
      choiceId: choice.id,
      reactionType: choice.type,
      responseTimeMs,
      choiceText: choice.text,
      consequenceText: choice.consequence,
      betterText: choice.betterAlternative,
    };

    setPathTaken(prev => [...prev, telemetry]);

    if (choice.isCriticalFailure) {
      setPhase('critical_failure');
    } else {
      setPhase('consequence');
    }
  };

  /** Avanza al prossimo scenario o termina il gioco */
  const handleContinue = () => {
    AudioManager.playClick();
    if (!selectedChoice) return;

    if (selectedChoice.nextScenarioId && scenarios[selectedChoice.nextScenarioId]) {
      setCurrentScenarioId(selectedChoice.nextScenarioId);
    } else {
      finishGame([...pathTaken]);
    }
  };

  /** Calcola le metriche cliniche e chiude la sessione */
  const finishGame = (finalPath: TelemetryData[]) => {
    const total = finalPath.length || 1;
    const totalMs = finalPath.reduce((a, c) => a + c.responseTimeMs, 0);

    const impCount = finalPath.filter(p => p.reactionType === 'impulsive').length;
    const pasCount = finalPath.filter(p => p.reactionType === 'passive').length;
    const assCount = finalPath.filter(p => p.reactionType === 'assertive').length;
    const fastCount = finalPath.filter(p => p.responseTimeMs < 2000).length;
    const slowCount = finalPath.filter(p => p.responseTimeMs > 10000).length;

    const maxType = Math.max(impCount, pasCount, assCount);
    const consistencyScore = Math.round((maxType / total) * 100);

    const result: SessionResult = {
      sessionId: `sess-${Date.now()}`,
      patientId: patient.id,
      date: new Date().toISOString(),
      pathTaken: finalPath,
      metrics: {
        totalChoices: total,
        avgResponseTimeMs: Math.round(totalMs / total),
        fastResponseCount: fastCount,
        slowResponseCount: slowCount,
        impulsivityRatio: impCount / total,
        passivityRatio: pasCount / total,
        assertivityRatio: assCount / total,
        consistencyScore,
      },
    };
    onFinishSession(result);
  };

  /** Tastiera: Shortcut di gioco */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase === 'reading' && (e.code === 'Space' || e.code === 'Enter')) {
        e.preventDefault();
        handleDialogueAdvance();
      } else if (phase === 'choosing' && ['Digit1', 'Digit2', 'Digit3', 'Numpad1', 'Numpad2', 'Numpad3'].includes(e.code)) {
        const index = parseInt(e.key) - 1;
        if (displayChoices && displayChoices[index]) {
          handleChoiceClick(displayChoices[index]);
        }
      } else if (phase === 'consequence' && (e.code === 'Space' || e.code === 'Enter')) {
        e.preventDefault();
        handleContinue();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, scenario, dialogueIndex, selectedChoice, displayChoices]);

  if (!scenario) return null;



  const assertiveChoice = scenario.choices.find(c => c.type === 'assertive');

  return (
    <div className="simulator-wrapper fade-in">
      {/* ===== Sfondo Visual Novel ===== */}
      <div
        className="vn-background"
        style={{ backgroundImage: `url(${scenario.background})` }}
      />
      <div className="vn-overlay" />

      {/* ===== Pulsante Interrompi ===== */}
      <button className="abort-btn" onClick={() => { AudioManager.playClick(); onAbort(); }}>
        ✕ Esci
      </button>

      {/* ===== Progresso ===== */}
      <div className="progress-indicator">
        {pathTaken.map((_, i) => (
          <div key={i} className="progress-dot filled" />
        ))}
        <div className="progress-dot current" />
      </div>

      {/* ===== Personaggio ===== */}
      <div className="flex-responsive" style={{ justifyContent: "space-between", padding: "0 2rem", width: "100%", position: 'absolute', bottom: '150px', zIndex: 10, pointerEvents: 'none' }}>
        {/* Patient Avatar on the left */}
        {patient.avatar && (
          <div className={`bounce-in ${speakerName !== 'Pensiero' && speakerName !== patient.firstName ? 'opacity-50' : ''} ${speakerName === patient.firstName || speakerName === 'Pensiero' ? 'speaking-bounce' : ''}`} style={{ transition: 'opacity 0.3s' }}>
            <PatientAvatar config={patient.avatar} size={250} />
          </div>
        )}
        
        {/* Scenario Character on the right */}
        <div className={`vn-character-container bounce-in ${speakerName === 'Pensiero' || speakerName === 'Narratore' || speakerName === patient.firstName ? 'character-dimmed' : ''} ${(speakerName !== 'Pensiero' && speakerName !== 'Narratore' && speakerName !== patient.firstName) ? 'speaking-bounce' : ''}`} style={{ position: 'relative', height: '50vh', bottom: 0, right: 0 }}>
          <img
            src={scenario.character}
            alt={scenario.characterName}
            className="vn-character-img"
            style={{ height: '100%', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* ===== Area Dialogo e Scelte ===== */}
      <div className="vn-bottom-area">
        {/* FASE 1: Lettura del testo narrativo */}
        {phase === 'reading' && (
          <div className="vn-dialogue-box slide-up" key={`dialogue-${currentScenarioId}-${dialogueIndex}`} onClick={handleDialogueAdvance} style={{ cursor: 'pointer' }}>
            <div className="vn-character-name" style={{ backgroundColor: speakerName === 'Pensiero' ? '#B794F4' : speakerName === 'Narratore' ? '#A0AEC0' : '#f687b3' }}>
              {speakerName}
            </div>
            {dialogueIndex === 0 && <div className="vn-scene-title">{scenario.title}</div>}
            <p className="vn-text" style={{ fontStyle: speakerName === 'Pensiero' ? 'italic' : 'normal' }}>
              {currentDialogue.text}
            </p>
            <div className="continue-hint fade-in" style={{ animationDelay: '0.5s', textAlign: 'right', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Clicca per continuare ▶
            </div>
          </div>
        )}

        {/* FASE 2: Il giocatore sceglie */}
        {phase === 'choosing' && (
          <div className="choices-area slide-up" key={`choosing-${currentScenarioId}`}>
            <div className="choices-prompt">
              <span className="choices-prompt-emoji">🤔</span>
              Come reagisci?
            </div>
            <div className="choices-list">
              {displayChoices.map((choice, index) => (
                <button
                  key={choice.id}
                  className={`choice-button type-${choice.type}`}
                  onClick={() => handleChoiceClick(choice)}
                  onMouseEnter={() => AudioManager.playHover()}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="choice-text">
                    <span style={{opacity: 0.5, marginRight: '0.5rem'}}>[{index + 1}]</span>
                    {choice.text}

                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FASE 3: Conseguenza della scelta */}
        {phase === 'consequence' && selectedChoice && (
          <div className="consequence-area slide-up" key={`consequence-${currentScenarioId}`}>
            <div className={`consequence-panel is-${selectedChoice.type === 'assertive' ? 'good' : selectedChoice.type === 'impulsive' ? 'bad' : 'neutral'}`}>
              <div className="consequence-header">
                <span className="consequence-icon">
                  {selectedChoice.type === 'assertive' ? '🌟' : selectedChoice.type === 'impulsive' ? '⚡' : '😶'}
                </span>
                <div>
                  <strong>
                    {selectedChoice.type === 'assertive' ? 'Ottima scelta!' : selectedChoice.type === 'impulsive' ? 'Forse troppo d\'impulso...' : 'Hai evitato il confronto...'}
                  </strong>
                </div>
              </div>
              <p className="consequence-text" style={{ color: '#2D3748', fontSize: '1.2rem', fontWeight: 600 }}>{selectedChoice.consequence}</p>

              {/* Suggerimento "cosa sarebbe stato meglio" */}
              {selectedChoice.type !== 'assertive' && assertiveChoice && (
                <div className="better-suggestion">
                  <strong>💡 Suggerimento:</strong> {selectedChoice.betterAlternative}
                </div>
              )}
            </div>

            <button className="btn btn-game continue-btn" onClick={handleContinue} onMouseEnter={() => AudioManager.playHover()}>
              {selectedChoice.nextScenarioId && scenarios[selectedChoice.nextScenarioId]
                ? 'Continua la storia ▶'
                : 'Vedi il riepilogo ▶'}
            </button>
          </div>
        )}

        {/* FASE 4: Fallimento Critico (Azione Violenta) */}
        {phase === 'critical_failure' && selectedChoice && (
          <div className="consequence-area slide-up" key={`critical-${currentScenarioId}`}>
            <div className="consequence-panel is-bad" style={{ border: '2px solid var(--color-impulsive)', background: 'var(--color-impulsive-bg)' }}>
              <div className="consequence-header">
                <span className="consequence-icon">❌</span>
                <div>
                  <strong style={{ color: 'var(--color-impulsive)', fontSize: '1.2rem' }}>
                    Azione Inaccettabile!
                  </strong>
                </div>
              </div>
              <p className="consequence-text" style={{ color: 'var(--color-text-dark)', fontSize: '1.2rem', fontWeight: 600 }}>
                {selectedChoice.consequence}
              </p>
              <div className="better-suggestion" style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.5)' }}>
                <strong>⚠️ Attenzione:</strong> La violenza non è mai la soluzione. Le tue azioni hanno portato al fallimento del capitolo.
              </div>
            </div>

            <button className="btn btn-danger continue-btn" style={{ marginTop: '1rem' }} onClick={() => { AudioManager.playClick(); onAbort(); }} onMouseEnter={() => AudioManager.playHover()}>
              Esci e Riprova ↺
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
