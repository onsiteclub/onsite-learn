import Link from 'next/link';
import Image from 'next/image';

const COLS = [
  { title: 'Programs', links: ['Essential Courses', 'Government Free', 'Paid Online', 'In-Person', 'Career Pathways'] },
  { title: 'Platform', links: ['Digital Wallet', 'Employer Dashboard', 'API'] },
  { title: 'Resources', links: ['Blog', 'Training Providers', 'Help Centre', 'Useful Links'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact'] },
];

const ECOSYSTEM = [
  { label: 'OnSite Club', url: 'https://onsiteclub.ca', desc: 'Main Platform' },
  { label: 'OnSite Learn', url: 'https://learn.onsiteclub.ca', desc: 'Training & Courses' },
  { label: 'OnSite Tech', url: 'https://tech.onsiteclub.ca', desc: 'Tech Solutions' },
  { label: 'OnSite Shop', url: 'https://shop.onsiteclub.ca', desc: 'Gear & Equipment' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    url: 'https://instagram.com/onsiteclub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    url: 'https://facebook.com/onsiteclub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/company/onsiteclub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    url: 'https://tiktok.com/@onsiteclub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image
              src="/images/logo-white-02.png"
              alt="OnSite Club"
              width={160}
              height={54}
              style={{ marginBottom: 14, objectFit: 'contain' }}
            />
            <p>Professional construction training and credential management for Ontario workers.</p>

            {/* Social Media */}
            <div className="footer-socials">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              {col.links.map((l) => (
                <div key={l} className="footer-link">{l}</div>
              ))}
            </div>
          ))}

          {/* Ecosystem */}
          <div>
            <div className="footer-col-title">Ecosystem</div>
            {ECOSYSTEM.map((e) => (
              <a key={e.label} href={e.url} target="_blank" rel="noopener noreferrer" className="footer-link footer-eco-link">
                <span>{e.label}</span>
                <span className="footer-eco-desc">{e.desc}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 OnSite Club Inc. &middot; Ontario, Canada</span>
          <span>onsiteclub.ca</span>
        </div>
      </div>
    </footer>
  );
}
