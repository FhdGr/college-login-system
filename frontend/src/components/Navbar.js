import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          CollegeLogin
        </Link>

        {user ? (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-3">
              <span className="nav-link">Role: {user.role}</span>
            </li>
            <li className="nav-item">
              <button onClick={logout} className="btn btn-outline-danger">
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-2">
              <Link className="btn btn-outline-primary" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary" to="/">
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
