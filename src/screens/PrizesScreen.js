import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const PrizesScreen = () => {
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [animations] = useState({
    fadeAnim: new Animated.Value(0),
    slideAnim: new Animated.Value(50),
    scaleAnim: new Animated.Value(0.8),
    rotateAnim: new Animated.Value(0),
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animations.fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animations.slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(animations.scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation animation for trophy
    Animated.loop(
      Animated.timing(animations.rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handlePrizePress = (prize) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedPrize(selectedPrize === prize ? null : prize);
  };

  const prizes = [
    {
      id: 1,
      title: '1st Prize',
      amount: '₹15,000',
      trophy: '🥇',
      color: COLORS.primary,
      gradient: [COLORS.primary, '#c0392b'],
      description: 'Champions of Piston Cup 2025',
      benefits: [
        'Cash prize of ₹15,000',
        'Championship Trophy',
        'Winner Certificate',
        'Internship opportunities',
        'Industry recognition',
      ],
    },
    {
      id: 2,
      title: '2nd Prize',
      amount: '₹10,000',
      trophy: '🥈',
      color: COLORS.secondary,
      gradient: [COLORS.secondary, '#e67e22'],
      description: 'Runners-up of Piston Cup 2025',
      benefits: [
        'Cash prize of ₹10,000',
        'Runner-up Trophy',
        'Achievement Certificate',
        'Mentorship opportunities',
        'Networking access',
      ],
    },
    {
      id: 3,
      title: '3rd Prize',
      amount: '₹5,000',
      trophy: '🥉',
      color: COLORS.accent,
      gradient: [COLORS.accent, '#2980b9'],
      description: 'Third Place Winners',
      benefits: [
        'Cash prize of ₹5,000',
        'Third Place Trophy',
        'Participation Certificate',
        'Learning resources',
        'Community access',
      ],
    },
  ];

  const PrizeCard = ({ prize, index }) => {
    const cardScale = new Animated.Value(1);
    const cardRotate = new Animated.Value(0);

    const handlePressIn = () => {
      Animated.parallel([
        Animated.timing(cardScale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(cardRotate, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const handlePressOut = () => {
      Animated.parallel([
        Animated.timing(cardScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(cardRotate, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const isSelected = selectedPrize === prize.id;
    const isExpanded = isSelected;

    return (
      <Animated.View
        style={[
          styles.prizeCard,
          {
            transform: [
              { scale: cardScale },
              { 
                rotate: cardRotate.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '5deg'],
                })
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.prizeTouchable}
          onPress={() => handlePrizePress(prize.id)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={prize.gradient}
            style={styles.prizeGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.prizeHeader}>
              <Animated.Text 
                style={[
                  styles.trophyEmoji,
                  {
                    transform: [{
                      rotate: animations.rotateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      })
                    }]
                  }
                ]}
              >
                {prize.trophy}
              </Animated.Text>
              <View style={styles.prizeInfo}>
                <Text style={styles.prizeTitle}>{prize.title}</Text>
                <Text style={styles.prizeAmount}>{prize.amount}</Text>
              </View>
            </View>
            
            <Text style={styles.prizeDescription}>{prize.description}</Text>
            
            {isExpanded && (
              <Animated.View 
                style={[
                  styles.prizeDetails,
                  {
                    opacity: animations.fadeAnim,
                    transform: [{ translateY: animations.slideAnim }],
                  }
                ]}
              >
                <Text style={styles.benefitsTitle}>What You'll Get:</Text>
                {prize.benefits.map((benefit, idx) => (
                  <View key={idx} style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={16} color={COLORS.text} />
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </Animated.View>
            )}
            
            <View style={styles.prizeFooter}>
              <Ionicons 
                name={isExpanded ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color={COLORS.text} 
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

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
            <Animated.View
              style={{
                transform: [{
                  rotate: animations.rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  })
                }]
              }}
            >
              <Ionicons name="trophy" size={50} color={COLORS.text} />
            </Animated.View>
            <Text style={styles.headerTitle}>Prizes & Rewards</Text>
            <Text style={styles.headerSubtitle}>
              Total Prize Pool: ₹30,000
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <View style={styles.content}>
        {/* Prize Cards */}
        <Animated.View 
          style={[
            styles.prizesSection,
            {
              opacity: animations.fadeAnim,
              transform: [{ translateY: animations.slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Competition Prizes</Text>
          {prizes.map((prize, index) => (
            <PrizeCard key={prize.id} prize={prize} index={index} />
          ))}
        </Animated.View>

        {/* Additional Rewards */}
        <Animated.View 
          style={[
            styles.rewardsSection,
            {
              opacity: animations.fadeAnim,
              transform: [{ translateY: animations.slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Additional Rewards</Text>
          
          <View style={styles.rewardsGrid}>
            <TouchableOpacity style={styles.rewardCard}>
              <BlurView intensity={20} style={styles.rewardBlur}>
                <Ionicons name="school" size={30} color={COLORS.accent} />
                <Text style={styles.rewardTitle}>Certificates</Text>
                <Text style={styles.rewardText}>
                  All finalists receive participation certificates
                </Text>
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rewardCard}>
              <BlurView intensity={20} style={styles.rewardBlur}>
                <Ionicons name="people" size={30} color={COLORS.success} />
                <Text style={styles.rewardTitle}>Networking</Text>
                <Text style={styles.rewardText}>
                  Connect with industry professionals and mentors
                </Text>
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rewardCard}>
              <BlurView intensity={20} style={styles.rewardBlur}>
                <Ionicons name="briefcase" size={30} color={COLORS.secondary} />
                <Text style={styles.rewardTitle}>Opportunities</Text>
                <Text style={styles.rewardText}>
                  Internship and job opportunities for winners
                </Text>
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rewardCard}>
              <BlurView intensity={20} style={styles.rewardBlur}>
                <Ionicons name="star" size={30} color={COLORS.primary} />
                <Text style={styles.rewardTitle}>Recognition</Text>
                <Text style={styles.rewardText}>
                  Industry recognition and media coverage
                </Text>
              </BlurView>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Judging Criteria */}
        <Animated.View 
          style={[
            styles.criteriaSection,
            {
              opacity: animations.fadeAnim,
              transform: [{ translateY: animations.slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Judging Criteria</Text>
          <View style={styles.criteriaCard}>
            <BlurView intensity={20} style={styles.criteriaBlur}>
              <View style={styles.criteriaItem}>
                <View style={styles.criteriaIcon}>
                  <Ionicons name="bulb" size={20} color={COLORS.accent} />
                </View>
                <View style={styles.criteriaContent}>
                  <Text style={styles.criteriaTitle}>Innovation (25%)</Text>
                  <Text style={styles.criteriaText}>
                    Originality and creativity of the solution
                  </Text>
                </View>
              </View>

              <View style={styles.criteriaItem}>
                <View style={styles.criteriaIcon}>
                  <Ionicons name="construct" size={20} color={COLORS.secondary} />
                </View>
                <View style={styles.criteriaContent}>
                  <Text style={styles.criteriaTitle}>Implementation (50%)</Text>
                  <Text style={styles.criteriaText}>
                    Quality and completeness of the working solution
                  </Text>
                </View>
              </View>

              <View style={styles.criteriaItem}>
                <View style={styles.criteriaIcon}>
                  <Ionicons name="presentation" size={20} color={COLORS.primary} />
                </View>
                <View style={styles.criteriaContent}>
                  <Text style={styles.criteriaTitle}>Presentation (25%)</Text>
                  <Text style={styles.criteriaText}>
                    Clarity and effectiveness of project presentation
                  </Text>
                </View>
              </View>
            </BlurView>
          </View>
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
            <Text style={styles.ctaTitle}>Ready to Win?</Text>
            <Text style={styles.ctaText}>
              Register your team now and compete for these amazing prizes!
            </Text>
            <TouchableOpacity style={styles.ctaButton}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.ctaButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.ctaButtonText}>Register Now</Text>
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
    height: 250,
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
    marginTop: 15,
  },
  headerSubtitle: {
    fontSize: 18,
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
  prizesSection: {
    marginBottom: 30,
  },
  prizeCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  prizeTouchable: {
    flex: 1,
  },
  prizeGradient: {
    padding: 25,
  },
  prizeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  trophyEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  prizeInfo: {
    flex: 1,
  },
  prizeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  prizeAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 5,
  },
  prizeDescription: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.9,
    marginBottom: 15,
  },
  prizeDetails: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 15,
    marginBottom: 15,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 10,
    flex: 1,
  },
  prizeFooter: {
    alignItems: 'center',
  },
  rewardsSection: {
    marginBottom: 30,
  },
  rewardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rewardCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  rewardBlur: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 10,
    textAlign: 'center',
  },
  rewardText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 5,
    textAlign: 'center',
    lineHeight: 16,
  },
  criteriaSection: {
    marginBottom: 30,
  },
  criteriaCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  criteriaBlur: {
    padding: 20,
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  criteriaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(52, 152, 219, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  criteriaContent: {
    flex: 1,
  },
  criteriaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  criteriaText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
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

export default PrizesScreen; 