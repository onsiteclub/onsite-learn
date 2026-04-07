/* =============================================
   Working at Heights — Main Game Class
   Orchestrates all systems, entities, and rendering
   ============================================= */

import { GameLoop } from './engine/GameLoop';
import { InputManager } from './engine/InputManager';
import { StateMachine } from './engine/StateMachine';
import { Camera } from './engine/Camera';
import { CollisionManager } from './engine/CollisionManager';
import { TouchControls } from './engine/TouchControls';

import { Renderer } from './rendering/Renderer';
import { Background } from './rendering/Background';
import { HUD } from './rendering/HUD';

import { Player } from './entities/Player';
import { Supervisor } from './entities/Supervisor';
import { Carlos } from './entities/Carlos';

import { Ladder } from './objects/Ladder';
import { Harness } from './objects/Harness';
import { Guardrail } from './objects/Guardrail';
import { Lifeline } from './objects/Lifeline';

import { InventorySystem } from './systems/InventorySystem';
import { DialogueSystem } from './systems/DialogueSystem';
import { ScoreSystem } from './systems/ScoreSystem';
import { ChallengeManager } from './systems/ChallengeManager';

import { LadderChallenge } from './challenges/LadderChallenge';
import { HarnessChallenge } from './challenges/HarnessChallenge';
import { GuardrailChallenge } from './challenges/GuardrailChallenge';
import { LifelineChallenge } from './challenges/LifelineChallenge';
import { CarlosChallenge } from './challenges/CarlosChallenge';

import { TitleScreen } from './scenes/TitleScreen';
import { ResultScreen } from './scenes/ResultScreen';

import { DIALOGUE_INTRO } from './data/dialogues';
import type { GamePhase } from './types';
import type { InteractiveObject } from './objects/InteractiveObject';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GROUND_Y,
  PLATFORM_X,
  PLATFORM_Y,
  PLATFORM_WIDTH,
  PLATFORM_HEIGHT,
  STAGING_AREA,
  PLATFORM_OBJECTS,
  INTERACT_RANGE,
  LADDER_WALL_X,
  LADDER_PLACE_ZONE,
  COLORS,
} from './data/constants';

export class Game {
  // Core
  private renderer: Renderer;
  private gameLoop: GameLoop;
  private input: InputManager;
  private touchControls: TouchControls;
  private stateMachine: StateMachine;
  private camera: Camera;

  // Rendering layers
  private background: Background;
  private hud: HUD;

  // Entities
  private player: Player;
  private supervisor: Supervisor;
  private carlos: Carlos;

  // Objects
  private ladder8ft: Ladder;
  private ladder10ft: Ladder;
  private ladder13ft: Ladder;
  private harness: Harness;
  private guardrail: Guardrail;
  private lifeline: Lifeline;
  private allObjects: InteractiveObject[];

  // Ladder state
  private placedLadder: Ladder | null = null;
  private ladderCorrect = false;  // True when 13ft is placed and player has climbed
  private showPlacePrompt = false;

  // Systems
  private inventory: InventorySystem;
  private dialogue: DialogueSystem;
  private score: ScoreSystem;
  private challengeManager: ChallengeManager;

  // Challenges
  private ladderChallenge: LadderChallenge;
  private harnessChallenge: HarnessChallenge;
  private guardrailChallenge: GuardrailChallenge;
  private lifelineChallenge: LifelineChallenge;
  private carlosChallenge: CarlosChallenge;

  // Screens
  private titleScreen: TitleScreen;
  private resultScreen: ResultScreen;

