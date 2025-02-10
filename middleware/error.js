// middleware/error.js
import httpErrors from 'http-errors';

// Middleware para manejar errores 404 (No encontrado)
export const notFound = (req, res, next) => {
  next(new httpErrors.NotFound('Endpoint no encontrado'));
};

// Manejador principal de errores
export const errorHandler = (err, req, res, next) => {
  // Desestructurar información del error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  const stack = process.env.NODE_ENV === 'development' ? err.stack : {};

  // Log del error en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${new Date().toISOString()}] Error:`);
    console.error(err.stack);
  }

  // Construir respuesta de error
  const errorResponse = {
    success: false,
    status: statusCode,
    message: message,
  };

  // Agregar stack trace solo en desarrollo
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = stack;
  }

  // Enviar respuesta JSON
  res.status(statusCode).json(errorResponse);
};

// Middleware para manejar errores de validación
export const validationErrorHandler = (err, req, res, next) => {
  if (err instanceof httpErrors.HttpError) {
    return next(err);
  }

  // Manejar errores de validación de Sequelize
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(error => ({
      field: error.path,
      message: error.message
    }));
    
    return next(new httpErrors.BadRequest({
      message: 'Error de validación',
      errors: errors
    }));
  }

  // Manejar errores de llave foránea de Sequelize
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return next(new httpErrors.BadRequest(
      'Error de referencia: La entidad relacionada no existe'
    ));
  }

  next(err);
};