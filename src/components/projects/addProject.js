import { Form, Modal, Container } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../store/actions/projectActions";
import { FiPlus } from "react-icons/fi";
import TextInput from "../textInput";
import Collab from "../collab";
import axios from "axios";
import { url } from "../../api";
import { BsCheckLg } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";

const AddProject = () => {
  const dispatch = useDispatch();

  //Get State
  const auth = useSelector((state) => state.auth);
  const projects = useSelector((state) => state.projects);
  const settings = useSelector((state) => state.settings);

  const [showModal, setShowModal] = useState(false);

  //Initialize object state
  const [project, setProject] = useState({
    name: "",
    description: "",
    prefix: "",
    link: "",
    uid: "",
    figmaLink: "",
    collaborators: [],
  });
  const [collabUsername, setCollabUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState("");
  const [collabUsernameSet, setCollabUsernameSet] = useState([]);

  //Error state
  const [noProjectError, setNoProjectError] = useState(false);
  const [maxNameError, setMaxNameError] = useState(false);
  const [maxDescriptionError, setMaxDescriptionError] = useState(false);
  const [maxGithubError, setMaxGithubError] = useState(false);
  const [minPrefixError, setMinPrefixError] = useState(false);
  const [maxPrefixError, setMaxPrefixError] = useState(false);
  const [maxFigmaError, setMaxFigmaError] = useState(false);
  const [repeatPrefixError, setRepeatPrefixError] = useState(false);
  const [repeatCollabError, setRepeatCollabError] = useState(false);
  const [wrongCollabError, setWrongCollabError] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  //Check inputted username to see if someone has it and add color if it does
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

  //Add collaborator to project
  const handleAddCollaborator = (username) => {
    //If the added username is not the owner and doesnt already exist in
    //collaborator list
    if (
      !collabUsernameSet.filter(
        (collaborator) => collaborator.name === username.name
      ).length > 0 &&
      username.name !== auth.name
    ) {
      //Add new username to list of collaborators
      let newCollabs = project.collaborators;
      newCollabs.push(username.name);

      //Update current project list of collaborators
      setProject({
        ...project,
        collaborators: newCollabs,
      });

      //Add collaborator to the set
      setCollabUsernameSet((collaboratorSet) => [
        ...collaboratorSet,
        { name: username.name, color: username.color },
      ]);

      //Clear states
      setUsernameStatus("");
      setCollabUsername({ ...collabUsername, name: "" });
    } else {
      setRepeatCollabError(true);
    }
  };

  const handleSubmit = (e) => {
    //Error handling
    let error = false;

    if (maxNameError) error = true;

    if (project.name === "") {
      error = true;
      setNoProjectError(true);
    }
    if (project.prefix === "") {
      setMinPrefixError(true);
      error = true;
    }

    const samePrefix = projects.filter((p) => {
      return p.prefix === project.prefix;
    });

    if (samePrefix.length > 0) {
      error = true;
      setRepeatPrefixError(true);
    }
    if (maxDescriptionError) error = true;
    if (maxGithubError) error = true;

    if (maxPrefixError) error = true;
    if (minPrefixError) error = true;
    if (maxFigmaError) error = true;

    if (error) return;

    //Create new project
    const newProj = {
      ...project,
      reqNum: 0,
      uid: auth._id,
    };
    dispatch(addProject(newProj));

    setProject({
      name: "",
      description: "",
      prefix: "",
      link: "",
      uid: "",
      figmaLink: "",
    });
    handleClose();
  };

  return (
    <Container>
      <button onClick={handleShow} className="add-reqs">
        <FiPlus className="plus" /> Add New
      </button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title className="add-proj-title">New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate autoComplete="off">
            <div className="add-project-modal-body-holder">
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
              {minPrefixError || maxPrefixError || repeatPrefixError ? (
                <TextInput
                  title={"Prefix"}
                  type="text"
                  value={project.prefix}
                  characters={project.prefix.length}
                  max={3}
                  setValue={(e) => {
                    if (e.target.value.length === 3) {
                      setMinPrefixError(false);
                      setMaxPrefixError(false);
                    } else if (e.target.value.length > 3) {
                      setMaxPrefixError(true);
                    } else {
                      setMinPrefixError(true);
                    }
                    setRepeatPrefixError(false);
                    setProject({ ...project, prefix: e.target.value });
                  }}
                  error={
                    minPrefixError || maxPrefixError
                      ? "Project prefix must be 3 characters"
                      : "Must use a unique prefix"
                  }
                />
              ) : (
                <TextInput
                  title={"Prefix"}
                  type="text"
                  value={project.prefix}
                  characters={project.prefix.length}
                  max={3}
                  setValue={(e) => {
                    if (e.target.value.length === 3) {
                      setMinPrefixError(false);
                      setMaxPrefixError(false);
                    } else if (e.target.value.length > 3) {
                      setMaxPrefixError(true);
                    } else {
                      setMinPrefixError(true);
                    }
                    setRepeatPrefixError(false);
                    setProject({ ...project, prefix: e.target.value });
                  }}
                />
              )}

              <TextInput
                title={"Figma Link"}
                type="url"
                value={project.figmaLink}
                characters={project.figmaLink.length}
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
                      setRepeatPrefixError(false);
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
              <div className="collab-holder">
                <Collab
                  username={auth.name}
                  role="Owner"
                  color={settings.color}
                />
                {project.collaborators !== undefined && (
                  <>
                    {project.collaborators.map((collaborator) => {
                      if (collabUsernameSet.length !== 0) {
                        let color = collabUsernameSet.filter((collab) => {
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
                            editable={true}
                            project={project}
                            setProject={setProject}
                          />
                        );
                      } else {
                        return <></>;
                      }
                    })}
                  </>
                )}
              </div>

              <div className="add-button-modal-holder">
                <div
                  className="add-reqs-modal"
                  style={{ paddingRight: "0.3125rem", cursor: "pointer" }}
                  onClick={handleSubmit}
                >
                  <FiPlus className="plus" /> Add New Project
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AddProject;
