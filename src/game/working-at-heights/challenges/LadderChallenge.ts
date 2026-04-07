/* =============================================
   Working at Heights — Challenge 1: The Ladder
   Pick correct ladder (13ft) and place at wall
   ============================================= */

import { Challenge } from './Challenge';
import type { ChallengeContext } from './Challenge';
import type { ChallengeId, LadderSize } from '../types';
import type { Ladder } from '../objects/Ladder';
import {
  DIALOGUE_LADDER_8FT,
  DIALOGUE_LADDER_10FT,
  DIALOGUE_LADDER_13FT,
} from '../data/dialogues';

export class LadderChallenge extends Challenge {
  id: ChallengeId = 'ladder';
  name = 'The Right Ladder';

  private ladders: Ladder[] = [];
  private placedLadder: Ladder | null = null;

  /** Register the three ladder objects */
  setLadders(ladders: Ladder[]): void {
    this.ladders = ladders;
  }

  activate(_ctx: ChallengeContext): void {
    // Challenge starts — ladders are in staging area
  }

  /** Called when player places a ladder at the wall */
  onLadderPlaced(ladder: Ladder, ctx: ChallengeContext): void {
    this.attempts++;
    this.placedLadder = ladder;

    const dialogueMap: Record<LadderSize, typeof DIALOGUE_LADDER_8FT> = {
      '8ft': DIALOGUE_LADDER_8FT,
      '10ft': DIALOGUE_LADDER_10FT,
      '13ft': DIALOGUE_LADDER_13FT,
    };

    const dialogue = dialogueMap[ladder.ladderSize];

    if (ladder.ladderSize === '13ft') {
      // Correct!
      ctx.score.recordAttempt('ladder', true);
      ctx.dialogue.start(dialogue, () => {
        this.completed = true;
        ladder.placedAtWall = true;
      });
    } else {
      // Wrong — explain why
      ctx.score.recordAttempt('ladder', false);
      ctx.dialogue.start(dialogue, () => {
        // Reset: return ladder to staging
        ladder.placedAtWall = false;
        ladder.pickedUp = false;
        ladder.visible = true;
        this.placedLadder = null;
        this.failed = true;
      });
    }
  }

  update(_ctx: ChallengeContext, _dt: number): void {
    // Monitoring handled by onLadderPlaced callback
  }

  draw(_ctx: CanvasRenderingContext2D): void {
    // Ladders draw themselves
  }
}
