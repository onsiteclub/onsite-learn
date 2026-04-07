/* =============================================
   Working at Heights — Title Screen
   Start screen with game title and instructions
   ============================================= */

import { CANVAS_WIDTH, CANVAS_HEIGHT, COLORS } from '../data/constants';

export class TitleScreen {
  private visible = true;

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  isVisible(): boolean {
    return this.visible;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.visible) return;

    ctx.save();

    // Background
    ctx.fillStyle = COLORS.dialogueBg;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const cx = CANVAS_WIDTH / 2;

    // Safety stripes (top)
    for (let i = 0; i < CANVAS_WIDTH; i += 40) {
      ctx.fillStyle = i % 80 === 0 ? COLORS.safetyYellow : COLORS.dialogueBg;
      ctx.fillRect(i, 0, 20, 8);
    }

    // Title
    ctx.fillStyle = COLORS.safetyYellow;
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('WORKING AT HEIGHTS', cx, 200);

    // Subtitle
    ctx.fillStyle = COLORS.dialogueText;
    ctx.font = '16px monospace';
    ctx.fillText('Construction Safety Training Game', cx, 240);

    // Helmet icon (simple)
    ctx.fillStyle = COLORS.helmetYellow;
    ctx.beginPath();
    ctx.arc(cx, 320, 30, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(cx - 35, 320, 70, 8);

    // Instructions
    ctx.fillStyle = COLORS.steelLight;
    ctx.font = '13px monospace';
    ctx.fillText('Help the rookie navigate safety procedures', cx, 400);
    ctx.fillText('on his first day at a construction site.', cx, 420);

    // Controls summary
    ctx.fillStyle = COLORS.dialogueText;
    ctx.font = '11px monospace';
    ctx.fillText('WASD / Arrows — Move    |    SPACE — Jump', cx, 470);
    ctx.fillText('E — Interact    |    Q — Equip    |    C — Talk', cx, 490);

    // Start prompt
    ctx.fillStyle = COLORS.safetyYellow;
    ctx.font = 'bold 18px monospace';
    const blink = Math.floor(Date.now() / 600) % 2 === 0;
    if (blink) {
      ctx.fillText('Press SPACE to start', cx, 560);
    }

    // Safety stripes (bottom)
    for (let i = 0; i < CANVAS_WIDTH; i += 40) {
      ctx.fillStyle = i % 80 === 0 ? COLORS.safetyYellow : COLORS.dialogueBg;
      ctx.fillRect(i, CANVAS_HEIGHT - 8, 20, 8);
    }

    // Regulation footer
    ctx.fillStyle = COLORS.steelDark;
    ctx.font = '9px monospace';
    ctx.fillText('Based on Ontario OHSA & O. Reg. 213/91 Construction Regulations', cx, CANVAS_HEIGHT - 20);

    ctx.restore();
  }
}
