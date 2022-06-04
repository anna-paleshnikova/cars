import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getLoggedUser } from "../../../utils/http-utils/customer-requests";
import { useNavigate, Link } from "react-router-dom";

export function CarCard({
  car,
  onCarDelete,
  customerRentedCars,
  finalPrice,
  endDate,
  startDate,
}) {
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();

  const navigateToEdit = () => {
    navigate(`/car/edit/${car.id}`);
  };

  const renderEditButton = () => {
    if (loggedUser.role === "admin") {
      return (
        <Button variant="primary" onClick={navigateToEdit}>
          Edit
        </Button>
      );
    }
  };

  const renderDeleteButton = () => {
    if (loggedUser.role === "admin") {
      return (
        <Button variant="danger" onClick={() => onCarDelete(car.id)}>
          Delete
        </Button>
      );
    }
  };

  const onDragHandler = (event) => {
    event.dataTransfer.setData("taskId", car.id);
  };

  return (
    <div
      className="task-card-wrapper"
      draggable={true}
      onDrag={(event) => onDragHandler(event)}
    >
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            {car.brand}-{car.model}
          </Card.Title>
          <Card.Img variant="top" src={car.picture} />
          <Card.Text>
            <span className="key">Type: </span>
            <span className="value">{car.type}</span>
          </Card.Text>
          <Card.Text>
            <span className="key">Year: </span>
            <span className="value">{car.year}</span>
          </Card.Text>
          <Card.Text>
            <span className="key">Fuel: </span>
            <span className="value">{car.fuel}</span>
          </Card.Text>
          <Card.Text>
            <span className="key">Seats: </span>
            <span className="value">{car.seats}</span>
          </Card.Text>
          <Card.Text>
            <span className="key">Price per day: </span>
            <span className="value">{car.pricePerDay}</span>
          </Card.Text>
          <Card.Text>
            <span className="key">Available count: </span>
            <span className="value">{car.availableCount}</span>
          </Card.Text>
          {!customerRentedCars ? (
            <div className="btn-holder">
              {renderEditButton()}
              {renderDeleteButton()}
              {car.availableCount !== 0 && (
                <Link className="nav-link" to={`/car/rent/${car.id}`}>
                  Rent
                </Link>
              )}
            </div>
          ) : null}

          {customerRentedCars ? (
            <>
              <Card.Text>
                <span className="key">Final price: </span>
                <span className="value">{finalPrice}</span>
              </Card.Text>
              <Card.Text>
                <span className="key">Start date: </span>
                <span className="value">{startDate}</span>
              </Card.Text>
              <Card.Text>
                <span className="key">End date: </span>
                <span className="value">{endDate}</span>
              </Card.Text>
            </>
          ) : null}
        </Card.Body>
      </Card>
    </div>
  );
}