  constructor(canvas: HTMLCanvasElement) {
    // --- Core setup ---
    this.renderer = new Renderer(canvas);
    this.input = new InputManager(window);
    this.touchControls = new TouchControls(canvas, this.input);
    this.stateMachine = new StateMachine('title');
    this.camera = new Camera(CANVAS_WIDTH, CANVAS_HEIGHT);

    // --- Rendering ---
    this.background = new Background();
    this.hud = new HUD();

    // --- Entities ---
    this.player = new Player(100, GROUND_Y - 48);
    this.supervisor = new Supervisor(350);
    this.carlos = new Carlos(
      PLATFORM_OBJECTS.carlosPosition.x,
      PLATFORM_OBJECTS.carlosPosition.y,
    );

    // --- Objects ---
    this.ladder8ft = new Ladder('ladder-8ft', '8ft', STAGING_AREA.ladder8ft.x, STAGING_AREA.ladder8ft.y);
    this.ladder10ft = new Ladder('ladder-10ft', '10ft', STAGING_AREA.ladder10ft.x, STAGING_AREA.ladder10ft.y);
    this.ladder13ft = new Ladder('ladder-13ft', '13ft', STAGING_AREA.ladder13ft.x, STAGING_AREA.ladder13ft.y);
    this.harness = new Harness('harness', PLATFORM_OBJECTS.harnessRackUp.x, PLATFORM_OBJECTS.harnessRackUp.y);
    this.guardrail = new Guardrail('guardrail', PLATFORM_OBJECTS.guardrailMaterials.x, PLATFORM_OBJECTS.guardrailMaterials.y);
    this.lifeline = new Lifeline('lifeline', PLATFORM_OBJECTS.anchorPoint.x, PLATFORM_OBJECTS.anchorPoint.y);

    this.allObjects = [
      this.ladder8ft, this.ladder10ft, this.ladder13ft,
      this.harness, this.guardrail, this.lifeline,
    ];

    // Lifeline and guardrail are NOT standard pickups — handled via special interactions
    this.lifeline.interactable = false;
    this.guardrail.interactable = false;

    // --- Systems ---
    this.inventory = new InventorySystem(this.player);
    this.dialogue = new DialogueSystem();
    this.score = new ScoreSystem();
    this.challengeManager = new ChallengeManager();

    // --- Challenges ---
    this.ladderChallenge = new LadderChallenge();
    this.ladderChallenge.setLadders([this.ladder8ft, this.ladder10ft, this.ladder13ft]);

    this.harnessChallenge = new HarnessChallenge();
    this.guardrailChallenge = new GuardrailChallenge();
    this.guardrailChallenge.setGuardrail(this.guardrail);
    this.lifelineChallenge = new LifelineChallenge();
    this.lifelineChallenge.setLifeline(this.lifeline);
    this.carlosChallenge = new CarlosChallenge();
    this.carlosChallenge.setCarlos(this.carlos);

    // --- Screens ---
    this.titleScreen = new TitleScreen();
    this.resultScreen = new ResultScreen();

    // --- State machine handlers ---
    this.setupStates();

    // --- Game loop ---
    this.gameLoop = new GameLoop(
      this.renderer.getContext(),
      (dt) => this.update(dt),
      (ctx) => this.draw(ctx),
    );
  }

  /** Start the game */
  start(): void {
    this.gameLoop.start();
  }

  /** Stop the game */
  stop(): void {
    this.gameLoop.stop();
    this.input.destroy();
    this.touchControls.destroy();
  }

  /** Resize to fit container */
  resize(container: HTMLElement): void {
    this.renderer.fitToContainer(container);
  }

  // ---- State Machine Setup ----

  private setupStates(): void {
    this.stateMachine.addState('title', {
      onEnter: () => {
        this.titleScreen.show();
      },
      onUpdate: () => {
        if (this.input.justAdvance()) {
          this.titleScreen.hide();
          this.score.start();
          this.stateMachine.transition('exploring');
        }
      },
    });

    this.stateMachine.addState('exploring', {
      onEnter: (from: GamePhase) => {
        if (from === 'title') {
          this.dialogue.start(DIALOGUE_INTRO);
          this.stateMachine.transition('dialogue');
        }
      },
      onUpdate: (dt: number) => {
        this.updateExploring(dt);
      },
    });

    this.stateMachine.addState('carrying', {
      onUpdate: (dt: number) => {
        this.updateCarrying(dt);
      },
    });

    this.stateMachine.addState('dialogue', {
      onUpdate: (dt: number) => {
        this.dialogue.update(dt);
        if (this.input.justAdvance()) {
          this.dialogue.advance();
        }
        if (!this.dialogue.isActive()) {
          // Return to appropriate state
          if (this.player.carriedItem) {
            this.stateMachine.transition('carrying');
          } else {
            this.stateMachine.transition('exploring');
          }
        }
      },
    });

    this.stateMachine.addState('placing', {
      onUpdate: (_dt: number) => {
        this.updatePlacing();
      },
    });

    this.stateMachine.addState('consequence', {
      onUpdate: (dt: number) => {
        this.dialogue.update(dt);
        if (this.input.justAdvance()) {
          this.dialogue.advance();
        }
        if (!this.dialogue.isActive()) {
          this.stateMachine.transition('exploring');
        }
      },
    });

    this.stateMachine.addState('result', {
      onEnter: () => {
        this.resultScreen.show(this.score.getFinalScore());
      },
      onUpdate: () => {
        if (this.input.justAdvance()) {
          this.resetGame();
        }
      },
    });
  }

