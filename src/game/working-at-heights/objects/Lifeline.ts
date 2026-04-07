/* =============================================
   Working at Heights — Lifeline & Anchor Point
   Horizontal lifeline with connection point
   ============================================= */

import { InteractiveObject } from './InteractiveObject';
import { COLORS } from '../data/constants';

export class Lifeline extends InteractiveObject {
  isConnected = false;  // Player connected to it

  constructor(id: string, x: number, y: number) {
    super(id, 'lifeline', 'Lifeline Anchor', x, y - 24, 30, 24);
  }

  /** Connect player to lifeline */
  connect(): void {
    this.isConnected = true;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const x = this.position.x;
    const y = this.position.y;

    ctx.save();

    // Anchor bracket (mounted to structure)
    ctx.fillStyle = COLORS.steelDark;
    ctx.fillRect(x + 8, y, 14, 6);

    // Anchor plate
    ctx.fillStyle = COLORS.steel;
    ctx.fillRect(x + 4, y + 6, 22, 8);

    // D-ring
    ctx.strokeStyle = COLORS.steelLight;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x + 15, y + 18, 6, 0, Math.PI * 2);
    ctx.stroke();

    // Horizontal lifeline cable (extends left and right)
    ctx.strokeStyle = this.isConnected ? COLORS.safetyYellow : COLORS.steelLight;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 40, y + 10);
    ctx.lineTo(x + 70, y + 10);
    ctx.stroke();

    // Connection indicator
    if (this.isConnected) {
      ctx.fillStyle = COLORS.safetyGreen;
      ctx.beginPath();
      ctx.arc(x + 15, y + 18, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = COLORS.safetyGreen;
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CONNECTED', x + 15, y - 4);
    }

    ctx.restore();

    this.drawLabel(ctx);
    this.drawPrompt(ctx);
  }
}
