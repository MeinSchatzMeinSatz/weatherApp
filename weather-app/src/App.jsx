import { useState, useEffect } from "react";

function App() {
  /*
  1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
  2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨상태정보가 보인다.
  3. 버튼이 5개 있다.
  4. 도시버튼을 클릭할때마다 해당 도시의 날씨가 나온다.
  5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
  6. 데이터를 불러오는 동안 로딩 스피너가 돈다.
  */

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재 위치", lat, lon);
      getWeatehrByCurrentLocation(lat, lon);
    });
  }

  // 현재 위치 기반 날씨 API 호출
  async function getWeatehrByCurrentLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=83d9de054c0a9f6845a3692815169707`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("데이터", data);
      console.log("현재 날씨", data.weather[0].main);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return <div className="text-blue-600">hello</div>;
}

export default App;
