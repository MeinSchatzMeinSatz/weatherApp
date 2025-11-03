import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCityModal from "./AddCityModal";
import addIcon from "../images/add_icon.png";
import deleteBtn from "../images/remove_button.png";

const WeatherButtons = ({ setCity, selectedCity, setSelectedCity }) => {
  const dispatch = useDispatch();
  const storedCities = useSelector((state) => state.cityList);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 버튼들 */}
      <div className="flex justify-center items-center gap-2 p-[20px] h-[50px] bg-white rounded-[30px] opacity-75">
        <button
          className={`${
            selectedCity === null ? "bg-blue-500" : "bg-blue-100"
          } hover:bg-blue-500`}
          onClick={() => {
            setCity(""), setSelectedCity("");
          }}
        >
          현재 위치
        </button>
        {storedCities.length === 0 ? (
          <div>저장된 도시가 없습니다.</div>
        ) : (
          storedCities.map((city, idx) => {
            return (
              <button
                key={idx}
                className={`${
                  selectedCity === city ? "bg-blue-500" : "bg-blue-100"
                } hover:bg-blue-500 relative`}
                onClick={() => {
                  setCity(city);
                }}
              >
                {city}
                <img
                  src={deleteBtn}
                  alt="삭제 버튼"
                  className="absolute w-[20px] h-[20px] top-0 right-0 transform translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCity("");
                    setCity("");
                    dispatch({ type: "REMOVE_CITY", payload: idx });
                  }}
                />
              </button>
            );
          })
        )}
        <button onClick={() => setIsOpen(true)}>
          <img className="w-[20px] h-[20px]" src={addIcon} alt="추가 버튼" />
        </button>
      </div>
      {/* 모달 컴포넌트 */}
      {isOpen && (
        <AddCityModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onAddCity={(cityName) => {
            dispatch({ type: "ADD_CITY", payload: cityName });
          }}
        />
      )}
    </>
  );
};

export default WeatherButtons;
