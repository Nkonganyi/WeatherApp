import { useCityWeather, } from "../hooks/useCityWeather";

type Props = {
  city: string;
  unit: "C" | "F";
};

const formatTemp = (temp: number | undefined, unit: "C" | "F") => {
  if (temp === undefined) return `--°${unit}`;
  const value = unit === "C" ? temp : Math.round(temp * 9 / 5 + 32);
  return `${value}°${unit}`;
};

function CityCard({
  city,
  unit,
}: Props) {
  const temp = useCityWeather(city);

  return (
    <div className="weather-card">
      <h3>{city}</h3>
      <h1>{formatTemp(temp, unit)}</h1>
    </div>
  );
}

export default CityCard;