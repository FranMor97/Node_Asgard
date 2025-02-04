const Reserva = require('../../models/booking_model.js');
const Habitacion = require('../../models/room_model.js');

const router = require('express').Router()

router.get('/getBookings', async (req, res) => { // 🔹 Faltaba el `/` en la ruta
  try {
    const data = await Reserva.find({}); // 🔹 Agregado `await`
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


router.post('/createRooms',)


router.post('/getFreeRooms', async (req, res) => {
  try {
    const FFR = new Date('2023-03-03'); // Fecha de inicio
    const FIR = new Date('2023-03-05'); // Fecha de fin

    // 1️⃣ Buscar habitaciones ocupadas en el rango de fechas
    const reservasOcupadas = await Reserva.find({
      $and: [
        { fechaInicio: { $lt: FIR } }, // La reserva empieza antes de que termine el rango
        { fechaFin: { $gt: FFR } } // La reserva termina después de que empieza el rango
      ]
    }).select('habitacion');

    const habitacionesOcupadasIds = reservasOcupadas.map(r => r.habitacion);

    // 2️⃣ Buscar habitaciones que NO están reservadas en ese rango y están habilitadas
    const habitacionesLibres = await Habitacion.find({
      _id: { $nin: habitacionesOcupadasIds }, // Excluir habitaciones ocupadas
      habilitada: true // Solo habitaciones activas
    }).sort({ precio: 1 }); // Ordenar por precio (opcional)

    // 3️⃣ Agrupar por categoría y seleccionar solo la primera habitación de cada categoría
    const habitacionesPorCategoria = {};
    habitacionesLibres.forEach(habitacion => {
      const categoria = habitacion.categoria;
      if (!habitacionesPorCategoria[categoria]) {
        habitacionesPorCategoria[categoria] = habitacion; // Guardamos la primera de la categoría
      }
    });

    // 4️⃣ Convertir el objeto en un array de habitaciones únicas por categoría
    const habitacionesUnicas = Object.values(habitacionesPorCategoria);

    res.json(habitacionesUnicas);
  } catch (err) {
    console.error('Error al buscar habitaciones libres:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


module.exports = router;