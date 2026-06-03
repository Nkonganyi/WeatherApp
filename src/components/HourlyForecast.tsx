import "../styles/HourlyForecast.css";
import type { HourlyForecast as HourType } from "../types/Weather";

type Props = {
  hourlyForecast: HourType[];
  unit: "C" | "F";
};

const convertTemp = (temp: number, unit: "C" | "F") =>
  unit === "C" ? temp : temp * 9 / 5 + 32;

const formatTemp = (temp: number, unit: "C" | "F") =>
  `${Math.round(convertTemp(temp, unit))}°${unit}`;

function HourlyForecast({
  hourlyForecast,
  unit,
}: Props) {
  if (hourlyForecast.length === 0) {
    return null;
  }

  const temperatures = hourlyForecast.map((hour) =>
    convertTemp(hour.temperature, unit)
  );

  const minTemp = Math.min(...temperatures);
  const maxTemp = Math.max(...temperatures);
  const range = maxTemp - minTemp || 1;

  const chartWidth = 720;
  const chartHeight = 260;
  const chartPadding = 40;

  const points = temperatures.map((value, index) => {
    const x =
      chartPadding +
      (index * (chartWidth - chartPadding * 2)) /
        (temperatures.length - 1);
    const y =
      chartPadding +
      ((maxTemp - value) / range) *
        (chartHeight - chartPadding * 2);

    return { x, y, value, label: hourlyForecast[index].time };
  });

  const linePath = points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - chartPadding} L ${points[0].x} ${chartHeight - chartPadding} Z`;

  return (
    <>
      <h2 className="section-title">Next 24 Hours</h2>

      <div className="hourly-chart weather-card">
        <div className="hourly-chart-header">
          <div>
            <p className="chart-title">Hourly temperature trend</p>
            <p className="chart-subtitle">Forecast for the next 24 hours</p>
          </div>
          <span className="chart-unit">°{unit}</span>
        </div>

        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="hourly-chart-svg"
          role="img"
          aria-label="Hourly temperature chart"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7b64ff" />
              <stop offset="100%" stopColor="#59d6ff" />
            </linearGradient>
            <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#59d6ff" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#0a142a" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d={`M ${chartPadding} ${chartHeight - chartPadding} H ${chartWidth - chartPadding}`}
            className="chart-grid"
          />
          <path
            d={`M ${chartPadding} ${chartPadding} H ${chartWidth - chartPadding}`}
            className="chart-grid"
          />
          <path d={areaPath} className="chart-area" />
          <path d={linePath} className="chart-line" />

          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r={5}
                className="chart-dot"
              />
              <text
                x={point.x}
                y={point.y - 10}
                className="chart-label"
                textAnchor="middle"
              >
                {Math.round(point.value)}°
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="hourly-grid">
        {hourlyForecast.map((hour) => (
          <div key={hour.time} className="weather-card">
            <p>
              {new Date(hour.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
              alt=""
            />

            <h3>{formatTemp(hour.temperature, unit)}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default HourlyForecast;
