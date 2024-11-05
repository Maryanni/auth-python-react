import "./Login.css";
import { useContext, useState } from "react";
import { Context } from "../../store/context";
import { useNavigate } from "react-router-dom";


function Login() {
  const state = useContext(Context);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
 

  const handleLogin = async () => {
    const loginSuccess = await state.actions.loginUser();
    console.log("Valor del inicio de sesión", loginSuccess);
    if (loginSuccess) {
      const user = { name: "Nombre del Usuario" }; 
      localStorage.setItem("user", JSON.stringify(user)); 
      setIsAuthenticated(true);
      //setUserName(user.name);
      navigate("/home");
    }else {
      setErrorMessage("User or password wrong.");
    }
  }

  const handleClean = () => {
    state.actions.handlerOnChange({ target: { name: "email", value: "" } });
    state.actions.handlerOnChange({ target: { name: "password", value: "" } });
    setErrorMessage("");
  }

  const isFormValid = () => {
    return state.store.email.trim() !== "" && state.store.password.trim() !== "";
  };

  return (
    <div className="container">
      <div className="login-div">
        <form className="form-login">
        <span className="login-title">Sign in</span>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={state.store?.email}
              onChange={state.actions.handlerOnChange}
              name="email"
              placeholder="name@example.com"
            />
          </div>
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            value={state.store?.password}
            onChange={state.actions.handlerOnChange}
          />
          {errorMessage && (
            <div className="text-danger mt-2">{errorMessage}</div>
          )}
          <div className="btn-form-login">
            <button
              type="button"
              className="btn btn-outline-secondary btn-login-cancel"
              onClick={handleClean}
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary btn-login-save"
              onClick={handleLogin}
              disabled={!isFormValid()}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
