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
    default:
      return state;
  }
}
