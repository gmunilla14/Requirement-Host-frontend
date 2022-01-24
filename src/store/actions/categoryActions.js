import axios from "axios";
import { url, setHeaders } from "../../api";

export const getCategories = (catIds) => {
  return (dispatch) => {
    axios
      .post(`${url}/categories/get`, catIds, setHeaders())
      .then((categories) => {
        dispatch({
          type: "GET_CATEGORIES",
          categories,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addCategory = (category) => {
  return (dispatch) => {
    axios
      .post(`${url}/categories`, { ...category }, setHeaders())
      .then((category) => {
        dispatch({ type: "ADD_CATEGORY" }, category);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
