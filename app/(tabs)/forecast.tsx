import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import ForecastItem from '@/components/ForecastItem';
import HourlyForecast from '@/components/HourlyForecast';
import { mockForecast } from '@/data/mockWeather';

export default function ForecastScreen() {
  const [forecast] = useState(mockForecast);
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header 
        title="Forecast"
        showNotification={false}
        onSearchPress={() => console.log('Search pressed')}
      />
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>5-Day Forecast</Text>
        
        <FlatList
          data={forecast}
          keyExtractor={(item, index) => `forecast-${index}`}
          renderItem={({ item, index }) => (
            <ForecastItem 
              forecast={item} 
              index={index}
              onPress={() => setSelectedDay(index)} 
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.forecastList}
        />
        
        {forecast[selectedDay] && (
          <>
            <Text style={styles.hourlyTitle}>
              {selectedDay === 0 ? 'Today' : 
               selectedDay === 1 ? 'Tomorrow' : 
               forecast[selectedDay].date} Hourly
            </Text>
            
            <HourlyForecast 
              hours={forecast[selectedDay].hours} 
              currentHour={selectedDay === 0 ? new Date().getHours() : undefined} 
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.text,
    marginBottom: 16,
  },
  forecastList: {
    paddingBottom: 16,
  },
  hourlyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 16,
  },
});