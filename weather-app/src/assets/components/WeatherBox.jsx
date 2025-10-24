import React from "react";

const WeatherBox = () => {
  return (
    <div>
      <h1 className="sr-only">날씨 앱</h1>
      <div className="flex flex-col justify-center items-center w-[300px] h-[300px] rounded-[30px] bg-white">
        {/* 날씨 정보 */}
        <p>City Name</p>
        <p className="text-[30px] text-blue-300">Temperature</p>
        <p className="text-[25px] text-blue-300">Weather Condition</p>
      </div>
    </div>
  );
};

export default WeatherBox;
