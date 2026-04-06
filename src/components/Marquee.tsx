'use client';

const ITEMS = [
  'Get Certified',
  'Ontario Approved',
  'Digital Credential Wallet',
  'Career-Ready Training',
  'Built for the Trades',
];

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...ITEMS, ...ITEMS].map((text, i) => (
          <span key={i} className="marquee-item">
            {text}
            <span className="marquee-dot">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
