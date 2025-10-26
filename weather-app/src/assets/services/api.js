import { WEATHER_URL } from "./https.js";

export const weatherAPI = {
  // 현재 위치 기반 날씨 API 호출
  getWeatherByCurrentLocation: async (lat, lon) => {
    const url = WEATHER_URL.byCurrentLocation(lat, lon);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("날씨 정보를 불러오는데 실패했습니다.");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  },

  // 도시 이름 기반 날씨 API 호출
  getWeatherByCityName: async (cityName) => {
    const url = WEATHER_URL.byCityName(cityName);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("날씨 정보를 불러오는데 실패했습니다.");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  },
};
