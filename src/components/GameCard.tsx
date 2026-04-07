'use client';

import { useRef, useCallback } from 'react';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  gamePath: string;
}

export default function GameCard({ game }: { game: Game }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlay = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    el.classList.add('game-card--active');

    // On mobile: request fullscreen + landscape lock
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      try {
        await el.requestFullscreen();
        // Try to lock orientation to landscape
        if (screen.orientation && 'lock' in screen.orientation) {
          await (screen.orientation as any).lock('landscape').catch(() => {});
        }
      } catch {
        // Fullscreen not supported — still show inline
      }
    }
  }, []);

  const handleClose = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    el.classList.remove('game-card--active');

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    if (screen.orientation && 'unlock' in screen.orientation) {
      (screen.orientation as any).unlock?.();
    }
  }, []);

  return (
    <div className="game-card" ref={containerRef}>
      {/* Preview state */}
      <div className="game-card-preview">
        <div className="game-card-thumb" style={{ backgroundImage: `url(${game.thumbnail})` }}>
          <div className="game-card-thumb-overlay">
            <button className="game-card-play-btn" onClick={handlePlay} aria-label={`Play ${game.title}`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="game-card-info">
          <span className="game-card-category">{game.category}</span>
          <h3 className="game-card-title">{game.title}</h3>
          <p className="game-card-desc">{game.description}</p>
        </div>
      </div>

      {/* Active / playing state */}
      <div className="game-card-active">
        <div className="game-card-toolbar">
          <span className="game-card-toolbar-title">{game.title}</span>
          <button className="game-card-close-btn" onClick={handleClose} aria-label="Close game">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <iframe
          ref={iframeRef}
          className="game-card-iframe"
          src={game.gamePath}
          title={game.title}
          allow="fullscreen; autoplay"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
