import { BsGithub } from "react-icons/bs";
import Collab from "../collab";
import axios from "axios";
import { url } from "../../api";
import { useState } from "react";
import { useEffect } from "react";
import EditProject from "./editProject";
import { FiFigma } from "react-icons/fi";

const Project = ({ project, largeScreen }) => {
  const [showModal, setShowModal] = useState(false);

  //Initialize states
  const [owner, setOwner] = useState({
    name: "",
    color: "",
  });

  const [collaboratorSet, setCollaboratorSet] = useState([]);

  //Get percent of project that has been satisfied
  let percent = 0;
  if (project.reqNum !== 0) {
    percent = Math.round((project.satisfyNum / project.reqNum) * 100);
  }

  //On load
  useEffect(() => {
    //Get username and color of current owner
    axios
      .get(`${url}/auth/username/${project.uid}`)
      .then((data) => {
        setOwner(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    //Make collaborator list unique
    const uniqueCollaborators = project.collaborators.filter(
      (value, index, array) => array.indexOf(value) === index
    );

    //Get color for each collaborator for the project and add them to a list
    uniqueCollaborators.forEach((collaborator) => {
      axios
        .get(`${url}/auth/color/${collaborator}`)
        .then((data) => {
          setCollaboratorSet((collaboratorSet) => [
            ...collaboratorSet,
            { name: collaborator, color: data.data },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="project-card">
        <div className="project-title-holder">
          <div
            className="project-title"
            onClick={() => {
              setShowModal(true);
            }}
            style={{ cursor: "pointer" }}
          >
            {project.name}
          </div>
          <EditProject
            inputProject={project}
            owner={owner}
            collaboratorSet={collaboratorSet}
            setCollaboratorSet={setCollaboratorSet}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>

        <div className="project-sub-holder">
          <a
            className="figma-icon-holder"
            href={project.figmaLink}
            target="_blank"
            rel="noreferrer"
          >
            <div className="github-icon-circle">
              <FiFigma className="github-icon" />
            </div>
          </a>
          <a
            className="github-icon-holder"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            <div className="github-icon-circle">
              <BsGithub className="github-icon" />
            </div>
          </a>
          <div className="project-subheader">Description</div>
          <div className="project-description">{project.description}</div>
        </div>
        <div className="project-divider"></div>
        <div className="project-sub-holder">
          <div className="project-progress-header-holder">
            <div className="project-progress-header">Progress</div>
            <div className="project-progress-numbers">
              {project.satisfyNum}/{project.reqNum} requirements completed (
              {percent}%)
            </div>
          </div>
          <div className="progress-bar-holder">
            <div
              className="progress-bar"
              style={
                largeScreen
                  ? { width: `${(percent * 30) / 100}rem` }
                  : { width: `${(percent * 61.5) / 100}vw` }
              }
            ></div>
          </div>
        </div>

        <div className="collab-holder" style={{ marginLeft: "2.5rem" }}>
          <Collab username={owner.name} role="Owner" color={owner.color} />

          {project.collaborators.map((collaborator) => {
            if (collaboratorSet.length !== 0) {
              let color = collaboratorSet.filter((collab) => {
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
                />
              );
            } else {
              return <div key={Math.random()}></div>;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Project;
