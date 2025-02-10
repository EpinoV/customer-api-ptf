import express from 'express';
import sequelize from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import customerRoutes from './routes/customer.routes.js';
import {notFound, errorHandler, validationErrorHandler} from './middleware/error.js';
import seedDatabase from './config/seedDB.js';
import "./banner.js";
//console.log("Aplicación iniciando...");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

// Manejo de errores
app.use(validationErrorHandler);
app.use(notFound);
app.use(errorHandler);

// autenticación y sincronización de la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("----------------------------------");
    console.log("✅ Conectado a la base de datos");

        return sequelize.sync({ alter: true }); // Crea o actualiza las tablas en la base de datos
  })
  .then(() => {
    console.log("----------------------------------");
    console.log("✅ Tablas sincronizadas correctamente");

    return seedDatabase(); // Inserta datos iniciales desde seed.sql
  })
  .then(() => {
    console.log("----------------------------------");
    console.log("✅ Datos iniciales insertados exitosamente");

    // Iniciar el servidor después de la inicialización
    const PORT = process.env.APP_PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
})
.catch(err => {
      console.log("----------------------------------");
      console.error('❌ Error de conexión o sincronización a la base de datos:', err);
});


// Sincronizar base de datos
/*
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');


    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database sync error:', err));
  */