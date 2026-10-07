import { matchedData } from "express-validator";

import { UserModel } from "../models/user.model.js";

// ======================================================
// CREAR USUARIO
// POST /api/users
// ======================================================

export const createUser = async (req, res) => {
  try {
    // matchedData obtiene solamente los datos que
    // fueron validados por express-validator.
    const validatedData = matchedData(req);

    const user = await UserModel.create(validatedData);

    return res.status(201).json({
      message: "Usuario creado correctamente",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// ======================================================
// OBTENER TODOS LOS USUARIOS
// GET /api/users
// ======================================================

export const getAllUsers = async (req, res) => {
  try {
    // findAll utiliza las consultas normales de Sequelize.
    //
    // Si un modelo tiene paranoid:true, los registros
    // eliminados lógicamente quedan excluidos automáticamente.
    const users = await UserModel.findAll();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// ======================================================
// OBTENER USUARIO POR ID
// GET /api/users/:id
// ======================================================

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// ======================================================
// ACTUALIZAR USUARIO
// PUT /api/users/:id
// ======================================================

export const updateUser = async (req, res) => {
  try {
    // Obtenemos el ID desde la URL.
    const { id } = req.params;

    // Buscamos el usuario.
    const user = await UserModel.findByPk(id);

    // Si no existe...
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    // ==================================================
    // matchedData()
    // ==================================================
    //
    // Obtiene solamente los campos del BODY que pasaron
    // las validaciones.
    //
    // Esto evita pasar datos inesperados directamente
    // desde req.body al modelo.
    //

    const validatedData = matchedData(req, {
      locations: ["body"],
    });

    // No permitimos una actualización vacía.
    if (Object.keys(validatedData).length === 0) {
      return res.status(400).json({
        message: "Debe enviar al menos un campo para actualizar",
      });
    }

    // Actualizamos solamente los datos validados.
    await user.update(validatedData);

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// ======================================================
// ELIMINAR USUARIO
// DELETE /api/users/:id
// ======================================================

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    // destroy() normalmente eliminaría el registro.
    //
    // Pero en este caso UserModel no tiene paranoid.
    //
    // Por eso esta eliminación es física.
    await user.destroy();

    return res.status(200).json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};