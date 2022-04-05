const loadingReducer = (state = 0, action) => {
  switch (action.type) {
    case "LOADING":
      return state + 1;
    case "DONE":
      return state - 1;
    case "CLEAR_LOADER":
      return 0;
    default:
      return state;
  }
};

export default loadingReducer;
