import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const RegistrationScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    teamName: '',
    teamSize: 3,
    domain: '',
    problemStatement: '',
    approach: '',
    solution: '',
    technologyStack: '',
    members: [
      { name: '', email: '', phone: '', role: 'Team Lead' },
      { name: '', email: '', phone: '', role: 'Member' },
      { name: '', email: '', phone: '', role: 'Member' },
    ],
  });

  const scrollViewRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...formData.members];
    newMembers[index][field] = value;
    setFormData(prev => ({ ...prev, members: newMembers }));
  };

  const addMember = () => {
    if (formData.members.length < 5) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, { name: '', email: '', phone: '', role: 'Member' }],
        teamSize: prev.members.length + 1,
      }));
    }
  };

  const removeMember = (index) => {
    if (formData.members.length > 3) {
      const newMembers = formData.members.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        members: newMembers,
        teamSize: newMembers.length,
      }));
    }
  };

  const nextStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  const prevStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  const handleSubmit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert(
      'Registration Submitted!',
      'Your team registration has been submitted successfully. We will contact you soon with further details.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[0, 1, 2, 3].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            currentStep >= step ? styles.stepActive : styles.stepInactive
          ]}>
            <Text style={[
              styles.stepNumber,
              currentStep >= step ? styles.stepNumberActive : styles.stepNumberInactive
            ]}>
              {step + 1}
            </Text>
          </View>
          {step < 3 && (
            <View style={[
              styles.stepLine,
              currentStep > step ? styles.stepLineActive : styles.stepLineInactive
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderTeamInfo = () => (
    <Animated.View style={[styles.stepContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.stepTitle}>Team Information</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Team Name *</Text>
        <TextInput
          style={styles.textInput}
          value={formData.teamName}
          onChangeText={(value) => handleInputChange('teamName', value)}
          placeholder="Enter your team name"
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Team Size</Text>
        <View style={styles.teamSizeContainer}>
          {[3, 4, 5].map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                formData.teamSize === size && styles.sizeButtonActive
              ]}
              onPress={() => handleInputChange('teamSize', size)}
            >
              <Text style={[
                styles.sizeButtonText,
                formData.teamSize === size && styles.sizeButtonTextActive
              ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Domain *</Text>
        <TextInput
          style={styles.textInput}
          value={formData.domain}
          onChangeText={(value) => handleInputChange('domain', value)}
          placeholder="e.g., Education, Health, Agriculture, Finance"
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>
    </Animated.View>
  );

  const renderProjectInfo = () => (
    <Animated.View style={[styles.stepContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.stepTitle}>Project Details</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Problem Statement *</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          value={formData.problemStatement}
          onChangeText={(value) => handleInputChange('problemStatement', value)}
          placeholder="Describe the real-world problem you want to solve..."
          placeholderTextColor={COLORS.textSecondary}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Approach *</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          value={formData.approach}
          onChangeText={(value) => handleInputChange('approach', value)}
          placeholder="Explain your approach to solving the problem..."
          placeholderTextColor={COLORS.textSecondary}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Solution *</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          value={formData.solution}
          onChangeText={(value) => handleInputChange('solution', value)}
          placeholder="Describe your proposed solution..."
          placeholderTextColor={COLORS.textSecondary}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Technology Stack *</Text>
        <TextInput
          style={styles.textInput}
          value={formData.technologyStack}
          onChangeText={(value) => handleInputChange('technologyStack', value)}
          placeholder="e.g., React Native, Python, AWS, etc."
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>
    </Animated.View>
  );

  const renderTeamMembers = () => (
    <Animated.View style={[styles.stepContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.membersHeader}>
        <Text style={styles.stepTitle}>Team Members</Text>
        {formData.members.length < 5 && (
          <TouchableOpacity style={styles.addMemberButton} onPress={addMember}>
            <Ionicons name="add" size={20} color={COLORS.text} />
            <Text style={styles.addMemberText}>Add Member</Text>
          </TouchableOpacity>
        )}
      </View>

      {formData.members.map((member, index) => (
        <View key={index} style={styles.memberCard}>
          <View style={styles.memberHeader}>
            <Text style={styles.memberTitle}>Member {index + 1}</Text>
            {formData.members.length > 3 && index > 0 && (
              <TouchableOpacity onPress={() => removeMember(index)}>
                <Ionicons name="close-circle" size={24} color={COLORS.error} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.inputLabel}>Name *</Text>
              <TextInput
                style={styles.textInput}
                value={member.name}
                onChangeText={(value) => handleMemberChange(index, 'name', value)}
                placeholder="Full name"
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Role</Text>
              <TextInput
                style={styles.textInput}
                value={member.role}
                onChangeText={(value) => handleMemberChange(index, 'role', value)}
                placeholder="Role in team"
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput
                style={styles.textInput}
                value={member.email}
                onChangeText={(value) => handleMemberChange(index, 'email', value)}
                placeholder="Email address"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Phone *</Text>
              <TextInput
                style={styles.textInput}
                value={member.phone}
                onChangeText={(value) => handleMemberChange(index, 'phone', value)}
                placeholder="Phone number"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>
      ))}
    </Animated.View>
  );

  const renderReview = () => (
    <Animated.View style={[styles.stepContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.stepTitle}>Review & Submit</Text>
      
      <View style={styles.reviewCard}>
        <BlurView intensity={20} style={styles.reviewBlur}>
          <Text style={styles.reviewSectionTitle}>Team Information</Text>
          <Text style={styles.reviewText}>Team Name: {formData.teamName}</Text>
          <Text style={styles.reviewText}>Team Size: {formData.teamSize} members</Text>
          <Text style={styles.reviewText}>Domain: {formData.domain}</Text>
          
          <Text style={styles.reviewSectionTitle}>Project Details</Text>
          <Text style={styles.reviewText}>Problem: {formData.problemStatement}</Text>
          <Text style={styles.reviewText}>Technology: {formData.technologyStack}</Text>
          
          <Text style={styles.reviewSectionTitle}>Team Members</Text>
          {formData.members.map((member, index) => (
            <Text key={index} style={styles.reviewText}>
              {index + 1}. {member.name} ({member.role}) - {member.email}
            </Text>
          ))}
        </BlurView>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.submitGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.submitButtonText}>Submit Registration</Text>
          <Ionicons name="checkmark-circle" size={24} color={COLORS.text} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderTeamInfo();
      case 1:
        return renderProjectInfo();
      case 2:
        return renderTeamMembers();
      case 3:
        return renderReview();
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Team Registration</Text>
          <Text style={styles.headerSubtitle}>Piston Cup 2025</Text>
        </LinearGradient>

        {renderStepIndicator()}

        <View style={styles.content}>
          {renderStepContent()}

          <View style={styles.navigationButtons}>
            {currentStep > 0 && (
              <TouchableOpacity style={styles.navButton} onPress={prevStep}>
                <Ionicons name="arrow-back" size={20} color={COLORS.text} />
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
            )}
            
            {currentStep < 3 && (
              <TouchableOpacity style={styles.navButton} onPress={nextStep}>
                <Text style={styles.navButtonText}>Next</Text>
                <Ionicons name="arrow-forward" size={20} color={COLORS.text} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 5,
    opacity: 0.9,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepActive: {
    backgroundColor: COLORS.primary,
  },
  stepInactive: {
    backgroundColor: COLORS.surface,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepNumberActive: {
    color: COLORS.text,
  },
  stepNumberInactive: {
    color: COLORS.textSecondary,
  },
  stepLine: {
    width: 40,
    height: 2,
    marginHorizontal: 10,
  },
  stepLineActive: {
    backgroundColor: COLORS.primary,
  },
  stepLineInactive: {
    backgroundColor: COLORS.surface,
  },
  content: {
    padding: 20,
  },
  stepContent: {
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  teamSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sizeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sizeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  sizeButtonTextActive: {
    color: COLORS.text,
  },
  membersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addMemberButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addMemberText: {
    color: COLORS.text,
    fontWeight: '600',
    marginLeft: 5,
  },
  memberCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  memberTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  reviewCard: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  reviewBlur: {
    padding: 20,
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  reviewSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 15,
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 5,
    lineHeight: 20,
  },
  submitButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  submitButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  navButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 5,
  },
});

export default RegistrationScreen; 