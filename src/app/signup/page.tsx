'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

const TRADES = ['Framer', 'Carpenter', 'Electrician', 'Plumber', 'Labourer', 'Ironworker', 'Welder', 'Other'];
const PROVINCES = ['Ontario', 'British Columbia', 'Alberta', 'Quebec', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick'];

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [trade, setTrade] = useState('Framer');
  const [province, setProvince] = useState('Ontario');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          trade,
          province,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // If email confirmation is enabled, show success message
    // Otherwise redirect to wallet
    setSuccess(true);
    setLoading(false);

    // Try redirecting — if auto-confirm is on, this will work
    setTimeout(() => {
      router.refresh();
      router.push('/wallet');
    }, 1500);
  }

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <Link href="/" className="auth-logo">
              <Image src="/images/logo-sleeve.png" alt="OnSite Club" width={150} height={45} style={{ objectFit: 'contain' }} />
            </Link>
            <h1>Check your email</h1>
            <p>We sent a confirmation link to <strong>{email}</strong>. Click the link to activate your account.</p>
          </div>
          <div className="auth-footer">
            <Link href="/login" className="auth-link">Back to Sign In</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            <Image src="/images/logo-sleeve.png" alt="OnSite Club" width={150} height={45} style={{ objectFit: 'contain' }} />
          </Link>
          <h1>Create your account</h1>
          <p>Start tracking your certifications and credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <label className="auth-label">
            Full Name
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="auth-input"
              placeholder="John Doe"
              required
            />
          </label>

          <label className="auth-label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="auth-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              placeholder="Min. 6 characters"
              required
              minLength={6}
            />
          </label>

          <div className="auth-row">
            <label className="auth-label">
              Trade
              <select value={trade} onChange={(e) => setTrade(e.target.value)} className="auth-input">
                {TRADES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>

            <label className="auth-label">
              Province
              <select value={province} onChange={(e) => setProvince(e.target.value)} className="auth-input">
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
          </div>

          <button type="submit" className="btn-amber auth-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link href="/login" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
