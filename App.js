import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Import constants
import { COLORS } from './src/constants/colors';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import PrizesScreen from './src/screens/PrizesScreen';
import ContactScreen from './src/screens/ContactScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Register') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          } else if (route.name === 'Prizes') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Contact') {
            iconName = focused ? 'call' : 'call-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.background,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: COLORS.surface,
          borderBottomColor: COLORS.background,
          borderBottomWidth: 1,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Register" 
        component={RegistrationScreen}
        options={{ title: 'Team Registration' }}
      />
      <Tab.Screen 
        name="Prizes" 
        component={PrizesScreen}
        options={{ title: 'Prizes & Rewards' }}
      />
      <Tab.Screen 
        name="Contact" 
        component={ContactScreen}
        options={{ title: 'Contact Us' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor={COLORS.background} />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: COLORS.surface,
              },
              headerTintColor: COLORS.text,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Main" 
              component={TabNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
} 