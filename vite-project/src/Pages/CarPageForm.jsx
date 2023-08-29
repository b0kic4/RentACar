import React, { useState } from "react";
import axios from "axios";

const CarPageForm = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuel, setFuel] = useState("");
  const [engine, setEngine] = useState("");
  const [seats, setSeats] = useState("");
  const [doors, setDoors] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [rental, setRental] = useState(false);
  const [rentalDateIn, setRentalDateIn] = useState("");
  const [rentalDateOut, setRentalDateOut] = useState("");
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
      rentalDateIn,
      rentalDateOut,
      rentalPrice,
    };
    try {
      const response = await axios.post("/cars", carData);
      console.log("Car created", response.data);
    } catch (err) {
      console.log("Error creating the car" + err);
    }
  }

  return (
    <>
      <div className="px-20">
        <form
          onSubmit={saveCarForm}
          method="post"
          encType="multipart/form-data"
        >
          {preInput("Brand", "Brand of your car")}
          <input
            type="text"
            value={brand}
            onChange={(ev) => setBrand(ev.target.value)}
            placeholder="Tesla"
            name="images"
            required
          />

          {preInput("Model", "Model of your car")}
          <input
            type="text"
            value={model}
            onChange={(ev) => setModel(ev.target.value)}
            placeholder="Model, for example: Y"
            required
          />
          <div>
            {preInput("Photos", "More = better")}
            <input type="file" onChange={uploadPhoto} multiple required />
            {image.length > 0 && (
              <div className="mt-4">
                <h2 className="text-2xl">Uploaded Images:</h2>
                <div className="flex flex-wrap mt-2">
                  {image.map((filename, index) => (
                    <div key={index} className="m-2 relative">
                      <img
                        src={`http://localhost:4000/uploads/${filename}`}
                        alt={`Uploaded ${index + 1}`}
                        className="lg:w-44 lg:h-44 md:w-32 md:h-32 object-cover rounded-2xl"
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

          <div>
            <h2 className="text-xl font-semibold mt-4">Description</h2>
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Description for your car"
              required
            />
          </div>
          {preInput("Mileage", "How much your car have been driven")}
          <input
            type="text"
            value={mileage}
            onChange={(ev) => setMileage(ev.target.value)}
            placeholder="Mileage, for example: 190000km"
            required
          />
          {preInput("Color", "Which Color Is Your Car Painted In")}
          <input
            type="text"
            value={color}
            onChange={(ev) => setColor(ev.target.value)}
            placeholder="Color, White, Green, Blue, or Black ..."
            required
          />
          {preInput("Year", "In Which Year Have Your Car Been Created")}
          <input
            type="number"
            value={year}
            onChange={(ev) => setYear(ev.target.value)}
            placeholder="2023"
            required
          />
          {preInput("Fuel", "Diesel fuel Bensein fuel Electric")}
          <input
            type="text"
            value={fuel}
            onChange={(ev) => setFuel(ev.target.value)}
            placeholder="Fuel, for example: Diesel"
            required
          />

          {preInput("Seats", "How many seats?")}
          <input
            type="number"
            value={seats}
            onChange={(ev) => setSeats(ev.target.value)}
            placeholder="Seats, for example: 4"
            required
          />
          {preInput("Doors", "How many doors is it coupe, suv, limuzine")}
          <input
            type="text"
            value={doors}
            onChange={(ev) => setDoors(ev.target.value)}
            placeholder="Doors, for example: 2"
            required
          />
          {preInput("Full Price", "How much you value this car")}
          <input
            type="text"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            placeholder="Price, for example: 20 000$"
            required
          />

          {preInput(
            "Rental Date In and Rental Date Out times",
            "Rental Date In and Rental Date Out times"
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-1/2">
            <div>
              <h3 className="mt-2 -mb-1">Rental Date In Time:</h3>
              <input
                type="text"
                value={rentalDateIn}
                onChange={(ev) => setRentalDateIn(ev.target.value)}
                placeholder="16:00h"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 inline-flex">Rental Date Out Time:</h3>
              <input
                type="text"
                value={rentalDateOut}
                onChange={(ev) => setRentalDateOut(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Rental Price:</h3>
              <input
                type="number"
                value={rentalPrice}
                onChange={(ev) => setRentalPrice(ev.target.value)}
              />
            </div>
            <div className="font-semibold">
              <h1 className="font-semibold text-lg">Rentable?</h1>
              <div className="inline-flex gap-2 text-center items-center text-xl">
                <label>
                  <input
                    type="radio"
                    name="rentalOption"
                    value="yes"
                    checked={rental === "yes"}
                    onChange={(ev) => setRental(ev.target.value)}
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
                  />
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <button type="submit" className="primary w-1/2">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CarPageForm;
