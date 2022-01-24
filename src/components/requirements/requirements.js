import { Container, Row } from "react-bootstrap";
import Requirement from "./requirement";
import "../../styles.css";
import { useDispatch, useSelector } from "react-redux";
import AddRequirement from "./addRequirement";
import Filters from "../filters";
import { getCategories } from "../../store/actions/categoryActions";

const Requirements = ({
  setRequirement,
  query,
  filterCategory,
  filterProject,
  setFilterCategory,
  setFilterProject,
}) => {
  var requirements = useSelector((state) => state.requirements);
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects);

  if (requirements.length > 0) {
    const allCatIds = requirements.map((requirement) => requirement.categoryId)
    const catIds = allCatIds.filter((value, index, array) => array.indexOf(value)=== index)
    dispatch(getCategories(catIds))
  }


  if (!(query === "")) {
    requirements = requirements.filter((requirement) =>
      requirement.text.includes(query)
    );
  }

  if (!(filterCategory === "")) {
    requirements = requirements.filter((requirement) => {
      return requirement.categoryId === filterCategory;
    });
  }

  if (!(filterProject === "")) {
    const filterProjectId = projects.find(
      (project) => project.name === filterProject
    )._id;

    requirements = requirements.filter(
      (requirement) => requirement.projectId === filterProjectId
    );
  }

  return (
    <div className="reqs-bg">
      <div className="req-holder">
        <Container className="reqHeader">
          <Row xs="auto">
            <h6 className="req-header-element">Requirements</h6>
            <div className="req-header-element">
              <AddRequirement />
            </div>
          </Row>
        </Container>

        <Filters
          setFilterCategory={setFilterCategory}
          setFilterProject={setFilterProject}
        />
        <table className="reqTable">
          <thead className="reqTable-header">
            <tr>
              <th style={{ width: "12.5rem" }}>Req ID</th>
              <th style={{ width: "31.25rem" }}>Description</th>
              <th style={{ width: "15.75rem" }}>Project</th>
              <th style={{ width: "2rem" }}>Role</th>
              <th style={{ width: "9.375rem" }}>Category</th>
              <th style={{ width: "5rem" }}>Satisfied?</th>
              <th className="delete-column">Deleted?</th>
            </tr>
          </thead>
          <tbody className="req-table">
            {requirements.map((requirement) => {
              if (requirement.text.includes(query)) {
                return (
                  <Requirement
                    requirement={requirement}
                    key={requirement._id}
                    setRequirement={setRequirement}
                  />
                );
              } else {
                return <></>;
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requirements;
