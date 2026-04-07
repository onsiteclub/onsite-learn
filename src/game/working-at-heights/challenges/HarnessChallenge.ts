/* =============================================
   Working at Heights — Challenge 2: The Harness
   Must equip harness before approaching edge
   ============================================= */

import { Challenge } from './Challenge';
import type { ChallengeContext } from './Challenge';
import type { ChallengeId } from '../types';
import { DIALOGUE_NO_HARNESS, DIALOGUE_HARNESS_EQUIP } from '../data/dialogues';
import { PLATFORM_OBJECTS } from '../data/constants';

export class HarnessChallenge extends Challenge {
  id: ChallengeId = 'harness';
  name = 'Fall Protection';

  private warnedOnce = false;

  activate(_ctx: ChallengeContext): void {
    // Player has climbed to platform
  }

  update(ctx: ChallengeContext, _dt: number): void {
    if (this.completed || ctx.dialogue.isActive()) return;

    const player = ctx.player;
    const edgeX = PLATFORM_OBJECTS.edgeZone.x;

    // Player approaching edge without harness
    if (player.position.x >= edgeX - 80 && !player.harnessEquipped && !this.warnedOnce) {
      this.warnedOnce = true;
      this.attempts++;
      ctx.score.recordAttempt('harness', false);

      // Freeze and show warning
      ctx.dialogue.start(DIALOGUE_NO_HARNESS, () => {
        // Push player back
        player.position.x = edgeX - 150;
        this.failed = true;
      });
      return;
    }

    // Player equipped harness and pressed Q
    if (player.harnessEquipped && !this.completed) {
      this.completed = true;
      ctx.score.recordAttempt('harness', !this.warnedOnce);
    }
  }

  /** Called when player equips harness via inventory */
  onHarnessEquipped(ctx: ChallengeContext): void {
    ctx.dialogue.start(DIALOGUE_HARNESS_EQUIP, () => {
      this.completed = true;
      if (!this.warnedOnce) {
        ctx.score.recordAttempt('harness', true);
      }
    });
  }

  draw(_ctx: CanvasRenderingContext2D): void {
    // Visual handled by player harness indicator
  }
}
