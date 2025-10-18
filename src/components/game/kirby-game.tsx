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
  LEVELS,
  CHARACTERS,
  INVINCIBILITY_DURATION,
  TROPHY_SIZE,
} from '@/lib/game-config';
import KirbyCharacter from './kirby-character';
import EnemyCharacter from './enemy-character';
import Platform from './platform';
import StarPowerup from './star-powerup';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import Trophy from './trophy';
import Fireworks from './fireworks';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

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

type TrophyState = GameObject & {
  id: number;
};

export default function KirbyGame() {
  const [level, setLevel] = useState(0);
  const [kirby, setKirby] = useState<KirbyState>({ x: 50, y: 0, vx: 0, vy: 0, onGround: false });
  const [enemies, setEnemies] = useState<EnemyState[]>([]);
  const [stars, setStars] = useState<StarState[]>([]);
  const [platforms, setPlatforms] = useState(LEVELS[level].platforms);
  const [trophy, setTrophy] = useState<TrophyState | null>(null);
  const [score, setScore] = useState(0);
  const [isInvincible, setIsInvincible] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [cameraX, setCameraX] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[0].name);
  const [levelComplete, setLevelComplete] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const keys = useRef<{ [key: string]: boolean }>({});
  const gameLoopRef = useRef<number>();
  const isMobile = useIsMobile();

  const loadLevel = useCallback((levelIndex: number) => {
    const newLevelData = LEVELS[levelIndex];
    if (!newLevelData) {
        setGameWon(true);
        console.log("You beat the game!");
        return;
    }
    setLevel(levelIndex);
    setKirby({ x: 50, y: 0, vx: 0, vy: 0, onGround: false });
    setPlatforms(newLevelData.platforms);
    setEnemies(newLevelData.enemies.map(e => ({...e, initialX: e.x})));
    setStars(newLevelData.stars);
    setTrophy(newLevelData.trophy);
    setCameraX(0);
    setLevelComplete(false);
  }, []);

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
    setScore(0);
    setIsInvincible(false);
    setGameOver(false);
    setLevelComplete(false);
    setGameWon(false);
    loadLevel(0);
    setGameStarted(true);
  }, [loadLevel]);

  const handleGameOver = useCallback(() => {
    setGameOver(true);
    if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
    }
    setTimeout(() => {
        setGameStarted(false);
        setGameOver(false); // Reset for next game
    }, 2000);
  }, []);
  
  const startGame = () => {
    resetGame();
  }

  const quitGame = () => {
    setGameStarted(false);
    setGameWon(false);
    setGameOver(false);
    setLevel(0);
    setScore(0);
  }

  const handleNextLevel = useCallback(() => {
    if (levelComplete) return;
    setLevelComplete(true);
    setScore(s => s + 500);

    setTimeout(() => {
        const nextLevel = level + 1;
        if (nextLevel < LEVELS.length) {
            loadLevel(nextLevel);
        } else {
            console.log("You've completed all levels!");
            setGameWon(true);
            setGameOver(true); // to stop the game loop
        }
    }, 2000); // Show fireworks for 2 seconds
  }, [level, loadLevel, levelComplete]);

  const gameLoop = useCallback(() => {
    if (!gameStarted || gameOver) {
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
        }
        return;
      }
  
      if (levelComplete) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return;
      }

    setKirby(prevKirby => {
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
      for (const platform of platforms) {
        if (x + KIRBY_SIZE > platform.x && x < platform.x + platform.width && y + KIRBY_SIZE <= platform.y && newY + KIRBY_SIZE >= platform.y) {
          newY = platform.y - KIRBY_SIZE;
          vy = 0;
          onGround = true;
        }
      }

      if (newX < cameraX) newX = cameraX;

      if (newY > GAME_HEIGHT) {
          handleGameOver();
          return prevKirby;
      };
      
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
        const kirbyState = kirby; // use the latest state
        return prevEnemies.filter(enemy => {
            if (kirbyState.x < enemy.x + ENEMY_SIZE && kirbyState.x + KIRBY_SIZE > enemy.x && kirbyState.y < enemy.y + ENEMY_SIZE && kirbyState.y + KIRBY_SIZE > enemy.y) {
                if (isInvincible) {
                    setScore(s => s + 200);
                    return false;
                }
                if (kirbyState.vy > 0 && (kirbyState.y + KIRBY_SIZE) < (enemy.y + ENEMY_SIZE / 2)) {
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
        const kirbyState = kirby;
        if (kirbyState.x < star.x + STAR_SIZE && kirbyState.x + KIRBY_SIZE > star.x && kirbyState.y < star.y + STAR_SIZE && kirbyState.y + KIRBY_SIZE > star.y) {
            setIsInvincible(true);
            setScore(s => s + 50);
            setTimeout(() => setIsInvincible(false), INVINCIBILITY_DURATION);
            return false;
        }
        return true;
    }));
    
    if (trophy) {
      if (kirby.x < trophy.x + TROPHY_SIZE && kirby.x + KIRBY_SIZE > trophy.x && kirby.y < trophy.y + TROPHY_SIZE && kirby.y + KIRBY_SIZE > trophy.y) {
        handleNextLevel();
      }
    }

    setCameraX(prev => {
        const kirbyState = kirby;
        const targetCameraX = kirbyState.x - GAME_WIDTH / 4;
        return Math.max(0, targetCameraX);
    });


    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameOver, gameStarted, isInvincible, handleGameOver, cameraX, platforms, trophy, levelComplete, handleNextLevel, kirby]);

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

  const handleTouchStart = (key: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    keys.current[key] = true;
  };

  const handleTouchEnd = (key: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    keys.current[key] = false;
  };

  if (!gameStarted) {
    return (
        <div
            className="flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg border-4 border-primary/50 p-6"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        >
            <h2 className="text-3xl font-bold text-primary mb-2">Welcome!</h2>
            <p className="mb-4 text-center text-secondary-foreground">Use Arrow Keys to move and Space/Up to Jump.</p>
            
            <h3 className="text-xl font-bold text-primary mb-4">Choose your character</h3>
            <ScrollArea className="h-64 w-full">
              <div className="grid grid-cols-3 gap-4 mb-6 p-4">
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
            </ScrollArea>

            <Button onClick={startGame} className="bg-accent text-accent-foreground hover:bg-accent/80 mt-4">Start Game</Button>
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
      <div className="absolute top-4 right-4 text-2xl font-bold text-white z-20" style={{textShadow: '2px 2px 4px #000'}}>
        Level: {level + 1}
      </div>

      {gameOver && !gameWon && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-30">
          <h2 className="text-5xl font-bold text-red-500 mb-4" style={{textShadow: '2px 2px 4px #000'}}>Game Over</h2>
        </div>
      )}
      
      {gameWon && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-30">
            <h2 className="text-4xl font-bold text-green-400 mb-4" style={{textShadow: '2px 2px 4px #000'}}>You Beat The Game!</h2>
            <div className="flex gap-4">
                <Button onClick={resetGame}>Restart</Button>
                <Button onClick={quitGame} variant="secondary">Quit</Button>
            </div>
        </div>
      )}

      {levelComplete && !gameWon && <Fireworks />}

      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ transform: `translateX(-${cameraX}px)` }}
      >
        <KirbyCharacter position={kirby} isInvincible={isInvincible} character={selectedCharacter} />
        {platforms.map((p, i) => (
          <Platform key={i} {...p} />
        ))}
        {enemies.map((e) => (
          <EnemyCharacter key={e.id} position={e} />
        ))}
        {stars.map((s) => (
          <StarPowerup key={s.id} position={s} />
        ))}
        {trophy && <Trophy position={trophy} />}
      </div>
      {isMobile && (
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-30">
          <div className="flex gap-2">
            <Button
              className="w-16 h-16 rounded-full bg-primary/50 text-white"
              onTouchStart={handleTouchStart('arrowleft')}
              onTouchEnd={handleTouchEnd('arrowleft')}
            >
              <ArrowLeft className="w-8 h-8" />
            </Button>
            <Button
              className="w-16 h-16 rounded-full bg-primary/50 text-white"
              onTouchStart={handleTouchStart('arrowright')}
              onTouchEnd={handleTouchEnd('arrowright')}
            >
              <ArrowRight className="w-8 h-8" />
            </Button>
          </div>
          <Button
            className="w-20 h-20 rounded-full bg-accent/50 text-white"
            onTouchStart={handleTouchStart('arrowup')}
            onTouchEnd={handleTouchEnd('arrowup')}
          >
            <ArrowUp className="w-10 h-10" />
          </Button>
        </div>
      )}
    </div>
  );
}
