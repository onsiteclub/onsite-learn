/* =============================================
   Working at Heights — React Wrapper Component
   Use this to embed the game in a Next.js/React page
   ============================================= */

'use client';

import { useRef, useEffect } from 'react';
import { Game } from './Game';

interface Props {
  className?: string;
}

export default function WorkingAtHeightsGame({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Initialize game
    const game = new Game(canvas);
    gameRef.current = game;
    game.resize(container);
    game.start();

    // Handle resize
    const onResize = () => game.resize(container);
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      game.stop();
      window.removeEventListener('resize', onResize);
      gameRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#1C1F23',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', maxWidth: '100%' }}
        tabIndex={0}
      />
    </div>
  );
}
