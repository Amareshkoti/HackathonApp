import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
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
            
            <TouchableOpacity style={styles.ctaButton}>
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
          <TouchableOpacity style={styles.secondaryCtaButton}>
            <Text style={styles.secondaryCtaText}>Learn More</Text>
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
    height: height * 0.7,
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