import React, { useState } from "react";

const WeatherButtons = ({ cities, setCity, selectedCity, setSelectedCity }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {/* 버튼들 */}
      <div className="flex justify-center items-center gap-1 w-[300px] h-[50px] bg-white rounded-[30px]">
        <button
          className={`${
            selectedCity === "" ? "bg-blue-500" : "bg-blue-100"
          } hover:bg-blue-500`}
          onClick={() => {
            setCity(""), setSelectedCity("");
          }}
        >
          현재 위치
        </button>
        {cities.map((city, idx) => {
          return (
            <button
              key={idx}
              className={`${
                selectedCity === city ? "bg-blue-500" : "bg-blue-100"
              } hover:bg-blue-500`}
              onClick={() => {
                setCity(city);
              }}
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
