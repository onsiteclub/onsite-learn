/* =============================================
   Working at Heights — Result Screen
   Final score with star rating and regulation summary
   ============================================= */

import type { GameScore } from '../types';
import { REGULATIONS } from '../data/regulations';
import { CANVAS_WIDTH, CANVAS_HEIGHT, COLORS, MAX_STARS } from '../data/constants';

export class ResultScreen {
  private score: GameScore | null = null;
  private visible = false;

  show(score: GameScore): void {
    this.score = score;
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  isVisible(): boolean {
    return this.visible;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.visible || !this.score) return;

    // Full-screen overlay
    ctx.save();
    ctx.fillStyle = 'rgba(28, 31, 35, 0.92)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const cx = CANVAS_WIDTH / 2;

    // Title
    ctx.fillStyle = COLORS.dialogueText;
    ctx.font = 'bold 28px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SHIFT COMPLETE', cx, 80);

    // Stars
    const starSize = 32;
    const starGap = 12;
    const totalStarWidth = MAX_STARS * starSize + (MAX_STARS - 1) * starGap;
    const starStartX = cx - totalStarWidth / 2;

    for (let i = 0; i < MAX_STARS; i++) {
      const sx = starStartX + i * (starSize + starGap) + starSize / 2;
      const sy = 130;

      ctx.fillStyle = i < this.score.stars ? COLORS.starFilled : COLORS.starEmpty;
      this.drawStar(ctx, sx, sy, starSize / 2 - 2, starSize / 2, 5);
    }

    // Score text
    ctx.fillStyle = COLORS.dialogueText;
    ctx.font = '14px monospace';
    ctx.fillText(`${this.score.stars} / ${MAX_STARS} challenges passed on first try`, cx, 175);

    // Time
    const mins = Math.floor(this.score.totalTime / 60);
    const secs = this.score.totalTime % 60;
    ctx.fillStyle = COLORS.steelLight;
    ctx.font = '12px monospace';
    ctx.fillText(`Time: ${mins}m ${secs}s`, cx, 200);

    // Challenge results
    ctx.textAlign = 'left';
    const tableX = cx - 280;
    let tableY = 240;

    ctx.fillStyle = COLORS.safetyYellow;
    ctx.font = 'bold 14px monospace';
    ctx.fillText('Challenge Results', tableX, tableY);
    tableY += 24;

    for (const result of this.score.results) {
      const reg = REGULATIONS.find((r) => r.challengeId === result.challengeId);
      const icon = result.passedFirstTry ? '★' : '☆';
      const color = result.passedFirstTry ? COLORS.safetyGreen : COLORS.safetyRed;

      ctx.fillStyle = color;
      ctx.font = '13px monospace';
      ctx.fillText(icon, tableX, tableY);

      ctx.fillStyle = COLORS.dialogueText;
      ctx.fillText(reg?.title || result.challengeId, tableX + 20, tableY);

      ctx.fillStyle = COLORS.steelLight;
      ctx.font = '10px monospace';
      ctx.fillText(
        result.passedFirstTry ? 'First try!' : `${result.attempts} attempts`,
        tableX + 380,
        tableY,
      );

      // Regulation reference
      if (reg) {
        ctx.fillStyle = COLORS.steelLight;
        ctx.font = '9px monospace';
        ctx.fillText(`${reg.code} — ${reg.description}`, tableX + 20, tableY + 14);
      }

      tableY += 36;
    }

    // Restart prompt
    ctx.textAlign = 'center';
    ctx.fillStyle = COLORS.safetyYellow;
    ctx.font = 'bold 14px monospace';
    ctx.fillText('Press SPACE to play again', cx, CANVAS_HEIGHT - 40);

    ctx.restore();
  }

  private drawStar(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    innerR: number,
    outerR: number,
    points: number,
  ): void {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }
}
