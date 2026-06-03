import { useEffect, useState, } from "react";
import { getCurrentWeather, } from "../services/WeatherService";

export function useCityWeather(
  city: string
) {
  const [temp, setTemp] =
    useState<number>();

  useEffect(() => {
    const load = async () => {
      try {
        const data =
          await getCurrentWeather(
            city
          );

        setTemp(
          Math.round(
            data.main.temp
          )
        );
      } catch {
        console.error(
          "Failed loading city"
        );
      }
    };

    load();
  }, [city]);

  return temp;
}