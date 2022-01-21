import { useDispatch } from "react-redux";
import { clearRequirementState } from "../store/actions/requirementActions";
import { signOut } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import { clearSettingsState } from "../store/actions/settingActions";

const Popup = ({ username }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    navigate("/signin");
    dispatch(signOut());
    dispatch(clearRequirementState());
    dispatch(clearSettingsState());
  };
  return (
    <div className="popup-holder">
      <div className="popup"></div>
      <div className="popup-content">
        <div className="popup-welcome">Welcome,</div>
        <div className="popup-username">{username}</div>
        <div className="popup-divider"></div>
        <button className="add-reqs logout-button" onClick={handleSignOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Popup;
