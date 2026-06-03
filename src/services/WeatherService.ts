import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

if (!API_KEY) {
  throw new Error(
    "Missing VITE_WEATHER_API_KEY. Add it to .env or .env.local in the weather-app folder."
  );
}

export const getCurrentWeather = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || error.message || "Unknown API error";
      throw new Error(`Weather API request failed: ${message}`, {
        cause: error,
      });
    }

    throw error;
  }
};
export const getForecast = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || error.message || "Unknown API error";
      throw new Error(`Weather API request failed: ${message}`, {
        cause: error,
      });
    }

    throw error;
  }
};