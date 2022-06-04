import "./Header.scss";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import {
  getLoggedUser,
  logout,
} from "../../utils/http-utils/customer-requests";

export function Header() {
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="header">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Rent a car</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/customer-list">
                Customer List
              </Link>
              {loggedUser.role === "admin" ? (
                <Link className="nav-link" to="/customer/create">
                  Create Customer
                </Link>
              ) : null}

              <Link className="nav-link" to="/cars-list">
                All Cars
              </Link>
              <Link className="nav-link" to="/customer/rented-cars">
                My rented cars
              </Link>

              {loggedUser.role === "admin" ? (
                <Link className="nav-link" to="/car/create">
                  Create car
                </Link>
              ) : null}
            </Nav>
            <span className="nav-link logout-btn" onClick={logoutHandler}>
              Logout
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
