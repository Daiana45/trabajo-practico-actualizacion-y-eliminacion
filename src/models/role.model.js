import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";

export const RoleModel = sequelize.define(
  "Role",
  {
    rolename: {
      type: DataTypes.STRING(100), // guarda el nombre del rol, con un máximo de 100 caracteres
      allowNull: false, // obliga a que el rol tenga un nombre
    },
  },
  {
    timestamps: false, // no crea createdAt ni updatedAt para esta tabla
  },
);