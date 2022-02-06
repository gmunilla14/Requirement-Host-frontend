import Requirements from "../components/requirements/requirements";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/navBar";
import { useEffect } from "react";
import { getSettings } from "../store/actions/settingActions";
import { getRequirements } from "../store/actions/requirementActions";
import { Navigate } from "react-router-dom";
const Dashboard = ({ query, setQuery }) => {
  //Get user state
  const auth = useSelector((state) => state.auth);

  //Initialize filter states
  const [filterCategory, setFilterCategory] = useState("");
  const [filterProject, setFilterProject] = useState("");

  const dispatch = useDispatch();

  //Load requirements
  useEffect(() => {
    dispatch(getRequirements());
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  //Load settings
  useEffect(() => {
    dispatch(getSettings());
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  //Go to signin page if not authenticated
  if (!auth._id) return <Navigate replace to="/signin" />;

  return (
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
  );
};

export default Dashboard;
