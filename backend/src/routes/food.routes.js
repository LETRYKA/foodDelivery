import express from "express";
import { orderFood } from "../resolvers/food/order-food.js";

export const foodRouter = express.Router();

foodRouter.post("/food-order", orderFood); // Create food order
foodRouter.get("/food-order", orderFood); // Get food order
foodRouter.get("/food-order/:id", orderFood); // Get food order by userId
foodRouter.patch("/food-order/:foodId", orderFood); //
