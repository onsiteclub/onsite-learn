'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CREDS = [
  { n: 'Worker H&S Awareness', s: 'Valid', c: 'var(--green)', exp: 'No expiry' },
  { n: 'WHMIS 2015', s: 'Valid', c: 'var(--green)', exp: 'No expiry' },
  { n: 'Working at Heights', s: 'Expiring', c: 'var(--yellow)', exp: 'Jun 2027 — 14 months left' },
  { n: 'First Aid / CPR', s: 'Valid', c: 'var(--green)', exp: 'Jan 2028 — 21 months left' },
];

const CERTS = ['H&S Awareness', 'WHMIS 2015', 'Working at Heights', 'First Aid'];

const BADGES = [
  { l: 'Safety Certified', e: true },
  { l: 'Math Proficient', e: true },
  { l: 'Tool Safety', e: true },
  { l: 'Blueprint Reader', e: false },
  { l: 'Supervisor Ready', e: false },
];

const SETTINGS = [
  { l: 'Name', v: 'Carlos Mendes' },
  { l: 'Email', v: 'carlos@email.com' },
  { l: 'Trade', v: 'Framer' },
  { l: 'Province', v: 'Ontario' },
  { l: 'Language', v: 'English' },
];

const TABS = ['credentials', 'certificates', 'badges', 'settings'] as const;

export default function WalletPage() {
  const [tab, setTab] = useState<string>('credentials');

  return (
    <>
      <Header />
      <div className="section">
        <div className="section-label-learn"><span>Digital Credential Wallet</span></div>
        <h2 className="section-title" style={{ marginBottom: 32 }}>Your credentials</h2>

        <div className="wallet-grid">
          {/* Profile sidebar */}
          <div className="wallet-profile">
            <div className="wallet-profile-header">
              <div className="wallet-avatar">CM</div>
              <h3>Carlos Mendes</h3>
              <p>Framer &middot; Ontario</p>
            </div>
            <div className="wallet-qr">
              <div className="wallet-qr-box">
                <div className="wallet-qr-pattern" />
              </div>
              <p>Scan to verify credentials</p>
            </div>
            <div className="wallet-actions">
              <button className="btn-amber" style={{ padding: '9px 0' }}>Share</button>
              <button className="btn-outline" style={{ padding: '9px 0' }}>Download</button>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="wallet-tabs">
              {TABS.map((t) => (
                <button key={t} className={`wallet-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
                  {t}
                </button>
              ))}
            </div>

            {tab === 'credentials' && (
              <div className="cred-table">
                <div className="cred-table-header">
                  <span>CERTIFICATION</span>
                  <span>STATUS</span>
                </div>
                {CREDS.map((cert, i) => (
                  <div key={i} className="cred-row">
                    <div>
                      <div className="cred-name">{cert.n}</div>
                      <div className="cred-exp">{cert.exp}</div>
                    </div>
                    <span className="cred-status" style={{ color: cert.c, background: `color-mix(in srgb, ${cert.c} 5%, transparent)` }}>
                      {cert.s}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {tab === 'certificates' && (
              <div className="cert-grid">
                {CERTS.map((n, i) => (
                  <div key={i} className="cert-item">
                    <div className="cert-icon">PDF</div>
                    <div className="cert-label">{n}</div>
                  </div>
                ))}
                <div className="cert-upload">
                  <div className="cert-upload-icon">+</div>
                  <div className="cert-upload-label">Upload</div>
                </div>
              </div>
            )}

            {tab === 'badges' && (
              <div className="badge-grid">
                {BADGES.map((b, i) => (
                  <div key={i} className={`badge-item ${b.e ? 'earned' : 'locked'}`}>
                    <div className={`badge-name ${b.e ? 'earned' : 'locked'}`}>{b.l}</div>
                    <div className="badge-status">{b.e ? 'Earned' : 'Locked'}</div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'settings' && (
              <div className="settings-table">
                {SETTINGS.map((f, i) => (
                  <div key={i} className="settings-row">
                    <span className="settings-label">{f.l}</span>
                    <span className="settings-value">{f.v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
