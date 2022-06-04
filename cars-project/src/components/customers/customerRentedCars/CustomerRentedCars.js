import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCars } from "../../../utils/http-utils/cars-requests";
import { CarCard } from "../../cars/carCard/CarCard";
import "../../cars/carCard/CarCard.scss";
import { getLoggedUser } from "../../../utils/http-utils/customer-requests";

export function CustomerRentedCars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();

  useEffect(() => {
    getAllCars().then((response) => {
      setCars(response.data);
    });
  }, []);

  if (cars.length === 0) {
    navigate("/");
  }

  return (
    <div className="tasks-list-wrapper">
      {cars.map((carT) => {
        return (
          <>
            {carT.rentedByCustomer.map((car) => (
              <>
                {car.customerId === loggedUser.id && (
                  <CarCard
                    customerRentedCars={true}
                    key={car.id}
                    car={carT}
                    finalPrice={car.rentedFinalPrice}
                    startDate={car.startDate}
                    endDate={car.endDate}
                  />
                )}
              </>
            ))}
          </>
        );
      })}
    </div>
  );
}
