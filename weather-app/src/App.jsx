import { useState, useEffect } from "react";
import WeatherBox from "./assets/components/WeatherBox";
import WeatherButtons from "./assets/components/WeatherButtons";

function App() {
  /*
  1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
  2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨상태정보가 보인다.
  3. 버튼이 5개 있다.
  4. 도시버튼을 클릭할때마다 해당 도시의 날씨가 나온다.
  5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
  6. 데이터를 불러오는 동안 로딩 스피너가 돈다.
  */

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const cities = ["Hamburg", "New York", "Tokyo"];

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }

  // 현재 위치 기반 날씨 API 호출
  async function getWeatherByCurrentLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=83d9de054c0a9f6845a3692815169707&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("데이터", data);
      setWeather(data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  }

  // 도시 이름 기반 날씨 API 호출
  async function getWeatherByCityName(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=83d9de054c0a9f6845a3692815169707&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("도시데이터", data);
      setWeather(data);
    } catch (error) {
      console.error("에러 발생", error);
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (city !== "") {
      getWeatherByCityName(city);
    } else {
      getCurrentLocation();
    }
  }, [city]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-200 gap-4">
      <WeatherBox weather={weather} />
      <WeatherButtons cities={cities} setCity={setCity} />
    </div>
  );
}

export default App;
