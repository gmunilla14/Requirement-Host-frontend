import { Modal } from "react-bootstrap";

const NavigationWindow = ({ navPath, message }) => {
  return (
    <Modal show>
      <div className="navigation-holder">
        <div className="login-title">Navigation Necessary!</div>
        <div className="login-description">{message}</div>
        <a href={navPath}>
          Click here
        </a>
      </div>
    </Modal>
  );
};

export default NavigationWindow;
