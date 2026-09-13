import React from 'react';
import type { AvatarConfig } from '../types';

interface PatientAvatarProps {
  config: AvatarConfig;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const PatientAvatar: React.FC<PatientAvatarProps> = ({ config, size = 150, className, style }) => {
  const skinTone = config.skinTone || '#FFC8A2';
  const hairColor = config.hairColor || '#4A3B32';
  const topColor = config.topColor || '#4E89FF';
  const bottomColor = config.bottomColor || '#1A237E';
  const shoesColor = config.shoesColor || '#FFFFFF';
  
  const gender = config.gender || 'boy';
  const hairStyle = config.hairStyle || (gender === 'boy' ? 'short' : 'long');
  const topStyle = config.topStyle || 'tshirt';
  const bottomStyle = config.bottomStyle || (gender === 'boy' ? 'pants' : 'skirt');

  // Darker shades for outlines/shadows
  const skinOutline = shadeColor(skinTone, -30);
  const hairOutline = shadeColor(hairColor, -40);
  const topOutline = shadeColor(topColor, -30);
  const bottomOutline = shadeColor(bottomColor, -30);
  const shoesOutline = shadeColor(shoesColor, -40);

  return (
    <svg 
      width={size} 
      height={size * 1.5} 
      viewBox="0 0 200 300" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0px 8px 12px rgba(0,0,0,0.15))', ...style }}
    >
      <g id="avatar">
        {/* BACK HAIR (for long hair / ponytail) */}
        {hairStyle === 'long' && (
          <path d="M 60 70 C 40 100 40 180 50 200 C 60 170 70 120 70 120 C 70 120 130 120 130 120 C 130 120 140 170 150 200 C 160 180 160 100 140 70 Z" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
        )}
        {hairStyle === 'ponytail' && (
          <path d="M 120 70 C 160 60 180 90 170 140 C 160 180 140 160 140 140 C 140 110 130 90 120 90 Z" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
        )}

        {/* LEGS */}
        <g id="legs">
          {/* Left Leg */}
          <path d="M 85 190 L 80 270 L 95 270 L 100 190 Z" fill={skinTone} stroke={skinOutline} strokeWidth="2" strokeLinejoin="round"/>
          {/* Right Leg */}
          <path d="M 115 190 L 120 270 L 105 270 L 100 190 Z" fill={skinTone} stroke={skinOutline} strokeWidth="2" strokeLinejoin="round"/>
        </g>

        {/* BOTTOMS */}
        <g id="bottoms">
          {bottomStyle === 'pants' && (
             <path d="M 75 180 Q 100 190 125 180 L 125 265 L 102 265 L 100 200 L 98 265 L 75 265 Z" fill={bottomColor} stroke={bottomOutline} strokeWidth="3" strokeLinejoin="round"/>
          )}
          {bottomStyle === 'shorts' && (
             <path d="M 75 180 Q 100 190 125 180 L 128 220 L 102 220 L 100 190 L 98 220 L 72 220 Z" fill={bottomColor} stroke={bottomOutline} strokeWidth="3" strokeLinejoin="round"/>
          )}
          {bottomStyle === 'skirt' && (
             <path d="M 75 180 Q 100 190 125 180 L 135 220 Q 100 225 65 220 Z" fill={bottomColor} stroke={bottomOutline} strokeWidth="3" strokeLinejoin="round"/>
          )}
        </g>

        {/* SHOES */}
        <g id="shoes">
          {/* Left Shoe */}
          <path d="M 75 265 C 75 265 65 275 65 285 L 95 285 L 95 265 Z" fill={shoesColor} stroke={shoesOutline} strokeWidth="2" strokeLinejoin="round"/>
          <path d="M 65 285 Q 80 290 95 285" fill="none" stroke={shoesOutline} strokeWidth="2"/>
          {/* Right Shoe */}
          <path d="M 125 265 C 125 265 135 275 135 285 L 105 285 L 105 265 Z" fill={shoesColor} stroke={shoesOutline} strokeWidth="2" strokeLinejoin="round"/>
          <path d="M 135 285 Q 120 290 105 285" fill="none" stroke={shoesOutline} strokeWidth="2"/>
        </g>

        {/* ARMS (Back layer, behind torso if we want, or side) */}
        <g id="arms-back">
          {/* Left Arm */}
          <path d="M 65 140 Q 55 180 60 210 Q 65 220 70 215 L 75 200 Q 70 170 75 140 Z" fill={skinTone} stroke={skinOutline} strokeWidth="2" strokeLinejoin="round"/>
          {/* Right Arm */}
          <path d="M 135 140 Q 145 180 140 210 Q 135 220 130 215 L 125 200 Q 130 170 125 140 Z" fill={skinTone} stroke={skinOutline} strokeWidth="2" strokeLinejoin="round"/>
        </g>

        {/* TORSO & TOPS */}
        <g id="torso">
          {/* Neck */}
          <path d="M 90 110 L 110 110 L 110 130 L 90 130 Z" fill={skinTone} stroke={skinOutline} strokeWidth="2"/>
          
          {topStyle === 'tshirt' && (
             <g>
               <path d="M 80 125 Q 100 135 120 125 L 135 140 Q 130 190 125 185 Q 100 190 75 185 Q 70 190 65 140 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               {/* Sleeves */}
               <path d="M 65 140 Q 55 150 50 160 L 60 165 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               <path d="M 135 140 Q 145 150 150 160 L 140 165 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
             </g>
          )}
          {topStyle === 'hoodie' && (
             <g>
               {/* Hoodie Body */}
               <path d="M 75 120 Q 100 130 125 120 L 140 145 Q 135 190 130 195 Q 100 200 70 195 Q 65 190 60 145 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               {/* Hoodie Pocket */}
               <path d="M 80 170 L 120 170 L 130 190 Q 100 195 70 190 Z" fill={topColor} stroke={topOutline} strokeWidth="2" strokeLinejoin="round"/>
               {/* Long Sleeves */}
               <path d="M 60 145 Q 45 180 50 205 L 65 200 Q 60 170 70 150 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               <path d="M 140 145 Q 155 180 150 205 L 135 200 Q 140 170 130 150 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               {/* Drawstrings */}
               <path d="M 90 130 L 90 160 M 110 130 L 110 160" fill="none" stroke={topOutline} strokeWidth="2" strokeLinecap="round"/>
             </g>
          )}
          {topStyle === 'sweater' && (
             <g>
               <path d="M 75 125 Q 100 135 125 125 L 135 140 Q 130 190 125 185 Q 100 190 75 185 Q 70 190 65 140 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               {/* Sweater texture lines */}
               <path d="M 85 135 L 85 185 M 100 135 L 100 185 M 115 135 L 115 185" fill="none" stroke={topOutline} strokeWidth="1" opacity="0.3"/>
               {/* Long Sleeves */}
               <path d="M 65 140 Q 50 175 55 200 L 70 195 Q 65 165 75 145 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               <path d="M 135 140 Q 150 175 145 200 L 130 195 Q 135 165 125 145 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
             </g>
          )}
        </g>

        {/* HEAD & FACE */}
        <g id="head">
          {/* Ears */}
          <ellipse cx="65" cy="95" rx="8" ry="12" fill={skinTone} stroke={skinOutline} strokeWidth="2"/>
          <ellipse cx="135" cy="95" rx="8" ry="12" fill={skinTone} stroke={skinOutline} strokeWidth="2"/>
          
          {/* Face Base */}
          <path d="M 70 60 C 70 30 130 30 130 60 L 135 90 C 135 120 115 130 100 130 C 85 130 65 120 65 90 Z" fill={skinTone} stroke={skinOutline} strokeWidth="2"/>
          
          {/* Eyes */}
          <ellipse cx="85" cy="90" rx="6" ry="8" fill="#FFFFFF" stroke={skinOutline} strokeWidth="1"/>
          <circle cx="85" cy="90" r="3" fill="#222222"/>
          
          <ellipse cx="115" cy="90" rx="6" ry="8" fill="#FFFFFF" stroke={skinOutline} strokeWidth="1"/>
          <circle cx="115" cy="90" r="3" fill="#222222"/>

          {gender === 'girl' && (
            <g>
              {/* Eyelashes */}
              <path d="M 78 85 Q 75 80 72 82 M 122 85 Q 125 80 128 82" fill="none" stroke="#222222" strokeWidth="1.5" strokeLinecap="round"/>
              {/* Cheeks */}
              <ellipse cx="75" cy="100" rx="6" ry="3" fill="#FF8A8A" opacity="0.5"/>
              <ellipse cx="125" cy="100" rx="6" ry="3" fill="#FF8A8A" opacity="0.5"/>
            </g>
          )}

          {/* Eyebrows */}
          <path d="M 78 78 Q 85 75 92 78 M 108 78 Q 115 75 122 78" fill="none" stroke={hairColor} strokeWidth="3" strokeLinecap="round"/>
          
          {/* Nose */}
          <path d="M 100 95 Q 102 100 98 102" fill="none" stroke={skinOutline} strokeWidth="2" strokeLinecap="round"/>
          
          {/* Mouth */}
          <path d="M 92 112 Q 100 118 108 112" fill="none" stroke={skinOutline} strokeWidth="2" strokeLinecap="round"/>
        </g>

        {/* FRONT HAIR */}
        <g id="hair-front">
          {hairStyle === 'short' && (
            <path d="M 65 75 C 65 35 135 35 135 75 C 135 75 125 55 100 55 C 75 55 65 75 65 75 Z" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
          )}
          {hairStyle === 'spiky' && (
            <path d="M 65 75 L 75 30 L 85 50 L 100 20 L 115 50 L 125 30 L 135 75 C 135 75 125 60 100 60 C 75 60 65 75 65 75 Z" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
          )}
          {hairStyle === 'curly' && (
            <path d="M 60 70 C 60 40 80 20 100 20 C 120 20 140 40 140 70 C 140 80 135 90 125 95 C 115 100 85 100 75 95 C 65 90 60 80 60 70 Z M 70 70 C 75 55 100 50 130 70" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
          )}
          {hairStyle === 'long' && (
            <path d="M 65 75 C 65 40 135 40 135 75 C 135 75 125 60 100 60 C 75 60 65 75 65 75 Z" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
          )}
          {hairStyle === 'ponytail' && (
            <path d="M 65 75 C 65 35 135 35 135 75 C 135 75 125 55 100 55 C 75 55 65 75 65 75 Z" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
          )}
          {/* Bald has no front hair */}
        </g>
      </g>
    </svg>
  );
};

// Helper function to darken/lighten a hex color for outlines
function shadeColor(color: string, percent: number) {
  let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);

  R = parseInt((R * (100 + percent) / 100).toString());
  G = parseInt((G * (100 + percent) / 100).toString());
  B = parseInt((B * (100 + percent) / 100).toString());

  R = (R < 255) ? R : 255;  
  G = (G < 255) ? G : 255;  
  B = (B < 255) ? B : 255;  
  
  R = (R > 0) ? R : 0;
  G = (G > 0) ? G : 0;
  B = (B > 0) ? B : 0;

  const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
  const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
  const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

  return "#" + RR + GG + BB;
}
