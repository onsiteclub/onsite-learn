/* =============================================
   Working at Heights — Game Constants
   ============================================= */

// ---- Canvas ----
export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 720;
export const TARGET_FPS = 60;
export const FRAME_TIME = 1000 / TARGET_FPS;

// ---- Colors (industrial palette) ----
export const COLORS = {
  // Background
  sky: '#87CEEB',
  skyGradientTop: '#5BA3D9',
  skyGradientBottom: '#B8DCF0',

  // Structure
  steel: '#6B7280',
  steelLight: '#9CA3AF',
  steelDark: '#4B5563',
  charcoalLight: '#4A5568',
  concrete: '#D1D5DB',
  concreteDark: '#9CA3AF',
  wood: '#A0845C',
  woodDark: '#7A6544',

  // Safety colors
  safetyOrange: '#FF6B00',
  safetyYellow: '#FFD700',
  safetyGreen: '#22C55E',
  safetyRed: '#EF4444',
  safetyBlue: '#3B82F6',
  safetyWhite: '#FFFFFF',

  // Character
  helmetYellow: '#FACC15',     // Player
  helmetWhite: '#F9FAFB',      // Supervisor
  helmetOrange: '#FB923C',     // Carlos
  vestGreen: '#22C55E',        // Player vest
  skinTone: '#D4A574',
  pants: '#1E3A5F',
  boots: '#3D2B1F',

  // UI
  dialogueBg: '#1C1F23',
  dialogueBorder: '#4A5568',
  dialogueText: '#F7FAFC',
  dialogueNameBg: '#C58B1B',
  hudBg: 'rgba(28, 31, 35, 0.85)',
  starFilled: '#FACC15',
  starEmpty: '#4A5568',
} satisfies Record<string, string>;

// ---- Physics ----
export const GRAVITY = 0.6;
export const PLAYER_SPEED = 3.5;
export const PLAYER_JUMP = -10;
export const CLIMB_SPEED = 2;
export const PLAYER_WIDTH = 32;
export const PLAYER_HEIGHT = 48;

// ---- Scene Layout ----
export const GROUND_Y = 580;            // Ground level (y coordinate)
export const PLATFORM_Y = 380;          // Platform level (~10ft up, ~200px)
export const PLATFORM_X = 400;          // Platform starts at x
export const PLATFORM_WIDTH = 800;      // Platform width
export const PLATFORM_HEIGHT = 16;      // Platform thickness

// ---- Object positions (staging area, left to right) ----
export const STAGING_AREA = {
  ladder8ft: { x: 60, y: GROUND_Y },
  ladder10ft: { x: 140, y: GROUND_Y },
  ladder13ft: { x: 220, y: GROUND_Y },
  harnessRack: { x: 300, y: GROUND_Y },
  safetyCones: { x: 360, y: GROUND_Y },
};

// ---- Platform objects ----
export const PLATFORM_OBJECTS = {
  harnessRackUp: { x: PLATFORM_X + 50, y: PLATFORM_Y },
  guardrailMaterials: { x: PLATFORM_X + 200, y: PLATFORM_Y },
  anchorPoint: { x: PLATFORM_X + 350, y: PLATFORM_Y - 20 },
  edgeZone: { x: PLATFORM_X + PLATFORM_WIDTH - 100, y: PLATFORM_Y },
  carlosPosition: { x: PLATFORM_X + PLATFORM_WIDTH - 60, y: PLATFORM_Y },
};

// ---- Ladder placement ----
export const LADDER_WALL_X = PLATFORM_X - 10;  // Where ladders lean against
export const LADDER_PLACE_ZONE = { x: LADDER_WALL_X - 30, width: 60 }; // Visual drop zone
export const LADDER_8FT_TOP = GROUND_Y - 100;  // Doesn't reach platform
export const LADDER_10FT_TOP = PLATFORM_Y - PLATFORM_HEIGHT;  // Reaches exactly (no 3ft extension)
export const LADDER_13FT_TOP = PLATFORM_Y - PLATFORM_HEIGHT - 60; // Correct: extends 3ft above

// ---- Guardrail heights ----
export const GUARDRAIL_CORRECT_HEIGHT = '42in';

// ---- Interaction ----
export const INTERACT_RANGE = 50;  // px distance to interact with objects

// ---- Dialogue ----
export const DIALOGUE_BOX_HEIGHT = 160;
export const DIALOGUE_BOX_MARGIN = 20;
export const DIALOGUE_PORTRAIT_SIZE = 80;
export const DIALOGUE_TEXT_SPEED = 30;  // ms per character (typewriter)

// ---- Score ----
export const MAX_STARS = 5;  // One per challenge

// ---- Timers ----
export const CARLOS_IGNORE_TIMER = 10000;  // ms before supervisor notices
export const CONSEQUENCE_FREEZE_TIME = 2000; // ms game pauses on consequence
