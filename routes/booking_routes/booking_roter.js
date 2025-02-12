const { date } = require('joi')
const Reserva = require('../../models/booking_model.js')
const Habitacion = require('../../models/room_model.js')
const Usuario = require('../../models/user_model.js')
const BD_RESERVAS = require('../../BBDD/bookings.js')
const mongoose = require("mongoose");

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



router.post('/getFreeRoomsWPF', async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { startdate, enddate, numGuest } = req.body

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


router.get("/getCode", async (req, res) => {
  try {
    const ultimaReserva = await Reserva.aggregate([
      {
        $addFields: {
          numeroCodigo: { $toInt: { $substr: ["$codigo", 3, -1] } },
        },
      },
      { $sort: { numeroCodigo: -1 } },
      { $limit: 1 },
    ]);

    if (ultimaReserva.length === 0) {
      return res.status(404).json({ mensaje: "No hay reservas registradas" });
    }

    res.json({ codigo: ultimaReserva[0].codigo });
  } catch (error) {
    console.error("Error al obtener el último código:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post('/searchBookings', async (req, res) => {
  try {
    const { fechaInicio, fechaFin, codigo, nombre, tipo } = req.body;
    let errorMessage = '';
    let query = {}; // Objeto para almacenar los filtros dinámicos

    // Aplicamos los filtros solo si se proporcionan
    if (fechaInicio) {
      const startDate = new Date(fechaInicio);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(fechaInicio);
      endDate.setHours(23, 59, 59, 999);
      query.fechaInicio = { $gte: startDate, $lte: endDate };
    }
    if (fechaFin) {
      const startDate = new Date(fechaFin);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(fechaFin);
      endDate.setHours(23, 59, 59, 999);
      query.fechaFin = { $gte: startDate, $lte: endDate };
    }
    if (codigo) {
      query.codigo = codigo;
      const reserva = await Reserva.findOne({ codigo });
      if (!reserva) {
        errorMessage += 'No existe ninguna reserva con ese código. ';
      }
    }

    let reservasQuery = Reserva.find(query)
    .populate('usuario')
    .populate('habitacion');

      let usuariosIds = [];

      if (nombre || tipo) {
        let userFilter = {};
        if (nombre) userFilter.nombre = nombre;
        if (tipo) userFilter.tipo = tipo;
  
        const usuarios = await Usuario.find(userFilter);
        if (usuarios.length === 0) {
          if (nombre) errorMessage += 'No hay usuarios con ese nombre. ';
          if (tipo) errorMessage += 'No hay usuarios con ese tipo. ';
        } else {
          usuariosIds = usuarios.map((user) => user._id);
          reservasQuery = reservasQuery.where('usuario').in(usuariosIds);
        }
      }
    const data = await reservasQuery;

    if (errorMessage) {
      return res.status(404).json({ message: errorMessage.trim() });
    } else {
      return res.status(data.length > 0 ? 200 : 404).json(
        data.length > 0 ? data : { message: 'No se encontraron reservas con los criterios proporcionados.' }
      );
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


router.post('/createBooking', async (req, res) => {
  try {
    const { codigo, habitacion, usuario, precio } = req.body;
    let{fechaInicio,fechaFin} = req.body;

    // 🔹 Validar que todos los datos estén presentes
    if (!codigo || !fechaInicio || !fechaFin || !habitacion || !usuario || !precio) {
      return res.status(400).json(false); 
    }
    fechaInicio = convertirFecha(fechaInicio)
    fechaFin = convertirFecha(fechaFin)

    let nuevoCodigo = codigo;

    // 🔹 Si el código es "RES000", generamos un nuevo código secuencial
    if (codigo === "RES000") {
      const ultimaReserva = await Reserva.findOne().sort({ codigo: -1 });

      if (ultimaReserva && ultimaReserva.codigo.startsWith("RES")) {
        const numeroCodigo = parseInt(ultimaReserva.codigo.replace("RES", ""), 10);
        nuevoCodigo = `RES${String(numeroCodigo + 1).padStart(3, '0')}`;
      } else {
        nuevoCodigo = "RES001"; // Si no hay reservas previas, iniciamos con RES001
      }
    }

    // 🔹 Crear la nueva reserva
    const nuevaReserva = new Reserva({
      codigo: nuevoCodigo,
      fechaInicio: new Date(fechaInicio),
      fechaFin: new Date(fechaFin),
      habitacion: new mongoose.Types.ObjectId(habitacion),
      usuario: new mongoose.Types.ObjectId(usuario),
      precio
    });

    await nuevaReserva.save();

    return res.status(201).json(true); // ✅ Devuelve true si la reserva se creó exitosamente
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    return res.status(500).json(false); // ⛔ Devuelve false en caso de error
  }
});





module.exports = router
