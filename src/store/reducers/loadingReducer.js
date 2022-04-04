const loadingReducer = (state = 0, action) => {
  switch (action.type) {
    case "LOADING":
      console.log(state + 1);
      return state + 1;
    case "DONE":
      console.log(state - 1);
      return state - 1;
    case "CLEAR_LOADER":
      return 0;
    default:
      return state;
  }
};

export default loadingReducer;
