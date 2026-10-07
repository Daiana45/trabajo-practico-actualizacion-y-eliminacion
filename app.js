import express from "express";

import { startDB } from "./src/config/database.js";

import { userRouter } from "./src/routes/user.routes.js";
import { taskRouter } from "./src/routes/task.routes.js";
import { personRouter } from "./src/routes/person.routes.js";

// Creamos la aplicación de Express.
const app = express();

// Puerto donde se ejecutará el servidor.
const PORT = 3005;

// Permite que Express pueda recibir información en formato JSON.
app.use(express.json());

// ======================================================
// RUTAS
// ======================================================

// Todas las rutas de usuarios comienzan con /api.
app.use("/api", userRouter);

// Todas las rutas de tareas comienzan con /api.
app.use("/api", taskRouter);

// Todas las rutas de personas comienzan con /api.
app.use("/api", personRouter);

// ======================================================
// INICIAR SERVIDOR
// ======================================================

app.listen(PORT, async () => {
  // Primero verificamos la conexión con MySQL.
  await startDB();

  console.log(`Servidor corriendo en el puerto ${PORT}`);
});