import { Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import TextInput from "../textInput";

const SignIn = () => {
  const dispatch = useDispatch();
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const auth = useSelector((state) => state.auth);
  if (auth._id) return <Navigate replace to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(creds, setErrorMessage));
    setCreds({ email: "", password: "" });

  };

  return (
    <div className="login-bg">
      <div className="login-modal">
        <div className="login-modal-holder">
          <div className="login-title">Log In</div>
          <div className="login-description">
            Log in to view and manage your requirements.
          </div>
          <Form onSubmit={handleSubmit}>
            <TextInput
              title={"Email"}
              type="email"
              value={creds.email}
              setValue={(e) => {
                setCreds({ ...creds, email: e.target.value });
              }}
              error={errorMessage ? "Incorrect username and/or password" : ""}
            />
            <TextInput
              title="Password"
              type="password"
              value={creds.password}
              setValue={(e) => {
                setCreds({ ...creds, password: e.target.value });
              }}
            />
            <button
              className="add-reqs-modal"
              style={{ width: "100%" }}
              type="submit"
            >
              Log In
            </button>
          </Form>
          <div className="login-navigate">
            Dont have an account? <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
