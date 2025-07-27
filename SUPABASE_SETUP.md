# Supabase Setup for Piston Cup 2025

## 🚀 Quick Setup Guide

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Choose a project name (e.g., "piston-cup-2025")
4. Set a database password
5. Choose a region close to your users

### 2. Get Your Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy your **Project URL** and **anon public key**
3. Update `src/config/supabase.js` with your credentials:

```javascript
const supabaseUrl = 'YOUR_PROJECT_URL';
const supabaseAnonKey = 'YOUR_ANON_KEY';
```

### 3. Set Up Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the contents of `database/schema.sql`
3. Run the SQL script to create all tables and policies

### 4. Test the Integration

1. Run your React Native app
2. Try registering a team
3. Check your Supabase dashboard → **Table Editor** to see the data

## 📊 Database Schema

### Tables Created:

1. **`teams`** - Team information
   - `id` (UUID, Primary Key)
   - `name` (VARCHAR)
   - `status` (pending/approved/rejected)
   - `created_at`, `updated_at`

2. **`team_members`** - Individual team members
   - `id` (UUID, Primary Key)
   - `team_id` (UUID, Foreign Key)
   - `name`, `email`, `phone`, `college`
   - `role` (team_lead/member)
   - `created_at`

3. **`projects`** - Project details
   - `id` (UUID, Primary Key)
   - `team_id` (UUID, Foreign Key)
   - `title`, `domain`, `problem`, `solution`, `tech_stack`
   - `created_at`, `updated_at`

4. **`contacts`** - Contact form submissions
   - `id` (UUID, Primary Key)
   - `name`, `email`, `subject`, `message`
   - `status` (new/read/replied)
   - `created_at`, `updated_at`

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Public read access** for teams, members, and projects
- **Public insert access** for registration and contact forms
- **Admin-only access** for sensitive operations

## 🛠️ Available Services

### Team Service (`src/services/teamService.js`)
- `registerTeam(teamData)` - Register new team
- `getAllTeams()` - Get all teams (for admin)
- `getTeamById(teamId)` - Get specific team
- `updateTeamStatus(teamId, status)` - Update team status

### Contact Service (`src/services/contactService.js`)
- `submitContact(contactData)` - Submit contact form
- `getAllContacts()` - Get all contacts (for admin)
- `updateContactStatus(contactId, status)` - Update contact status

## 📱 Features Integrated

### ✅ Team Registration
- Stores team information in Supabase
- Handles team lead and member details
- Stores project information
- Returns team ID for tracking

### ✅ Contact Form
- Stores contact submissions in Supabase
- Still opens WhatsApp with pre-filled message
- Provides admin access to view submissions

### ✅ Error Handling
- Proper error messages for users
- Network error handling
- Database error handling

## 🔧 Environment Variables (Optional)

For production, consider using environment variables:

```javascript
// In supabase.js
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
```

Create a `.env` file:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎯 Next Steps

1. **Admin Dashboard**: Create web dashboard for managing teams
2. **Email Notifications**: Set up email triggers for new registrations
3. **Real-time Updates**: Add real-time subscriptions for live updates
4. **Authentication**: Add user authentication for admin access
5. **File Uploads**: Add support for project files/documents

## 🐛 Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Check your Supabase URL and anon key
2. **"Table doesn't exist"**: Run the schema.sql script
3. **"RLS policy violation"**: Check table policies in Supabase dashboard
4. **Network errors**: Check internet connection and Supabase status

### Debug Mode:

Enable debug logging in `supabase.js`:
```javascript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    debug: true
  }
});
```

## 📞 Support

- Supabase Documentation: [supabase.com/docs](https://supabase.com/docs)
- React Native Supabase: [supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native) 