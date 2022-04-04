import axios from "axios";
import { url } from "../../api/index";
import { getProjects } from "./projectActions";
import { getRequirements } from "./requirementActions";
import { getSettings } from "./settingActions";

export const signUp = (user) => {
  return (dispatch) => {
    axios
      .post(`${url}/auth/signup`, user)
      .then((token) => {
        //Put loaded token into local storage
        localStorage.setItem("token", token.data);
        dispatch({
          type: "SIGN_UP",
          token: token.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const signIn = (creds, setErrorMessage) => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_LOADER" });
    dispatch({ type: "LOADING" });

    axios
      .post(`${url}/auth/signin`, creds)
      .then((token) => {
        //Put loaded token into local storage
        localStorage.setItem("token", token.data);
        dispatch({
          type: "SIGN_IN",
          token: token.data,
        });
      })
      .then(() => {
        dispatch(getRequirements());
        dispatch(getProjects());
        dispatch(getSettings());
      })
      .then(() => {
        dispatch({ type: "DONE" });
      })
      .catch((error) => {
        setErrorMessage(error.response);
      });
  };
};

//
export const loadUser = () => {
  //Use getState middleware to access redux state in action
  return (dispatch, getState) => {
    //Get token from state
    const token = getState().auth.token;
    if (token) {
      dispatch({
        type: "USER_LOADED",
        token,
      });
    } else return null;
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "SIGN_OUT",
    });
  };
};
