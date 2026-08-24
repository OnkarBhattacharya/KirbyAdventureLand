# Kirby's Adventure Land

This is a simple and fun 2D platformer game built with Next.js, React, and TypeScript. The game is inspired by the classic Kirby games and is designed to be a fun and engaging experience for players of all ages.

## Features

* **Classic Platformer Gameplay:** Run, jump, and stomp on enemies to progress through the levels.
* **Game Over & Restart:** Falling off the screen or touching an enemy ends the run; restart from level 1.
* **Multiple Levels:** The game features 10 levels with increasing difficulty.
* **Power-ups:** Collect stars to become invincible for a short period of time (5 seconds).
* **Character Selection:** Choose from 15 differently colored Kirbys to play as.
* **Mobile Friendly:** On-screen touch controls appear automatically on touch devices.

> Roadmap (not yet implemented): pause key, multi-life system, coyote time / variable jump height.

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

This will start the development server on `http://localhost:9002` (the port is set in `package.json`). You can then open this URL in your browser to play the game.

## Building for Production

To build the game for production, you can use the following command:

```bash
npm run build
```

The project is configured for deployment on **Firebase App Hosting** (see `apphosting.yaml`).

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
* **`src/hooks/use-mobile.tsx`**: This is a custom hook that detects if the user is on a mobile device.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

No LICENSE file is currently included in this repository. All rights reserved by the author until a license is added.