  // ---- Update Logic ----

  private update(dt: number): void {
    this.stateMachine.update(dt);
    this.input.update();
  }

  private updateExploring(dt: number): void {
    const inputState = this.input.getState();

    // ---- Climbing mode ----
    if (this.player.isClimbing) {
      this.player.handleInput(inputState);
      this.player.update(dt);

      // Player reached top of ladder
      if (this.player.isAtLadderTop() && this.placedLadder) {
        this.handleLadderTop();
      }

      // Player pressed DOWN at bottom → exit climbing
      if (!this.player.isClimbing) {
        // Player stepped off ladder at bottom
      }

      this.camera.follow(this.player.getCenter());
      return;
    }

    // ---- Normal movement ----
    this.player.handleInput(inputState);
    this.player.update(dt);

    // Platform collision — only if ladder challenge is passed
    if (this.ladderCorrect) {
      this.player.landOnPlatform({
        x: PLATFORM_X,
        y: PLATFORM_Y - PLATFORM_HEIGHT,
        width: PLATFORM_WIDTH,
        height: PLATFORM_HEIGHT,
      });
    }

    // Update NPCs
    this.supervisor.update(dt);
    this.carlos.update(dt);

    // Camera follow
    this.camera.follow(this.player.getCenter());

    // Update interaction prompts
    this.updateInteractionPrompts();

    // ---- Check for climbing onto placed ladder ----
    if (this.placedLadder && !this.player.carriedItem) {
      const climbZone = this.placedLadder.getClimbZone();
      const playerBounds = this.player.getBounds();
      if (
        CollisionManager.isInRange(playerBounds, climbZone, 10) &&
        inputState.up
      ) {
        this.player.startClimbing(
          this.placedLadder.getPlacedCenterX(),
          this.placedLadder.getTopY(),
          this.placedLadder.getBaseY(),
        );
        return;
      }
    }

    // ---- Interactions ----
    if (this.input.justInteract()) {
      this.handleInteract();
    }
    if (this.input.justEquip()) {
      this.handleEquip();
    }
    if (this.input.justTalk()) {
      this.handleTalk();
    }

    // Update active challenges
    const challengeCtx = {
      player: this.player,
      dialogue: this.dialogue,
      score: this.score,
      input: this.input,
    };

    this.harnessChallenge.update(challengeCtx, dt);
    this.lifelineChallenge.update(challengeCtx, dt);
    this.carlosChallenge.update(challengeCtx, dt);

    // Check if dialogue started from challenge
    if (this.dialogue.isActive()) {
      this.stateMachine.transition('dialogue');
    }

    // Sync challenge completions with ChallengeManager
    this.syncChallengeCompletions();

    // Check if all challenges done
    if (this.challengeManager.allCompleted()) {
      this.stateMachine.transition('result');
    }
  }

