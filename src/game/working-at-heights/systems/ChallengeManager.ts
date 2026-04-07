/* =============================================
   Working at Heights — Challenge Manager
   Orchestrates the 5 challenges and their states
   ============================================= */

import type { ChallengeId, ChallengeStatus } from '../types';

export interface ChallengeDefinition {
  id: ChallengeId;
  name: string;
  description: string;
  status: ChallengeStatus;
  order: number;
}

export class ChallengeManager {
  private challenges: Map<ChallengeId, ChallengeDefinition> = new Map();

  constructor() {
    this.initChallenges();
  }

  private initChallenges(): void {
    const defs: ChallengeDefinition[] = [
      {
        id: 'ladder',
        name: 'The Right Ladder',
        description: 'Select and place the correct ladder to reach the platform.',
        status: 'available',
        order: 1,
      },
      {
        id: 'harness',
        name: 'Fall Protection',
        description: 'Equip the safety harness before approaching the edge.',
        status: 'locked',
        order: 2,
      },
      {
        id: 'guardrail',
        name: 'Guardrail Installation',
        description: 'Install the guardrail at the correct height.',
        status: 'locked',
        order: 3,
      },
      {
        id: 'lifeline',
        name: 'Lifeline Connection',
        description: 'Connect to the horizontal lifeline before edge work.',
        status: 'locked',
        order: 4,
      },
      {
        id: 'carlos',
        name: 'Coworker Safety',
        description: 'Notice and report Carlos working without protection.',
        status: 'locked',
        order: 5,
      },
    ];

    for (const def of defs) {
      this.challenges.set(def.id, def);
    }
  }

  /** Get a challenge by ID */
  get(id: ChallengeId): ChallengeDefinition | undefined {
    return this.challenges.get(id);
  }

  /** Get current active challenge */
  getActive(): ChallengeDefinition | undefined {
    return this.getAll().find((c) => c.status === 'active');
  }

  /** Get next available challenge */
  getNextAvailable(): ChallengeDefinition | undefined {
    return this.getAll().find((c) => c.status === 'available');
  }

  /** Start a challenge */
  activate(id: ChallengeId): void {
    const challenge = this.challenges.get(id);
    if (challenge && (challenge.status === 'available' || challenge.status === 'locked')) {
      challenge.status = 'active';
    }
  }

  /** Mark a challenge as passed */
  pass(id: ChallengeId): void {
    const challenge = this.challenges.get(id);
    if (challenge) {
      challenge.status = 'passed';
      this.unlockNext(challenge.order);
    }
  }

  /** Mark as failed (can retry) */
  fail(id: ChallengeId): void {
    const challenge = this.challenges.get(id);
    if (challenge) {
      challenge.status = 'available'; // Reset to available for retry
    }
  }

  /** Unlock the next challenge in sequence */
  private unlockNext(currentOrder: number): void {
    const next = this.getAll().find(
      (c) => c.order === currentOrder + 1 && c.status === 'locked',
    );
    if (next) next.status = 'available';
  }

  /** Check if all challenges are completed */
  allCompleted(): boolean {
    return this.getAll().every((c) => c.status === 'passed');
  }

  /** Get all challenges sorted by order */
  getAll(): ChallengeDefinition[] {
    return Array.from(this.challenges.values()).sort((a, b) => a.order - b.order);
  }

  /** Reset all challenges */
  reset(): void {
    this.challenges.clear();
    this.initChallenges();
  }
}
