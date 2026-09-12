import React, { useState, useEffect } from 'react';
import type { AvatarConfig } from '../types';
import { PatientAvatar } from './PatientAvatar';
import AudioManager from '../utils/AudioManager';

interface AvatarBuilderProps {
  initialConfig?: AvatarConfig;
  onChange: (config: AvatarConfig) => void;
}

export const AvatarBuilder: React.FC<AvatarBuilderProps> = ({ initialConfig, onChange }) => {
  const [gender, setGender] = useState<'boy' | 'girl'>(initialConfig?.gender || 'boy');
  const [seedNum, setSeedNum] = useState<number>(1);

  useEffect(() => {
    onChange({ gender, seed: `${gender}-${seedNum}` });
  }, [gender, seedNum, onChange]);

  const randomize = () => {
    AudioManager.playClick();
    setSeedNum(prev => prev + 1);
  };

  const handleGenderSelect = (g: 'boy' | 'girl') => {
    AudioManager.playClick();
    setGender(g);
    setSeedNum(1); // Reset to first variant
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
      
      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        <button 
          type="button"
          className={`btn ${gender === 'boy' ? 'btn-primary' : 'btn-secondary'}`} 
          style={{ flex: 1, padding: '1rem', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
          onClick={() => handleGenderSelect('boy')}
        >
          <span style={{ fontSize: '2rem' }}>👦</span>
          Maschio
        </button>
        <button 
          type="button"
          className={`btn ${gender === 'girl' ? 'btn-primary' : 'btn-secondary'}`} 
          style={{ flex: 1, padding: '1rem', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
          onClick={() => handleGenderSelect('girl')}
        >
          <span style={{ fontSize: '2rem' }}>👧</span>
          Femmina
        </button>
      </div>

      <div style={{ position: 'relative', width: 180, height: 180, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-sky-dark), var(--color-passive))', border: '4px solid var(--color-text-dark)', boxShadow: '6px 6px 0px 0px var(--color-text-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <PatientAvatar config={{ gender, seed: `${gender}-${seedNum}` }} size={160} />
      </div>

      <button 
        type="button"
        className="btn btn-game" 
        onClick={randomize}
        style={{ width: '100%', fontSize: '1.1rem', background: 'var(--color-sun)', color: 'var(--color-text-dark)' }}
      >
        🎲 Cambia Aspetto
      </button>

    </div>
  );
};
