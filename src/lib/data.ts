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
};

export interface Course {
  id: string;
  title: string;
  sub: string;
  price?: string;
  img: string;
  tag?: string;
  renewal?: string;
  modules: string[];
  provider?: string;
  link?: string;
  dur: string;
  type: string;
  progress?: number;
}

export const COURSES: Record<string, Course[]> = {
  mandatory: [
    { id: 'wah', title: 'Working at Heights', sub: 'CPO-Approved · 8 Hours · In-Person', price: '$80–200', img: IMG.wah, tag: 'REQUIRED', renewal: '3 years', modules: ['Fall Hazard Awareness', 'Legislation & Regulations', 'Equipment Inspection', 'Practical Assessment'], provider: 'CPO-Approved Provider', link: 'https://www.ontario.ca/page/training-working-heights', dur: '8 hours', type: 'In-Person' },
    { id: 'whmis', title: 'WHMIS 2015', sub: 'Hazardous Materials · 4 Hours', price: 'Free', img: IMG.whmis, tag: 'REQUIRED', modules: ['Safety Data Sheets', 'Hazard Labels', 'Chemical Classification', 'Emergency Procedures'], provider: 'CCOHS', link: 'https://www.ccohs.ca/', dur: '4 hours', type: 'Online' },
    { id: 'hs4', title: 'Health & Safety Awareness', sub: 'Ontario Reg. 297/13 · 1 Hour · Online', price: 'Free', img: IMG.safety, tag: 'REQUIRED', modules: ['Your Rights', 'Hazard Recognition', 'Controls', 'Certificate of Completion'], provider: 'Ontario Ministry of Labour', link: 'https://www.ontario.ca/page/worker-health-and-safety-awareness-four-steps', dur: '1 hour', type: 'Online' },
  ],
  skills: [
    { id: 'forklift', title: 'Forklift Operator', sub: 'Powered Industrial Truck · 2–3 Days', price: '$189', img: IMG.forklift, tag: 'CERTIFICATION', modules: ['Pre-Op Inspection', 'Load Handling', 'Safe Operation', 'Practical Test'], dur: '2–3 days', type: 'In-Person' },
    { id: 'confined', title: 'Confined Spaces', sub: 'Awareness to Rescue · 4 Modules', price: '$149', img: IMG.confined, tag: 'CERTIFICATION', modules: ['Awareness', 'Air Testing', 'Respiratory Protection', 'Non-Entry Rescue'], dur: '30 hours', type: 'In-Person' },
    { id: 'scaffold', title: 'Scaffold Builder', sub: 'Erecting & Dismantling · 40 Hours', price: '$249', img: IMG.scaffold, tag: 'TRADE SKILL', modules: ['Types of Scaffold', 'Erecting', 'Dismantling', 'Inspection', 'Safety'], dur: '40 hours', type: 'In-Person' },
    { id: 'crane', title: 'Hoisting & Rigging', sub: 'Load Calculations & Signals · 16 Hours', price: '$199', img: IMG.crane, tag: 'TRADE SKILL', modules: ['Construction Math', 'Load Calculations', 'Hitches', 'Hand Signals'], dur: '16 hours', type: 'In-Person' },
    { id: 'welding', title: 'Intro to Welding', sub: 'Oxy-Acetylene & Arc · CWB Testing', price: '$349', img: IMG.welding, tag: 'TRADE SKILL', modules: ['Oxy-Acetylene Cutting', 'Brazing', 'Arc Welding Intro', 'CWB Test Prep'], dur: '200 hours', type: 'In-Person' },
    { id: 'firstaid', title: 'First Aid & CPR', sub: 'Emergency Standard · Level A · 16 Hours', price: '$129', img: IMG.safety, tag: 'CERTIFICATION', modules: ['Emergency First Aid', 'CPR Level A', 'AED Operation', 'Practical Scenarios'], dur: '16 hours', type: 'In-Person' },
  ],
  micro: [
    { id: 'cmath', title: 'Construction Math', sub: 'Imperial · Fractions · Estimation', dur: '30 min', img: IMG.math, progress: 67, modules: ['Tape Reading', 'Fractions', 'Area', 'Estimation', 'Quiz'], type: 'Online' },
    { id: 'blueprint', title: 'Blueprint Reading', sub: 'Plans · Symbols · Cross-Sections', dur: '45 min', img: IMG.blueprint, progress: 0, modules: ['Floor Plans', 'Symbols', 'Elevations', 'Scale', 'Practice'], type: 'Online' },
    { id: 'toolsafe', title: 'Tool Safety', sub: 'Hand Tools · Power Tools · PPE', dur: '20 min', img: IMG.tools, progress: 100, modules: ['Hand Tools', 'Power Tools', 'PPE', 'Quiz'], type: 'Online' },
    { id: 'framing101', title: 'Framing 101', sub: 'Layout · Headers · Rough Openings', dur: '40 min', img: IMG.framing, progress: 0, modules: ['Wall Layout', 'Headers', 'Rough Openings', 'Plumb & Level', 'Mistakes'], type: 'Online' },
  ],
};

export const PATHWAYS = [
  { title: 'General Labourer', steps: ['H&S Awareness', 'WHMIS', 'Working at Heights'], duration: '1–2 weeks', color: '#2D8A4E' },
  { title: 'Carpenter Apprentice', steps: ['Mandatory 3', 'Construction Math', 'Blueprint Reading', 'Framing 101'], duration: '2–4 weeks', color: '#1C1F23' },
  { title: 'Equipment Operator', steps: ['Mandatory 3', 'Forklift', 'Hoisting & Rigging', 'Confined Spaces'], duration: '3–6 weeks', color: '#C58B1B' },
  { title: 'Site Supervisor', steps: ['All Certifications', 'JHSC Part 1 & 2', 'Supervisor H&S', 'Leadership'], duration: '3–6 months', color: '#C53030' },
];

export const BLOG = [
  { title: 'Ontario Updates Working at Heights Standards for 2026', date: 'Mar 28, 2026', cat: 'Regulation', img: IMG.wah },
  { title: '5 Certifications That Boost Your Hourly Rate', date: 'Mar 15, 2026', cat: 'Career', img: IMG.crane },
  { title: 'How to Prepare for Your WAH Course', date: 'Feb 20, 2026', cat: 'Guide', img: IMG.scaffold },
];
