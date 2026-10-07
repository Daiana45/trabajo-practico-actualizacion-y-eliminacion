import { body, param } from "express-validator";

// ======================================================
// CREAR PERSONA
// ======================================================

export const createPersonValidation = [
  body("name")
    .notEmpty()
    .withMessage("El name no debe estar vacio"),

  body("lastname")
    .notEmpty()
    .withMessage("El lastname no debe estar vacio"),
];

// ======================================================
// ACTUALIZAR PERSONA
// ======================================================
//
// Los campos son opcionales porque podemos modificar
// solamente una parte de la persona.
//

export const updatePersonValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero"),

  body("name")
    .optional()
    .notEmpty()
    .withMessage("El name no debe estar vacio"),

  body("lastname")
    .optional()
    .notEmpty()
    .withMessage("El lastname no debe estar vacio"),
];

// ======================================================
// VALIDAR ID
// ======================================================

export const idValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero"),
];