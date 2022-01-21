import { Row, Col, Form } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../store/actions/projectActions";
import { useEffect } from "react";
import {
  deleteRequirement,
  editRequirement,
} from "../../store/actions/requirementActions";
import { useState } from "react";
import { satisfyRequirement } from "../../store/actions/requirementActions";
import { RiPencilFill } from "react-icons/ri";
import { BsCheckLg } from "react-icons/bs";
import Pill from "../pill";

const Requirement = ({ requirement, setRequirement }) => {
  const [editingText, setEditingText] = useState(false);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleDelete = (id) => {
    dispatch(deleteRequirement(id));
  };

  const onEditClick = () => {
    setEditingText(!editingText);
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      requirement = { ...requirement, text: e.target.value };
      dispatch(editRequirement(requirement));
      setEditingText(!editingText);
    }
  };

  const onCheckClick = (e) => {
    const text = document.getElementById("edit_req").value;
    requirement = { ...requirement, text: text };
    dispatch(editRequirement(requirement));
    setEditingText(!editingText);
  };

  const handleSatisfyClick = () => {
    requirement = { ...requirement, isSatisfied: !requirement.isSatisfied };
    dispatch(satisfyRequirement(requirement));
  };
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  var reqProject = {};
  const projects = useSelector((state) => state.projects);
  if (projects) {
    reqProject = projects.filter(
      (project) => project._id === requirement.projectId
    )[0];
  }

  var reqCategory = "";
  if (!(requirement.categoryId === "")) {
    reqCategory = categories.filter((category) => {
      return category.catId === requirement.categoryId;
    })[0];
  }

  let ogUser = false;
  if (reqProject !== undefined) {
    if (reqProject.uid === auth._id) {
      ogUser = true;
    }
  }

  return (
    <tr className="reqRow">
      <td>{requirement.reqId}</td>
      <td className="align-items-center tableCell" style={{ zIndex: "1000" }}>
        <Row className="btn-holder">
          <Col className="req-text">
            {editingText && ogUser ? (
              <Form.Control
                id="edit_req"
                type="text"
                defaultValue={requirement.text}
                onKeyPress={handleKeyPress}
              ></Form.Control>
            ) : (
              requirement.text
            )}
          </Col>
          <Col
            xs="auto"
            className="btn-col justify-content-center align-items-center text-center"
          >
            {ogUser && (
              <>
                {editingText ? (
                  <div className="check-icon" onClick={onCheckClick}>
                    <BsCheckLg className="check" />
                  </div>
                ) : (
                  <div className="edit-icon">
                    <RiPencilFill
                      onClick={() => {
                        onEditClick(requirement);
                      }}
                      className="edit-pencil"
                    ></RiPencilFill>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </td>
      <td>
        <div className="req-project-holder">
          <a href="/projects" className="projectLink">
            {!(projects.length === 0) ? reqProject.name : ""}
          </a>
        </div>
      </td>
      <td>
        <div className="req-project-holder" style={{fontSize: "12px"}}>
        {ogUser ? "OWNER" : "COLLABORATOR"}
        </div>
      </td>
      <td className="category-column">
        {reqCategory !== undefined ? (
          <Pill text={reqCategory.text} color={reqCategory.color} />
        ) : (
          ""
        )}
      </td>
      <td className="table-check">
        <div className="check-holder">
          <div className="check-box" onClick={handleSatisfyClick}>
            {requirement.isSatisfied && <div className="inner-box"></div>}
          </div>
        </div>
      </td>
      <td className="deleteBtn">
        {ogUser && (
          <BsTrashFill
            className="deleteIcon"
            onClick={() => handleDelete(requirement._id)}
          ></BsTrashFill>
        )}
      </td>
    </tr>
  );
};

export default Requirement;
