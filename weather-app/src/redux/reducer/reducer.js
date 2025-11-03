const initialState = {
  cityList: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CITY":
      // 중복된 도시 이름이 없을 때만 추가
      if (!state.cityList.includes(action.payload)) {
        return {
          ...state,
          cityList: [...state.cityList, action.payload],
        };
      }
      return state;
    case "REMOVE_CITY":
      const newState = [...state.cityList].splice(action.payload, 1);
      return {
        ...state,
        cityList: state.cityList.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
}
