import { useEffect, useState } from "react";
import HourlyForecast from "./components/HourlyForecast";
import Forecast from "./components/Forecast";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import { useWeather } from "./hooks/useWeather";
import CityCard from "./components/CityCard";
import Highlights from "./components/Highlights";
import "./styles/App.css";

function App() {
    const {
      weather,
      forecast,
      hourlyForecast,
      loading,
      error,
      searchWeather,
    } = useWeather();

    const [unit, setUnit] =
    useState<"C" | "F">("C");

    const [
      showSearch,
      setShowSearch,
    ] = useState(false);

    const [
      recentSearches,
      setRecentSearches,
    ] = useState<string[]>([]);

    useEffect(() => {
      const lastCity =
        localStorage.getItem(
          "lastCity"
        );

      searchWeather(
        lastCity ||
          "Yaounde"
      );
    }, [searchWeather]);

  const handleCurrentLocation =
  () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat =
          position.coords.latitude;

        const lon =
          position.coords.longitude;

        const response =
          await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
          );

        const data =
          await response.json();

        searchWeather(data.name);
        setShowSearch(false);
      }
    );
  };

  const getBackgroundClass = () => {
    if (!weather) return "default";

    const desc = weather.description.toLowerCase();

    if (desc.includes("rain")) return "rain";
    if (desc.includes("cloud")) return "cloud";
    if (desc.includes("clear")) return "clear";
    return "default";
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <aside className="sidebar">
        {showSearch ? (
          <>
            <SearchBar
              onSearch={(city) => {
                localStorage.setItem("lastCity", city);
                searchWeather(city);
                setRecentSearches(
                  (prev) =>
                    [city, ...prev.filter((c) => c !== city)].slice(
                      0,
                      5
                    )
                );
                setShowSearch(false);
              }}
              onCurrentLocation={handleCurrentLocation}
            />
            <div className="recent-searches">
              {recentSearches.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    searchWeather(city);
                    setShowSearch(false);
                  }}
                  className="recent-search-button"
                >
                  {city}
                </button>
              ))}
            </div>
          </>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
          >
            Search For Places
          </button>
        )}
        <CurrentWeather
          weather={weather}
          loading={loading}
          unit={unit}
        />
      </aside>

      <main className="main-content">
        <div className="unit-buttons">
          <button
            className={unit === "C" ? "unit-active" : ""}
            onClick={() => setUnit("C")}
          >
            °C
          </button>

          <button
            className={unit === "F" ? "unit-active" : ""}
            onClick={() => setUnit("F")}
          >
            °F
          </button>
        </div>

        {error && (
          <p className="error-message">{error}</p>
        )}

        <HourlyForecast
          hourlyForecast={ hourlyForecast }
        />
    
        <Forecast
          forecast={forecast}
        />
        <Highlights weather={weather} />
        <h2 className="section-title">Major Cities</h2>

        <div className="forecast-grid">
          <CityCard city="London" />
          <CityCard city="Paris" />
          <CityCard city="Tokyo" />
        </div>

        <footer className="footer">
          Built with React + TypeScript
        </footer>
      </main>
    </div>
  );
}

export default App;