'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

const MENUS: Record<string, { label: string; desc: string; href: string }[]> = {
  programs: [
    { label: 'Mandatory Certifications', desc: "Ontario's 3 required courses", href: '/courses/mandatory' },
    { label: 'Trade Skills & Certifications', desc: 'Equipment, welding, scaffolding', href: '/courses/skills' },
    { label: 'Microlearning Courses', desc: 'Quick lessons — 20 to 45 min', href: '/courses/micro' },
    { label: 'Career Pathways', desc: 'Guided learning tracks by role', href: '/pathways' },
  ],
  resources: [
    { label: 'Blog & Industry News', desc: 'Regulation updates, career guides', href: '/blog' },
    { label: 'Find Training Providers', desc: 'CPO-approved centres near you', href: '#' },
    { label: 'Help Centre', desc: 'FAQ and support contact', href: '#' },
  ],
};

function getInitials(user: User | null) {
  if (!user) return '';
  const name = user.user_metadata?.full_name || user.email || '';
  if (name.includes('@')) return name[0].toUpperCase();
  return name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2);
}

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
    router.push('/');
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="header-logo">
            <Image
              src="/images/logo-sleeve.png"
              alt="OnSite Club"
              width={132}
              height={40}
              priority
              style={{ objectFit: 'contain' }}
            />
          </Link>

          <nav className="header-nav">
            <div className="nav-item">
              <Link href="/" className="nav-btn">Home</Link>
            </div>
            {Object.entries(MENUS).map(([id, items]) => (
              <div key={id} className="nav-item">
                <button className="nav-btn">
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                  <span className="nav-caret">▾</span>
                </button>
                <div className="nav-dropdown">
                  <div className="nav-dropdown-inner">
                    {items.map((m) => (
                      <Link key={m.href} href={m.href} className="nav-dropdown-item">
                        <div className="nav-dropdown-label">{m.label}</div>
                        <div className="nav-dropdown-desc">{m.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="header-actions">
            {user ? (
              <>
                <Link href="/wallet" className="btn-outline">My Wallet</Link>
                <div className="header-user">
                  <div className="header-avatar">{getInitials(user)}</div>
                  <button className="btn-outline" onClick={handleSignOut} style={{ fontSize: 11 }}>Sign Out</button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-outline">Sign In</Link>
                <Link href="/signup" className="btn-dark">Sign Up</Link>
              </>
            )}
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)}>
        <div className="mobile-nav-inner" onClick={(e) => e.stopPropagation()}>
          <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>×</button>
          <div className="mobile-nav-links">
            <Link href="/" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Home</Link>
            <div className="mobile-nav-link">Programs</div>
            {MENUS.programs.map((m) => (
              <Link key={m.href} href={m.href} className="mobile-nav-sub" onClick={() => setMobileOpen(false)}>{m.label}</Link>
            ))}
            <div className="mobile-nav-link">Resources</div>
            {MENUS.resources.map((m) => (
              <Link key={m.href} href={m.href} className="mobile-nav-sub" onClick={() => setMobileOpen(false)}>{m.label}</Link>
            ))}
            {user ? (
              <>
                <Link href="/wallet" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>My Wallet</Link>
                <button
                  className="mobile-nav-link"
                  onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link href="/signup" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
