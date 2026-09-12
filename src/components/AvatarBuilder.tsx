import React, { useState, useEffect } from 'react';
import type { AvatarConfig } from '../types';
import { PatientAvatar } from './PatientAvatar';
import AudioManager from '../utils/AudioManager';

interface AvatarBuilderProps {
  initialConfig?: AvatarConfig;
  onChange: (config: AvatarConfig) => void;
}

const SKIN_TONES = ['#fcd2bc', '#e0ac69', '#c68642', '#8d5524', '#3d2218'];
const HAIR_COLORS = ['#000000', '#4a3022', '#8c593b', '#cc8c47', '#ffdb58', '#b55239', '#e0e0e0'];
const SHIRT_COLORS = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#808080', '#ffffff'];
const PANTS_COLORS = ['#3a5a40', '#3f37c9', '#560bad', '#000000', '#b5c99a', '#ff99c8'];

export const AvatarBuilder: React.FC<AvatarBuilderProps> = ({ initialConfig, onChange }) => {
  const [config, setConfig] = useState<AvatarConfig>(initialConfig || {
    gender: 'boy',
    skinTone: SKIN_TONES[0],
    hairColor: HAIR_COLORS[1],
    shirtColor: SHIRT_COLORS[3],
    pantsColor: PANTS_COLORS[1],
    shoesColor: '#2b2d42',
    hairStyle: 'short'
  });

  useEffect(() => {
    onChange(config);
  }, [config, onChange]);

  const updateConfig = (key: keyof AvatarConfig, value: string) => {
    AudioManager.playHover();
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleGenderSelect = (g: 'boy' | 'girl') => {
    AudioManager.playClick();
    setConfig(prev => ({
      ...prev,
      gender: g,
      hairStyle: g === 'boy' ? 'short' : 'long',
      shirtColor: g === 'girl' ? '#ff99c8' : '#1982c4',
      pantsColor: g === 'girl' ? '#9c89b8' : '#3f37c9'
    }));
  };

  const toggleHairStyle = () => {
    AudioManager.playHover();
    const styles = config.gender === 'boy' ? ['short', 'curly', 'bald'] : ['long', 'ponytail', 'short', 'curly'];
    const currentIdx = styles.indexOf(config.hairStyle || 'short');
    const nextIdx = (currentIdx + 1) % styles.length;
    setConfig(prev => ({ ...prev, hairStyle: styles[nextIdx] }));
  };

  // Color picker circolare semplice
  const ColorRow = ({ label, colors, field }: { label: string, colors: string[], field: keyof AvatarConfig }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', justifyContent: 'space-between' }}>
      <span style={{ fontWeight: 600, fontSize: '0.95rem', minWidth: '70px' }}>{label}</span>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: 1 }}>
        {colors.map(c => (
          <button
            key={c}
            type="button"
            onClick={() => updateConfig(field, c)}
            style={{
              width: 30, height: 30, borderRadius: '50%', background: c,
              border: config[field] === c ? '3px solid var(--color-text-dark)' : '2px solid rgba(0,0,0,0.1)',
              transform: config[field] === c ? 'scale(1.1)' : 'scale(1)',
              cursor: 'pointer', transition: 'all 0.2s', padding: 0
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
      
      {/* GENERE */}
      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        <button 
          type="button"
          className={`btn ${config.gender === 'boy' ? 'btn-primary' : 'btn-secondary'}`} 
          style={{ flex: 1, padding: '0.75rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          onClick={() => handleGenderSelect('boy')}
        >
          <span>👦</span> Maschio
        </button>
        <button 
          type="button"
          className={`btn ${config.gender === 'girl' ? 'btn-primary' : 'btn-secondary'}`} 
          style={{ flex: 1, padding: '0.75rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          onClick={() => handleGenderSelect('girl')}
        >
          <span>👧</span> Femmina
        </button>
      </div>

      {/* AVATAR PREVIEW */}
      <div style={{ position: 'relative', width: 180, height: 180, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-sky-dark), var(--color-passive))', border: '4px solid var(--color-text-dark)', boxShadow: '6px 6px 0px 0px var(--color-text-dark)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
        <PatientAvatar config={config} size={150} style={{ transform: 'translateY(15px)' }} />
      </div>

      {/* CONTROLLI (Semplici bottoni colore) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', background: 'var(--panel-bg)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--panel-border)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Taglio Capelli</span>
          <button type="button" className="btn btn-secondary" onClick={toggleHairStyle} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', width: 'auto' }}>
            🔄 Cambia Stile
          </button>
        </div>

        <ColorRow label="Pelle" colors={SKIN_TONES} field="skinTone" />
        <ColorRow label="Capelli" colors={HAIR_COLORS} field="hairColor" />
        <ColorRow label="Maglia" colors={SHIRT_COLORS} field="shirtColor" />
        <ColorRow label={config.gender === 'girl' ? "Gonna" : "Pantaloni"} colors={PANTS_COLORS} field="pantsColor" />
        
      </div>
    </div>
  );
};
