/* =============================================
   Working at Heights — Entry Point

   Usage (standalone):
     import { Game } from './Game';
     const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
     const game = new Game(canvas);
     game.start();

   Usage (React wrapper):
     import WorkingAtHeightsGame from './WorkingAtHeightsGame';
     <WorkingAtHeightsGame />
   ============================================= */

export { Game } from './Game';

// Re-export types for external consumers
export type {
  GamePhase,
  ChallengeId,
  GameScore,
  InputState,
} from './types';
