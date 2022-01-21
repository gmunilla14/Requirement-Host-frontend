import { Row, Form } from "react-bootstrap";
const TextInput = ({
  title,
  setValue,
  type,
  error,
  value,
  characters,
  max,
}) => {
  return (
    <Row className="text-input-holder">
      <Form.Group>
        <div className="input-header-holder">
          <div  className="input-header" style={error ? {color: "#d83838"}: {}}>
            {title}
          </div>
          {characters !== undefined && (
            <div className="input-characters" style={error ? {color: "#d83838"}: {}}>
              {characters}/{max}
            </div>
          )}
        </div>

        <>
          <Form.Control
            className={error ? "text-input error" : "text-input"}
            onChange={setValue}
            type={type}
            value={value}
          />
          {error && <div className="error-message">{error}</div>}
        </>
      </Form.Group>
    </Row>
  );
};

export default TextInput;
