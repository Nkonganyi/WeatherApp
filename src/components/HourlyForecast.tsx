import type { HourlyForecast as HourType, } from "../types/Weather";

type Props = {
  hourlyForecast: HourType[];
};

function HourlyForecast({
  hourlyForecast,
}: Props) {
  return (
    <>
      <h2
        style={{
          marginBottom: "1rem",
        }}
      >
        Next 24 Hours
      </h2>

      <div className="hourly-grid">
        {hourlyForecast.map(
          (hour) => (
            <div
              key={hour.time}
              className="weather-card"
            >
              <p>
                {new Date(
                  hour.time
                ).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute:
                      "2-digit",
                  }
                )}
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
                alt=""
              />

              <h3>
                {Math.round(
                  hour.temperature
                )}
                °
              </h3>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default HourlyForecast;