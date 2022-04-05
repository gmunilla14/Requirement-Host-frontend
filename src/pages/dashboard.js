import Requirements from "../components/requirements/requirements";
import { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/navBar";
import { Navigate } from "react-router-dom";
import Loading from "./loading";
const Dashboard = ({ query, setQuery }) => {
  //Get user state
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading);
  //Initialize filter states
  const [filterCategory, setFilterCategory] = useState("");
  const [filterProject, setFilterProject] = useState("");

  //Go to signin page if not authenticated
  if (!auth._id) return <Navigate replace to="/signin" />;

  return (
    <div>
      {loading === 0 ? (
        <>
          <div className="nav-req-bg"></div>
          <NavBar setQuery={setQuery} />
          <Requirements
            query={query}
            filterCategory={filterCategory}
            filterProject={filterProject}
            setFilterProject={setFilterProject}
            setFilterCategory={setFilterCategory}
          ></Requirements>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Dashboard;
