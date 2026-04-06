'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { createClient } from '@/lib/supabase/client';
import type { Profile, Credential, Certificate, Badge } from '@/lib/types';

const TABS = ['credentials', 'certificates', 'badges', 'settings'] as const;

function getInitials(name: string | null) {
  if (!name) return '?';
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

function statusColor(status: string) {
  if (status === 'valid') return 'var(--green)';
  if (status === 'expiring') return 'var(--yellow)';
  if (status === 'expired') return 'var(--red)';
  return 'var(--text-muted)';
}

function formatExpiry(date: string | null) {
  if (!date) return 'No expiry';
  const d = new Date(date);
  const now = new Date();
  const months = Math.round((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30));
  const formatted = d.toLocaleDateString('en-CA', { month: 'short', year: 'numeric' });
  if (months <= 0) return `${formatted} — Expired`;
  return `${formatted} — ${months} months left`;
}

interface WalletProps {
  user: { id: string; email: string };
  profile: Profile;
  credentials: Credential[];
  certificates: Certificate[];
  badges: Badge[];
}

export default function WalletClient({ user, profile, credentials, certificates, badges }: WalletProps) {
  const router = useRouter();
  const [tab, setTab] = useState<string>('credentials');
  const [uploading, setUploading] = useState(false);

  // Settings state
  const [editingSettings, setEditingSettings] = useState(false);
  const [fullName, setFullName] = useState(profile.full_name || '');
  const [trade, setTrade] = useState(profile.trade || '');
  const [province, setProvince] = useState(profile.province || 'Ontario');
  const [savingProfile, setSavingProfile] = useState(false);

  // Add credential state
  const [showAddCred, setShowAddCred] = useState(false);
  const [newCredName, setNewCredName] = useState('');
  const [newCredProvider, setNewCredProvider] = useState('');
  const [newCredExpiry, setNewCredExpiry] = useState('');
  const [addingCred, setAddingCred] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();
    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('learn-certificates')
      .upload(filePath, file);

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message);
      setUploading(false);
      return;
    }

    await supabase.from('learn_certificates').insert({
      user_id: user.id,
      name: file.name.replace('.pdf', ''),
      file_path: filePath,
      file_size: file.size,
    });

    setUploading(false);
    router.refresh();
  }

  async function handleDeleteCert(cert: Certificate) {
    const supabase = createClient();
    await supabase.storage.from('learn-certificates').remove([cert.file_path]);
    await supabase.from('learn_certificates').delete().eq('id', cert.id);
    router.refresh();
  }

  async function handleDownloadCert(cert: Certificate) {
    const supabase = createClient();
    const { data } = await supabase.storage
      .from('learn-certificates')
      .createSignedUrl(cert.file_path, 60);
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  }

  async function handleSaveProfile() {
    setSavingProfile(true);
    const supabase = createClient();
    await supabase.from('learn_profiles').update({
      full_name: fullName,
      trade,
      province,
    }).eq('id', user.id);

    setSavingProfile(false);
    setEditingSettings(false);
    router.refresh();
  }

  async function handleAddCredential(e: React.FormEvent) {
    e.preventDefault();
    setAddingCred(true);
    const supabase = createClient();
    await supabase.from('learn_credentials').insert({
      user_id: user.id,
      name: newCredName,
      provider: newCredProvider || null,
      expiry_date: newCredExpiry || null,
      status: 'valid',
    });
    setNewCredName('');
    setNewCredProvider('');
    setNewCredExpiry('');
    setShowAddCred(false);
    setAddingCred(false);
    router.refresh();
  }

  async function handleDeleteCredential(id: string) {
    const supabase = createClient();
    await supabase.from('learn_credentials').delete().eq('id', id);
    router.refresh();
  }

  return (
    <div className="section">
      <div className="section-label-learn"><span>Digital Credential Wallet</span></div>
      <h2 className="section-title" style={{ marginBottom: 32 }}>Your credentials</h2>

      <div className="wallet-grid">
        {/* Profile sidebar */}
        <div className="wallet-profile">
          <div className="wallet-profile-header">
            <div className="wallet-avatar">{getInitials(profile.full_name)}</div>
            <h3>{profile.full_name || 'New User'}</h3>
            <p>{profile.trade || 'Construction Worker'} &middot; {profile.province || 'Ontario'}</p>
          </div>
          <div className="wallet-qr">
            <div className="wallet-qr-box">
              <QRCodeSVG
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/verify/${user.id}`}
                size={130}
                bgColor="#FAFAF8"
                fgColor="#1C1F23"
                level="M"
              />
            </div>
            <p>Scan to verify credentials</p>
          </div>
          <div className="wallet-actions">
            <button
              className="btn-amber"
              style={{ padding: '9px 0' }}
              onClick={() => {
                const url = `${window.location.origin}/verify/${user.id}`;
                navigator.clipboard.writeText(url);
                alert('Verification link copied!');
              }}
            >
              Share Link
            </button>
            <a
              href={`/verify/${user.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ padding: '9px 0', textAlign: 'center', textDecoration: 'none' }}
            >
              Preview
            </a>
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

          {/* CREDENTIALS TAB */}
          {tab === 'credentials' && (
            <div>
              <div className="cred-table">
                <div className="cred-table-header">
                  <span>CERTIFICATION</span>
                  <span>STATUS</span>
                </div>
                {credentials.length === 0 && (
                  <div className="cred-row" style={{ justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                    No credentials yet. Add your first certification below.
                  </div>
                )}
                {credentials.map((cred) => (
                  <div key={cred.id} className="cred-row">
                    <div>
                      <div className="cred-name">{cred.name}</div>
                      <div className="cred-exp">{formatExpiry(cred.expiry_date)}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        className="cred-status"
                        style={{
                          color: statusColor(cred.status),
                          background: `color-mix(in srgb, ${statusColor(cred.status)} 5%, transparent)`,
                        }}
                      >
                        {cred.status.charAt(0).toUpperCase() + cred.status.slice(1)}
                      </span>
                      <button
                        onClick={() => handleDeleteCredential(cred.id)}
                        className="btn-outline"
                        style={{ padding: '4px 8px', fontSize: 10 }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {!showAddCred ? (
                <button
                  onClick={() => setShowAddCred(true)}
                  className="btn-amber"
                  style={{ marginTop: 12, padding: '9px 20px', fontSize: 12 }}
                >
                  + Add Credential
                </button>
              ) : (
                <form onSubmit={handleAddCredential} className="add-cred-form">
                  <input
                    type="text"
                    placeholder="Certification name"
                    value={newCredName}
                    onChange={(e) => setNewCredName(e.target.value)}
                    className="auth-input"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Provider (optional)"
                    value={newCredProvider}
                    onChange={(e) => setNewCredProvider(e.target.value)}
                    className="auth-input"
                  />
                  <input
                    type="date"
                    placeholder="Expiry date"
                    value={newCredExpiry}
                    onChange={(e) => setNewCredExpiry(e.target.value)}
                    className="auth-input"
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="submit" className="btn-amber" style={{ padding: '9px 20px', fontSize: 12 }} disabled={addingCred}>
                      {addingCred ? 'Adding...' : 'Save'}
                    </button>
                    <button type="button" onClick={() => setShowAddCred(false)} className="btn-outline" style={{ padding: '9px 20px', fontSize: 12 }}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* CERTIFICATES TAB */}
          {tab === 'certificates' && (
            <div>
              <div className="cert-grid">
                {certificates.map((cert) => (
                  <div key={cert.id} className="cert-item">
                    <div className="cert-icon">PDF</div>
                    <div className="cert-label">{cert.name}</div>
                    <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                      <button
                        onClick={() => handleDownloadCert(cert)}
                        style={{ background: 'none', border: 'none', color: 'var(--amber)', cursor: 'pointer', fontSize: 10, fontWeight: 600 }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteCert(cert)}
                        style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', fontSize: 10, fontWeight: 600 }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <label className="cert-upload">
                  <div className="cert-upload-icon">{uploading ? '...' : '+'}</div>
                  <div className="cert-upload-label">{uploading ? 'Uploading...' : 'Upload PDF'}</div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
          )}

          {/* BADGES TAB */}
          {tab === 'badges' && (
            <div className="badge-grid">
              {badges.map((b) => (
                <div key={b.id} className={`badge-item ${b.earned ? 'earned' : 'locked'}`}>
                  <div className={`badge-name ${b.earned ? 'earned' : 'locked'}`}>{b.label}</div>
                  <div className="badge-status">{b.earned ? 'Earned' : 'Locked'}</div>
                </div>
              ))}
            </div>
          )}

          {/* SETTINGS TAB */}
          {tab === 'settings' && (
            <div className="settings-table">
              {editingSettings ? (
                <div className="settings-edit-form">
                  <div className="settings-row">
                    <span className="settings-label">Full Name</span>
                    <input className="auth-input" style={{ maxWidth: 220 }} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                  <div className="settings-row">
                    <span className="settings-label">Email</span>
                    <span className="settings-value">{user.email}</span>
                  </div>
                  <div className="settings-row">
                    <span className="settings-label">Trade</span>
                    <input className="auth-input" style={{ maxWidth: 220 }} value={trade} onChange={(e) => setTrade(e.target.value)} />
                  </div>
                  <div className="settings-row">
                    <span className="settings-label">Province</span>
                    <input className="auth-input" style={{ maxWidth: 220 }} value={province} onChange={(e) => setProvince(e.target.value)} />
                  </div>
                  <div className="settings-row">
                    <span className="settings-label">Language</span>
                    <span className="settings-value">{profile.language || 'English'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="btn-amber" style={{ padding: '9px 20px', fontSize: 12 }} onClick={handleSaveProfile} disabled={savingProfile}>
                      {savingProfile ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button className="btn-outline" style={{ padding: '9px 20px', fontSize: 12 }} onClick={() => setEditingSettings(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {[
                    { l: 'Name', v: profile.full_name || '-' },
                    { l: 'Email', v: user.email },
                    { l: 'Trade', v: profile.trade || '-' },
                    { l: 'Province', v: profile.province || '-' },
                    { l: 'Language', v: profile.language || 'English' },
                  ].map((f, i) => (
                    <div key={i} className="settings-row">
                      <span className="settings-label">{f.l}</span>
                      <span className="settings-value">{f.v}</span>
                    </div>
                  ))}
                  <button
                    className="btn-outline"
                    style={{ marginTop: 12, padding: '9px 20px', fontSize: 12 }}
                    onClick={() => setEditingSettings(true)}
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
