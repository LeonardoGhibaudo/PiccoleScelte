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
        {/* BACK HAIR */}
        {hairStyle === 'long' && (
          <path d="M 50 90 C 35 150 40 240 50 250 C 65 220 70 150 70 150 L 130 150 C 130 150 135 220 150 250 C 160 240 165 150 150 90 Z" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
        )}
        {hairStyle === 'ponytail' && (
          <path d="M 130 80 C 190 60 190 140 170 190 C 150 210 140 170 140 150 C 140 120 130 100 130 80 Z" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
        )}

        {/* LEGS */}
        <g id="legs">
          {/* Left Leg */}
          <path d="M 82 220 L 80 285 C 80 295 98 295 98 285 L 98 220 Z" fill={skinTone} stroke={skinOutline} strokeWidth="2" strokeLinejoin="round"/>
          {/* Right Leg */}
          <path d="M 102 220 L 102 285 C 102 295 120 295 120 285 L 118 220 Z" fill={skinTone} stroke={skinOutline} strokeWidth="2" strokeLinejoin="round"/>
        </g>

        {/* BOTTOMS */}
        <g id="bottoms">
          {bottomStyle === 'pants' && (
             <path d="M 78 222 Q 100 230 122 222 L 125 285 L 102 285 L 100 240 L 98 285 L 75 285 Z" fill={bottomColor} stroke={bottomOutline} strokeWidth="3" strokeLinejoin="round"/>
          )}
          {bottomStyle === 'shorts' && (
             <path d="M 78 222 Q 100 230 122 222 L 124 255 L 102 255 L 100 240 L 98 255 L 76 255 Z" fill={bottomColor} stroke={bottomOutline} strokeWidth="3" strokeLinejoin="round"/>
          )}
          {bottomStyle === 'skirt' && (
             <path d="M 76 220 Q 100 230 124 220 L 138 255 Q 100 265 62 255 Z" fill={bottomColor} stroke={bottomOutline} strokeWidth="3" strokeLinejoin="round"/>
          )}
        </g>

        {/* SHOES */}
        <g id="shoes">
          {/* Left Shoe */}
          <path d="M 76 280 L 100 280 C 100 295 76 295 76 280 Z" fill={shoesColor} stroke={shoesOutline} strokeWidth="2" strokeLinejoin="round"/>
          <path d="M 76 285 Q 88 290 100 285" fill="none" stroke={shoesOutline} strokeWidth="2"/>
          {/* Right Shoe */}
          <path d="M 100 280 L 124 280 C 124 295 100 295 100 280 Z" fill={shoesColor} stroke={shoesOutline} strokeWidth="2" strokeLinejoin="round"/>
          <path d="M 100 285 Q 112 290 124 285" fill="none" stroke={shoesOutline} strokeWidth="2"/>
        </g>

        {/* ARMS (Back layer) */}
        <g id="arms-back">
          {/* Left Arm */}
          <path d="M 70 160 L 50 230 C 45 240 60 245 62 232 L 78 175 Z" fill={skinTone} stroke={skinOutline} strokeWidth="2" strokeLinejoin="round"/>
          {/* Right Arm */}
          <path d="M 130 160 L 150 230 C 155 240 140 245 138 232 L 122 175 Z" fill={skinTone} stroke={skinOutline} strokeWidth="2" strokeLinejoin="round"/>
        </g>

        {/* TORSO & TOPS */}
        <g id="torso">
          {/* Neck */}
          <path d="M 92 140 L 108 140 L 108 165 L 92 165 Z" fill={skinTone} stroke={skinOutline} strokeWidth="2"/>
          
          {topStyle === 'tshirt' && (
             <g>
               {/* Tshirt Body */}
               <path d="M 68 160 Q 100 165 132 160 L 122 225 Q 100 230 78 225 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               {/* Sleeves */}
               <path d="M 68 158 L 52 195 L 70 200 L 78 175 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               <path d="M 132 158 L 148 195 L 130 200 L 122 175 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
             </g>
          )}
          {topStyle === 'hoodie' && (
             <g>
               {/* Hoodie Body */}
               <path d="M 66 160 Q 100 168 134 160 L 124 228 Q 100 232 76 228 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               {/* Hoodie Pocket */}
               <path d="M 82 200 L 118 200 L 122 222 Q 100 228 78 222 Z" fill={topColor} stroke={topOutline} strokeWidth="2" strokeLinejoin="round"/>
               {/* Long Sleeves */}
               <path d="M 66 160 L 48 235 C 44 245 60 245 62 232 L 78 175 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               <path d="M 134 160 L 152 235 C 156 245 140 245 138 232 L 122 175 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               {/* Drawstrings */}
               <path d="M 90 165 L 90 190 M 110 165 L 110 190" fill="none" stroke={topOutline} strokeWidth="2" strokeLinecap="round"/>
             </g>
          )}
          {topStyle === 'sweater' && (
             <g>
               {/* Sweater Body */}
               <path d="M 68 160 Q 100 165 132 160 L 122 225 Q 100 230 78 225 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               {/* Sweater texture lines */}
               <path d="M 85 165 L 85 225 M 100 165 L 100 228 M 115 165 L 115 225" fill="none" stroke={topOutline} strokeWidth="1" opacity="0.3"/>
               {/* Long Sleeves */}
               <path d="M 68 160 L 48 235 C 44 245 60 245 62 232 L 78 175 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
               <path d="M 132 160 L 152 235 C 156 245 140 245 138 232 L 122 175 Z" fill={topColor} stroke={topOutline} strokeWidth="3" strokeLinejoin="round"/>
             </g>
          )}
        </g>

        {/* HEAD & FACE */}
        <g id="head">
          {/* Ears */}
          <path d="M 60 115 C 55 115 52 125 58 135" fill={skinTone} stroke={skinOutline} strokeWidth="2"/>
          <path d="M 140 115 C 145 115 148 125 142 135" fill={skinTone} stroke={skinOutline} strokeWidth="2"/>
          
          {/* Face Base */}
          <path d="M 60 90 C 60 40 140 40 140 90 C 140 115 120 140 100 145 C 80 140 60 115 60 90 Z" fill={skinTone} stroke={skinOutline} strokeWidth="2"/>
          
          {/* Left Eye */}
          <path d="M 68 105 Q 80 95 88 105" fill="none" stroke={hairColor} strokeWidth="3" strokeLinecap="round"/>
          <ellipse cx="78" cy="106" rx="7" ry="8" fill="#FFFFFF" stroke={skinOutline} strokeWidth="1"/>
          <ellipse cx="78" cy="106" rx="5" ry="7" fill={bottomColor} />
          <ellipse cx="78" cy="106" rx="3" ry="5" fill="#111" />
          <circle cx="76" cy="102" r="2.5" fill="#FFFFFF" />
          <circle cx="81" cy="110" r="1.5" fill="#FFFFFF" />
          
          {/* Right Eye */}
          <path d="M 112 105 Q 120 95 132 105" fill="none" stroke={hairColor} strokeWidth="3" strokeLinecap="round"/>
          <ellipse cx="122" cy="106" rx="7" ry="8" fill="#FFFFFF" stroke={skinOutline} strokeWidth="1"/>
          <ellipse cx="122" cy="106" rx="5" ry="7" fill={bottomColor} />
          <ellipse cx="122" cy="106" rx="3" ry="5" fill="#111" />
          <circle cx="120" cy="102" r="2.5" fill="#FFFFFF" />
          <circle cx="125" cy="110" r="1.5" fill="#FFFFFF" />

          {gender === 'girl' && (
            <g>
               {/* Eyelashes */}
               <path d="M 65 102 Q 62 98 65 95 M 135 102 Q 138 98 135 95" fill="none" stroke={hairColor} strokeWidth="1.5" strokeLinecap="round"/>
               {/* Cheeks */}
               <ellipse cx="68" cy="118" rx="6" ry="3" fill="#FF8A8A" opacity="0.5"/>
               <ellipse cx="132" cy="118" rx="6" ry="3" fill="#FF8A8A" opacity="0.5"/>
            </g>
          )}

          {/* Eyebrows */}
          <path d="M 70 90 Q 78 85 86 90" fill="none" stroke={hairColor} strokeWidth="2" strokeLinecap="round"/>
          <path d="M 114 90 Q 122 85 130 90" fill="none" stroke={hairColor} strokeWidth="2" strokeLinecap="round"/>
          
          {/* Nose */}
          <path d="M 100 118 L 98 122" fill="none" stroke={skinOutline} strokeWidth="2" strokeLinecap="round"/>
          
          {/* Mouth */}
          <path d="M 94 130 Q 100 135 106 130" fill="none" stroke={skinOutline} strokeWidth="2" strokeLinecap="round"/>
        </g>

        {/* FRONT HAIR */}
        <g id="hair-front">
          {hairStyle === 'short' && (
            <path d="M 50 100 C 50 25 150 25 150 100 C 150 100 135 60 115 70 C 100 55 90 70 80 60 C 65 70 50 100 50 100 Z" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
          )}
          {hairStyle === 'spiky' && (
            <path d="M 50 100 L 60 50 L 80 75 L 100 30 L 120 75 L 140 50 L 150 100 C 150 100 135 65 115 75 C 100 60 90 75 80 65 C 65 75 50 100 50 100 Z" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
          )}
          {hairStyle === 'curly' && (
            <path d="M 50 100 C 40 50 70 20 100 25 C 130 20 160 50 150 100 C 150 100 135 65 115 75 C 100 60 90 75 80 65 C 65 75 50 100 50 100 Z" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
          )}
          {hairStyle === 'long' && (
            <path d="M 50 100 C 50 25 150 25 150 100 C 150 100 135 60 115 70 C 100 55 90 70 80 60 C 65 70 50 100 50 100 Z" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
          )}
          {hairStyle === 'ponytail' && (
            <path d="M 50 100 C 50 25 150 25 150 100 C 150 100 135 60 115 70 C 100 55 90 70 80 60 C 65 70 50 100 50 100 Z" fill={hairColor} stroke={hairOutline} strokeWidth="2" strokeLinejoin="round"/>
          )}
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
