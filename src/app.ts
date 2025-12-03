import express, { Request, Response } from "express";

import { initDB, pool } from "./config/DB";
import logger from "./middleware/logger";
import { authRoute } from "./modules/auth/auth.routes";
import { userRoute } from "./modules/users/user.routes";
const app = express();
app.use(express.json());

initDB();

// Main route
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello NExt leveld developers!");
});

// User routes
app.use("/users", userRoute);

// Todso crud

// Post todo
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
      [user_id, title]
    );

    res.status(200).json({
      success: true,
      message: "Todos added successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
// Get all todos
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const results = await pool.query("SELECT * FROM todos");

    res.status(201).json({
      success: true,
      message: "Todos retrived successfully",
      data: results.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: err,
    });
  }
});

// auth route
app.use("/auth", authRoute);

// Not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
