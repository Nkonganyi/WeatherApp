import "../styles/CurrentWeather.css";
import type { WeatherData } from "../types/Weather";

type Props = {
  weather: WeatherData | null;
  loading: boolean;
  unit: "C" | "F";
};
function CurrentWeather({ weather, loading, unit, }: Props) {
  if (loading) {
    return (
      <div className="current-weather-loading">
        <h2>Fetching Weather...</h2>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="current-weather-empty">
        Search for a city to begin.
      </div>
    );
  }

  return (
    <div className="current-weather">
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
        alt={weather.description}
      />

      <h1 className="current-weather-temp">
        {unit === "C"
          ? Math.round(weather.temperature)
          : Math.round(weather.temperature * 9 / 5 + 32)}
        °{unit}
      </h1>

      <h3>{weather.description}</h3>

      <p className="current-weather-location">
        {weather.city}, {weather.country}
      </p>
    </div>
  );
}

export default CurrentWeather;