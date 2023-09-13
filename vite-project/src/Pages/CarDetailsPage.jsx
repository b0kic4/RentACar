import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CarDescription from "../components/CarDescription";
import CarImages from "../components/CarImages";
import RentOptions from "../components/RentOptions";

function CarDetailsPage() {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [showRentOptions, setShowRentOptions] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rentalPricePerDay, setRentalPricePerDay] = useState(0);
  const [form, setForm] = useState({
    name: "",
    address: "",
    zipcode: "",
    city: "",
    age: "",
    indetificaitonID: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
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

  async function rentIt() {
    if (!checkIn || !checkOut) {
      console.error("Both check-in and check-out dates are required.");
      return;
    }
    if (
      !form.name ||
      !form.age ||
      !form.address ||
      !form.city ||
      !form.zipcode ||
      !form.indetificaitonID
    ) {
      console.error("All booking information fields are required.");
      return;
    }
    console.log("Form data" + form);
    console.log(carDetails);
    const numberOfDays = calculateNumberOfDays(checkIn, checkOut);
    const totalPrice = numberOfDays * carDetails.rentalPrice;

    // Store number of days and price in localStorage
    localStorage.setItem("numberOfDays", numberOfDays);
    localStorage.setItem("totalPrice", totalPrice);

    await axios
      .put(`/cars/${id}/rent`, {
        rentalDateIn: checkIn,
        rentalDateOut: checkOut,
        rentalPricePerDay: totalPrice,
        bookingInformation: Object.values(form),
        rentalDays: numberOfDays,
      })
      .then((response) => {
        console.log(response);
        setCarDetails((prevCarDetails) => ({
          ...prevCarDetails,
          booked: true,
          rentalDateIn: checkIn,
          rentalDateOut: checkOut,
          rentalDays: numberOfDays,
          rentalPricePerDay: totalPrice,
          bookingInformation: Object.values(form), // Now bookingInformation will contain user input data
        }));
      })
      .catch((error) => {
        console.error("Error renting car:", error);
      });
  }

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
          rentalPricePerDay: null,
          bookingInformation: null,
        }));
      })
      .catch((error) => {
        console.error("Error canceling rent:", error);
      });
    setShowRentOptions(showRentOptions);
  };

  function calculateNumberOfDays(checkInDate, checkOutDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const timeDifference = endDate - startDate;
    const numberOfDays = Math.floor(timeDifference / oneDay);
    return numberOfDays;
  }

  return (
    <div className="container mx-auto py-4 px-2 border">
      {carDetails && (
        <div className="bg-gray-600 bg-opacity-50 border max-h-fit bg-cover object-cover overflow-hidden text-opacity-100 rounded-lg shadow-md p-4 flex">
          <div className="flex-1">
            <h1 className="text-3xl text-black font-bold mb-4 un un:hover">
              {carDetails.brand}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CarImages images={carDetails.images} />
              <div className="flex-wrap">
                <div className="h-fit w-fit">
                  <CarDescription
                    description={carDetails.description}
                    model={carDetails.model}
                    year={carDetails.year}
                    color={carDetails.color}
                    mileage={carDetails.mileage}
                  />
                  {!showRentOptions && carDetails.booked === false && (
                    <button
                      onClick={toggleRentOptions}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-7 py-2 px-3 rounded flex gap-2 justify-center text-center"
                    >
                      Rent It
                    </button>
                  )}
                  {carDetails.booked === true && (
                    <div>
                      <button
                        onClick={cancelRent}
                        className="bg-red-500 hover:bg-red-800 text-black hover:text-gray-300 font-bold mt-4 py-2 px-3 rounded ml-4"
                      >
                        Cancel Rent
                      </button>
                    </div>
                  )}
                  <div className="pt-8 gap-2">
                    {carDetails.rentalPricePerDay &&
                      carDetails.rentalDays > 0 &&
                      carDetails.booked === true && (
                        <div className="flex-1">
                          <p className="font-bold gap-2 text-black flex justify-between text-md">
                            <span className="flex gap-1 items-center font-bold bg-slate-100 text-gray-800 text-md cursor-default py-2 px-3 rounded-full">
                              Number of Days: {carDetails.rentalDays}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                            <span className="flex gap-1 items-center font-bold bg-slate-100 text-gray-800 text-md cursor-default py-2 px-3 rounded-full">
                              Price: {carDetails.rentalPricePerDay}{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                                />
                              </svg>
                            </span>
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            {/* Rent Options */}
            {showRentOptions && carDetails.booked === false && (
              <div className="flex gap-6">
                <RentOptions
                  checkIn={checkIn}
                  checkOut={checkOut}
                  handleChange={handleChange}
                  handleCheckInChange={handleCheckInChange}
                  handleCheckOutChange={handleCheckOutChange}
                  toggleRentOptions={toggleRentOptions}
                  rentIt={rentIt}
                  cancelRent={cancelRent}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default CarDetailsPage;
