
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Food = require("./models/Food");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://food-cart-coral.vercel.app"
  ]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the FoodCart API!",
    status: "running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "FoodCart backend is healthy",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// Return all available food items from MongoDB
app.get("/api/foods", async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = { isAvailable: true };

    if (category && category !== "All") {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { restaurant: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const foods = await Food.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (error) {
    console.error("Failed to fetch foods:", error.message);
    res.status(500).json({
      success: false,
      message: "Unable to fetch the food menu.",
    });
  }
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from server/.env");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`FoodCart server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start FoodCart:", error.message);
    process.exit(1);
  }
}

startServer();
