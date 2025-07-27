import React, { useState, useRef } from 'react';
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

const PrizesScreen = ({ navigation }) => {
  const [selectedPrize, setSelectedPrize] = useState(null);

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

  const handlePrizePress = (prize) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPrize(selectedPrize === prize ? null : prize);
  };

  const handleQuickLinkPress = (screen) => {
    navigation.navigate(screen);
  };

  const PrizeCard = ({ rank, prize, amount, description, color, icon }) => (
    <TouchableOpacity 
      style={styles.prizeCard}
      onPress={() => handlePrizePress(rank)}
    >
      <BlurView intensity={20} style={styles.prizeBlur}>
        <LinearGradient
          colors={[color, `${color}80`]}
          style={styles.prizeGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.prizeHeader}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{rank}</Text>
            </View>
            <Ionicons name={icon} size={40} color={COLORS.text} />
          </View>
          
          <Text style={styles.prizeTitle}>{prize}</Text>
          <Text style={styles.prizeAmount}>₹{amount}</Text>
          
          {selectedPrize === rank && (
            <Animated.View 
              style={[
                styles.prizeDetails,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                }
              ]}
            >
              <Text style={styles.prizeDescription}>{description}</Text>
            </Animated.View>
          )}
        </LinearGradient>
      </BlurView>
    </TouchableOpacity>
  );

  const CriteriaCard = ({ title, description, icon, color }) => (
    <View style={styles.criteriaCard}>
      <BlurView intensity={20} style={styles.criteriaBlur}>
        <View style={styles.criteriaHeader}>
          <View style={[styles.criteriaIcon, { backgroundColor: `${color}20` }]}>
            <Ionicons name={icon} size={24} color={color} />
          </View>
          <Text style={styles.criteriaTitle}>{title}</Text>
        </View>
        <Text style={styles.criteriaDescription}>{description}</Text>
      </BlurView>
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
            <Ionicons name="trophy" size={40} color={COLORS.text} />
            <Text style={styles.headerTitle}>Prizes & Rewards</Text>
            <Text style={styles.headerSubtitle}>
              Compete for amazing prizes worth ₹30,000+
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <View style={styles.content}>
        {/* Prize Pool Overview */}
        <Animated.View 
          style={[
            styles.overviewSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Prize Pool</Text>
          <View style={styles.overviewCard}>
            <BlurView intensity={20} style={styles.overviewBlur}>
              <LinearGradient
                colors={[COLORS.surface, COLORS.background]}
                style={styles.overviewGradient}
              >
                <View style={styles.overviewHeader}>
                  <Ionicons name="cash" size={30} color={COLORS.success} />
                  <Text style={styles.overviewTitle}>Total Prize Pool</Text>
                </View>
                <Text style={styles.overviewAmount}>₹30,000</Text>
                <Text style={styles.overviewDescription}>
                  Plus trophies, certificates, and amazing opportunities for all finalists
                </Text>
                
                <View style={styles.overviewStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>15</Text>
                    <Text style={styles.statLabel}>Finalist Teams</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>3</Text>
                    <Text style={styles.statLabel}>Winning Teams</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>100%</Text>
                    <Text style={styles.statLabel}>Certificates</Text>
                  </View>
                </View>
              </LinearGradient>
            </BlurView>
          </View>
        </Animated.View>

        {/* Prize Cards */}
        <Animated.View 
          style={[
            styles.prizesSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Winning Prizes</Text>
          
          <View style={styles.prizesGrid}>
            <PrizeCard
              rank="1st"
              prize="Champion"
              amount="15,000"
              description="First place team receives ₹15,000 cash prize, championship trophy, and certificates. Plus exclusive opportunities and recognition."
              color={COLORS.primary}
              icon="trophy"
            />
            
            <PrizeCard
              rank="2nd"
              prize="Runner Up"
              amount="10,000"
              description="Second place team receives ₹10,000 cash prize, runner-up trophy, and certificates. Great achievement and recognition."
              color={COLORS.secondary}
              icon="medal"
            />
            
            <PrizeCard
              rank="3rd"
              prize="Second Runner Up"
              amount="5,000"
              description="Third place team receives ₹5,000 cash prize, third place trophy, and certificates. Excellent performance recognition."
              color={COLORS.accent}
              icon="ribbon"
            />
          </View>
        </Animated.View>

        {/* Judging Criteria */}
        <Animated.View 
          style={[
            styles.criteriaSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Judging Criteria</Text>
          
          <View style={styles.criteriaGrid}>
            <CriteriaCard
              title="Problem Definition"
              description="How well the team identifies and articulates the real-world problem they're solving"
              icon="bulb"
              color={COLORS.accent}
            />
            
            <CriteriaCard
              title="Solution Approach"
              description="Innovation and effectiveness of the proposed solution methodology"
              icon="construct"
              color={COLORS.secondary}
            />
            
            <CriteriaCard
              title="Technology Stack"
              description="Efficient and appropriate use of technologies and tools"
              icon="code-slash"
              color={COLORS.primary}
            />
            
            <CriteriaCard
              title="Differentiation"
              description="How unique and different the solution is from existing alternatives"
              icon="star"
              color={COLORS.warning}
            />
            
            <CriteriaCard
              title="Target Users"
              description="Clear understanding of end users and their needs"
              icon="people"
              color={COLORS.success}
            />
            
            <CriteriaCard
              title="Implementation"
              description="Quality of the final working prototype and presentation"
              icon="checkmark-circle"
              color={COLORS.success}
            />
          </View>
        </Animated.View>

        {/* Additional Benefits */}
        <Animated.View 
          style={[
            styles.benefitsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Additional Benefits</Text>
          <View style={styles.benefitsCard}>
            <BlurView intensity={20} style={styles.benefitsBlur}>
              <LinearGradient
                colors={[COLORS.surface, COLORS.background]}
                style={styles.benefitsGradient}
              >
                <View style={styles.benefitItem}>
                  <Ionicons name="school" size={24} color={COLORS.accent} />
                  <View style={styles.benefitContent}>
                    <Text style={styles.benefitTitle}>AI & Data Science Workshop</Text>
                    <Text style={styles.benefitText}>One-hour session with industry experts</Text>
                  </View>
                </View>
                
                <View style={styles.benefitItem}>
                  <Ionicons name="network" size={24} color={COLORS.secondary} />
                  <View style={styles.benefitContent}>
                    <Text style={styles.benefitTitle}>Networking Opportunities</Text>
                    <Text style={styles.benefitText}>Connect with peers and industry professionals</Text>
                  </View>
                </View>
                
                <View style={styles.benefitItem}>
                  <Ionicons name="certificate" size={24} color={COLORS.primary} />
                  <View style={styles.benefitContent}>
                    <Text style={styles.benefitTitle}>Certificates for All</Text>
                    <Text style={styles.benefitText}>Participation certificates for all finalists</Text>
                  </View>
                </View>
                
                <View style={styles.benefitItem}>
                  <Ionicons name="briefcase" size={24} color={COLORS.success} />
                  <View style={styles.benefitContent}>
                    <Text style={styles.benefitTitle}>Career Opportunities</Text>
                    <Text style={styles.benefitText}>Potential internship and job opportunities</Text>
                  </View>
                </View>
              </LinearGradient>
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
              onPress={() => navigation.navigate('Home')}
            >
              <BlurView intensity={20} style={styles.linkBlur}>
                <Ionicons name="home" size={24} color={COLORS.success} />
                <Text style={styles.linkTitle}>Home</Text>
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.linkCard}
              onPress={() => handleQuickLinkPress('Contact')}
            >
              <BlurView intensity={20} style={styles.linkBlur}>
                <Ionicons name="call" size={24} color={COLORS.primary} />
                <Text style={styles.linkTitle}>Contact</Text>
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
        </Animated.View>

        {/* Call to Action */}
        <Animated.View 
          style={[
            styles.ctaSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <LinearGradient
            colors={[COLORS.surface, COLORS.background]}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaTitle}>Ready to Win?</Text>
            <Text style={styles.ctaText}>
              Register your team now and compete for amazing prizes
            </Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => handleQuickLinkPress('Register')}
            >
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
  overviewSection: {
    marginBottom: 30,
  },
  overviewCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  overviewBlur: {
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  overviewGradient: {
    padding: 25,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 15,
  },
  overviewAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.success,
    marginBottom: 10,
  },
  overviewDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  prizesSection: {
    marginBottom: 30,
  },
  prizesGrid: {
    gap: 15,
  },
  prizeCard: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
  },
  prizeBlur: {
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  prizeGradient: {
    padding: 25,
  },
  prizeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  rankBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  prizeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  prizeAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  prizeDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
  },
  prizeDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  criteriaSection: {
    marginBottom: 30,
  },
  criteriaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  criteriaCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  criteriaBlur: {
    padding: 20,
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  criteriaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  criteriaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  criteriaTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  criteriaDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  benefitsSection: {
    marginBottom: 30,
  },
  benefitsCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  benefitsBlur: {
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  benefitsGradient: {
    padding: 25,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  benefitContent: {
    flex: 1,
    marginLeft: 15,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  benefitText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  linksSection: {
    marginBottom: 30,
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
    marginBottom: 20,
  },
  ctaGradient: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
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

export default PrizesScreen; 