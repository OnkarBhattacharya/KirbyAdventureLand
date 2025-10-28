"use client";
import React from 'react';
import KirbyCharacter from './kirby-character';
import EnemyCharacter from './enemy-character';
import { KirbyState, EnemyState } from './types';

export const MemoizedKirby = React.memo(({ position, isInvincible, character }: { position: KirbyState; isInvincible: boolean; character: string }) => (
    <KirbyCharacter position={position} isInvincible={isInvincible} character={character} />
));

export const MemoizedEnemy = React.memo(({ position }: { position: EnemyState }) => (
    <EnemyCharacter position={position} />
));