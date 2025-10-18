"use client";

import type { FC } from 'react';
import { ENEMY_SIZE } from '@/lib/game-config';

interface EnemyCharacterProps {
  position: { x: number; y: number };
}

const EnemyCharacter: FC<EnemyCharacterProps> = ({ position }) => {
  return (
    <div
      className="absolute bg-orange-400 rounded-t-full rounded-b-md"
      style={{
        left: position.x,
        top: position.y,
        width: ENEMY_SIZE,
        height: ENEMY_SIZE,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-4 h-6 bg-white rounded-full border-2 border-orange-600">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-800 rounded-full" />
        </div>
    </div>
  );
};

export default EnemyCharacter;
