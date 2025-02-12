// routes/auth.routes.js
import { Router } from 'express';
import { login, logout } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use((req, res, next) => {
    console.log("Middleware de autenticación");


    // Vamos a agregar un poco de logica
    if (req.method !== 'POST') return next() // Si no es un POST, no hacemos nada
    if (req.headers['content-type'] !== 'application/json') return next() // Si no es un JSON, no hacemos nada
    console.log('Middleware:', req.method, req.url)


    req.on('end', () => {
        console.log('Request body:', req.body) // Mostramos el body de la request
        const data = JSON.parse(body)
        data.timestamp = Date.now() // mutamos la request y metemos la información en el req.body
        req.body = data
        next()
      })

    next();
});

// Ruta de login
router.post('/login', login);

// Ruta de logout (protegida)
router.post('/logout', authenticateToken, logout);

export default router;