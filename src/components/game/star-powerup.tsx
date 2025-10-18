"use client";

import type { FC } from 'react';
import { Star } from 'lucide-react';
import { STAR_SIZE } from '@/lib/game-config';

interface StarPowerupProps {
  position: { x: number; y: number };
}

const StarPowerup: FC<StarPowerupProps> = ({ position }) => {
  return (
    <div
      className="absolute animate-bounce"
      style={{
        left: position.x,
        top: position.y,
        width: STAR_SIZE,
        height: STAR_SIZE,
      }}
    >
      <Star className="w-full h-full text-yellow-400 fill-yellow-400" />
    </div>
  );
};

export default StarPowerup;
