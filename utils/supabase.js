import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, processLock } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://zjxnlkzoabpmawesiqdr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqeG5sa3pvYWJwbWF3ZXNpcWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MTg5MjksImV4cCI6MjA2OTE5NDkyOX0.TKuXgTJFGpUARTvpZHWnSQG1ydqYUFN0CEzYW5uw1ro',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  })

// Database table names
export const TABLES = {
  TEAMS: 'teams',
  TEAM_MEMBERS: 'team_members',
  PROJECTS: 'projects',
  CONTACTS: 'contacts',
}; 