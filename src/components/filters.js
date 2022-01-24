import "../styles.css";
import { Container, Dropdown, Row } from "react-bootstrap";
import { getProjects } from "../store/actions/projectActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IoMdBriefcase } from "react-icons/io";
import { MdFormatListBulleted } from "react-icons/md";

const Filters = ({ setFilterCategory, setFilterProject }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);


  const onProjectChange = (e) => {
    if (!(e === "allProjects")) {
      setFilterProject(e);
    } else {
      setFilterProject("");
    }
  };

  const onCategoryChange = (e) => {
    if (!(e === "allCategories")) {
      setFilterCategory(e);
    } else {
      setFilterCategory("");
    }
  };

  return (
    <>
      <Container>
        <Row xs="auto" className="dropdown-row">
          <Dropdown className="req-dropdown" onSelect={onProjectChange}>
            <Dropdown.Toggle className="req-dropdown-toggle">
              <IoMdBriefcase className="briefcase" /> Project
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="allProjects">All Projects</Dropdown.Item>
              {projects.length !== 0 && (
                <Dropdown.Divider style={{ background: "black" }} />
              )}
              {projects &&
                projects.map((project) => {
                  return (
                    <Dropdown.Item key={project._id} eventKey={project.name}>
                      {project.name}
                    </Dropdown.Item>
                  );
                })}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="req-dropdown" onSelect={onCategoryChange}>
            <Dropdown.Toggle className="req-dropdown-toggle">
              <MdFormatListBulleted className="bullets" /> Category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="allCategories">
                All Categories
              </Dropdown.Item>
              {categories.length !== 0 && (
                <Dropdown.Divider style={{ background: "black" }} />
              )}
              {categories &&
                categories.map((category) => {
                  return (
                    <Dropdown.Item
                      eventKey={category.catId}
                      key={category.catId}
                    >
                      {category.text}
                    </Dropdown.Item>
                  );
                })}
            </Dropdown.Menu>
          </Dropdown>
        </Row>
      </Container>
    </>
  );
};

export default Filters;
