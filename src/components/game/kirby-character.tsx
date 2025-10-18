"use client";

import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { KIRBY_SIZE } from '@/lib/game-config';

interface KirbyCharacterProps {
  position: { x: number; y: number };
  isInvincible: boolean;
}

const KirbyCharacter: FC<KirbyCharacterProps> = ({ position, isInvincible }) => {
  return (
    <div
      className={cn(
        'absolute bg-primary rounded-full transition-transform duration-100 ease-linear',
        isInvincible && 'animate-pulse'
      )}
      style={{
        left: position.x,
        top: position.y,
        width: KIRBY_SIZE,
        height: KIRBY_SIZE,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      {/* Eyes */}
      <div className="absolute top-[35%] left-[20%] w-2 h-3 bg-black rounded-full" />
      <div className="absolute top-[35%] right-[20%] w-2 h-3 bg-black rounded-full" />
      
      {/* Feet */}
      <div className="absolute bottom-[-5px] left-[10%] w-5 h-3 bg-red-600 rounded-b-full transform -rotate-12" />
      <div className="absolute bottom-[-5px] right-[10%] w-5 h-3 bg-red-600 rounded-b-full transform rotate-12" />

      {/* Blush */}
      <div className="absolute top-[50%] left-[5%] w-3 h-2 bg-pink-400 rounded-full" />
      <div className="absolute top-[50%] right-[5%] w-3 h-2 bg-pink-400 rounded-full" />
    </div>
  );
};

export default KirbyCharacter;
