import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
export default function HomePage() {
  const [cars, setCars] = useState([]); // Initialize the state with an empty array
  const navigate = useNavigate();
  const location = useLocation();
  // query
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`/cars?search=${searchQuery}`);
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, [searchQuery]);

  const baseUrl = "http://localhost:4000/uploads/";
  console.log("Search Query from URL:" + searchQuery);

  const filteredMyCars = cars.filter((car) =>
    car.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-8 gap-6 px-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredMyCars.length > 0 ? (
        filteredMyCars.map((car) => (
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
              <h2 className="font-bold text-xl flex">{car.brand}</h2>
              <h3 className="text-md text-gray-800 font-semibold un un:hover">
                {car.model}
              </h3>
              <div className="mt-1">
                <span className="font-bold text-lg un un:hover">
                  ${car.price} Price of the car
                </span>
              </div>
              <div className="mt-1">
                {car.rental && (
                  <span className="font-bold text-lg un un:hover">
                    ${car.rentalPrice} per day
                  </span>
                )}
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p className="font-bold text-2xl">No matched cars</p>
      )}
    </div>
  );
}
