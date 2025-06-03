import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SavedLocation } from '@/types/weather';
import Colors from '@/constants/Colors';
import { MapPin, Star, StarOff } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type LocationItemProps = {
  location: SavedLocation;
  isFavorite?: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  index: number;
};

export default function LocationItem({ 
  location, 
  isFavorite = false, 
  onPress, 
  onToggleFavorite,
  index
}: LocationItemProps) {
  return (
    <Animated.View 
      entering={FadeIn.delay(100 * index).duration(400)}
      style={styles.container}
    >
      <TouchableOpacity 
        style={styles.content} 
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={styles.iconContainer}>
          <MapPin size={20} color={Colors.primary} />
        </View>
        
        <View style={styles.locationInfo}>
          <Text style={styles.locationName}>{location.name}</Text>
          <Text style={styles.country}>{location.country}</Text>
        </View>
        
        {location.current && (
          <View style={styles.weatherInfo}>
            <Text style={styles.temperature}>
              {Math.round(location.current.temperature)}°
            </Text>
            <Text style={styles.condition}>{location.current.condition}</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
        >
          {isFavorite ? (
            <Star size={20} color={Colors.secondary} fill={Colors.secondary} />
          ) : (
            <StarOff size={20} color={Colors.textLight} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  country: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  weatherInfo: {
    alignItems: 'flex-end',
    marginRight: 16,
  },
  temperature: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
  },
  condition: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  favoriteButton: {
    padding: 8,
  },
});