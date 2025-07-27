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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const RegistrationScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

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

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (index !== null) {
        newData[section][index][field] = value;
      } else if (section === 'teamLead') {
        newData.teamLead[field] = value;
      } else if (section === 'project') {
        newData.project[field] = value;
      } else {
        newData[section] = value;
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
    }
  };

  const removeMember = (index) => {
    if (formData.members.length > 2) {
      setFormData(prev => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index),
      }));
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.teamName.trim()) {
          Alert.alert('Error', 'Please enter team name');
          return false;
        }
        break;
      case 2:
        const { name, email, phone, college } = formData.teamLead;
        if (!name.trim() || !email.trim() || !phone.trim() || !college.trim()) {
          Alert.alert('Error', 'Please fill all team lead details');
          return false;
        }
        break;
      case 3:
        const validMembers = formData.members.filter(member => 
          member.name.trim() && member.email.trim() && member.phone.trim() && member.college.trim()
        );
        if (validMembers.length < 2) {
          Alert.alert('Error', 'Please fill details for at least 2 team members');
          return false;
        }
        break;
      case 4:
        const { title, domain, problem, solution, techStack } = formData.project;
        if (!title.trim() || !domain.trim() || !problem.trim() || !solution.trim() || !techStack.trim()) {
          Alert.alert('Error', 'Please fill all project details');
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      setIsSubmitting(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        Alert.alert(
          'Registration Successful!',
          'Your team has been registered for Piston Cup 2025. We will contact you soon with further details.',
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
        setCurrentStep(1);
      }, 2000);
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

  const InputField = ({ label, value, onChangeText, placeholder, keyboardType = 'default', multiline = false }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.textInput, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
              title="Team Info"
              isActive={currentStep === 1}
              isCompleted={currentStep > 1}
            />
            <StepIndicator
              step={2}
              title="Team Lead"
              isActive={currentStep === 2}
              isCompleted={currentStep > 2}
            />
            <StepIndicator
              step={3}
              title="Members"
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
                  value={formData.teamName}
                  onChangeText={(value) => handleInputChange('teamName', null, value)}
                  placeholder="Enter your team name"
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
                  value={formData.teamLead.name}
                  onChangeText={(value) => handleInputChange('teamLead', 'name', value)}
                  placeholder="Team lead's full name"
                />
                <InputField
                  label="Email *"
                  value={formData.teamLead.email}
                  onChangeText={(value) => handleInputChange('teamLead', 'email', value)}
                  placeholder="team.lead@email.com"
                  keyboardType="email-address"
                />
                <InputField
                  label="Phone *"
                  value={formData.teamLead.phone}
                  onChangeText={(value) => handleInputChange('teamLead', 'phone', value)}
                  placeholder="+91 98765 43210"
                  keyboardType="phone-pad"
                />
                <InputField
                  label="College/University *"
                  value={formData.teamLead.college}
                  onChangeText={(value) => handleInputChange('teamLead', 'college', value)}
                  placeholder="Your college or university name"
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
                      value={member.name}
                      onChangeText={(value) => handleInputChange('members', 'name', value, index)}
                      placeholder="Member's full name"
                    />
                    <InputField
                      label="Email *"
                      value={member.email}
                      onChangeText={(value) => handleInputChange('members', 'email', value, index)}
                      placeholder="member@email.com"
                      keyboardType="email-address"
                    />
                    <InputField
                      label="Phone *"
                      value={member.phone}
                      onChangeText={(value) => handleInputChange('members', 'phone', value, index)}
                      placeholder="+91 98765 43210"
                      keyboardType="phone-pad"
                    />
                    <InputField
                      label="College/University *"
                      value={member.college}
                      onChangeText={(value) => handleInputChange('members', 'college', value, index)}
                      placeholder="College or university name"
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
                  value={formData.project.title}
                  onChangeText={(value) => handleInputChange('project', 'title', value)}
                  placeholder="Your project title"
                />
                <InputField
                  label="Domain *"
                  value={formData.project.domain}
                  onChangeText={(value) => handleInputChange('project', 'domain', value)}
                  placeholder="Education, Health, Agriculture, etc."
                />
                <InputField
                  label="Problem Statement *"
                  value={formData.project.problem}
                  onChangeText={(value) => handleInputChange('project', 'problem', value)}
                  placeholder="Describe the real-world problem you're solving"
                  multiline={true}
                />
                <InputField
                  label="Proposed Solution *"
                  value={formData.project.solution}
                  onChangeText={(value) => handleInputChange('project', 'solution', value)}
                  placeholder="Explain your approach to solve the problem"
                  multiline={true}
                />
                <InputField
                  label="Technology Stack *"
                  value={formData.project.techStack}
                  onChangeText={(value) => handleInputChange('project', 'techStack', value)}
                  placeholder="Technologies, frameworks, tools you'll use"
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    alignItems: 'center',
  },
  stepIndicator: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepCircleActive: {
    backgroundColor: COLORS.primary,
  },
  stepCircleCompleted: {
    backgroundColor: COLORS.success,
  },
  stepNumber: {
    fontSize: 16,
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