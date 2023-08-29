const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Car = require("./models/Car");
const jwt = require("jsonwebtoken");
const jwtSecret = "awdopijoigjdorigjmhdrthgdfpokh";
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await User.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (userDoc) {
    const isMatch = bcrypt.compareSync(password, userDoc.password);

    if (isMatch) {
      jwt.sign(
        {
          username: userDoc.username,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            console.error("Error signing JWT:", err);
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.cookie("token", token, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
            });
            res.json({
              id: userDoc._id,
              username,
              token, // Include the token in the response body
              message: "Successfully logged in",
            });
          }
        }
      );
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.get("/profile", (req, res) => {
  const token = req.cookies.token;
  //   checking the token if it matches the secret jwt value
  jwt.verify(token, jwtSecret, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    cb(null, originalname); // Use the original filename as the stored filename
  },
});

const photosMiddleware = multer({ storage }).array("images", 100);
app.post("/upload", photosMiddleware, (req, res) => {
  const token = req.cookies.token;
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i]; // Use originalname instead of originalName
    if (originalname) {
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path.replace(/\.[^.]+$/, "") + "." + ext; // Construct the new path correctly
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads\\", ""));
    }
  }
  console.log(uploadedFiles);
  res.json(uploadedFiles);
});

// displaying the car

app.post("/cars", (req, res) => {
  const token = req.cookies.token;
  console.log(req.body);
  console.log(req.files);
  const {
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
    booked,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, carData) => {
    if (err) throw err;
    const carDoc = await Car.create({
      owner: carData.id,
      brand,
      model,
      color,
      price,
      description,
      images: image,
      fuel,
      rental,
      rentalTimeIn,
      rentalTimeOut,
      rentalDateIn,
      rentalDateOut,
      rentalPrice,
      doors,
      seats,
      mileage,
      year,
      brand,
      booked,
    });
    res.json(carDoc);
    console.log(carDoc);
  });
});

// Edit a car
app.put("/cars/:id", async (req, res) => {
  const token = req.cookies.token;
  const carId = req.params.id;
  const {
    brand,
    model,
    color,
    price,
    description,
    image,
    fuel,
    rental,
    rentalTimeIn,
    rentalTimeOut,
    rentalDateIn,
    rentalDateOut,
    rentalPrice,
    doors,
    seats,
    mileage,
    year,
    booked,
  } = req.body;

  try {
    jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const carDoc = await Car.findById(carId);

      if (!carDoc) {
        return res.status(404).json({ message: "Car not found" });
      }

      if (userData.id !== carDoc.owner.toString()) {
        return res
          .status(403)
          .json({ message: "You are not the owner of this car" });
      }
      carDoc.set({
        brand,
        model,
        color,
        price,
        description,
        fuel,
        rental,
        rentalTimeIn,
        rentalTimeOut,
        rentalDateIn,
        rentalDateOut,
        rentalPrice,
        doors,
        seats,
        mileage,
        year,
        images: image,
        booked,
      });

      await carDoc.save();
      res.json({ message: "Car updated successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/my-cars", async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, jwtSecret, async (err, userData) => {
    if (err) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    console.log("User ID:", userData); // Log user ID

    try {
      const cars = await Car.find({ owner: userData.id });
      console.log("Fetched cars:", cars); // Log fetched cars
      res.json(cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
      res.status(500).json({ error: "Error fetching cars" });
    }
  });
});

app.get("/cars", async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, jwtSecret, async (err, userData) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const cars = await Car.find();
    res.json(cars);
  });
});

app.get("/cars/:id", async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, jwtSecret, async (err, userData) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.params;
    res.json(await Car.findById(id));
  });
});

app.put("/cars/:id/rent", async (req, res) => {
  const token = req.cookies.token;
  const carId = req.params.id;

  jwt.verify(token, jwtSecret, async (err, userData) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const car = await Car.findById(carId);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      if (
        car.booked &&
        car.rentalDateIn &&
        car.rentalDateOut &&
        req.body.rentalDays &&
        req.body.rentalPrice
      ) {
        return res.status(400).json({ message: "Car is already booked" });
      }
      car.booked = true;
      car.rentedBy = userData.id;
      car.rentalDateIn = req.body.rentalDateIn;
      car.rentalDateOut = req.body.rentalDateOut;
      car.rentalDays = req.body.rentalDays;
      car.rentalPrice = req.body.rentalPrice; // Make sure to set rentalPrice too
      await car.save();
      res.json({ message: "Car successfully booked" });
    } catch (error) {
      if (err) throw err;
    }
  });
});

app.put("/cars/:id/rent/cancel", async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, jwtSecret, async (err, userData) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const carId = req.params.id;
    try {
      const car = await Car.findById(carId);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      if (!car.booked) {
        return res.status(400).json({ message: "Car is not currently booked" });
      }
      car.booked = false;
      car.rentedBy = null;
      car.rentalDateIn = null;
      car.rentalDateOut = null;
      await car.save();
      res.json({ message: "Car rent successfully canceled" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while canceling rent" });
    }
  });
});

app.delete("/cars/:id", async (req, res) => {
  const token = req.cookies.token;
  const carId = req.params.id;
  try {
    jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const carDoc = await Car.findById(carId);
      if (!carDoc) {
        return res.status(404).json({ message: "Car not found" });
      }
      if (userData.id !== carDoc.owner.toString()) {
        return res
          .status(403)
          .json({ message: "You are not the owner of this car" });
      }
      await carDoc.deleteOne();
      res.json({ message: "Car deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch rented cars for a user
app.get("/profile/rented_cars", async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, jwtSecret, async (err, userData) => {
    if (err) throw err;

    try {
      const rentedCars = await Car.find({ rentedBy: userData.id });
      res.json(rentedCars);
    } catch (error) {
      console.error("Error fetching rented cars:", error);
      res.status(500).json({ error: "Error fetching rented cars" });
    }
  });
});

app.listen(4000);
