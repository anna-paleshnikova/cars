import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCarById,
  saveCar,
  CarStatus,
} from "../../../utils/http-utils/cars-requests";
import "./CarForm.scss";

export function CarForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [car, setCar] = useState({
    type: "",
    vehicle: {
      brand: "",
      model: "",
      year: "",
    },
    fuel: "",
    seats: "",
    picture: "",
    pricePerDay: "",
    availableCount: 0,
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

  const onTaskSubmit = (event) => {
    event.preventDefault();

    saveCar(car).then(() => {
      navigate("/car-list");
    });
  };

  return (
    <div className="task-form-wrapper">
      <Form onSubmit={onTaskSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="type"
            value={car.type}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>car</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="brand"
            value={car.brand}
            onChange={onInputChange}
          />
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="model"
            value={car.model}
            onChange={onInputChange}
          />
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="year"
            value={car.year}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>car picture</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter picture url"
            name="picture"
            value={car.picture}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>fuel</Form.Label>
          <Form.Control
            type="text"
            placeholder="fuel"
            name="fuel"
            value={car.fuel}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>seats</Form.Label>
          <Form.Control
            type="text"
            placeholder="seats"
            name="seats"
            value={car.seats}
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>pricePerDay</Form.Label>
          <Form.Control
            type="text"
            placeholder="pricePerDay"
            name="pricePerDay"
            value={car.pricePerDay}
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>availableCount</Form.Label>
          <Form.Control
            type="text"
            placeholder="availableCount"
            name="availableCount"
            value={car.availableCount}
            onChange={onInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {car.id ? "Edit Car" : "Create car"}
        </Button>
      </Form>
    </div>
  );
}
