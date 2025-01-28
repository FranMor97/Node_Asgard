const UserSchema = new mongoose.Schema({
    nombre: {
    required: true,
    type: String,
    },
    email: {
    required: true,
    type: String,
    },
    username: {
    required: true,
    type: String,
    },
    password: {
    required: true,
    type: String,
    },
    role: {
    type: String,
    enum: ["admin", "usuario","trabajador"], // Roles permitidos
    default: "usuario", // Rol por defecto
    },
    avatar: {
    type: String,
    },
    });