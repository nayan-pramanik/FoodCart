
require("dotenv").config();
const mongoose = require("mongoose");
const Food = require("./models/Food");

const foods = [
  {
    name: "Royal Chicken Biryani",
    restaurant: "The Biryani House",
    category: "Biryani",
    price: 249,
    rating: 4.8,
    time: "25–30 min",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Classic Cheese Pizza",
    restaurant: "Oven & Crust",
    category: "Pizza",
    price: 199,
    rating: 4.6,
    time: "20–25 min",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Smash Beef Burger",
    restaurant: "Burger District",
    category: "Burgers",
    price: 179,
    rating: 4.7,
    time: "15–20 min",
    tag: "Must try",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Creamy Alfredo Pasta",
    restaurant: "Pasta Stories",
    category: "Chinese",
    price: 229,
    rating: 4.5,
    time: "20–25 min",
    tag: "Chef's pick",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Chocolate Lava Cake",
    restaurant: "Sweet Cravings",
    category: "Desserts",
    price: 129,
    rating: 4.9,
    time: "15–20 min",
    tag: "Top rated",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Veggie Supreme Pizza",
    restaurant: "Oven & Crust",
    category: "Pizza",
    price: 219,
    rating: 4.6,
    time: "25–30 min",
    tag: "Fresh pick",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Crispy Chicken Burger",
    restaurant: "Burger District",
    category: "Burgers",
    price: 159,
    rating: 4.7,
    time: "15–20 min",
    tag: "Fan favourite",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Hyderabadi Veg Biryani",
    restaurant: "The Biryani House",
    category: "Biryani",
    price: 189,
    rating: 4.5,
    time: "25–30 min",
    tag: "Vegetarian",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=85",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Avoid inserting duplicate copies if this script is run again.
    for (const food of foods) {
      await Food.updateOne(
        { name: food.name, restaurant: food.restaurant },
        { $setOnInsert: food },
        { upsert: true }
      );
    }

    console.log("FoodCart menu seeded successfully!");
    console.log(`${foods.length} menu items processed.`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
