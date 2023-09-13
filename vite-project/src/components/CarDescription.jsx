import React from "react";

function CarDescription({ description, model, year, color, mileage }) {
  return (
    <div className="h-fit w-fit un un:hover">
      <p className="text-black mb-4 font-semibold un un:hover text-xl">
        {description}
      </p>
      <p className="font-semibold text-xl mb-1 text-black">Model: {model}</p>
      <p className="font-semibold text-xl mb-1 text-black">Year: {year}</p>
      <p className="font-semibold text-xl mb-1 text-black">Color: {color}</p>
      <p className="font-semibold text-xl mb-1 text-black">
        Mileage: {mileage} km
      </p>
    </div>
  );
}

export default CarDescription;
