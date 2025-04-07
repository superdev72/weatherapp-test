import { useState } from "react";
import { fetchWeather } from "../services/weatherService";
import { cacheWeather, getCachedWeather } from "../utils/cache";

export const useWeather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const cached = getCachedWeather(city);
      if (cached) {
        setWeather(cached);
      } else {
        const data = await fetchWeather(city);
        cacheWeather(city, data);
        setWeather(data);
      }
    } catch (err) {
      setError("City not found or API error.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return { weather, error, loading, getWeather };
};
