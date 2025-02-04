const Reserva = require('../../models/booking_model.js')
const Habitacion = require('../../models/room_model.js')

const router = require('express').Router()

router.get('/getBookings', async (req, res) => {
  try {
    const data = await Reserva.find({}) // 🔹 Agregado `await`
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

router.post('/createBooking', async (req, res) => {
  try {
  } catch (error) {}
})

const convertirFecha = fechaStr => {
  const [dia, mes, año] = fechaStr.split('/').map(num => parseInt(num, 10))
  return new Date(año, mes - 1, dia) // Mes en JS es 0-indexado
}

//llamadas a Android things
router.post('/getFreeRooms', async (req, res) => {
  try {
    console.log('Datos recibidos:', req.query)
    // Extraer datos del cuerpo de la solicitud
    const { startdate, enddate, numGuest } = req.query

    // Validar que las fechas sean correctas
    if (!startdate || !enddate || !numGuest) {
      return res
        .status(400)
        .json({ error: 'FFR, FIR y numPersonas son obligatorios' })
    }

    const fechaInicio = convertirFecha(startdate)
    const fechaFin = convertirFecha(enddate)
    const numPersonas = parseInt(numGuest, 10)

    if (fechaInicio >= fechaFin) {
      return res
        .status(400)
        .json({ error: 'La fecha de inicio debe ser antes de la fecha de fin' })
    }
    const habitaciones = Habitacion.find({})
    console.log((await habitaciones).length)

    console.log(fechaInicio)
    console.log(fechaFin)

    // 1️⃣ Buscar habitaciones ocupadas en el rango de fechas
    const reservasOcupadas = await Reserva.find({
      $and: [
        { fechaInicio: { $lt: fechaFin } }, // La reserva empieza antes de que termine el rango
        { fechaFin: { $gt: fechaInicio } } // La reserva termina después de que empieza el rango
      ]
    }).select('habitacion')
    console.log(reservasOcupadas.length)

    const habitacionesOcupadasIds = reservasOcupadas?.map(r => r.habitacion)

    // 2️⃣ Buscar habitaciones que NO están reservadas en ese rango, están habilitadas y tienen capacidad suficiente
    const habitacionesLibres = await Habitacion.find({
      _id: { $nin: habitacionesOcupadasIds }, // Excluir habitaciones ocupadas
      habilitada: true, // Solo habitaciones activas
      numPersonas: { $gte: numPersonas } // Habitaciones con capacidad suficiente
    }).sort({ precio: 1 }) // Ordenar por precio (opcional)

    // 3️⃣ Agrupar por categoría y seleccionar solo la primera habitación de cada categoría
    console.log(habitacionesLibres.length)

    const habitacionesPorCategoria = {}
    habitacionesLibres.forEach(habitacion => {
      const categoria = habitacion.categoria
      if (!habitacionesPorCategoria[categoria]) {
        habitacionesPorCategoria[categoria] = habitacion // Guardamos la primera de la categoría
      }
    })

    // 4️⃣ Convertir el objeto en un array de habitaciones únicas por categoría
    const habitacionesUnicas = Object.values(habitacionesPorCategoria)
    console.log(habitacionesUnicas)
    res.json(habitacionesUnicas)
  } catch (err) {
    console.error('Error al buscar habitaciones libres:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

module.exports = router
