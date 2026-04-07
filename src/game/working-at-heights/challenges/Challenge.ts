/* =============================================
   Working at Heights — Base Challenge Interface
   Each challenge implements this contract
   ============================================= */

import type { ChallengeId } from '../types';
import type { Player } from '../entities/Player';
import type { DialogueSystem } from '../systems/DialogueSystem';
import type { ScoreSystem } from '../systems/ScoreSystem';
import type { InputManager } from '../engine/InputManager';

export interface ChallengeContext {
  player: Player;
  dialogue: DialogueSystem;
  score: ScoreSystem;
  input: InputManager;
}

export abstract class Challenge {
  abstract id: ChallengeId;
  abstract name: string;

  protected completed = false;
  protected failed = false;
  protected attempts = 0;

  /** Check if challenge is completed */
  isCompleted(): boolean {
    return this.completed;
  }

  /** Check if challenge needs retry */
  hasFailed(): boolean {
    return this.failed;
  }

  /** Called when the challenge becomes active */
  abstract activate(ctx: ChallengeContext): void;

  /** Called each frame while active */
  abstract update(ctx: ChallengeContext, dt: number): void;

  /** Draw any challenge-specific visuals */
  abstract draw(ctx: CanvasRenderingContext2D): void;

  /** Reset for retry */
  reset(): void {
    this.failed = false;
  }
}
