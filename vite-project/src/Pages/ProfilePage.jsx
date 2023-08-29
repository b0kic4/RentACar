import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
export default function ProfilePage() {
  const { user } = useContext(UserContext);
  const [createdCars, setCreatedCars] = useState([]);
  const [rentedCars, setRentedCars] = useState([]);

  useEffect(() => {
    // Fetch rented cars
    axios
      .get("/profile/rented_cars")
      .then((response) => {
        setRentedCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rented cars:", error);
      });
  }, [user]);
  const baseUrl = "http://localhost:4000/uploads/";
  return (
    <>
      <div className="flex justify-center text-center mt-11 font-bold text-2xl">
        <span className="inline-flex justify-center text-center items-center gap-2">
          Rented Cars:{" "}
        </span>
      </div>
      <div className="mt-8 gap-6 px-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {rentedCars.length > 0 &&
          rentedCars.map((car) => (
            <div key={car._id}>
              <Link to={"/cars/" + car._id}>
                <div
                  className="bg-gray-500 rounded-2xl flex transition duration-300 ease-in-out hover:shadow-xl dark:hover:shadow-black/30 relative overflow-hidden"
                  key={car._id}
                >
                  {car.images?.length > 0 && (
                    <img
                      className="rounded-2xl object-cover aspect-square ease-in-out transition duration-300 hover:scale-110"
                      src={baseUrl + car.images[0]}
                      alt={car.model}
                    />
                  )}
                </div>
                <h2 className="font-bold text-xl">{car.brand}</h2>
                <h3 className="text-md text-gray-800 font-semibold">
                  {car.model}
                </h3>
                <div className="mt-1">
                  <span className="font-bold text-lg">
                    ${car.price} Price of the car
                  </span>
                </div>
                <div className="mt-1">
                  {car.rental && (
                    <span className="font-bold text-lg">
                      ${car.rentalPrice} per day
                    </span>
                  )}
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
