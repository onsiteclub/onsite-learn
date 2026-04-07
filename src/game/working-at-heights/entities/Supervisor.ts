/* =============================================
   Working at Heights — Supervisor NPC
   White helmet, clipboard, observes from ground
   ============================================= */

import { Entity } from './Entity';
import { COLORS, GROUND_Y } from '../data/constants';

export class Supervisor extends Entity {
  name = 'Supervisor';
  isTalking = false;

  // Idle animation
  private idleTimer = 0;
  private lookDirection: 'left' | 'right' = 'right';

  constructor(x: number) {
    super('supervisor', x, GROUND_Y - 52, 36, 52);
  }

  /** Supervisor occasionally looks left/right (idle behavior) */
  update(dt: number): void {
    this.idleTimer += dt;
    if (this.idleTimer > 3) {
      this.idleTimer = 0;
      this.lookDirection = this.lookDirection === 'left' ? 'right' : 'left';
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const x = this.position.x;
    const y = this.position.y;
    const flip = this.lookDirection === 'left';

    ctx.save();

    if (flip) {
      ctx.translate(x + this.size.x, y);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(x, y);
    }

    // Boots
    ctx.fillStyle = COLORS.boots;
    ctx.fillRect(6, 44, 10, 8);
    ctx.fillRect(20, 44, 10, 8);

    // Pants
    ctx.fillStyle = '#2D3748';
    ctx.fillRect(8, 30, 8, 16);
    ctx.fillRect(20, 30, 8, 16);

    // Body / shirt
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(6, 18, 24, 14);

    // Clipboard arm
    ctx.fillStyle = COLORS.skinTone;
    ctx.fillRect(28, 20, 6, 10);
    // Clipboard
    ctx.fillStyle = '#8B6914';
    ctx.fillRect(28, 22, 8, 12);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(29, 23, 6, 10);

    // Other arm
    ctx.fillStyle = COLORS.skinTone;
    ctx.fillRect(0, 20, 6, 10);

    // Head
    ctx.fillStyle = COLORS.skinTone;
    ctx.fillRect(12, 6, 12, 14);

    // Helmet (white)
    ctx.fillStyle = COLORS.helmetWhite;
    ctx.fillRect(10, 2, 16, 8);
    ctx.fillRect(8, 8, 20, 3);

    // Exclamation mark when talking
    if (this.isTalking) {
      ctx.fillStyle = COLORS.safetyRed;
      ctx.font = 'bold 14px monospace';
      ctx.fillText('!', 15, -2);
    }

    ctx.restore();
  }
}
