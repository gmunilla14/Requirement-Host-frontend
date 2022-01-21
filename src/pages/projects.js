import { useSelector, useDispatch } from "react-redux";
import Projects from "../components/projects/projects";
import NavigationWindow from "../components/navigationWindow";
import AddProject from "../components/projects/addProject";
import NavBar from "../components/navBar";
import { getSettings } from "../store/actions/settingActions";
import { useEffect } from "react";

const ProjectPage = ({setQuery, query}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSettings());
  }, []); //eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div>
      {auth._id ? (
        <>
          <NavBar setQuery={setQuery} />
          <div className="project-page-holder" id="project-page">
            <div className="project-page-header">
              <div className="project-page-title">Projects</div>
              <AddProject />
            </div>

            <Projects query={query}/>
          </div>
        </>
      ) : (
        <NavigationWindow
          navPath="/signin"
          message="You need to be signed in to view projects!"
        />
      )}
    </div>
  );
};

export default ProjectPage;
