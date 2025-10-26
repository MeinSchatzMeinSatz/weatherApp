import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
// import getWeatherAPI from "./assets/services/api";
import WeatherBox from "./assets/components/WeatherBox";
import WeatherButtons from "./assets/components/WeatherButtons";
import { weatherAPI } from "./assets/services/api.js";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const cities = ["Hamburg", "New York", "Tokyo"];

  // 현재 위치 기반 날씨 가져오기
  async function getWeatherByCurrentLocation() {
    setLoading(true);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // API 호출
      const data = await weatherAPI.getWeatherByCurrentLocation(lat, lon);
      setWeather(data);
      setSelectedCity(null);
    } catch (error) {
      console.error("현재 위치 날씨 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  }

  // 도시 이름 기반 날씨 API 호출
  async function getWeatherByCityName(cityName) {
    setLoading(true);

    try {
      const data = await weatherAPI.getWeatherByCityName(cityName);
      setWeather(data);
      setSelectedCity(data.name);
    } catch (error) {
      console.error("도시 날씨 이름 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (city !== "") {
      getWeatherByCityName(city);
    } else {
      getWeatherByCurrentLocation();
    }
  }, [city]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-300 gap-4">
      {loading ? (
        <ClipLoader
          color={"#ffffff"}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <WeatherBox weather={weather} />
          <WeatherButtons
            cities={cities}
            setCity={setCity}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </>
      )}
    </div>
  );
}

export default App;
