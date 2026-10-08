import { Sequelize } from "sequelize";

// conexion a mysql
// Sequelize recibe:
//  nombre de la base de datos
// usuario
// contraseña
// configuración del servidor

export const sequelize = new Sequelize("tasks_users_db","root","", {
    host: "localhost",
    dialect: "mysql",
  },
);


// Iniciar la base de datos

export const startDB = async () => {
  try {
    // Comprobamos que Sequelize pueda conectarse a MySQL.
    await sequelize.authenticate();

    // Actualiza la estructura de las tablas sin eliminarlas.
    await sequelize.sync({ //esto le permite a sequelize comparar los modelos actuales con las tablas existentes e intentar ajustar la estructura sin borrar directamente la tablas como hace force: true
      alter: true,
    });

    console.log("Conexion a la db esta lista");
  } catch (error) {
    console.error("No se pudo conectar a la db:", error);
  }
};

//sync() → sincroniza sin forzar cambios destructivos
//sync({ alter: true }) → intenta modificar las tablas existentes para que coincidan con los modelos
//sync({ force: true }) → elimina las tablas y las vuelve a crear