import React from 'react';
import type { Patient, SessionResult } from '../../types';
import AudioManager from '../../utils/AudioManager';

interface PatientDetailProps {
  patient: Patient;
  sessions: SessionResult[];
  onBack: () => void;
  onUpdatePatient?: (patient: Patient) => void;
}


const SessionGroupCard: React.FC<{ group: { dateStr: string, sessions: SessionResult[] } }> = ({ group }) => {
  const [expanded, setExpanded] = React.useState(false);
  
  // Aggregated metrics for the day
  const totalChoices = group.sessions.reduce((acc, s) => acc + s.metrics.totalChoices, 0);
  const avgConsistency = Math.round(group.sessions.reduce((acc, s) => acc + s.metrics.consistencyScore, 0) / group.sessions.length);
  const avgAss = Math.round(group.sessions.reduce((acc, s) => acc + s.metrics.assertivityRatio, 0) / group.sessions.length * 100);
  const avgImp = Math.round(group.sessions.reduce((acc, s) => acc + s.metrics.impulsivityRatio, 0) / group.sessions.length * 100);
  
  return (
    <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)' }}>
      <div className="flex-responsive" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '0.25rem', fontSize: '1.1rem' }}>Accesso del {group.dateStr}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
            Capitoli completati: {group.sessions.length} | Scelte: {totalChoices} | Consistenza Media: {avgConsistency}%
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className="badge" style={{ background: 'var(--color-assertive-bg)', color: 'var(--color-assertive)' }}>{avgAss}% Ass</span>
          <span className="badge" style={{ background: 'var(--color-impulsive-bg)', color: 'var(--color-impulsive)' }}>{avgImp}% Imp</span>
          <button 
            className="btn btn-secondary" 
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', marginLeft: '0.5rem', width: 'auto' }}
            onClick={() => { AudioManager.playClick(); setExpanded(!expanded); }}
          >
            {expanded ? '▲ Nascondi Dettagli' : '▼ Dettagli Capitoli'}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
          {group.sessions.map((s, idx) => (
            <div key={s.sessionId} style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-sky-dark)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-dark)' }}>Capitolo: {s.pathTaken[0]?.scenarioId ? s.pathTaken[0].scenarioId.replace('scen-', '').replace(/-/g, ' ').toUpperCase() : `Sconosciuto ${idx+1}`}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>Data completamento: {new Date(s.date).toLocaleTimeString()}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {s.pathTaken.map((choice, cIdx) => (
                  <div key={cIdx} style={{ fontSize: '0.9rem', padding: '0.75rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Scelta {cIdx + 1}: <span style={{ color: choice.reactionType === 'assertive' ? 'var(--color-assertive)' : choice.reactionType === 'impulsive' ? 'var(--color-impulsive)' : 'var(--color-passive)' }}>{choice.reactionType.toUpperCase()}</span></div>
                    <div style={{ color: 'var(--color-text-dark)', marginBottom: '0.5rem' }}>"{choice.choiceText}"</div>
                    {choice.reactionType !== 'assertive' && choice.betterText && (
                      <div style={{ color: 'var(--color-text-light)', fontSize: '0.85rem', fontStyle: 'italic', borderTop: '1px dashed var(--color-border)', paddingTop: '0.25rem' }}>
                        Alternativa corretta ignorata: "{choice.betterText}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const PatientDetail: React.FC<PatientDetailProps> = ({ patient, sessions, onBack, onUpdatePatient }) => {

  const [isEditing, setIsEditing] = React.useState(false);
  const [editFiscalCode, setEditFiscalCode] = React.useState(patient.fiscalCode || '');
  const [editNotes, setEditNotes] = React.useState(patient.diagnosisDetails || '');

  // Sort sessions by date descending
  const sortedSessions = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Aggregate metrics
  
  // Group sessions by Date string (e.g. "12/09/2026") to redefine "Session" as a Site Access
  const groupedSessions = React.useMemo(() => {
    const groups: Record<string, SessionResult[]> = {};
    sortedSessions.forEach(s => {
      const dateStr = new Date(s.date).toLocaleDateString();
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push(s);
    });
    return Object.entries(groups).map(([dateStr, sessions]) => ({ dateStr, sessions }));
  }, [sortedSessions]);

  const totalSessions = sessions.length;
  
  let overallImpulsivity = 0;
  let overallPassivity = 0;
  let overallAssertivity = 0;
  let avgResponseTime = 0;

  if (totalSessions > 0) {
    overallImpulsivity = sessions.reduce((acc, s) => acc + s.metrics.impulsivityRatio, 0) / totalSessions;
    overallPassivity = sessions.reduce((acc, s) => acc + s.metrics.passivityRatio, 0) / totalSessions;
    overallAssertivity = sessions.reduce((acc, s) => acc + s.metrics.assertivityRatio, 0) / totalSessions;
    avgResponseTime = sessions.reduce((acc, s) => acc + s.metrics.avgResponseTimeMs, 0) / totalSessions;
  }

  return (
    <div className="container fade-in slide-up">
      <div className="flex-responsive" style={{ alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button className="btn btn-secondary" onClick={() => { AudioManager.playClick(); onBack(); }}>
          ◀ Torna alla Dashboard
        </button>
        <h2 style={{ margin: 0 }}>Cartella Clinica: {patient.firstName} {patient.lastName}</h2>
      </div>

      <div className="grid-responsive">
        {/* Patient Info Card */}
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
            {onUpdatePatient && (
              <button 
                className={`btn ${isEditing ? 'btn-game' : 'btn-secondary'}`}
                style={{ position: 'absolute', right: 0, top: 0, padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                onClick={() => {
                  if (isEditing) {
                    onUpdatePatient({ ...patient, fiscalCode: editFiscalCode, diagnosisDetails: editNotes });
                    setIsEditing(false);
                    AudioManager.playClick();
                  } else {
                    setIsEditing(true);
                    AudioManager.playClick();
                  }
                }}
              >
                {isEditing ? '💾 Salva' : '✏️ Modifica'}
              </button>
            )}
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👤</div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-dark)', margin: 0 }}>{patient.firstName} {patient.lastName}</h3>
            <p className="text-muted" style={{ marginTop: '0.5rem' }}>ID: {patient.id}</p>
            {patient.isPremium ? (
               <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.2rem 0.6rem', background: 'var(--color-assertive-bg)', color: 'var(--color-assertive)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 'bold' }}>✨ Paziente in Terapia (Premium)</span>
            ) : (
               <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.2rem 0.6rem', background: 'var(--color-border)', color: 'var(--color-text-light)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 'bold' }}>Utente Gratuito</span>
            )}
          </div>

          {onUpdatePatient && (
            <div style={{ background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid var(--color-border)' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--color-text-dark)' }}>Accesso al Gioco</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', marginBottom: '1rem' }}>
                Genera un link per permettere al paziente di sbloccare tutti i capitoli gratuitamente (incluso nella terapia).
              </p>
              <button 
                className="btn btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                onClick={() => {
                  AudioManager.playClick();
                  const isNowPremium = !patient.isPremium;
                  onUpdatePatient({ ...patient, isPremium: isNowPremium });
                  if (isNowPremium) {
                    alert(`Link copiato negli appunti!\n\npiccolescelte.com/invite/${patient.id}\n\nIl paziente ora avrà accesso premium.`);
                  }
                }}
              >
                {patient.isPremium ? '❌ Revoca Accesso Premium' : '🔗 Genera Link Terapeutico'}
              </button>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="flex-responsive" style={{ justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
              <span className="text-muted">Codice Fiscale</span>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editFiscalCode} 
                  onChange={e => setEditFiscalCode(e.target.value)} 
                  className="form-control" 
                  style={{ width: '200px' }} 
                  placeholder="Inserisci CF..."
                />
              ) : (
                <strong style={{ fontFamily: 'monospace', color: 'var(--color-text-dark)' }}>{patient.fiscalCode}</strong>
              )}
            </div>
            <div className="flex-responsive" style={{ justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
              <span className="text-muted">Creazione</span>
              <strong style={{ color: 'var(--color-text-dark)' }}>{new Date(patient.createdAt).toLocaleDateString()}</strong>
            </div>
            <div className="flex-responsive" style={{ justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
              <span className="text-muted">Consenso GDPR</span>
              <strong style={{ color: patient.consentGiven ? 'var(--color-assertive)' : 'var(--color-impulsive)' }}>
                {patient.consentGiven ? 'Acquisito ✅' : 'Mancante ❌'}
              </strong>
            </div>
            <div className="flex-responsive" style={{ justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
              <span className="text-muted">Sessioni Totali</span>
              <strong style={{ color: 'var(--color-text-dark)' }}>{totalSessions}</strong>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '1rem' }}>
              <span className="text-muted">Note Cliniche / Terapeutiche</span>
              {isEditing ? (
                <textarea 
                  value={editNotes} 
                  onChange={e => setEditNotes(e.target.value)} 
                  className="form-control" 
                  style={{ minHeight: '100px', resize: 'vertical' }}
                  placeholder="Aggiungi note cliniche, osservazioni, obiettivi terapeutici..."
                />
              ) : (
                <div style={{ background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', color: 'var(--color-text-dark)', minHeight: '80px', whiteSpace: 'pre-wrap' }}>
                  {patient.diagnosisDetails || <span className="text-muted" style={{ fontStyle: 'italic' }}>Nessuna nota presente. Premi 'Modifica' per aggiungere appunti.</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Clinical Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem' }}>
              Panoramica Telemetrica Globale
            </h3>
            
            {totalSessions === 0 ? (
              <p className="text-muted text-center" style={{ padding: '2rem 0' }}>
                Il paziente non ha ancora effettuato nessuna sessione.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong>Tendenza Risposte</strong>
                  </div>
                  {/* Progress bar composta */}
                  <div style={{ display: 'flex', height: '24px', borderRadius: 'var(--radius-full)', overflow: 'hidden', border: '2px solid var(--color-text-dark)' }}>
                    <div style={{ width: `${overallAssertivity * 100}%`, background: 'var(--color-assertive)' }} title={`Assertivo: ${Math.round(overallAssertivity*100)}%`} />
                    <div style={{ width: `${overallPassivity * 100}%`, background: 'var(--color-passive)' }} title={`Passivo: ${Math.round(overallPassivity*100)}%`} />
                    <div style={{ width: `${overallImpulsivity * 100}%`, background: 'var(--color-impulsive)' }} title={`Impulsivo: ${Math.round(overallImpulsivity*100)}%`} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--color-assertive)' }}>● Assertivo ({Math.round(overallAssertivity*100)}%)</span>
                    <span style={{ color: 'var(--color-passive)' }}>● Passivo ({Math.round(overallPassivity*100)}%)</span>
                    <span style={{ color: 'var(--color-impulsive)' }}>● Impulsivo ({Math.round(overallImpulsivity*100)}%)</span>
                  </div>
                </div>

                <div className="flex-responsive" style={{ gap: '2rem' }}>
                  <div style={{ flex: 1, background: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>Tempo di Risposta Medio</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-dark)' }}>
                      {(avgResponseTime / 1000).toFixed(1)}s
                    </div>
                  </div>
                  <div style={{ flex: 1, background: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>Tendenza Primaria</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-sky-dark)' }}>
                      {overallAssertivity >= overallImpulsivity && overallAssertivity >= overallPassivity ? 'Assertiva' : 
                       overallImpulsivity >= overallPassivity ? 'Impulsiva' : 'Passiva'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Session History List */}
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem' }}>
              Storico Sessioni
            </h3>
            {totalSessions === 0 ? (
              <p className="text-muted">Nessuno storico disponibile.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {groupedSessions.map(group => (
                  <SessionGroupCard key={group.dateStr} group={group} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
