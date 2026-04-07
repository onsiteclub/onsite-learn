/* =============================================
   Working at Heights — Standalone Entry Point
   Used by esbuild to bundle into a single JS file
   for iframe/standalone deployment
   ============================================= */

import { Game } from './Game';

// Auto-init when loaded
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  const container = document.getElementById('game-container') as HTMLElement;

  if (!canvas || !container) {
    console.error('Working at Heights: canvas or container not found');
    return;
  }

  const game = new Game(canvas);
  game.resize(container);
  game.start();

  window.addEventListener('resize', () => game.resize(container));

  // Expose for debugging
  (window as any).__WAH_GAME = game;
});
