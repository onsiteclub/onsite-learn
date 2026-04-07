/* =============================================
   Working at Heights — Input Manager
   Keyboard handler for WASD/Arrows + E/Q/C/SPACE
   ============================================= */

import type { InputState } from '../types';

export class InputManager {
  private keys: Set<string> = new Set();
  private justPressed: Set<string> = new Set();
  private previousKeys: Set<string> = new Set();

  constructor(target: HTMLElement | Window = window) {
    target.addEventListener('keydown', this.onKeyDown);
    target.addEventListener('keyup', this.onKeyUp);
  }

  private onKeyDown = (e: Event): void => {
    const key = (e as KeyboardEvent).key.toLowerCase();
    // Prevent default for game keys
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

  /** Check if interact (E) was just pressed */
  justInteract(): boolean {
    return this.wasJustPressed('e');
  }

  /** Check if equip (Q) was just pressed */
  justEquip(): boolean {
    return this.wasJustPressed('q');
  }

  /** Check if talk (C) was just pressed */
  justTalk(): boolean {
    return this.wasJustPressed('c');
  }

  /** Check if advance (SPACE) was just pressed */
  justAdvance(): boolean {
    return this.wasJustPressed(' ');
  }

  destroy(target: HTMLElement | Window = window): void {
    target.removeEventListener('keydown', this.onKeyDown);
    target.removeEventListener('keyup', this.onKeyUp);
  }
}
