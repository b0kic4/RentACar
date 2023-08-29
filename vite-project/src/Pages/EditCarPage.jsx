import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditCarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [carDetails, setCarDetails] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    mileage: "",
    price: "",
    description: "",
    image: [],
    seats: "",
    doors: "",
    fuel: "",
    rental: "",
    rentalPrice: "",
    rentalDateIn: "",
    rentalDateOut: "",
    booked: "",
  });
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get(`/cars/${id}`)
      .then((response) => {
        setCarDetails(response.data);
        setFormData(response.data); // Initialize form data with existing car details
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
      });
  }, [id]);

  function handleImageUpload(e) {
    const formData = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("images", selectedImages[i]);
    }

    axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const filenames = response.data;
        setFormData((prevData) => ({
          ...prevData,
          image: filenames,
        }));
        setSelectedImages(e.target.files);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  }

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    handleImageUpload();
    axios
      .put(`/cars/${id}`, formData)
      .then((response) => {
        console.log(response);
        navigate.push(`/my-cars`);
      })
      .catch((error) => {
        console.error("Error editing car:", error);
      });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => {
      const updatedImages = [...prevData.image];
      updatedImages.splice(index, 1); // Remove the image at the specified index
      return {
        ...prevData,
        image: updatedImages,
      };
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Edit Car Details</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8"
      >
        <label className="block mb-2 font-semibold">Brand</label>
        <input
          type="text"
          name="brand"
          value={formData.brand || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label className="block mb-2 font-semibold">Model</label>
        <input
          type="text"
          name="model"
          value={formData.model || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label className="block mb-2 font-semibold">Year</label>
        <input
          type="text"
          name="year"
          value={formData.year || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label className="block mb-2 font-semibold">Color</label>
        <input
          type="text"
          name="Color"
          value={formData.color || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label className="block mb-2 font-semibold">Price</label>
        <input
          type="text"
          name="price"
          value={formData.price || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <div>
          <label className="block mb-2 font-semibold">Photos</label>
          <input
            type="file"
            name="images"
            multiple
            required
            onChange={handleImageUpload}
          />
          {formData.image && formData.image.length > 0 && (
            <div className="mt-4">
              <h2 className="text-2xl">Uploaded Images:</h2>
              <div className="flex flex-wrap mt-2">
                {formData.image.map((filename, index) => (
                  <div key={index} className="m-2 relative">
                    <img
                      src={`http://localhost:4000/uploads/${filename}`}
                      alt={`Uploaded ${index + 1}`}
                      className="w-32 h-32 object-cover"
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
        <label className="block mb-2 font-semibold">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label className="block mb-2 font-semibold">Mileage</label>
        <input
          type="text"
          name="mileage"
          value={formData.mileage || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label className="block mb-2 font-semibold">Fuel</label>
        <input
          type="text"
          name="fuel"
          value={formData.fuel || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label className="block mb-2 font-semibold">Seats</label>
        <input
          type="text"
          name="Seats"
          value={formData.Seats || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label className="block mb-2 font-semibold">Doors</label>
        <input
          type="text"
          name="doors"
          value={formData.doors || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label className="block mb-2 font-semibold">Rental</label>
        <input
          type="text"
          name="rental"
          value={formData.rental || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label className="block mb-2 font-semibold">Rental Price</label>
        <input
          type="string"
          name="Rental Price"
          value={formData.rentalPrice || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label className="block mb-2 font-semibold">Rental Date In</label>
        <input
          type="date"
          name="rentalDateIn"
          value={formData.rentalDateIn || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label className="block mb-2 font-semibold">Rental Date Out</label>
        <input
          type="date"
          name="rentalDateOut"
          value={formData.rentalDateOut || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label className="block mb-2 font-semibold">Booked</label>
        <input
          type="boolean"
          name="Booked"
          value={formData.booked || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditCarPage;
