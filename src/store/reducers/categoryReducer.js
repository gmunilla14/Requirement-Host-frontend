const catReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return action.categories.data;
    case "ADD_CATEGORIES":
      return [action.categories.data, ...state];
    default:
      return state;
  }
};

export default catReducer;
