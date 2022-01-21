import axios from "axios";
import { url } from "../../api";
import { setHeaders } from "../../api";

export const getSettings = () => {
  return (dispatch) => {
    axios
      .get(`${url}/settings`, setHeaders())
      .then((settings) => {
        dispatch({
          type: "GET_SETTINGS",
          settings,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const editSettings = (settings) => {
  return (dispatch) => {
    axios
      .put(`${url}/settings`, { ...settings }, setHeaders())
      .then((settings) => {
        dispatch({ type: "EDIT_SETTINGS", settings });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const clearSettingsState = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_SETTINGS" });
  };
};
