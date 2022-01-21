const projReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_PROJS":
      return action.projects.data;
    case "ADD_PROJ":
    case "EDIT_PROJ":
      return [action.projects.data, ...state];
    default:
      return state;
  }
};

export default projReducer;
