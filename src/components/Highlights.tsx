import type { WeatherData } from "../types/Weather";
import WeatherCard from "./WeatherCard";
import { FaWind, FaTint, FaEye, } from "react-icons/fa";
import { WiBarometer, } from "react-icons/wi";

type Props = {
  weather: WeatherData | null;
};

function Highlights({
  weather,
}: Props) {
  if (!weather) return null;

  return (
    <>
      <h2 className="section-title">Today's Highlights</h2>

      <div className="highlights-grid">

        <WeatherCard>
          <FaWind size={24} />
          <p>Wind Status</p>
          <h1>
            {weather.windSpeed}
          </h1>
          <p>m/s</p>
        </WeatherCard>

        <WeatherCard>
          <FaTint size={24} />
          <p>Humidity</p>
          <h1>
            {weather.humidity}
          </h1>
          <p>%</p>
        </WeatherCard>

        <WeatherCard>
          <FaEye size={24} />
          <p>Visibility</p>
          <h1>
            {weather.visibility}
          </h1>
          <p>km</p>
        </WeatherCard>

        <WeatherCard>
          <WiBarometer size={32} />
          <p>Air Pressure</p>
          <h1>
            {weather.pressure}
          </h1>
          <p>mb</p>
        </WeatherCard>

      </div>
    </>
  );
}

export default Highlights;