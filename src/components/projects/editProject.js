import { Modal } from "react-bootstrap";
import { useState } from "react";
import TextInput from "../textInput";
import { Form } from "react-bootstrap";
import { BsCheckLg } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import { BsTrashFill } from "react-icons/bs";
import Collab from "../collab";
import axios from "axios";
import { url } from "../../api";
import { useSelector } from "react-redux";
import {
  ownerEditProject,
  collaboratorEditProject,
  deleteProject,
} from "../../store/actions/projectActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const EditProject = ({
  inputProject,
  owner,
  collaboratorSet,
  setCollaboratorSet,
}) => {
  const auth = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const dispatch = useDispatch();

  const [project, setProject] = useState(inputProject);

  const [collabUsername, setCollabUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState("");
  const [editingCollabSet, setEditingCollabSet] = useState(collaboratorSet);

  //Error states
  const [noProjectError, setNoProjectError] = useState(false);
  const [maxNameError, setMaxNameError] = useState(false);
  const [maxDescriptionError, setMaxDescriptionError] = useState(false);
  const [maxGithubError, setMaxGithubError] = useState(false);
  const [maxFigmaError, setMaxFigmaError] = useState(false);
  const [repeatCollabError, setRepeatCollabError] = useState(false);
  const [wrongCollabError, setWrongCollabError] = useState(false);

  useEffect(() => {
    setEditingCollabSet(collaboratorSet);
  }, [collaboratorSet]); //eslint-disable-line react-hooks/exhaustive-deps

  let status = "collaborator";
  if (owner.name === auth.name) {
    status = "owner";
  } else {
    status = "collaborator";
  }

  const onEditProject = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCheckUsername = (username) => {
    axios.get(`${url}/auth/${username}`).then((exist) => {
      if (exist.data) {
        setUsernameStatus("valid");
        setCollabUsername({ ...collabUsername, color: exist.data });
      } else {
        setUsernameStatus("invalid");
        setWrongCollabError(true);
      }
    });
  };

  const handleAddCollaborator = (username) => {
    if (
      !editingCollabSet.filter(
        (collaborator) => collaborator.name === username.name
      ).length > 0 &&
      username.name !== owner.name
    ) {
      let newCollabs = project.collaborators;
      newCollabs.push(username.name);
      setProject({
        ...project,
        collaborators: newCollabs,
      });

      setEditingCollabSet((editingCollabSet) => [
        ...editingCollabSet,
        { name: username.name, color: username.color },
      ]);

      setCollabUsername({
        ...collabUsername,
        name: "",
      });
      setUsernameStatus("");
    } else {
      setRepeatCollabError(true);
    }
  };

  const handleSubmit = () => {
    if (status === "owner") {
      let error = false;

      if (maxNameError) error = true;

      if (project.name === "") {
        error = true;
        setNoProjectError(true);
      }

      if (maxDescriptionError) error = true;
      if (maxGithubError) error = true;

      if (maxFigmaError) error = true;

      if (error) return;

      const newProject = {
        name: project.name,
        description: project.description,
        link: project.link,
        figmaLink: project.figmaLink,
        collaborators: project.collaborators,
        _id: project._id,
      };
      inputProject = newProject;
      setCollaboratorSet(project.collaborators);
      dispatch(ownerEditProject(newProject));
    } else {
      const newValues = {
        link: project.link,
        figmaLink: project.figmaLink,
        _id: project._id,
        collaborators: project.collaborators,
      };

      dispatch(collaboratorEditProject(newValues));
    }

    handleClose();
  };

  const handleDeleteProject = () => {
    dispatch(deleteProject(project));
  };

  return (
    <div>
      <div className="edit-project-btn" onClick={onEditProject}>
        Edit
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title className="add-proj-title">Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate autoComplete="off">
            <div className="add-project-modal-body-holder">
              {status === "owner" ? (
                <>
                  {noProjectError || maxNameError ? (
                    <TextInput
                      title={"Name"}
                      type="text"
                      value={project.name}
                      characters={project.name.length}
                      max={100}
                      setValue={(e) => {
                        if (e.target.value !== "") {
                          setNoProjectError(false);
                        }
                        if (e.target.value.length > 100) {
                          setMaxNameError(true);
                        } else {
                          setMaxNameError(false);
                        }
                        setProject({ ...project, name: e.target.value });
                      }}
                      error={
                        noProjectError
                          ? "Project must have name"
                          : "Project name can have max 100 characters"
                      }
                    />
                  ) : (
                    <TextInput
                      title={"Name"}
                      type="text"
                      value={project.name}
                      characters={project.name.length}
                      max={100}
                      setValue={(e) => {
                        if (e.target.value !== "") {
                          setNoProjectError(false);
                        }
                        if (e.target.value.length > 100) {
                          setMaxNameError(true);
                        } else {
                          setMaxNameError(false);
                        }
                        setProject({ ...project, name: e.target.value });
                      }}
                    />
                  )}
                </>
              ) : (
                <div className="text-input-holder">
                  <div className="input-header-holder">
                    <div className="input-header">Name</div>
                  </div>
                  <>
                    <div className="blocked-input">{project.name}</div>
                  </>
                </div>
              )}
              {status === "owner" ? (
                <TextInput
                  title={"Description"}
                  type="text"
                  value={project.description}
                  characters={project.description.length}
                  max={400}
                  setValue={(e) => {
                    if (e.target.value.length > 400) {
                      setMaxDescriptionError(true);
                    } else {
                      setMaxDescriptionError(false);
                    }
                    setProject({ ...project, description: e.target.value });
                  }}
                  error={
                    maxDescriptionError
                      ? "Project description can have max 400 characters"
                      : ""
                  }
                />
              ) : (
                <>
                  <div className="input-header-holder">
                    <div className="input-header">Description</div>
                  </div>
                  <>
                    <div className="blocked-input">{project.description}</div>
                  </>
                </>
              )}

              <TextInput
                title={"Github Link"}
                type="url"
                value={project.link}
                characters={project.link.length}
                max={100}
                setValue={(e) => {
                  if (e.target.value.length > 100) {
                    setMaxGithubError(true);
                  } else {
                    setMaxGithubError(false);
                  }
                  setProject({ ...project, link: e.target.value });
                }}
                error={
                  maxGithubError
                    ? "Github link can have max 100 characters"
                    : ""
                }
              />
              <div className="text-input-holder">
                <div className="input-header-holder">
                  <div className="input-header">Prefix</div>
                </div>
                <>
                  <div className="blocked-input">{project.prefix}</div>
                </>
              </div>

              <TextInput
                title={"Figma Link"}
                type="url"
                value={project.figmaLink}
                characters={
                  project.figmaLink !== undefined ? project.figmaLink.length : 0
                }
                max={100}
                setValue={(e) => {
                  if (e.target.value.length > 100) {
                    setMaxFigmaError(true);
                  } else {
                    setMaxFigmaError(false);
                  }
                  setProject({ ...project, figmaLink: e.target.value });
                }}
                error={
                  maxFigmaError ? "Figma link can have max 100 characters" : ""
                }
              />
              {status === "owner" ? (
                <div className="collab-input">
                  {wrongCollabError || repeatCollabError ? (
                    <TextInput
                      title={"Collaborators"}
                      type="text"
                      value={collabUsername.name}
                      setValue={(e) => {
                        setUsernameStatus("");
                        setCollabUsername({
                          ...collabUsername,
                          name: e.target.value,
                        });
                        setWrongCollabError(false);
                        setRepeatCollabError(false);
                      }}
                      error={
                        wrongCollabError
                          ? "Invalid user. Try again"
                          : "Cannot repeat users. Choose another"
                      }
                    />
                  ) : (
                    <TextInput
                      title={"Collaborators"}
                      type="text"
                      value={collabUsername.name}
                      setValue={(e) => {
                        setUsernameStatus("");
                        setCollabUsername({
                          ...collabUsername,
                          name: e.target.value,
                        });
                      }}
                    />
                  )}

                  {usernameStatus !== "valid" ? (
                    <div
                      className="collab-button"
                      onClick={() => {
                        handleCheckUsername(collabUsername.name);
                      }}
                    >
                      Validate
                    </div>
                  ) : (
                    <div
                      className="collab-button"
                      onClick={() => {
                        handleAddCollaborator(collabUsername);
                      }}
                    >
                      Add User
                    </div>
                  )}

                  {usernameStatus === "valid" && (
                    <div className="valid-circle">
                      <BsCheckLg className="valid-check" />
                    </div>
                  )}
                  {usernameStatus === "invalid" && (
                    <div className="invalid-circle">
                      <RiCloseLine className="invalid-x" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-input-holder">
                  <div className="input-header-holder">
                    <div className="input-header">Collaborators</div>
                  </div>
                  <>
                    <div className="blocked-input"></div>
                  </>
                </div>
              )}

              <div className="collab-holder">
                <Collab
                  username={owner.name}
                  role="Owner"
                  color={owner.color}
                />

                {project.collaborators.map((collaborator) => {
                  if (editingCollabSet.length !== 0) {
                    let color = editingCollabSet.filter((collab) => {
                      return collab.name === collaborator;
                    })[0];

                    if (color !== undefined) {
                      color = color.color;
                    } else {
                      color = "#000000";
                    }
                    return (
                      <Collab
                        username={collaborator}
                        role="Collaborator"
                        key={collaborator}
                        color={color}
                        editable={
                          status === "owner" || auth.name === collaborator
                        }
                        project={project}
                        setProject={setProject}
                        editingCollabSet={editingCollabSet}
                        setEditingCollabSet={setEditingCollabSet}
                      />
                    );
                  } else {
                    return <div key={Math.random()}></div>;
                  }
                })}
              </div>
              <div className="edit-button-holder">
                <div className="add-button-modal-holder">
                  <div
                    className="add-reqs-modal"
                    style={{
                      paddingRight: "0.5rem",
                      cursor: "pointer",
                      paddingLeft: "0.5rem",
                    }}
                    onClick={handleSubmit}
                  >
                    Save Project
                  </div>
                </div>

                {status === "owner" && (
                  <div className="add-button-modal-holder">
                    <div
                      className="delete-project-holder"
                      style={{
                        paddingRight: "0.5rem",
                        cursor: "pointer",
                        paddingLeft: "0.5rem",
                      }}
                      onClick={() => setShowDeleteAlert(true)}
                    >
                      <BsTrashFill className="delete-project-icon" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showDeleteAlert}
        onHide={() => {
          setShowDeleteAlert(!showDeleteAlert);
        }}
        className="delete-alert-modal"
      >
        <div className="delete-alert-modal-bg"></div>
        <div className="delete-alert-modal-content">
          <div className="delete-alert-title">Warning!</div>
          <div className="delete-alert-text">
            Deleting this project will also delete all of its requirements.
          </div>
          <div className="delete-alert-text">
            This cannot be undone! Would you like to continue?
          </div>
          <div className="edit-button-holder" style={{ marginRight: "10px" }}>
            <div className="add-button-modal-holder">
              <div
                className="delete-project-holder"
                style={{
                  paddingRight: "0.5rem",
                  cursor: "pointer",
                  paddingLeft: "0.5rem",
                  marginRight: "1rem",
                }}
                onClick={() => handleDeleteProject()}
              >
                Yes, Delete
              </div>
            </div>
            <div className="add-button-modal-holder">
              <div
                className="add-reqs-modal"
                style={{
                  paddingRight: "0.5rem",
                  cursor: "pointer",
                  paddingLeft: "0.5rem",
                }}
                onClick={() => setShowDeleteAlert(false)}
              >
                No
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditProject;
