/* =============================================
   Working at Heights — Camera
   Viewport with minimal scroll following player
   ============================================= */

import type { Vector2 } from '../types';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../data/constants';

export class Camera {
  x = 0;
  y = 0;
  private worldWidth: number;
  private worldHeight: number;
  private smoothing = 0.1;

  constructor(worldWidth: number, worldHeight: number) {
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
  }

  /** Follow a target position with smooth lerp */
  follow(target: Vector2): void {
    const targetX = target.x - CANVAS_WIDTH / 2;
    const targetY = target.y - CANVAS_HEIGHT / 2;

    // Lerp toward target
    this.x += (targetX - this.x) * this.smoothing;
    this.y += (targetY - this.y) * this.smoothing;

    // Clamp to world bounds
    this.x = Math.max(0, Math.min(this.x, this.worldWidth - CANVAS_WIDTH));
    this.y = Math.max(0, Math.min(this.y, this.worldHeight - CANVAS_HEIGHT));
  }

  /** Apply camera transform to canvas context */
  applyTransform(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(-Math.round(this.x), -Math.round(this.y));
  }

  /** Restore canvas context after camera transform */
  restore(ctx: CanvasRenderingContext2D): void {
    ctx.restore();
  }

  /** Convert screen position to world position */
  screenToWorld(screenPos: Vector2): Vector2 {
    return {
      x: screenPos.x + this.x,
      y: screenPos.y + this.y,
    };
  }

  /** Convert world position to screen position */
  worldToScreen(worldPos: Vector2): Vector2 {
    return {
      x: worldPos.x - this.x,
      y: worldPos.y - this.y,
    };
  }
}
