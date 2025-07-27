import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '../../utils/supabase.js';
import { COLORS } from '../constants/colors';

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing connection...');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Test basic connection
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .limit(1);

      if (error) {
        setStatus(`Connection failed: ${error.message}`);
        console.error('Supabase connection error:', error);
      } else {
        setStatus('✅ Supabase connected successfully!');
        console.log('Supabase connection successful');
      }
    } catch (error) {
      setStatus(`Connection error: ${error.message}`);
      console.error('Supabase test error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    margin: 10,
  },
  status: {
    color: COLORS.text,
    fontSize: 14,
    textAlign: 'center',
  },
}); 