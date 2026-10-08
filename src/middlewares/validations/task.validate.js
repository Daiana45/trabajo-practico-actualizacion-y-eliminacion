import { body, param } from "express-validator";
import { TaskModel } from "../../models/task.model.js";
import { UserModel } from "../../models/user.model.js";

export const createTaskValidation = [
  body("title") // busca el campo title dentro del body
    .notEmpty() // comprueba que se haya enviado
    .withMessage("El title no debe estar vacio") // mensaje si está vacío
    .isLength({ max: 100 }) // comprueba que no supere los 100 caracteres
    .withMessage("El title no puede superar los 100 caracteres") // mensaje si supera el límite
    .custom(async (title) => { // realiza una comprobación personalizada
      const task = await TaskModel.findOne({ where: { title } }); // busca otra tarea con el mismo título

      if (task) {
        throw new Error("Ya existe una tarea con ese titulo"); // informa si el título ya existe
      }

      return true; // indica que la validación fue correcta
    }),

  body("description") // busca el campo description dentro del body
    .notEmpty() // comprueba que se haya enviado
    .withMessage("La description no debe estar vacia") // mensaje si está vacío
    .isLength({ max: 100 }) // comprueba que no supere los 100 caracteres
    .withMessage("La description no puede superar los 100 caracteres"), // mensaje si supera el límite

  body("user_id") // busca el campo user_id dentro del body
    .notEmpty() // comprueba que se haya enviado
    .withMessage("El user_id no debe estar vacio") // mensaje si está vacío
    .isInt({ min: 1 }) // comprueba que sea un entero mayor o igual a 1
    .withMessage("El user_id debe ser un numero entero") // mensaje si no es válido
    .custom(async (user_id) => { // comprueba si existe el usuario
      const user = await UserModel.findByPk(user_id); // busca el usuario por su id

      if (!user) {
        throw new Error("El usuario no existe"); // informa si no encuentra el usuario
      }

      return true; // indica que la validación fue correcta
    }),
];

export const updateTaskValidation = [
  param("id") // obtiene el id que viene en la url
    .isInt({ min: 1 }) // comprueba que sea un entero mayor o igual a 1
    .withMessage("El id debe ser un numero entero") // mensaje si no es válido
    .custom(async (id) => { // comprueba si existe la tarea
      const task = await TaskModel.findByPk(id); // busca la tarea por su id

      if (!task) {
        throw new Error("La tarea no existe"); // informa si no encuentra la tarea
      }

      return true; // indica que la validación fue correcta
    }),

  body("title") // busca el campo title dentro del body
    .optional() // permite no enviarlo
    .notEmpty() // si se envía, no puede estar vacío
    .withMessage("El title no debe estar vacio") // mensaje si está vacío
    .isLength({ max: 100 }) // comprueba que no supere los 100 caracteres
    .withMessage("El title no puede superar los 100 caracteres"), // mensaje si supera el límite

  body("description") // busca el campo description dentro del body
    .optional() // permite no enviarlo
    .notEmpty() // si se envía, no puede estar vacío
    .withMessage("La description no debe estar vacia") // mensaje si está vacío
    .isLength({ max: 100 }) // comprueba que no supere los 100 caracteres
    .withMessage("La description no puede superar los 100 caracteres"), // mensaje si supera el límite

  body("user_id") // busca el campo user_id dentro del body
    .optional() // permite no enviarlo
    .isInt({ min: 1 }) // comprueba que sea un entero mayor o igual a 1
    .withMessage("El user_id debe ser un numero entero") // mensaje si no es válido
    .custom(async (user_id) => { // comprueba si existe el usuario
      const user = await UserModel.findByPk(user_id); // busca el usuario por su id

      if (!user) {
        throw new Error("El usuario no existe"); // informa si no encuentra el usuario
      }

      return true; // indica que la validación fue correcta
    }),
];

export const idValidation = [
  param("id") // obtiene el id que viene en la url
    .isInt({ min: 1 }) // comprueba que sea un entero mayor o igual a 1
    .withMessage("El id debe ser un numero entero") // mensaje si no es válido
    .custom(async (id) => { // comprueba si existe la tarea
      const task = await TaskModel.findByPk(id); // busca la tarea por su id

      if (!task) {
        throw new Error("La tarea no existe"); // informa si no encuentra la tarea
      }

      return true; // indica que la validación fue correcta
    }),
];