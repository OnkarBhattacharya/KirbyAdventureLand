"use client";

import type { FC } from 'react';

interface PlatformProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Platform: FC<PlatformProps> = ({ x, y, width, height }) => {
  return (
    <div
      className="absolute bg-green-500 border-b-4 border-green-700 rounded-t-md"
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
