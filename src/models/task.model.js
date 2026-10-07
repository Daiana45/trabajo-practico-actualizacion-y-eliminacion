import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

// ======================================================
// MODELO TASK
// ======================================================

export const TaskModel = sequelize.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  },
);

// ======================================================
// RELACIONES
// ======================================================

// Una tarea pertenece a un usuario.
TaskModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "author",
});

// Un usuario puede tener muchas tareas.
UserModel.hasMany(TaskModel, {
  foreignKey: "user_id",
  as: "tareas",
});