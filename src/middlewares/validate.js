import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req); // obtiene los errores de las validaciones anteriores

  if (!errors.isEmpty()) { // comprueba si existe algún error
    const custom = errors.formatWith((error) => { // cambia el formato de cada error
      return {
        campo: error.path, // indica qué campo produjo el error
        mensaje: error.msg, // obtiene el mensaje definido en withMessage()
      };
    });

    return res.status(400).json({ // devuelve un error 400 y detiene la ejecución
      message: "Error de validacion",
      errors: custom.array(), // convierte los errores en un array para enviarlos como respuesta
    });
  }

  next(); // si no hay errores, pasa al siguiente middleware o controlador
};