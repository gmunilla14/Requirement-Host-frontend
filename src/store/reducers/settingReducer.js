const initialState = {
  darkMode: null,
  filterMode: null,
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SETTINGS":
    case "EDIT_SETTINGS":
      return {
        ...initialState,
        darkMode: action.settings.data.darkMode,
        filterMode: action.settings.data.filterMode,
        color: action.settings.data.color
      };
    case "CLEAR_SETTINGS":
      return [];
    default:
      return state;
  }
};

export default settingReducer;
