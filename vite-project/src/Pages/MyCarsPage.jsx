import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function MyCarsPage() {
  const [cars, setCars] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchCars = async () => {
      if (user) {
        try {
          const response = await axios.get("/my-cars");
          setCars(response.data);
        } catch (error) {
          console.error("Error fetching cars:", error);
        }
      }
    };

    fetchCars();
  }, [user]);

  const baseUrl = "http://localhost:4000/uploads/";

  const handleDelete = (id) => {
    axios
      .delete(`/cars/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
      });
  };

  return (
    <div className="mt-8 gap-6 px-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {cars.map((car) => (
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
            <h2 className="font-bold text-white text-xl un un:hover">
              {car.brand}
            </h2>
            <h3 className="text-md text-white font-semibold">{car.model}</h3>
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
          {/* Edit and Delete buttons */}
          <div className="mt-2 flex space-x-2">
            <Link
              to={`/cars/edit-car/${car._id}`}
              className="bg-blue-500 hover:bg-blue-700 text-black hover:text-gray-200 font-bold mt-7 py-2 px-3 rounded flex gap-2 justify-center text-center"
            >
              Edit
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
            </Link>
            <button
              onClick={() => handleDelete(car._id)}
              className="bg-red-500 hover:bg-red-700 text-black hover:text-gray-200 font-bold mt-7 py-2 px-3 rounded flex gap-2 justify-center text-center"
            >
              Delete
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
