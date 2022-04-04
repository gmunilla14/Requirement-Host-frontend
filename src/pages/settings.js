import { useSelector } from "react-redux";
import Setting from "../components/setting";
import SwitchToggle from "../components/switchToggle";
import { editSettings } from "../store/actions/settingActions";
import { useDispatch } from "react-redux";
import NavBar from "../components/navBar";
import Loading from "./loading";
import { Navigate } from "react-router-dom";

const Settings = () => {
  const auth = useSelector((state) => state.auth);
  const settings = useSelector((state) => state.settings);
  const loading = useSelector((state) => state.loading);

  const dispatch = useDispatch();

  //------------------------------------Light/Dark Mode Setting-----------------
  var darkMode = "";
  if (settings.darkMode === "light") {
    darkMode = "left";
  } else if (settings.darkMode === "dark") {
    darkMode = "right";
  }

  const onDarkModeClick = (settings) => {
    let newSettings = settings;
    if (settings.darkMode === "light") {
      newSettings = { ...newSettings, darkMode: "dark" };
    } else {
      newSettings = { ...newSettings, darkMode: "light" };
    }

    dispatch(editSettings(newSettings));
  };

  //Go to signin page if not authenticated
  if (!auth.token) {
    return <Navigate replace to="/signin" />;
  }

  //-------------------------------------Set User Color Setting--------------------------
  const handleSetUserColor = () => {
    const color = document.getElementById("settings-user-color").value;
    let newSettings = { ...settings, color: color };
    dispatch(editSettings(newSettings));
  };

  return (
    <>
      {loading === 0 ? (
        <>
          <NavBar />
          <div className="settings-page-holder">
            <div className="settings-page-title">Settings</div>
            <div className="settings-holder">
              <Setting
                title="Interface"
                description="Switch to dark mode in low light settings to reduce exposure to blue light."
                element={
                  <SwitchToggle
                    left="Light"
                    right="Dark"
                    value={darkMode}
                    clickFunction={() => onDarkModeClick(settings)}
                  />
                }
              />
              <Setting
                title="User Color"
                description="Change the color of your user circle on projects."
                element={
                  <div
                    className="setting-color-holder"
                    style={{ display: "flex" }}
                  >
                    <input type="color" id="settings-user-color" />
                    <div
                      className="setting-color-btn"
                      onClick={handleSetUserColor}
                    >
                      Set
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Settings;
