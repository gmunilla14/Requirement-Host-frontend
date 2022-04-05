import { useSelector } from "react-redux";
import Project from "./project";
import { useState } from "react";

const Projects = ({ query }) => {
  const auth = useSelector((state) => state.auth);
  var projects = useSelector((state) => state.projects);


  //Change statuse of size of screen based on width
  const [largeScreen, setLargeScreen] = useState(true);

  window.addEventListener("resize", () => {
    var width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
    if (width > 768) {
      setLargeScreen(true);
    } else {
      setLargeScreen(false);
    }
  });


  //Filter projects based on query
  if (!(query === "")) {
    projects = projects.filter((project) => project.name.includes(query));
  }

  //Split up projects into owned or collaborated
  var ownedProjects = [];
  var collaboratorProjects = [];

  projects.forEach((project) => {
    if (project.uid === auth._id) {
      ownedProjects.push(project);
    } else {
      collaboratorProjects.push(project);
    }
  });

  return (
    <>
      <div className="projects-holder">
        {ownedProjects.map((project) => {
          return (
            <Project
              project={project}
              key={project._id}
              largeScreen={largeScreen}
            />
          );
        })}
      </div>
      {collaboratorProjects.length !== 0 && (
        <>
          <div className="collab-project-divider"></div>
          <div
            className="project-page-title"
            style={{ marginTop: "4rem", marginBottom: "1rem" }}
          >
            Collaborator Projects
          </div>
        </>
      )}
      {collaboratorProjects && (
        <div className="projects-holder">
          {collaboratorProjects.map((project) => {
            return (
              <Project
                project={project}
                key={project._id}
                largeScreen={largeScreen}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Projects;
