const {Post} = require('../models/models'); // Asegúrate de importar el modelo de Post

const indexController = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/index.html'));
    },
    uploadPhoto: async (req, res) => {
        try {
            // Verificar si se ha subido la foto y si se incluye la descripción
            if (!req.file || !req.body.description) {
                return res.status(400).json({ status: 'error', message: 'No se subió ninguna foto o descripción' });
            }

            // Ruta del archivo subido
            const filePath = `/uploads/${req.file.filename}`;

            // Crear un nuevo objeto para el post
            const newPost = new Post({
                photo: filePath,           // Guardamos la ruta de la foto
                description: req.body.description,  // Descripción de la publicación
                desafioId: req.params.desafioId,   // ID del desafío al que pertenece
            });

            // Guardar el post en la base de datos
            await newPost.save();

            // Responder con un mensaje de éxito
            res.status(200).json({
                status: 'success',
                message: 'Foto y publicación guardada con éxito',
                filePath: filePath, // Ruta de la imagen guardada
            });

        } catch (error) {
            console.error('Error al guardar la publicación:', error);
            res.status(500).json({ status: 'error', message: 'Error al subir la foto y guardar la publicación' });
        }
    }
};

module.exports = indexController;
