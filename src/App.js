import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import SignUp from "./components/auth/signup";
import SignIn from "./components/auth/signin";
import Settings from "./pages/settings";
import ProjectPage from "./pages/projects";
import { loadUser } from "./store/actions/authActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getRequirements } from "./store/actions/requirementActions";
import { getSettings } from "./store/actions/settingActions";
import { getProjects } from "./store/actions/projectActions";
import "./styles.css";
import { getCategories } from "./store/actions/categoryActions";
import Loading from "./pages/loading";

function App() {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  //Get current user from token if it exists
  useEffect(() => {
    dispatch(loadUser());
    console.log('Loading User')
  });

  //Load requirements
  useEffect(() => {
    dispatch(getRequirements());
    dispatch(getSettings());
    dispatch(getProjects());
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  //Implement dark/light mode
  const root = document.querySelector(":root");
  const settings = useSelector((state) => state.settings);
  if (!(settings.darkMode === null)) {
    if (settings.darkMode === "dark") {
      root.style.setProperty("--light-bg", "#24252d");
      root.style.setProperty("--main-bg", "#1a1a20");
      root.style.setProperty("--heading-text", "#e7e6e9");
      root.style.setProperty("--dropdown-text", "#8b8c95");
      root.style.setProperty("--title-text", "#e7e6e9");
      root.style.setProperty("--nav-heading-bg", "#24252d");
      root.style.setProperty("--unselected-nav-text", "#e7e6e9");
      root.style.setProperty("--req-text", "#8b8c95");
      root.style.setProperty("--input-header-text", "#8b8c95");
      root.style.setProperty("--placeholder-text", "#616161");
      root.style.setProperty("--nav-border", "#151313");
      root.style.setProperty("--nav-title-split", "#151313");
      root.style.setProperty("--editing-icon", "#8b8c95");
      root.style.setProperty("--editing-icon-bg", "#353339");
      root.style.setProperty("--search-placeholder", "#8b8c95");
      root.style.setProperty("--modal-bg", "#1a1a20");
      root.style.setProperty("--bar-holder-color", "#16151a");
      root.style.setProperty("--project-description", "#8b8c95");
      root.style.setProperty("--text-input-bg", "#353339");
      root.style.setProperty("--popup-border-color", "#1f1e24");
    } else {
      root.style.setProperty("--light-bg", "#ffffff");
      root.style.setProperty("--main-bg", "#e5e5e5");
      root.style.setProperty("--heading-text", "#616161");
      root.style.setProperty("--dropdown-text", "#616161");
      root.style.setProperty("--title-text", "#212529");
      root.style.setProperty("--nav-heading-bg", "#ffffff");
      root.style.setProperty("--unselected-nav-text", "#9b9d9e");
      root.style.setProperty("--req-text", "#212529");
      root.style.setProperty("--input-header-text", "#9b9d9e");
      root.style.setProperty("--placeholder-text", "#b8bec3");
      root.style.setProperty("--nav-border", "#e1e5ea");
      root.style.setProperty("--nav-title-split", "#f5f5f5");
      root.style.setProperty("--editing-icon", "#9b9d9e");
      root.style.setProperty("--editing-icon-bg", "#f5f5f5");
      root.style.setProperty("--search-placeholder", "#9b9d9e");
      root.style.setProperty("--modal-bg", "#f5f5f5");
      root.style.setProperty("--bar-holder-color", "#f5f5f5");
      root.style.setProperty("--project-description", "#212529");
      root.style.setProperty("--text-input-bg", "#fdfdfd");
      root.style.setProperty("--popup-border-color", "#e7e6e9");
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Dashboard query={query} setQuery={setQuery} />}
          ></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route
            path="/projects"
            element={<ProjectPage query={query} setQuery={setQuery} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
