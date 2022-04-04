const projReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_PROJS":
      return action.projects.data;
    case "ADD_PROJ":
      return [action.project.data, ...state];
    case "EDIT_PROJ":
      return state.map((project) =>
        project._id === action.project.data._id ? action.project.data : project
      );
    case "DELETE_PROJ":
      return state.filter((project) => project._id !== action.project.data._id);
    default:
      return state;
  }
};

export default projReducer;
