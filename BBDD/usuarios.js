use('hotel') //hotel

db.usuarios.deleteMany({})

db.usuarios.isnsertMany([
  {
    nombre: 'Ana López',
    email: 'ana.lopez@example.com',
    username: 'ana_lopez',
    password: 'password123', // En la práctica, usa contraseñas hasheadas
    role: 'admin',
    avatar: 'https://example.com/avatars/ana.png'
  },
  {
    nombre: 'Carlos Martínez',
    email: 'carlos.martinez@example.com',
    username: 'carlos_m',
    password: 'securepassword456', // En la práctica, usa contraseñas hasheadas
    role: 'usuario',
    avatar: 'https://example.com/avatars/carlos.png'
  },
  {
    nombre: 'María García',
    email: 'maria.garcia@example.com',
    username: 'maria_g',
    password: 'mariapass789', // En la práctica, usa contraseñas hasheadas
    role: 'trabajador',
    avatar: 'https://example.com/avatars/maria.png'
  },
  {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    username: 'juan_p',
    password: 'juanpassword321', // En la práctica, usa contraseñas hasheadas
    role: 'usuario',
    avatar: null // Sin avatar
  }
])
