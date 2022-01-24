const reqReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_REQS":
      return action.requirements.data;
    case "DELETE_REQ":
      return state.filter((requirement) => requirement._id !== action.id);
    case "ADD_REQ":
      return [action.requirement.data, ...state];
    case "EDIT_REQ":
      return state.map((requirement) =>
        requirement._id === action.requirement.data._id
          ? action.requirement.data
          : requirement
      );
    case "CLEAR_REQS":
      return [];
    default:
      return state;
  }
};

export default reqReducer;
