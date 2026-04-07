'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

type ModalStep = 'email' | 'login' | 'register' | 'confirm';

const TRADES = ['Framer', 'Carpenter', 'Electrician', 'Plumber', 'Labourer', 'Ironworker', 'Welder', 'Other'];
const PROVINCES = ['Ontario', 'British Columbia', 'Alberta', 'Quebec', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick'];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectAfter?: string;
}

export default function AuthModal({ isOpen, onClose, redirectAfter }: AuthModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<ModalStep>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [trade, setTrade] = useState('Framer');
  const [province, setProvince] = useState('Ontario');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  function handleClose() {
    setStep('email');
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setError('');
    setLoading(false);
    onClose();
  }

  function handleBack() {
    setPassword('');
    setError('');
    setStep('email');
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { data: exists, error: rpcError } = await supabase.rpc('check_email_exists', { check_email: email });
    setLoading(false);
    if (rpcError) {
      setError('Something went wrong. Please try again.');
      return;
    }
    setStep(exists ? 'login' : 'register');
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    handleClose();
    router.refresh();
    if (redirectAfter) router.push(redirectAfter);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const fullName = `${firstName} ${lastName}`.trim();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, trade, province } },
    });
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    setStep('confirm');
    setTimeout(() => {
      router.refresh();
      if (redirectAfter) router.push(redirectAfter);
    }, 1500);
  }

  return (
    <div className="redirect-overlay" onClick={handleClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={handleClose}>&times;</button>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Image src="/images/logo-sleeve.png" alt="OnSite Club" width={120} height={36} style={{ objectFit: 'contain' }} />
        </div>

        {/* STEP: EMAIL */}
        {step === 'email' && (
          <form onSubmit={handleEmailSubmit}>
            <h3 className="auth-modal-title">Member Area</h3>
            <p className="auth-modal-desc">Enter your email to sign in or create an account.</p>
            {error && <div className="auth-error">{error}</div>}
            <label className="auth-label">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                placeholder="you@example.com"
                required
                autoFocus
              />
            </label>
            <button type="submit" className="btn-amber auth-submit" disabled={loading}>
              {loading ? 'Checking...' : 'Continue'}
            </button>
          </form>
        )}

        {/* STEP: LOGIN */}
        {step === 'login' && (
          <form onSubmit={handleLogin}>
            <h3 className="auth-modal-title">Welcome back</h3>
            <p className="auth-modal-desc">Enter your password to sign in.</p>
            {error && <div className="auth-error">{error}</div>}
            <div className="auth-modal-email-display">
              <span>{email}</span>
              <button type="button" className="auth-modal-change" onClick={handleBack}>Change</button>
            </div>
            <label className="auth-label">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                placeholder="Your password"
                required
                minLength={6}
                autoFocus
              />
            </label>
            <button type="submit" className="btn-amber auth-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* STEP: REGISTER */}
        {step === 'register' && (
          <form onSubmit={handleRegister}>
            <h3 className="auth-modal-title">Create your account</h3>
            <p className="auth-modal-desc">Fill in your details to get started.</p>
            {error && <div className="auth-error">{error}</div>}
            <div className="auth-modal-email-display">
              <span>{email}</span>
              <button type="button" className="auth-modal-change" onClick={handleBack}>Change</button>
            </div>
            <div className="auth-row">
              <label className="auth-label">
                First Name
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="auth-input"
                  placeholder="John"
                  required
                  autoFocus
                />
              </label>
              <label className="auth-label">
                Last Name
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="auth-input"
                  placeholder="Smith"
                  required
                />
              </label>
            </div>
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
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        )}

        {/* STEP: CONFIRM */}
        {step === 'confirm' && (
          <div className="auth-modal-confirm">
            <div style={{ fontSize: 40, marginBottom: 12 }}>&#9993;</div>
            <h3>Check your email</h3>
            <p>We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
          </div>
        )}
      </div>
    </div>
  );
}
