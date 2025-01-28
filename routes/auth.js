const router = require('express').Router()
const ModelUser = require('../models/modelUser')
// validation
const Joi = require('joi')
//contraseña
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const schemaRegister = Joi.object({
  nombre: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  username: Joi.string().min(3).max(40).required(),
  password: Joi.string().min(6).max(1024).required(),
  role: Joi.string().valid('admin', 'usuario').default('usuario'),
  avatar: Joi.string().regex(/^data:image\/\w+;base64,/)
})

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
  const isEmailExist = await ModelUser.findOne({ email: req.body.email })
  if (isEmailExist) {
    return res.status(400).json({ error: 'Email ya registrado' })
  }
  // hash contraseña
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt)
  const user = new ModelUser({
    nombre: req.body.nombre,
    email: req.body.email,
    username: req.body.username,
    password: password,
    role: req.body.role,
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
  const user = await ModelUser.findOne({ email: req.body.email })
  if (!user) return res.status(400).json({ error: 'Usuario no encontrado' })
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword)
    return res.status(400).json({ error: 'contraseña no válida' })
  // create token
  const token = jwt.sign(
    {
      email: user.email,
      role: user.role,
      id: user._id
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  )
  res.header('auth-token', token).json({
    error: null,
    data: { token }
  })
})

module.exports = router
