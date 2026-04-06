import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { Profile, Credential, Certificate } from '@/lib/types';

function statusColor(status: string) {
  if (status === 'valid') return '#2D8A4E';
  if (status === 'expiring') return '#B7791F';
  if (status === 'expired') return '#C53030';
  return '#8C919A';
}

function statusLabel(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatExpiry(date: string | null) {
  if (!date) return 'No expiry';
  const d = new Date(date);
  return d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getInitials(name: string | null) {
  if (!name) return '?';
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

export default async function VerifyPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient();

  const [profileRes, credentialsRes, certificatesRes] = await Promise.all([
    supabase.from('learn_profiles').select('*').eq('id', params.id).single(),
    supabase.from('learn_credentials').select('*').eq('user_id', params.id).order('created_at', { ascending: false }),
    supabase.from('learn_certificates').select('*').eq('user_id', params.id).order('uploaded_at', { ascending: false }),
  ]);

  const profile = profileRes.data as Profile | null;
  if (!profile) {
    notFound();
  }

  const credentials = (credentialsRes.data as Credential[]) || [];
  const certificates = (certificatesRes.data as Certificate[]) || [];

  const validCount = credentials.filter((c) => c.status === 'valid').length;
  const expiringCount = credentials.filter((c) => c.status === 'expiring').length;
  const expiredCount = credentials.filter((c) => c.status === 'expired').length;

  return (
    <div className="verify-page">
      <div className="verify-container">
        {/* Header */}
        <div className="verify-header">
          <Link href="/">
            <Image src="/images/logo-sleeve.png" alt="OnSite Club" width={120} height={36} style={{ objectFit: 'contain' }} />
          </Link>
          <div className="verify-badge">VERIFIED CREDENTIALS</div>
        </div>

        {/* Worker Profile */}
        <div className="verify-profile">
          <div className="verify-avatar">{getInitials(profile.full_name)}</div>
          <div>
            <h1 className="verify-name">{profile.full_name || 'Worker'}</h1>
            <p className="verify-trade">{profile.trade || 'Construction Worker'} &middot; {profile.province || 'Ontario'}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="verify-stats">
          <div className="verify-stat">
            <div className="verify-stat-num" style={{ color: '#2D8A4E' }}>{validCount}</div>
            <div className="verify-stat-label">Valid</div>
          </div>
          <div className="verify-stat">
            <div className="verify-stat-num" style={{ color: '#B7791F' }}>{expiringCount}</div>
            <div className="verify-stat-label">Expiring</div>
          </div>
          <div className="verify-stat">
            <div className="verify-stat-num" style={{ color: '#C53030' }}>{expiredCount}</div>
            <div className="verify-stat-label">Expired</div>
          </div>
          <div className="verify-stat">
            <div className="verify-stat-num">{certificates.length}</div>
            <div className="verify-stat-label">Documents</div>
          </div>
        </div>

        {/* Credentials */}
        <div className="verify-section">
          <h2>Certifications</h2>
          {credentials.length === 0 ? (
            <p className="verify-empty">No certifications registered yet.</p>
          ) : (
            <div className="verify-cred-list">
              {credentials.map((cred) => (
                <div key={cred.id} className="verify-cred-row">
                  <div className="verify-cred-info">
                    <div className="verify-cred-name">{cred.name}</div>
                    <div className="verify-cred-meta">
                      {cred.provider && <span>{cred.provider}</span>}
                      <span>Expires: {formatExpiry(cred.expiry_date)}</span>
                    </div>
                  </div>
                  <div
                    className="verify-cred-status"
                    style={{
                      color: statusColor(cred.status),
                      background: `${statusColor(cred.status)}0D`,
                      border: `1px solid ${statusColor(cred.status)}20`,
                    }}
                  >
                    {statusLabel(cred.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certificates / Documents */}
        {certificates.length > 0 && (
          <div className="verify-section">
            <h2>Documents on File</h2>
            <div className="verify-cert-grid">
              {certificates.map((cert) => (
                <div key={cert.id} className="verify-cert-item">
                  <div className="verify-cert-icon">PDF</div>
                  <div className="verify-cert-name">{cert.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="verify-footer">
          <p>Credentials verified by OnSite Learn. This page is a real-time view of the worker&apos;s registered certifications.</p>
          <Link href="/" className="verify-powered">onsite-learn.com</Link>
        </div>
      </div>
    </div>
  );
}
