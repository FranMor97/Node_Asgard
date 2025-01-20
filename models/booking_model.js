const mongoose = require('mongoose');

const ReservaSchema = new Schema({
  codigo: { type: String, required: true, unique: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  habitacion: { type: Schema.Types.ObjectId, ref: 'Habitacion', required: true } ,
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true } ,
  precio: {type :Float32Array, required : true}
});

module.exports = mongoose.model('Reserva', ReservaSchema);
