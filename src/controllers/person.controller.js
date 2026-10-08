import { matchedData } from "express-validator";

import { PersonModel } from "../models/person.model.js";

// crear a la persona
// post /api/people
export const createPerson = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const person = await PersonModel.create(validatedData);

    return res.status(201).json({
      message: "Persona creada correctamente",
      person,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// obtener a todas las personas
// get /api/people
export const getAllPeople = async (req, res) => {
  try {
    // Como Person tiene paranoid:true,
    // los registros eliminados lógicamente NO aparecen.
    const people = await PersonModel.findAll({
      paranoid: false, //para que venga el dato que se elimino
  });
  //findAll() personas activas findAll({paranoid: false}) personas activas y personas eliminadas logicamente

    return res.status(200).json(people);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// get /api/people/:id

export const getPersonById = async (req, res) => {
  try {
    const { id } = req.params;

    const person = await PersonModel.findByPk(id);

    if (!person) {
      return res.status(404).json({
        message: "Persona no encontrada",
      });
    }

    return res.status(200).json(person);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// put /api/people/:id

export const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;

    const person = await PersonModel.findByPk(id);

    if (!person) {
      return res.status(404).json({
        message: "Persona no encontrada",
      });
    }

    // Obtenemos únicamente los campos enviados y validados.
    const validatedData = matchedData(req, {
      locations: ["body"],
    });

    if (Object.keys(validatedData).length === 0) {
      return res.status(400).json({
        message: "Debe enviar al menos un campo para actualizar",
      });
    }

    await person.update(validatedData);

    return res.status(200).json({
      message: "Persona actualizada correctamente",
      person,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// delete /api/people/:id

export const deletePerson = async (req, res) => {
  try {
    const { id } = req.params;

    const person = await PersonModel.findByPk(id);

    if (!person) {
      return res.status(404).json({
        message: "Persona no encontrada",
      });
    }

    // Person tiene: paranoid: true por eso destroy() no elimina físicamente.Sequelize coloca la fecha de eliminación en deletedAt.

    await person.destroy();

    return res.status(200).json({
      message: "Persona eliminada correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};