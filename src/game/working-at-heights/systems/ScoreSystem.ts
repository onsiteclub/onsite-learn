/* =============================================
   Working at Heights — Score System
   1-5 stars based on first-try passes
   ============================================= */

import type { ChallengeId, ChallengeResult, GameScore } from '../types';
import { MAX_STARS } from '../data/constants';

export class ScoreSystem {
  private results: Map<ChallengeId, ChallengeResult> = new Map();
  private startTime: number = 0;

  /** Start timing */
  start(): void {
    this.startTime = Date.now();
  }

  /** Record a challenge attempt */
  recordAttempt(challengeId: ChallengeId, passed: boolean): void {
    const existing = this.results.get(challengeId);

    if (existing) {
      existing.attempts++;
      if (passed) existing.passedFirstTry = existing.attempts === 1;
    } else {
      this.results.set(challengeId, {
        challengeId,
        passedFirstTry: passed,
        attempts: 1,
      });
    }
  }

  /** Get star count (1 star per first-try pass) */
  getStars(): number {
    let stars = 0;
    Array.from(this.results.values()).forEach((result) => {
      if (result.passedFirstTry) stars++;
    });
    return Math.max(1, Math.min(stars, MAX_STARS));
  }

  /** Get final score */
  getFinalScore(): GameScore {
    return {
      stars: this.getStars(),
      results: Array.from(this.results.values()),
      totalTime: Math.round((Date.now() - this.startTime) / 1000),
    };
  }

  /** Check if a specific challenge was passed on first try */
  wasFirstTry(challengeId: ChallengeId): boolean {
    return this.results.get(challengeId)?.passedFirstTry ?? false;
  }

  /** Get attempts for a challenge */
  getAttempts(challengeId: ChallengeId): number {
    return this.results.get(challengeId)?.attempts ?? 0;
  }

  /** Reset all scores */
  reset(): void {
    this.results.clear();
    this.startTime = Date.now();
  }
}
