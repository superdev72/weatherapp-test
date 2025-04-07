const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCachedWeather = (city: string) => {
  const cached = localStorage.getItem(city);
  if (!cached) return null;

  const data = JSON.parse(cached);
  if (Date.now() - data.timestamp < CACHE_DURATION) {
    return data.weather;
  }

  return null;
};

export const cacheWeather = (city: string, weather: any) => {
  const data = {
    weather,
    timestamp: Date.now(),
  };
  localStorage.setItem(city, JSON.stringify(data));
};
