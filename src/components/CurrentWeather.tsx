import "../styles/CurrentWeather.css";
import type { WeatherData, ForecastDay } from "../types/Weather";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";

type Props = {
  weather: WeatherData | null;
  loading: boolean;
  unit: "C" | "F";
  todayForecast: ForecastDay | null;
};

const convertTemp = (temp: number, unit: "C" | "F") =>
  unit === "C" ? temp : Math.round(temp * 9 / 5 + 32);

function CurrentWeather({ weather, loading, unit, todayForecast }: Props) {
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

  const currentTemp = Math.round(convertTemp(weather.temperature, unit));
  const highTemp = todayForecast
    ? Math.round(convertTemp(todayForecast.tempMax, unit))
    : null;
  const lowTemp = todayForecast
    ? Math.round(convertTemp(todayForecast.tempMin, unit))
    : null;

  const getTempStatus = () => {
    if (highTemp === null || lowTemp === null) return null;
    const range = highTemp - lowTemp;
    const margin = range * 0.15;
    const midpoint = (highTemp + lowTemp) / 2;
    
    if (currentTemp > midpoint + margin) return "High";
    if (currentTemp < midpoint - margin) return "Low";
    return "Normal";
  };

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="current-weather">
      <div className="weather-main">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
          alt={weather.description}
          className="weather-icon-large"
        />
        <div className="weather-info">
          <h1 className="current-weather-temp">
            {currentTemp}°{unit}
          </h1>
          <h3 className="weather-status">{weather.description}</h3>
          <p className="current-weather-location">
            {weather.city}, {weather.country}
          </p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-row">
          <span className="detail-label">Time</span>
          <span className="detail-value">{currentTime}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{Math.round(weather.windSpeed * 10) / 10} m/s</span>
        </div>

        {getTempStatus() !== null && (
          <div className="detail-row">
            <span className="detail-label">Temp</span>
            <span className="detail-value temp-status">
              {getTempStatus() === "High" && <FaArrowUp className="temp-icon high" />}
              {getTempStatus() === "Low" && <FaArrowDown className="temp-icon low" />}
              {getTempStatus() === "Normal" && <FaMinus className="temp-icon normal" />}
              {getTempStatus()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentWeather;