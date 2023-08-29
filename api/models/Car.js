const mongoose = require("mongoose");
const { Schema } = mongoose;

const carSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: String, required: true },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  mileage: { type: String, required: true },
  fuel: { type: String, required: true },
  seats: { type: String, required: true },
  doors: { type: Number, required: true },
  rental: { type: Boolean, required: true },
  rentalPrice: { type: String },
  rentalTimeIn: { type: String },
  rentalTimeOut: { type: String },
  rentalDateIn: { type: String },
  rentalDateOut: { type: String },
  rentalDays: { type: String },
  rentedBy: { type: String },
  booked: { type: Boolean },
});

const carModel = mongoose.model("Car", carSchema);

module.exports = carModel;
