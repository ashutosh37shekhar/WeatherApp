import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { Chrome as Home, Calendar, Map, Settings } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.inactive,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarBackground: () => 
          Platform.OS === 'ios' ? (
            <BlurView intensity={80} style={styles.blurView} tint="light" />
          ) : null,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="forecast"
        options={{
          title: 'Forecast',
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="locations"
        options={{
          title: 'Locations',
          tabBarIcon: ({ color, size }) => (
            <Map size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : Colors.backgroundLight,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginBottom: 4,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});