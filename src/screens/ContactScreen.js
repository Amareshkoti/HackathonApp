import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { contactService } from '../services/contactService';

const ContactScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactPress = (type, value) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    switch (type) {
      case 'phone':
        Linking.openURL(`tel:${value}`);
        break;
      case 'whatsapp':
        Linking.openURL(`https://wa.me/9515858968`);
        break;
      case 'email':
        Linking.openURL(`mailto:${value}`);
        break;
      case 'location':
        Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(value)}`);
        break;
      case 'website':
        Linking.openURL(value);
        break;
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Submit to Supabase
      const result = await contactService.submitContact(formData);

      if (result.success) {
        // Create WhatsApp message with form data
        const whatsappMessage = `Hello! I'm interested in Piston Cup 2025.

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message: ${formData.message}

Please get back to me soon!`;

        const whatsappUrl = `https://wa.me/919515858968?text=${encodeURIComponent(whatsappMessage)}`;

        // Open WhatsApp with the message
        Linking.openURL(whatsappUrl).catch(() => {
          Alert.alert('Error', 'Could not open WhatsApp. Please make sure WhatsApp is installed.');
        });

        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        Alert.alert(
          'Submission Failed',
          `Error: ${result.error}. Please try again.`,
          [{ text: 'OK', style: 'default' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Submission Failed',
        'An unexpected error occurred. Please check your internet connection and try again.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLinkPress = (screen) => {
    navigation.navigate(screen);
  };

  const ContactCard = ({ icon, title, value, type, color }) => (
    <TouchableOpacity 
      style={styles.contactCard}
      onPress={() => handleContactPress(type, value)}
    >
      <BlurView intensity={20} style={styles.contactBlur}>
        <LinearGradient
          colors={[color, `${color}80`]}
          style={styles.contactGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.contactIcon}>
            <Ionicons name={icon} size={24} color={COLORS.text} />
          </View>
          <Text style={styles.contactTitle}>{title}</Text>
          <Text style={styles.contactValue}>{value}</Text>
        </LinearGradient>
      </BlurView>
    </TouchableOpacity>
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
            <Ionicons name="call" size={40} color={COLORS.text} />
            <Text style={styles.headerTitle}>Contact Us</Text>
            <Text style={styles.headerSubtitle}>
              Get in touch with the Piston Cup team
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <View style={styles.content}>
        {/* Contact Information */}
        <Animated.View 
          style={[
            styles.contactSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Get In Touch</Text>
          
          <View style={styles.contactGrid}>
            <ContactCard
              icon="call"
              title="Phone"
              value="+91 95158 58968"
              type="phone"
              color={COLORS.success}
            />
            <ContactCard
              icon="logo-whatsapp"
              title="WhatsApp"
              value="+91 95158 58968"
              type="whatsapp"
              color={COLORS.success}
            />
            <ContactCard
              icon="mail"
              title="Email"
              value="pistoncup@viit.ac.in"
              type="email"
              color={COLORS.accent}
            />
            <ContactCard
              icon="location"
              title="Venue"
              value="VIIT, Duvvada"
              type="location"
              color={COLORS.primary}
            />
          </View>
        </Animated.View>

        {/* Venue Information */}
        <Animated.View 
          style={[
            styles.venueSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Venue Details</Text>
          <View style={styles.venueCard}>
            <BlurView intensity={20} style={styles.venueBlur}>
              <LinearGradient
                colors={[COLORS.surface, COLORS.background]}
                style={styles.venueGradient}
              >
                <View style={styles.venueHeader}>
                  <Ionicons name="business" size={30} color={COLORS.primary} />
                  <Text style={styles.venueTitle}>Vignan's Institute of Information Technology</Text>
                </View>
                <Text style={styles.venueAddress}>
                  Duvvada, Visakhapatnam, Andhra Pradesh 530049
                </Text>
                
                <View style={styles.venueFeatures}>
                  <View style={styles.venueFeature}>
                    <Ionicons name="wifi" size={16} color={COLORS.success} />
                    <Text style={styles.venueFeatureText}>Free WiFi</Text>
                  </View>
                  <View style={styles.venueFeature}>
                    <Ionicons name="restaurant" size={16} color={COLORS.secondary} />
                    <Text style={styles.venueFeatureText}>Food Provided</Text>
                  </View>
                  <View style={styles.venueFeature}>
                    <Ionicons name="bed" size={16} color={COLORS.accent} />
                    <Text style={styles.venueFeatureText}>Accommodation</Text>
                  </View>
                  <View style={styles.venueFeature}>
                    <Ionicons name="car" size={16} color={COLORS.warning} />
                    <Text style={styles.venueFeatureText}>Parking</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.directionsButton}
                  onPress={() => handleContactPress('location', 'Vignan Institute of Information Technology, Duvvada, Visakhapatnam')}
                >
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={styles.directionsGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.directionsText}>Get Directions</Text>
                    <Ionicons name="navigate" size={20} color={COLORS.text} />
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </BlurView>
          </View>
        </Animated.View>

        {/* Contact Form */}
        <Animated.View 
          style={[
            styles.formSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Send us a Message</Text>
          <View style={styles.formCard}>
            <BlurView intensity={20} style={styles.formBlur}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name *</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  placeholder="Your full name"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email *</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  placeholder="your.email@example.com"
                  placeholderTextColor={COLORS.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Subject *</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.subject}
                  onChangeText={(value) => handleInputChange('subject', value)}
                  placeholder="What's this about?"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Message *</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={formData.message}
                  onChangeText={(value) => handleInputChange('message', value)}
                  placeholder="Tell us more..."
                  placeholderTextColor={COLORS.textSecondary}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <LinearGradient
                  colors={[COLORS.primary, COLORS.secondary]}
                  style={styles.submitGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {isSubmitting ? (
                    <Text style={styles.submitButtonText}>Opening WhatsApp...</Text>
                  ) : (
                    <>
                      <Text style={styles.submitButtonText}>Send via WhatsApp</Text>
                      <Ionicons name="logo-whatsapp" size={20} color={COLORS.text} />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </BlurView>
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
              onPress={() => handleQuickLinkPress('Register')}
            >
              <BlurView intensity={20} style={styles.linkBlur}>
                <Ionicons name="person-add" size={24} color={COLORS.accent} />
                <Text style={styles.linkTitle}>Registration</Text>
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
              onPress={() => navigation.navigate('Home')}
            >
              <BlurView intensity={20} style={styles.linkBlur}>
                <Ionicons name="home" size={24} color={COLORS.success} />
                <Text style={styles.linkTitle}>Home</Text>
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.linkCard}
              onPress={() => handleQuickLinkPress('Register')}
            >
              <BlurView intensity={20} style={styles.linkBlur}>
                <Ionicons name="car-sport" size={24} color={COLORS.secondary} />
                <Text style={styles.linkTitle}>Join Now</Text>
              </BlurView>
            </TouchableOpacity>
          </View>

          {/* Developer Contact Icons */}
          <Animated.View 
            style={[
              styles.linksSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <Text style={styles.sectionTitle}>App Developer Contact</Text>
            <View style={styles.linksGrid}>
              <TouchableOpacity 
                style={styles.linkCard}
                onPress={() => Linking.openURL('mailto:amareshkoti2005@gmail.com')}
              >
                <BlurView intensity={20} style={styles.linkBlur}>
                  <Ionicons name="mail" size={32} color={COLORS.accent} />
                </BlurView>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.linkCard}
                onPress={() => Linking.openURL('https://www.linkedin.com/in/amaresh1411/')}
              >
                <BlurView intensity={20} style={styles.linkBlur}>
                  <Ionicons name="logo-linkedin" size={32} color={COLORS.primary} />
                </BlurView>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.linkCard}
                onPress={() => Linking.openURL('https://www.instagram.com/escaped_nigga_1865/')}
              >
                <BlurView intensity={20} style={styles.linkBlur}>
                  <Ionicons name="logo-instagram" size={32} color={COLORS.warning} />
                </BlurView>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.linkCard}
                onPress={() => Linking.openURL('https://wa.me/8179949657')}
              >
                <BlurView intensity={20} style={styles.linkBlur}>
                  <Ionicons name="logo-whatsapp" size={32} color={COLORS.success} />
                </BlurView>
              </TouchableOpacity>
            </View>
          </Animated.View>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  contactSection: {
    marginBottom: 30,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contactCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  contactBlur: {
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  contactGradient: {
    padding: 20,
    alignItems: 'center',
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  contactValue: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  venueSection: {
    marginBottom: 30,
  },
  venueCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  venueBlur: {
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  venueGradient: {
    padding: 25,
  },
  venueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  venueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 15,
    flex: 1,
  },
  venueAddress: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  venueFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  venueFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  venueFeatureText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 5,
  },
  directionsButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  directionsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
  directionsText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
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
  },
  submitButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 10,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  linksSection: {
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

export default ContactScreen; 