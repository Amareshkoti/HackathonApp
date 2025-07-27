import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { teamService } from '../services/teamService';

const RegistrationScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    teamLead: {
      name: '',
      email: '',
      phone: '',
      college: '',
    },
    members: [
      { name: '', email: '', phone: '', college: '' },
      { name: '', email: '', phone: '', college: '' },
    ],
    project: {
      title: '',
      domain: '',
      problem: '',
      solution: '',
      techStack: '',
    },
  });

  // Stateless variables for input values
  const inputRefs = useRef({
    teamName: '',
    teamLead: { name: '', email: '', phone: '', college: '' },
    members: [
      { name: '', email: '', phone: '', college: '' },
      { name: '', email: '', phone: '', college: '' },
    ],
    project: { title: '', domain: '', problem: '', solution: '', techStack: '' },
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const scrollViewRef = useRef(null);

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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Initialize input refs with current form data
  React.useEffect(() => {
    inputRefs.current = {
      teamName: formData.teamName,
      teamLead: { ...formData.teamLead },
      members: formData.members.map(member => ({ ...member })),
      project: { ...formData.project },
    };
  }, [formData]);

  const handleInputChange = (section, field, value, index = null) => {
    // Update stateless variable immediately
    if (index !== null) {
      inputRefs.current[section][index][field] = value;
    } else if (section === 'teamLead') {
      inputRefs.current.teamLead[field] = value;
    } else if (section === 'project') {
      inputRefs.current.project[field] = value;
    } else {
      inputRefs.current[section] = value;
    }
  };

  const handleInputEndEditing = (section, field, index = null) => {
    // Update state only when user finishes editing
    setFormData(prev => {
      const newData = { ...prev };
      if (index !== null) {
        newData[section][index][field] = inputRefs.current[section][index][field];
      } else if (section === 'teamLead') {
        newData.teamLead[field] = inputRefs.current.teamLead[field];
      } else if (section === 'project') {
        newData.project[field] = inputRefs.current.project[field];
      } else {
        newData[section] = inputRefs.current[section];
      }
      return newData;
    });
  };

  const addMember = () => {
    if (formData.members.length < 4) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, { name: '', email: '', phone: '', college: '' }],
      }));
      // Add to stateless variable as well
      inputRefs.current.members.push({ name: '', email: '', phone: '', college: '' });
    }
  };

  const removeMember = (index) => {
    if (formData.members.length > 2) {
      setFormData(prev => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index),
      }));
      // Remove from stateless variable as well
      inputRefs.current.members.splice(index, 1);
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCurrentStep(prev => Math.min(prev + 1, 4));
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  const prevStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentStep(prev => Math.max(prev - 1, 1));
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!inputRefs.current.teamName.trim()) {
          Alert.alert('Error', 'Please enter team name');
          return false;
        }
        break;
      case 2:
        const { name, email, phone, college } = inputRefs.current.teamLead;
        if (!name.trim() || !email.trim() || !phone.trim() || !college.trim()) {
          Alert.alert('Error', 'Please fill all team lead details');
          return false;
        }
        break;
      case 3:
        const validMembers = inputRefs.current.members.filter(member => 
          member.name.trim() && member.email.trim() && member.phone.trim() && member.college.trim()
        );
        if (validMembers.length < 2) {
          Alert.alert('Error', 'Please fill details for at least 2 team members (minimum team size: 3 total including team lead)');
          return false;
        }
        break;
      case 4:
        const { title, domain, problem, solution, techStack } = inputRefs.current.project;
        if (!title.trim() || !domain.trim() || !problem.trim() || !solution.trim() || !techStack.trim()) {
          Alert.alert('Error', 'Please fill all project details');
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      setIsSubmitting(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      try {
        // Prepare data for Supabase
        const teamData = {
          teamName: inputRefs.current.teamName,
          teamLead: inputRefs.current.teamLead,
          members: inputRefs.current.members,
          project: inputRefs.current.project,
        };

        const result = await teamService.registerTeam(teamData);

        if (result.success) {
          Alert.alert(
            'Registration Successful!',
            `Your team has been registered for Piston Cup 2025. Team ID: ${result.teamId}. We will contact you soon with further details.`,
            [{ text: 'OK', style: 'default' }]
          );
          
          // Reset form
          setFormData({
            teamName: '',
            teamLead: { name: '', email: '', phone: '', college: '' },
            members: [
              { name: '', email: '', phone: '', college: '' },
              { name: '', email: '', phone: '', college: '' },
            ],
            project: { title: '', domain: '', problem: '', solution: '', techStack: '' },
          });
          // Reset stateless variables
          inputRefs.current = {
            teamName: '',
            teamLead: { name: '', email: '', phone: '', college: '' },
            members: [
              { name: '', email: '', phone: '', college: '' },
              { name: '', email: '', phone: '', college: '' },
            ],
            project: { title: '', domain: '', problem: '', solution: '', techStack: '' },
          };
          setCurrentStep(1);
        } else {
          Alert.alert(
            'Registration Failed',
            `Error: ${result.error}. Please try again.`,
            [{ text: 'OK', style: 'default' }]
          );
        }
      } catch (error) {
        Alert.alert(
          'Registration Failed',
          'An unexpected error occurred. Please check your internet connection and try again.',
          [{ text: 'OK', style: 'default' }]
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleQuickLinkPress = (screen) => {
    navigation.navigate(screen);
  };

  const StepIndicator = ({ step, title, isActive, isCompleted }) => (
    <View style={styles.stepIndicator}>
      <View style={[
        styles.stepCircle,
        isActive && styles.stepCircleActive,
        isCompleted && styles.stepCircleCompleted
      ]}>
        {isCompleted ? (
          <Ionicons name="checkmark" size={20} color={COLORS.text} />
        ) : (
          <Text style={[
            styles.stepNumber,
            isActive && styles.stepNumberActive
          ]}>{step}</Text>
        )}
      </View>
      <Text style={[
        styles.stepTitle,
        isActive && styles.stepTitleActive
      ]}>{title}</Text>
    </View>
  );

  const InputField = ({ 
    label, 
    defaultValue, 
    placeholder, 
    keyboardType = 'default', 
    multiline = false, 
    returnKeyType = 'next', 
    onSubmitEditing = null, 
    blurOnSubmit = true,
    onEndEditing = null,
    section,
    field,
    index = null
  }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.textInput, multiline && styles.textArea]}
        defaultValue={defaultValue}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
        autoCorrect={false}
        spellCheck={false}
        onChangeText={(text) => handleInputChange(section, field, text, index)}
        onEndEditing={(e) => {
          handleInputEndEditing(section, field, index);
          if (onEndEditing) onEndEditing(e);
        }}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        removeClippedSubviews={false}
      >
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <Ionicons name="person-add" size={40} color={COLORS.text} />
              <Text style={styles.headerTitle}>Team Registration</Text>
              <Text style={styles.headerSubtitle}>
                Join Piston Cup 2025 - Register your team now
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        <View style={styles.content}>
          {/* Step Indicators */}
          <Animated.View 
            style={[
              styles.stepsSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <View style={styles.stepsContainer}>
              <StepIndicator
                step={1}
                title="Info"
                isActive={currentStep === 1}
                isCompleted={currentStep > 1}
              />
              <StepIndicator
                step={2}
                title="Lead"
                isActive={currentStep === 2}
                isCompleted={currentStep > 2}
              />
              <StepIndicator
                step={3}
                title="Team"
                isActive={currentStep === 3}
                isCompleted={currentStep > 3}
              />
              <StepIndicator
                step={4}
                title="Project"
                isActive={currentStep === 4}
                isCompleted={false}
              />
            </View>
          </Animated.View>

          {/* Form Content */}
          <Animated.View 
            style={[
              styles.formSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            {currentStep === 1 && (
              <View style={styles.formCard}>
                <BlurView intensity={20} style={styles.formBlur}>
                  <Text style={styles.stepTitle}>Step 1: Team Information</Text>
                  <InputField
                    label="Team Name *"
                    defaultValue={formData.teamName}
                    placeholder="Enter your team name"
                    returnKeyType="done"
                    onSubmitEditing={() => Keyboard.dismiss()}
                    section="teamName"
                    field=""
                  />
                </BlurView>
              </View>
            )}

            {currentStep === 2 && (
              <View style={styles.formCard}>
                <BlurView intensity={20} style={styles.formBlur}>
                  <Text style={styles.stepTitle}>Step 2: Team Lead Details</Text>
                  <InputField
                    label="Full Name *"
                    defaultValue={formData.teamLead.name}
                    placeholder="Team lead's full name"
                    section="teamLead"
                    field="name"
                  />
                  <InputField
                    label="Email *"
                    defaultValue={formData.teamLead.email}
                    placeholder="team.lead@email.com"
                    keyboardType="email-address"
                    section="teamLead"
                    field="email"
                  />
                  <InputField
                    label="Phone *"
                    defaultValue={formData.teamLead.phone}
                    placeholder="+91 98765 43210"
                    keyboardType="phone-pad"
                    section="teamLead"
                    field="phone"
                  />
                  <InputField
                    label="College/University *"
                    defaultValue={formData.teamLead.college}
                    placeholder="Your college or university name"
                    returnKeyType="done"
                    onSubmitEditing={() => Keyboard.dismiss()}
                    section="teamLead"
                    field="college"
                  />
                </BlurView>
              </View>
            )}

            {currentStep === 3 && (
              <View style={styles.formCard}>
                <BlurView intensity={20} style={styles.formBlur}>
                  <View style={styles.stepHeader}>
                    <Text style={styles.stepTitle}>Step 3: Team Members</Text>
                    <TouchableOpacity style={styles.addButton} onPress={addMember}>
                      <Ionicons name="add" size={20} color={COLORS.text} />
                    </TouchableOpacity>
                  </View>
                  
                  {formData.members.map((member, index) => (
                    <View key={index} style={styles.memberSection}>
                      <View style={styles.memberHeader}>
                        <Text style={styles.memberTitle}>Member {index + 1}</Text>
                        {formData.members.length > 2 && (
                          <TouchableOpacity 
                            style={styles.removeButton}
                            onPress={() => removeMember(index)}
                          >
                            <Ionicons name="close" size={16} color={COLORS.error} />
                          </TouchableOpacity>
                        )}
                      </View>
                      <InputField
                        label="Full Name *"
                        defaultValue={member.name}
                        placeholder="Member's full name"
                        section="members"
                        field="name"
                        index={index}
                      />
                      <InputField
                        label="Email *"
                        defaultValue={member.email}
                        placeholder="member@email.com"
                        keyboardType="email-address"
                        section="members"
                        field="email"
                        index={index}
                      />
                      <InputField
                        label="Phone *"
                        defaultValue={member.phone}
                        placeholder="+91 98765 43210"
                        keyboardType="phone-pad"
                        section="members"
                        field="phone"
                        index={index}
                      />
                      <InputField
                        label="College/University *"
                        defaultValue={member.college}
                        placeholder="College or university name"
                        returnKeyType={index === formData.members.length - 1 ? "done" : "next"}
                        onSubmitEditing={index === formData.members.length - 1 ? () => Keyboard.dismiss() : null}
                        section="members"
                        field="college"
                        index={index}
                      />
                    </View>
                  ))}
                </BlurView>
              </View>
            )}

            {currentStep === 4 && (
              <View style={styles.formCard}>
                <BlurView intensity={20} style={styles.formBlur}>
                  <Text style={styles.stepTitle}>Step 4: Project Details</Text>
                  <InputField
                    label="Project Title *"
                    defaultValue={formData.project.title}
                    placeholder="Your project title"
                    section="project"
                    field="title"
                  />
                  <InputField
                    label="Domain *"
                    defaultValue={formData.project.domain}
                    placeholder="Education, Health, Agriculture, etc."
                    section="project"
                    field="domain"
                  />
                  <InputField
                    label="Problem Statement *"
                    defaultValue={formData.project.problem}
                    placeholder="Describe the real-world problem you're solving"
                    multiline={true}
                    blurOnSubmit={false}
                    section="project"
                    field="problem"
                  />
                  <InputField
                    label="Proposed Solution *"
                    defaultValue={formData.project.solution}
                    placeholder="Explain your approach to solve the problem"
                    multiline={true}
                    blurOnSubmit={false}
                    section="project"
                    field="solution"
                  />
                  <InputField
                    label="Technology Stack *"
                    defaultValue={formData.project.techStack}
                    placeholder="Technologies, frameworks, tools you'll use"
                    returnKeyType="done"
                    onSubmitEditing={() => Keyboard.dismiss()}
                    section="project"
                    field="techStack"
                  />
                </BlurView>
              </View>
            )}

            {/* Navigation Buttons */}
            <View style={styles.navigationButtons}>
              {currentStep > 1 && (
                <TouchableOpacity style={styles.prevButton} onPress={prevStep}>
                  <LinearGradient
                    colors={[COLORS.surface, COLORS.background]}
                    style={styles.prevButtonGradient}
                  >
                    <Ionicons name="arrow-back" size={20} color={COLORS.text} />
                    <Text style={styles.prevButtonText}>Previous</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              
              {currentStep < 4 ? (
                <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={styles.nextButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.nextButtonText}>Next</Text>
                    <Ionicons name="arrow-forward" size={20} color={COLORS.text} />
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <LinearGradient
                    colors={[COLORS.success, COLORS.accent]}
                    style={styles.submitButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.submitButtonText}>Submit Registration</Text>
                    <Ionicons name="checkmark" size={20} color={COLORS.text} />
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>

          {/* Quick Links */}
          <Animated.View 
            style={[
              styles.linksSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <Text style={styles.sectionTitle}>Quick Links</Text>
            <View style={styles.linksGrid}>
              <TouchableOpacity 
                style={styles.linkCard}
                onPress={() => navigation.navigate('Home')}
              >
                <BlurView intensity={20} style={styles.linkBlur}>
                  <Ionicons name="home" size={24} color={COLORS.success} />
                  <Text style={styles.linkTitle}>Home</Text>
                </BlurView>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.linkCard}
                onPress={() => handleQuickLinkPress('Prizes')}
              >
                <BlurView intensity={20} style={styles.linkBlur}>
                  <Ionicons name="trophy" size={24} color={COLORS.primary} />
                  <Text style={styles.linkTitle}>Prizes</Text>
                </BlurView>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.linkCard}
                onPress={() => handleQuickLinkPress('Contact')}
              >
                <BlurView intensity={20} style={styles.linkBlur}>
                  <Ionicons name="call" size={24} color={COLORS.accent} />
                  <Text style={styles.linkTitle}>Contact</Text>
                </BlurView>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.linkCard}
                onPress={() => handleQuickLinkPress('Contact')}
              >
                <BlurView intensity={20} style={styles.linkBlur}>
                  <Ionicons name="help-circle" size={24} color={COLORS.secondary} />
                  <Text style={styles.linkTitle}>Help</Text>
                </BlurView>
              </TouchableOpacity>
            </View>
          </Animated.View>
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
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 200,
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 5,
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  stepsSection: {
    marginBottom: 30,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  stepIndicator: {
    alignItems: 'center',
    flex: 1,
    maxWidth: 80,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  stepCircleActive: {
    backgroundColor: COLORS.primary,
  },
  stepCircleCompleted: {
    backgroundColor: COLORS.success,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  stepNumberActive: {
    color: COLORS.text,
  },
  stepTitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },
  stepTitleActive: {
    color: COLORS.text,
    fontWeight: 'bold',
  },

  formSection: {
    marginBottom: 30,
  },
  formCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  formBlur: {
    padding: 25,
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  stepTitle: {
    fontSize: 20,
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
    minHeight: 50,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberSection: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
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
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  prevButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
  prevButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  prevButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  nextButton: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  nextButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  submitButton: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  submitButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  linksSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  linksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  linkCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  linkBlur: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  linkTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 10,
  },
});

export default RegistrationScreen; 