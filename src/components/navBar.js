import { Navbar, Container, Nav, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import "../styles.css";
import { IoMdSettings } from "react-icons/io";
import Popup from "./popup";
import { ReactComponent as ReactLogo } from "../images/logo.svg";

const NavBar = ({ setQuery }) => {
  //Load User
  const auth = useSelector((state) => state.auth);

  //Initialize state to show logout popup
  const [showLogout, setShowLogout] = useState(false);

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const onUserClick = () => {
    setShowLogout(!showLogout);
  };

  //Get current page to highlight navbar sections
  var dashboardPage = false;
  var projectsPage = false;
  var settingsPage = false;

  if (window.location.pathname === "/") {
    projectsPage = false;
    dashboardPage = true;
    settingsPage = false;
  } else if (window.location.pathname === "/projects") {
    projectsPage = true;
    dashboardPage = false;
    settingsPage = false;
  } else if (window.location.pathname === "/settings") {
    projectsPage = false;
    dashboardPage = false;
    settingsPage = true;
  }

  return (
    <>
      <Navbar expand="md" className="nav-heading">
        <Container>
          <Col>
            <Navbar.Brand href="/">
              <ReactLogo />
            </Navbar.Brand>
          </Col>

          <Navbar.Toggle aria-controls="nav-bar" />
          <Navbar.Collapse id="nav-bar">
            <Col>
              <Nav>
                <Nav.Link
                  className={dashboardPage ? "navText-highlighted" : "navText"}
                  href="/"
                >
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  className={projectsPage ? "navText-highlighted" : "navText"}
                  href="/projects"
                >
                  Projects
                </Nav.Link>
              </Nav>
            </Col>
            <Nav className="nav-settings-holder">
              {!auth._id ? (
                <>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                  <Nav.Link href="/signin">Sign In</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    className={settingsPage ? "navText-highlighted" : "navText"}
                    href="/settings"
                  >
                    <IoMdSettings className="gear" />
                    Settings
                  </Nav.Link>

                  <div
                    className="user-circle no-select user-circle-nav"
                    onClick={onUserClick}
                  >
                    <div className="user-circle-text">
                      {auth.name.charAt(0).toUpperCase()}
                    </div>
                    {showLogout && <Popup username={auth.name} />}
                  </div>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {!settingsPage && (
        <div className="nav-search-holder">
          <div className="nav-title-holder">
            <a href="/">
              <span className="nav-title">Requirements Host</span>
            </a>
          </div>
          <span className="nav-line"></span>
          <input
            className="nav-search"
            placeholder="&#x1F50D;&#xFE0E; Search"
            onChange={onQueryChange}
          ></input>
        </div>
      )}
    </>
  );
};

export default NavBar;
