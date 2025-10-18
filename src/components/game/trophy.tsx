"use client";

import type { FC } from 'react';
import { Trophy as TrophyIcon } from 'lucide-react';
import { TROPHY_SIZE } from '@/lib/game-config';

interface TrophyProps {
  position: { x: number; y: number };
}

const Trophy: FC<TrophyProps> = ({ position }) => {
  return (
    <div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        width: TROPHY_SIZE,
        height: TROPHY_SIZE,
      }}
    >
      <TrophyIcon className="w-full h-full text-yellow-500 fill-yellow-400" />
    </div>
  );
};

export default Trophy;
