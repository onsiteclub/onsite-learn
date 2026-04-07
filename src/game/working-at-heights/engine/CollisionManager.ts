/* =============================================
   Working at Heights — Collision Manager
   Simple AABB collision detection
   ============================================= */

import type { AABB, Vector2 } from '../types';

export class CollisionManager {
  /** Check if two AABB boxes overlap */
  static checkAABB(a: AABB, b: AABB): boolean {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  /** Check if a point is inside an AABB */
  static pointInAABB(point: Vector2, box: AABB): boolean {
    return (
      point.x >= box.x &&
      point.x <= box.x + box.width &&
      point.y >= box.y &&
      point.y <= box.y + box.height
    );
  }

  /** Get the distance between centers of two AABBs */
  static centerDistance(a: AABB, b: AABB): number {
    const acx = a.x + a.width / 2;
    const acy = a.y + a.height / 2;
    const bcx = b.x + b.width / 2;
    const bcy = b.y + b.height / 2;
    return Math.sqrt((acx - bcx) ** 2 + (acy - bcy) ** 2);
  }

  /** Distance from entity center to nearest point on target AABB */
  static nearestDistance(entity: AABB, target: AABB): number {
    const ecx = entity.x + entity.width / 2;
    const ecy = entity.y + entity.height / 2;

    // Clamp entity center to target bounds → nearest point on target
    const nearX = Math.max(target.x, Math.min(ecx, target.x + target.width));
    const nearY = Math.max(target.y, Math.min(ecy, target.y + target.height));

    return Math.sqrt((ecx - nearX) ** 2 + (ecy - nearY) ** 2);
  }

  /** Check if entity is within interaction range of an object */
  static isInRange(entity: AABB, target: AABB, range: number): boolean {
    return this.nearestDistance(entity, target) <= range;
  }

  /** Resolve collision by pushing entity out of solid (returns correction vector) */
  static resolveCollision(moving: AABB, solid: AABB): Vector2 | null {
    if (!this.checkAABB(moving, solid)) return null;

    const overlapX1 = (moving.x + moving.width) - solid.x;
    const overlapX2 = (solid.x + solid.width) - moving.x;
    const overlapY1 = (moving.y + moving.height) - solid.y;
    const overlapY2 = (solid.y + solid.height) - moving.y;

    const minOverlapX = Math.min(overlapX1, overlapX2);
    const minOverlapY = Math.min(overlapY1, overlapY2);

    if (minOverlapX < minOverlapY) {
      return { x: overlapX1 < overlapX2 ? -overlapX1 : overlapX2, y: 0 };
    } else {
      return { x: 0, y: overlapY1 < overlapY2 ? -overlapY1 : overlapY2 };
    }
  }
}
