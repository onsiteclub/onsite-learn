/* =============================================
   Working at Heights — Harness Object
   Fall protection harness on rack
   ============================================= */

import { InteractiveObject } from './InteractiveObject';
import { COLORS } from '../data/constants';

export class Harness extends InteractiveObject {
  onRack = true;  // Starts on the rack

  constructor(id: string, x: number, y: number) {
    super(id, 'harness', 'Harness', x, y - 40, 24, 40);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.pickedUp) return;

    const x = this.position.x;
    const y = this.position.y;

    ctx.save();

    if (this.onRack) {
      // Draw harness hanging on rack
      // Rack post
      ctx.fillStyle = COLORS.steelDark;
      ctx.fillRect(x - 4, y - 10, 4, 50);
      ctx.fillRect(x - 8, y - 14, 40, 4);

      // Harness shape (hanging)
      ctx.strokeStyle = COLORS.safetyOrange;
      ctx.lineWidth = 3;
      // Shoulder loops
      ctx.beginPath();
      ctx.moveTo(x + 4, y - 8);
      ctx.lineTo(x + 4, y + 10);
      ctx.lineTo(x + 12, y + 20);
      ctx.lineTo(x + 20, y + 10);
      ctx.lineTo(x + 20, y - 8);
      ctx.stroke();
      // Leg loops
      ctx.beginPath();
      ctx.moveTo(x + 8, y + 20);
      ctx.lineTo(x + 4, y + 34);
      ctx.moveTo(x + 16, y + 20);
      ctx.lineTo(x + 20, y + 34);
      ctx.stroke();
      // D-ring
      ctx.fillStyle = COLORS.steelLight;
      ctx.beginPath();
      ctx.arc(x + 12, y - 2, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    this.drawLabel(ctx);
    this.drawPrompt(ctx);
  }
}
