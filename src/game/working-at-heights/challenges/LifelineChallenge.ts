/* =============================================
   Working at Heights — Challenge 4: The Lifeline
   Must connect to lifeline before edge work
   ============================================= */

import { Challenge } from './Challenge';
import type { ChallengeContext } from './Challenge';
import type { ChallengeId } from '../types';
import type { Lifeline } from '../objects/Lifeline';
import { DIALOGUE_NO_LIFELINE, DIALOGUE_LIFELINE_CONNECTED } from '../data/dialogues';
import { PLATFORM_OBJECTS } from '../data/constants';

export class LifelineChallenge extends Challenge {
  id: ChallengeId = 'lifeline';
  name = 'Lifeline Connection';

  private lifeline: Lifeline | null = null;
  private warnedOnce = false;

  /** Register the lifeline object */
  setLifeline(lifeline: Lifeline): void {
    this.lifeline = lifeline;
  }

  activate(_ctx: ChallengeContext): void {
    // Player has harness equipped, needs to connect
  }

  update(ctx: ChallengeContext, _dt: number): void {
    if (this.completed || ctx.dialogue.isActive()) return;

    const player = ctx.player;
    const edgeX = PLATFORM_OBJECTS.edgeZone.x;

    // Player at edge without lifeline connection
    if (
      player.position.x >= edgeX - 40 &&
      !player.lifelineConnected &&
      player.harnessEquipped &&
      !this.warnedOnce
    ) {
      this.warnedOnce = true;
      this.attempts++;
      ctx.score.recordAttempt('lifeline', false);

      // Near-fall animation trigger + dialogue
      ctx.dialogue.start(DIALOGUE_NO_LIFELINE, () => {
        player.position.x = edgeX - 120;
        this.failed = true;
      });
    }
  }

  /** Called when player connects to lifeline via interaction */
  onLifelineConnected(ctx: ChallengeContext): void {
    if (!this.lifeline) return;

    this.lifeline.connect();
    ctx.player.lifelineConnected = true;
    this.attempts++;

    ctx.score.recordAttempt('lifeline', !this.warnedOnce);
    ctx.dialogue.start(DIALOGUE_LIFELINE_CONNECTED, () => {
      this.completed = true;
    });
  }

  draw(_ctx: CanvasRenderingContext2D): void {
    // Lifeline draws itself
  }
}
