import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { WeatherData } from '@/types/weather';
import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudSun, Sun, Moon, Wind, CloudLightning } from 'lucide-react-native';

type WeatherCardProps = {
  data: WeatherData;
};

export default function WeatherCard({ data }: WeatherCardProps) {
  // Determine gradient colors based on weather condition and time of day
  const getGradientColors = () => {
    if (!data.isDay) {
      return ['#0F172A', '#1E293B']; // Night gradient
    }

    switch (data.condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return ['#F97316', '#FDBA74'];
      case 'partly cloudy':
        return ['#60A5FA', '#93C5FD'];
      case 'cloudy':
      case 'overcast':
        return ['#94A3B8', '#CBD5E1'];
      case 'rain':
      case 'light rain':
      case 'moderate rain':
      case 'heavy rain':
        return ['#3B82F6', '#60A5FA'];
      case 'thunderstorm':
        return ['#4B5563', '#6B7280'];
      case 'snow':
      case 'sleet':
        return ['#E2E8F0', '#F1F5F9'];
      default:
        return ['#60A5FA', '#93C5FD'];
    }
  };

  // Render appropriate weather icon based on condition
  const renderWeatherIcon = () => {
    const iconSize = 64;
    const iconColor = data.isDay ? Colors.backgroundLight : Colors.backgroundLight;

    switch (data.conditionIcon) {
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
      case 'cloud-lightning':
        return <CloudLightning size={iconSize} color={iconColor} />;
      case 'wind':
        return <Wind size={iconSize} color={iconColor} />;
      default:
        return <CloudSun size={iconSize} color={iconColor} />;
    }
  };

  return (
    <Animated.View entering={FadeIn.duration(800)} style={styles.container}>
      <LinearGradient
        colors={getGradientColors()}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.locationContainer}>
            <Text style={styles.location}>{data.location}</Text>
            <Text style={styles.country}>{data.country}</Text>
          </View>

          <View style={styles.temperatureContainer}>
            <View style={styles.iconContainer}>
              {renderWeatherIcon()}
            </View>
            <View style={styles.tempTextContainer}>
              <Text style={styles.temperature}>{Math.round(data.temperature)}°</Text>
              <Text style={styles.condition}>{data.condition}</Text>
              <Text style={styles.feelsLike}>Feels like {Math.round(data.feelsLike)}°</Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{data.humidity}%</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Wind</Text>
              <Text style={styles.detailValue}>{data.windSpeed} km/h</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>UV Index</Text>
              <Text style={styles.detailValue}>{data.uvIndex}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  gradient: {
    borderRadius: 20,
  },
  content: {
    padding: 24,
  },
  locationContainer: {
    marginBottom: 20,
  },
  location: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.backgroundLight,
    marginBottom: 4,
  },
  country: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.backgroundLight,
    opacity: 0.8,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    marginRight: 20,
  },
  tempTextContainer: {
    flex: 1,
  },
  temperature: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: Colors.backgroundLight,
    lineHeight: Platform.OS === 'ios' ? 58 : 64,
  },
  condition: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: Colors.backgroundLight,
    marginBottom: 4,
  },
  feelsLike: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.backgroundLight,
    opacity: 0.8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.backgroundLight,
    opacity: 0.8,
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.backgroundLight,
  },
});