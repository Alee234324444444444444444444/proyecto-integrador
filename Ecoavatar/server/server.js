const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
let cors = require('cors')
// Configuración de variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../client')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html')); // Ruta correcta al archivo HTML
    
});

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecoavatar', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
