import { useState, useCallback } from "react";
import type { WeatherData, ForecastDay, HourlyForecast } from "../types/Weather";
import { getCurrentWeather, getForecast } from "../services/WeatherService";

type ForecastApiItem = {
  dt_txt: string;
  main: {
    temp_min: number;
    temp_max: number;
    temp: number;
  };
  weather: [{ icon: string }];
};

export function useWeather() {
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [forecast, setForecast] =
    useState<ForecastDay[]>([]);

  const [hourlyForecast, setHourlyForecast] =
    useState<HourlyForecast[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const searchWeather = useCallback(
    async (city: string) => {
      setLoading(true);
      setError("");

      try {
        const weatherData =
          await getCurrentWeather(city);

        const forecastData =
          await getForecast(city);

        setWeather({
        city: weatherData.name,
        country: weatherData.sys.country,
        temperature:
          weatherData.main.temp,
        description:
          weatherData.weather[0]
            .description,
        humidity:
          weatherData.main.humidity,
        windSpeed:
          weatherData.wind.speed,
        visibility:
          weatherData.visibility / 1000,

        pressure:
          weatherData.main.pressure,
        icon:
          weatherData.weather[0]
            .icon,
      });

      const forecastItems =
        forecastData.list as ForecastApiItem[];

      const dailyForecast = forecastItems
        .filter((_, index: number) => index % 8 === 0)
        .slice(0, 5)
        .map((item) => ({
          date: item.dt_txt,
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
          icon: item.weather[0].icon,
        }));

      setForecast(dailyForecast);

      const next24Hours = forecastItems
        .slice(0, 8)
        .map((item) => ({
          time: item.dt_txt,
          temperature: item.main.temp,
          icon: item.weather[0].icon,
        }));

      setHourlyForecast(next24Hours);
    } catch (err) {
      console.error(err);
      setError(
        "City not found or weather service unavailable."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    weather,
    forecast,
    hourlyForecast,
    loading,
    error,
    searchWeather,
  };
}