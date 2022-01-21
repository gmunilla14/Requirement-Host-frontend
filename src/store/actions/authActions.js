import axios from "axios";
import { url } from "../../api/index";

export const signUp = (user) => {
  return (dispatch) => {
    axios
      .post(`${url}/auth/signup`, user)
      .then((token) => {
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
    axios
      .post(`${url}/auth/signin`, creds)
      .then((token) => {
        localStorage.setItem("token", token.data);
        dispatch({
          type: "SIGN_IN",
          token: token.data,
        });
      })
      .catch((error) => {
        setErrorMessage(error.response);
      });
  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
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

