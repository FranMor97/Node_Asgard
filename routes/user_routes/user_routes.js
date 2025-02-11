const express = require("express");
const router = express.Router();
const Habitacion = require("../../models/room_model");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generar un nombre único
  },
});
const upload = multer({ storage });

router.get('/getAll', async (req, res) => {
  try{
  const data = await ModelUser.find();
  res.status(200).json(data);
  }
  catch(error){
  res.status(500).json({message: error.message});
  }
});

router.get('/getOne', async (req, res) => {
  try{
  const user = req.body.username;
  const usuariosDB = await ModelUser.findOne({ username: user });
  console.log(usuariosDB);
  if (!usuariosDB) {
  return res.status(404).json({ message: 'Documento no encontrado' });
  }
  res.status(200).json(usuariosDB);
  }
  catch(error){
  res.status(500).json({message: error.message});
  }
})

router.get('/getFilter', async (req, res) => {
  try{
  // Construye el objeto de condiciones basado en los campos del json proporcionado
  const condiciones = {};
  if (req.body.nombre) condiciones.nombre = req.body.nombre;
  if (req.body.email) condiciones.email = req.body.email;
  if (req.body.username) condiciones.username = req.body.username;
  if (req.body.password) condiciones.password = req.body.password;
  const data = await ModelUser.find(condiciones);
  if (data.length === 0) {
  return res.status(404).json({ message: 'Documento no encontrado' });
  }
  res.status(200).json(data);
  }
  catch(error){
  res.status(500).json({message: error.message});
  }
});

router.post('/new', async (req, res) => {
  const data = new ModelUser({
    nombre: req.body.nombre,
    apellido1: req.body.apellido1,
    apellido2: req.body.apellido2,
    email: req.body.email,
    password: req.body.password,
    dniPasaporte: req.body.dniPasaporte,
    movil: req.body.movil,
    fechaNacimiento: req.body.fechaNacimiento,
    tipo: req.body.tipo || 'cliente',
    reservas: req.body.reservas || [],
    avatar: req.body.avatar
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/update', async (req, res) => {
  try {
    const dniPasaporte = req.body.dniPasaporte;
    const resultado = await ModelUser.updateOne(
      { dniPasaporte: dniPasaporte },
      {
        $set: {
          nombre: req.body.nombre,
          apellido1: req.body.apellido1,
          apellido2: req.body.apellido2,
          email: req.body.email,
          password: req.body.password,
          movil: req.body.movil,
          fechaNacimiento: req.body.fechaNacimiento,
          tipo: req.body.tipo,
          reservas: req.body.reservas,
          avatar: req.body.avatar
        },
      }
    );

    if (resultado.modifiedCount === 0) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    res.status(200).json({ message: 'Documento actualizado exitosamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/delete', async (req, res) => {
  try {
  const user = req.body.username;
  const data = await ModelUser.deleteOne({ username: user })
  if (data.deletedCount === 0) {
  return res.status(404).json({ message: 'Documento no encontrado' });
  }
  //res.send(`Document with ${data.usuario} has been deleted..`)
  res.status(200).json({ message: `Document with ${user} has been
  deleted..` })
  }
  catch (error) {
  res.status(400).json({ message: error.message })
  }
})
