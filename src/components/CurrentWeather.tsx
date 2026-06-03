import type { WeatherData } from "../types/Weather";

type Props = {
  weather: WeatherData | null;
  loading: boolean;
  unit: "C" | "F";
};

function CurrentWeather({ weather, loading, unit, }: Props) {
  if (loading) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h2>
        Fetching Weather...
      </h2>
    </div>
  );
}

if (!weather) {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      Search for a city
      to begin.
    </div>
  );
}

  return (
  <div
    style={{
      textAlign: "center",
    }}
  >
    <img
      src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
      alt={weather.description}
    />

    <h1
      style={{
        fontSize: "5rem",
      }}
    >
      {unit === "C"
        ? Math.round(
            weather.temperature
          )
        : Math.round(
            weather.temperature *
              9 /
              5 +
              32
          )}
      °
      {unit}
    </h1>

    <h3>
      {weather.description}
    </h3>

    <p
      style={{
        marginTop: "2rem",
      }}
    >
      {weather.city},
      {" "}
      {weather.country}
    </p>
  </div>
);
}

export default CurrentWeather;