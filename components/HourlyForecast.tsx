import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { HourlyForecast as HourlyForecastType } from '@/types/weather';
import Colors from '@/constants/Colors';
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudSun, Sun, Moon } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type HourlyForecastProps = {
  hours: HourlyForecastType[];
  currentHour?: number;
};

export default function HourlyForecast({ hours, currentHour = new Date().getHours() }: HourlyForecastProps) {
  const renderIcon = (hour: HourlyForecastType) => {
    const iconSize = 20;
    const iconColor = Colors.text;

    switch (hour.conditionIcon) {
      case 'sun':
        return <Sun size={iconSize} color={iconColor} />;
      case 'moon':
        return <Moon size={iconSize} color={iconColor} />;
      case 'cloud-sun':
        return <CloudSun size={iconSize} color={iconColor} />;
      case 'cloud':
        return <Cloud size={iconSize} color={iconColor} />;
      case 'cloud-drizzle':
        return <CloudDrizzle size={iconSize} color={iconColor} />;
      case 'cloud-rain':
        return <CloudRain size={iconSize} color={iconColor} />;
      case 'cloud-snow':
        return <CloudSnow size={iconSize} color={iconColor} />;
      default:
        return <CloudSun size={iconSize} color={iconColor} />;
    }
  };

  return (
    <Animated.View entering={FadeIn.duration(800)} style={styles.container}>
      <Text style={styles.title}>Today's Forecast</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hours.map((hour, index) => {
          const hourNum = parseInt(hour.time.split(':')[0]);
          const isCurrentHour = hourNum === currentHour;
          
          return (
            <View 
              key={index} 
              style={[
                styles.hourItem, 
                isCurrentHour && styles.currentHour
              ]}
            >
              <Text style={[
                styles.hourText,
                isCurrentHour && styles.currentHourText
              ]}>
                {hourNum === 0 ? '12 AM' : 
                  hourNum === 12 ? '12 PM' : 
                  hourNum > 12 ? `${hourNum - 12} PM` : 
                  `${hourNum} AM`}
              </Text>
              <View style={styles.iconContainer}>
                {renderIcon(hour)}
              </View>
              <Text style={[
                styles.temperature,
                isCurrentHour && styles.currentHourText
              ]}>
                {Math.round(hour.temperature)}°
              </Text>
              {hour.chanceOfRain > 0 && (
                <View style={styles.rainChanceContainer}>
                  <Text style={styles.rainChance}>{hour.chanceOfRain}%</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 16,
  },
  scrollContent: {
    paddingRight: 16,
  },
  hourItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 48,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  currentHour: {
    backgroundColor: Colors.primary,
  },
  hourText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.text,
    marginBottom: 8,
  },
  currentHourText: {
    color: Colors.backgroundLight,
  },
  iconContainer: {
    marginVertical: 4,
  },
  temperature: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
    marginTop: 4,
  },
  rainChanceContainer: {
    marginTop: 4,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  rainChance: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: Colors.rainy,
  },
});