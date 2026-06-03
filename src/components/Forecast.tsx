import "../styles/Forecast.css";
import type { ForecastDay } from "../types/Weather";

type Props = {
  forecast: ForecastDay[];
  unit: "C" | "F";
};

const formatTemp = (temp: number, unit: "C" | "F") =>
  `${Math.round(unit === "C" ? temp : temp * 9 / 5 + 32)}°${unit}`;

function Forecast({
  forecast,
  unit,
}: Props) {
  return (
    <div>

      <div className="forecast-grid">

        {forecast.map((day) => (
          <div key={day.date} className="weather-card">
            <h4>
              {new Date(
                day.date
              ).toLocaleDateString()}
            </h4>

            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt=""
            />

            <p>
              Max: {formatTemp(day.tempMax, unit)}
            </p>

            <p>
              Min: {formatTemp(day.tempMin, unit)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;