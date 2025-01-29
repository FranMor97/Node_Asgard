const express = require("express");
const router = express.Router();
const Habitacion = require("../../models/room_model"); // Asegúrate de la ruta correcta a tu modelo

// Crear una nueva habitación (POST /api/rooms)
router.post("/", async (req, res) => {
  try {
    const nuevaHabitacion = new Habitacion(req.body);
    const habitacionGuardada = await nuevaHabitacion.save();
    res.status(201).json(habitacionGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las habitaciones (GET /api/rooms)
router.get("/", async (req, res) => {
  try {
    const habitaciones = await Habitacion.find();
    res.json(habitaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una habitación por ID (GET /api/rooms/:id)
router.get("/:id", async (req, res) => {
  try {
    const habitacion = await Habitacion.findById(req.params.id);
    if (!habitacion)
      return res.status(404).json({ message: "Habitación no encontrada" });
    res.json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una habitación (PUT /api/rooms/:id)
router.put("/:id", async (req, res) => {
  try {
    const habitacionActualizada = await Habitacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!habitacionActualizada)
      return res.status(404).json({ message: "Habitación no encontrada" });
    res.json(habitacionActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una habitación (DELETE /api/rooms/:id)
router.delete("/:id", async (req, res) => {
  try {
    const habitacionEliminada = await Habitacion.findByIdAndDelete(
      req.params.id
    );
    if (!habitacionEliminada)
      return res.status(404).json({ message: "Habitación no encontrada" });
    res.json({ message: "Habitación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
