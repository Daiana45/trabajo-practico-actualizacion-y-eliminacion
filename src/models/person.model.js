import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";

// ======================================================
// MODELO PERSON
// ======================================================

export const PersonModel = sequelize.define(
  "Person",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    // Sequelize crea createdAt y updatedAt.
    timestamps: true,

    // ==================================================
    // ELIMINACIÓN LÓGICA
    // ==================================================
    //
    // Cuando usamos destroy(), Sequelize NO elimina
    // físicamente el registro.
    //
    // En su lugar completa deletedAt.
    //
    paranoid: true,
  },
);