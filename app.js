const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const ListingRouter = require("./Routes/ListingRoutes");
const RegistrationRouter = require("./Routes/RegistrationRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Logging middleware
app.use(morgan("dev"));

// Routes
app.use("/api/LandRegistry/Listings", ListingRouter); // Listings route
app.use("/api/LandRegistry/Registrations", RegistrationRouter); //Registrations route

module.exports = app;
