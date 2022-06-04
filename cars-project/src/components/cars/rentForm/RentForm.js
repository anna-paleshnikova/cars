import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { getCarById, saveCar } from "../../../utils/http-utils/cars-requests";
import Card from "react-bootstrap/Card";
import { getLoggedUser } from "../../../utils/http-utils/customer-requests";

export function RentCar() {
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();
  const params = useParams();
  const [car, setCar] = useState({
    type: "",
    brand: "",
    model: "",
    year: "",
    fuel: "",
    seats: "",
    picture: "",
    pricePerDay: "",
    availableCount: 0,
    rented: false,
    startDate: "",
    endDate: "",
    rentedByCustomer: [],
  });

  useEffect(() => {
    if (params.id) {
      getCarById(params.id).then((response) => {
        setCar(response.data);
      });
    }
  }, [params.id]);

  const onInputChange = (event) => {
    setCar((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const date1 = new Date(car.startDate);
  const date2 = new Date(car.endDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const onTaskSubmit = (event) => {
    event.preventDefault();
    car.availableCount = car.availableCount !== 0 && car.availableCount - 1;
    let rentedFinalPrice = "";
    if (diffDays > 3) {
      rentedFinalPrice =
        car.pricePerDay * diffDays - 0.05 * (car.pricePerDay * diffDays);
    } else if (diffDays > 5) {
      rentedFinalPrice =
        car.pricePerDay * diffDays - 0.07 * (car.pricePerDay * diffDays);
    } else if (diffDays > 10) {
      rentedFinalPrice =
        car.pricePerDay * diffDays - 0.1 * (car.pricePerDay * diffDays);
    } else {
      rentedFinalPrice = car.pricePerDay * diffDays;
    }
    const rentedByCustomer = {
      customerId: loggedUser.id,
      rentedFinalPrice: rentedFinalPrice,
      startDate: car.startDate,
      endDate: car.endDate,
    };
    car.rentedByCustomer.push(rentedByCustomer);
    car.startDate = "";
    car.endDate = "";
    saveCar(car).then(() => {
      navigate("/cars-list");
    });
  };

  return (
    <div className="task-form-wrapper">
      <Form onSubmit={onTaskSubmit}>
        <Card.Title>
          {car.brand}-{car.model}
        </Card.Title>

        <Card.Img variant="top" src={car.picture} />
        <Card.Text>
          <span className="key">Price per day: </span>
          <span className="value">{car.pricePerDay}</span>
        </Card.Text>

        <Card.Text>
          <span className="key">Available count: </span>
          <span className="value">{car.availableCount}</span>
        </Card.Text>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="Enter start date"
            name="startDate"
            value={car.startDate}
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="Enter end date"
            name="endDate"
            value={car.endDate}
            onChange={onInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Rent
        </Button>
      </Form>
    </div>
  );
}
