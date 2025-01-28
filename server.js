require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000;
const mongoString = process.env.DATABASE_URL
const mongoStringLocal = process.env.DATABASE_URL_LOCAL

const router = require('./routes/routes.js')
const authRoutes = require('./routes/auth');



mongoose.connect(mongoStringLocal);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});  

const app = express();
//middleware
//app.use(express.json());
//Nos permite manejar peticiones y enviar respuesta en formato json
app.use(bodyParser.json());
//De esta manera indicamos que no vamos a recibir peticiones enviadas
//directamente de un formulario, sino que sera todo enviado en json
app.use(bodyParser.urlencoded({extended: false}))

app.use("/user",router);
//practica de psp
app.use('/api/user', authRoutes);

app.listen(3000, () => {
console.log(`Server Started at ${PORT}`)})