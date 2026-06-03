import { useCityWeather, } from "../hooks/useCityWeather";

type Props = {
  city: string;
};

function CityCard({
  city,
}: Props) {
  const temp =
    useCityWeather(city);

  return (
    <div className="weather-card">
      <h3>{city}</h3>

      <h1>
        {temp ?? "--"}°
      </h1>
    </div>
  );
}

export default CityCard;