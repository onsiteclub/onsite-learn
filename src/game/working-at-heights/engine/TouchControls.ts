/* =============================================
   Working at Heights — Touch Controls
   On-screen mobile controls (only shown on touch devices)
   ============================================= */

import type { InputManager } from './InputManager';
import { CANVAS_WIDTH, CANVAS_HEIGHT, COLORS } from '../data/constants';

interface TouchButton {
  x: number;
  y: number;
  w: number;
  h: number;
  key: string;
  label: string;
  icon?: string;
  group: 'dpad' | 'action';
}

export class TouchControls {
  private canvas: HTMLCanvasElement;
  private input: InputManager;
  readonly isTouchDevice: boolean;
  private buttons: TouchButton[] = [];
  private activeTouches: Map<number, string[]> = new Map(); // touchId -> keys[]
  private activeKeys: Set<string> = new Set();

  constructor(canvas: HTMLCanvasElement, input: InputManager) {
    this.canvas = canvas;
    this.input = input;
    this.isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (this.isTouchDevice) {
      this.setupButtons();
      this.setupListeners();
    }
  }

  private setupButtons(): void {
    const bw = 72;
    const bh = 64;
    const pad = 6;

    // Left side — D-pad
    const dpadLeft = 20;
    const dpadBottom = CANVAS_HEIGHT - 20;

    this.buttons = [
      // D-pad
      {
        x: dpadLeft,
        y: dpadBottom - bh,
        w: bw,
        h: bh,
        key: 'arrowleft',
        label: '◄',
        group: 'dpad',
      },
      {
        x: dpadLeft + bw + pad,
        y: dpadBottom - bh - bh - pad,
        w: bw,
        h: bh,
        key: 'arrowup',
        label: '▲',
        group: 'dpad',
      },
      {
        x: dpadLeft + (bw + pad) * 2,
        y: dpadBottom - bh,
        w: bw,
        h: bh,
        key: 'arrowright',
        label: '►',
        group: 'dpad',
      },

      // Right side — Action buttons (2x2 grid)
      {
        x: CANVAS_WIDTH - dpadLeft - bw * 2 - pad,
        y: dpadBottom - bh * 2 - pad,
        w: bw,
        h: bh,
        key: 'e',
        label: 'E',
        icon: 'Act',
        group: 'action',
      },
      {
        x: CANVAS_WIDTH - dpadLeft - bw,
        y: dpadBottom - bh * 2 - pad,
        w: bw,
        h: bh,
        key: 'c',
        label: 'C',
        icon: 'Talk',
        group: 'action',
      },
      {
        x: CANVAS_WIDTH - dpadLeft - bw * 2 - pad,
        y: dpadBottom - bh,
        w: bw,
        h: bh,
        key: 'q',
        label: 'Q',
        icon: 'Equip',
        group: 'action',
      },
      {
        x: CANVAS_WIDTH - dpadLeft - bw,
        y: dpadBottom - bh,
        w: bw,
        h: bh,
        key: ' ',
        label: '⏎',
        icon: 'Jump',
        group: 'action',
      },
    ];
  }

  private setupListeners(): void {
    this.canvas.addEventListener('touchstart', this.onTouchStart, {
      passive: false,
    });
    this.canvas.addEventListener('touchmove', this.onTouchMove, {
      passive: false,
    });
    this.canvas.addEventListener('touchend', this.onTouchEnd, {
      passive: false,
    });
    this.canvas.addEventListener('touchcancel', this.onTouchEnd, {
      passive: false,
    });
  }

  private toCanvasCoords(touch: Touch): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (touch.clientX - rect.left) * (this.canvas.width / rect.width),
      y: (touch.clientY - rect.top) * (this.canvas.height / rect.height),
    };
  }

  private getButtonsAtPoint(cx: number, cy: number): string[] {
    const keys: string[] = [];
    for (const btn of this.buttons) {
      if (
        cx >= btn.x &&
        cx <= btn.x + btn.w &&
        cy >= btn.y &&
        cy <= btn.y + btn.h
      ) {
        keys.push(btn.key);
      }
    }
    return keys;
  }

  private onTouchStart = (e: TouchEvent): void => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      const { x, y } = this.toCanvasCoords(touch);
      const keys = this.getButtonsAtPoint(x, y);

      if (keys.length > 0) {
        this.activeTouches.set(touch.identifier, keys);
        for (const key of keys) {
          this.activeKeys.add(key);
          this.input.simulateKeyDown(key);
        }
      } else {
        // Tap on empty area during title/dialogue → advance (SPACE)
        this.activeTouches.set(touch.identifier, [' ']);
        this.activeKeys.add(' ');
        this.input.simulateKeyDown(' ');
      }
    }
  };

  private onTouchMove = (e: TouchEvent): void => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      const { x, y } = this.toCanvasCoords(touch);
      const newKeys = this.getButtonsAtPoint(x, y);
      const oldKeys = this.activeTouches.get(touch.identifier) || [];

      // Release old keys that are no longer touched
      for (const key of oldKeys) {
        if (!newKeys.includes(key)) {
          this.input.simulateKeyUp(key);
          this.activeKeys.delete(key);
        }
      }

      // Press new keys
      for (const key of newKeys) {
        if (!oldKeys.includes(key)) {
          this.activeKeys.add(key);
          this.input.simulateKeyDown(key);
        }
      }

      this.activeTouches.set(touch.identifier, newKeys);
    }
  };

  private onTouchEnd = (e: TouchEvent): void => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      const keys = this.activeTouches.get(touch.identifier) || [];

      for (const key of keys) {
        this.input.simulateKeyUp(key);
        this.activeKeys.delete(key);
      }

      this.activeTouches.delete(touch.identifier);
    }
  };

  /** Draw on-screen controls (call on the UI layer, after camera restore) */
  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.isTouchDevice) return;

    ctx.save();

    for (const btn of this.buttons) {
      const isActive = this.activeKeys.has(btn.key);

      // Button background
      ctx.fillStyle = isActive
        ? 'rgba(255, 215, 0, 0.45)'
        : 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.roundRect(btn.x, btn.y, btn.w, btn.h, 10);
      ctx.fill();

      // Button border
      ctx.strokeStyle = isActive
        ? COLORS.safetyYellow
        : 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(btn.x, btn.y, btn.w, btn.h, 10);
      ctx.stroke();

      // Label
      ctx.fillStyle = isActive ? COLORS.safetyYellow : 'rgba(255,255,255,0.8)';
      ctx.textAlign = 'center';

      if (btn.icon) {
        // Two-line: big letter + small label
        ctx.font = 'bold 22px monospace';
        ctx.fillText(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2 - 4);
        ctx.font = '9px monospace';
        ctx.fillText(btn.icon, btn.x + btn.w / 2, btn.y + btn.h / 2 + 14);
      } else {
        // D-pad arrows
        ctx.font = 'bold 28px monospace';
        ctx.fillText(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2 + 10);
      }
    }

    ctx.restore();
  }

  destroy(): void {
    this.canvas.removeEventListener('touchstart', this.onTouchStart);
    this.canvas.removeEventListener('touchmove', this.onTouchMove);
    this.canvas.removeEventListener('touchend', this.onTouchEnd);
    this.canvas.removeEventListener('touchcancel', this.onTouchEnd);
  }
}
