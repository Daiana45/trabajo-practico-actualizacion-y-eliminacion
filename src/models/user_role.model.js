import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";
import { RoleModel } from "./role.model.js";

// tabla intermedia que conecta usuarios con roles
export const UserRoleModel = sequelize.define(
  "User_Role",
  {
    id: {
      type: DataTypes.INTEGER, // identificador de cada relación
      primaryKey: true, // establece el id como clave primaria
      allowNull: false, // el id siempre debe tener un valor
      autoIncrement: true, // genera el id automáticamente
    },
  },
  {
    timestamps: false, // no necesitamos createdAt ni updatedAt
  },
);

// un usuario puede tener varios roles
UserModel.belongsToMany(RoleModel, {
  through: UserRoleModel, // indica que la relación pasa por la tabla User_Role
  foreignKey: "user_id", // campo que identifica al usuario en la tabla intermedia
  as: "roles", // nombre usado para acceder a los roles del usuario
});

// un rol puede estar asignado a varios usuarios
RoleModel.belongsToMany(UserModel, {
  through: UserRoleModel, // utiliza la misma tabla intermedia
  foreignKey: "role_id", // campo que identifica al rol en la tabla intermedia
  as: "users", // nombre usado para acceder a los usuarios del rol
});