import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CarPageForm = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuel, setFuel] = useState("");
  const [seats, setSeats] = useState("");
  const [doors, setDoors] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [rental, setRental] = useState(false);
  const [rentalTimeIn, setRentalTimeIn] = useState("");
  const [rentalTimeOut, setRentalTimeOut] = useState("");
  const [rentalDateIn, setRentalTDateIn] = useState("");
  const [rentalDateOut, setRentalTDateOut] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return <>{inputHeader(description)}</>;
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("images", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const filenames = response.data;
        setImage((prevImageArray) => [...prevImageArray, ...filenames]);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  }
  const handleRemoveImage = (index) => {
    setImage((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1); // Remove the image at the specified index
      return updatedImages;
    });
  };

  async function saveCarForm(ev) {
    ev.preventDefault();
    const carData = {
      brand,
      model,
      year,
      color,
      mileage,
      fuel,
      seats,
      doors,
      price,
      description,
      image,
      rental,
      rentalTimeIn,
      rentalTimeOut,
      rentalDateIn,
      rentalDateOut,
      rentalPrice,
    };
    try {
      const response = await axios.post("/cars", carData);
      console.log("Car created", response.data);
      navigate("/my-cars");
    } catch (err) {
      console.log("Error creating the car" + err);
    }
  }

  return (
    <div className="container mx-auto p-8 bg-slate-50 bg-opacity-10 rounded-lg shadow-md mt-6 ">
      <h2 className="text-2xl font-bold mb-4">Car Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form
          onSubmit={saveCarForm}
          method="post"
          encType="multipart/form-data"
          className="px-6 py-2 border border-opacity-10 text-black border-blue-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {/* Left Side */}
            <div>
              {/* Brand */}
              <div className="mb-4">
                {preInput("Brand", "")}
                <input
                  type="text"
                  value={brand}
                  onChange={(ev) => setBrand(ev.target.value)}
                  placeholder="Brand of your car"
                  name="images"
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
              </div>

              {/* Model */}
              <div className="mb-4">
                {preInput("Model", "")}
                <input
                  type="text"
                  value={model}
                  onChange={(ev) => setModel(ev.target.value)}
                  placeholder="Model of your car"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                {preInput("Mileage", "")}
                <input
                  type="text"
                  value={mileage}
                  onChange={(ev) => setMileage(ev.target.value)}
                  placeholder="How much your car have been driven"
                  className="bg-slate-100 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
                {preInput("Color", "")}
                <input
                  type="text"
                  value={color}
                  onChange={(ev) => setColor(ev.target.value)}
                  placeholder="Which Color Is Your Car Painted In"
                  className="bg-slate-100 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
                {preInput("Seats", "")}
                <input
                  type="number"
                  value={seats}
                  onChange={(ev) => setSeats(ev.target.value)}
                  placeholder="How many seats?"
                  className="bg-slate-100 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
                <input
                  type="text"
                  value={price}
                  onChange={(ev) => setPrice(ev.target.value)}
                  placeholder="How much is your car worth?"
                  className="bg-slate-100 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
                {preInput("Doors", "")}
                <input
                  type="text"
                  value={doors}
                  onChange={(ev) => setDoors(ev.target.value)}
                  placeholder="How many doors?"
                  className="bg-slate-100 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
              </div>
              {/* Other form fields on the left side */}
            </div>
            {/* Right Side */}
            <div>
              <div>
                <input
                  type="file"
                  onChange={uploadPhoto}
                  placeholder="Photos"
                  multiple
                  required
                />
                {image.length > 0 && (
                  <div className="mt-4">
                    <h2 className="text-2xl">Uploaded Images:</h2>
                    <div className="flex flex-wrap mt-2">
                      {image.map((filename, index) => (
                        <div key={index} className="m-2 relative">
                          <img
                            src={`http://localhost:4000/uploads/${filename}`}
                            alt={`Uploaded ${index + 1}`}
                            className="lg:w-20 lg:h-20 md:w-24 md:h-24 object-cover rounded-2xl"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="flex cursor-pointer absolute bottom-0 right-0 bg-gray-50 hover:bg-red-700 text-black rounded-full p-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Description */}
              <div>
                <textarea
                  value={description}
                  onChange={(ev) => setDescription(ev.target.value)}
                  placeholder="Description for your car"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>

              {/* Other form fields on the right side */}
              <div className="mb-4">
                <input
                  type="number"
                  value={year}
                  onChange={(ev) => setYear(ev.target.value)}
                  placeholder="In Which Year Have Your Car Been Created"
                  className="bg-slate-100 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                  required
                />

                <input
                  type="text"
                  value={fuel}
                  onChange={(ev) => setFuel(ev.target.value)}
                  placeholder="Fuel Type"
                  className="bg-slate-100 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
              </div>
            </div>
          </div>

          {/* Rental Time and Price */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {/* ... (Rental Time and Price inputs) */}
            <div>
              <input
                type="number"
                value={rentalPrice}
                onChange={(ev) => setRentalPrice(ev.target.value)}
                placeholder="Rental Price"
                className="bg-slate-100 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
          </div>

          {/* Rentable */}
          <div className="font-semibold">
            <h1 className="font-semibold text-lg">Rentable?</h1>
            <div className="inline-flex gap-1 text-center items-center text-xl">
              <label>
                <input
                  type="radio"
                  name="rentalOption"
                  value="yes"
                  checked={rental === "yes"}
                  onChange={(ev) => setRental(ev.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="rentalOption"
                  value="no"
                  checked={rental === "no"}
                  onChange={(ev) => setRental(ev.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                />
                No
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="mb-8">
            <button type="submit" className="primary w-full">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarPageForm;
