const mongoose = require('mongoose')

const HabitacionSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    camas: [{
      numCamas: { type: Number, required: true },
      nombre: { type: String, required: true },
     }], 
    tamanyo: { type: Number, required: true },
    planta: { type: Number, required: true },
    accesorios: [{ 
      logo: { type: String }, 
      descripcion: { type: String, required: true },
    }],
    numPersonas: { type: Number, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String },
    imagenes: [{ type: String }] ,
    habilitada: {type: Boolean, required : true}
  });
  
  module.exports = mongoose.model('Habitacion', HabitacionSchema);
  