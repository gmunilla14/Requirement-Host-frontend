import { useSelector, useDispatch } from "react-redux";
import Projects from "../components/projects/projects";
import AddProject from "../components/projects/addProject";
import NavBar from "../components/navBar";
import Loading from "./loading";
import { Navigate } from "react-router-dom";

const ProjectPage = ({ setQuery, query }) => {
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading);

  //Go to signin page if not authenticated
  if (!auth.token) {
    return <Navigate replace to="/signin" />;
  }

  console.log("Loading");
  return (
    <div>
      {loading === 0 ? (
        <>
          <NavBar setQuery={setQuery} />
          <div className="project-page-holder" id="project-page">
            <div className="project-page-header">
              <div className="project-page-title">Projects</div>
              <AddProject />
            </div>

            <Projects query={query} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProjectPage;
