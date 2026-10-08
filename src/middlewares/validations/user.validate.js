import { body, param } from "express-validator";

export const createUserValidation = [
  body("name") // busca name dentro de los datos enviados
    .notEmpty() // comprueba que no venga vacío
    .withMessage("El name no debe estar vacio"), // mensaje si está vacío

  body("email") // busca email dentro del body
    .notEmpty() // comprueba que se haya enviado
    .withMessage("El email no debe estar vacio") // mensaje si no se envía
    .isEmail() // comprueba que tenga formato de email
    .withMessage("El email debe ser valido"), // mensaje si el formato es incorrecto

  body("password") // busca password dentro del body
    .notEmpty() // comprueba que no venga vacío
    .withMessage("La password no debe estar vacia"), // mensaje si está vacío

  body("person_id") // busca el id de la persona relacionada con el usuario
    .notEmpty() // comprueba que se haya enviado
    .withMessage("El person_id no debe estar vacio") // mensaje si no se envía
    .isInt() // comprueba que el id sea un número entero
    .withMessage("El person_id debe ser un numero entero"), // mensaje si no es entero
];

export const updateUserValidation = [
  param("id") // obtiene el id que viene en la url
    .isInt() // comprueba que sea un número entero
    .withMessage("El id debe ser un numero entero"), // mensaje si el id no es entero

  body("name") // busca name dentro del body
    .optional() // permite actualizar sin enviar este campo
    .notEmpty() // si se envía, no puede estar vacío
    .withMessage("El name no debe estar vacio"), // mensaje si viene vacío

  body("email") // busca email dentro del body
    .optional() // permite no modificar el email
    .notEmpty() // si se envía, no puede estar vacío
    .withMessage("El email no debe estar vacio") // mensaje si viene vacío
    .isEmail() // comprueba que tenga formato de email
    .withMessage("El email debe ser valido"), // mensaje si el formato es incorrecto

  body("password") // busca password dentro del body
    .optional() // permite no modificar la contraseña
    .notEmpty() // si se envía, no puede estar vacía
    .withMessage("La password no debe estar vacia"), // mensaje si viene vacía

  body("person_id") // busca el id de la persona relacionado al usuario
    .optional() // permite actualizar sin cambiar la persona
    .isInt() // comprueba que sea un número entero
    .withMessage("El person_id debe ser un numero entero"), // mensaje si no es entero
];

export const idValidation = [
  param("id") // obtiene el id desde la url
    .isInt() // comprueba que sea un número entero
    .withMessage("El id debe ser un numero entero"), // mensaje si no es entero
];