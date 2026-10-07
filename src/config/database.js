import { Sequelize } from "sequelize";

// ======================================================
// CONEXIÓN A MYSQL
// ======================================================
//
// Sequelize recibe:
// 1. nombre de la base de datos
// 2. usuario
// 3. contraseña
// 4. configuración del servidor
//

export const sequelize = new Sequelize(
  "tasks_users_db",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  },
);

// ======================================================
// INICIAR BASE DE DATOS
// ======================================================

export const startDB = async () => {
  try {
    // Comprobamos que Sequelize pueda conectarse a MySQL.
    await sequelize.authenticate();

    // Actualiza la estructura de las tablas sin eliminarlas.
    //
    // IMPORTANTE:
    // No usamos force: true porque force elimina las tablas
    // y vuelve a crearlas cada vez que iniciamos el servidor.
    await sequelize.sync({
      alter: true,
    });

    console.log("Conexion a la db esta lista");
  } catch (error) {
    console.error("No se pudo conectar a la db:", error);
  }
};