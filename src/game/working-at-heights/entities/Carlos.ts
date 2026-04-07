/* =============================================
   Working at Heights — Carlos NPC
   Orange helmet, working near edge without protection
   ============================================= */

import { Entity } from './Entity';
import { COLORS } from '../data/constants';

export class Carlos extends Entity {
  name = 'Carlos';
  isConnected = false;   // Becomes true after player warns him
  wasWarned = false;

  // Working animation
  private workTimer = 0;
  private workFrame = 0;

  constructor(x: number, y: number) {
    super('carlos', x, y - 52, 36, 52);
  }

  update(dt: number): void {
    // Simple working animation (hammering)
    this.workTimer += dt;
    if (this.workTimer > 0.5) {
      this.workTimer = 0;
      this.workFrame = (this.workFrame + 1) % 2;
    }
  }

  /** Player warns Carlos — he clips in */
  warn(): void {
    this.wasWarned = true;
    this.isConnected = true;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const x = this.position.x;
    const y = this.position.y;

    ctx.save();
    ctx.translate(x, y);

    // Boots
    ctx.fillStyle = COLORS.boots;
    ctx.fillRect(6, 44, 10, 8);
    ctx.fillRect(20, 44, 10, 8);

    // Pants
    ctx.fillStyle = COLORS.pants;
    ctx.fillRect(8, 30, 8, 16);
    ctx.fillRect(20, 30, 8, 16);

    // Body / vest
    ctx.fillStyle = '#F59E0B';  // Orange vest
    ctx.fillRect(6, 18, 24, 14);

    // Arms (working animation)
    ctx.fillStyle = COLORS.skinTone;
    if (this.workFrame === 0) {
      ctx.fillRect(0, 18, 6, 10);
      ctx.fillRect(28, 16, 6, 10);  // Arm up
    } else {
      ctx.fillRect(0, 20, 6, 10);
      ctx.fillRect(28, 22, 6, 10);  // Arm down
    }

    // Head
    ctx.fillStyle = COLORS.skinTone;
    ctx.fillRect(12, 6, 12, 14);

    // Helmet (orange)
    ctx.fillStyle = COLORS.helmetOrange;
    ctx.fillRect(10, 2, 16, 8);
    ctx.fillRect(8, 8, 20, 3);

    // Lifeline indicator when connected
    if (this.isConnected) {
      ctx.strokeStyle = COLORS.safetyYellow;
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(18, 16);
      ctx.lineTo(18, -20);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Danger indicator when NOT connected
    if (!this.isConnected) {
      ctx.fillStyle = COLORS.safetyRed;
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('⚠', 18, -4);
    }

    ctx.restore();
  }
}
