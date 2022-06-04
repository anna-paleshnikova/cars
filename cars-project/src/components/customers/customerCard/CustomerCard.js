import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../../utils/http-utils/customer-requests";
import "./CustomerCard.scss";

export function CustomerCard({ user, deleteUser, isInDetails }) {
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();
  const redirectToDetails = () => {
    navigate(`/customer/${user.id}`);
  };

  const redirectToEdit = () => {
    navigate(`/customer/edit/${user.id}`);
  };

  if (!user) {
    return <p>No User!</p>;
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>
          <span className="key">Email: </span>
          <span className="value">{user.email}</span>
        </Card.Text>
        <Card.Text>
          <span className="key">Phone: </span>
          <span className="value">{user.phone}</span>
        </Card.Text>
        <div className="btn-holder">
          {loggedUser.role === "admin" || loggedUser.id === user.id ? (
            <Button variant="primary" onClick={redirectToEdit}>
              Edit
            </Button>
          ) : (
            ""
          )}

          {loggedUser.role === "admin" ? (
            <Button variant="danger" onClick={() => deleteUser(user.id)}>
              Delete
            </Button>
          ) : (
            ""
          )}
          {!isInDetails ? (
            <Button variant="info" onClick={redirectToDetails}>
              Details
            </Button>
          ) : (
            ""
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
