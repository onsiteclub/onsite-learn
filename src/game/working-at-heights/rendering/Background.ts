/* =============================================
   Working at Heights — Background Renderer
   Static construction site scene
   ============================================= */

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GROUND_Y,
  PLATFORM_X,
  PLATFORM_Y,
  PLATFORM_WIDTH,
  PLATFORM_HEIGHT,
  LADDER_WALL_X,
  LADDER_PLACE_ZONE,
  COLORS,
} from '../data/constants';

export class Background {
  /** Draw the full static background scene */
  draw(ctx: CanvasRenderingContext2D, ladderPlaced?: boolean): void {
    this.drawSky(ctx);
    this.drawClouds(ctx);
    this.drawDistantBuildings(ctx);
    this.drawGround(ctx);
    this.drawPlatform(ctx);
    this.drawStagingArea(ctx);
    if (!ladderPlaced) this.drawLadderZone(ctx);
    this.drawEdgeZone(ctx);
  }

  private drawSky(ctx: CanvasRenderingContext2D): void {
    const gradient = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    gradient.addColorStop(0, COLORS.skyGradientTop);
    gradient.addColorStop(1, COLORS.skyGradientBottom);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y);
  }

  private drawClouds(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    // Cloud 1
    ctx.beginPath();
    ctx.ellipse(200, 80, 60, 20, 0, 0, Math.PI * 2);
    ctx.ellipse(230, 70, 40, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    // Cloud 2
    ctx.beginPath();
    ctx.ellipse(800, 60, 50, 16, 0, 0, Math.PI * 2);
    ctx.ellipse(830, 50, 35, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    // Cloud 3
    ctx.beginPath();
    ctx.ellipse(1100, 100, 45, 15, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawDistantBuildings(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'rgba(107, 114, 128, 0.3)';
    // Distant buildings silhouette
    ctx.fillRect(50, GROUND_Y - 200, 60, 200);
    ctx.fillRect(130, GROUND_Y - 150, 50, 150);
    ctx.fillRect(900, GROUND_Y - 180, 70, 180);
    ctx.fillRect(1000, GROUND_Y - 220, 55, 220);
    ctx.fillRect(1080, GROUND_Y - 160, 65, 160);
  }

  private drawGround(ctx: CanvasRenderingContext2D): void {
    // Dirt/gravel ground
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);

    // Ground line
    ctx.strokeStyle = '#6B5B3E';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
    ctx.stroke();

    // Gravel texture dots
    ctx.fillStyle = '#9B8B6B';
    for (let i = 0; i < 40; i++) {
      const gx = (i * 37 + 13) % CANVAS_WIDTH;
      const gy = GROUND_Y + 10 + ((i * 23) % (CANVAS_HEIGHT - GROUND_Y - 20));
      ctx.fillRect(gx, gy, 3, 2);
    }
  }

  private drawPlatform(ctx: CanvasRenderingContext2D): void {
    // Support columns
    ctx.fillStyle = COLORS.steelDark;
    const colWidth = 12;
    ctx.fillRect(PLATFORM_X + 20, PLATFORM_Y, colWidth, GROUND_Y - PLATFORM_Y);
    ctx.fillRect(PLATFORM_X + PLATFORM_WIDTH - 32, PLATFORM_Y, colWidth, GROUND_Y - PLATFORM_Y);
    // Middle support
    ctx.fillRect(PLATFORM_X + PLATFORM_WIDTH / 2 - 6, PLATFORM_Y, colWidth, GROUND_Y - PLATFORM_Y);

    // Cross braces
    ctx.strokeStyle = COLORS.steelDark;
    ctx.lineWidth = 3;
    // Left brace
    ctx.beginPath();
    ctx.moveTo(PLATFORM_X + 26, PLATFORM_Y + 30);
    ctx.lineTo(PLATFORM_X + PLATFORM_WIDTH / 2, GROUND_Y - 30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(PLATFORM_X + PLATFORM_WIDTH / 2, PLATFORM_Y + 30);
    ctx.lineTo(PLATFORM_X + 26, GROUND_Y - 30);
    ctx.stroke();

    // Platform deck
    ctx.fillStyle = COLORS.wood;
    ctx.fillRect(PLATFORM_X, PLATFORM_Y - PLATFORM_HEIGHT, PLATFORM_WIDTH, PLATFORM_HEIGHT);

    // Deck planks
    ctx.strokeStyle = COLORS.woodDark;
    ctx.lineWidth = 1;
    for (let px = PLATFORM_X; px < PLATFORM_X + PLATFORM_WIDTH; px += 30) {
      ctx.beginPath();
      ctx.moveTo(px, PLATFORM_Y - PLATFORM_HEIGHT);
      ctx.lineTo(px, PLATFORM_Y);
      ctx.stroke();
    }

    // Platform edge border (top)
    ctx.fillStyle = COLORS.steelLight;
    ctx.fillRect(PLATFORM_X - 4, PLATFORM_Y - PLATFORM_HEIGHT - 3, PLATFORM_WIDTH + 8, 3);
  }

  private drawStagingArea(ctx: CanvasRenderingContext2D): void {
    // Staging area floor marking
    ctx.strokeStyle = COLORS.safetyYellow;
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.strokeRect(30, GROUND_Y - 2, 350, 2);
    ctx.setLineDash([]);

    // "STAGING AREA" label
    ctx.fillStyle = COLORS.safetyYellow;
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('STAGING AREA', 200, GROUND_Y + 20);
    ctx.textAlign = 'left';
  }

  private drawLadderZone(ctx: CanvasRenderingContext2D): void {
    const zoneX = LADDER_PLACE_ZONE.x;
    const zoneW = LADDER_PLACE_ZONE.width;
    const zoneBottom = GROUND_Y;
    const zoneTop = PLATFORM_Y - PLATFORM_HEIGHT;

    // Vertical guide area (ghosted)
    ctx.fillStyle = 'rgba(255, 215, 0, 0.08)';
    ctx.fillRect(zoneX, zoneTop, zoneW, zoneBottom - zoneTop);

    // Ground marker — dashed yellow rectangle
    ctx.strokeStyle = COLORS.safetyYellow;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(zoneX, zoneBottom - 4, zoneW, 4);
    ctx.setLineDash([]);

    // Arrow pointing down to the zone
    const cx = LADDER_WALL_X;
    ctx.fillStyle = COLORS.safetyYellow;
    ctx.globalAlpha = 0.6;
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('▼ PLACE LADDER HERE', cx, zoneBottom + 16);
    ctx.globalAlpha = 1;

    // Vertical guide lines on wall side
    ctx.strokeStyle = COLORS.safetyYellow;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    ctx.setLineDash([4, 8]);
    ctx.beginPath();
    ctx.moveTo(cx, zoneTop);
    ctx.lineTo(cx, zoneBottom);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }

  private drawEdgeZone(ctx: CanvasRenderingContext2D): void {
    // Danger zone marking at platform edge (right side, open edge)
    const edgeX = PLATFORM_X + PLATFORM_WIDTH - 4;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.fillRect(edgeX - 80, PLATFORM_Y - PLATFORM_HEIGHT - 60, 84, 60);

    // Danger stripes on edge
    ctx.fillStyle = COLORS.safetyRed;
    ctx.fillRect(edgeX, PLATFORM_Y - PLATFORM_HEIGHT - 60, 4, 60);

    // "OPEN EDGE" label
    ctx.fillStyle = COLORS.safetyRed;
    ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('OPEN EDGE', edgeX - 40, PLATFORM_Y - PLATFORM_HEIGHT - 65);
    ctx.textAlign = 'left';
  }
}
