import { supabase, TABLES } from '../config/supabase';

export const contactService = {
  // Submit contact form
  async submitContact(contactData) {
    try {
      const { name, email, subject, message } = contactData;

      const { data, error } = await supabase
        .from(TABLES.CONTACTS)
        .insert([
          {
            name,
            email,
            subject,
            message,
            created_at: new Date().toISOString(),
            status: 'new'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return { success: true, contactId: data.id };
    } catch (error) {
      console.error('Error submitting contact:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all contacts (for admin)
  async getAllContacts() {
    try {
      const { data, error } = await supabase
        .from(TABLES.CONTACTS)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return { success: false, error: error.message };
    }
  },

  // Update contact status
  async updateContactStatus(contactId, status) {
    try {
      const { error } = await supabase
        .from(TABLES.CONTACTS)
        .update({ status })
        .eq('id', contactId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error updating contact status:', error);
      return { success: false, error: error.message };
    }
  }
}; 