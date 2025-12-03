import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "Data inserted successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const results = await userServices.getUsers();
    res.status(200).json({
      success: true,
      message: "Users retrived successfully",
      data: results.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: err,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await userServices.getUserById(id!);
    if (result.rows.length < 1) {
      res.status(404).json({
        success: false,
        message: "Could not find the user",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User retrived successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const { name, email } = req.body;
  try {
    const result = await userServices.updateUserById(name, email, id as string);
    if (result.rows.length < 1) {
      res.status(404).json({
        success: false,
        message: "Could not update user",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await userServices.deleteUserById(id!);
    console.log(result);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Could not delete the user",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Deleted successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Export the all function
export const userControllers = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
