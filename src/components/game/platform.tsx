"use client";

import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface PlatformProps {
  x: number;
  y: number;
  width: number;
  height: number;
  isFelicitation?: boolean;
}

const Platform: FC<PlatformProps> = ({ x, y, width, height, isFelicitation }) => {
  return (
    <div
      className={cn(
        "absolute rounded-t-md",
        isFelicitation 
          ? "bg-yellow-300 border-b-4 border-yellow-500" 
          : "bg-green-500 border-b-4 border-green-700"
      )}
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
      }}
    />
  );
};

export default Platform;
