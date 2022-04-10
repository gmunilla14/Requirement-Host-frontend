import { Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import TextInput from "../textInput";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Initialize starting state for user
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  //Error states
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [minUsernameError, setMinUsernameError] = useState(false);
  const [maxUsernameError, setMaxUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [noEmailError, setNoEmailError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Error handling
    var error = false;

    if (user.email === "") {
      setNoEmailError(true);
      error = true;
    }
    if (confirmPassword !== user.password) {
      setPasswordCheckError(true);
      error = true;
    }

    if (user.name.length < 2) {
      setMinUsernameError(true);
      error = true;
    }
    if (user.name.length > 100) {
      setMaxUsernameError(true);
      error = true;
    }

    if (user.password.length < 6 || user.password.length > 1024) {
      setPasswordError(true);
      error = true;
    }

    if (error) return;

    //Send sign up request and navigate to main page
    dispatch(signUp(user));
    setUser({ name: "", email: "", password: "" });
    navigate("/");
  };

  return (
    <div className="login-bg" style={{ paddingTop: "9.375rem", height: '125vh' }}>
      <div className="login-modal signup-modal">
        <div className="login-modal-holder signup-holder">
          <div className="login-title">Sign Up</div>
          <div className="login-description">
            A single tool to manage your projects and requirements.
          </div>
          <Form onSubmit={handleSubmit}>
            {minUsernameError || maxUsernameError ? (
              <TextInput
                title={"Username"}
                type="text"
                characters={user.name.length}
                max={100}
                value={user.name}
                setValue={(e) => {
                  if (e.target.value.length >= 2) {
                    setMinUsernameError(false);
                  }

                  if (e.target.value.length <= 100) {
                    setMaxUsernameError(false);
                  } else {
                    setMaxUsernameError(true);
                  }

                  setUser({ ...user, name: e.target.value });
                }}
                error={
                  maxUsernameError
                    ? "Username can have max 100 characters"
                    : "Username must have at least 2 characters"
                }
              />
            ) : (
              <TextInput
                title={"Username"}
                type="text"
                characters={user.name.length}
                max={100}
                value={user.name}
                setValue={(e) => {
                  if (e.target.value.length >= 2) {
                    setMinUsernameError(false);
                  }

                  if (e.target.value.length <= 100) {
                    setMaxUsernameError(false);
                  } else {
                    setMaxUsernameError(true);
                  }
                  setUser({ ...user, name: e.target.value });
                }}
              />
            )}

            <TextInput
              title="Email"
              type="email"
              setValue={(e) => {
                setUser({ ...user, email: e.target.value });
                setNoEmailError(false);
              }}
              error={noEmailError ? "Must use an email to sign up" : ""}
            />
            <TextInput
              title="Password"
              type="password"
              setValue={(e) => {
                if (
                  e.target.value.length >= 6 &&
                  e.target.value.length <= 1024
                ) {
                  setPasswordError(false);
                }
                setUser({ ...user, password: e.target.value });
              }}
              error={
                passwordError
                  ? "Password must be between 6 and 1024 characters"
                  : ""
              }
            />
            <TextInput
              title="Confirm Password"
              type="password"
              setValue={(e) => {
                if (e.target.value === user.password) {
                  setPasswordCheckError(false);
                }
                setConfirmPassword(e.target.value);
              }}
              error={passwordCheckError ? "Passwords must match" : ""}
            />
            <button
              className="add-reqs-modal"
              style={{ width: "100%" }}
              type="submit"
            >
              Create Account
            </button>
          </Form>
          <div className="login-navigate">
            Already have an account? <a href="/signin">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
