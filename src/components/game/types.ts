export type GameObject = {
    x: number;
    y: number;
  };
  
export type KirbyState = GameObject & {
    vx: number;
    vy: number;
    onGround: boolean;
  };
  
export type EnemyState = GameObject & {
      id: number;
      dir: number;
      range: number;
      initialX: number;
      speed: number;
  };
  
export type StarState = GameObject & {
      id: number;
  };
  
export type TrophyState = GameObject & {
    id: number;
  };