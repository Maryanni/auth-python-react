import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { iconprincipal } from "../assets";
import { useState, useContext, useEffect } from "react";
import { Context } from "../store/context";


function Navbar() {
  const navigate = useNavigate();
 const state = useContext(Context);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();

  console.log("Valor de la autenticación",isAuthenticated);

  const checkAuthentication = () => {
  
    const user = JSON.parse(localStorage.getItem("user")); 
    if (user) {
      setIsAuthenticated(true);
      setUserName(user.name); 
    }else {
      setIsAuthenticated(false);
      setUserName("");
    }
  }


  useEffect(() => {
    checkAuthentication();
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="main-logo" onClick={() => navigate("/")}>
          <div className="main-logo-div">
            <img
              className="main-logo-img"
              src={iconprincipal}
              alt="logo de auth"
            />
          </div>
          <span className="main-logo-span">Auth</span>
        </div>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          {isAuthenticated ? (
            <div className="d-flex align-items-center">
              <span className="me-3">Hello!</span>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-outline-primary btn-navbar-style"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
