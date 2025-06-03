// Map weather condition codes to icon names
// This helps maintain consistency across the app
const WeatherIcons = {
  // Clear
  sunny: 'sun',
  clearNight: 'moon',
  
  // Clouds
  partlyCloudy: 'cloud-sun',
  partlyCloudyNight: 'cloud-moon',
  cloudy: 'cloud',
  overcast: 'clouds',
  
  // Rain
  lightRain: 'cloud-drizzle',
  moderateRain: 'cloud-rain',
  heavyRain: 'cloud-rain-wind',
  
  // Snow
  snow: 'cloud-snow',
  sleet: 'cloud-hail',
  
  // Thunderstorm
  thunderstorm: 'cloud-lightning',
  
  // Other
  fog: 'cloud-fog',
  haze: 'haze',
  wind: 'wind',
  
  // Default
  unknown: 'help-circle',
};

export default WeatherIcons;