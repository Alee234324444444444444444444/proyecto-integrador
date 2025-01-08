const { Post } = require('../models/models'); // Asegúrate de que Post esté correctamente importado

// Función para obtener todas las publicaciones
const getPosts = async (req, res) => {
  try {
    // Obtener todas las publicaciones desde la base de datos
    const posts = await Post.find().sort({ created_at: -1 }); // Ordenar por fecha de creación

    // Verifica que se obtuvieron publicaciones
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No hay publicaciones disponibles.' });
    }

    // Enviar las publicaciones como respuesta en formato JSON
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error al obtener las publicaciones:', err);
    res.status(500).json({ error: 'Hubo un problema al obtener las publicaciones.' });
  }
};

module.exports = { getPosts };
