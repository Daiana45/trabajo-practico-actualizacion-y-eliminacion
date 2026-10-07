import { body, param } from "express-validator";

// ======================================================
// VALIDACIONES PARA CREAR USUARIO
// ======================================================

export const createUserValidation = [
  body("name")
    .notEmpty()
    .withMessage("El name no debe estar vacio"),

  body("email")
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .isEmail()
    .withMessage("El email debe ser valido"),

  body("password")
    .notEmpty()
    .withMessage("La password no debe estar vacia"),

  body("person_id")
    .notEmpty()
    .withMessage("El person_id no debe estar vacio")
    .isInt()
    .withMessage("El person_id debe ser un numero entero"),
];

// ======================================================
// VALIDACIONES PARA ACTUALIZAR USUARIO
// ======================================================
//
// IMPORTANTE:
//
// En una actualización NO todos los campos son obligatorios.
//
// Por eso utilizamos:
//
// .optional()
//
// Si el campo viene:
//     se valida.
//
// Si el campo NO viene:
//     no genera error.
//

export const updateUserValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero"),

  body("name")
    .optional()
    .notEmpty()
    .withMessage("El name no debe estar vacio"),

  body("email")
    .optional()
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .isEmail()
    .withMessage("El email debe ser valido"),

  body("password")
    .optional()
    .notEmpty()
    .withMessage("La password no debe estar vacia"),

  body("person_id")
    .optional()
    .isInt()
    .withMessage("El person_id debe ser un numero entero"),
];

// ======================================================
// VALIDACIÓN DEL ID
// ======================================================

export const idValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero"),
];