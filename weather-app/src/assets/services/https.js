// 기본 URL 선언
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

// 날씨 호출 URL
/**
 * @property {function} byCurrentLocation - 현재 위치 기반 날씨 API URL 생성 함수
 * @property {function} byCityName - 도시 이름 기반 날씨 API URL 생성 함수
 */
export const WEATHER_URL = {
  byCurrentLocation: (lat, lon, apiKey) =>
    `${BASE_URL}&lat=${lat}&lon=${lon}&appid=${apiKey}`,
  byCityName: (cityName, apiKey) => `${BASE_URL}&q=${cityName}&appid=${apiKey}`,
};
