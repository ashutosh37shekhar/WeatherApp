import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ForecastDay } from '@/types/weather';
import Colors from '@/constants/Colors';
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudSun, Sun, Moon } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

type ForecastItemProps = {
  forecast: ForecastDay;
  index: number;
  onPress: () => void;
};

export default function ForecastItem({ forecast, index, onPress }: ForecastItemProps) {
  const renderIcon = () => {
    const iconSize = 24;
    const iconColor = Colors.text;

    switch (forecast.conditionIcon) {
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
    <Animated.View entering={FadeInRight.delay(100 * index).duration(400)}>
      <TouchableOpacity 
        style={styles.container}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{forecast.date}</Text>
        </View>
        
        <View style={styles.iconContainer}>
          {renderIcon()}
        </View>
        
        <View style={styles.temperatureContainer}>
          <Text style={styles.maxTemp}>{Math.round(forecast.maxTemp)}°</Text>
          <Text style={styles.minTemp}>{Math.round(forecast.minTemp)}°</Text>
        </View>
        
        {forecast.chanceOfRain > 0 && (
          <View style={styles.rainContainer}>
            <Text style={styles.rainChance}>{forecast.chanceOfRain}%</Text>
            <CloudDrizzle size={14} color={Colors.rainy} />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dateContainer: {
    width: 80,
  },
  date: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  temperatureContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 16,
  },
  maxTemp: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
    marginRight: 8,
  },
  minTemp: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  rainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rainChance: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.rainy,
    marginRight: 4,
  },
});