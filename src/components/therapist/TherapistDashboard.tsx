import React, { useState } from 'react';
import { apiFetch } from '../../utils/apiFetch';
import { API_BASE } from '../../config';
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
  
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteStatus, setInviteStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [validations, setValidations] = useState<any[]>([]);

  // Carica le richieste di convalida all'avvio
  React.useEffect(() => {
    const fetchValidations = async () => {
      const email = localStorage.getItem('userEmail');
      if (email) {
        try {
          const res = await apiFetch(`/api/validations?therapistEmail=${email}`);
          if (res.ok) {
            const data = await res.json();
            setValidations(data);
          }
        } catch (e) {
          console.error("Failed to load validations", e);
        }
      }
    };
    fetchValidations();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await apiFetch(`/api/validations/${id}/approve`, { method: 'PUT' });
      setValidations(prev => prev.filter(v => v._id !== id));
      AudioManager.playSuccess();
    } catch (e) {
      console.error(e);
      AudioManager.playError();
    }
  };

  const handleReject = async (id: string) => {
    try {
      await apiFetch(`/api/validations/${id}/reject`, { method: 'PUT' });
      setValidations(prev => prev.filter(v => v._id !== id));
      AudioManager.playClick();
    } catch (e) {
      console.error(e);
      AudioManager.playError();
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setLoading(true);
    setInviteStatus(null);
    try {
      const email = localStorage.getItem('userEmail');
      const res = await apiFetch('/api/patients/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientEmail: inviteEmail, therapistEmail: email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Errore durante l\'invito');
      
      AudioManager.playClick();
      setInviteStatus({ type: 'success', msg: data.message });
      setInviteEmail('');
    } catch (err: any) {
      AudioManager.playError();
      setInviteStatus({ type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoteEmail) return;
    setLoading(true);
    setPromoteStatus(null);
    try {
      const res = await apiFetch('/api/auth/promote', {
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
        
        {/* === Invite Patient === */}
        <div className="card slide-up" style={{ padding: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Associa Paziente</h3>
          <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Invita un paziente tramite email per associarlo al tuo profilo. Riceverà una notifica per registrarsi.</p>
          
          <form onSubmit={handleInvite} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input 
              type="email" 
              placeholder="Email del paziente" 
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
              className="login-input"
              style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '2px solid var(--color-border)' }}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Attendere...' : 'Invia Invito'}
            </button>
          </form>

          {inviteStatus && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              borderRadius: '8px', 
              backgroundColor: inviteStatus.type === 'success' ? 'var(--color-primary)' : 'var(--color-impulsive)',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              {inviteStatus.msg}
            </div>
          )}
        </div>

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

        {/* === Richieste di Convalida === */}
        <div className="card slide-up" style={{ padding: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Richieste di Convalida ({validations.length})</h3>
          <p className="text-muted" style={{ marginBottom: '1.5rem' }}>I tuoi pazienti attendono che tu legga le loro riflessioni prima di poter sbloccare il prossimo capitolo.</p>
          
          {validations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-light)' }}>
              Nessuna richiesta in sospeso.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {validations.map(val => (
                <div key={val._id} style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1rem', background: 'var(--color-surface)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: 18 }}>
                    <strong>Paziente: {val.patientName}</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>{new Date(val.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ background: 'var(--color-primary)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>Capitolo: {val.scenarioTitle}</span>
                  </div>
                  <div style={{ padding: '1rem', borderRadius: '4px', fontStyle: 'italic', marginBottom: '1rem' }}>
                    <h3>Capitolo:</h3>
                    <h5 style={{marginTop: '1rem'}}>{val.scenarioTitle}</h5>
                  </div>
                 <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem', borderRadius: '4px', fontStyle: 'italic', marginBottom: '1rem' }}>
                    {val.reflectionText ? `"${val.reflectionText}"` : "Nessun testo inviato."}
                  </div>
                  {val.imageUrl && (
                    <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                      <img src={val.imageUrl} alt="Caricata dal paziente" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', border: '2px solid var(--color-border)' }} />
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button className="btn btn-secondary" onClick={() => handleReject(val._id)}>Rifiuta (Fai Rigiocare)</button>
                    <button className="btn btn-primary" onClick={() => handleApprove(val._id)}>Approva e Sblocca ✅</button>
                  </div>
                </div>
              ))}
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
