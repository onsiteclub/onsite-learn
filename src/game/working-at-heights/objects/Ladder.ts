/* =============================================
   Working at Heights — Ladder Object
   Three sizes: 8ft, 10ft, 13ft
   ============================================= */

import { InteractiveObject } from './InteractiveObject';
import type { LadderSize, AABB } from '../types';
import {
  COLORS,
  GROUND_Y,
  LADDER_WALL_X,
  LADDER_8FT_TOP,
  LADDER_10FT_TOP,
  LADDER_13FT_TOP,
} from '../data/constants';

const LADDER_VISUAL_HEIGHTS: Record<LadderSize, number> = {
  '8ft': 100,
  '10ft': 130,
  '13ft': 170,
};

const LADDER_TOP_Y: Record<LadderSize, number> = {
  '8ft': LADDER_8FT_TOP,
  '10ft': LADDER_10FT_TOP,
  '13ft': LADDER_13FT_TOP,
};

export class Ladder extends InteractiveObject {
  ladderSize: LadderSize;
  placedAtWall = false;
  visualHeight: number;

  // Original staging position (for reset)
  private originalX: number;
  private originalY: number;

  constructor(id: string, size: LadderSize, x: number, y: number) {
    const height = LADDER_VISUAL_HEIGHTS[size];
    super(id, 'ladder', `Ladder ${size}`, x, y - height, 20, height);
    this.ladderSize = size;
    this.visualHeight = height;
    this.originalX = x;
    this.originalY = y - height;
  }

  /** Place ladder against the platform wall */
  placeAtWall(): void {
    this.placedAtWall = true;
    this.pickedUp = false;
    this.visible = true;
    this.interactable = false; // Can't pick up a placed ladder
    this.position.x = LADDER_WALL_X - 10;
    this.position.y = GROUND_Y - this.visualHeight;
  }

  /** Reset ladder back to staging area */
  resetToStaging(): void {
    this.placedAtWall = false;
    this.pickedUp = false;
    this.visible = true;
    this.interactable = true;
    this.position.x = this.originalX;
    this.position.y = this.originalY;
  }

  /** Get the top Y position when placed (where the ladder reaches) */
  getTopY(): number {
    return LADDER_TOP_Y[this.ladderSize];
  }

  /** Get the base Y position (always ground level) */
  getBaseY(): number {
    return GROUND_Y;
  }

  /** Get the X center of the placed ladder */
  getPlacedCenterX(): number {
    return LADDER_WALL_X;
  }

  /** Get the climb zone — AABB at the base of the placed ladder where player can start climbing */
  getClimbZone(): AABB {
    return {
      x: LADDER_WALL_X - 20,
      y: GROUND_Y - 60,
      width: 40,
      height: 60,
    };
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.pickedUp) return;

    const x = this.position.x;
    const h = this.visualHeight;

    ctx.save();

    if (this.placedAtWall) {
      // Draw leaning against wall — from ground up
      const baseX = LADDER_WALL_X - 10;
      const baseY = GROUND_Y;
      const topY = GROUND_Y - h;

      // Slight lean angle
      ctx.translate(baseX, baseY);
      ctx.rotate(-0.12);
      this.drawLadderShape(ctx, 0, -h, h);

      // Size label at bottom
      ctx.fillStyle = COLORS.safetyYellow;
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(this.ladderSize, 9, -4);

      ctx.restore();

      // Draw "reach" indicator — dotted line at ladder top
      ctx.save();
      ctx.strokeStyle = COLORS.safetyYellow;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(baseX - 20, topY);
      ctx.lineTo(baseX + 40, topY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      ctx.restore();
    } else {
      // Draw standing upright in staging area
      const y = this.position.y;
      this.drawLadderShape(ctx, x, y, h);
      ctx.restore();

      this.drawLabel(ctx);
      this.drawPrompt(ctx);
    }
  }

  private drawLadderShape(ctx: CanvasRenderingContext2D, x: number, y: number, h: number): void {
    const w = 18;
    const rungSpacing = 20;

    // Side rails
    ctx.fillStyle = COLORS.wood;
    ctx.fillRect(x, y, 4, h);
    ctx.fillRect(x + w - 4, y, 4, h);

    // Rungs
    ctx.fillStyle = COLORS.woodDark;
    const rungs = Math.floor(h / rungSpacing);
    for (let i = 1; i <= rungs; i++) {
      const ry = y + h - i * rungSpacing;
      ctx.fillRect(x + 2, ry, w - 4, 3);
    }

    // Size label on ladder
    ctx.fillStyle = COLORS.safetyYellow;
    ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(this.ladderSize, x + w / 2, y + h - 6);
  }
}
