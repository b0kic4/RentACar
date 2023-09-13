import React from "react";

function CarImages({ images }) {
  // Check if images is an array before mapping over it
  if (!Array.isArray(images)) {
    return null; // Or you can return some default content or a loading indicator
  }
  return (
    <div className="h-fit w-fit">
      {images.map((imageFilename) => (
        <img
          key={imageFilename}
          src={`http://localhost:4000/uploads/${imageFilename}`}
          alt={imageFilename}
          className="w-screen h-80 object-cover rounded-lg mb-4"
        />
      ))}
    </div>
  );
}

export default CarImages;
