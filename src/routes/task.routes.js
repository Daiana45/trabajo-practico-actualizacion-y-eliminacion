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
} from "../middlewares/validations/task.validation.js";

// Router de tareas.
export const taskRouter = Router();

// ======================================================
// CREAR
// POST /api/tasks
// ======================================================

taskRouter.post(
  "/tasks",
  createTaskValidation,
  validate,
  createTask,
);

// ======================================================
// OBTENER TODAS
// GET /api/tasks
// ======================================================

taskRouter.get(
  "/tasks",
  getAllTasks,
);

// ======================================================
// OBTENER UNA
// GET /api/tasks/:id
// ======================================================

taskRouter.get(
  "/tasks/:id",
  idValidation,
  validate,
  getTaskById,
);

// ======================================================
// ACTUALIZAR
// PUT /api/tasks/:id
// ======================================================

taskRouter.put(
  "/tasks/:id",
  updateTaskValidation,
  validate,
  updateTask,
);

// ======================================================
// ELIMINAR
// DELETE /api/tasks/:id
// ======================================================

taskRouter.delete(
  "/tasks/:id",
  idValidation,
  validate,
  deleteTask,
);