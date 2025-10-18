"use client";

import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { KIRBY_SIZE } from '@/lib/game-config';

interface KirbyCharacterProps {
  position: { x: number; y: number };
  isInvincible: boolean;
  character: string;
}

const CharacterLook = ({ character }: { character: string }) => {
  switch (character) {
    case 'Ansh':
      return (
        <>
          {/* Eyes */}
          <div className="absolute top-[35%] left-[20%] w-3 h-4 bg-black rounded-full" />
          <div className="absolute top-[35%] right-[20%] w-3 h-4 bg-black rounded-full" />
          {/* Mouth */}
          <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-4 h-2 bg-black rounded-b-full" />
        </>
      );
    case 'KiKi':
      return (
        <>
          {/* Eyes */}
          <div className="absolute top-[35%] left-[20%] w-2 h-4 bg-black rounded-full" />
          <div className="absolute top-[35%] right-[20%] w-2 h-4 bg-black rounded-full" />
          {/* Smile */}
          <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-5 h-3 border-b-2 border-l-2 border-r-2 border-black rounded-full" />
        </>
      );
    case 'Oli':
      return (
        <>
          {/* Big Eye */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-2 border-black">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full" />
          </div>
        </>
      );
    case 'Oskar':
        return (
          <>
            {/* Glasses */}
            <div className="absolute top-[35%] left-[15%] w-8 h-4 bg-transparent border-2 border-black rounded-full" />
            <div className="absolute top-[35%] right-[15%] w-8 h-4 bg-transparent border-2 border-black rounded-full" />
            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 w-2 h-0.5 bg-black" />
          </>
        );
    case 'Earnie':
        return (
            <>
              {/* Sleepy Eyes */}
              <div className="absolute top-[40%] left-[20%] w-4 h-1 bg-black rounded-full transform -rotate-12" />
              <div className="absolute top-[40%] right-[20%] w-4 h-1 bg-black rounded-full transform rotate-12" />
            </>
          );
    case 'Bali':
        return (
            <>
              {/* Happy Eyes */}
              <div className="absolute top-[40%] left-[20%] w-4 h-2 border-t-2 border-black rounded-t-full transform rotate-12" />
              <div className="absolute top-[40%] right-[20%] w-4 h-2 border-t-2 border-black rounded-t-full transform -rotate-12" />
            </>
        );
    case 'Joshua':
        return (
            <>
              {/* Wide Eyes */}
              <div className="absolute top-[35%] left-[15%] w-5 h-5 bg-white rounded-full border-2 border-black">
                <div className="w-2 h-2 bg-black rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="absolute top-[35%] right-[15%] w-5 h-5 bg-white rounded-full border-2 border-black">
                <div className="w-2 h-2 bg-black rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </>
        );
    case 'Leo':
        return (
            <>
              {/* Sunglasses */}
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-10 h-4 bg-black rounded-md" />
            </>
        );
    case 'Jacks':
        return (
            <>
              {/* X eyes */}
              <div className="absolute top-[35%] left-[20%] w-4 h-1 bg-black transform rotate-45" />
              <div className="absolute top-[35%] left-[20%] w-4 h-1 bg-black transform -rotate-45" />
              <div className="absolute top-[35%] right-[20%] w-4 h-1 bg-black transform rotate-45" />
              <div className="absolute top-[35%] right-[20%] w-4 h-1 bg-black transform -rotate-45" />
            </>
        );
    case 'Nidhi':
        return (
            <>
                {/* Heart Eyes */}
                <div className="absolute top-[35%] left-[18%] w-4 h-4 bg-red-500 transform rotate-45">
                    <div className="absolute -top-2 left-0 w-4 h-4 bg-red-500 rounded-full" />
                    <div className="absolute top-0 -left-2 w-4 h-4 bg-red-500 rounded-full" />
                </div>
                <div className="absolute top-[35%] right-[18%] w-4 h-4 bg-red-500 transform rotate-45">
                    <div className="absolute -top-2 left-0 w-4 h-4 bg-red-500 rounded-full" />
                    <div className="absolute top-0 -left-2 w-4 h-4 bg-red-500 rounded-full" />
                </div>
            </>
        );
    case 'Xavier':
        return (
            <>
                {/* Monocle */}
                <div className="absolute top-[30%] right-[15%] w-6 h-6 bg-transparent border-2 border-yellow-500 rounded-full" />
                <div className="absolute top-[35%] right-[10%] w-1 h-3 bg-yellow-500 transform -rotate-45" />
                <div className="absolute top-[45%] left-[25%] w-3 h-1 bg-black rounded-full" />
            </>
        );
    case 'Ray':
        return (
            <>
                {/* Winking Eye */}
                <div className="absolute top-[40%] left-[20%] w-4 h-1 bg-black rounded-full" />
                <div className="absolute top-[35%] right-[20%] w-4 h-4 bg-black rounded-full" />
                <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-5 h-3 border-b-2 border-black rounded-b-full" />
            </>
        );
    case 'Kirby':
    default:
      return (
        <>
          {/* Eyes */}
          <div className="absolute top-[35%] left-[20%] w-2 h-3 bg-black rounded-full" />
          <div className="absolute top-[35%] right-[20%] w-2 h-3 bg-black rounded-full" />
          
          {/* Feet */}
          <div className="absolute bottom-[-5px] left-[10%] w-5 h-3 bg-red-600 rounded-b-full transform -rotate-12" />
          <div className="absolute bottom-[-5px] right-[10%] w-5 h-3 bg-red-600 rounded-b-full transform rotate-12" />

          {/* Blush */}
          <div className="absolute top-[50%] left-[5%] w-3 h-2 bg-pink-400 rounded-full" />
          <div className="absolute top-[50%] right-[5%] w-3 h-2 bg-pink-400 rounded-full" />
        </>
      );
  }
};


const KirbyCharacter: FC<KirbyCharacterProps> = ({ position, isInvincible, character }) => {
  const characterStyles: {[key: string]: string} = {
    Kirby: 'bg-primary',
    Ansh: 'bg-green-400',
    KiKi: 'bg-purple-400',
    Oli: 'bg-gray-400',
    Oskar: 'bg-blue-400',
    Earnie: 'bg-yellow-400',
    Bali: 'bg-teal-400',
    Joshua: 'bg-indigo-400',
    Leo: 'bg-lime-400',
    Jacks: 'bg-rose-400',
    Nidhi: 'bg-pink-300',
    Xavier: 'bg-orange-300',
    Ray: 'bg-amber-300',
  }
  
  return (
    <div
      className={cn(
        'absolute rounded-full transition-transform duration-100 ease-linear',
        isInvincible && 'animate-pulse',
        characterStyles[character] || 'bg-primary'
      )}
      style={{
        left: position.x,
        top: position.y,
        width: KIRBY_SIZE,
        height: KIRBY_SIZE,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <CharacterLook character={character} />
    </div>
  );
};

export default KirbyCharacter;
