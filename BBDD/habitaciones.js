use(hotel);

db.habitaciones.insertMany([
  {
    "codigo": "HAB001",
    "nombre": "Odin",
    "categoria": "Suite",
    "camas": [
      { "numCamas": 1, "nombre": "King" },
      { "numCamas": 1, "nombre": "Queen" },
      { "numCamas": 2, "nombre": "Twin" }
    ],
    "tamanyo": 200,
    "servicios": [
      "Terraza",
      "Mesa de Billar",
      "Zona Spa",
      "Servicio Premium de Habitaciones",
      "Aire Acondicionado",
      "Bar",
      "Televisión",
      "Cafetera",
      "Nevera",
      "Oficina",
      "WiFi",
      "Gimnasio",
      "Piscina infinita climatizada"
    ],
    "numPersonas": 6,
    "precio": 1000,
    "descripcion": "Lorem",
    "imagenes": [
      { "android": "https://example.com/odin-suite-android.jpg", "wpf": "../../Images/..." }
    ],
    "habilitada": true
  },
  {
    "codigo": "HAB002",
    "nombre": "Thor",
    "categoria": "Junior Suite",
    "camas": [
      { "numCamas": 1, "nombre": "King" },
      { "numCamas": 1, "nombre": "Queen" }
    ],
    "tamanyo": 100,
    "servicios": [
      "Terraza",
      "Servicio Premium de Habitaciones",
      "Aire Acondicionado",
      "Televisión",
      "Cafetera",
      "Nevera",
      "Oficina",
      "WiFi",
      "Cocina"
    ],
    "numPersonas": 4,
    "precio": 625,
    "descripcion": "Lorem",
    "imagenes": [
      { "android": "https://example.com/thor-junior-suite-android.jpg", "wpf": "../../Images/..." }
    ],
    "habilitada": true
  },
  {
    "codigo": "HAB003",
    "nombre": "Freyja",
    "categoria": "Junior Suite",
    "camas": [
      { "numCamas": 1, "nombre": "King" },
      { "numCamas": 1, "nombre": "Queen" }
    ],
    "tamanyo": 100,
    "servicios": [
      "Terraza",
      "Servicio Premium de Habitaciones",
      "Aire Acondicionado",
      "Televisión",
      "Cafetera",
      "Nevera",
      "Oficina",
      "WiFi",
      "Cocina"
    ],
    "numPersonas": 4,
    "precio": 625,
    "descripcion": "Lorem",
    "imagenes": [
      { "android": "R.drawables.(...)", "wpf": "../../Images/..." }
    ],
    "habilitada": true
  },
  {
    "codigo": "HAB004",
    "nombre": "Loki",
    "categoria": "Junior Suite",
    "camas": [
      { "numCamas": 1, "nombre": "King" },
      { "numCamas": 1, "nombre": "Queen" }
    ],
    "tamanyo": 100,
    "servicios": [
      "Terraza",
      "Servicio Premium de Habitaciones",
      "Aire Acondicionado",
      "Televisión",
      "Cafetera",
      "Nevera",
      "Oficina",
      "WiFi",
      "Cocina"
    ],
    "numPersonas": 4,
    "precio": 625,
    "descripcion": "Lorem",
    "imagenes": [
      { "android": "R.drawables.(...)", "wpf": "../../Images/..." }
    ],
    "habilitada": true
  },
  {
    "codigo": "HAB005",
    "nombre": "Balder",
    "categoria": "Junior Suite",
    "camas": [
      { "numCamas": 1, "nombre": "King" },
      { "numCamas": 1, "nombre": "Queen" }
    ],
    "tamanyo": 100,
    "servicios": [
      "Terraza",
      "Servicio Premium de Habitaciones",
      "Aire Acondicionado",
      "Televisión",
      "Cafetera",
      "Nevera",
      "Oficina",
      "WiFi",
      "Cocina"
    ],
    "numPersonas": 4,
    "precio": 625,
    "descripcion": "Lorem",
    "imagenes": [
      { "android": "R.drawables", "wpf": "../../Images/..." }
    ],
    "habilitada": true
  }
]);
