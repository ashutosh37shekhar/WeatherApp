import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import { Search, Bell, RefreshCw } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type HeaderProps = {
  title: string;
  showSearch?: boolean;
  showNotification?: boolean;
  showRefresh?: boolean;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onRefreshPress?: () => void;
  subtitle?: string;
};

export default function Header({
  title,
  showSearch = true,
  showNotification = true,
  showRefresh = false,
  onSearchPress,
  onNotificationPress,
  onRefreshPress,
  subtitle,
}: HeaderProps) {
  return (
    <Animated.View 
      entering={FadeIn.duration(500)}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      
      <View style={styles.actionsContainer}>
        {showRefresh && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onRefreshPress}
            activeOpacity={0.7}
          >
            <RefreshCw size={20} color={Colors.text} />
          </TouchableOpacity>
        )}
        
        {showSearch && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onSearchPress}
            activeOpacity={0.7}
          >
            <Search size={20} color={Colors.text} />
          </TouchableOpacity>
        )}
        
        {showNotification && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onNotificationPress}
            activeOpacity={0.7}
          >
            <Bell size={20} color={Colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 16,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: Colors.text,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});