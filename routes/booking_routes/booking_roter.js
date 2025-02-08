const { date } = require('joi')
const Reserva = require('../../models/booking_model.js')
const Habitacion = require('../../models/room_model.js')
const Usuario = require('../../models/user_model.js')
const BD_RESERVAS = require('../../BBDD/bookings.js')

const router = require('express').Router()

router.get('/getBookings', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const data = await Reserva.find({
       fechaInicio: { $gte: today} // Filtra por fechaInicio mayor o igual a hoy
    })
      .populate('usuario')
      .populate('habitacion')
      .limit(30) // Limita la cantidad de resultados a 30
      .sort({ fechaInicio: 1 })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})
router.post('/insert',async (async,res) =>{
  const bool = await Reserva.insertMany(BD_RESERVAS)
  if(bool){
    return res.status(200).json("done : done")
  }
});

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

    res.json(habitacionesUnicas)
  } catch (err) {
    console.error('Error al buscar habitaciones libres:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

router.get('/searchBookings', async (req, res) => {
  try {
    const { fechaInicio, fechaFin, codigo, nombre, tipo } = req.query
    let errorMessage = ''
    let query = {} // Inicializamos un objeto de consulta vacío

    // Aplicar filtros dinámicamente según los parámetros proporcionados
    if (fechaInicio) {
      const startDate = new Date(fechaInicio);
      startDate.setHours(0, 0, 0, 0); // Inicio del día
      const endDate = new Date(fechaInicio);
      endDate.setHours(23, 59, 59, 999); // Fin del día
      query.fechaInicio = { $gte: startDate, $lte: endDate };
    }
    if (fechaFin) {
      const startDate = new Date(fechaFin);
      startDate.setHours(0, 0, 0, 0); // Inicio del día
      const endDate = new Date(fechaFin);
      endDate.setHours(23, 59, 59, 999); // Fin del 
      query.fechaFin = { $gte: startDate, $lte: endDate }; // Asumiendo que viene en un formato parseable por Date
    }
    if (codigo) {
      query.codigo = codigo
      const reserva = await Reserva.findOne({ codigo: req.query.codigo })
      if (!reserva) {
        errorMessage += 'No existe ninguna reserva con ese codigo'
      }
    }

    let reservas = Reserva.find(query)
      .populate('usuario')
      .populate('habitacion')

    // Filtro adicional para 'nombre' y 'tipo' que requieren acceso al usuario poblado
    if (nombre) {
      const usuarios = await Usuario.find({ nombre }); // Obtener todos los usuarios con ese nombre
      if (usuarios.length === 0) {
        errorMessage += 'No hay usuarios con ese nombre. ';
      } else {
        const usuariosIds = usuarios.map((user) => user._id); // Obtener IDs
        reservas = reservas.where('usuario').in(usuariosIds); // Filtrar reservas con esos IDs
      }
    }
    if (tipo) {
      reservas = reservas.populate({
        path: 'usuario',
        match: { tipo }, // Filtrar solo usuarios con ese tipo
      });
    }

    const data = await reservas

    if (errorMessage) {
      return res.status(404).json({ message: errorMessage.trim() })
    } else {
      if (data && data.length > 0) {
        return res.status(200).json(data)
      } else {
        return res.status(404).json({
          message:
            'No se encontraron reservas con los criterios proporcionados.'
        })
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

module.exports = router
