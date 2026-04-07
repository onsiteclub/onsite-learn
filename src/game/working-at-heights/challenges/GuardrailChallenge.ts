/* =============================================
   Working at Heights — Challenge 3: The Guardrail
   Place guardrail at correct height (42")
   ============================================= */

import { Challenge } from './Challenge';
import type { ChallengeContext } from './Challenge';
import type { ChallengeId } from '../types';
import type { Guardrail } from '../objects/Guardrail';
import { DIALOGUE_GUARDRAIL_WRONG, DIALOGUE_GUARDRAIL_CORRECT } from '../data/dialogues';

export class GuardrailChallenge extends Challenge {
  id: ChallengeId = 'guardrail';
  name = 'Guardrail Installation';

  private guardrail: Guardrail | null = null;

  /** Register the guardrail object */
  setGuardrail(guardrail: Guardrail): void {
    this.guardrail = guardrail;
  }

  activate(_ctx: ChallengeContext): void {
    // Player can now interact with guardrail materials
  }

  /** Called when player confirms guardrail placement */
  onGuardrailPlaced(ctx: ChallengeContext): void {
    if (!this.guardrail) return;

    this.attempts++;
    const isCorrect = this.guardrail.confirmPlacement();

    if (isCorrect) {
      ctx.score.recordAttempt('guardrail', this.attempts === 1);
      ctx.dialogue.start(DIALOGUE_GUARDRAIL_CORRECT, () => {
        this.completed = true;
      });
    } else {
      ctx.score.recordAttempt('guardrail', false);
      ctx.dialogue.start(DIALOGUE_GUARDRAIL_WRONG, () => {
        // Reset guardrail for retry
        this.guardrail!.placed = false;
        this.guardrail!.installedHeight = null;
        this.guardrail!.isPlacing = false;
        this.failed = true;
      });
    }
  }

  update(ctx: ChallengeContext, _dt: number): void {
    if (this.completed || !this.guardrail || ctx.dialogue.isActive()) return;

    // Handle height selection input during placing mode
    if (this.guardrail.isPlacing) {
      if (ctx.input.wasJustPressed('arrowup') || ctx.input.wasJustPressed('w')) {
        this.guardrail.selectUp();
      }
      if (ctx.input.wasJustPressed('arrowdown') || ctx.input.wasJustPressed('s')) {
        this.guardrail.selectDown();
      }
      if (ctx.input.wasJustPressed('e')) {
        this.onGuardrailPlaced(ctx);
      }
    }
  }

  draw(_ctx: CanvasRenderingContext2D): void {
    // Guardrail draws itself
  }
}
