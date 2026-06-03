export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  icon: string;
}
export interface ForecastDay {
  date: string;
  tempMin: number;
  tempMax: number;
  icon: string;
}
export interface HourlyForecast {
  time: string;
  temperature: number;
  icon: string;
}