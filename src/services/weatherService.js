import axios from 'axios';

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeather = (latitude, longitude) => {
  return axios.get(WEATHER_API_URL, {
    params: {
      latitude,
      longitude,
      current_weather: true,
      timezone: 'auto',
    },
  });
};
