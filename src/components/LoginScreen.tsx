import React, { useState } from 'react';
import { apiFetch } from '../utils/apiFetch';
import { API_BASE } from '../config';
import AudioManager from '../utils/AudioManager';
import './LoginScreen.css';
import type { AuthRole, AvatarConfig } from '../types';
import { AvatarBuilder } from './AvatarBuilder';

interface LoginScreenProps {
  onSuccess: (role: AuthRole, token: string) => Promise<void> | void;
  onBack: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSuccess, onBack }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role = 'user'; // Hardcoded, only users can register themselves
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState<AvatarConfig | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isRegistering ? `${API_BASE}/api/auth/register` : `${API_BASE}/api/auth/login`;
      const payload = isRegistering ? { email, password, role } : { email, password };
      
      const res = await apiFetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Errore di connessione');

      AudioManager.playClick();
      
      if (isRegistering) {
        if (role === 'user' && !firstName) {
          throw new Error('Il nome del personaggio è obbligatorio per i giocatori.');
        }

        if (role === 'user') {
          // Create the character linked to this email!
          // We can create the patient before they are verified, that's fine.
          const newPatient = {
            id: email,
            firstName,
            lastName,
            avatar,
            consentGiven: true,
            createdAt: new Date().toISOString().split('T')[0]
          };
          await apiFetch('/api/patients', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newPatient)
          });
        }

        // Show success message and go back to menu (do not auto-login because of email verification)
        alert("Registrazione completata! Controlla la tua email per verificare l'account.");
        onBack();
        return; // Don't call onSuccess
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', email)
        localStorage.setItem('authRole', data.role)
        await onSuccess(data.role, data.token);
      }
    } catch (err: any) {
      AudioManager.playError();
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper fade-in">
      <div className="login-container card slide-up">
        <button className="btn btn-secondary" onClick={() => { AudioManager.playClick(); onBack(); }} style={{ position: 'absolute', top: '1rem', left: '1rem', width: 'auto', padding: '0.5rem 1rem' }}>
          ← Indietro
        </button>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-dark)', marginBottom: '0.5rem' }}>
            {isRegistering ? 'Crea Account' : 'Accedi'}
          </h1>
          <p className="text-muted">Inserisci le tue credenziali</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
            <input type="email" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="mario.rossi@email.com" required style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid var(--color-border)'}} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
            <input type="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid var(--color-border)'}} />
          </div>

          {isRegistering && (
            <div style={{ marginTop: '1rem', padding: '1rem', border: '2px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-surface)' }}>
              <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>Crea il tuo Personaggio</h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Nome *</label>
                <input type="text" className="login-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Es. Marco" required style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid var(--color-border)'}} />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Cognome (Opzionale)</label>
                <input type="text" className="login-input" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Es. Rossi" style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid var(--color-border)'}} />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Scegli il tuo Avatar</label>
                <AvatarBuilder onChange={setAvatar} />
              </div>
            </div>
          )}

          {error && (
            <div style={{ color: error.includes('completata') ? 'var(--color-assertive)' : 'var(--color-impulsive)', textAlign: 'center', fontWeight: 'bold' }}>
              {error}
            </div>
          )}
          
          <button type="submit" className="btn btn-game" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Attendere...' : (isRegistering ? 'Registrati' : 'Accedi')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button type="button" onClick={() => { setError(''); setIsRegistering(!isRegistering); }} style={{ background: 'none', border: 'none', color: 'var(--color-text-light)', cursor: 'pointer', textDecoration: 'underline' }}>
            {isRegistering ? 'Hai già un account? Accedi' : 'Non hai un account? Registrati'}
          </button>
        </div>
      </div>
    </div>
  );
};
