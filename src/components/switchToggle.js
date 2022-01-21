const SwitchToggle = ({ left, right, value, clickFunction }) => {
  return (
    <>
      {value === "left" ? (
        <div className="switch-toggle-container">
          <div className="switch-toggle-option selected">{left}</div>
          <div className="switch-toggle" onClick={clickFunction}>
            <div className="switch-circle left"></div>
          </div>
          <div className="switch-toggle-option">{right}</div>
        </div>
      ) : (
        <div className="switch-toggle-container">
          <div className="switch-toggle-option">{left}</div>
          <div className="switch-toggle" onClick={clickFunction}>
            <div className="switch-circle right"></div>
          </div>
          <div className="switch-toggle-option selected">{right}</div>
        </div>
      )}
    </>
  );
};

export default SwitchToggle;
