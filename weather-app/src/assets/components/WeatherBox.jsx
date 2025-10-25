import React from "react";

const WeatherBox = ({ weather }) => {
  console.log("weather", weather);
  return (
    <div>
      <h1 className="sr-only">날씨 앱</h1>
      <div className="flex flex-col justify-center items-center w-[300px] h-[300px] rounded-[30px] bg-white">
        {/* 날씨 정보 */}
        <p>{weather && weather.name}</p>
        <p className="text-[30px] text-blue-300">
          {weather && weather.main.temp}℃ /{" "}
          {weather && weather.main.temp * 1.8 + 32}℉
        </p>
        <p className="text-[25px] text-blue-300">
          {weather && weather.weather[0].main}
        </p>
      </div>
    </div>
  );
};

export default WeatherBox;
