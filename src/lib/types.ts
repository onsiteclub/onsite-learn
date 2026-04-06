export interface Profile {
  id: string;
  full_name: string | null;
  trade: string | null;
  province: string | null;
  language: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Credential {
  id: string;
  user_id: string;
  name: string;
  status: 'valid' | 'expiring' | 'expired' | 'pending';
  expiry_date: string | null;
  issue_date: string | null;
  provider: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  name: string;
  file_path: string;
  file_size: number | null;
  credential_id: string | null;
  uploaded_at: string;
}

export interface Badge {
  id: string;
  user_id: string;
  badge_key: string;
  label: string;
  earned: boolean;
  earned_at: string | null;
  created_at: string;
}

export interface CourseProgress {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  completed_at: string | null;
  last_accessed_at: string;
  created_at: string;
  updated_at: string;
}
