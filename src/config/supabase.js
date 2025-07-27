import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = 'https://zjxnlkzoabpmawesiqdr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqeG5sa3pvYWJwbWF3ZXNpcWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MTg5MjksImV4cCI6MjA2OTE5NDkyOX0.TKuXgTJFGpUARTvpZHWnSQG1ydqYUFN0CEzYW5uw1ro';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
  TEAMS: 'teams',
  TEAM_MEMBERS: 'team_members',
  PROJECTS: 'projects',
  CONTACTS: 'contacts',
}; 