import React from "react";
import { createPortal } from "react-dom";

const AddCityModal = ({ isOpen, onClose, onAddCity }) => {
  const [cityName, setCityName] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityName.trim()) {
      onAddCity(cityName.trim());
      setCityName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  // 👇 createPortal 사용 - body에 직접 렌더링
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl">
        <h2 className="text-xl font-bold mb-4">도시 추가</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="도시 이름을 입력하세요"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body // 👈 body에 직접 마운트
  );
};

export default AddCityModal;
