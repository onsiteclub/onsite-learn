/* =============================================
   Working at Heights — Player Entity
   Novato: yellow helmet, green vest
   ============================================= */

import { Entity } from './Entity';
import type { InputState, AABB } from '../types';
import {
  GRAVITY,
  PLAYER_SPEED,
  PLAYER_JUMP,
  CLIMB_SPEED,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  GROUND_Y,
  COLORS,
} from '../data/constants';

export class Player extends Entity {
  isGrounded = false;
  isClimbing = false;
  carriedItem: string | null = null;
  harnessEquipped = false;
  lifelineConnected = false;

  // Climbing state
  climbLadderBaseY = 0;   // Bottom Y of the ladder
  climbLadderTopY = 0;    // Top Y of the ladder
  climbLadderX = 0;       // X position to lock to while climbing

  // Animation
  private animFrame = 0;
  private animTimer = 0;
  private isWalking = false;

  constructor(x: number, y: number) {
    super('player', x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
  }

  /** Process input and update position */
  handleInput(input: InputState): void {
    // Climbing mode
    if (this.isClimbing) {
      this.velocity.x = 0; // Lock horizontal movement
      this.velocity.y = 0;
      if (input.up) this.velocity.y = -CLIMB_SPEED;
      if (input.down) this.velocity.y = CLIMB_SPEED;
      return;
    }

    // Horizontal movement
    if (input.left) {
      this.velocity.x = -PLAYER_SPEED;
      this.direction = 'left';
      this.isWalking = true;
    } else if (input.right) {
      this.velocity.x = PLAYER_SPEED;
      this.direction = 'right';
      this.isWalking = true;
    } else {
      this.velocity.x = 0;
      this.isWalking = false;
    }

    // Jumping (only on ground, not for reaching platform)
    if (input.jump && this.isGrounded) {
      this.velocity.y = PLAYER_JUMP;
      this.isGrounded = false;
    }
  }

  update(dt: number): void {
    if (this.isClimbing) {
      // Lock X to ladder center
      this.position.x = this.climbLadderX - this.size.x / 2;

      // Apply climb velocity
      this.position.y += this.velocity.y;

      // Clamp to ladder range
      const minY = this.climbLadderTopY;
      const maxY = this.climbLadderBaseY - this.size.y;
      this.position.y = Math.max(minY, Math.min(this.position.y, maxY));

      // If climbed back to bottom, exit climbing
      if (this.position.y >= maxY) {
        this.position.y = maxY;
        this.isGrounded = true;
      }

      // Animation
      this.animTimer += dt;
      if (this.animTimer > 0.2) {
        this.animTimer = 0;
        this.animFrame = (this.animFrame + 1) % 2;
      }
      return;
    }

    // Apply gravity
    this.velocity.y += GRAVITY;

    // Apply velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Ground collision
    if (this.position.y + this.size.y >= GROUND_Y) {
      this.position.y = GROUND_Y - this.size.y;
      this.velocity.y = 0;
      this.isGrounded = true;
    }

    // World bounds
    this.position.x = Math.max(0, this.position.x);

    // Animation timer
    this.animTimer += dt;
    if (this.animTimer > 0.15) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 4;
    }
  }

  /** Start climbing a ladder */
  startClimbing(ladderX: number, ladderTopY: number, ladderBaseY: number): void {
    this.isClimbing = true;
    this.isGrounded = false;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.climbLadderX = ladderX;
    this.climbLadderTopY = ladderTopY;
    this.climbLadderBaseY = ladderBaseY;
    // Snap to ladder
    this.position.x = ladderX - this.size.x / 2;
  }

  /** Stop climbing and land on surface */
  stopClimbing(): void {
    this.isClimbing = false;
    this.velocity.y = 0;
  }

  /** Check if player reached the top of the ladder */
  isAtLadderTop(): boolean {
    return this.isClimbing && this.position.y <= this.climbLadderTopY;
  }

  /** Check if player can land on a platform (only used when stepping off ladder) */
  landOnPlatform(platformBounds: AABB): void {
    if (
      this.velocity.y > 0 &&
      this.position.y + this.size.y >= platformBounds.y &&
      this.position.y + this.size.y <= platformBounds.y + platformBounds.height + 4 &&
      this.position.x + this.size.x > platformBounds.x &&
      this.position.x < platformBounds.x + platformBounds.width
    ) {
      this.position.y = platformBounds.y - this.size.y;
      this.velocity.y = 0;
      this.isGrounded = true;
    }
  }

