import { supabase, TABLES } from '../../utils/supabase.js';

export const teamService = {
  // Register a new team
  async registerTeam(teamData) {
    try {
      const { teamName, teamLead, members, project } = teamData;

      // Insert team
      const { data: team, error: teamError } = await supabase
        .from(TABLES.TEAMS)
        .insert([
          {
            name: teamName,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (teamError) throw teamError;

      // Insert team lead
      const { error: leadError } = await supabase
        .from(TABLES.TEAM_MEMBERS)
        .insert([
          {
            team_id: team.id,
            name: teamLead.name,
            email: teamLead.email,
            phone: teamLead.phone,
            college: teamLead.college,
            role: 'team_lead',
            created_at: new Date().toISOString()
          }
        ]);

      if (leadError) throw leadError;

      // Insert team members
      const validMembers = members.filter(member => 
        member.name.trim() && member.email.trim() && member.phone.trim() && member.college.trim()
      );

      if (validMembers.length > 0) {
        const membersData = validMembers.map(member => ({
          team_id: team.id,
          name: member.name,
          email: member.email,
          phone: member.phone,
          college: member.college,
          role: 'member',
          created_at: new Date().toISOString()
        }));

        const { error: membersError } = await supabase
          .from(TABLES.TEAM_MEMBERS)
          .insert(membersData);

        if (membersError) throw membersError;
      }

      // Insert project details
      const { error: projectError } = await supabase
        .from(TABLES.PROJECTS)
        .insert([
          {
            team_id: team.id,
            title: project.title,
            domain: project.domain,
            problem: project.problem,
            solution: project.solution,
            tech_stack: project.techStack,
            created_at: new Date().toISOString()
          }
        ]);

      if (projectError) throw projectError;

      return { success: true, teamId: team.id };
    } catch (error) {
      console.error('Error registering team:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all teams
  async getAllTeams() {
    try {
      const { data, error } = await supabase
        .from(TABLES.TEAMS)
        .select(`
          *,
          team_members (*),
          projects (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching teams:', error);
      return { success: false, error: error.message };
    }
  },

  // Get team by ID
  async getTeamById(teamId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.TEAMS)
        .select(`
          *,
          team_members (*),
          projects (*)
        `)
        .eq('id', teamId)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching team:', error);
      return { success: false, error: error.message };
    }
  },

  // Update team status
  async updateTeamStatus(teamId, status) {
    try {
      const { error } = await supabase
        .from(TABLES.TEAMS)
        .update({ status })
        .eq('id', teamId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error updating team status:', error);
      return { success: false, error: error.message };
    }
  }
}; 