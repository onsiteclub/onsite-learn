/* =============================================
   Working at Heights — Renderer
   Canvas 2D rendering coordinator
   ============================================= */

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../data/constants';

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    // Set canvas size
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Pixel-perfect rendering
    this.ctx.imageSmoothingEnabled = false;
  }

  /** Clear the entire canvas */
  clear(): void {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  /** Resize canvas to fit container while maintaining aspect ratio */
  fitToContainer(container: HTMLElement): void {
    const containerW = container.clientWidth;
    const containerH = container.clientHeight;
    const aspect = CANVAS_WIDTH / CANVAS_HEIGHT;

    let displayW = containerW;
    let displayH = containerW / aspect;

    if (displayH > containerH) {
      displayH = containerH;
      displayW = containerH * aspect;
    }

    this.canvas.style.width = `${displayW}px`;
    this.canvas.style.height = `${displayH}px`;
  }

  /** Get canvas context */
  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }
}
