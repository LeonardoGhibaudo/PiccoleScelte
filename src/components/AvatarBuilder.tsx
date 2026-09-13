import React, { useState, useEffect } from 'react';
import type { AvatarConfig } from '../types';
import { PatientAvatar } from './PatientAvatar';
import AudioManager from '../utils/AudioManager';

interface AvatarBuilderProps {
  initialConfig?: AvatarConfig;
  onChange: (config: AvatarConfig) => void;
}

const SKIN_COLORS = ['#FFC8A2', '#E09F7D', '#9D6C4F', '#6B4A34', '#422A1E'];
const HAIR_COLORS = ['#FFDE59', '#D35400', '#8B4513', '#4A3B32', '#1A1A1A'];
const TOP_COLORS = ['#FF5757', '#4E89FF', '#7ED957', '#FFDE59', '#8C52FF', '#FFFFFF'];
const BOTTOM_COLORS = ['#1A237E', '#4A90E2', '#333333', '#A0A0A0', '#8B4513'];
const SHOE_COLORS = ['#FFFFFF', '#000000', '#FF5757', '#4A90E2'];

export const AvatarBuilder: React.FC<AvatarBuilderProps> = ({ initialConfig, onChange }) => {
  const [config, setConfig] = useState<AvatarConfig>({
    gender: initialConfig?.gender || 'boy',
    skinTone: initialConfig?.skinTone || '#FFC8A2',
    hairStyle: initialConfig?.hairStyle || 'short',
    hairColor: initialConfig?.hairColor || '#4A3B32',
    topStyle: initialConfig?.topStyle || 'tshirt',
    topColor: initialConfig?.topColor || '#4E89FF',
    bottomStyle: initialConfig?.bottomStyle || 'pants',
    bottomColor: initialConfig?.bottomColor || '#1A237E',
    shoesColor: initialConfig?.shoesColor || '#FFFFFF',
  });

  useEffect(() => {
    onChange(config);
  }, [config, onChange]);

  const updateConfig = (updates: Partial<AvatarConfig>) => {
    AudioManager.playClick();
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const ColorRow = ({ label, options, current, field }: { label: string, options: string[], current: string, field: keyof AvatarConfig }) => (
    <div style={{ marginBottom: '1rem', width: '100%' }}>
      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-text-dark)' }}>{label}</div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {options.map(color => (
          <button
            key={color}
            type="button"
            onClick={() => updateConfig({ [field]: color })}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: color,
              border: current === color ? '3px solid var(--color-text-dark)' : '2px solid rgba(0,0,0,0.2)',
              cursor: 'pointer',
              transform: current === color ? 'scale(1.1)' : 'none',
              transition: 'transform 0.1s ease',
              boxShadow: current === color ? '2px 2px 0px 0px var(--color-text-dark)' : 'none'
            }}
          />
        ))}
      </div>
    </div>
  );

  const SelectRow = ({ label, options, current, field }: { label: string, options: {value: string, label: string}[], current: string, field: keyof AvatarConfig }) => (
    <div style={{ marginBottom: '1rem', width: '100%' }}>
      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-text-dark)' }}>{label}</div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            className={`btn ${current === opt.value ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => updateConfig({ [field]: opt.value as any })}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', flex: 1, minWidth: '80px' }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
      
      {/* Avatar Preview */}
      <div style={{ position: 'relative', width: 220, height: 260, borderRadius: 'var(--radius-xl)', background: 'linear-gradient(135deg, var(--color-sky-light), var(--color-sky-dark))', border: '4px solid var(--color-text-dark)', boxShadow: '6px 6px 0px 0px var(--color-text-dark)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', paddingBottom: '10px' }}>
        <PatientAvatar config={config} size={200} />
      </div>

      <div style={{ width: '100%', background: 'white', padding: '1rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-text-dark)' }}>
        
        <SelectRow 
          label="Sesso" 
          field="gender" 
          current={config.gender!} 
          options={[{value: 'boy', label: 'Maschio'}, {value: 'girl', label: 'Femmina'}]} 
        />
        
        <ColorRow label="Pelle" field="skinTone" current={config.skinTone!} options={SKIN_COLORS} />
        
        <SelectRow 
          label="Capelli" 
          field="hairStyle" 
          current={config.hairStyle!} 
          options={[
            {value: 'short', label: 'Corti'},
            {value: 'long', label: 'Lunghi'},
            {value: 'curly', label: 'Ricci'},
            {value: 'ponytail', label: 'Coda'},
            {value: 'spiky', label: 'A Spazzola'},
            {value: 'bald', label: 'Rasati'}
          ]} 
        />
        <ColorRow label="Colore Capelli" field="hairColor" current={config.hairColor!} options={HAIR_COLORS} />
        
        <SelectRow 
          label="Maglia" 
          field="topStyle" 
          current={config.topStyle!} 
          options={[
            {value: 'tshirt', label: 'T-Shirt'},
            {value: 'hoodie', label: 'Felpa'},
            {value: 'sweater', label: 'Maglione'}
          ]} 
        />
        <ColorRow label="Colore Maglia" field="topColor" current={config.topColor!} options={TOP_COLORS} />
        
        <SelectRow 
          label="Pantaloni/Gonna" 
          field="bottomStyle" 
          current={config.bottomStyle!} 
          options={[
            {value: 'pants', label: 'Lunghi'},
            {value: 'shorts', label: 'Corti'},
            {value: 'skirt', label: 'Gonna'}
          ]} 
        />
        <ColorRow label="Colore Sotto" field="bottomColor" current={config.bottomColor!} options={BOTTOM_COLORS} />
        
        <ColorRow label="Scarpe" field="shoesColor" current={config.shoesColor!} options={SHOE_COLORS} />
      </div>
    </div>
  );
};
