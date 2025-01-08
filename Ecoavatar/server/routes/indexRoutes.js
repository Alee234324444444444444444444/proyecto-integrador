const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const indexController = require('../controller/indexController');

// Configurar Multer para almacenar imágenes en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Carpeta donde se guardarán las fotos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para cada archivo
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Validar el tipo de archivo
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif)'));
    }
});

// Ruta para subir fotos
router.post('/upload/:desafioId', upload.single('photo'), indexController.uploadPhoto);

module.exports = router;
