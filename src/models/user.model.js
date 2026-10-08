import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";
import { PersonModel } from "./person.model.js";

export const UserModel = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING(100), // guarda el nombre con un máximo de 100 caracteres
      allowNull: false, // el nombre es obligatorio
    },

    email: {
      type: DataTypes.STRING(100), // guarda el email con un máximo de 100 caracteres
      allowNull: false, // el email es obligatorio
      unique: true, // no permite registrar dos usuarios con el mismo email
    },

    password: {
      type: DataTypes.STRING(100), // guarda la contraseña o su hash
      allowNull: false, // la contraseña es obligatoria
    },

    person_id: {
      type: DataTypes.INTEGER, // guarda el id de la persona relacionada
      allowNull: false, // todo usuario debe estar relacionado con una persona
      unique: true, // una persona no puede estar relacionada con más de un usuario

      references: {
        model: "People", // indica la tabla que contiene la persona
        key: "id", // person_id apunta al id de esa tabla
      },
    },
  },
  {
    timestamps: false, // no agrega createdAt ni updatedAt
  },
);

// un usuario pertenece a una persona
UserModel.belongsTo(PersonModel, {
  foreignKey: "person_id", // campo que conecta User con Person
  as: "owner", // nombre usado para acceder a la persona desde el usuario
});

// una persona puede estar relacionada con un solo usuario
PersonModel.hasOne(UserModel, {
  foreignKey: "person_id", // usa person_id para relacionar ambos modelos
  as: "user", // nombre usado para acceder al usuario desde la persona
  onDelete: "CASCADE", // al eliminar la persona, también elimina su usuario
});