  private updateCarrying(dt: number): void {
    const inputState = this.input.getState();
    this.player.handleInput(inputState);
    this.player.update(dt);

    // Platform collision — keep player on platform while carrying
    if (this.ladderCorrect) {
      this.player.landOnPlatform({
        x: PLATFORM_X,
        y: PLATFORM_Y - PLATFORM_HEIGHT,
        width: PLATFORM_WIDTH,
        height: PLATFORM_HEIGHT,
      });
    }

    // Update NPCs
    this.supervisor.update(dt);
    this.carlos.update(dt);

    // Camera
    this.camera.follow(this.player.getCenter());

    // ---- Check if in ladder placement zone ----
    this.showPlacePrompt = false;
    if (this.player.carriedItem?.startsWith('ladder')) {
      const playerX = this.player.position.x + this.player.size.x / 2;
      const inZone =
        playerX >= LADDER_PLACE_ZONE.x &&
        playerX <= LADDER_PLACE_ZONE.x + LADDER_PLACE_ZONE.width;

      if (inZone) {
        this.showPlacePrompt = true;
        if (this.input.justInteract()) {
          this.placeLadder();
          return;
        }
      }
    }

    // ---- Q to drop any item ----
    if (this.input.justEquip()) {
      if (this.inventory.isCarrying('harness')) {
        // Equip harness (special behavior)
        this.inventory.equipHarness();
        this.harnessChallenge.onHarnessEquipped({
          player: this.player,
          dialogue: this.dialogue,
          score: this.score,
          input: this.input,
        });
        this.stateMachine.transition('dialogue');
        return;
      }
      // Drop any other item
      this.dropItem();
      return;
    }

    // ---- C to talk (even while carrying) ----
    if (this.input.justTalk()) {
      this.handleTalk();
    }

    // ---- E to pick up different object (swap) ----
    if (this.input.justInteract() && !this.showPlacePrompt) {
      // If near another object, drop current and pick new one
      const playerBounds = this.player.getBounds();
      for (const obj of this.allObjects) {
        if (!obj.interactable || obj.pickedUp || obj.id === this.player.carriedItem) continue;
        if (!CollisionManager.isInRange(playerBounds, obj.getBounds(), INTERACT_RANGE)) continue;
        // Drop current, pick new
        this.dropItem();
        if (this.inventory.pickUp(obj)) {
          this.stateMachine.transition('carrying');
          return;
        }
      }
    }

    // Check if dialogue started from challenge
    if (this.dialogue.isActive()) {
      this.stateMachine.transition('dialogue');
    }
  }

  private updatePlacing(): void {
    this.guardrailChallenge.update(
      {
        player: this.player,
        dialogue: this.dialogue,
        score: this.score,
        input: this.input,
      },
      0,
    );

    if (this.dialogue.isActive()) {
      this.stateMachine.transition('dialogue');
    }
  }

  // ---- Ladder Flow ----

  /** Handle player reaching the top of a placed ladder */
  private handleLadderTop(): void {
    if (!this.placedLadder) return;

    const ladder = this.placedLadder;
    this.player.stopClimbing();

    const challengeCtx = {
      player: this.player,
      dialogue: this.dialogue,
      score: this.score,
      input: this.input,
    };

    if (ladder.ladderSize === '8ft') {
      // Can't reach — player stays at top of short ladder
      // Dialogue explains it's too short
      this.ladderChallenge.onLadderPlaced(ladder, challengeCtx);
      this.stateMachine.transition('dialogue');

      // After dialogue, reset ladder and player falls down
      const originalOnComplete = this.dialogue['onCompleteCallback'];
      this.dialogue['onCompleteCallback'] = () => {
        originalOnComplete?.();
        this.removePlacedLadder();
        this.player.position.y = GROUND_Y - this.player.size.y;
        this.player.position.x = LADDER_WALL_X - 40;
        this.player.isGrounded = true;
      };
    } else if (ladder.ladderSize === '10ft') {
      // Reaches platform but no 3ft extension — supervisor stops
      this.ladderChallenge.onLadderPlaced(ladder, challengeCtx);
      this.stateMachine.transition('dialogue');

      const originalOnComplete = this.dialogue['onCompleteCallback'];
      this.dialogue['onCompleteCallback'] = () => {
        originalOnComplete?.();
        this.removePlacedLadder();
        this.player.position.y = GROUND_Y - this.player.size.y;
        this.player.position.x = LADDER_WALL_X - 40;
        this.player.isGrounded = true;
      };
    } else if (ladder.ladderSize === '13ft') {
      // Correct! Player steps onto platform
      this.ladderChallenge.onLadderPlaced(ladder, challengeCtx);
      this.ladderCorrect = true;
      this.stateMachine.transition('dialogue');

      const originalOnComplete = this.dialogue['onCompleteCallback'];
      this.dialogue['onCompleteCallback'] = () => {
        originalOnComplete?.();
        // Land player on platform
        this.player.position.y = PLATFORM_Y - PLATFORM_HEIGHT - this.player.size.y;
        this.player.position.x = PLATFORM_X + 20;
        this.player.isGrounded = true;
        this.challengeManager.pass('ladder');
      };
    }
  }

