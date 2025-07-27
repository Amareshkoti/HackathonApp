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

const { width } = Dimensions.get('window');

const ScheduleScreen = () => {
  const [selectedDate, setSelectedDate] = useState('september3');
  const [animations] = useState({
    fadeAnim: new Animated.Value(0),
    slideAnim: new Animated.Value(30),
    scaleAnim: new Animated.Value(0.9),
  });

  useEffect(() => {
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
      Animated.spring(animations.scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleDateSelect = (date) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDate(date);
  };

  const scheduleData = {
    august2: {
      title: 'August 2nd, 2025',
      subtitle: 'Round 1 Deadline',
      events: [
        {
          time: '11:59 PM',
          title: 'Ideation Phase Ends',
          description: 'Last day to submit team registrations and project ideas',
          icon: 'time',
          color: COLORS.error,
        },
      ],
    },
    august4: {
      title: 'August 4th, 2025',
      subtitle: 'Round 1 Results',
      events: [
        {
          time: '6:00 PM',
          title: 'Results Announcement',
          description: 'Selected teams for Round 2 will be notified',
          icon: 'notifications',
          color: COLORS.accent,
        },
      ],
    },
    september3: {
      title: 'September 3rd, 2025',
      subtitle: 'Hackathon Day 1',
      events: [
        {
          time: '10:00 AM',
          title: 'Hackathon Begins',
          description: '24-hour coding marathon starts at VIIT, Duvvada',
          icon: 'play',
          color: COLORS.success,
        },
        {
          time: '2:00 PM',
          title: 'AI & Data Science Workshop',
          description: 'One-hour workshop on cutting-edge technologies',
          icon: 'school',
          color: COLORS.accent,
        },
        {
          time: '3:30 PM - 5:30 PM',
          title: 'Judging Round 1',
          description: 'First evaluation round (25% of total score)',
          icon: 'analytics',
          color: COLORS.primary,
        },
        {
          time: '8:00 PM',
          title: 'Evening Snacks',
          description: 'Refreshments provided for all participants',
          icon: 'restaurant',
          color: COLORS.secondary,
        },
        {
          time: '12:00 AM',
          title: 'Midnight Snacks',
          description: 'Late night refreshments to keep you going',
          icon: 'moon',
          color: COLORS.warning,
        },
      ],
    },
    september4: {
      title: 'September 4th, 2025',
      subtitle: 'Hackathon Day 2',
      events: [
        {
          time: '6:00 AM',
          title: 'Early Morning Judging',
          description: 'Second evaluation round (50% of total score)',
          icon: 'sunny',
          color: COLORS.primary,
        },
        {
          time: '10:00 AM',
          title: 'Hackathon Ends',
          description: 'Coding phase concludes, prepare for presentations',
          icon: 'stop',
          color: COLORS.error,
        },
        {
          time: '11:00 AM',
          title: 'Final Presentations',
          description: 'Top 10 teams present their projects (25% of total score)',
          icon: 'presentation',
          color: COLORS.success,
        },
        {
          time: '2:00 PM',
          title: 'Awards Ceremony',
          description: 'Winners announced and prizes distributed',
          icon: 'trophy',
          color: COLORS.secondary,
        },
      ],
    },
  };

  const TimelineEvent = ({ event, isLast }) => (
    <View style={styles.timelineItem}>
      <View style={styles.timelineDot}>
        <Ionicons name={event.icon} size={16} color={COLORS.text} />
      </View>
      {!isLast && <View style={styles.timelineLine} />}
      <Animated.View 
        style={[
          styles.eventCard,
          {
            opacity: animations.fadeAnim,
            transform: [{ scale: animations.scaleAnim }],
          }
        ]}
      >
        <BlurView intensity={20} style={styles.eventBlur}>
          <View style={styles.eventHeader}>
            <View style={[styles.eventIcon, { backgroundColor: `${event.color}20` }]}>
              <Ionicons name={event.icon} size={20} color={event.color} />
            </View>
            <View style={styles.eventTimeContainer}>
              <Text style={styles.eventTime}>{event.time}</Text>
            </View>
          </View>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
        </BlurView>
      </Animated.View>
    </View>
  );

  const DateSelector = ({ date, title, subtitle, isSelected }) => (
    <TouchableOpacity
      style={[styles.dateSelector, isSelected && styles.dateSelectorActive]}
      onPress={() => handleDateSelect(date)}
    >
      <LinearGradient
        colors={isSelected ? [COLORS.primary, COLORS.secondary] : [COLORS.surface, COLORS.surface]}
        style={styles.dateGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.dateTitle, isSelected && styles.dateTitleActive]}>
          {title}
        </Text>
        <Text style={[styles.dateSubtitle, isSelected && styles.dateSubtitleActive]}>
          {subtitle}
        </Text>
      </LinearGradient>
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
            <Ionicons name="calendar" size={40} color={COLORS.text} />
            <Text style={styles.headerTitle}>Event Schedule</Text>
            <Text style={styles.headerSubtitle}>
              Complete timeline of Piston Cup 2025
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <View style={styles.content}>
        {/* Date Selector */}
        <Animated.View 
          style={[
            styles.dateSelectorContainer,
            {
              opacity: animations.fadeAnim,
              transform: [{ translateY: animations.slideAnim }],
            }
          ]}
        >
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateScrollContainer}
          >
            <DateSelector
              date="august2"
              title="Aug 2"
              subtitle="Round 1 Deadline"
              isSelected={selectedDate === 'august2'}
            />
            <DateSelector
              date="august4"
              title="Aug 4"
              subtitle="Results"
              isSelected={selectedDate === 'august4'}
            />
            <DateSelector
              date="september3"
              title="Sep 3"
              subtitle="Day 1"
              isSelected={selectedDate === 'september3'}
            />
            <DateSelector
              date="september4"
              title="Sep 4"
              subtitle="Day 2"
              isSelected={selectedDate === 'september4'}
            />
          </ScrollView>
        </Animated.View>

        {/* Timeline */}
        <Animated.View 
          style={[
            styles.timelineContainer,
            {
              opacity: animations.fadeAnim,
              transform: [{ translateY: animations.slideAnim }],
            }
          ]}
        >
          <View style={styles.timelineHeader}>
            <Text style={styles.timelineTitle}>{scheduleData[selectedDate].title}</Text>
            <Text style={styles.timelineSubtitle}>{scheduleData[selectedDate].subtitle}</Text>
          </View>

          <View style={styles.timeline}>
            {scheduleData[selectedDate].events.map((event, index) => (
              <TimelineEvent
                key={index}
                event={event}
                isLast={index === scheduleData[selectedDate].events.length - 1}
              />
            ))}
          </View>
        </Animated.View>

        {/* Important Notes */}
        <Animated.View 
          style={[
            styles.notesSection,
            {
              opacity: animations.fadeAnim,
              transform: [{ translateY: animations.slideAnim }],
            }
          ]}
        >
          <Text style={styles.notesTitle}>Important Notes</Text>
          <View style={styles.notesCard}>
            <BlurView intensity={20} style={styles.notesBlur}>
              <View style={styles.noteItem}>
                <Ionicons name="information-circle" size={20} color={COLORS.accent} />
                <Text style={styles.noteText}>
                  Teams must have at least one member present at their table during the hackathon
                </Text>
              </View>
              <View style={styles.noteItem}>
                <Ionicons name="wifi" size={20} color={COLORS.success} />
                <Text style={styles.noteText}>
                  WiFi will be provided, but bring your own internet dongles for faster access
                </Text>
              </View>
              <View style={styles.noteItem}>
                <Ionicons name="bed" size={20} color={COLORS.warning} />
                <Text style={styles.noteText}>
                  Accommodation available for out-of-state teams from September 13th-15th
                </Text>
              </View>
              <View style={styles.noteItem}>
                <Ionicons name="restaurant" size={20} color={COLORS.secondary} />
                <Text style={styles.noteText}>
                  Food provided during hackathon (breakfast to lunch) with evening and midnight snacks
                </Text>
              </View>
            </BlurView>
          </View>
        </Animated.View>

        {/* Countdown to Event */}
        <Animated.View 
          style={[
            styles.countdownSection,
            {
              opacity: animations.fadeAnim,
              transform: [{ translateY: animations.slideAnim }],
            }
          ]}
        >
          <LinearGradient
            colors={[COLORS.surface, COLORS.background]}
            style={styles.countdownGradient}
          >
            <Text style={styles.countdownTitle}>Countdown to Piston Cup</Text>
            <Text style={styles.countdownText}>
              {selectedDate === 'september3' || selectedDate === 'september4' 
                ? 'The main event is approaching!' 
                : 'Get ready for the ultimate hackathon experience!'}
            </Text>
            <TouchableOpacity style={styles.countdownButton}>
              <Text style={styles.countdownButtonText}>View Full Schedule</Text>
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
  dateSelectorContainer: {
    marginBottom: 30,
  },
  dateScrollContainer: {
    paddingHorizontal: 10,
  },
  dateSelector: {
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  dateSelectorActive: {
    transform: [{ scale: 1.05 }],
  },
  dateGradient: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  dateTitleActive: {
    color: COLORS.text,
  },
  dateSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  dateSubtitleActive: {
    color: COLORS.text,
  },
  timelineContainer: {
    marginBottom: 30,
  },
  timelineHeader: {
    marginBottom: 20,
  },
  timelineTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  timelineSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  timeline: {
    paddingLeft: 20,
  },
  timelineItem: {
    position: 'relative',
    marginBottom: 20,
  },
  timelineDot: {
    position: 'absolute',
    left: -10,
    top: 20,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  timelineLine: {
    position: 'absolute',
    left: -1,
    top: 40,
    width: 2,
    height: 60,
    backgroundColor: COLORS.surface,
  },
  eventCard: {
    marginLeft: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  eventBlur: {
    padding: 20,
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  eventTimeContainer: {
    flex: 1,
  },
  eventTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  notesSection: {
    marginBottom: 30,
  },
  notesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  notesCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  notesBlur: {
    padding: 20,
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 10,
    lineHeight: 20,
  },
  countdownSection: {
    marginBottom: 20,
  },
  countdownGradient: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  countdownTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  countdownText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  countdownButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  countdownButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScheduleScreen; 