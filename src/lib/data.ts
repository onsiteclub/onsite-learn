export const IMG = {
  hero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80',
  wah: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80',
  forklift: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
  whmis: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
  safety: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
  blueprint: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
  math: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80',
  tools: 'https://images.unsplash.com/photo-1530124566582-a45a7c2ec4da?w=600&q=80',
  framing: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
  crane: 'https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=600&q=80',
  scaffold: 'https://images.unsplash.com/photo-1590644365607-1c5a6e69f180?w=600&q=80',
  welding: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
  confined: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
  supervisor: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  worker: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=600&q=80',
  ramset: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80',
  chainsaw: 'https://images.unsplash.com/photo-1598902468172-4b71db670584?w=600&q=80',
  firstaid: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&q=80',
};

export type BadgeType = 'REQUIRED' | 'CERTIFICATION' | 'DESIGNATION';
export type CourseCategory = 'government-free' | 'paid-online' | 'in-person';

export interface Course {
  id: string;
  title: string;
  sub: string;
  price?: string;
  img: string;
  badge: BadgeType;
  category?: CourseCategory;
  renewal?: string;
  modules: string[];
  provider: string;
  link: string;
  dur: string;
  type: string;
  essential?: boolean;
}

/* ==========================================
   BLOCK 1 — Mandatory (per province)
   ========================================== */

export const ONTARIO_MANDATORY: Course[] = [
  {
    id: 'on-hs4',
    title: 'Health & Safety Awareness in 4 Steps',
    sub: 'Online \u00b7 1 hr',
    price: 'Free',
    img: IMG.safety,
    badge: 'REQUIRED',
    provider: 'Ontario Ministry of Labour',
    link: 'https://www.labour.gov.on.ca/english/hs/elearn/worker/foursteps.php',
    dur: '1 hour',
    type: 'Online',
    modules: ['Your Rights', 'Hazard Recognition', 'Controls', 'Certificate of Completion'],
  },
  {
    id: 'on-whmis',
    title: 'WHMIS',
    sub: 'Online',
    price: 'Free',
    img: IMG.whmis,
    badge: 'REQUIRED',
    provider: 'AIX Safety',
    link: 'https://aixsafety.com/',
    dur: 'Self-paced',
    type: 'Online',
    modules: ['Safety Data Sheets', 'Hazard Labels', 'Chemical Classification', 'Emergency Procedures'],
  },
  {
    id: 'on-wah',
    title: 'Working at Heights',
    sub: 'In-Person \u00b7 8 hrs',
    price: '$80\u2013200',
    img: IMG.wah,
    badge: 'REQUIRED',
    renewal: '3 years',
    provider: 'CPO-Approved Provider',
    link: 'https://www.ontario.ca/page/training-working-heights',
    dur: '8 hours',
    type: 'In-Person',
    modules: ['Fall Hazard Awareness', 'Legislation & Regulations', 'Equipment Inspection', 'Practical Assessment'],
  },
];

export const ALBERTA_MANDATORY: Course[] = [
  {
    id: 'ab-csts',
    title: 'CSTS 2020 Fundamentals',
    sub: 'Online \u00b7 2\u20133 hrs',
    price: 'Free',
    img: IMG.safety,
    badge: 'REQUIRED',
    provider: 'ACSA',
    link: 'https://www.youracsa.ca/courses/csts2020/',
    dur: '2\u20133 hours',
    type: 'Online',
    modules: ['Workplace Safety', 'Hazard Identification', 'PPE Requirements', 'Emergency Response'],
  },
  {
    id: 'ab-whmis',
    title: 'WHMIS',
    sub: 'Online',
    price: 'Free',
    img: IMG.whmis,
    badge: 'REQUIRED',
    provider: 'AIX Safety',
    link: 'https://aixsafety.com/',
    dur: 'Self-paced',
    type: 'Online',
    modules: ['Safety Data Sheets', 'Hazard Labels', 'Chemical Classification', 'Emergency Procedures'],
  },
  {
    id: 'ab-fall',
    title: 'Fall Protection',
    sub: 'In-Person',
    price: '~$150',
    img: IMG.wah,
    badge: 'REQUIRED',
    provider: 'ACSA',
    link: 'https://www.youracsa.ca/courses/',
    dur: 'Varies',
    type: 'In-Person',
    modules: ['Fall Hazards', 'Prevention Systems', 'Equipment Use', 'Rescue Planning'],
  },
];

/* ==========================================
   BLOCK 2 — Essential for the Job Site
   ========================================== */

export const ESSENTIAL_COURSES: Course[] = [
  {
    id: 'firstaid-cpr',
    title: 'Standard First Aid + CPR/AED',
    sub: 'In-Person \u00b7 2 days',
    price: '~$130',
    img: IMG.firstaid,
    badge: 'CERTIFICATION',
    provider: 'St. John Ambulance',
    link: 'https://www.sja.ca/en/first-aid-training',
    dur: '2 days',
    type: 'In-Person',
    modules: ['Emergency First Aid', 'CPR Level A/C', 'AED Operation', 'Practical Scenarios'],
  },
  {
    id: 'confined-spaces',
    title: 'Confined Spaces Awareness',
    sub: 'Online available',
    price: '~$149',
    img: IMG.confined,
    badge: 'CERTIFICATION',
    provider: 'Ontario Construction',
    link: 'https://www.constructionontario.ca/',
    dur: 'Varies',
    type: 'Online',
    modules: ['Space Identification', 'Air Testing Basics', 'Entry Procedures', 'Emergency Response'],
  },
  {
    id: 'supervisor-hs5',
    title: 'Supervisor H&S in 5 Steps',
    sub: 'Online \u00b7 Free',
    price: 'Free',
    img: IMG.supervisor,
    badge: 'REQUIRED',
    provider: 'Ontario Ministry of Labour',
    link: 'https://www.labour.gov.on.ca/english/hs/elearn/supervisor/fivesteps.php',
    dur: '1 hour',
    type: 'Online',
    modules: ['Legal Duties', 'Hazard Recognition', 'Worker Protection', 'Controls', 'Certificate'],
  },
];

