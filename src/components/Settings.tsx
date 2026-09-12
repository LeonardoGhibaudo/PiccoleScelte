import React, { useState, useEffect } from 'react';
import AudioManager from '../utils/AudioManager';

interface SettingsProps {
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [bgmVol, setBgmVol] = useState(AudioManager.bgmVolume * 100);
  const [sfxVol, setSfxVol] = useState(AudioManager.sfxVolume * 100);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleBgmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setBgmVol(val);
    AudioManager.setBgmVolume(val / 100);
  };

  const handleSfxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSfxVol(val);
    AudioManager.setSfxVolume(val / 100);
    if (val > 0) AudioManager.playBlip(); // feedback immediato
  };


  return (
    <div className="container fade-in slide-up" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '6rem', paddingBottom: '4rem' }}>
      <button 
        className="btn btn-secondary" 
        onClick={() => { AudioManager.playClick(); onBack(); }}
        style={{ position: 'absolute', top: '2rem', left: '2rem' }}
      >
        ◀ Torna al Menu Principale
      </button>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>⚙️ Impostazioni</h2>

        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>🎵 Volume Musica (BGM)</label>
          <input 
            type="range" 
            min="0" max="100" 
            value={bgmVol} 
            onChange={handleBgmChange}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <div style={{ textAlign: 'right', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
            {bgmVol}%
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '3rem' }}>
          <label style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>🔊 Volume Effetti (SFX)</label>
          <input 
            type="range" 
            min="0" max="100" 
            value={sfxVol} 
            onChange={handleSfxChange}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <div style={{ textAlign: 'right', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
            {sfxVol}%
          </div>
        </div>

        <div style={{ borderTop: '2px solid var(--color-border)', paddingTop: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-dark)' }}>Estetica</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Modalità Notte (Dark Mode)</span>
            <button 
              className="btn btn-primary" 
              onClick={() => { AudioManager.playClick(); setIsDarkMode(!isDarkMode); }}
              style={{ width: '80px', padding: '0.5rem' }}
            >
              {isDarkMode ? '🌙 On' : '☀️ Off'}
            </button>
          </div>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
            Attiva o disattiva il tema scuro per l'intera applicazione.
          </p>
        </div>

      </div>
    </div>
  );
};
