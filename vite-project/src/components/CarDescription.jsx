import React from "react";

function CarDescription({ description, model, year, color, mileage }) {
  return (
    <div className="h-fit w-fit">
      <p className="text-gray-600 mb-4 font-semibold un un:hover">
        {description}
      </p>
      <p className="font-semibold text-lg mb-1">Model: {model}</p>
      <p className="font-semibold text-lg mb-1">Year: {year}</p>
      <p className="font-semibold text-lg mb-1">Color: {color}</p>
      <p className="font-semibold text-lg mb-1">Mileage: {mileage} km</p>
    </div>
  );
}

export default CarDescription;
