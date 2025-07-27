import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const AboutScreen = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [animations] = useState({
    fadeAnim: new Animated.Value(0),
    slideAnim: new Animated.Value(30),
  });

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(animations.fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(animations.slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSectionPress = (section) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpandedSection(expandedSection === section ? null : section);
  };

  const InfoCard = ({ title, description, icon, color, onPress, isExpanded }) => (
    <TouchableOpacity style={styles.infoCard} onPress={onPress}>
      <BlurView intensity={20} style={styles.cardBlur}>
        <LinearGradient
          colors={[color, `${color}80`]}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
              <Ionicons name={icon} size={24} color={color} />
            </View>
            <Text style={styles.cardTitle}>{title}</Text>
            <Ionicons 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color={COLORS.text} 
            />
          </View>
          {isExpanded && (
            <Animated.View 
              style={[
                styles.cardContent,
                {
                  opacity: animations.fadeAnim,
                  transform: [{ translateY: animations.slideAnim }],
                }
              ]}
            >
              <Text style={styles.cardDescription}>{description}</Text>
            </Animated.View>
          )}
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
            opacity: animations.fadeAnim,
            transform: [{ translateY: animations.slideAnim }],
          }
        ]}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Ionicons name="information-circle" size={40} color={COLORS.text} />
            <Text style={styles.headerTitle}>About Piston Cup 2025</Text>
            <Text style={styles.headerSubtitle}>
              24-Hour Nationwide Hackathon on Real World Problems
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <View style={styles.content}>
        {/* Overview Section */}
        <Animated.View 
          style={[
            styles.section,
            {
              opacity: animations.fadeAnim,
              transform: [{ translateY: animations.slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Event Overview</Text>
          <View style={styles.overviewCard}>
            <BlurView intensity={20} style={styles.overviewBlur}>
              <Text style={styles.overviewText}>
                Piston Cup 2025 is a prestigious 24-hour hackathon that brings together the brightest minds 
                to solve real-world problems. Teams of 3-5 members will compete across three challenging rounds, 
                from ideation to final implementation, with a total prize pool of ₹30,000.
              </Text>
            </BlurView>
          </View>
        </Animated.View>

        {/* Rounds Section */}
        <Animated.View 
          style={[
            styles.section,
            {
              opacity: animations.fadeAnim,
              transform: [{ translateY: animations.slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Competition Rounds</Text>
          
          <InfoCard
            title="Round 1: Ideation Phase"
            description="Teams register and submit innovative ideas addressing real-world problems in domains like Education, Health, Agriculture, Finance, or Natural Resources. Submissions must include domain selection, problem statement, approach, solution, and technology stack. Deadline: August 2nd, 2025. Results announced by August 4th, 2025."
            icon="bulb"
            color={COLORS.accent}
            onPress={() => handleSectionPress('round1')}
            isExpanded={expandedSection === 'round1'}
          />

          <InfoCard
            title="Round 2: Prototype Phase"
            description="Selected teams from Round 1 create and present prototypes via video or Skype call. Teams must demonstrate their solution's functionality and be prepared for technical questions. Top 15 teams advance to the final round. Results announced by September 4th, 2025."
            icon="construct"
            color={COLORS.secondary}
            onPress={() => handleSectionPress('round2')}
            isExpanded={expandedSection === 'round2'}
          />

          <InfoCard
            title="Round 3: Final Implementation"
            description="24-hour hackathon at Vignan's Institute of Information Technology, Duvvada. Starts 10 AM on September 3rd, ends 10 AM on September 4th. Two judging rounds: Round 1 (3:30-5:30 PM) and Round 2 (early hours of September 4th). Top 10 teams present their projects. Scoring: Judging Round 1 (25%), Judging Round 2 (50%), Presentation (25%)."
            icon="trophy"
            color={COLORS.primary}
            onPress={() => handleSectionPress('round3')}
            isExpanded={expandedSection === 'round3'}
          />
        </Animated.View>

        {/* Workshop Section */}
        <Animated.View 
          style={[
            styles.section,
            {
              opacity: animations.fadeAnim,
              transform: [{ translateY: animations.slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>AI & Data Science Workshop</Text>
          <View style={styles.workshopCard}>
            <BlurView intensity={20} style={styles.workshopBlur}>
              <LinearGradient
                colors={[COLORS.success, COLORS.accent]}
                style={styles.workshopGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.workshopHeader}>
                  <Ionicons name="school" size={30} color={COLORS.text} />
                  <Text style={styles.workshopTitle}>Special Workshop</Text>
                </View>
                <Text style={styles.workshopDescription}>
                  A one-hour workshop on Artificial Intelligence and Data Science will be conducted during 
                  the hackathon on September 3rd. Learn about cutting-edge technologies, practical use-cases, 
                  and career guidance from esteemed speakers from academia and industry.
                </Text>
                <View style={styles.workshopFeatures}>
                  <View style={styles.feature}>
                    <Ionicons name="time" size={16} color={COLORS.text} />
                    <Text style={styles.featureText}>1 Hour Session</Text>
                  </View>
                  <View style={styles.feature}>
                    <Ionicons name="people" size={16} color={COLORS.text} />
                    <Text style={styles.featureText}>All Participants Welcome</Text>
                  </View>
                  <View style={styles.feature}>
                    <Ionicons name="star" size={16} color={COLORS.text} />
                    <Text style={styles.featureText}>Expert Speakers</Text>
                  </View>
                </View>
              </LinearGradient>
            </BlurView>
          </View>
        </Animated.View>

        {/* Venue & Logistics */}
        <Animated.View 
          style={[
            styles.section,
            {
              opacity: animations.fadeAnim,
              transform: [{ translateY: animations.slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Venue & Logistics</Text>
          
          <InfoCard
            title="Accommodation & Food"
            description="Accommodation provided for out-of-state teams from September 13th-15th. Teams from other states must report on September 13th. Food provided during hackathon (September 14th breakfast to September 15th lunch). Evening and midnight snacks included. WiFi available, but bring own internet dongles for faster access."
            icon="bed"
            color={COLORS.warning}
            onPress={() => handleSectionPress('logistics')}
            isExpanded={expandedSection === 'logistics'}
          />

          <InfoCard
            title="Judging Criteria"
            description="Teams will be evaluated on: Problem identification and understanding, Solution approach and methodology, Technology stack efficiency, Innovation and differentiation, Target user identification and impact, Implementation quality and completeness."
            icon="analytics"
            color={COLORS.success}
            onPress={() => handleSectionPress('judging')}
            isExpanded={expandedSection === 'judging'}
          />
        </Animated.View>

        {/* Call to Action */}
        <Animated.View 
          style={[
            styles.ctaSection,
            {
              opacity: animations.fadeAnim,
              transform: [{ translateY: animations.slideAnim }],
            }
          ]}
        >
          <LinearGradient
            colors={[COLORS.surface, COLORS.background]}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaTitle}>Ready to Join the Race?</Text>
            <Text style={styles.ctaText}>
              Register your team now and start your journey towards innovation
            </Text>
            <TouchableOpacity style={styles.ctaButton}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.ctaButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.ctaButtonText}>Register Team</Text>
                <Ionicons name="arrow-forward" size={20} color={COLORS.text} />
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
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
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 5,
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  overviewCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  overviewBlur: {
    padding: 20,
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  overviewText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  infoCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  cardBlur: {
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 15,
  },
  cardContent: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  workshopCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  workshopBlur: {
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  workshopGradient: {
    padding: 20,
  },
  workshopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  workshopTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 10,
  },
  workshopDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 15,
  },
  workshopFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 12,
    color: COLORS.text,
    marginLeft: 5,
  },
  ctaSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  ctaGradient: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  ctaText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  ctaButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  ctaButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  ctaButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default AboutScreen; 