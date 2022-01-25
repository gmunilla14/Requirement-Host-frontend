import axios from "axios";
import { url, setHeaders } from "../../api";

export const getRequirements = () => {
  return (dispatch) => {
    axios
      .get(`${url}/requirements`, setHeaders())
      .then((requirements) => {
        dispatch({
          type: "GET_REQS",
          requirements,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addRequirement = (requirement) => {
  return (dispatch) => {
    axios
      .post(`${url}/requirements`, { ...requirement }, setHeaders())
      .then((requirement) => {
        dispatch({ type: "ADD_REQ", requirement });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteRequirement = (id) => {
  return (dispatch) => {
    axios.delete(`${url}/requirements/${id}`, setHeaders()).then(() => {
      dispatch({ type: "DELETE_REQ", id });
    });
  };
};

export const editRequirement = (requirement) => {
  return (dispatch) => {
    axios
      .put(
        `${url}/requirements/${requirement._id}`,
        { text: requirement.text, projectId: requirement.projectId },
        setHeaders()
      )
      .then((requirement) => {
        dispatch({ type: "EDIT_REQ", requirement });
      });
  };
};

export const satisfyRequirement = (requirement) => {
  return (dispatch) => {
    axios
      .patch(`${url}/requirements/${requirement._id}`, {},setHeaders())
      .then((requirement) => {
        dispatch({ type: "EDIT_REQ", requirement });
      });
  };
};

export const clearRequirementState = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_REQS" });
  };
};
