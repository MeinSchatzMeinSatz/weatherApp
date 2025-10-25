import React from "react";

const WeatherButtons = ({ cities, setCity }) => {
  return (
    <>
      {/* 버튼들 */}
      <div className="flex justify-center items-center gap-1 w-[300px] h-[50px] bg-white rounded-[30px]">
        <button className="bg-pink-100" onClick={() => setCity("")}>
          현재 위치
        </button>
        {cities.map((city) => {
          return (
            <button
              key={city}
              className="bg-pink-100"
              onClick={() => setCity(city)}
            >
              {city}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default WeatherButtons;
