"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  GRAVITY,
  JUMP_FORCE,
  MOVE_SPEED,
  KIRBY_SIZE,
  ENEMY_SIZE,
  STAR_SIZE,
  GAME_WIDTH,
  GAME_HEIGHT,
  PLATFORMS as platformData,
  INITIAL_ENEMIES,
  INITIAL_STARS,
  INVINCIBILITY_DURATION,
  CHARACTERS,
} from '@/lib/game-config';
import KirbyCharacter from './kirby-character';
import EnemyCharacter from './enemy-character';
import Platform from './platform';
import StarPowerup from './star-powerup';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type GameObject = {
  x: number;
  y: number;
};

type KirbyState = GameObject & {
  vx: number;
  vy: number;
  onGround: boolean;
};

type EnemyState = GameObject & {
    id: number;
    dir: number;
    range: number;
    initialX: number;
    speed: number;
};

type StarState = GameObject & {
    id: number;
};


export default function KirbyGame() {
  const [kirby, setKirby] = useState<KirbyState>({ x: 50, y: 0, vx: 0, vy: 0, onGround: false });
  const [enemies, setEnemies] = useState<EnemyState[]>(INITIAL_ENEMIES.map(e => ({...e, initialX: e.x})));
  const [stars, setStars] = useState<StarState[]>(INITIAL_STARS);
  const [score, setScore] = useState(0);
  const [isInvincible, setIsInvincible] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [cameraX, setCameraX] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[0].name);

  const keys = useRef<{ [key: string]: boolean }>({});
  const gameLoopRef = useRef<number>();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (['arrowright', 'arrowleft', 'arrowup', ' '].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }
    keys.current[e.key.toLowerCase()] = true;
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keys.current[e.key.toLowerCase()] = false;
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [handleKeyDown, handleKeyUp]);
  
  const resetGame = useCallback(() => {
    setKirby({ x: 50, y: 0, vx: 0, vy: 0, onGround: false });
    setEnemies(INITIAL_ENEMIES.map(e => ({...e, initialX: e.x})));
    setStars(INITIAL_STARS);
    setScore(0);
    setIsInvincible(false);
    setGameOver(false);
    setCameraX(0);
    setGameStarted(true);
  }, []);

  const handleGameOver = useCallback(() => {
    setGameOver(true);
    setTimeout(() => {
        setGameStarted(false);
    }, 1500);
  }, []);
  
  const startGame = () => {
    setGameStarted(true);
    resetGame();
  }

  const gameLoop = useCallback(() => {
    if (gameOver || !gameStarted) return;
    
    // Using refs for kirby state inside loop to get latest value without dependency change
    let currentKirby: KirbyState | null = null;
    setKirby(prevKirby => {
      currentKirby = prevKirby;
      let { x, y, vx, vy, onGround } = { ...prevKirby };

      if (keys.current['arrowright']) vx = MOVE_SPEED;
      else if (keys.current['arrowleft']) vx = -MOVE_SPEED;
      else vx = 0;

      if ((keys.current['arrowup'] || keys.current[' ']) && onGround) {
        vy = JUMP_FORCE;
        onGround = false;
      }
      
      vy += GRAVITY;

      let newX = x + vx;
      let newY = y + vy;

      onGround = false;
      for (const platform of platformData) {
        if (x + KIRBY_SIZE > platform.x && x < platform.x + platform.width && y + KIRBY_SIZE <= platform.y && newY + KIRBY_SIZE >= platform.y) {
          newY = platform.y - KIRBY_SIZE;
          vy = 0;
          onGround = true;
        }
      }

      if (newX < cameraX) newX = cameraX;

      if (newY > GAME_HEIGHT) handleGameOver();
      
      if (newX > prevKirby.x) setScore(s => s + (newX - prevKirby.x) / 10);

      return { x: newX, y: newY, vx, vy, onGround };
    });
    
    setEnemies(prevEnemies => prevEnemies.map(enemy => {
        let newX = enemy.x + enemy.dir * enemy.speed;
        if (Math.abs(newX - enemy.initialX) > enemy.range / 2) {
            enemy.dir *= -1;
        }
        return {...enemy, x: newX};
    }));

    setEnemies(prevEnemies => {
        if (!currentKirby) return prevEnemies;
        return prevEnemies.filter(enemy => {
            if (currentKirby!.x < enemy.x + ENEMY_SIZE && currentKirby!.x + KIRBY_SIZE > enemy.x && currentKirby!.y < enemy.y + ENEMY_SIZE && currentKirby!.y + KIRBY_SIZE > enemy.y) {
                if (isInvincible) {
                    setScore(s => s + 200);
                    return false;
                }
                if (currentKirby!.vy > 0 && (currentKirby!.y + KIRBY_SIZE) < (enemy.y + ENEMY_SIZE / 2)) {
                    setKirby(k => ({ ...k, vy: JUMP_FORCE / 1.5 }));
                    setScore(s => s + 100);
                    return false;
                } else {
                    handleGameOver();
                }
            }
            return true;
        });
    });

    setStars(prevStars => prevStars.filter(star => {
        if (!currentKirby) return true;
        if (currentKirby.x < star.x + STAR_SIZE && currentKirby.x + KIRBY_SIZE > star.x && currentKirby.y < star.y + STAR_SIZE && currentKirby.y + KIRBY_SIZE > star.y) {
            setIsInvincible(true);
            setScore(s => s + 50);
            setTimeout(() => setIsInvincible(false), INVINCIBILITY_DURATION);
            return false;
        }
        return true;
    }));

    setCameraX(prev => {
        if (!currentKirby) return prev;
        const targetCameraX = currentKirby.x - GAME_WIDTH / 4;
        return Math.max(0, targetCameraX);
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameOver, gameStarted, isInvincible, handleGameOver, cameraX]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, gameLoop]);

  if (!gameStarted) {
    return (
        <div
            className="flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg border-4 border-primary/50 p-6"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        >
            <h2 className="text-3xl font-bold text-primary mb-2">Welcome!</h2>
            <p className="mb-4 text-center text-secondary-foreground">Use Arrow Keys to move and Space/Up to Jump.</p>
            
            <h3 className="text-xl font-bold text-primary mb-4">Choose your character</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
                {CHARACTERS.map(char => (
                    <button
                        key={char.name}
                        onClick={() => setSelectedCharacter(char.name)}
                        className={cn(
                            "p-2 rounded-lg border-2 flex flex-col items-center gap-2 transition-all",
                            selectedCharacter === char.name ? 'border-accent bg-accent/20' : 'border-border hover:bg-muted'
                        )}
                    >
                        <div className={cn("w-10 h-10 rounded-full", char.colorClass)}></div>
                        <span className="font-semibold text-sm">{char.name}</span>
                    </button>
                ))}
            </div>

            <Button onClick={startGame} className="bg-accent text-accent-foreground hover:bg-accent/80">Start Game</Button>
        </div>
    )
  }

  return (
    <div
      className="relative bg-sky-300 overflow-hidden rounded-lg shadow-2xl border-4 border-primary"
      style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
    >
      <div className="absolute top-4 left-4 text-2xl font-bold text-white z-20" style={{textShadow: '2px 2px 4px #000'}}>
        Score: {Math.floor(score)}
      </div>

      {gameOver && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-30">
          <h2 className="text-5xl font-bold text-red-500 mb-4" style={{textShadow: '2px 2px 4px #000'}}>Game Over</h2>
        </div>
      )}

      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ transform: `translateX(-${cameraX}px)` }}
      >
        <KirbyCharacter position={kirby} isInvincible={isInvincible} character={selectedCharacter} />
        {platformData.map((p, i) => (
          <Platform key={i} {...p} />
        ))}
        {enemies.map((e) => (
          <EnemyCharacter key={e.id} position={e} />
        ))}
        {stars.map((s) => (
          <StarPowerup key={s.id} position={s} />
        ))}
      </div>
    </div>
  );
}
