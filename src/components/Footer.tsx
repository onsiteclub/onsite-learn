import Link from 'next/link';

const COLS = [
  { title: 'Programs', links: ['Mandatory Certs', 'Trade Skills', 'Microlearning', 'Career Pathways'] },
  { title: 'Platform', links: ['Digital Wallet', 'Employer Dashboard', 'API'] },
  { title: 'Resources', links: ['Blog', 'Training Providers', 'Help Centre', 'Useful Links'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact'] },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 24, height: 24, background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: 'var(--charcoal)' }}>
                O
              </div>
              <span style={{ fontWeight: 800, fontSize: 13, color: 'var(--white)', letterSpacing: '.04em' }}>
                ONSITE <span style={{ color: 'var(--amber)' }}>LEARN</span>
              </span>
            </div>
            <p>Professional construction training and credential management for Ontario workers.</p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              {col.links.map((l) => (
                <div key={l} className="footer-link">{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 OnSite Club Inc. &middot; Ontario, Canada</span>
          <span>onsiteclub.ca</span>
        </div>
      </div>
    </footer>
  );
}
