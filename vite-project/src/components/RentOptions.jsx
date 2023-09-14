import React from "react";

function RentOptions({
  showRentOptions,
  checkIn,
  checkOut,
  handleCheckInChange,
  handleCheckOutChange,
  handleChange,
  toggleRentOptions,
  rentIt,
  cancelRent,
}) {
  return (
    <div className="flex gap-6 items-center">
      {" "}
      <div className="flex gap-6 justify-center items-center">
        <div>
          <p className="font-bold text-black flex w text-lg mt-2">
            Rent Options:
          </p>
          <div className="block">
            <label
              htmlFor="checkInDate"
              className="font-semibold flex text-black text-lg mb-1 border-t border-black w-fit"
            >
              Check In Date
            </label>
            <input
              type="date"
              id="checkInDate"
              value={checkIn}
              onChange={handleCheckInChange}
              className="block mt-1 text-black font-semibold text-md mb-1 bg-transparent"
            />
            <label
              htmlFor="checkOutDate"
              className="mt-4 font-semibold flex text-black text-lg mb-1"
            >
              Check Out Date
            </label>
            <input
              type="date"
              id="checkOutDate"
              value={checkOut}
              onChange={handleCheckOutChange}
              className="block mt-1 font-semibold text-black text-md mb-1 border-black border-b bg-transparent"
            />
          </div>
          <div className="block m-0 p-0">
            <div>
              <form className="w-1/2 h-1/2">
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="text-black"
                />
                <input
                  type="number"
                  name="age"
                  onChange={handleChange}
                  placeholder="age"
                  className="text-black"
                />
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  placeholder="address"
                  className="text-black"
                />
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  placeholder="city"
                  className="text-black"
                />
                <input
                  type="text"
                  name="zipcode"
                  onChange={handleChange}
                  placeholder="zipcode"
                  className="text-black"
                />
                <input
                  type="text"
                  name="indetificaitonID"
                  onChange={handleChange}
                  placeholder="Indetificaiton ID"
                  className="text-black"
                />
              </form>
            </div>
            <div>
              <button
                onClick={toggleRentOptions && rentIt}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentOptions;
