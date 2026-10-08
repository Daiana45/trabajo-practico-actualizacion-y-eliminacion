import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const TaskModel = sequelize.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING(100), // guarda el título con un máximo de 100 caracteres
      unique: true, // no permite que existan dos tareas con el mismo título
      allowNull: false, // el título es obligatorio
    },

    description: {
      type: DataTypes.STRING(100), // guarda la descripción con un máximo de 100 caracteres
      allowNull: false, // la descripción es obligatoria
    },

    is_completed: {
      type: DataTypes.BOOLEAN, // guarda true o false según el estado de la tarea
      defaultValue: false, // si no se indica un valor, la tarea empieza como incompleta
    },

    user_id: {
      type: DataTypes.INTEGER, // guarda el id del usuario dueño de la tarea
      allowNull: false, // toda tarea debe tener un usuario asociado

      references: {
        model: "Users", // indica la tabla a la que apunta la clave foránea
        key: "id", // user_id se relaciona con el id de Users
      },
    },
  },
  {
    timestamps: false, // evita que Sequelize agregue createdAt y updatedAt
    paranoid: true, // destroy() realiza un borrado lógico usando deletedAt
  },
);

// una tarea pertenece a un solo usuario
TaskModel.belongsTo(UserModel, {
  foreignKey: "user_id", // indica qué campo conecta la tarea con el usuario
  as: "author", // nombre que usamos después para acceder al usuario relacionado
  // onDelete: "CASCADE", // si se activa, al eliminar el usuario también elimina sus tareas
});

// un usuario puede tener varias tareas
UserModel.hasMany(TaskModel, {
  foreignKey: "user_id", // usa el mismo campo para relacionar las dos tablas
  as: "tareas", // nombre que usamos para acceder a las tareas del usuario
});