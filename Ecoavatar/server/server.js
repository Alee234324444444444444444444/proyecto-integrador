const express = require('express');
const mongoose = require('mongoose');
const indexRoutes = require('./routes/indexRoutes')
const cors = require('cors');
const path = require('path');
let port = 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../client')));

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecoavatar', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conexión a MongoDB exitosa'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Rutas
// Aquí podrías añadir un archivo de rutas como `cancionesRoutes`
// app.use('/api/canciones', cancionesRoutes);

// Ruta para manejar todas las solicitudes no específicas y servir el archivo HTML principal
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});


app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));
