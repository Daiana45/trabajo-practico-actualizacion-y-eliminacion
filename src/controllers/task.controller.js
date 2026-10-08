import { matchedData } from "express-validator";

import { PersonModel } from "../models/person.model.js";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";


export const createTask = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const task = await TaskModel.create(validatedData);

    return res.status(201).json({
      message: "Tarea creada correctamente",
      task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};


export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll({
      attributes: {
        exclude: ["user_id"],
      },
//se usa personmodel
      include: [
        {
          model: UserModel,
          as: "author",

          attributes: {
            exclude: ["password", "person_id"],
          },

          include: [
            {
              model: PersonModel,
              as: "owner",
            },
          ],
        },
      ],
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          as: "author",

          attributes: {
            exclude: ["password", "person_id"],
          },
        },
      ],
    });

    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    // Solamente obtenemos los datos enviados y validados.
    const validatedData = matchedData(req, {
      locations: ["body"], //de todo lo valdo, dame solamente lo que vino en el body
    });

    if (Object.keys(validatedData).length === 0) {
      return res.status(400).json({
        message: "Debe enviar al menos un campo para actualizar",
      });
    }

    await task.update(validatedData);

    return res.status(200).json({
      message: "Tarea actualizada correctamente",
      task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    await task.destroy(); //solo hace el borrado logico si en el model esta paranoid: true;

    return res.status(200).json({
      message: "Tarea eliminada correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};