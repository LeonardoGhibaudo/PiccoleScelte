import React from 'react';
import type { AvatarConfig } from '../types';

interface PatientAvatarProps {
  config: AvatarConfig;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const PatientAvatar: React.FC<PatientAvatarProps> = ({ config, size = 100, className, style }) => {
  const gender = config.gender || 'boy';
  const skin = config.skinTone || '#fcd2bc';
  const hairColor = config.hairColor || '#4a3022';
  const shirtColor = config.shirtColor || '#1982c4';
  const pantsColor = config.pantsColor || '#3f37c9';
  const shoesColor = config.shoesColor || '#2b2d42';
  const hairStyle = config.hairStyle || (gender === 'boy' ? 'short' : 'long');

  // Helper per disegnare i capelli
  const renderHair = () => {
    switch (hairStyle) {
      case 'short':
        return (
          <g>
            <path d="M22 48 Q22 15 60 15 Q98 15 98 48 L90 48 Q88 25 60 25 Q32 25 30 48 Z" fill={hairColor} />
            <path d="M25 40 Q40 30 50 45" stroke={hairColor} strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        );
      case 'long':
        return (
          <g>
            {/* Capelli dietro (cadono sulle spalle) */}
            <path d="M20 48 Q10 90 25 120 L35 120 Q25 90 30 48 Z" fill={hairColor} />
            <path d="M100 48 Q110 90 95 120 L85 120 Q95 90 90 48 Z" fill={hairColor} />
            {/* Parte superiore */}
            <path d="M20 48 Q20 15 60 15 Q100 15 100 48 L90 48 Q88 25 60 25 Q32 25 30 48 Z" fill={hairColor} />
          </g>
        );
      case 'curly':
        return (
          <g fill={hairColor}>
            <circle cx="30" cy="38" r="14" />
            <circle cx="45" cy="25" r="16" />
            <circle cx="60" cy="20" r="18" />
            <circle cx="75" cy="25" r="16" />
            <circle cx="90" cy="38" r="14" />
            <circle cx="20" cy="55" r="12" />
            <circle cx="100" cy="55" r="12" />
          </g>
        );
      case 'ponytail':
        return (
          <g>
            {/* Coda di cavallo */}
            <path d="M90 35 Q115 45 110 80 Q105 100 95 90 Q110 60 90 45 Z" fill={hairColor} />
            {/* Parte superiore */}
            <path d="M22 48 Q22 15 60 15 Q98 15 98 48 L90 48 Q88 25 60 25 Q32 25 30 48 Z" fill={hairColor} />
          </g>
        );
      case 'bald':
      default:
        return null;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 220"
      xmlns="http://www.w3.org/2000/svg"
      className={className} style={{ filter: "drop-shadow(0px 8px 12px rgba(0,0,0,0.25))", ...style }}
      
    >
      {/* ── BACK HAIR (se i capelli lunghi devono stare dietro al corpo) ── */}
      {hairStyle === 'long' && (
        <g fill={hairColor}>
          <rect x="15" y="48" width="15" height="70" rx="7.5" />
          <rect x="90" y="48" width="15" height="70" rx="7.5" />
        </g>
      )}

      {/* ── SCARPE ── */}
      <path d="M28 200 Q25 210 35 210 L50 210 Q55 205 50 200 Z" fill={shoesColor} />
      <path d="M70 200 Q65 205 70 210 L85 210 Q95 210 92 200 Z" fill={shoesColor} />

      {/* ── GAMBE / PANTALONI / GONNA ── */}
      {gender === 'girl' ? (
        <g>
          {/* Gambe (Pelle) */}
          <rect x="35" y="145" width="16" height="60" rx="8" fill={skin} />
          <rect x="69" y="145" width="16" height="60" rx="8" fill={skin} />
          {/* Gonna */}
          <path d="M25 145 L95 145 L105 170 L15 170 Z" fill={pantsColor} />
        </g>
      ) : (
        <g>
          {/* Pantaloni */}
          <rect x="32" y="145" width="22" height="60" rx="8" fill={pantsColor} />
          <rect x="66" y="145" width="22" height="60" rx="8" fill={pantsColor} />
        </g>
      )}

      {/* ── CORPO / MAGLIETTA ── */}
      {gender === 'girl' ? (
        <path d="M35 95 Q25 110 25 145 L95 145 Q95 110 85 95 Z" fill={shirtColor} />
      ) : (
        <rect x="28" y="95" width="64" height="55" rx="12" fill={shirtColor} />
      )}

      {/* ── BRACCIA E MANI ── */}
      {/* Braccio Sinistro */}
      <rect x="12" y="97" width="18" height="45" rx="9" fill={shirtColor} />
      <circle cx="21" cy="145" r="9" fill={skin} />
      
      {/* Braccio Destro */}
      <rect x="90" y="97" width="18" height="45" rx="9" fill={shirtColor} />
      <circle cx="99" cy="145" r="9" fill={skin} />

      {/* ── COLLO ── */}
      <rect x="50" y="82" width="20" height="20" rx="8" fill={skin} />
      <path d="M50 95 Q60 102 70 95" stroke="rgba(0,0,0,0.1)" strokeWidth="3" fill="none" />

      {/* ── TESTA ── */}
      <ellipse cx="60" cy="55" rx="36" ry="40" fill={skin} />

      {/* ── ORECCHIE ── */}
      <ellipse cx="23" cy="58" rx="6" ry="10" fill={skin} />
      <ellipse cx="97" cy="58" rx="6" ry="10" fill={skin} />

      {/* ── VISO (Occhi, Naso, Bocca, Guance) ── */}
      <g className="face">
        {/* Occhi grandi (stile carino) */}
        <circle cx="44" cy="53" r="6" fill="white" />
        <circle cx="76" cy="53" r="6" fill="white" />
        
        {/* Pupille */}
        <circle cx="45" cy="54" r="3.5" fill="#222" />
        <circle cx="75" cy="54" r="3.5" fill="#222" />
        
        {/* Riflesso luce */}
        <circle cx="46" cy="53" r="1.5" fill="white" />
        <circle cx="74" cy="53" r="1.5" fill="white" />

        {/* Ciglia per le femmine */}
        {gender === 'girl' && (
          <g stroke="#222" strokeWidth="1.5" strokeLinecap="round">
            <path d="M38 50 L34 46" />
            <path d="M82 50 L86 46" />
          </g>
        )}

        {/* Sopracciglia */}
        <path d="M38 42 Q44 38 50 42" stroke={hairColor} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M70 42 Q76 38 82 42" stroke={hairColor} strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Naso (più dolce) */}
        <path d="M57 60 Q60 64 63 60" stroke="rgba(0,0,0,0.15)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Guance rosate */}
        <circle cx="36" cy="62" r="5" fill="#ff6b81" opacity="0.4" />
        <circle cx="84" cy="62" r="5" fill="#ff6b81" opacity="0.4" />

        {/* Bocca sorridente */}
        <path d="M48 72 Q60 85 72 72" stroke="#c0725a" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      {/* ── CAPELLI (Frontali) ── */}
      {renderHair()}
    </svg>
  );
};
