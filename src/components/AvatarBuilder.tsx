import React, { useState, useEffect } from 'react';
import type { AvatarConfig } from '../types';
import { PatientAvatar } from './PatientAvatar';

interface AvatarBuilderProps {
  initialConfig?: AvatarConfig;
  onChange: (config: AvatarConfig) => void;
}

const SKIN_TONES = ['#fcd2bc', '#e0ac69', '#c68642', '#8d5524', '#3d2218'];
const HAIR_COLORS = ['#000000', '#4a3022', '#8c593b', '#cc8c47', '#ffdb58', '#b55239', '#e0e0e0'];
const SHIRT_COLORS = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#808080', '#ffffff'];
const PANTS_COLORS = ['#3a5a40', '#3f37c9', '#560bad', '#000000', '#b5c99a'];
const SHOES_COLORS = ['#2b2d42', '#8d99ae', '#ef233c', '#ffffff', '#000000'];
const HAIR_STYLES = ['short', 'long', 'curly', 'bald'];

export const AvatarBuilder: React.FC<AvatarBuilderProps> = ({ initialConfig, onChange }) => {
  const [config, setConfig] = useState<AvatarConfig>(initialConfig || {
    skinTone: SKIN_TONES[0],
    hairColor: HAIR_COLORS[1],
    shirtColor: SHIRT_COLORS[3],
    pantsColor: PANTS_COLORS[1],
    shoesColor: SHOES_COLORS[0],
    hairStyle: HAIR_STYLES[0]
  });

  // Notifica i cambiamenti al parent
  useEffect(() => {
    onChange(config);
  }, [config, onChange]);

  const updateConfig = (key: keyof AvatarConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="avatar-builder" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(244, 114, 182, 0.4)',
          borderRadius: '50%', 
          padding: '1.5rem', 
          display: 'inline-block',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <PatientAvatar config={config} size={180} />
        </div>
        <p style={{ marginTop: '1rem', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Anteprima Profilo
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {/* Skin Tone */}
        <div className="col-12 col-md-6">
          <label className="form-label fw-bold">Colore Pelle</label>
          <div className="d-flex flex-wrap gap-2">
            {SKIN_TONES.map(color => (
              <button
                key={color}
                type="button"
                className="btn p-0"
                style={{
                  width: '30px', height: '30px', borderRadius: '50%', backgroundColor: color,
                  border: config.skinTone === color ? '3px solid var(--color-sky-dark)' : '1px solid rgba(255,255,255,0.2)'
                }}
                onClick={() => updateConfig('skinTone', color)}
              />
            ))}
          </div>
        </div>

        {/* Hair Color */}
        <div className="col-12 col-md-6">
          <label className="form-label fw-bold">Colore Capelli</label>
          <div className="d-flex flex-wrap gap-2">
            {HAIR_COLORS.map(color => (
              <button
                key={color}
                type="button"
                className="btn p-0"
                style={{
                  width: '30px', height: '30px', borderRadius: '50%', backgroundColor: color,
                  border: config.hairColor === color ? '3px solid var(--color-sky-dark)' : '1px solid rgba(255,255,255,0.2)'
                }}
                onClick={() => updateConfig('hairColor', color)}
              />
            ))}
          </div>
        </div>

        {/* Hair Style */}
        <div className="col-12 col-md-6">
          <label className="form-label fw-bold">Stile Capelli</label>
          <select 
            className="form-select" 
            value={config.hairStyle}
            onChange={(e) => updateConfig('hairStyle', e.target.value)}
          >
            <option value="short">Corti</option>
            <option value="long">Lunghi</option>
            <option value="curly">Ricci</option>
            <option value="bald">Rasati</option>
          </select>
        </div>

        {/* Shirt Color */}
        <div className="col-12 col-md-6">
          <label className="form-label fw-bold">Colore Maglietta</label>
          <div className="d-flex flex-wrap gap-2">
            {SHIRT_COLORS.map(color => (
              <button
                key={color}
                type="button"
                className="btn p-0"
                style={{
                  width: '30px', height: '30px', borderRadius: '50%', backgroundColor: color,
                  border: config.shirtColor === color ? '3px solid var(--color-sky-dark)' : '1px solid rgba(255,255,255,0.2)'
                }}
                onClick={() => updateConfig('shirtColor', color)}
              />
            ))}
          </div>
        </div>

        {/* Pants Color */}
        <div className="col-12 col-md-6">
          <label className="form-label fw-bold">Colore Pantaloni</label>
          <div className="d-flex flex-wrap gap-2">
            {PANTS_COLORS.map(color => (
              <button
                key={color}
                type="button"
                className="btn p-0"
                style={{
                  width: '30px', height: '30px', borderRadius: '50%', backgroundColor: color,
                  border: config.pantsColor === color ? '3px solid var(--color-sky-dark)' : '1px solid rgba(255,255,255,0.2)'
                }}
                onClick={() => updateConfig('pantsColor', color)}
              />
            ))}
          </div>
        </div>

        {/* Shoes Color */}
        <div className="col-12 col-md-6">
          <label className="form-label fw-bold">Colore Scarpe</label>
          <div className="d-flex flex-wrap gap-2">
            {SHOES_COLORS.map(color => (
              <button
                key={color}
                type="button"
                className="btn p-0"
                style={{
                  width: '30px', height: '30px', borderRadius: '50%', backgroundColor: color,
                  border: config.shoesColor === color ? '3px solid var(--color-sky-dark)' : '1px solid rgba(255,255,255,0.2)'
                }}
                onClick={() => updateConfig('shoesColor', color)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
