import express from "express";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";
import { userControllers } from "./user.controller";

const Route = express.Router();

// Add User
Route.post("/", userControllers.createUser);

// Get all the users
Route.get("/", logger, auth("Admin"), userControllers.getUsers);

// Get individual user by id
Route.get("/:id", userControllers.getUserById);

// Update user by id
Route.put("/:id", userControllers.updateUserById);

// Delete user by id
Route.delete("/:id", userControllers.deleteUserById);

// Export the Route
export const userRoute = Route;
