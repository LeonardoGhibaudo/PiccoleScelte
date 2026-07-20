import React from 'react';
import type { AvatarConfig } from '../types';

interface PatientAvatarProps {
  config: AvatarConfig;
  size?: number;
  className?: string;
}

export const PatientAvatar: React.FC<PatientAvatarProps> = ({ config, size = 100, className }) => {
  const skin = config.skinTone || '#fcd2bc';
  const hairColor = config.hairColor || '#4a3022';
  const shirtColor = config.shirtColor || '#1982c4';
  const pantsColor = config.pantsColor || '#3f37c9';
  const shoesColor = config.shoesColor || '#2b2d42';
  const hairStyle = config.hairStyle || 'short';

  // Hair rendered LAST so it's above the head
  const renderHair = () => {
    switch (hairStyle) {
      case 'short':
        // short cap of hair on top of head, above eyes
        return (
          <g>
            {/* Back part */}
            <path d="M22 48 Q22 20 60 20 Q98 20 98 48 L90 48 Q88 30 60 30 Q32 30 30 48 Z" fill={hairColor} />
          </g>
        );
      case 'long':
        return (
          <g>
            {/* Back long hair behind body */}
            <rect x="16" y="48" width="10" height="60" rx="5" fill={hairColor} />
            <rect x="94" y="48" width="10" height="60" rx="5" fill={hairColor} />
            {/* Top */}
            <path d="M22 48 Q22 20 60 20 Q98 20 98 48 L90 48 Q88 30 60 30 Q32 30 30 48 Z" fill={hairColor} />
          </g>
        );
      case 'curly':
        return (
          <g fill={hairColor}>
            <circle cx="30" cy="38" r="12" />
            <circle cx="45" cy="25" r="13" />
            <circle cx="60" cy="22" r="13" />
            <circle cx="75" cy="25" r="13" />
            <circle cx="90" cy="38" r="12" />
            <circle cx="25" cy="50" r="10" />
            <circle cx="95" cy="50" r="10" />
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
      className={className}
      style={{ filter: 'drop-shadow(0px 8px 12px rgba(0,0,0,0.25))' }}
    >
      {/* ── SHOES (drawn first, behind legs) ── */}
      {/* Left shoe */}
      <ellipse cx="43" cy="205" rx="16" ry="8" fill={shoesColor} />
      {/* Right shoe */}
      <ellipse cx="77" cy="205" rx="16" ry="8" fill={shoesColor} />

      {/* ── LEGS / PANTS ── */}
      {/* Left leg */}
      <rect x="33" y="148" width="22" height="58" rx="11" fill={pantsColor} />
      {/* Right leg */}
      <rect x="65" y="148" width="22" height="58" rx="11" fill={pantsColor} />

      {/* ── BODY / SHIRT ── */}
      <rect x="28" y="95" width="64" height="62" rx="14" fill={shirtColor} />

      {/* ── ARMS ── */}
      {/* Left arm */}
      <rect x="10" y="97" width="22" height="50" rx="11" fill={shirtColor} />
      {/* Left hand */}
      <ellipse cx="21" cy="150" rx="10" ry="9" fill={skin} />
      {/* Right arm */}
      <rect x="88" y="97" width="22" height="50" rx="11" fill={shirtColor} />
      {/* Right hand */}
      <ellipse cx="99" cy="150" rx="10" ry="9" fill={skin} />

      {/* ── NECK ── */}
      <rect x="49" y="82" width="22" height="20" rx="8" fill={skin} />

      {/* ── HEAD ── */}
      <ellipse cx="60" cy="60" rx="34" ry="38" fill={skin} />

      {/* ── EARS ── */}
      <ellipse cx="26" cy="62" rx="7" ry="9" fill={skin} />
      <ellipse cx="94" cy="62" rx="7" ry="9" fill={skin} />

      {/* ── EYES ── */}
      <ellipse cx="47" cy="58" rx="5" ry="6" fill="white" />
      <ellipse cx="73" cy="58" rx="5" ry="6" fill="white" />
      <circle cx="48" cy="59" r="3" fill="#222" />
      <circle cx="74" cy="59" r="3" fill="#222" />
      {/* Pupils shine */}
      <circle cx="49" cy="58" r="1" fill="white" />
      <circle cx="75" cy="58" r="1" fill="white" />

      {/* ── EYEBROWS ── */}
      <path d="M42 50 Q47 47 52 50" stroke={hairColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M68 50 Q73 47 78 50" stroke={hairColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* ── NOSE ── */}
      <path d="M58 64 Q55 72 60 74 Q65 72 62 64" stroke={skin} strokeWidth="1.5" fill="none" opacity="0.4" />

      {/* ── MOUTH ── */}
      <path d="M50 80 Q60 88 70 80" stroke="#c0725a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* ── HAIR (on top of head, rendered last) ── */}
      {renderHair()}
    </svg>
  );
};
