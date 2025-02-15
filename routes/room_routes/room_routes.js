const express = require("express");
const router = express.Router();
const Habitacion = require("../../models/room_model");
const multer = require("multer");
const path = require("path");
const { toUnicode } = require("punycode");

// Configurar `multer` para guardar imágenes en `/uploads`
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generar un nombre único
  },
});
const upload = multer({ storage });

// ✅ **CREAR una nueva habitación con múltiples imágenes (POST /api/rooms)**
router.post("/", upload.array("imagenes", 5), async (req, res) => {
  try {
    const {
      codigo,
      nombre,
      categoria,
      tamanyo,
      numPersonas,
      precio,
      descripcion,
      habilitada,
    } = req.body;

    // Convertir `camas` y `servicios` si vienen como strings JSON
    const camas = req.body.camas ? JSON.parse(req.body.camas) : [];
    const servicios = req.body.servicios ? JSON.parse(req.body.servicios) : [];

    // Obtener las URLs de las imágenes subidas
    const imagenes = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    // Crear la habitación con las imágenes
    const nuevaHabitacion = new Habitacion({
      codigo,
      nombre,
      categoria,
      camas,
      tamanyo,
      servicios,
      numPersonas,
      precio,
      descripcion,
      imagenes, // Guardar el array de imágenes
      habilitada: habilitada !== undefined ? habilitada : true,
    });

    const habitacionGuardada = await nuevaHabitacion.save();
    res.status(201).json(habitacionGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener el siguiente código de habitación (GET /api/rooms/newCode)
router.get("/newCode", async (req, res) => {
  try {
    const ultimaHabitacion = await Habitacion.findOne().sort({ codigo: -1 }); // Obtener la última habitación según código
    let nuevoCodigo = "HAB001"; // Código por defecto

    if (ultimaHabitacion) {
      const numeroActual = parseInt(
        ultimaHabitacion.codigo.replace("HAB", ""),
        10
      );
      const nuevoNumero = (numeroActual + 1).toString().padStart(3, "0");
      nuevoCodigo = `HAB${nuevoNumero}`;
    }

    res.json({ codigo: nuevoCodigo });
  } catch (error) {
    res.status(500).json({ error: "Error al generar el código" });
  }
});

// OBTENER todas las habitaciones (GET /api/rooms)
router.get("/", async (req, res) => {
  try {
    const habitaciones = await Habitacion.find();
    res.json(habitaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener categorías. (GET /api/rooms/categories)
router.get("/categories", async (req, res) => {
  try {
    const categorias = await Habitacion.aggregate([
      {
        $group: {
          _id: "$categoria", // Agrupamos por el campo "categoria"
          precio: { $first: "$precio" }, // Tomamos el primer precio del grupo
          numPersonas: { $first: "$numPersonas" }, // Tomamos el primer valor de capacidad
          camas: { $first: "$camas" }, // Tomamos el primer array de camas completo
          tamanyo: { $first: "$tamanyo" },
          servicios: { $first: "$servicios" },
        },
      },
      {
        $project: {
          _id: 1, // Mantenemos el _id (que representa la categoría)
          precio: 1, // Incluimos el precio
          numPersonas: 1, // Incluimos la capacidad (número de huéspedes)
          camas: 1, // Devolvemos el array completo de camas
          tamanyo: 1,
          servicios: 1,
        },
      },
      {
        $sort: { precio: -1 }, // Ordenar por precio ascendente (de menor a mayor)
      },
    ]);

    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una habitación de cada categoria (GET /api/rooms/unique)
router.get("/unique", async (req, res) => {
  try {
    const habitaciones = await Habitacion.aggregate([
      {
        $group: {
          _id: "$categoria",
          habitacion: { $first: "$$ROOT" },
        },
      },
      { $sort: { "habitacion.precio": -1 } },
      {
        $project: {
          _id: 0,
          habitacion: 1,
        },
      },
    ]);
    res.json(habitaciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener habitaciones únicas" });
  }
});

// Obtener las habitaciones que concuerdan con los filtros (GET /api/rooms/filter)
router.get("/filter", async (req, res) => {
  try {

    let query = {};

    // 🔹 Asegurarse de que las claves coincidan con MongoDB (minúsculas)
    if (req.query.codigo) {
      query.codigo = { $regex: new RegExp(req.query.codigo, "i") };
    }

    if (req.query.nombre) {
      query.nombre = { $regex: new RegExp(req.query.nombre, "i") };
    }

    if (req.query.categoria) {
      query.categoria = req.query.categoria; // 🔹 Usar la clave correcta
    }

    if (req.query.numPersonasMax) {
      query.numPersonas = { $lte: parseInt(req.query.numPersonasMax) }; // 🔹 Ahora filtra por máximo huéspedes
    }

    if (req.query.tamanyoMin || req.query.tamanyoMax) {
      query.tamanyo = {}; // 🔹 minúscula
      if (req.query.tamanyoMin)
        query.tamanyo.$gte = parseInt(req.query.tamanyoMin);
      if (req.query.tamanyoMax)
        query.tamanyo.$lte = parseInt(req.query.tamanyoMax);
    }

    if (req.query.precioMin || req.query.precioMax) {
      query.precio = {}; // 🔹 minúscula
      if (req.query.precioMin)
        query.precio.$gte = parseFloat(req.query.precioMin);
      if (req.query.precioMax)
        query.precio.$lte = parseFloat(req.query.precioMax);
    }

    if (req.query.habilitada !== undefined) {
      query.habilitada = req.query.habilitada === "true"; // 🔹 minúscula
    }


    const rooms = await Habitacion.find(query);
    res.json(rooms);
  } catch (error) {
    console.error("Error en el filtro:", error);
    res
      .status(500)
      .json({
        message: "Error al filtrar habitaciones",
        error: error.toString(),
      });
  }
});

// Obtener una habitación por ID (GET /api/rooms/:codigo)
router.get("/:codigo", async (req, res) => {
  try {
    const habitacion = await Habitacion.findOne({ codigo: req.params.codigo });

    if (!habitacion) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    res.json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ACTUALIZAR una habitación con imágenes opcionales (PUT /api/rooms/:codigo)
router.put("/:codigo", upload.array("imagenes", 5), async (req, res) => {
  try {
    const {
      codigo,
      nombre,
      categoria,
      tamanyo,
      numPersonas,
      precio,
      descripcion,
      habilitada,
    } = req.body;

    // Convertir `camas` y `servicios` a arrays si son JSON strings
    const camas = req.body.camas ? JSON.parse(req.body.camas) : [];
    const servicios = req.body.servicios ? JSON.parse(req.body.servicios) : [];

    // Buscar la habitación por `codigo`, no por `_id`
    const habitacion = await Habitacion.findOne({ codigo: req.params.codigo });
    if (!habitacion)
      return res.status(404).json({ message: "Habitación no encontrada" });

    // Obtener nuevas imágenes subidas
    const nuevasImagenes = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    /* Reemplazar completamente el array de imágenes
    if (nuevasImagenes.length > 0) {
      habitacion.imagenes = nuevasImagenes;
    }
    */

    // Mantener las imágenes anteriores y agregar las nuevas
    habitacion.imagenes = [...habitacion.imagenes, ...nuevasImagenes];

    // Actualizar solo los campos proporcionados
    habitacion.codigo = codigo || habitacion.codigo;
    habitacion.nombre = nombre || habitacion.nombre;
    habitacion.categoria = categoria || habitacion.categoria;
    habitacion.camas = camas.length ? camas : habitacion.camas;
    habitacion.tamanyo = tamanyo || habitacion.tamanyo;
    habitacion.servicios = servicios.length ? servicios : habitacion.servicios;
    habitacion.numPersonas = numPersonas || habitacion.numPersonas;
    habitacion.precio = precio || habitacion.precio;
    habitacion.descripcion = descripcion || habitacion.descripcion;
    habitacion.habilitada =
      habilitada !== undefined ? habilitada : habitacion.habilitada;

    const habitacionActualizada = await habitacion.save();
    res.json(habitacionActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// TODO()
// Alternar el estado de habilitación de una habitación (PUT /api/rooms/:codigo/toggle)
router.put("/:codigo/toggle", async (req, res) => {
  try {
    // Buscar la habitación por código
    const habitacion = await Habitacion.findOne({ codigo: req.params.codigo });

    if (!habitacion) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    // Cambiar el estado de habilitación
    habitacion.habilitada = !habitacion.habilitada;

    // Guardar la actualización en la base de datos
    await habitacion.save();

    res.json({
      message: `Habitación ${
        habitacion.habilitada ? "habilitada" : "deshabilitada"
      } correctamente`,
      habitacion,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
