import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import { ChevronRight } from 'lucide-react-native';

type SettingsItemProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  type: 'navigate' | 'toggle' | 'button';
  value?: boolean;
  onPress: () => void;
  onToggle?: (value: boolean) => void;
};

export default function SettingsItem({
  icon,
  title,
  description,
  type,
  value = false,
  onPress,
  onToggle,
}: SettingsItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={type === 'toggle' ? 1 : 0.7}
    >
      <View style={styles.iconContainer}>{icon}</View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      
      {type === 'navigate' && (
        <ChevronRight size={20} color={Colors.textLight} />
      )}
      
      {type === 'toggle' && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: Colors.backgroundDark, true: Colors.primary }}
          thumbColor={Platform.OS === 'ios' ? 
            undefined : 
            value ? Colors.backgroundLight : Colors.backgroundLight
          }
          ios_backgroundColor={Colors.backgroundDark}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 2,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
});