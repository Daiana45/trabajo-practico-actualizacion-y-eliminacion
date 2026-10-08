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
} from "../middlewares/validations/user.validate.js";

export const userRouter = Router(); // crea el router donde se agrupan las rutas de usuarios

userRouter.post(
  "/users",
  createUserValidation, // valida los datos enviados para crear el usuario
  validate, // comprueba si hubo errores en las validaciones
  createUser, // crea el usuario si los datos son correctos
);

userRouter.get(
  "/users",
  getAllUsers, // obtiene todos los usuarios
);

userRouter.get(
  "/users/:id",
  idValidation, // valida el id recibido en la url
  validate, // comprueba si el id tiene errores
  getUserById, // busca el usuario correspondiente al id
);

userRouter.put(
  "/users/:id",
  updateUserValidation, // valida el id y los campos enviados para modificar
  validate, // comprueba el resultado de las validaciones
  updateUser, // actualiza el usuario
);

userRouter.delete(
  "/users/:id",
  idValidation, // valida el id antes de eliminar
  validate, // comprueba si hay errores
  deleteUser, // elimina el usuario
);