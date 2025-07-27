# Piston Cup 2025 - React Native App

A highly interactive and animated React Native application for the 24-hour Nationwide Hackathon "Piston Cup 2025" with a car racing theme.

## 🏁 About Piston Cup 2025

Piston Cup 2025 is a prestigious 24-hour hackathon that brings together the brightest minds to solve real-world problems. Teams of 3-5 members compete across three challenging rounds, from ideation to final implementation, with a total prize pool of ₹30,000.

### Event Details
- **Date**: September 3rd - 4th, 2025
- **Duration**: 24 Hours
- **Venue**: Vignan's Institute of Information Technology, Duvvada
- **Team Size**: 3-5 Members
- **Prize Pool**: ₹30,000

## ✨ Features

### 🎨 Interactive Design
- **Smooth Animations**: Reanimated 2 for fluid transitions
- **Car Racing Theme**: Racing-inspired color scheme and design elements
- **Haptic Feedback**: Tactile responses for better user experience
- **Blur Effects**: Modern glassmorphism design elements
- **Gradient Backgrounds**: Dynamic color gradients throughout

### 📱 Screens & Functionality

#### 🏠 Home Screen
- Animated hero section with countdown timer
- Interactive event highlights cards
- Real-time countdown to hackathon
- Smooth scroll animations

#### ℹ️ About Screen
- Expandable sections for detailed information
- Three-round competition breakdown
- AI & Data Science workshop details
- Venue and logistics information

#### 📝 Registration Screen
- Multi-step team registration form
- Dynamic team member management (3-5 members)
- Project details and technology stack input
- Form validation and keyboard handling
- Review and submission process

#### 📅 Schedule Screen
- Interactive timeline of events
- Date-based navigation
- Detailed event descriptions
- Important notes and logistics

#### 🏆 Prizes Screen
- Animated prize cards with expandable details
- Prize breakdown and benefits
- Judging criteria explanation
- Additional rewards showcase

#### 📞 Contact Screen
- Contact information with direct action buttons
- Venue details with directions
- Interactive contact form
- Quick navigation links

### 🎯 Key Features
- **Responsive Design**: Works on all screen sizes
- **Keyboard Handling**: Proper form input management
- **Navigation**: Bottom tab navigation with stack navigation
- **Theme Consistency**: Unified color scheme and design language
- **Performance**: Optimized animations and smooth scrolling

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd piston-cup-2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

## 📦 Dependencies

### Core Dependencies
- `expo`: ~50.0.0
- `react`: 18.2.0
- `react-native`: 0.73.6
- `react-native-reanimated`: ~3.6.2
- `react-native-gesture-handler`: ~2.14.0

### Navigation
- `@react-navigation/native`: ^6.1.9
- `@react-navigation/stack`: ^6.3.20
- `@react-navigation/bottom-tabs`: ^6.5.11

### UI & Animations
- `expo-linear-gradient`: ~12.7.2
- `expo-blur`: ~12.9.2
- `expo-haptics`: ~12.8.1
- `react-native-vector-icons`: ^10.0.3

## 🎨 Design System

### Color Palette
```javascript
COLORS = {
  primary: '#e74c3c',     // Racing red
  secondary: '#f39c12',   // Orange
  accent: '#3498db',      // Blue
  background: '#1a1a2e',  // Dark blue
  surface: '#16213e',     // Lighter dark blue
  text: '#ffffff',        // White
  textSecondary: '#bdc3c7', // Light gray
  success: '#27ae60',     // Green
  warning: '#f1c40f',     // Yellow
  error: '#e74c3c',       // Red
}
```

### Typography
- **Headers**: Bold, large fonts for section titles
- **Body Text**: Regular weight for readability
- **Captions**: Smaller, secondary color for additional info

## 📱 App Structure

```
src/
├── screens/
│   ├── HomeScreen.js          # Main landing page
│   ├── AboutScreen.js         # Event information
│   ├── RegistrationScreen.js  # Team registration
│   ├── ScheduleScreen.js      # Event timeline
│   ├── PrizesScreen.js        # Prize information
│   └── ContactScreen.js       # Contact details
├── components/                # Reusable components
├── utils/                     # Helper functions
└── constants/                 # App constants

assets/
├── icon.png                   # App icon
├── splash.png                 # Splash screen
├── adaptive-icon.png          # Android adaptive icon
└── favicon.png               # Web favicon
```

## 🔧 Configuration

### App Configuration (`app.json`)
- App name: "Piston Cup 2025"
- Orientation: Portrait
- Theme: Light
- Splash screen configuration

### Babel Configuration (`babel.config.js`)
- Expo preset
- Reanimated plugin for animations

## 🎯 Hackathon Information

### Competition Rounds

#### Round 1: Ideation Phase
- Team registration and idea submission
- Deadline: August 2nd, 2025
- Results: August 4th, 2025

#### Round 2: Prototype Phase
- Prototype development and presentation
- Video/Skype call demonstrations
- Top 15 teams selected

#### Round 3: Final Implementation
- 24-hour hackathon at VIIT, Duvvada
- September 3rd-4th, 2025
- Final judging and presentations

### Prizes
- **1st Prize**: ₹15,000 + Trophy
- **2nd Prize**: ₹10,000 + Trophy
- **3rd Prize**: ₹5,000 + Trophy
- **Certificates**: All finalists

### Workshop
- AI & Data Science Workshop
- One-hour session on September 3rd
- Expert speakers from academia and industry

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For more information about Piston Cup 2025:
- **Email**: pistoncup@viit.ac.in
- **Venue**: Vignan's Institute of Information Technology, Duvvada
- **Website**: www.viit.ac.in

---

**Ready to race? Register your team and join the ultimate hackathon experience! 🏁** 