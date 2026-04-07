/* =============================================
   Working at Heights — Dialogue System
   RPG-style text box with typewriter effect
   ============================================= */

import type { DialogueSequence, DialogueLine } from '../types';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  DIALOGUE_BOX_HEIGHT,
  DIALOGUE_BOX_MARGIN,
  DIALOGUE_PORTRAIT_SIZE,
  DIALOGUE_TEXT_SPEED,
  COLORS,
} from '../data/constants';

export class DialogueSystem {
  private active = false;
  private currentSequence: DialogueSequence | null = null;
  private currentLineIndex = 0;
  private displayedChars = 0;
  private charTimer = 0;
  private lineComplete = false;
  private onCompleteCallback?: () => void;

  /** Check if dialogue is currently active */
  isActive(): boolean {
    return this.active;
  }

  /** Start a dialogue sequence */
  start(sequence: DialogueSequence, onComplete?: () => void): void {
    this.active = true;
    this.currentSequence = sequence;
    this.currentLineIndex = 0;
    this.displayedChars = 0;
    this.charTimer = 0;
    this.lineComplete = false;
    this.onCompleteCallback = onComplete;
  }

  /** Advance dialogue (SPACE press) */
  advance(): void {
    if (!this.active || !this.currentSequence) return;

    if (!this.lineComplete) {
      // Skip typewriter — show full line immediately
      const line = this.currentSequence.lines[this.currentLineIndex];
      this.displayedChars = line.text.length;
      this.lineComplete = true;
      return;
    }

    // Move to next line
    this.currentLineIndex++;
    if (this.currentLineIndex >= this.currentSequence.lines.length) {
      // Dialogue complete
      this.active = false;
      this.currentSequence.onComplete?.();
      this.onCompleteCallback?.();
      this.currentSequence = null;
      return;
    }

    // Reset for next line
    this.displayedChars = 0;
    this.charTimer = 0;
    this.lineComplete = false;
  }

  /** Update typewriter effect */
  update(dt: number): void {
    if (!this.active || !this.currentSequence || this.lineComplete) return;

    const line = this.currentSequence.lines[this.currentLineIndex];
    this.charTimer += dt * 1000; // convert to ms

    while (this.charTimer >= DIALOGUE_TEXT_SPEED && this.displayedChars < line.text.length) {
      this.displayedChars++;
      this.charTimer -= DIALOGUE_TEXT_SPEED;
    }

    if (this.displayedChars >= line.text.length) {
      this.lineComplete = true;
    }
  }

  /** Draw the dialogue box on canvas */
  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.active || !this.currentSequence) return;

    const line = this.currentSequence.lines[this.currentLineIndex];
    const boxY = CANVAS_HEIGHT - DIALOGUE_BOX_HEIGHT - DIALOGUE_BOX_MARGIN;
    const boxX = DIALOGUE_BOX_MARGIN;
    const boxW = CANVAS_WIDTH - DIALOGUE_BOX_MARGIN * 2;
    const boxH = DIALOGUE_BOX_HEIGHT;

    ctx.save();

    // Box background
    ctx.fillStyle = COLORS.dialogueBg;
    ctx.globalAlpha = 0.95;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Box border
    ctx.strokeStyle = COLORS.dialogueBorder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 8);
    ctx.stroke();

    // Portrait area
    const portraitX = boxX + 12;
    const portraitY = boxY + (boxH - DIALOGUE_PORTRAIT_SIZE) / 2;

    // Portrait background
    ctx.fillStyle = COLORS.charcoalLight;
    ctx.beginPath();
    ctx.roundRect(portraitX, portraitY, DIALOGUE_PORTRAIT_SIZE, DIALOGUE_PORTRAIT_SIZE, 6);
    ctx.fill();

    // Portrait placeholder (colored by character)
    this.drawPortrait(ctx, line, portraitX, portraitY);

    // Speaker name
    const textX = portraitX + DIALOGUE_PORTRAIT_SIZE + 16;
    const nameY = boxY + 28;

    ctx.fillStyle = COLORS.dialogueNameBg;
    const nameWidth = ctx.measureText(line.speaker).width + 16;
    ctx.beginPath();
    ctx.roundRect(textX - 4, nameY - 14, nameWidth, 20, 4);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(line.speaker, textX + 4, nameY);

    // Dialogue text (typewriter)
    const displayText = line.text.substring(0, this.displayedChars);
    ctx.fillStyle = COLORS.dialogueText;
    ctx.font = '13px monospace';

    // Word wrap
    const maxWidth = boxW - DIALOGUE_PORTRAIT_SIZE - 52;
    this.drawWrappedText(ctx, displayText, textX, nameY + 24, maxWidth, 18);

    // "SPACE to continue" indicator
    if (this.lineComplete) {
      ctx.fillStyle = COLORS.steelLight;
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('▼ SPACE', boxX + boxW - 16, boxY + boxH - 12);
    }

    ctx.restore();
  }

  private drawPortrait(
    ctx: CanvasRenderingContext2D,
    line: DialogueLine,
    x: number,
    y: number,
  ): void {
    const size = DIALOGUE_PORTRAIT_SIZE;
    const cx = x + size / 2;
    const cy = y + size / 2;

    // Simple character icon based on speaker
    let helmetColor = COLORS.helmetYellow;
    if (line.speaker === 'Supervisor') helmetColor = COLORS.helmetWhite;
    if (line.speaker === 'Carlos') helmetColor = COLORS.helmetOrange;

    // Face
    ctx.fillStyle = COLORS.skinTone;
    ctx.beginPath();
    ctx.arc(cx, cy + 8, 18, 0, Math.PI * 2);
    ctx.fill();

    // Helmet
    ctx.fillStyle = helmetColor;
    ctx.beginPath();
    ctx.arc(cx, cy - 2, 20, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(cx - 24, cy - 2, 48, 6);

    // Eyes
    ctx.fillStyle = '#1C1F23';
    ctx.fillRect(cx - 8, cy + 4, 4, 4);
    ctx.fillRect(cx + 4, cy + 4, 4, 4);
  }

  private drawWrappedText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ): void {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (const word of words) {
      const testLine = line + (line ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && line) {
        ctx.fillText(line, x, currentY);
        line = word;
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    if (line) {
      ctx.fillText(line, x, currentY);
    }
  }
}
