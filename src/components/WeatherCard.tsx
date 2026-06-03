import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function WeatherCard({
  children,
}: Props) {
  return (
    <div className="weather-card">
      {children}
    </div>
  );
}

export default WeatherCard;