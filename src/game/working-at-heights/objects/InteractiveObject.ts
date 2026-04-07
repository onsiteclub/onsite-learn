/* =============================================
   Working at Heights — Base Interactive Object
   Objects the player can pick up, place, or interact with
   ============================================= */

import { Entity } from '../entities/Entity';
import type { ObjectType } from '../types';
import { COLORS, INTERACT_RANGE } from '../data/constants';

export abstract class InteractiveObject extends Entity {
  objectType: ObjectType;
  label: string;
  interactable = true;
  pickedUp = false;
  placed = false;
  showPrompt = false;  // Show "Press E" prompt

  constructor(
    id: string,
    type: ObjectType,
    label: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    super(id, x, y, width, height);
    this.objectType = type;
    this.label = label;
  }

  /** Show interaction prompt when player is near */
  setPromptVisible(visible: boolean): void {
    this.showPrompt = visible && this.interactable && !this.pickedUp;
  }

  /** Draw "Press E" prompt above object */
  protected drawPrompt(ctx: CanvasRenderingContext2D): void {
    if (!this.showPrompt) return;

    const cx = this.position.x + this.size.x / 2;
    const cy = this.position.y - 20;

    ctx.save();
    ctx.fillStyle = COLORS.hudBg;
    ctx.beginPath();
    ctx.roundRect(cx - 28, cy - 10, 56, 18, 4);
    ctx.fill();

    ctx.fillStyle = COLORS.safetyYellow;
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[E] Grab', cx, cy + 3);
    ctx.restore();
  }

  /** Draw label below object */
  protected drawLabel(ctx: CanvasRenderingContext2D): void {
    if (this.pickedUp) return;

    const cx = this.position.x + this.size.x / 2;
    const cy = this.position.y + this.size.y + 14;

    ctx.save();
    ctx.fillStyle = COLORS.dialogueText;
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(this.label, cx, cy);
    ctx.restore();
  }

  update(_dt: number): void {
    // Base objects don't need per-frame updates
  }
}
