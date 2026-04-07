/* =============================================
   Working at Heights — Guardrail Object
   Placeable with height selection (36", 42", 48")
   ============================================= */

import { InteractiveObject } from './InteractiveObject';
import type { GuardrailHeight } from '../types';
import { COLORS, GUARDRAIL_CORRECT_HEIGHT } from '../data/constants';

const HEIGHT_VALUES: Record<GuardrailHeight, number> = {
  '36in': 60,
  '42in': 70,
  '48in': 80,
};

export class Guardrail extends InteractiveObject {
  isPlacing = false;               // Currently being placed
  selectedHeight: GuardrailHeight = '42in';
  installedHeight: GuardrailHeight | null = null;
  isCorrect = false;

  private heightOptions: GuardrailHeight[] = ['36in', '42in', '48in'];
  private selectedIndex = 1; // Start at 42in

  constructor(id: string, x: number, y: number) {
    super(id, 'guardrail', 'Guardrail Kit', x, y - 30, 40, 30);
  }

  /** Cycle height selection up */
  selectUp(): void {
    this.selectedIndex = Math.min(this.selectedIndex + 1, this.heightOptions.length - 1);
    this.selectedHeight = this.heightOptions[this.selectedIndex];
  }

  /** Cycle height selection down */
  selectDown(): void {
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    this.selectedHeight = this.heightOptions[this.selectedIndex];
  }

  /** Confirm placement */
  confirmPlacement(): boolean {
    this.installedHeight = this.selectedHeight;
    this.isPlacing = false;
    this.placed = true;
    this.isCorrect = this.selectedHeight === GUARDRAIL_CORRECT_HEIGHT;
    return this.isCorrect;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.pickedUp) return;

    const x = this.position.x;
    const y = this.position.y;

    ctx.save();

    if (this.placed && this.installedHeight) {
      // Draw installed guardrail
      const h = HEIGHT_VALUES[this.installedHeight];
      const color = this.isCorrect ? COLORS.safetyGreen : COLORS.safetyRed;

      // Posts
      ctx.fillStyle = COLORS.steel;
      ctx.fillRect(x, y + this.size.y - h, 4, h);
      ctx.fillRect(x + 36, y + this.size.y - h, 4, h);

      // Top rail
      ctx.fillStyle = color;
      ctx.fillRect(x - 2, y + this.size.y - h, 44, 4);

      // Mid rail
      ctx.fillStyle = color;
      ctx.fillRect(x - 2, y + this.size.y - h / 2, 44, 3);

      // Height label
      ctx.fillStyle = COLORS.dialogueText;
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(this.installedHeight, x + 20, y + this.size.y - h - 6);
    } else if (this.isPlacing) {
      // Draw height selection guides
      for (let i = 0; i < this.heightOptions.length; i++) {
        const opt = this.heightOptions[i];
        const h = HEIGHT_VALUES[opt];
        const isSelected = i === this.selectedIndex;

        ctx.strokeStyle = isSelected ? COLORS.safetyYellow : COLORS.steelLight;
        ctx.lineWidth = isSelected ? 3 : 1;
        ctx.setLineDash(isSelected ? [] : [4, 4]);

        // Guide line
        ctx.beginPath();
        ctx.moveTo(x - 10, y + this.size.y - h);
        ctx.lineTo(x + 50, y + this.size.y - h);
        ctx.stroke();

        // Label
        ctx.fillStyle = isSelected ? COLORS.safetyYellow : COLORS.steelLight;
        ctx.font = isSelected ? 'bold 11px monospace' : '9px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(opt, x - 14, y + this.size.y - h + 4);
      }

      ctx.setLineDash([]);

      // Arrow indicators
      ctx.fillStyle = COLORS.safetyYellow;
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('▲', x + 20, y - 20);
      ctx.fillText('▼', x + 20, y + this.size.y + 20);
    } else {
      // Draw as material pile on platform
      ctx.fillStyle = COLORS.steel;
      ctx.fillRect(x, y, 40, 6);
      ctx.fillRect(x + 2, y + 6, 36, 6);
      ctx.fillRect(x + 4, y + 12, 32, 6);
      ctx.fillRect(x, y + 18, 40, 6);

      // Label
      ctx.fillStyle = COLORS.steelLight;
      ctx.fillRect(x + 8, y + 4, 24, 14);
      ctx.fillStyle = COLORS.steelDark;
      ctx.font = '7px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GUARD', x + 20, y + 13);
    }

    ctx.restore();

    if (!this.placed && !this.isPlacing) {
      this.drawLabel(ctx);
      this.drawPrompt(ctx);
    }
  }
}
