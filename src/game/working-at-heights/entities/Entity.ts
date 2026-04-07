/* =============================================
   Working at Heights — Base Entity
   All game entities (player, NPCs, objects) extend this
   ============================================= */

import type { AABB, Vector2, Direction } from '../types';

export abstract class Entity {
  id: string;
  position: Vector2;
  size: Vector2;
  velocity: Vector2 = { x: 0, y: 0 };
  direction: Direction = 'right';
  visible = true;
  active = true;

  constructor(id: string, x: number, y: number, width: number, height: number) {
    this.id = id;
    this.position = { x, y };
    this.size = { x: width, y: height };
  }

  /** Get AABB bounding box for collision */
  getBounds(): AABB {
    return {
      x: this.position.x,
      y: this.position.y,
      width: this.size.x,
      height: this.size.y,
    };
  }

  /** Get center position */
  getCenter(): Vector2 {
    return {
      x: this.position.x + this.size.x / 2,
      y: this.position.y + this.size.y / 2,
    };
  }

  /** Update entity (override in subclass) */
  abstract update(dt: number): void;

  /** Draw entity (override in subclass) */
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
