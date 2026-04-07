/* =============================================
   Working at Heights — Type Definitions
   ============================================= */

// ---- Geometry ----

export interface Vector2 {
  x: number;
  y: number;
}

export interface AABB {
  x: number;
  y: number;
  width: number;
  height: number;
}

// ---- Game States ----

export type GamePhase =
  | 'title'
  | 'exploring'
  | 'carrying'
  | 'dialogue'
  | 'placing'
  | 'consequence'
  | 'result';

export type ChallengeId =
  | 'ladder'
  | 'harness'
  | 'guardrail'
  | 'lifeline'
  | 'carlos';

export type ChallengeStatus = 'locked' | 'available' | 'active' | 'passed' | 'failed';

// ---- Entities ----

export interface EntityConfig {
  id: string;
  position: Vector2;
  size: Vector2;
  sprite?: string;
}

export type Direction = 'left' | 'right';

export interface PlayerState {
  position: Vector2;
  velocity: Vector2;
  direction: Direction;
  isGrounded: boolean;
  isClimbing: boolean;
  carriedItem: string | null;
  harnessEquipped: boolean;
  lifelineConnected: boolean;
}

export interface NPCConfig extends EntityConfig {
  name: string;
  helmetColor: string;
  dialogueKey: string;
}

// ---- Interactive Objects ----

export type ObjectType =
  | 'ladder'
  | 'harness'
  | 'guardrail'
  | 'lifeline'
  | 'safety-cone'
  | 'construction-material';

export interface InteractiveObjectConfig {
  id: string;
  type: ObjectType;
  position: Vector2;
  size: Vector2;
  label?: string;
  interactable: boolean;
  state: Record<string, unknown>;
}

export type LadderSize = '8ft' | '10ft' | '13ft';

export interface LadderConfig extends InteractiveObjectConfig {
  type: 'ladder';
  ladderSize: LadderSize;
  placed: boolean;
  placedPosition: Vector2 | null;
}

export type GuardrailHeight = '36in' | '42in' | '48in';

// ---- Dialogue ----

export interface DialogueLine {
  speaker: string;
  portrait: string;
  text: string;
}

export interface DialogueSequence {
  id: string;
  lines: DialogueLine[];
  onComplete?: () => void;
}

// ---- Score ----

export interface ChallengeResult {
  challengeId: ChallengeId;
  passedFirstTry: boolean;
  attempts: number;
}

export interface GameScore {
  stars: number;          // 1-5
  results: ChallengeResult[];
  totalTime: number;      // seconds
}

// ---- Rendering ----

export interface SpriteSheet {
  image: HTMLImageElement;
  frameWidth: number;
  frameHeight: number;
  frames: number;
  animations: Record<string, number[]>;
}

export interface DrawableSprite {
  draw(ctx: CanvasRenderingContext2D, x: number, y: number, frame?: number): void;
}

// ---- Input ----

export interface InputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  jump: boolean;
  interact: boolean;
  equip: boolean;
  talk: boolean;
  advance: boolean;  // SPACE in dialogue
}

// ---- Scene ----

export interface SceneConfig {
  width: number;
  height: number;
  groundLevel: number;
  platformLevel: number;
  platformX: number;
  platformWidth: number;
}

// ---- Events ----

export type GameEvent =
  | { type: 'LADDER_PLACED'; ladder: LadderSize }
  | { type: 'LADDER_CLIMBED' }
  | { type: 'HARNESS_PICKED' }
  | { type: 'HARNESS_EQUIPPED' }
  | { type: 'NEAR_EDGE_NO_HARNESS' }
  | { type: 'GUARDRAIL_PLACED'; height: GuardrailHeight }
  | { type: 'LIFELINE_CONNECTED' }
  | { type: 'LIFELINE_NOT_CONNECTED' }
  | { type: 'CARLOS_WARNED' }
  | { type: 'CARLOS_IGNORED' }
  | { type: 'CHALLENGE_PASSED'; id: ChallengeId }
  | { type: 'CHALLENGE_FAILED'; id: ChallengeId };
