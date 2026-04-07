/* =============================================
   Working at Heights — State Machine
   Manages game phases and transitions
   ============================================= */

import type { GamePhase } from '../types';

export type StateEnterFn = (from: GamePhase) => void;
export type StateExitFn = (to: GamePhase) => void;
export type StateUpdateFn = (dt: number) => void;

export interface StateHandler {
  onEnter?: StateEnterFn;
  onExit?: StateExitFn;
  onUpdate?: StateUpdateFn;
}

export class StateMachine {
  private currentState: GamePhase;
  private handlers: Map<GamePhase, StateHandler> = new Map();
  private history: GamePhase[] = [];

  constructor(initialState: GamePhase) {
    this.currentState = initialState;
  }

  /** Register a handler for a given state */
  addState(state: GamePhase, handler: StateHandler): void {
    this.handlers.set(state, handler);
  }

  /** Transition to a new state */
  transition(to: GamePhase): void {
    if (to === this.currentState) return;

    const from = this.currentState;
    const currentHandler = this.handlers.get(from);
    const nextHandler = this.handlers.get(to);

    currentHandler?.onExit?.(to);
    this.history.push(from);
    this.currentState = to;
    nextHandler?.onEnter?.(from);
  }

  /** Update the current state */
  update(dt: number): void {
    const handler = this.handlers.get(this.currentState);
    handler?.onUpdate?.(dt);
  }

  /** Get current state */
  getState(): GamePhase {
    return this.currentState;
  }

  /** Get previous state */
  getPreviousState(): GamePhase | null {
    return this.history.length > 0 ? this.history[this.history.length - 1] : null;
  }

  /** Go back to previous state */
  goBack(): void {
    const prev = this.history.pop();
    if (prev) {
      const from = this.currentState;
      const currentHandler = this.handlers.get(from);
      const prevHandler = this.handlers.get(prev);

      currentHandler?.onExit?.(prev);
      this.currentState = prev;
      prevHandler?.onEnter?.(from);
    }
  }

  /** Check if in a specific state */
  isIn(state: GamePhase): boolean {
    return this.currentState === state;
  }
}