  /** Remove placed ladder and return to staging */
  private removePlacedLadder(): void {
    if (this.placedLadder) {
      this.placedLadder.resetToStaging();
      this.placedLadder = null;
    }
  }

  /** Place the ladder the player is carrying at the wall */
  private placeLadder(): void {
    const carriedId = this.inventory.getCurrentItem();
    if (!carriedId) return;

    const ladder = [this.ladder8ft, this.ladder10ft, this.ladder13ft].find(
      (l) => l.id === carriedId,
    );
    if (!ladder) return;

    // Remove any previously placed ladder
    this.removePlacedLadder();

    // Drop from inventory and place at wall
    this.player.drop();
    ladder.placeAtWall();
    this.placedLadder = ladder;
    this.showPlacePrompt = false;

    this.stateMachine.transition('exploring');
  }

  /** Drop current item on the ground */
  private dropItem(): void {
    const carriedId = this.player.carriedItem;
    if (!carriedId) return;

    // Find the object and restore it near player
    const obj = this.allObjects.find((o) => o.id === carriedId);
    if (obj) {
      obj.pickedUp = false;
      obj.visible = true;
      obj.interactable = true;
      obj.position.x = this.player.position.x;
      obj.position.y = this.player.position.y;
    }

    this.player.drop();
    this.stateMachine.transition('exploring');
  }

  // ---- Interaction Handlers ----

  private updateInteractionPrompts(): void {
    const playerBounds = this.player.getBounds();
    for (const obj of this.allObjects) {
      const inRange = CollisionManager.isInRange(playerBounds, obj.getBounds(), INTERACT_RANGE);
      obj.setPromptVisible(inRange);
    }
  }

  private handleInteract(): void {
    const playerBounds = this.player.getBounds();
    const challengeCtx = {
      player: this.player,
      dialogue: this.dialogue,
      score: this.score,
      input: this.input,
    };

    // ---- Special: Lifeline connection (before pickup loop) ----
    if (
      this.player.harnessEquipped &&
      !this.player.lifelineConnected &&
      CollisionManager.isInRange(playerBounds, this.lifeline.getBounds(), INTERACT_RANGE)
    ) {
      this.lifelineChallenge.onLifelineConnected(challengeCtx);
      this.stateMachine.transition('dialogue');
      return;
    }

    // ---- Special: Guardrail installation ----
    if (
      !this.guardrail.placed &&
      !this.guardrail.isPlacing &&
      CollisionManager.isInRange(playerBounds, this.guardrail.getBounds(), INTERACT_RANGE)
    ) {
      this.guardrail.isPlacing = true;
      this.stateMachine.transition('placing');
      return;
    }

    // ---- Standard pickup loop ----
    for (const obj of this.allObjects) {
      if (!obj.interactable || obj.pickedUp) continue;
      if (!CollisionManager.isInRange(playerBounds, obj.getBounds(), INTERACT_RANGE)) continue;

      if (this.inventory.pickUp(obj)) {
        this.stateMachine.transition('carrying');
        return;
      }
    }
  }

  private handleEquip(): void {
    if (this.inventory.isCarrying('harness')) {
      this.inventory.equipHarness();
      this.harnessChallenge.onHarnessEquipped({
        player: this.player,
        dialogue: this.dialogue,
        score: this.score,
        input: this.input,
      });
      this.stateMachine.transition('dialogue');
    }
  }

