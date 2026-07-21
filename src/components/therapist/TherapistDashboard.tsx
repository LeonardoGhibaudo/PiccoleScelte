import React, { useState } from 'react';
import type { Patient } from '../../types';
import { PatientManager } from './PatientManager';
import AudioManager from '../../utils/AudioManager';

interface TherapistDashboardProps {
  patients: Patient[];
  onAddPatient: (p: Patient) => void;
  onDeletePatient: (id: string) => void;
  onSelectPatient: (p: Patient) => void;
  onLogout: () => void;
}

export const TherapistDashboard: React.FC<TherapistDashboardProps> = (props) => {
  const [promoteEmail, setPromoteEmail] = useState('');
  const [promoteStatus, setPromoteStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePromote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoteEmail) return;
    setLoading(true);
    setPromoteStatus(null);
    try {
      const res = await fetch('/api/auth/promote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: promoteEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Errore durante la promozione');
      
      AudioManager.playClick();
      setPromoteStatus({ type: 'success', msg: data.message });
      setPromoteEmail('');
    } catch (err: any) {
      AudioManager.playError();
      setPromoteStatus({ type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in slide-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)' }}>Pannello di Controllo Clinico</h2>
          <p className="text-muted">Gestione pazienti e scenari terapeutici</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={props.onLogout}>Esci</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* === Admin / Security === */}
        <div className="card slide-up" style={{ padding: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Amministrazione Sicurezza</h3>
          <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Promuovi un collega (che ha già registrato un account base) al ruolo di Terapista.</p>
          
          <form onSubmit={handlePromote} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input 
              type="email" 
              placeholder="Email del collega" 
              value={promoteEmail}
              onChange={(e) => setPromoteEmail(e.target.value)}
              required
              className="login-input"
              style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '2px solid var(--color-border)' }}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Attendere...' : 'Promuovi a Terapista'}
            </button>
          </form>

          {promoteStatus && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              borderRadius: '8px', 
              backgroundColor: promoteStatus.type === 'success' ? 'var(--color-primary)' : 'var(--color-impulsive)',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              {promoteStatus.msg}
            </div>
          )}
        </div>

        <PatientManager 
          patients={props.patients} 
          onAddPatient={props.onAddPatient} 
          onDeletePatient={props.onDeletePatient} 
          onSelectPatient={props.onSelectPatient} 
        />
      </div>
    </div>
  );
};
