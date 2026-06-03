import type { ForecastDay } from "../types/Weather";

type Props = {
  forecast: ForecastDay[];
};

function Forecast({
  forecast,
}: Props) {
  return (
    <div>
      <h2>5 Day Forecast</h2>

      <div className="forecast-grid">

        {forecast.map((day) => (
          <div
            key={day.date}
            className="weather-card"
            style={{
              textAlign: "center",
            }}
          >
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
              Max:
              {" "}
              {Math.round(day.tempMax)}°
            </p>

            <p>
              Min:
              {" "}
              {Math.round(day.tempMin)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;