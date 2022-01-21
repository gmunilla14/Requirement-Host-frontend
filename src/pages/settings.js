import { useSelector } from "react-redux";
import NavigationWindow from "../components/navigationWindow";
import Setting from "../components/setting";
import SwitchToggle from "../components/switchToggle";
import { editSettings } from "../store/actions/settingActions";
import { useDispatch } from "react-redux";
import NavBar from "../components/navBar";
import { getSettings } from "../store/actions/settingActions";
import { getCategories } from "../store/actions/categoryActions";
import { useEffect } from "react";

const Settings = () => {
  const auth = useSelector((state) => state.auth);
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  var darkMode = "";
  if (settings.darkMode === "light") {
    darkMode = "left";
  } else if (settings.darkMode === "dark") {
    darkMode = "right";
  }

  useEffect(() => {
    dispatch(getSettings());
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getCategories());
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const onDarkModeClick = (settings) => {
    let newSettings = settings;
    if (settings.darkMode === "light") {
      newSettings = { ...newSettings, darkMode: "dark" };
    } else {
      newSettings = { ...newSettings, darkMode: "light" };
    }

    dispatch(editSettings(newSettings));
  };

  const handleSetUserColor = () => {
    const color = document.getElementById("settings-user-color").value;
    let newSettings = { ...settings, color: color };
    dispatch(editSettings(newSettings));
  };
  return (
    <>
      {auth._id ? (
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
                    <input type="color" id="settings-user-color"/>
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
        <NavigationWindow
          navPath="/signin"
          message="You need to be signed in to view user settings!"
        />
      )}
    </>
  );
};

export default Settings;