  private handleTalk(): void {
    const playerBounds = this.player.getBounds();

    if (CollisionManager.isInRange(playerBounds, this.carlos.getBounds(), INTERACT_RANGE)) {
      this.carlosChallenge.onTalkToCarlos({
        player: this.player,
        dialogue: this.dialogue,
        score: this.score,
        input: this.input,
      });
      this.stateMachine.transition('dialogue');
    }
  }

  /** Sync individual challenge completion flags with the ChallengeManager */
  private syncChallengeCompletions(): void {
    const pairs: Array<{ challenge: { isCompleted(): boolean }, id: 'harness' | 'guardrail' | 'lifeline' | 'carlos' }> = [
      { challenge: this.harnessChallenge, id: 'harness' },
      { challenge: this.guardrailChallenge, id: 'guardrail' },
      { challenge: this.lifelineChallenge, id: 'lifeline' },
      { challenge: this.carlosChallenge, id: 'carlos' },
    ];

    for (const { challenge, id } of pairs) {
      if (challenge.isCompleted() && this.challengeManager.get(id)?.status !== 'passed') {
        this.challengeManager.pass(id);
      }
    }
  }

  // ---- Draw ----

  private draw(ctx: CanvasRenderingContext2D): void {
    this.renderer.clear();

    // Title screen
    if (this.stateMachine.isIn('title')) {
      this.titleScreen.draw(ctx, this.touchControls.isTouchDevice);
      return;
    }

    // Result screen
    if (this.stateMachine.isIn('result')) {
      this.background.draw(ctx, !!this.placedLadder);
      this.resultScreen.draw(ctx);
      return;
    }

    // Camera transform
    this.camera.applyTransform(ctx);

    // Background (with ladder zone visibility)
    this.background.draw(ctx, !!this.placedLadder);

    // Objects
    for (const obj of this.allObjects) {
      if (obj.visible) obj.draw(ctx);
    }

    // NPCs
    this.supervisor.draw(ctx);
    this.carlos.draw(ctx);

    // Player
    this.player.draw(ctx);

    // ---- Placement prompt (in world space) ----
    if (this.showPlacePrompt) {
      this.drawPlacePrompt(ctx);
    }

    // ---- Climb prompt (in world space) ----
    if (this.placedLadder && !this.player.carriedItem && !this.player.isClimbing) {
      const climbZone = this.placedLadder.getClimbZone();
      const playerBounds = this.player.getBounds();
      if (CollisionManager.isInRange(playerBounds, climbZone, 10)) {
        this.drawClimbPrompt(ctx);
      }
    }

    // ---- Context-sensitive prompts (in world space) ----
    this.drawContextPrompts(ctx);

    // Restore camera transform
    this.camera.restore(ctx);

    // UI layer (fixed, no camera transform)
    this.hud.draw(
      ctx,
      this.player.carriedItem,
      this.player.harnessEquipped,
      this.player.lifelineConnected,
      this.challengeManager,
    );

    // Touch controls (mobile only, above HUD but below dialogue)
    this.touchControls.draw(ctx);

    // Dialogue (always on top)
    this.dialogue.draw(ctx);
  }

  private drawPlacePrompt(ctx: CanvasRenderingContext2D): void {
    const cx = LADDER_WALL_X;
    const cy = GROUND_Y - 30;

    ctx.save();
    ctx.fillStyle = COLORS.hudBg;
    ctx.beginPath();
    ctx.roundRect(cx - 50, cy - 12, 100, 24, 6);
    ctx.fill();

    ctx.fillStyle = COLORS.safetyYellow;
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[E] Place Ladder', cx, cy + 4);
    ctx.restore();
  }

  private drawClimbPrompt(ctx: CanvasRenderingContext2D): void {
    const cx = LADDER_WALL_X;
    const cy = GROUND_Y - 70;

    ctx.save();
    ctx.fillStyle = COLORS.hudBg;
    ctx.beginPath();
    ctx.roundRect(cx - 40, cy - 12, 80, 24, 6);
    ctx.fill();

    ctx.fillStyle = COLORS.safetyYellow;
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[↑] Climb', cx, cy + 4);
    ctx.restore();
  }

