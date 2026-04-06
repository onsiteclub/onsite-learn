import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WalletClient from './WalletClient';
import type { Profile, Credential, Certificate, Badge } from '@/lib/types';

const DEFAULT_BADGES = [
  { badge_key: 'safety_certified', label: 'Safety Certified' },
  { badge_key: 'math_proficient', label: 'Math Proficient' },
  { badge_key: 'tool_safety', label: 'Tool Safety' },
  { badge_key: 'blueprint_reader', label: 'Blueprint Reader' },
  { badge_key: 'supervisor_ready', label: 'Supervisor Ready' },
];

export default async function WalletPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch all data in parallel
  const [profileRes, credentialsRes, certificatesRes, badgesRes] = await Promise.all([
    supabase.from('learn_profiles').select('*').eq('id', user.id).single(),
    supabase.from('learn_credentials').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('learn_certificates').select('*').eq('user_id', user.id).order('uploaded_at', { ascending: false }),
    supabase.from('learn_badges').select('*').eq('user_id', user.id).order('created_at', { ascending: true }),
  ]);

  // If no badges exist yet, seed the defaults
  let badges: Badge[] = badgesRes.data as Badge[] || [];
  if (badges.length === 0) {
    const badgesToInsert = DEFAULT_BADGES.map((b) => ({
      user_id: user.id,
      badge_key: b.badge_key,
      label: b.label,
      earned: false,
    }));
    const { data: newBadges } = await supabase
      .from('learn_badges')
      .insert(badgesToInsert)
      .select();
    badges = (newBadges as Badge[]) || [];
  }

  const profile: Profile = profileRes.data || {
    id: user.id,
    full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
    trade: user.user_metadata?.trade || null,
    province: user.user_metadata?.province || 'Ontario',
    language: 'English',
    avatar_url: null,
    created_at: user.created_at,
    updated_at: user.created_at,
  };

  return (
    <>
      <Header />
      <WalletClient
        user={{ id: user.id, email: user.email || '' }}
        profile={profile}
        credentials={credentialsRes.data as Credential[] || []}
        certificates={certificatesRes.data as Certificate[] || []}
        badges={badges}
      />
      <Footer />
    </>
  );
}
