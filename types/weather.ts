export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionIcon: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
  uvIndex: number;
  timestamp: number;
  isDay: boolean;
  isFavorite?: boolean;
}

export interface ForecastDay {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  conditionIcon: string;
  chanceOfRain: number;
  hours: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  conditionIcon: string;
  chanceOfRain: number;
  isDay: boolean;
}

export interface WeatherAlert {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  effective: string;
  expires: string;
}

export interface SavedLocation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  current?: {
    temperature: number;
    condition: string;
    conditionIcon: string;
  };
}