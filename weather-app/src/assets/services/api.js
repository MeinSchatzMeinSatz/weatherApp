import { fetchAPI } from "../utils/fetchAPI.js";
import { WEATHER_URL } from "./https.js";

export default function getWeatherAPI() {
  // 현재 위치 기반 날씨 API 호출
  async function getWeatherByCurrentLocation(lat, lon, apiKey) {
    const url = WEATHER_URL.byCurrentLocation(lat, lon, apiKey);

    try {
      const response = await fetchAPI(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "날씨 정보를 불러오는데 실패했습니다."
        );
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // 도시 이름 기반 날씨 API 호출
  async function getWeatherByCityName(cityName, apiKey) {
    const url = WEATHER_URL.byCityName(cityName, apiKey);

    try {
      const response = await fetchAPI(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data?.message || "날씨 정보를 불러오는데 실패했습니다."
        );
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}
