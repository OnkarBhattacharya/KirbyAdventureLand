# Kirby's Adventure Land

This is a simple and fun 2D platformer game built with Next.js, React, and TypeScript. The game is inspired by the classic Kirby games and is designed to be a fun and engaging experience for players of all ages.

## Features

* **Classic Platformer Gameplay:** Run, jump, and stomp on enemies to progress through the levels.
* **Lives System:** You start with 3 lives. If you fall or get hit by an enemy, you'll lose a life and restart the level.
* **Pause Functionality:** Pause the game at any time by pressing the 'P' key.
* **Coyote Time & Variable Jump Height:** Jump for a few frames after walking off a platform and perform short hops or high jumps.
* **Multiple Levels:** The game features multiple levels with increasing difficulty.
* **Power-ups:** Collect stars to become invincible for a short period of time.
* **Character Selection:** Choose from a variety of different colored Kirbys to play as.
* **Mobile Friendly:** The game is fully responsive and can be played on both desktop and mobile devices.

## Getting Started

To get started, you'll need to have Node.js and npm installed on your machine. Then, you can follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/kirbys-adventure-land.git
```

2. **Install the dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm run dev
```

This will start the development server on `http://localhost:3000`. You can then open this URL in your browser to play the game.

## Building for Production

To build the game for production, you can use the following command:

```bash
npm run build
```

This will create a production-ready build in the `.next` directory. You can then deploy this directory to any static hosting service.

## Architecture

The game is built using a component-based architecture with React and Next.js. Here's a breakdown of the main components:

*   **`src/app/page.tsx`**: The main entry point of the application.
*   **`src/components/game/`**: This directory contains all of the core game components.
    *   **`kirby-game.tsx`**: This is the main game component. It manages the game loop, state, and renders all of the other game components.
    *   **`kirby-character.tsx`**: The Kirby character component.
    *   **`enemy-character.tsx`**: The enemy character component.
    *   **`platform.tsx`**: The platform component.
    *   **`star-powerup.tsx`**: The star power-up component.
    *   **`trophy.tsx`**: The trophy component.
    *   **`types.ts`**: This file contains all of the TypeScript type definitions for the game.
    *   **`memoized-characters.tsx`**: This file contains memoized versions of the character components to improve performance.
*   **`src/lib/game-config.ts`**: This file contains all of the game configuration constants, such as gravity, jump force, and level data.
*   **`src/hooks/use-mobile.ts`**: This is a custom hook that detects if the user is on a mobile device.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
