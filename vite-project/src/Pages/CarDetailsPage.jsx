import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CarDetailsPage() {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);

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

  const rentIt = () => {
    axios
      .put(`/cars/${id}/rent`)
      .then((response) => {
        console.log(response);
        setCarDetails((prevCarDetails) => ({
          ...prevCarDetails,
          booked: true,
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
        }));
      })
      .catch((error) => {
        console.error("Error canceling rent:", error);
      });
  };

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
              {carDetails.rental && !carDetails.booked ? (
                <button
                  onClick={rentIt}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-7 py-2 px-3 rounded flex gap-2 justify-center text-center"
                >
                  Rent It
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.622 1.602a.75.75 0 01.756 0l2.25 1.313a.75.75 0 01-.756 1.295L12 3.118 10.128 4.21a.75.75 0 11-.756-1.295l2.25-1.313zM5.898 5.81a.75.75 0 01-.27 1.025l-1.14.665 1.14.665a.75.75 0 11-.756 1.295L3.75 8.806v.944a.75.75 0 01-1.5 0V7.5a.75.75 0 01.372-.648l2.25-1.312a.75.75 0 011.026.27zm12.204 0a.75.75 0 011.026-.27l2.25 1.312a.75.75 0 01.372.648v2.25a.75.75 0 01-1.5 0v-.944l-1.122.654a.75.75 0 11-.756-1.295l1.14-.665-1.14-.665a.75.75 0 01-.27-1.025zm-9 5.25a.75.75 0 011.026-.27L12 11.882l1.872-1.092a.75.75 0 11.756 1.295l-1.878 1.096V15a.75.75 0 01-1.5 0v-1.82l-1.878-1.095a.75.75 0 01-.27-1.025zM3 13.5a.75.75 0 01.75.75v1.82l1.878 1.095a.75.75 0 11-.756 1.295l-2.25-1.312a.75.75 0 01-.372-.648v-2.25A.75.75 0 013 13.5zm18 0a.75.75 0 01.75.75v2.25a.75.75 0 01-.372.648l-2.25 1.312a.75.75 0 11-.756-1.295l1.878-1.096V14.25a.75.75 0 01.75-.75zm-9 5.25a.75.75 0 01.75.75v.944l1.122-.654a.75.75 0 11.756 1.295l-2.25 1.313a.75.75 0 01-.756 0l-2.25-1.313a.75.75 0 11.756-1.295l1.122.654V19.5a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ) : carDetails.rental && carDetails.booked ? (
                <div>
                  <p className="font-bold text-xl mt-2">
                    This car has been booked
                  </p>
                  <button
                    onClick={cancelRent}
                    className="bg-red-500 hover:bg-red-800 text-black hover:text-gray-300 font-bold mt-7 py-2 px-3 rounded flex gap-1 justify-center text-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Cancel
                  </button>
                </div>
              ) : (
                <p>This car cannot be rented</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarDetailsPage;
