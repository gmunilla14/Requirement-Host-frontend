import Requirements from "../components/requirements/requirements";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavigationWindow from "../components/navigationWindow";
import NavBar from "../components/navBar";
import { useEffect } from "react";
import { getSettings } from "../store/actions/settingActions";
import { getRequirements } from "../store/actions/requirementActions";
const Dashboard = ({ query, setQuery }) => {

  const [filterCategory, setFilterCategory] = useState("");
  const [filterProject, setFilterProject] = useState("");

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequirements());
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getSettings());
  }, []); //eslint-disable-line react-hooks/exhaustive-deps



  return (
    <>
      {auth._id ? (
        <div>
          <div className="nav-req-bg"></div>
          <NavBar setQuery={setQuery} />
          <Requirements
            query={query}
            filterCategory={filterCategory}
            filterProject={filterProject}
            setFilterProject={setFilterProject}
            setFilterCategory={setFilterCategory}
          ></Requirements>
        </div>
      ) : (
        <NavigationWindow
          navPath="/signin"
          message="You need to be signed in to view requirements!"
        />
      )}
    </>
  );
};

export default Dashboard;
