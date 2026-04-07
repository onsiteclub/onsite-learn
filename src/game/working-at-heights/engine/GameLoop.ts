/* =============================================
   Working at Heights — Game Loop
   60fps update/draw cycle with delta time
   ============================================= */

import { TARGET_FPS, FRAME_TIME } from '../data/constants';

export type UpdateFn = (dt: number) => void;
export type DrawFn = (ctx: CanvasRenderingContext2D, interpolation: number) => void;

export class GameLoop {
  private running = false;
  private rafId = 0;
  private lastTime = 0;
  private accumulator = 0;

  private updateFn: UpdateFn;
  private drawFn: DrawFn;
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, update: UpdateFn, draw: DrawFn) {
    this.ctx = ctx;
    this.updateFn = update;
    this.drawFn = draw;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.accumulator = 0;
    this.rafId = requestAnimationFrame(this.tick);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  isRunning(): boolean {
    return this.running;
  }

  private tick = (now: number): void => {
    if (!this.running) return;

    const elapsed = now - this.lastTime;
    this.lastTime = now;

    // Cap accumulated time to prevent spiral of death
    this.accumulator += Math.min(elapsed, 200);

    // Fixed timestep updates
    while (this.accumulator >= FRAME_TIME) {
      this.updateFn(FRAME_TIME / 1000); // pass dt in seconds
      this.accumulator -= FRAME_TIME;
    }

    // Draw with interpolation factor
    const interpolation = this.accumulator / FRAME_TIME;
    this.drawFn(this.ctx, interpolation);

    this.rafId = requestAnimationFrame(this.tick);
  };
}
