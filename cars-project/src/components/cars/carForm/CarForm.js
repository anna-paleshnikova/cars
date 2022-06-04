import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { getCarById, saveCar } from "../../../utils/http-utils/cars-requests";
import "./CarForm.scss";

export function CarForm() {
  const navigate = useNavigate();
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
    startData: "",
    endDate: "",
    rentedByCustomer: "",
    rentedFinalPrice: "",
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

  const onCarSubmit = (event) => {
    event.preventDefault();

    saveCar(car).then(() => {
      navigate("/cars-list");
    });
  };

  return (
    <div className="task-form-wrapper">
      <Form onSubmit={onCarSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Type</Form.Label>
          <Form.Select
            required
            name="type"
            value={car.role}
            onChange={onInputChange}
          >
            <option value="economy">Economy</option>
            <option value="estate">Estate</option>
            <option value="luxury">Luxury</option>
            <option value="suv">Suv</option>
            <option value="cargo">Cargo</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Brand:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter brand"
            name="brand"
            value={car.brand}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter model"
            name="model"
            value={car.model}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Year:</Form.Label>
          <Form.Control
            type="number"
            required
            placeholder="Enter year"
            name="year"
            value={car.year}
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>car picture</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter picture url"
            name="picture"
            value={car.picture}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>fuel</Form.Label>
          <Form.Select
            required
            name="fuel"
            value={car.fuel}
            onChange={onInputChange}
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>seats</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="seats"
            name="seats"
            value={car.seats}
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>pricePerDay</Form.Label>
          <Form.Control
            required
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
            type="number"
            required
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