/* ==========================================
   BLOCK 3 — Career & Specialist
   ========================================== */

export const SPECIALIST_COURSES: Course[] = [
  {
    id: 'ncso',
    title: 'NCSO\u00ae Safety Officer',
    sub: 'Designation \u00b7 3+ yrs exp',
    price: '$1,500+',
    img: IMG.supervisor,
    badge: 'DESIGNATION',
    provider: 'IHSA',
    link: 'https://www.ihsa.ca/NCSO',
    dur: 'Ongoing',
    type: 'Designation',
    modules: ['OH&S Legislation', 'Hazard Management', 'Safety Auditing', 'Incident Investigation'],
  },
  {
    id: 'cor',
    title: 'COR\u00ae Certification',
    sub: 'Company-level \u00b7 Audit',
    price: 'Varies',
    img: IMG.blueprint,
    badge: 'CERTIFICATION',
    provider: 'IHSA',
    link: 'https://www.ihsa.ca/',
    dur: 'Varies',
    type: 'Company-level',
    modules: ['Safety Management System', 'Internal Auditing', 'Corrective Actions', 'Maintenance Audit'],
  },
  {
    id: 'gold-seal',
    title: 'Gold Seal Certification',
    sub: 'National standard',
    price: '$500+',
    img: IMG.crane,
    badge: 'CERTIFICATION',
    provider: 'CCA',
    link: 'https://www.cca-acc.com/gold-seal-certification/',
    dur: 'Varies',
    type: 'National',
    modules: ['Project Management', 'Estimating', 'Safety Management', 'Leadership'],
  },
];

/* ==========================================
   Combined + backward-compat exports
   ========================================== */

export const ALL_COURSES: Course[] = [
  ...ONTARIO_MANDATORY,
  ...ALBERTA_MANDATORY,
  ...ESSENTIAL_COURSES,
  ...SPECIALIST_COURSES,
];

// Backward-compat grouped record for sub-pages
export const COURSES: Record<CourseCategory, Course[]> = {
  'government-free': [
    ONTARIO_MANDATORY[0], ONTARIO_MANDATORY[1],
    ALBERTA_MANDATORY[0], ALBERTA_MANDATORY[1],
    ESSENTIAL_COURSES[2],
  ],
  'paid-online': [
    ESSENTIAL_COURSES[1],
    SPECIALIST_COURSES[1], SPECIALIST_COURSES[2],
  ],
  'in-person': [
    ONTARIO_MANDATORY[2],
    ALBERTA_MANDATORY[2],
    ESSENTIAL_COURSES[0],
    SPECIALIST_COURSES[0],
  ],
};

/* ==========================================
   Pathways & Blog (unchanged)
   ========================================== */

export const PATHWAYS = [
  { title: 'General Labourer', steps: ['H&S Awareness', 'WHMIS', 'Working at Heights'], duration: '1\u20132 weeks', color: '#2D8A4E' },
  { title: 'Carpenter Apprentice', steps: ['Mandatory 3', 'Construction Math', 'Blueprint Reading', 'Framing 101'], duration: '2\u20134 weeks', color: '#1C1F23' },
  { title: 'Equipment Operator', steps: ['Mandatory 3', 'Forklift', 'Hoisting & Rigging', 'Confined Spaces'], duration: '3\u20136 weeks', color: '#C58B1B' },
  { title: 'Site Supervisor', steps: ['All Certifications', 'JHSC Part 1 & 2', 'Supervisor H&S', 'Leadership'], duration: '3\u20136 months', color: '#C53030' },
];

export const GAMES = [
  {
    id: 'ppe-quiz',
    title: 'PPE Match',
    description: 'Match the right personal protective equipment to each job site scenario.',
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    category: 'Safety',
    gamePath: '/games/ppe-quiz/index.html',
  },
  {
    id: 'hazard-spotter',
    title: 'Hazard Spotter',
    description: 'Find all safety hazards on the construction site before time runs out.',
    thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
    category: 'Awareness',
    gamePath: '/games/hazard-spotter/index.html',
  },
  {
    id: 'signal-trainer',
    title: 'Crane Signals',
    description: 'Learn and practice standard hand signals for crane operations.',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
    category: 'Operations',
    gamePath: '/games/signal-trainer/index.html',
  },
];

export const BLOG = [
  { title: 'Ontario Updates Working at Heights Standards for 2026', date: 'Mar 28, 2026', cat: 'Regulation', img: IMG.wah },
  { title: '5 Certifications That Boost Your Hourly Rate', date: 'Mar 15, 2026', cat: 'Career', img: IMG.crane },
  { title: 'How to Prepare for Your WAH Course', date: 'Feb 20, 2026', cat: 'Guide', img: IMG.scaffold },
];
