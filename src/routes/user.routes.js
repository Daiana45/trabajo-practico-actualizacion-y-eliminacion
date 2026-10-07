import { Router } from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

import { validate } from "../middlewares/validate.js";

import {
  createUserValidation,
  updateUserValidation,
  idValidation,
} from "../middlewares/validations/user.validation.js";

// Creamos el router.
export const userRouter = Router();

// ======================================================
// CREAR
// POST /api/users
// ======================================================

userRouter.post(
  "/users",
  createUserValidation,
  validate,
  createUser,
);

// ======================================================
// OBTENER TODOS
// GET /api/users
// ======================================================

userRouter.get(
  "/users",
  getAllUsers,
);

// ======================================================
// OBTENER UNO
// GET /api/users/:id
// ======================================================

userRouter.get(
  "/users/:id",
  idValidation,
  validate,
  getUserById,
);

// ======================================================
// ACTUALIZAR
// PUT /api/users/:id
// ======================================================

userRouter.put(
  "/users/:id",
  updateUserValidation,
  validate,
  updateUser,
);

// ======================================================
// ELIMINAR
// DELETE /api/users/:id
// ======================================================

userRouter.delete(
  "/users/:id",
  idValidation,
  validate,
  deleteUser,
);