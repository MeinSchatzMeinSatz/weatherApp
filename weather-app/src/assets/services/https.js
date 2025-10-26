const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

// 기본 URL 선언
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

// 날씨 호출 URL
/**
 * @property {function} byCurrentLocation - 현재 위치 기반 날씨 API URL 생성 함수
 * @property {function} byCityName - 도시 이름 기반 날씨 API URL 생성 함수
 */
export const WEATHER_URL = {
  byCurrentLocation: (lat, lon) => `${BASE_URL}&lat=${lat}&lon=${lon}`,
  byCityName: (cityName) => `${BASE_URL}&q=${cityName}`,
};
