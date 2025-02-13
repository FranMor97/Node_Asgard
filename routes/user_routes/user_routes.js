const express = require("express");
const router = express.Router();
const Habitacion = require("../../models/room_model");
const multer = require("multer");
const path = require("path");
const user_model = require("../../models/user_model");

const jwt = require('jsonwebtoken')

const Joi = require('joi')
//contraseña
const bcrypt = require('bcryptjs')

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generar un nombre único
  },
});
const upload = multer({ storage });

const schemaRegister = Joi.object({
  nombre: Joi.string().min(3).max(255).required(),
  apellido1: Joi.string().min(3).max(255).required(),
  apellido2: Joi.string().min(3).max(255).optional().allow(''), // opcional
  email: Joi.string().email().min(6).max(255).required(),
  dniPasaporte: Joi.string().min(6).max(20).required(),
  movil: Joi.string().min(9).max(15).required(),
  password: Joi.string().min(6).max(1024).required(),
  fechaNacimiento: Joi.date().required(),
  fechaRegistro: Joi.date().default(() => new Date()),
  tipo: Joi.string().valid('admin', 'usuario', 'cliente').default('usuario'),
  reservas: Joi.array().items(Joi.object()).default([]),
  avatar: Joi.string().uri().optional().allow('')
});

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  role: Joi.string().valid('admin', 'usuario').default('usuario')
})


router.post('/register', async (req, res) => {
  // validate user
  const { error } = schemaRegister.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }
  //valida Email unico
  const isEmailExist = await user_model.findOne({ email: req.body.email })
  if (isEmailExist) {
    return res.status(400).json({ error: 'Email ya registrado' })
  }

  // hash contraseña
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt)
  const user = new user_model({
    nombre: req.body.nombre,
    email: req.body.email,
    apellido1: req.body.apellido1,
    apellido2: req.body.apellido2,
    dniPasaporte: req.body.dniPasaporte,
    movil: req.body.movil,
    password: password,
    fechaNacimiento: req.body.fechaNacimiento,
    fechaRegistro: req.body.fechaRegistro,
    tipo: req.body.tipo,
    reservas: req.body.reservas,
    avatar: req.body.avatar
  })
  try {
    const savedUser = await user.save()
    res.json({
      error: null,
      data: savedUser
    })
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.post('/login', async (req, res) => {
  // validaciones
  const { error } = schemaLogin.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })
  const user = await user_model.findOne({ email: req.body.email })
  if (!user) return res.status(400).json({ error: 'Usuario no encontrado' })
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword)
    return res.status(400).json({ error: 'contraseña no válida' })

  if (user.tipo !== 'admin'|| user.tipo !== 'empleado') {
    return res.status(403).json({ error: 'Acceso denegado. Solo los administradores pueden iniciar sesión.' });
  }
  // create token
  const token = jwt.sign(
    {
      email: user.email,
      role: user.role,
      id: user._id
    },
    process.env.TOKEN_SECRETO,
    { expiresIn: process.env.JWT_EXPIRES }
  )
  res.header('auth-token', token).json({
    error: null,
    data: { token }
  })
})

router.get('/getAll', async (req, res) => {
  try{
  const data = await user_model.find();
  res.status(200).json(data);
  }
  catch(error){
  res.status(500).json({message: error.message});
  }
});

router.get('/getOne', async (req, res) => {
  try{
  const user = req.body.email;
  const usuariosDB = await user_model.findOne({ email: user });
  console.log(usuariosDB);
  if (!usuariosDB) {
  return res.status(404).json({ message: 'Email no encontrado' });
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
  if (req.body.dniPasaporte) condiciones.dniPasaporte = req.body.dniPasaporte;
  if (req.body.movil) condiciones.movil = req.body.movil;
  const data = await user_model.find(condiciones);
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
  const data = new user_model({
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
    const resultado = await user_model.updateOne(
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
  const user = req.body.email;
  const data = await user_model.deleteOne({ email: user })
  if (data.deletedCount === 0) {
  return res.status(404).json({ message: 'Email no encontrado' });
  }
  //res.send(`Document with ${data.usuario} has been deleted..`)
  res.status(200).json({ message: `Document with ${user} has been
  deleted..` })
  }
  catch (error) {
  res.status(400).json({ message: error.message })
  }
})

module.exports = router;