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
} from "../middlewares/validations/person.validate.js";

export const personRouter = Router(); // crea el router donde se agrupan las rutas de personas

personRouter.post(
  "/people",
  createPersonValidation, // valida los datos enviados para crear la persona
  validate, // revisa si las validaciones anteriores encontraron errores
  createPerson, // si todo está correcto, ejecuta el controlador
);

personRouter.get(
  "/people",
  getAllPeople, // obtiene todas las personas
);

personRouter.get(
  "/people/:id",
  idValidation, // comprueba que el id recibido en la url sea válido
  validate, // detiene la petición si el id tiene errores
  getPersonById, // busca la persona usando ese id
);

personRouter.put(
  "/people/:id",
  updatePersonValidation, // valida el id y los campos que se quieren modificar
  validate, // comprueba el resultado de las validaciones
  updatePerson, // actualiza la persona si los datos son correctos
);

personRouter.delete(
  "/people/:id",
  idValidation, // valida el id antes de intentar eliminar
  validate, // comprueba si hubo errores
  deletePerson, // realiza la eliminación lógica
);