import React, { useState } from 'react';
import AudioManager from '../utils/AudioManager';
import './LoginScreen.css';

interface LoginScreenProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSuccess, onBack }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '0000') {
      AudioManager.playClick();
      onSuccess();
    } else {
      AudioManager.playError();
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="login-wrapper fade-in">
      <div className="login-container card slide-up">
        <button className="btn btn-secondary" onClick={() => { AudioManager.playClick(); onBack(); }} style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.5rem 1rem' }}>
          ← Indietro
        </button>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-dark)', marginBottom: '0.5rem' }}>Area Terapeutica</h1>
          <p className="text-muted">Inserisci il PIN per accedere</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <input
            type="password"
            className={`login-input ${error ? 'error shake' : ''}`}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="****"
            maxLength={4}
            autoFocus
          />
          {error && <span style={{ color: 'var(--color-impulsive)' }}>PIN errato. Riprova.</span>}
          
          <button type="submit" className="btn btn-game" style={{ width: '100%', maxWidth: '200px' }}>
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
};
