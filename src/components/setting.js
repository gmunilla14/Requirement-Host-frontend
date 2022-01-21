const Setting = ({ title, description, element }) => {
  return (
    <div className="setting-container">
      <div className="setting-title">{title}</div>
      <div className="setting-description">{description}</div>
      {element}
    </div>
  );
};

export default Setting;
