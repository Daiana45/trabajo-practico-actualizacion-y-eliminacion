import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";

export const PersonModel = sequelize.define(
  "Person",
  {
    name: {
      type: DataTypes.STRING(100), // guarda una cadena de hasta 100 caracteres
      allowNull: false, // este campo es obligatorio
    },

    lastname: {
      type: DataTypes.STRING(100), // guarda el apellido con un máximo de 100 caracteres
      allowNull: false, // no permite guardar el campo como null
    },
  },
  {
    timestamps: true, // agrega automáticamente createdAt y updatedAt
    paranoid: true, // destroy() marca deletedAt en lugar de eliminar el registro
  },
);