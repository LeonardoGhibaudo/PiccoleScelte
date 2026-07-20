/**
 * ===================================================
 * MainMenu.tsx — Schermata iniziale stile videogioco
 * ===================================================
 * Ispirato a Life is Strange: sfondo a schermo intero,
 * titolo del gioco in overlay, "clicca per iniziare",
 * e poi menu animato con le opzioni.
 */
import React, { useState } from 'react';
import AudioManager from '../utils/AudioManager';
import './MainMenu.css';

/** Posizioni precompute delle lucciole (evita Math.random in render) */
const FIREFLY_SEED = [
  { left: 12, top: 23, delay: 0.2, dur: 4.1 },
  { left: 78, top: 15, delay: 1.3, dur: 5.2 },
  { left: 34, top: 67, delay: 2.5, dur: 3.5 },
  { left: 91, top: 45, delay: 0.8, dur: 6.0 },
  { left: 56, top: 82, delay: 3.1, dur: 4.8 },
  { left: 8,  top: 52, delay: 1.7, dur: 5.5 },
  { left: 45, top: 11, delay: 4.0, dur: 3.9 },
  { left: 67, top: 73, delay: 0.5, dur: 4.3 },
  { left: 23, top: 39, delay: 2.9, dur: 5.8 },
  { left: 82, top: 61, delay: 1.1, dur: 3.2 },
  { left: 15, top: 88, delay: 3.7, dur: 4.6 },
  { left: 50, top: 30, delay: 0.1, dur: 6.3 },
  { left: 73, top: 95, delay: 2.2, dur: 5.1 },
  { left: 38, top: 48, delay: 4.5, dur: 3.7 },
  { left: 95, top: 20, delay: 1.9, dur: 4.9 },
];

interface MainMenuProps {
  onStartGame: () => void;
  onOpenDashboard: () => void;
  onOpenSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onOpenDashboard,
  onOpenSettings,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  /** Primo click → mostra il menu con animazione e avvia audio */
  const handleFirstClick = () => {
    if (!showMenu) {
      AudioManager.initCtx(); // Inizializza audio
      AudioManager.playBGM(); // Avvia musica
      setShowMenu(true);
    }
  };

  return (
    <div
      className="main-menu"
      onClick={!showMenu ? handleFirstClick : undefined}
    >
      {/* ===== Sfondo a schermo intero ===== */}
      <div className="menu-bg" />
      <div className="menu-overlay" />

      {/* ===== Particelle lucciole ===== */}
      <div className="fireflies">
        {FIREFLY_SEED.map((f, i) => (
          <div
            key={i}
            className="firefly"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.dur}s`,
            }}
          />
        ))}
      </div>

      {/* Audio Controls removed from here, moved to Settings */}

      {/* ===== Logo / Titolo del gioco ===== */}
      <div className={`menu-title-area ${showMenu ? 'moved-up' : ''}`}>
        <h1 className="game-title">
          <span className="title-piccole">Piccole</span>
          <span className="title-scelte">Scelte</span>
        </h1>
        <p className="game-subtitle">Le tue scelte, la tua storia</p>
      </div>

      {/* ===== "Clicca per iniziare" (prima del menu) ===== */}
      {!showMenu && (
        <div className="press-start">
          <span>Clicca per iniziare</span>
        </div>
      )}

      {/* ===== Menu Opzioni (dopo il click) ===== */}
      {showMenu && (
        <nav className="menu-options">
          <button
            className="menu-option option-1"
            onClick={onStartGame}
          >
            <span className="option-icon">🎮</span>
            <span className="option-text">Nuova Avventura</span>
          </button>

          <button
            className="menu-option option-2"
            onClick={onOpenDashboard}
          >
            <span className="option-icon">🩺</span>
            <span className="option-text">Area Terapeuta</span>
          </button>


          <button
            className="menu-option option-4"
            onClick={onOpenSettings}
            style={{ animationDelay: '0.55s' }}
          >
            <span className="option-icon">⚙️</span>
            <span className="option-text">Impostazioni</span>
          </button>
        </nav>
      )}

      {/* ===== Footer ===== */}
      <div className="menu-footer">
        <span>Piccole Scelte © 2026 — Strumento terapeutico ADHD</span>
      </div>
    </div>
  );
};
