import { AiOutlineClose } from "react-icons/ai";

const Collab = ({
  username,
  role,
  color,
  editable,
  project,
  setProject,
  editingCollabSet,
  setEditingCollabSet,
}) => {
  var textColor = "#ffffff";

  //Get color value and calculate text color value
  if (color !== undefined) {
    const redString = color.substring(1, 3);
    const greenString = color.substring(3, 5);
    const blueString = color.substring(5, 7);

    let red = parseInt(redString, 16);
    let green = parseInt(greenString, 16);
    let blue = parseInt(blueString, 16);

    if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
      textColor = "#000000";
    } else {
      textColor = "#ffffff";
    }
  }

  return (
    <div className="collab">
      <div
        className="user-circle no-select"
        style={{ border: "none", background: color }}
      >
        <div
          className="user-circle-text"
          style={{ paddingTop: "0.2rem", color: textColor }}
        >
          {username.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="collab-text">
        <div className="collab-username">{username}</div>
        <div className="collab-role">{role}</div>
      </div>
      {editable && (
        <AiOutlineClose
          onClick={() => {
            let newCollabs = project.collaborators.filter(
              (user) => user !== username
            );
            setProject({ ...project, collaborators: newCollabs });
            setEditingCollabSet(
              editingCollabSet.filter((user) => user.name !== username)
            );
          }}

          className="collab-x"
        />
      )}
    </div>
  );
};

export default Collab;
