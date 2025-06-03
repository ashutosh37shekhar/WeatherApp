import { WeatherData, ForecastDay, WeatherAlert, SavedLocation } from '@/types/weather';

export const mockCurrentWeather: WeatherData = {
  location: 'San Francisco',
  country: 'USA',
  temperature: 18,
  feelsLike: 17,
  condition: 'Partly Cloudy',
  conditionIcon: 'cloud-sun',
  humidity: 72,
  windSpeed: 12,
  windDirection: 'WSW',
  pressure: 1012,
  visibility: 10,
  uvIndex: 5,
  timestamp: Date.now(),
  isDay: true,
};

export const mockForecast: ForecastDay[] = [
  {
    date: 'Today',
    minTemp: 14,
    maxTemp: 20,
    condition: 'Partly Cloudy',
    conditionIcon: 'cloud-sun',
    chanceOfRain: 10,
    hours: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      temperature: Math.round(15 + 5 * Math.sin(i / 24 * Math.PI * 2)),
      condition: i > 6 && i < 20 ? 'Partly Cloudy' : 'Clear',
      conditionIcon: i > 6 && i < 20 ? 'cloud-sun' : 'moon',
      chanceOfRain: Math.round(10 + 20 * Math.sin(i / 24 * Math.PI * 2)),
      isDay: i >= 6 && i < 20,
    })),
  },
  {
    date: 'Tomorrow',
    minTemp: 13,
    maxTemp: 21,
    condition: 'Sunny',
    conditionIcon: 'sun',
    chanceOfRain: 0,
    hours: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      temperature: Math.round(16 + 5 * Math.sin(i / 24 * Math.PI * 2)),
      condition: i > 6 && i < 20 ? 'Sunny' : 'Clear',
      conditionIcon: i > 6 && i < 20 ? 'sun' : 'moon',
      chanceOfRain: 0,
      isDay: i >= 6 && i < 20,
    })),
  },
  {
    date: 'Wed',
    minTemp: 14,
    maxTemp: 19,
    condition: 'Light Rain',
    conditionIcon: 'cloud-drizzle',
    chanceOfRain: 70,
    hours: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      temperature: Math.round(14 + 5 * Math.sin(i / 24 * Math.PI * 2)),
      condition: 'Light Rain',
      conditionIcon: 'cloud-drizzle',
      chanceOfRain: 70,
      isDay: i >= 6 && i < 20,
    })),
  },
  {
    date: 'Thu',
    minTemp: 12,
    maxTemp: 17,
    condition: 'Moderate Rain',
    conditionIcon: 'cloud-rain',
    chanceOfRain: 90,
    hours: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      temperature: Math.round(13 + 4 * Math.sin(i / 24 * Math.PI * 2)),
      condition: 'Moderate Rain',
      conditionIcon: 'cloud-rain',
      chanceOfRain: 90,
      isDay: i >= 6 && i < 20,
    })),
  },
  {
    date: 'Fri',
    minTemp: 12,
    maxTemp: 18,
    condition: 'Cloudy',
    conditionIcon: 'cloud',
    chanceOfRain: 20,
    hours: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      temperature: Math.round(14 + 4 * Math.sin(i / 24 * Math.PI * 2)),
      condition: 'Cloudy',
      conditionIcon: 'cloud',
      chanceOfRain: 20,
      isDay: i >= 6 && i < 20,
    })),
  },
];

export const mockWeatherAlerts: WeatherAlert[] = [
  {
    title: 'High Wind Warning',
    description: 'Winds could occasionally gust over 35 mph',
    severity: 'medium',
    effective: '2023-05-15T12:00:00',
    expires: '2023-05-15T21:00:00',
  },
];

export const mockSavedLocations: SavedLocation[] = [
  {
    id: '1',
    name: 'San Francisco',
    country: 'USA',
    lat: 37.7749,
    lon: -122.4194,
    current: {
      temperature: 18,
      condition: 'Partly Cloudy',
      conditionIcon: 'cloud-sun',
    },
  },
  {
    id: '2',
    name: 'New York',
    country: 'USA',
    lat: 40.7128,
    lon: -74.0060,
    current: {
      temperature: 22,
      condition: 'Sunny',
      conditionIcon: 'sun',
    },
  },
  {
    id: '3',
    name: 'London',
    country: 'UK',
    lat: 51.5074,
    lon: -0.1278,
    current: {
      temperature: 14,
      condition: 'Rainy',
      conditionIcon: 'cloud-rain',
    },
  },
  {
    id: '4',
    name: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lon: 139.6503,
    current: {
      temperature: 26,
      condition: 'Cloudy',
      conditionIcon: 'cloud',
    },
  },
  {
    id: '5',
    name: 'Sydney',
    country: 'Australia',
    lat: -33.8688,
    lon: 151.2093,
    current: {
      temperature: 20,
      condition: 'Partly Cloudy',
      conditionIcon: 'cloud-sun',
    },
  },
];