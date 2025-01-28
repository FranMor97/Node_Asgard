const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReservaSchema = new Schema({
  codigo: { type: String, required: true, unique: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  habitacion: {
    type: Schema.Types.ObjectId,
    ref: 'Habitacion',
    required: true
  },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  precio: { type: Number, required: true }
})

module.exports = mongoose.model('Reserva', ReservaSchema)
