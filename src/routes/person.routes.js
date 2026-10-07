import { Router } from "express";

import {
  createPerson,
  deletePerson,
  getAllPeople,
  getPersonById,
  updatePerson,
} from "../controllers/person.controller.js";

import { validate } from "../middlewares/validate.js";

import {
  createPersonValidation,
  updatePersonValidation,
  idValidation,
} from "../middlewares/validations/person.validation.js";

// Router de personas.
export const personRouter = Router();

// ======================================================
// CREAR
// POST /api/people
// ======================================================

personRouter.post(
  "/people",
  createPersonValidation,
  validate,
  createPerson,
);

// ======================================================
// OBTENER TODOS
// GET /api/people
// ======================================================

personRouter.get(
  "/people",
  getAllPeople,
);

// ======================================================
// OBTENER UNO
// GET /api/people/:id
// ======================================================

personRouter.get(
  "/people/:id",
  idValidation,
  validate,
  getPersonById,
);

// ======================================================
// ACTUALIZAR
// PUT /api/people/:id
// ======================================================

personRouter.put(
  "/people/:id",
  updatePersonValidation,
  validate,
  updatePerson,
);

// ======================================================
// ELIMINACIÓN LÓGICA
// DELETE /api/people/:id
// ======================================================

personRouter.delete(
  "/people/:id",
  idValidation,
  validate,
  deletePerson,
);