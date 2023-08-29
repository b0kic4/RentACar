import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CarDetailsPage() {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [showRentOptions, setShowRentOptions] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rentPrice, setRentPrice] = useState("");

  useEffect(() => {
    axios
      .get(`/cars/${id}`)
      .then((response) => {
        setCarDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
      });
  }, [id]);

  const toggleRentOptions = () => {
    setShowRentOptions(!showRentOptions);
  };

  const handleCheckInChange = (e) => {
    setCheckIn(e.target.value);
  };

  const handleCheckOutChange = (e) => {
    setCheckOut(e.target.value);
  };

  const rentIt = () => {
    if (!checkIn || !checkOut) {
      console.error("Both check-in and check-out dates are required.");
      return;
    }
    const numberOfDays = calculateNumberOfDays(checkIn, checkOut);
    const totalPrice = numberOfDays * carDetails.rentalPrice;

    axios
      .put(`/cars/${id}/rent`, {
        rentalDateIn: checkIn,
        rentalDateOut: checkOut,
      })
      .then((response) => {
        console.log(response);
        setCarDetails((prevCarDetails) => ({
          ...prevCarDetails,
          booked: true,
          rentalDateIn: checkIn,
          rentalDateOut: checkOut,
          rentalDays: numberOfDays,
          rentalPrice: totalPrice,
        }));
      })
      .catch((error) => {
        console.error("Error renting car:", error);
      });
  };

  const cancelRent = () => {
    axios
      .put(`/cars/${id}/rent/cancel`)
      .then((response) => {
        console.log(response);
        setCarDetails((prevCarDetails) => ({
          ...prevCarDetails,
          booked: false,
          rentalDateIn: null,
          rentalDateOut: null,
          rentalDays: null,
          rentalPrice: null,
        }));
      })
      .catch((error) => {
        console.error("Error canceling rent:", error);
      });
  };

  function calculateNumberOfDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = Math.abs(end - start);
    const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return numberOfDays;
  }

  return (
    <div className="container mx-auto py-8">
      {carDetails && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-4">{carDetails.brand}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Map through the image filenames and display each image */}
              {carDetails.images.map((imageFilename) => (
                <img
                  key={imageFilename}
                  src={`http://localhost:4000/uploads/${imageFilename}`}
                  alt={carDetails.brand}
                  className="w-full rounded-lg mb-4"
                />
              ))}
            </div>
            <div>
              <p className="text-gray-600 mb-4 font-semibold">
                {carDetails.description}
              </p>
              {/* Display other car details here */}
              <p className="font-semibold text-lg mb-1">
                Model: {carDetails.model}
              </p>
              <p className="font-semibold text-lg mb-1">
                Year: {carDetails.year}
              </p>
              <p className="font-semibold text-lg mb-1">
                Color: {carDetails.color}
              </p>
              <p className="font-semibold text-lg mb-1">
                Mileage: {carDetails.mileage} km
              </p>
              {/* ... other car details ... */}
              {/* Rent It button */}
              <p className="font-bold text-lg mt-2">Rent Options:</p>
              {showRentOptions ? (
                <div>
                  <label htmlFor="checkInDate">Check In Date</label>
                  <input
                    type="date"
                    id="checkInDate"
                    value={checkIn}
                    onChange={handleCheckInChange}
                    className="block mt-1 w-full"
                  />
                  <label htmlFor="checkOutDate" className="mt-4">
                    Check Out Date
                  </label>
                  <input
                    type="date"
                    id="checkOutDate"
                    value={checkOut}
                    onChange={handleCheckOutChange}
                    className="block mt-1 w-full"
                  />
                  <button
                    onClick={rentIt}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-3 rounded"
                  >
                    Rent
                  </button>
                  <button
                    onClick={toggleRentOptions && cancelRent}
                    className="bg-red-500 hover:bg-red-800 text-black hover:text-gray-300 font-bold mt-4 py-2 px-3 rounded ml-4"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={toggleRentOptions}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-7 py-2 px-3 rounded flex gap-2 justify-center text-center"
                >
                  Rent It
                  {/* ... (existing SVG) */}
                </button>
              )}
            </div>
            <p>Rental Date In: {carDetails.rentalDateIn}</p>
            <p>Rental Date Out: {carDetails.rentalDateOut}</p>
            <p>Rental Date In: {checkIn}</p>
            <p>Rental Date Out: {checkOut}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarDetailsPage;
