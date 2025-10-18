export const KIRBY_SIZE = 40;
export const ENEMY_SIZE = 35;
export const STAR_SIZE = 30;
export const TROPHY_SIZE = 50;

export const GRAVITY = 0.6;
export const JUMP_FORCE = -15;
export const MOVE_SPEED = 5;

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const INVINCIBILITY_DURATION = 5000; // 5 seconds

export const LEVELS = [
  {
    level: 1,
    platforms: [
      { x: 0, y: GAME_HEIGHT - 40, width: 3000, height: 40 },
      { x: 300, y: GAME_HEIGHT - 120, width: 150, height: 20 },
      { x: 550, y: GAME_HEIGHT - 220, width: 150, height: 20 },
      { x: 800, y: GAME_HEIGHT - 150, width: 200, height: 20 },
      { x: 1100, y: GAME_HEIGHT - 250, width: 100, height: 20 },
      { x: 1300, y: GAME_HEIGHT - 180, width: 180, height: 20 },
      { x: 1600, y: GAME_HEIGHT - 300, width: 150, height: 20 },
      { x: 1900, y: GAME_HEIGHT - 200, width: 250, height: 20 },
      { x: 2300, y: GAME_HEIGHT - 150, width: 200, height: 90, isFelicitation: true },
    ],
    enemies: [
      { id: 1, x: 850, y: GAME_HEIGHT - 150 - ENEMY_SIZE, dir: 1, range: 150, speed: 1 },
      { id: 2, x: 1350, y: GAME_HEIGHT - 180 - ENEMY_SIZE, dir: -1, range: 130, speed: 1.2 },
      { id: 3, x: 1950, y: GAME_HEIGHT - 200 - ENEMY_SIZE, dir: 1, range: 200, speed: 1 },
      { id: 4, x: 400, y: GAME_HEIGHT - 40 - ENEMY_SIZE, dir: 1, range: 1800, speed: 0.8 },
    ],
    stars: [
      { id: 1, x: 600, y: GAME_HEIGHT - 220 - STAR_SIZE - 20 },
      { id: 2, x: 1650, y: GAME_HEIGHT - 300 - STAR_SIZE - 20 },
    ],
    trophy: { id: 1, x: 2375, y: GAME_HEIGHT - 150 - TROPHY_SIZE },
  },
  {
    level: 2,
    platforms: [
        { x: 0, y: GAME_HEIGHT - 40, width: 3200, height: 40 },
        { x: 250, y: GAME_HEIGHT - 150, width: 150, height: 20 },
        { x: 500, y: GAME_HEIGHT - 250, width: 150, height: 20 },
        { x: 750, y: GAME_HEIGHT - 180, width: 200, height: 20 },
        { x: 1050, y: GAME_HEIGHT - 300, width: 150, height: 20 },
        { x: 1300, y: GAME_HEIGHT - 220, width: 180, height: 20 },
        { x: 1600, y: GAME_HEIGHT - 160, width: 150, height: 20 },
        { x: 1850, y: GAME_HEIGHT - 280, width: 250, height: 20 },
        { x: 2200, y: GAME_HEIGHT - 200, width: 150, height: 20 },
        { x: 2500, y: GAME_HEIGHT - 320, width: 200, height: 20 },
        { x: 2800, y: GAME_HEIGHT - 150, width: 200, height: 90, isFelicitation: true },
    ],
    enemies: [
        { id: 1, x: 800, y: GAME_HEIGHT - 180 - ENEMY_SIZE, dir: 1, range: 150, speed: 1.1 },
        { id: 2, x: 1350, y: GAME_HEIGHT - 220 - ENEMY_SIZE, dir: -1, range: 130, speed: 1.3 },
        { id: 3, x: 1900, y: GAME_HEIGHT - 280 - ENEMY_SIZE, dir: 1, range: 200, speed: 1.2 },
        { id: 4, x: 400, y: GAME_HEIGHT - 40 - ENEMY_SIZE, dir: 1, range: 2300, speed: 1 },
        { id: 5, x: 2550, y: GAME_HEIGHT - 320 - ENEMY_SIZE, dir: -1, range: 150, speed: 1.4 },
    ],
    stars: [
        { id: 1, x: 550, y: GAME_HEIGHT - 250 - STAR_SIZE - 20 },
        { id: 2, x: 1900, y: GAME_HEIGHT - 280 - STAR_SIZE - 20 },
        { id: 3, x: 2550, y: GAME_HEIGHT - 320 - STAR_SIZE - 20 },
    ],
    trophy: { id: 1, x: 2875, y: GAME_HEIGHT - 150 - TROPHY_SIZE },
  }
];

export const CHARACTERS = [
  { name: 'Kirby', colorClass: 'bg-primary' },
  { name: 'Ansh', colorClass: 'bg-green-400' },
  { name: 'KiKi', colorClass: 'bg-purple-400' },
  { name: 'Oli', colorClass: 'bg-gray-400' },
  { name: 'Oskar', colorClass: 'bg-blue-400' },
  { name: 'Earnie', colorClass: 'bg-yellow-400' },
  { name: 'Bali', colorClass: 'bg-teal-400' },
  { name: 'Joshua', colorClass: 'bg-indigo-400' },
  { name: 'Leo', colorClass: 'bg-lime-400' },
  { name: 'Jacks', colorClass: 'bg-rose-400' },
  { name: 'Nidhi', colorClass: 'bg-pink-300' },
  { name: 'Xavier', colorClass: 'bg-orange-300' },
  { name: 'Ray', colorClass: 'bg-amber-300' },
];
