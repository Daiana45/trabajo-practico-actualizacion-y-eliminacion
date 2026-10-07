import { validationResult } from "express-validator";

// ======================================================
// MIDDLEWARE DE VALIDACIÓN
// ======================================================
//
// Revisa todos los errores generados por
// express-validator.
//
// Si encuentra errores:
//    devuelve 400.
//
// Si no encuentra errores:
//    continúa con el controlador.
//

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  // Si hay errores de validación...
  if (!errors.isEmpty()) {
    const custom = errors.formatWith((error) => {
      return {
        campo: error.path,
        mensaje: error.msg,
      };
    });

    return res.status(400).json({
      message: "Error de validacion",
      errors: custom.array(),
    });
  }

  // Si todo está correcto, continuamos.
  next();
};