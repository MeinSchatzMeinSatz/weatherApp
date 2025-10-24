import React from "react";

const WeatherButtons = () => {
  return (
    <>
      {/* 버튼들 */}
      <div className="flex justify-center items-center gap-1 w-[300px] h-[50px] bg-white rounded-[30px]">
        <button className="bg-pink-100">현재 위치</button>
        <button className="bg-pink-100">Hamburg</button>
        <button className="bg-pink-100">New York</button>
        <button className="bg-pink-100">Tokyo</button>
      </div>
    </>
  );
};

export default WeatherButtons;
