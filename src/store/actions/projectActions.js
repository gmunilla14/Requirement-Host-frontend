import axios from "axios";
import { url, setHeaders } from "../../api";

export const getProjects = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`${url}/projects`, setHeaders())
      .then((projects) => {
        dispatch({
          type: "GET_PROJS",
          projects,
        });
      })
      .then(() => {
        dispatch({ type: "DONE" });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const addProject = (project) => {
  return (dispatch) => {
    axios
      .post(`${url}/projects`, { ...project })
      .then((project) => {
        dispatch({ type: "ADD_PROJ", project });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const ownerEditProject = (project) => {
  return (dispatch) => {
    axios
      .put(
        `${url}/projects/owner/${project._id}`,
        {
          name: project.name,
          description: project.description,
          link: project.link,
          figmaLink: project.figmaLink,
          collaborators: project.collaborators,
        },
        setHeaders()
      )
      .then((project) => {
        dispatch({ type: "EDIT_PROJ", project });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const collaboratorEditProject = (project) => {
  return (dispatch) => {
    axios
      .put(
        `${url}/projects/collaborator/${project._id}`,
        { link: project.link, figmaLink: project.figmaLink, collaborators: project.collaborators },
        setHeaders()
      )
      .then((project) => {
        dispatch({ type: "EDIT_PROJ", project });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const deleteProject = (project) => {
  return (dispatch) => {
    axios
      .delete(`${url}/projects/${project._id}`, setHeaders())
      .then((project) => {
        dispatch({ type: "DELETE_PROJ", project });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
