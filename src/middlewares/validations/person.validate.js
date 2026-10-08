import { body, param } from "express-validator";

export const createPersonValidation = [
  body("name") // busca el campo name dentro del body
    .notEmpty() // comprueba que no venga vacío
    .withMessage("El name no debe estar vacio"), // mensaje si la validación falla

  body("lastname") // busca el campo lastname dentro del body
    .notEmpty() // comprueba que no venga vacío
    .withMessage("El lastname no debe estar vacio"), // mensaje que se guarda si está vacío
];

export const updatePersonValidation = [
  param("id") // obtiene el id que viene en la url
    .isInt() // comprueba que el id sea un número entero
    .withMessage("El id debe ser un numero entero"), // mensaje si no es entero

  body("name") // obtiene el name enviado en el body
    .optional() // permite que el campo no sea enviado
    .notEmpty() // si se envía, no puede venir vacío
    .withMessage("El name no debe estar vacio"), // mensaje si viene vacío

  body("lastname") // obtiene el lastname enviado en el body
    .optional() // permite actualizar sin enviar el apellido
    .notEmpty() // si se envía, no puede venir vacío
    .withMessage("El lastname no debe estar vacio"), // mensaje si viene vacío
];

export const idValidation = [
  param("id") // obtiene el id desde la url
    .isInt() // comprueba que sea un número entero
    .withMessage("El id debe ser un numero entero"), // mensaje si el formato no es correcto
];