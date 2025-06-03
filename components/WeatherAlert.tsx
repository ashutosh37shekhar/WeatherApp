import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WeatherAlert as WeatherAlertType } from '@/types/weather';
import Colors from '@/constants/Colors';
import { TriangleAlert as AlertTriangle, X } from 'lucide-react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

type WeatherAlertProps = {
  alert: WeatherAlertType;
  onDismiss: () => void;
};

export default function WeatherAlert({ alert, onDismiss }: WeatherAlertProps) {
  // Get appropriate color based on severity
  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'low':
        return Colors.warning;
      case 'medium':
        return Colors.secondary;
      case 'high':
        return Colors.error;
      default:
        return Colors.warning;
    }
  };

  return (
    <Animated.View 
      entering={SlideInDown.springify().damping(15)}
      style={[
        styles.container,
        { borderLeftColor: getSeverityColor() }
      ]}
    >
      <View style={styles.iconContainer}>
        <AlertTriangle size={24} color={getSeverityColor()} />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{alert.title}</Text>
        <Text style={styles.description}>{alert.description}</Text>
        <Text style={styles.time}>Until {new Date(alert.expires).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.dismissButton}
        onPress={onDismiss}
      >
        <X size={16} color={Colors.textSecondary} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 12,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
    lineHeight: 20,
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textLight,
  },
  dismissButton: {
    padding: 4,
    alignSelf: 'flex-start',
  },
});