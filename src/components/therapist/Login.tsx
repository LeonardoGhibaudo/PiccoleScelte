import React, { useState } from 'react';

interface LoginProps {
  onLogin: (token: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreedGDPR, setAgreedGDPR] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedGDPR) {
      alert("Devi accettare l'informativa sulla privacy per accedere al gestionale.");
      return;
    }
    // Mock authentication
    if (username === 'admin' && password === 'admin') {
      onLogin('mock-jwt-token-12345');
    } else {
      alert('Credenziali errate. Usa admin/admin');
    }
  };

  return (
    <div className="container fade-in" style={{ maxWidth: '400px', marginTop: '4rem' }}>
      <div className="card glass">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '3rem' }}>🩺</span>
          <h2>Accesso Terapeuta</h2>
          <p className="text-muted">Portale Clinico ADHD Focus</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome Utente</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="admin"
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="admin"
              required 
            />
          </div>
          
          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '0.75rem', marginTop: '1rem', backgroundColor: 'var(--color-primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <input 
              type="checkbox" 
              id="gdpr" 
              checked={agreedGDPR} 
              onChange={e => setAgreedGDPR(e.target.checked)} 
              style={{ marginTop: '0.25rem' }}
            />
            <label htmlFor="gdpr" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
              <strong>Avviso Privacy (GDPR):</strong> Dichiaro di trattare i dati clinici inseriti in conformità al GDPR (UE 2016/679). I dati in questa sessione sono salvati solo localmente. Usa alias per i pazienti.
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
            Accedi al Gestionale
          </button>
        </form>
      </div>
    </div>
  );
};
