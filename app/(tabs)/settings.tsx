import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import SettingsItem from '@/components/SettingsItem';
import { Thermometer, Bell, Globe, CloudRain, Clock, Heart, MessageSquareWarning, CircleHelp as HelpCircle, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const [units, setUnits] = useState('celsius');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [severeWeatherAlerts, setSevereWeatherAlerts] = useState(true);
  const [dailyForecastNotifications, setDailyForecastNotifications] = useState(false);
  const [is24HourFormat, setIs24HourFormat] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header 
        title="Settings"
        showSearch={false}
        showNotification={false}
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.sectionTitle}>Units</Text>
        <SettingsItem 
          icon={<Thermometer size={20} color={Colors.primary} />}
          title="Temperature Units"
          description={units === 'celsius' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
          type="navigate"
          onPress={() => setUnits(units === 'celsius' ? 'fahrenheit' : 'celsius')}
        />
        
        <Text style={styles.sectionTitle}>Notifications</Text>
        <SettingsItem 
          icon={<Bell size={20} color={Colors.primary} />}
          title="Enable Notifications"
          description="Receive alerts and updates"
          type="toggle"
          value={notificationsEnabled}
          onToggle={setNotificationsEnabled}
          onPress={() => {}}
        />
        
        {notificationsEnabled && (
          <>
            <SettingsItem 
              icon={<MessageSquareWarning size={20} color={Colors.primary} />}
              title="Severe Weather Alerts"
              description="Get notified about severe weather conditions"
              type="toggle"
              value={severeWeatherAlerts}
              onToggle={setSevereWeatherAlerts}
              onPress={() => {}}
            />
            
            <SettingsItem 
              icon={<CloudRain size={20} color={Colors.primary} />}
              title="Daily Forecast Notifications"
              description="Get a daily summary of weather"
              type="toggle"
              value={dailyForecastNotifications}
              onToggle={setDailyForecastNotifications}
              onPress={() => {}}
            />
          </>
        )}
        
        <Text style={styles.sectionTitle}>Preferences</Text>
        <SettingsItem 
          icon={<Globe size={20} color={Colors.primary} />}
          title="Language"
          description="English"
          type="navigate"
          onPress={() => console.log('Language pressed')}
        />
        
        <SettingsItem 
          icon={<Clock size={20} color={Colors.primary} />}
          title="Time Format"
          description={is24HourFormat ? "24-hour" : "12-hour"}
          type="toggle"
          value={is24HourFormat}
          onToggle={setIs24HourFormat}
          onPress={() => {}}
        />
        
        <Text style={styles.sectionTitle}>About</Text>
        <SettingsItem 
          icon={<Heart size={20} color={Colors.primary} />}
          title="Rate the App"
          description="If you enjoy using the app, please rate it"
          type="navigate"
          onPress={() => console.log('Rate app pressed')}
        />
        
        <SettingsItem 
          icon={<HelpCircle size={20} color={Colors.primary} />}
          title="Help & Support"
          description="Get assistance with using the app"
          type="navigate"
          onPress={() => console.log('Help pressed')}
        />
        
        <SettingsItem 
          icon={<Info size={20} color={Colors.primary} />}
          title="About"
          description={`Version 1.0.0 (${Platform.OS})`}
          type="navigate"
          onPress={() => console.log('About pressed')}
        />
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
    marginVertical: 16,
  },
  bottomPadding: {
    height: 40,
  },
});