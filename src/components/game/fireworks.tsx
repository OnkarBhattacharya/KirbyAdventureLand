"use client";

import { useMemo } from 'react';
import { GAME_WIDTH, GAME_HEIGHT } from '@/lib/game-config';
import './fireworks.css';

const Fireworks = () => {
    const fireworkCount = 20;
    const fireworks = useMemo(() => {
        return Array.from({ length: fireworkCount }).map((_, i) => {
            const style = {
                left: `${Math.random() * GAME_WIDTH}px`,
                top: `${Math.random() * GAME_HEIGHT * 0.75}px`,
                animation: `firework 1.5s ${i * 0.1}s ease-out forwards`,
            };
            const particleStyle = {
                background: `hsl(${Math.random() * 360}, 100%, 50%)`,
            }
            return (
                <div key={i} className="firework" style={style}>
                    {Array.from({length: 12}).map((_, j) => (
                        <div key={j} className="particle" style={particleStyle}></div>
                    ))}
                </div>
            );
        });
    }, []);

    return (
        <div className="absolute inset-0 z-40 pointer-events-none">
            {fireworks}
        </div>
    );
};

export default Fireworks;
