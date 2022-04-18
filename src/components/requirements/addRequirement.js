import { Form, Modal, Col, Dropdown } from "react-bootstrap";
import { useState } from "react";
import { addRequirement } from "../../store/actions/requirementActions";
import { useDispatch, useSelector } from "react-redux";
import "../../styles.css";
import { FiPlus } from "react-icons/fi";
import { IoMdBriefcase } from "react-icons/io";
import { MdFormatListBulleted } from "react-icons/md";
import { addCategory } from "../../store/actions/categoryActions";
import { v4 as uuidv4 } from "uuid";
import TextInput from "../textInput";

const AddRequirement = () => {
  const dispatch = useDispatch();

  //Load state
  let projects = useSelector((state) => state.projects);
  const auth = useSelector((state) => state.auth);
  let cats = useSelector((state) => state.categories);

  //Filter categories and projects to only show ones created by the user
  cats = cats.filter((category) => category.uid === auth._id);
  projects = projects.filter((project) => project.uid === auth._id);

  //Initialize new object states
  const [requirement, setRequirement] = useState({
    text: "",
    isSatisfied: false,
    categoryId: "",
    projectPrefix: "",
  });

  //Used for adding a new category
  const [newCategory, setNewCategory] = useState({
    text: "",
    color: "",
  });

  //Used for choosing an existing category
  const [currentCat, setCurrentCat] = useState({
    text: "",
    color: "",
  });

  const [currentProjName, setCurrentProjName] = useState("");

  //Error states
  const [requirementError, setRequirementError] = useState(false);
  const [noProjectError, setNoProjectError] = useState(false);
  const [maxRequirementError, setMaxRequirementError] = useState(false);
  const [colorError, setColorError] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showNewCat, setShowNewCat] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  //When category changes
  const onCatChange = (e) => {
    //If adding new category
    if (e === "+ Add New Category") {
      setShowNewCat(true);
    } else if (e === "--blank--") {
      setCurrentCat({
        text: "",
        color: "",
      });
      setShowNewCat(false);
      setRequirement({ ...requirement, categoryId: "" });
    } else {
      setShowNewCat(false);
      setCurrentCat(
        cats.filter((category) => {
          return category.text === e;
        })[0]
      );
    }
  };

  //Set new category value
  const onCatTextChange = (e) => {
    setNewCategory({ ...newCategory, text: e.target.value });
  };

  const onColorChange = (e) => {
    setNewCategory({ ...newCategory, color: e.target.value });
    setColorError(false)
  };

  const onProjectChange = (e) => {
    const chosenProj = projects.filter((project) => {
      return project.name === e;
    })[0];
    setRequirement({ ...requirement, projectPrefix: chosenProj.prefix });
    setCurrentProjName(e);
    setNoProjectError(false);
  };

  const handleSubmit = (e) => {
    var newReq = {};

    //Error handling
    let error = false;
    if (requirement.text === "") {
      setRequirementError(true);
      error = true;
    }
    if (requirement.projectPrefix === "") {
      setNoProjectError(true);
      error = true;
    }

    if (maxRequirementError) {
      error = true;
    }
    if (!newCategory.color && showNewCat) {
      setColorError(true)
      error = true;
    }
    if (error) return;

    //If adding a new category
    if (showNewCat) {
      //Create catID
      const catId = uuidv4().toString();

      //Add category to new requirement and create category
      newReq = { ...requirement, categoryId: catId };
      dispatch(addCategory({ ...newCategory, catId: catId, uid: auth._id }));
    } else {
      //Add currently chosen category to requirement
      newReq = {
        ...requirement,
        categoryId: currentCat.catId,
      };
    }
    dispatch(addRequirement(newReq));

    setRequirement({
      text: "",
      isSatisfied: false,
      categoryId: "",
    });
    setCurrentCat({ text: "", category: "" });
    setNewCategory({ text: "", category: "" });
    setCurrentProjName("");
    handleClose();
  };

  return (
    <div>
      <button className="add-reqs" onClick={handleShow}>
        <FiPlus className="plus" /> Add New
      </button>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Requirement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-req-modal-body-holder">
            <Form noValidate autoComplete="off">
              {/*---------------Requirement Project Input----------*/}
              <Form.Group className="add-modal-form">
                <div className="project-modal">
                  <Dropdown
                    className="req-dropdown"
                    onSelect={onProjectChange}
                    required
                  >
                    <Dropdown.Toggle
                      className={
                        noProjectError
                          ? "req-dropdown-toggle error"
                          : "req-dropdown-toggle"
                      }
                    >
                      <IoMdBriefcase className="briefcase" />
                      {currentProjName === "" ? "Project" : currentProjName}
                    </Dropdown.Toggle>
                    {noProjectError && (
                      <div className="error-message">Choose a project</div>
                    )}
                    <Dropdown.Menu id="proj-dropdown">
                      {projects &&
                        projects.map((project) => {
                          return (
                            <Dropdown.Item
                              key={project.name}
                              eventKey={project.name}
                            >
                              {project.name}
                            </Dropdown.Item>
                          );
                        })}
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="add-proj-text">
                    To add projects, go to the <a href="/projects">Projects</a>{" "}
                    page
                  </div>
                </div>

                {/*---------------Requirement Category Input----------*/}
                <div className="cat-modal-holder">
                  <Dropdown
                    className="req-dropdown cat-modal"
                    onSelect={onCatChange}
                  >
                    <Dropdown.Toggle className="req-dropdown-toggle">
                      <MdFormatListBulleted className="bullets" />
                      {showNewCat
                        ? "Category"
                        : currentCat.text === ""
                        ? "Category"
                        : currentCat.text}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {cats &&
                        cats.map((category) => {
                          return (
                            <Dropdown.Item
                              eventKey={
                                category.text === "" ? "blank" : category.text
                              }
                              key={category.catId}
                            >
                              {category.text === ""
                                ? "--blank--"
                                : category.text}
                            </Dropdown.Item>
                          );
                        })}
                      {cats.length !== 0 && (
                        <Dropdown.Divider style={{ background: "black" }} />
                      )}
                      <Dropdown.Item eventKey={"--blank--"}>
                        --blank--
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={"+ Add New Category"}>
                        + Add New Category
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {showNewCat && (
                    <Col>
                      <Form.Group>
                        <div
                          style={
                            !colorError
                              ? { display: "flex", marginTop: "-1rem" }
                              : { display: "flex", marginTop: "0rem" }
                          }
                        >
                          <TextInput
                            title=""
                            type="text"
                            value={newCategory.text}
                            setValue={onCatTextChange}
                            error={
                              colorError &&
                              "Choose color when creating category"
                            }
                          />
                          <input
                            type="color"
                            onChange={onColorChange}
                            style={{
                              marginTop: "1.2rem",
                              marginLeft: "0.5rem",
                            }}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  )}
                </div>
              </Form.Group>

              {/*---------------Requirement Text Input----------*/}
              {requirementError || maxRequirementError ? (
                <TextInput
                  title={"Requirement Text"}
                  type="text"
                  value={requirement.text}
                  characters={requirement.text.length}
                  max={250}
                  setValue={(e) => {
                    if (e.target.value !== "") {
                      setRequirementError(false);
                    }
                    if (e.target.value.length > 250) {
                      setMaxRequirementError(true);
                    } else {
                      setMaxRequirementError(false);
                    }
                    setRequirement({ ...requirement, text: e.target.value });
                  }}
                  error={
                    requirementError
                      ? "Requirement must have text."
                      : "Requirement text can have max 250 characters"
                  }
                />
              ) : (
                <TextInput
                  title={"Requirement Text"}
                  type="text"
                  characters={requirement.text.length}
                  max={250}
                  setValue={(e) => {
                    if (e.target.value.length > 250) {
                      setMaxRequirementError(true);
                    } else {
                      setMaxRequirementError(false);
                    }
                    setRequirement({ ...requirement, text: e.target.value });
                  }}
                  value={requirement.text}
                />
              )}

              <div className="add-button-modal-holder">
                <div
                  className="add-reqs-modal"
                  onClick={handleSubmit}
                  style={{
                    width: "12.5rem",
                    paddingLeft: "0.3125rem",
                    cursor: "pointer",
                  }}
                >
                  <FiPlus className="plus" /> Add New Requirement
                </div>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddRequirement;
