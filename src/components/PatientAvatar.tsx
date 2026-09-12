import React from 'react';
import type { AvatarConfig } from '../types';

interface PatientAvatarProps {
  config: AvatarConfig;
  size?: number;
  className?: string;
}

export const PatientAvatar: React.FC<PatientAvatarProps> = ({ config, size = 100, className }) => {
  // If the user has a modern config with a seed, use it.
  // Otherwise, use a deterministic string (e.g. legacy skinTone) or just a default seed.
  const seed = config.seed || config.skinTone || 'guest';
  
  // We use the "adventurer" style from DiceBear which is very colorful and playful for kids.
  // Alternatively "avataaars" could be used. Let's use "adventurer".
  const avatarUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=transparent`;

  return (
    <img 
      src={avatarUrl} 
      alt="Avatar"
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        filter: 'drop-shadow(0px 8px 12px rgba(0,0,0,0.25))'
      }}
    />
  );
};
