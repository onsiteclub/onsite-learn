/* =============================================
   Working at Heights — Inventory System
   Single-item inventory with visual indicator
   ============================================= */

import type { Player } from '../entities/Player';
import type { InteractiveObject } from '../objects/InteractiveObject';

export class InventorySystem {
  private player: Player;
  private droppedCallback?: (itemId: string, x: number, y: number) => void;

  constructor(player: Player) {
    this.player = player;
  }

  /** Set callback for when items are dropped */
  onDrop(callback: (itemId: string, x: number, y: number) => void): void {
    this.droppedCallback = callback;
  }

  /** Try to pick up an object */
  pickUp(obj: InteractiveObject): boolean {
    if (this.player.carriedItem !== null) return false;
    if (!obj.interactable || obj.pickedUp) return false;

    obj.pickedUp = true;
    obj.visible = false;
    this.player.pickUp(obj.id);
    return true;
  }

  /** Drop current item at player position */
  drop(): string | null {
    const itemId = this.player.drop();
    if (itemId && this.droppedCallback) {
      this.droppedCallback(itemId, this.player.position.x, this.player.position.y);
    }
    return itemId;
  }

  /** Check if player is carrying a specific item type */
  isCarrying(itemId: string): boolean {
    return this.player.carriedItem === itemId;
  }

  /** Check if player has anything */
  hasItem(): boolean {
    return this.player.carriedItem !== null;
  }

  /** Get current item ID */
  getCurrentItem(): string | null {
    return this.player.carriedItem;
  }

  /** Equip harness (special action — removes from inventory, applies to player) */
  equipHarness(): boolean {
    if (this.player.carriedItem?.includes('harness')) {
      this.player.carriedItem = null;
      this.player.harnessEquipped = true;
      return true;
    }
    return false;
  }
}
