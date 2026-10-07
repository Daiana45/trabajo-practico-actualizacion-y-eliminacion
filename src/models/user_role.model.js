import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";
import { RoleModel } from "./role.model.js";

// ======================================================
// MODELO INTERMEDIO USER_ROLE
// ======================================================
//
// Esta tabla permite relacionar usuarios con roles.
//
// Un usuario puede tener varios roles.
// Un rol puede pertenecer a varios usuarios.
//

export const UserRoleModel = sequelize.define(
  "User_Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
  },
);

// ======================================================
// RELACIÓN MUCHOS A MUCHOS
// ======================================================

UserModel.belongsToMany(RoleModel, {
  through: UserRoleModel,
  foreignKey: "user_id",
  as: "roles",
});

RoleModel.belongsToMany(UserModel, {
  through: UserRoleModel,
  foreignKey: "role_id",
  as: "users",
});