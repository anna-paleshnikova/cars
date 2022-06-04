import { useEffect, useState } from "react";
import {   useNavigate} from "react-router-dom";
import {
  deleteCar,
  getAllCars,
} from "../../../utils/http-utils/cars-requests";
import {CarCard} from "../carCard/CarCard"

import "./CarList.scss";

export function CarList() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      getAllCars().then((response) => {
        setCars(response.data);
      });
  }, []);

  const onDeleteHandler = (id) => {
    deleteCar(id).then(() => {
      setCars((prevState) => {
        return prevState.filter((car) => car.id !== id);
      });
    });
  };

  if(cars.length === 0) {
    navigate("/")
  }

  return (
    <div className="tasks-list-wrapper">
      { cars.map(car => <CarCard key={car.id} car={car} onCarDelete={onDeleteHandler} />) }
    </div>
  );
}