  /** Draw context-sensitive prompts for Carlos, lifeline, guardrail */
  private drawContextPrompts(ctx: CanvasRenderingContext2D): void {
    const playerBounds = this.player.getBounds();

    // [C] Talk near Carlos (only if not already warned)
    if (
      !this.carlos.wasWarned &&
      CollisionManager.isInRange(playerBounds, this.carlos.getBounds(), INTERACT_RANGE)
    ) {
      const cx = this.carlos.position.x + this.carlos.size.x / 2;
      const cy = this.carlos.position.y - 24;
      this.drawPromptBubble(ctx, cx, cy, '[C] Talk');
    }

    // [E] Connect near lifeline (only if harness equipped and not connected)
    if (
      this.player.harnessEquipped &&
      !this.player.lifelineConnected &&
      CollisionManager.isInRange(playerBounds, this.lifeline.getBounds(), INTERACT_RANGE)
    ) {
      const cx = this.lifeline.position.x + this.lifeline.size.x / 2;
      const cy = this.lifeline.position.y - 20;
      this.drawPromptBubble(ctx, cx, cy, '[E] Connect');
    }

    // [E] Install near guardrail (only if not placed and not placing)
    if (
      !this.guardrail.placed &&
      !this.guardrail.isPlacing &&
      CollisionManager.isInRange(playerBounds, this.guardrail.getBounds(), INTERACT_RANGE)
    ) {
      const cx = this.guardrail.position.x + this.guardrail.size.x / 2;
      const cy = this.guardrail.position.y - 20;
      this.drawPromptBubble(ctx, cx, cy, '[E] Install');
    }
  }

  private drawPromptBubble(ctx: CanvasRenderingContext2D, cx: number, cy: number, text: string): void {
    const w = text.length * 7 + 16;
    ctx.save();
    ctx.fillStyle = COLORS.hudBg;
    ctx.beginPath();
    ctx.roundRect(cx - w / 2, cy - 10, w, 20, 4);
    ctx.fill();

    ctx.fillStyle = COLORS.safetyYellow;
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(text, cx, cy + 4);
    ctx.restore();
  }

  // ---- Reset ----

  private resetGame(): void {
    this.resultScreen.hide();
    this.score.reset();
    this.challengeManager.reset();
    this.placedLadder = null;
    this.ladderCorrect = false;
    this.showPlacePrompt = false;

    this.player = new Player(100, GROUND_Y - 48);
    this.inventory = new InventorySystem(this.player);

    // Reset all ladders
    this.ladder8ft.resetToStaging();
    this.ladder10ft.resetToStaging();
    this.ladder13ft.resetToStaging();

    // Reset harness
    this.harness.pickedUp = false;
    this.harness.visible = true;
    this.harness.interactable = true;

    // Reset guardrail
    this.guardrail.placed = false;
    this.guardrail.isPlacing = false;
    this.guardrail.installedHeight = null;
    this.guardrail.isCorrect = false;
    this.guardrail.interactable = false;
    this.guardrail.visible = true;
    this.guardrail.pickedUp = false;

    // Reset lifeline
    this.lifeline.isConnected = false;
    this.lifeline.interactable = false;
    this.lifeline.visible = true;
    this.lifeline.pickedUp = false;

    // Reset Carlos
    this.carlos.wasWarned = false;
    this.carlos.isConnected = false;

    // Reset challenge instances
    this.harnessChallenge = new HarnessChallenge();
    this.guardrailChallenge = new GuardrailChallenge();
    this.guardrailChallenge.setGuardrail(this.guardrail);
    this.lifelineChallenge = new LifelineChallenge();
    this.lifelineChallenge.setLifeline(this.lifeline);
    this.carlosChallenge = new CarlosChallenge();
    this.carlosChallenge.setCarlos(this.carlos);
    this.ladderChallenge = new LadderChallenge();
    this.ladderChallenge.setLadders([this.ladder8ft, this.ladder10ft, this.ladder13ft]);

    this.stateMachine.transition('title');
  }
}
