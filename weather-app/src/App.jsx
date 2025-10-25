import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import WeatherBox from "./assets/components/WeatherBox";
import WeatherButtons from "./assets/components/WeatherButtons";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("데이터", data);
      setWeather(data);
    } catch (error) {
      console.error("에러 발생:", error);
    } finally {
      setLoading(false);
    }
  }

  // 도시 이름 기반 날씨 API 호출
  async function getWeatherByCityName(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=83d9de054c0a9f6845a3692815169707&units=metric`;
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("도시데이터", data);
      setWeather(data);
    } catch (error) {
      console.error("에러 발생", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (city !== "") {
      getWeatherByCityName(city);
    } else {
      getCurrentLocation();
    }
  }, [city]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-200 gap-4">
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
          <WeatherButtons cities={cities} setCity={setCity} />
        </>
      )}
    </div>
  );
}

export default App;
