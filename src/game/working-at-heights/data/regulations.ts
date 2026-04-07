/* =============================================
   Working at Heights — Ontario Regulation References
   ============================================= */

export interface Regulation {
  id: string;
  code: string;
  title: string;
  description: string;
  challengeId: string;
}

export const REGULATIONS: Regulation[] = [
  {
    id: 'ladder-extension',
    code: 'O. Reg. 213/91, s. 78',
    title: 'Ladder Extension Above Landing',
    description:
      'A portable ladder must extend at least 1 metre (3 feet) above the upper landing surface when used as access between levels.',
    challengeId: 'ladder',
  },
  {
    id: 'fall-protection',
    code: 'OHSA, s. 26.1 & O. Reg. 213/91, s. 26',
    title: 'Fall Protection Requirements',
    description:
      'Fall protection is required when a worker is exposed to a fall of 3 metres (10 feet) or more. This includes a full-body harness connected to a lifeline or other approved system.',
    challengeId: 'harness',
  },
  {
    id: 'guardrail-height',
    code: 'O. Reg. 213/91, s. 26.3',
    title: 'Guardrail Height Standard',
    description:
      'A guardrail system must have a top rail between 920 mm and 1,070 mm (36 to 42 inches) above the working surface. The standard installation height is 42 inches (1,070 mm).',
    challengeId: 'guardrail',
  },
  {
    id: 'lifeline-anchor',
    code: 'O. Reg. 213/91, s. 26.9',
    title: 'Lifeline and Anchor Points',
    description:
      'A lifeline must be connected to an anchor that can support a static load of at least 22.2 kN (5,000 lbs). Workers must be connected before entering a fall hazard zone.',
    challengeId: 'lifeline',
  },
  {
    id: 'duty-to-report',
    code: 'OHSA, s. 28(1)(d)',
    title: 'Worker Duty to Report Hazards',
    description:
      'Every worker shall report to their employer or supervisor any hazard or contravention of the Act of which they are aware, including unsafe behaviour by coworkers.',
    challengeId: 'carlos',
  },
];

export function getRegulationByChallenge(challengeId: string): Regulation | undefined {
  return REGULATIONS.find((r) => r.challengeId === challengeId);
}
