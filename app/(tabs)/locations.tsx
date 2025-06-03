import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import LocationItem from '@/components/LocationItem';
import { mockSavedLocations } from '@/data/mockWeather';
import { SavedLocation } from '@/types/weather';
import { Search, MapPin, X } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function LocationsScreen() {
  const [locations, setLocations] = useState<SavedLocation[]>(mockSavedLocations);
  const [favorites, setFavorites] = useState<string[]>(['1', '2']); // IDs of favorite locations
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const renderHeader = () => {
    if (isSearching) {
      return (
        <Animated.View 
          entering={FadeIn.duration(300)}
          style={styles.searchContainer}
        >
          <View style={styles.searchInputContainer}>
            <Search size={20} color={Colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a city..."
              placeholderTextColor={Colors.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => {
              setIsSearching(false);
              setSearchQuery('');
            }}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    }
    
    return (
      <Header 
        title="Locations"
        showNotification={false}
        onSearchPress={() => setIsSearching(true)}
      />
    );
  };

  // Filter locations if search is active
  const filteredLocations = searchQuery.length > 0
    ? locations.filter(location => 
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : locations;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {renderHeader()}
      
      <View style={styles.content}>
        {!isSearching && (
          <Text style={styles.sectionTitle}>Saved Locations</Text>
        )}
        
        {filteredLocations.length === 0 && searchQuery.length > 0 ? (
          <View style={styles.noResultsContainer}>
            <MapPin size={48} color={Colors.textLight} />
            <Text style={styles.noResultsText}>No locations found</Text>
            <Text style={styles.noResultsSubtext}>Try a different search term</Text>
          </View>
        ) : (
          <FlatList
            data={filteredLocations}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <LocationItem 
                location={item} 
                isFavorite={favorites.includes(item.id)}
                onPress={() => console.log('Selected location:', item.name)}
                onToggleFavorite={() => toggleFavorite(item.id)}
                index={index}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.locationsList}
          />
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
  locationsList: {
    paddingBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: Colors.background,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text,
  },
  cancelButton: {
    marginLeft: 12,
    paddingVertical: 8,
  },
  cancelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.primary,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  noResultsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: Colors.text,
    marginTop: 16,
  },
  noResultsSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
  },
});