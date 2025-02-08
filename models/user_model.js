const mongoose = require('mongoose')

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  apellido1: { type: String, required: true },
  apellido2: { type: String },
  dniPasaporte: { type: String, required: true, unique: true },
  movil: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  fechaRegistro: { type: Date, default: Date.now },
  tipo: {
    type: String,
    enum: ['cliente', 'admin', 'empleado'],
    default: 'cliente'
  },
  reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reserva' }]
});

module.exports = mongoose.model('Usuario', UsuarioSchema,'usuarios')
