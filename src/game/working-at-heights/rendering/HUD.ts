/* =============================================
   Working at Heights — HUD (Heads-Up Display)
   On-screen UI: inventory indicator, controls, challenge progress
   ============================================= */

import type { ChallengeManager } from '../systems/ChallengeManager';
import { CANVAS_WIDTH, COLORS } from '../data/constants';

export class HUD {
  /** Draw all HUD elements */
  draw(
    ctx: CanvasRenderingContext2D,
    carriedItem: string | null,
    harnessEquipped: boolean,
    lifelineConnected: boolean,
    challengeManager: ChallengeManager,
  ): void {
    this.drawInventory(ctx, carriedItem, harnessEquipped, lifelineConnected);
    this.drawControls(ctx);
    this.drawChallengeProgress(ctx, challengeManager);
  }

  private drawInventory(
    ctx: CanvasRenderingContext2D,
    carriedItem: string | null,
    harness: boolean,
    lifeline: boolean,
  ): void {
    const x = 12;
    const y = 12;

    ctx.save();

    // Background
    ctx.fillStyle = COLORS.hudBg;
    ctx.beginPath();
    ctx.roundRect(x, y, 160, 50, 6);
    ctx.fill();

    // Title
    ctx.fillStyle = COLORS.steelLight;
    ctx.font = '9px monospace';
    ctx.fillText('EQUIPMENT', x + 8, y + 14);

    // Carried item
    ctx.fillStyle = COLORS.dialogueText;
    ctx.font = '11px monospace';
    ctx.fillText(`Carrying: ${carriedItem || '—'}`, x + 8, y + 30);

    // Status indicators
    const statusY = y + 42;
    // Harness
    ctx.fillStyle = harness ? COLORS.safetyGreen : COLORS.steelDark;
    ctx.fillRect(x + 8, statusY, 8, 8);
    ctx.fillStyle = COLORS.dialogueText;
    ctx.font = '8px monospace';
    ctx.fillText('Harness', x + 20, statusY + 7);

    // Lifeline
    ctx.fillStyle = lifeline ? COLORS.safetyGreen : COLORS.steelDark;
    ctx.fillRect(x + 80, statusY, 8, 8);
    ctx.fillText('Lifeline', x + 92, statusY + 7);

    ctx.restore();
  }

  private drawControls(ctx: CanvasRenderingContext2D): void {
    const x = CANVAS_WIDTH - 140;
    const y = 12;

    ctx.save();

    ctx.fillStyle = COLORS.hudBg;
    ctx.beginPath();
    ctx.roundRect(x, y, 128, 70, 6);
    ctx.fill();

    ctx.fillStyle = COLORS.steelLight;
    ctx.font = '9px monospace';
    ctx.fillText('CONTROLS', x + 8, y + 14);

    ctx.fillStyle = COLORS.dialogueText;
    ctx.font = '9px monospace';
    const controls = [
      'WASD / ← → ↑ ↓  Move',
      'SPACE         Jump',
      'E             Interact',
      'Q             Equip',
      'C             Talk',
    ];

    controls.forEach((line, i) => {
      ctx.fillText(line, x + 8, y + 28 + i * 12);
    });

    ctx.restore();
  }

  private drawChallengeProgress(ctx: CanvasRenderingContext2D, manager: ChallengeManager): void {
    const challenges = manager.getAll();
    const x = 12;
    const y = 72;

    ctx.save();

    ctx.fillStyle = COLORS.hudBg;
    ctx.beginPath();
    ctx.roundRect(x, y, 160, 20 + challenges.length * 16, 6);
    ctx.fill();

    ctx.fillStyle = COLORS.steelLight;
    ctx.font = '9px monospace';
    ctx.fillText('CHALLENGES', x + 8, y + 14);

    challenges.forEach((c, i) => {
      const cy = y + 28 + i * 16;

      // Status icon
      let icon = '○';
      let color = COLORS.steelDark;
      if (c.status === 'passed') {
        icon = '●';
        color = COLORS.safetyGreen;
      } else if (c.status === 'active') {
        icon = '◐';
        color = COLORS.safetyYellow;
      } else if (c.status === 'available') {
        icon = '○';
        color = COLORS.dialogueText;
      }

      ctx.fillStyle = color;
      ctx.font = '11px monospace';
      ctx.fillText(icon, x + 10, cy);

      ctx.fillStyle = c.status === 'locked' ? COLORS.steelDark : COLORS.dialogueText;
      ctx.font = '9px monospace';
      ctx.fillText(c.name, x + 26, cy);
    });

    ctx.restore();
  }
}
