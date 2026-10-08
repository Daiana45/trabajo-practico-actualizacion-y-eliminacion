import { Router } from "express";

import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/task.controller.js";

import { validate } from "../middlewares/validate.js";

import {
  createTaskValidation,
  updateTaskValidation,
  idValidation,
} from "../middlewares/validations/task.validate.js";

export const taskRouter = Router(); // crea el router donde se agrupan las rutas de tareas

taskRouter.post(
  "/tasks",
  createTaskValidation, // valida los datos necesarios para crear la tarea
  validate, // revisa si las validaciones encontraron errores
  createTask, // crea la tarea si los datos son correctos
);

taskRouter.get(
  "/tasks",
  getAllTasks, // obtiene todas las tareas
);

taskRouter.get(
  "/tasks/:id",
  idValidation, // comprueba que el id recibido en la url sea válido
  validate, // detiene la petición si el id tiene errores
  getTaskById, // busca la tarea correspondiente al id
);

taskRouter.put(
  "/tasks/:id",
  updateTaskValidation, // valida el id y los campos que se quieren modificar
  validate, // comprueba el resultado de las validaciones
  updateTask, // actualiza la tarea si todo es correcto
);

taskRouter.delete(
  "/tasks/:id",
  idValidation, // valida el id antes de eliminar la tarea
  validate, // comprueba si hubo errores de validación
  deleteTask, // elimina la tarea
);