require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require("multer");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const mongoString = process.env.DATABASE_URL
//const mongoStringLocal = process.env.DATABASE_URL_LOCAL

// IMPORTING ROUTES
const routerBooking = require('./routes/booking_routes/booking_roter.js')
const authRoutes = require('./routes/auth.js');
const roomRoutes = require("./routes/room_routes/room_routes.js");
const userRoutes = require("./routes/user_routes/user_routes.js")


// MONGO CONNECTION
mongoose
    .connect(mongoString)
    .then(() => console.log("🟢 Connected to MongoDB"))
    .catch((error) => console.error("🔴 Error connecting to MongoDB:", error));

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});  

const app = express();


// MIDDLEWARE
//Nos permite manejar peticiones y enviar respuesta en formato json
app.use(bodyParser.json());
//De esta manera indicamos que no vamos a recibir peticiones enviadas directamente de un formulario, sino que sera todo enviado en json
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


// Servir imágenes desde la carpeta `/uploads`
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configurar `multer` para manejar la subida de imágenes
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para evitar conflictos
    }
});
const upload = multer({ storage });

app.use("/api/users", userRoutes);

app.use("/api/bookings",routerBooking);

app.use('/api/user', authRoutes);

// PASAR `upload` COMO MIDDLEWARE A LAS RUTAS
app.use("/api/rooms", roomRoutes);

app.listen(3000, () => {
console.log(`Server Started at ${PORT}`)})