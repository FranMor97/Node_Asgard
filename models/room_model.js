const mongoose = require("mongoose");

const HabitacionSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true }, // Usamos String para permitir códigos alfanuméricos
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  camas: [
    {
      numCamas: { type: Number, required: true },
      nombre: { type: String, required: true },
    },
  ],
  tamanyo: { type: Number, required: true }, // Área en m2
  servicios: [{ type: String }], // Lista de servicios
  numPersonas: { type: Number, required: true }, // Número de personas permitidas
  precio: { type: Number, required: true }, // Precio por noche
  descripcion: { type: String }, // Descripción opcional
  imagenes: 
    {
      android: [{ type: String }], // URL de la imagen en Android
      wpf: [{ type: String }], // URL de la imagen en WPF
    },
  
  habilitada: { type: Boolean, required: true, default: true }, // Estado de disponibilidad
});

// Exportar el modelo
module.exports = mongoose.model("Habitacion", HabitacionSchema);
