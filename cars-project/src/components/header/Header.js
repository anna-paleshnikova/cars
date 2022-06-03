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
  const taskUrl = `/tasks/${loggedUser.id}`;
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
          <Navbar.Brand href="#home">Rent a car</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/customer-list">
                Customer List
              </Link>
              <Link className="nav-link" to="/customer/create">
                Create Customer
              </Link>
              <Link className="nav-link" to="/tasks-list">
                All Cars
              </Link>
              <Link className="nav-link" to={taskUrl}>
                My rented cars
              </Link>
              <Link className="nav-link" to="/task/create">
                Create car
              </Link>
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
