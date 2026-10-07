import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";
import { PersonModel } from "./person.model.js";

// ======================================================
// MODELO USER
// ======================================================

export const UserModel = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,

      references: {
        model: "People",
        key: "id",
      },
    },
  },
  {
    // Este modelo no necesita eliminación lógica.
    timestamps: false,
  },
);

// ======================================================
// RELACIÓN USER -> PERSON
// ======================================================

UserModel.belongsTo(PersonModel, {
  foreignKey: "person_id",
  as: "owner",
});

// ======================================================
// RELACIÓN PERSON -> USER
// ======================================================

PersonModel.hasOne(UserModel, {
  foreignKey: "person_id",
  as: "user",
});