/* =============================================
   Working at Heights — Challenge 5: Carlos
   Report coworker working without protection
   ============================================= */

import { Challenge } from './Challenge';
import type { ChallengeContext } from './Challenge';
import type { ChallengeId } from '../types';
import type { Carlos } from '../entities/Carlos';
import { DIALOGUE_CARLOS_WARN, DIALOGUE_CARLOS_IGNORED } from '../data/dialogues';
import { CARLOS_IGNORE_TIMER } from '../data/constants';

export class CarlosChallenge extends Challenge {
  id: ChallengeId = 'carlos';
  name = 'Coworker Safety';

  private carlos: Carlos | null = null;
  private ignoreTimer = 0;
  private playerPassedCarlos = false;
  private timerStarted = false;

  /** Register Carlos entity */
  setCarlos(carlos: Carlos): void {
    this.carlos = carlos;
  }

  activate(_ctx: ChallengeContext): void {
    this.ignoreTimer = 0;
    this.timerStarted = false;
    this.playerPassedCarlos = false;
  }

  update(ctx: ChallengeContext, dt: number): void {
    if (this.completed || !this.carlos || ctx.dialogue.isActive()) return;

    const player = ctx.player;
    const carlosX = this.carlos.position.x;

    // Detect if player has been near Carlos (within visible range)
    if (Math.abs(player.position.x - carlosX) < 120 && !this.timerStarted) {
      this.timerStarted = true;
    }

    // Player walked past Carlos without talking
    if (this.timerStarted && !this.carlos.wasWarned) {
      this.ignoreTimer += dt * 1000;

      if (this.ignoreTimer >= CARLOS_IGNORE_TIMER) {
        // Player ignored Carlos too long
        this.attempts++;
        ctx.score.recordAttempt('carlos', false);
        ctx.dialogue.start(DIALOGUE_CARLOS_IGNORED, () => {
          this.carlos!.warn(); // Carlos clips in after supervisor intervention
          this.completed = true;
        });
      }
    }
  }

  /** Called when player talks to Carlos (presses C near him) */
  onTalkToCarlos(ctx: ChallengeContext): void {
    if (!this.carlos || this.carlos.wasWarned || this.completed) return;

    this.attempts++;
    this.carlos.warn();

    ctx.score.recordAttempt('carlos', true);
    ctx.dialogue.start(DIALOGUE_CARLOS_WARN, () => {
      this.completed = true;
    });
  }

  draw(_ctx: CanvasRenderingContext2D): void {
    // Carlos draws himself with danger indicator
  }
}
