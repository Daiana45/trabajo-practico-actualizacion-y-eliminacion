import express from "express";

import { startDB } from "./src/config/database.js";

import { userRouter } from "./src/routes/user.routes.js";
import { taskRouter } from "./src/routes/task.routes.js";
import { personRouter } from "./src/routes/person.routes.js";
const app = express(); // crea la aplicación de express

const PORT = 3005; // puerto donde se levanta el servidor

app.use(express.json()); // permite recibir datos enviados en formato json

app.use("/api", userRouter); // las rutas de usuarios quedan bajo /api
app.use("/api", taskRouter); // las rutas de tareas quedan bajo /api
app.use("/api", personRouter); // las rutas de personas quedan bajo /api

app.listen(PORT, async () => {
  await startDB(); // conecta con la base de datos y sincroniza los modelos

  console.log(`Servidor corriendo en el puerto ${PORT}`);
});