  /** Pick up an item */
  pickUp(itemId: string): boolean {
    if (this.carriedItem !== null) return false;
    this.carriedItem = itemId;
    return true;
  }

  /** Drop current item */
  drop(): string | null {
    const item = this.carriedItem;
    this.carriedItem = null;
    return item;
  }

  /** Draw player sprite (code-drawn, ready to swap for PNG) */
  draw(ctx: CanvasRenderingContext2D): void {
    const x = this.position.x;
    const y = this.position.y;
    const flip = this.direction === 'left';

    ctx.save();

    if (this.isClimbing) {
      // Climbing pose — facing the ladder (no flip)
      ctx.translate(x, y);
      this.drawClimbingPose(ctx);
    } else if (flip) {
      ctx.translate(x + this.size.x, y);
      ctx.scale(-1, 1);
      this.drawStandingPose(ctx);
    } else {
      ctx.translate(x, y);
      this.drawStandingPose(ctx);
    }

    ctx.restore();

    // Carried item indicator (above head)
    if (this.carriedItem) {
      this.drawCarriedIndicator(ctx, x + this.size.x / 2, y - 10);
    }
  }

  private drawStandingPose(ctx: CanvasRenderingContext2D): void {
    // Boots
    ctx.fillStyle = COLORS.boots;
    ctx.fillRect(4, 40, 10, 8);
    ctx.fillRect(18, 40, 10, 8);

    // Pants
    ctx.fillStyle = COLORS.pants;
    ctx.fillRect(6, 28, 8, 14);
    ctx.fillRect(18, 28, 8, 14);

    // Body / vest
    ctx.fillStyle = COLORS.vestGreen;
    ctx.fillRect(4, 16, 24, 14);

    // Arms
    ctx.fillStyle = COLORS.skinTone;
    ctx.fillRect(0, 18, 6, 10);
    ctx.fillRect(26, 18, 6, 10);

    // Head
    ctx.fillStyle = COLORS.skinTone;
    ctx.fillRect(10, 6, 12, 12);

    // Helmet
    ctx.fillStyle = COLORS.helmetYellow;
    ctx.fillRect(8, 2, 16, 8);
    ctx.fillRect(6, 8, 20, 3);

    this.drawEquipment(ctx);
  }

  private drawClimbingPose(ctx: CanvasRenderingContext2D): void {
    // Climbing animation: arms up alternating
    const armOffset = this.animFrame === 0 ? -4 : 4;

    // Boots on rung
    ctx.fillStyle = COLORS.boots;
    ctx.fillRect(8, 40, 8, 8);
    ctx.fillRect(16, 40 + armOffset, 8, 8);

    // Pants
    ctx.fillStyle = COLORS.pants;
    ctx.fillRect(8, 28, 8, 14);
    ctx.fillRect(16, 28 + armOffset, 8, 14);

    // Body / vest
    ctx.fillStyle = COLORS.vestGreen;
    ctx.fillRect(6, 16, 20, 14);

    // Arms reaching up (alternating)
    ctx.fillStyle = COLORS.skinTone;
    ctx.fillRect(2, 10 - armOffset, 6, 12);
    ctx.fillRect(24, 10 + armOffset, 6, 12);

    // Head (looking up slightly)
    ctx.fillStyle = COLORS.skinTone;
    ctx.fillRect(10, 4, 12, 12);

    // Helmet
    ctx.fillStyle = COLORS.helmetYellow;
    ctx.fillRect(8, 0, 16, 8);
    ctx.fillRect(6, 6, 20, 3);

    this.drawEquipment(ctx);
  }

  private drawEquipment(ctx: CanvasRenderingContext2D): void {
    // Harness indicator
    if (this.harnessEquipped) {
      ctx.strokeStyle = COLORS.safetyOrange;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, 16);
      ctx.lineTo(16, 28);
      ctx.lineTo(22, 16);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(10, 22);
      ctx.lineTo(22, 22);
      ctx.stroke();
    }

    // Lifeline indicator
    if (this.lifelineConnected) {
      ctx.strokeStyle = COLORS.safetyYellow;
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(16, 16);
      ctx.lineTo(16, -20);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  private drawCarriedIndicator(ctx: CanvasRenderingContext2D, cx: number, cy: number): void {
    ctx.save();
    ctx.fillStyle = COLORS.hudBg;
    ctx.beginPath();
    ctx.roundRect(cx - 30, cy - 10, 60, 16, 4);
    ctx.fill();
    ctx.fillStyle = COLORS.dialogueText;
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(this.carriedItem!, cx, cy + 2);
    ctx.restore();
  }
}
