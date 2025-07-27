import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Countdown timer
    const targetDate = new Date('2025-09-03T10:00:00');
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const CountdownCard = ({ value, label }) => (
    <View style={styles.countdownCard}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.countdownGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.countdownValue}>{value.toString().padStart(2, '0')}</Text>
        <Text style={styles.countdownLabel}>{label}</Text>
      </LinearGradient>
    </View>
  );

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleQuickLinkPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <LinearGradient
          colors={[COLORS.background, COLORS.surface]}
          style={styles.heroGradient}
        >
          <View style={styles.heroContent}>
            <View style={styles.logoContainer}>
              <Ionicons name="car-sport" size={60} color={COLORS.primary} />
            </View>
            <Text style={styles.heroTitle}>PISTON CUP</Text>
            <Text style={styles.heroSubtitle}>2025</Text>
            <Text style={styles.heroDescription}>
              24-Hour Nationwide Hackathon on Real World Problems
            </Text>
            <Text style={styles.heroDate}>September 3rd - 4th, 2025</Text>
            
            <TouchableOpacity style={styles.ctaButton} onPress={handleRegisterPress}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.ctaGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.ctaText}>REGISTER NOW</Text>
                <Ionicons name="arrow-forward" size={20} color={COLORS.text} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Countdown Section */}
      <View style={styles.countdownSection}>
        <Text style={styles.sectionTitle}>Countdown to Piston Cup</Text>
        <View style={styles.countdownContainer}>
          <CountdownCard value={timeLeft.days} label="DAYS" />
          <CountdownCard value={timeLeft.hours} label="HOURS" />
          <CountdownCard value={timeLeft.minutes} label="MINUTES" />
          <CountdownCard value={timeLeft.seconds} label="SECONDS" />
        </View>
      </View>

      {/* Quick Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Event Highlights</Text>
        
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <View style={styles.infoBlur}>
              <Ionicons name="people" size={30} color={COLORS.accent} />
              <Text style={styles.infoTitle}>Team Size</Text>
              <Text style={styles.infoText}>3-5 Members</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoBlur}>
              <Ionicons name="time" size={30} color={COLORS.secondary} />
              <Text style={styles.infoTitle}>Duration</Text>
              <Text style={styles.infoText}>24 Hours</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoBlur}>
              <Ionicons name="trophy" size={30} color={COLORS.primary} />
              <Text style={styles.infoTitle}>Prize Pool</Text>
              <Text style={styles.infoText}>₹30,000+</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoBlur}>
              <Ionicons name="location" size={30} color={COLORS.success} />
              <Text style={styles.infoTitle}>Venue</Text>
              <Text style={styles.infoText}>VIIT, Duvvada</Text>
            </View>
          </View>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About Piston Cup</Text>
        <View style={styles.aboutCard}>
          <View style={styles.aboutContent}>
            <Text style={styles.aboutText}>
              Piston Cup 2025 is a prestigious 24-hour hackathon that brings together the brightest minds 
              to solve real-world problems. Teams of 3-5 members will compete across three challenging rounds, 
              from ideation to final implementation.
            </Text>
            
            <View style={styles.roundsContainer}>
              <View style={styles.roundItem}>
                <View style={styles.roundIcon}>
                  <Ionicons name="bulb" size={20} color={COLORS.accent} />
                </View>
                <View style={styles.roundContent}>
                  <Text style={styles.roundTitle}>Round 1: Ideation</Text>
                  <Text style={styles.roundText}>Submit innovative ideas by August 2nd</Text>
                </View>
              </View>

              <View style={styles.roundItem}>
                <View style={styles.roundIcon}>
                  <Ionicons name="construct" size={20} color={COLORS.secondary} />
                </View>
                <View style={styles.roundContent}>
                  <Text style={styles.roundTitle}>Round 2: Prototype</Text>
                  <Text style={styles.roundText}>Create and present prototypes</Text>
                </View>
              </View>

              <View style={styles.roundItem}>
                <View style={styles.roundIcon}>
                  <Ionicons name="trophy" size={20} color={COLORS.primary} />
                </View>
                <View style={styles.roundContent}>
                  <Text style={styles.roundTitle}>Round 3: Final</Text>
                  <Text style={styles.roundText}>24-hour hackathon at VIIT, Duvvada</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Schedule Section */}
      <View style={styles.scheduleSection}>
        <Text style={styles.sectionTitle}>Event Schedule</Text>
        <View style={styles.scheduleCard}>
          <View style={styles.scheduleContent}>
            <View style={styles.scheduleItem}>
              <View style={styles.scheduleDate}>
                <Text style={styles.dateText}>AUG 2</Text>
              </View>
              <View style={styles.scheduleDetails}>
                <Text style={styles.scheduleTitle}>Round 1 Deadline</Text>
                <Text style={styles.scheduleText}>Last day to submit team registrations</Text>
              </View>
            </View>

            <View style={styles.scheduleItem}>
              <View style={styles.scheduleDate}>
                <Text style={styles.dateText}>AUG 4</Text>
              </View>
              <View style={styles.scheduleDetails}>
                <Text style={styles.scheduleTitle}>Results Announcement</Text>
                <Text style={styles.scheduleText}>Selected teams for Round 2 notified</Text>
              </View>
            </View>

            <View style={styles.scheduleItem}>
              <View style={styles.scheduleDate}>
                <Text style={styles.dateText}>SEP 3-4</Text>
              </View>
              <View style={styles.scheduleDetails}>
                <Text style={styles.scheduleTitle}>Final Hackathon</Text>
                <Text style={styles.scheduleText}>24-hour coding marathon at VIIT</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Links Section */}
      <View style={styles.linksSection}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.linksGrid}>
          <TouchableOpacity 
            style={styles.linkCard}
            onPress={() => handleQuickLinkPress('Register')}
          >
            <View style={styles.linkBlur}>
              <Ionicons name="person-add" size={24} color={COLORS.accent} />
              <Text style={styles.linkTitle}>Registration</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkCard}
            onPress={() => handleQuickLinkPress('Prizes')}
          >
            <View style={styles.linkBlur}>
              <Ionicons name="trophy" size={24} color={COLORS.primary} />
              <Text style={styles.linkTitle}>Prizes</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkCard}
            onPress={() => handleQuickLinkPress('Contact')}
          >
            <View style={styles.linkBlur}>
              <Ionicons name="call" size={24} color={COLORS.success} />
              <Text style={styles.linkTitle}>Contact</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkCard}
            onPress={handleRegisterPress}
          >
            <View style={styles.linkBlur}>
              <Ionicons name="car-sport" size={24} color={COLORS.secondary} />
              <Text style={styles.linkTitle}>Join Now</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Call to Action */}
      <View style={styles.ctaSection}>
        <LinearGradient
          colors={[COLORS.surface, COLORS.background]}
          style={styles.ctaSectionGradient}
        >
          <Text style={styles.ctaSectionTitle}>Ready to Race?</Text>
          <Text style={styles.ctaSectionText}>
            Join the ultimate hackathon experience and solve real-world problems
          </Text>
          <TouchableOpacity style={styles.secondaryCtaButton} onPress={handleRegisterPress}>
            <Text style={styles.secondaryCtaText}>Register Team</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heroSection: {
    height: height * 0.6,
    justifyContent: 'center',
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: COLORS.text,
    letterSpacing: 4,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 24,
    fontWeight: '300',
    color: COLORS.primary,
    marginTop: 5,
  },
  heroDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
  },
  heroDate: {
    fontSize: 18,
    color: COLORS.secondary,
    fontWeight: '600',
    marginTop: 10,
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 25,
    overflow: 'hidden',
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  ctaText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  countdownSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  countdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  countdownCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  countdownGradient: {
    padding: 15,
    alignItems: 'center',
  },
  countdownValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  countdownLabel: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 5,
  },
  infoSection: {
    padding: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  infoBlur: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  aboutSection: {
    padding: 20,
  },
  aboutCard: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  aboutContent: {
    padding: 20,
  },
  aboutText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  roundsContainer: {
    marginTop: 15,
  },
  roundItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  roundIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(52, 152, 219, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  roundContent: {
    flex: 1,
  },
  roundTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  roundText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  scheduleSection: {
    padding: 20,
  },
  scheduleCard: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  scheduleContent: {
    padding: 20,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  scheduleDate: {
    width: 80,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scheduleDetails: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  scheduleText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  linksSection: {
    padding: 20,
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
  ctaSection: {
    padding: 20,
    marginBottom: 20,
  },
  ctaSectionGradient: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  ctaSectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  ctaSectionText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  secondaryCtaButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  secondaryCtaText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 