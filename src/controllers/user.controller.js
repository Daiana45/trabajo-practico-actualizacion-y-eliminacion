import { matchedData } from "express-validator";

import { UserModel } from "../models/user.model.js";

// Crear usuario
export const createUser = async (req, res) => {
  try {
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

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// Obtener usuario por ID
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

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const validatedData = matchedData(req, {
      locations: ["body"],
    });

    const { id } = matchedData(req, {
      locations: ["params"],
    });

    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    // Evita hacer un update sin datos
    if (Object.keys(validatedData).length === 0) {
      return res.status(400).json({
        message: "Debe enviar al menos un campo para actualizar",
      });
    }

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

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    // UserModel no tiene paranoid, por lo que se elimina de la tabla
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