/* =============================================
   Working at Heights — Dialogue Data
   ============================================= */

import type { DialogueSequence } from '../types';

// ---- Portraits (keys for sprite lookup) ----
const PORTRAITS = {
  supervisor: 'portrait-supervisor',
  player: 'portrait-player',
  carlos: 'portrait-carlos',
} as const;

// ---- Intro ----

export const DIALOGUE_INTRO: DialogueSequence = {
  id: 'intro',
  lines: [
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Welcome to the site, rookie. I'm your supervisor today.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Before you do anything up there, you need to follow proper safety procedures.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Start by picking the right ladder from the staging area. We need to get to that platform — it's about 10 feet up.",
    },
  ],
};

// ---- Challenge 1: Ladder ----

export const DIALOGUE_LADDER_8FT: DialogueSequence = {
  id: 'ladder-8ft',
  lines: [
    {
      speaker: 'You',
      portrait: PORTRAITS.player,
      text: "This ladder isn't tall enough... I can't reach the platform.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "That's only 8 feet. The platform is 10 feet up. Try a taller one.",
    },
  ],
};

export const DIALOGUE_LADDER_10FT: DialogueSequence = {
  id: 'ladder-10ft',
  lines: [
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "STOP! That ladder is exactly 10 feet — same as the platform.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "The ladder must extend at least 3 feet (1 metre) above the landing surface. That gives you something to hold onto when stepping off.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Ontario Regulation 213/91, Section 78. Go grab the 13-foot ladder.",
    },
  ],
};

export const DIALOGUE_LADDER_13FT: DialogueSequence = {
  id: 'ladder-13ft',
  lines: [
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Good choice! The 13-foot ladder extends 3 feet above the platform. That's regulation.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Always make sure it's on stable ground and secured at the top. Go ahead and climb up.",
    },
  ],
};

// ---- Challenge 2: Harness ----

export const DIALOGUE_NO_HARNESS: DialogueSequence = {
  id: 'no-harness',
  lines: [
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "HOLD IT! You're heading toward the edge without fall protection!",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Under OHSA, any worker at a height of 3 metres (about 10 feet) or more must use fall protection.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Go to the harness rack and put one on before going near that edge.",
    },
  ],
};

export const DIALOGUE_HARNESS_EQUIP: DialogueSequence = {
  id: 'harness-equip',
  lines: [
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Let me walk you through it. Step into the leg straps first.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Pull the shoulder straps up and clip the chest strap. Make sure the D-ring is centered on your back between the shoulder blades.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Tighten all straps — snug but not restrictive. You should be able to fit two fingers under each strap.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Good. Your harness is on. Now you need to connect to a lifeline before working near the edge.",
    },
  ],
};

// ---- Challenge 3: Guardrail ----

export const DIALOGUE_GUARDRAIL_WRONG: DialogueSequence = {
  id: 'guardrail-wrong',
  lines: [
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "That's not the right height for a guardrail.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "A guardrail must be between 36 and 42 inches high. The standard is 42 inches (about 1.07 metres).",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Try positioning it at 42 inches.",
    },
  ],
};

export const DIALOGUE_GUARDRAIL_CORRECT: DialogueSequence = {
  id: 'guardrail-correct',
  lines: [
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "42 inches — perfect. That meets the Ontario Construction Regulation standard.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "A guardrail protects the entire edge. It should also have a mid-rail and toe board, but for today this will do.",
    },
  ],
};

// ---- Challenge 4: Lifeline ----

export const DIALOGUE_NO_LIFELINE: DialogueSequence = {
  id: 'no-lifeline',
  lines: [
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Whoa! You almost went over!",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "You're wearing the harness but you're not connected to anything. The harness alone won't save you.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Connect your lanyard to the lifeline anchor point before working near the edge.",
    },
  ],
};

export const DIALOGUE_LIFELINE_CONNECTED: DialogueSequence = {
  id: 'lifeline-connected',
  lines: [
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Good. You're connected to the horizontal lifeline through the anchor point.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Always make sure your anchor point can support at least 5,000 pounds. This one is rated.",
    },
  ],
};

// ---- Challenge 5: Carlos ----

export const DIALOGUE_CARLOS_WARN: DialogueSequence = {
  id: 'carlos-warn',
  lines: [
    {
      speaker: 'You',
      portrait: PORTRAITS.player,
      text: "Hey Carlos, I noticed you're working near the edge without being connected. That's not safe.",
    },
    {
      speaker: 'Carlos',
      portrait: PORTRAITS.carlos,
      text: "Oh man, you're right. I was just gonna be here a second but... yeah, that's no excuse. Thanks for looking out.",
    },
    {
      speaker: 'Carlos',
      portrait: PORTRAITS.carlos,
      text: "Let me clip in right now.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Good job, rookie. Under OHSA Section 28(1)(d), every worker has a duty to report hazards — including unsafe behaviour by coworkers.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Looking out for each other is how everyone goes home safe.",
    },
  ],
};

export const DIALOGUE_CARLOS_IGNORED: DialogueSequence = {
  id: 'carlos-ignored',
  lines: [
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Hold on. You walked right past Carlos and he's working unprotected at the edge.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Under OHSA Section 28(1)(d), you have a duty to report unsafe conditions — even if it's a coworker.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "On a real site, ignoring that could mean someone gets seriously hurt. Always speak up.",
    },
  ],
};

// ---- Result Screen ----

export const DIALOGUE_RESULT_PERFECT: DialogueSequence = {
  id: 'result-perfect',
  lines: [
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Outstanding work, rookie. You nailed every safety procedure on your first try.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Keep this up and you'll be running your own crew in no time. Stay safe out there.",
    },
  ],
};

export const DIALOGUE_RESULT_GOOD: DialogueSequence = {
  id: 'result-good',
  lines: [
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Not bad for your first day. You made some mistakes, but you learned from them.",
    },
    {
      speaker: 'Supervisor',
      portrait: PORTRAITS.supervisor,
      text: "Remember: on a real site, every mistake is a chance for injury. Study the regulations and try again.",
    },
  ],
};

// ---- All dialogues map ----
export const ALL_DIALOGUES: Record<string, DialogueSequence> = {
  'intro': DIALOGUE_INTRO,
  'ladder-8ft': DIALOGUE_LADDER_8FT,
  'ladder-10ft': DIALOGUE_LADDER_10FT,
  'ladder-13ft': DIALOGUE_LADDER_13FT,
  'no-harness': DIALOGUE_NO_HARNESS,
  'harness-equip': DIALOGUE_HARNESS_EQUIP,
  'guardrail-wrong': DIALOGUE_GUARDRAIL_WRONG,
  'guardrail-correct': DIALOGUE_GUARDRAIL_CORRECT,
  'no-lifeline': DIALOGUE_NO_LIFELINE,
  'lifeline-connected': DIALOGUE_LIFELINE_CONNECTED,
  'carlos-warn': DIALOGUE_CARLOS_WARN,
  'carlos-ignored': DIALOGUE_CARLOS_IGNORED,
  'result-perfect': DIALOGUE_RESULT_PERFECT,
  'result-good': DIALOGUE_RESULT_GOOD,
};
