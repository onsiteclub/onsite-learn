/* =============================================
   Working at Heights — Input Manager
   Keyboard + touch input handler
   ============================================= */

import type { InputState } from '../types';

export class InputManager {
  private keys: Set<string> = new Set();
  private justPressed: Set<string> = new Set();
  private previousKeys: Set<string> = new Set();
  private target: HTMLElement | Window;

  constructor(target: HTMLElement | Window = window) {
    this.target = target;
    target.addEventListener('keydown', this.onKeyDown);
    target.addEventListener('keyup', this.onKeyUp);
  }

  private onKeyDown = (e: Event): void => {
    const key = (e as KeyboardEvent).key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'e', 'q', 'c'].includes(key)) {
      e.preventDefault();
    }
    if (!this.keys.has(key)) {
      this.justPressed.add(key);
    }
    this.keys.add(key);
  };

  private onKeyUp = (e: Event): void => {
    const key = (e as KeyboardEvent).key.toLowerCase();
    this.keys.delete(key);
  };

  /** Simulate a key press (used by touch controls) */
  simulateKeyDown(key: string): void {
    const k = key.toLowerCase();
    if (!this.keys.has(k)) {
      this.justPressed.add(k);
    }
    this.keys.add(k);
  }

  /** Simulate a key release (used by touch controls) */
  simulateKeyUp(key: string): void {
    this.keys.delete(key.toLowerCase());
  }

  /** Call once per frame after processing input */
  update(): void {
    this.previousKeys = new Set(this.keys);
    this.justPressed.clear();
  }

  /** Returns current continuous input state */
  getState(): InputState {
    return {
      left: this.keys.has('arrowleft') || this.keys.has('a'),
      right: this.keys.has('arrowright') || this.keys.has('d'),
      up: this.keys.has('arrowup') || this.keys.has('w'),
      down: this.keys.has('arrowdown') || this.keys.has('s'),
      jump: this.keys.has(' '),
      interact: this.keys.has('e'),
      equip: this.keys.has('q'),
      talk: this.keys.has('c'),
      advance: this.keys.has(' '),
    };
  }

  /** Check if a key was just pressed this frame (not held) */
  wasJustPressed(key: string): boolean {
    return this.justPressed.has(key.toLowerCase());
  }

  justInteract(): boolean {
    return this.wasJustPressed('e');
  }

  justEquip(): boolean {
    return this.wasJustPressed('q');
  }

  justTalk(): boolean {
    return this.wasJustPressed('c');
  }

  justAdvance(): boolean {
    return this.wasJustPressed(' ');
  }

  destroy(): void {
    this.target.removeEventListener('keydown', this.onKeyDown);
    this.target.removeEventListener('keyup', this.onKeyUp);
  }
}
