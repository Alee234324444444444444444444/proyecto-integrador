const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 75 },
  user_name: { type: String, required: true, maxlength: 75 },
  email: { type: String, required: true, unique: true },
});

// Post Schema
const postSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photo: { type: String, required: true },
  description: { type: String, required: true, maxlength: 75 },
  desafioId : {type: String, required: true},
  created_at: { type: Date, default: Date.now },
});

// Desafio Schema
const desafioSchema = new mongoose.Schema({
  titulo: { type: String, required: true, maxlength: 100 },
  descripcion: { type: String, required: true },
  tipo: { type: String, required: true, enum: ['diario', 'semanal'] },
  completado: { type: Boolean, default: false },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  fecha_limite: { type: Date, default: null },
});

// Recompensa Schema
const recompensaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxlength: 100 },
  imagen: { type: String, required: true },
  desafio: { type: mongoose.Schema.Types.ObjectId, ref: 'Desafio', required: true },
});

// Personaje Schema
const personajeSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxlength: 100 },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recompensa: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recompensa', default: [] }],
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Post: mongoose.model('Post', postSchema),
  Desafio: mongoose.model('Desafio', desafioSchema),
  Recompensa: mongoose.model('Recompensa', recompensaSchema),
  Personaje: mongoose.model('Personaje', personajeSchema),
};
