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
  imagenes: [{ type: String }],
  habilitada: { type: Boolean, required: true, default: true }, // Estado de disponibilidad
});

// 🔹 IMPORTANTE: Evitar que Mongoose agregue `_id` a cada cama
HabitacionSchema.path("camas").schema.set("_id", false);

// Exportar el modelo
module.exports = mongoose.model("Habitacion", HabitacionSchema, 'habitaciones');
