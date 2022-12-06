import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "./store";

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const authState = useSelector((state) => state.isLoggedIn);
  const id = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authActions.logOUT());
    navigate("/");
  };
  const showLoginHandler = (state) => {
    setShowLogin(state);
  };
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => showLoginHandler(true)}
        >
          Places
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {authState ? (
              <>
                <Link to="/place/create" className="nav-link">
                  Post
                </Link>
                <Link to={`/places/${id}`} className="nav-link">
                  My Posts
                </Link>
                <Link to="/login" className="nav-link" onClick={logoutHandler}>
                  Logout
                </Link>
              </>
            ) : (
              showLogin && (
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={() => showLoginHandler(false)}
                >
                  Login
                </Link>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
