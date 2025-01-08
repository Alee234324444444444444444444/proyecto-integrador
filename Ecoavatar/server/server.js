const express = require('express');
const mongoose = require('mongoose');
const indexRoutes = require('./routes/indexRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');
const path = require('path');
let port = 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api', postRoutes);
app.use('/', indexRoutes);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../client')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecoavatar', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conexión a MongoDB exitosa'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/posts.html'));
});

// Ruta para manejar todas las solicitudes no específicas y servir el archivo HTML principal
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});


app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));
