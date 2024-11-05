import "./Signup.css";
import { Context } from "../../store/context";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

function Signup() {
  const state = useContext(Context);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnlySave = async () => {
    try {
      const result = await state.actions.postUser();
      if (result.success == false) {
        setErrorMessage(result.message);
       return { success: false, message: result.message };
      } else {
        return { success: true, message: "User created successfully" };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "Registration failed",
      };
    }
  };

  const isFormValid = () => {
    return (
      state.store.email.trim() !== "" &&
      state.store.password.trim() !== "" &&
      state.store.first_name.trim() !== "" &&
      state.store.last_name.trim() !== ""
    );
  };

  const handleSave = async () => {
    const postResult = await handleOnlySave();
    if (postResult && postResult.success === false) {
      setErrorMessage(postResult.message);
      return;
    }
    setErrorMessage("");
    const loginSuccess = await state.actions.loginUser();

    state.actions.handlerOnChange({
      target: { name: "first_name", value: "" },
    });
    state.actions.handlerOnChange({ target: { name: "last_name", value: "" } });
    state.actions.handlerOnChange({ target: { name: "email", value: "" } });
    state.actions.handlerOnChange({ target: { name: "password", value: "" } });

    if (loginSuccess) {
      const user = { name: state.store.first_name || "User" };
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      setSuccessMessage("Registration and login successful! Redirecting...");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      console.error("Error logging in after signup");
    }
  };

  return (
    <div className="container">
      <div className="login-div-signup">
        <form className="form-login-signup">
          <span className="login-title-signup">Sign up</span>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={state.store?.first_name}
              onChange={state.actions.handlerOnChange}
              className="form-control"
              name="first_name"
              placeholder="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Last name
            </label>
            <input
              type="text"
              value={state.store?.last_name}
              onChange={state.actions.handlerOnChange}
              className="form-control"
              name="last_name"
              placeholder="Last name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={state.store?.email}
              onChange={state.actions.handlerOnChange}
              className="form-control"
              name="email"
              placeholder="name@example.com"
            />
          </div>
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={state.store?.password}
            onChange={state.actions.handlerOnChange}
            name="password"
            className="form-control"
            aria-describedby="passwordHelpBlock"
          />
          <div className="btn-form-login">
            <button
              type="button"
              className="btn btn-outline-secondary btn-login-cancel"
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary btn-login-save"
              onClick={handleSave}
              disabled={!isFormValid()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
