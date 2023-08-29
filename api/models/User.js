const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: "string", required: true },
  username: { type: "string", required: true, unique: true, minLenght: "4" },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
