import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import WeatherCard from '@/components/WeatherCard';
import HourlyForecast from '@/components/HourlyForecast';
import WeatherAlert from '@/components/WeatherAlert';
import { mockCurrentWeather, mockForecast, mockWeatherAlerts } from '@/data/mockWeather';

export default function HomeScreen() {
  const [weatherData] = useState(mockCurrentWeather);
  const [forecast] = useState(mockForecast);
  const [alerts, setAlerts] = useState(mockWeatherAlerts);
  const currentHour = new Date().getHours();

  const dismissAlert = (index: number) => {
    setAlerts(alerts.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header 
        title="Weather"
        subtitle={`Last updated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
        showRefresh={true}
        onRefreshPress={() => console.log('Refresh pressed')}
        onSearchPress={() => console.log('Search pressed')}
        onNotificationPress={() => console.log('Notifications pressed')}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Weather Alerts */}
        {alerts.map((alert, index) => (
          <WeatherAlert 
            key={index} 
            alert={alert} 
            onDismiss={() => dismissAlert(index)} 
          />
        ))}
        
        {/* Main Weather Card */}
        <WeatherCard data={weatherData} />
        
        {/* Hourly Forecast */}
        <HourlyForecast 
          hours={forecast[0].hours} 
          currentHour={currentHour} 
        />
        
        {/* Extra space at bottom for scrolling past tab bar */}
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
  bottomPadding: {
    height: 80,
  },
});