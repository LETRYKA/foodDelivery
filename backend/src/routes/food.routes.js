import express from "express";
import {
  orderFood,
  getOrders,
  getOrderById,
  updateOrder,
} from "../resolvers/food/order-food.js";

import {
  createFood,
  getFoodById,
  getFoods,
  updateFood,
  deleteFood,
} from "../resolvers/food/food.js";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../resolvers/food/category.js";

export const foodRouter = express.Router();

// Order Routes
foodRouter.post("/food-order", orderFood); // Create a food order
foodRouter.get("/food-order", getOrders); // Get all food orders
foodRouter.get("/food-order/:userId", getOrderById); // Get food orders by userId
foodRouter.patch("/food-order/:orderId", updateOrder); // Edit food order by orderId

// Food Routes
foodRouter.post("/food", createFood); // Create food
foodRouter.get("/food/:foodId", getFoodById); // Get single food item
foodRouter.get("/food", getFoods); // Get single food item
foodRouter.patch("/food/:foodId", updateFood); // Edit food item
foodRouter.delete("/food/:foodId", deleteFood); // Delete food item

// Food Category Routes
foodRouter.get("/food-category", getCategories); // Get all food categories
foodRouter.post("/food-category", createCategory); // Create a food category
foodRouter.patch("/food-category/:categoryId", updateCategory); // Edit a food category
foodRouter.delete("/food-category/:categoryId", deleteCategory); // Delete a food category
