use("hotel"); //hotel
  
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
      { "url": "https://example.com/odin-suite1.jpg", "plataforma": "general" },
      { "url": "https://example.com/odin-suite2.jpg", "plataforma": "general" }
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
      { "url": "https://example.com/thor-suite1.jpg", "plataforma": "general" },
      { "url": "https://example.com/thor-suite2.jpg", "plataforma": "general" }
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
      { "url": "https://example.com/freyja-suite1.jpg", "plataforma": "general" },
      { "url": "https://example.com/freyja-suite2.jpg", "plataforma": "general" }
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
      { "url": "https://example.com/loki-suite1.jpg", "plataforma": "general" },
      { "url": "https://example.com/loki-suite2.jpg", "plataforma": "general" }
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
      { "url": "https://example.com/balder-suite1.jpg", "plataforma": "general" },
      { "url": "https://example.com/balder-suite2.jpg", "plataforma": "general" }
    ],
    "habilitada": true
  },{
    "codigo": "HAB006",
    "nombre": "Huginn",
    "categoria": "Estándar",
    "camas": [
      { "numCamas": 1, "nombre": "Double" }
    ],
    "tamanyo": 50,
    "servicios": [
      { "logo": "xxxxx", "descripcion": "Aire Acondicionado" },
      { "logo": "xxxxx", "descripcion": "Televisión" },
      { "logo": "xxxxx", "descripcion": "Cafetera" },
      { "logo": "xxxxx", "descripcion": "Minibar" },
      { "logo": "xxxxx", "descripcion": "WiFi" }
    ],
    "numPersonas": 2,
    "precio": 125,
    "descripcion": "Lorem",
    "imagenes": [
      { "url": "https://example.com/huginn1.jpg", "plataforma": "general" },
      { "url": "https://example.com/huginn2.jpg", "plataforma": "general" },
      { "url": "https://example.com/huginn3.jpg", "plataforma": "general" }
    ],
    "habilitada": true
  },
  {
    "codigo": "HAB007",
    "nombre": "Muninn",
    "categoria": "Estándar",
    "camas": [
      { "numCamas": 1, "nombre": "Double" }
    ],
    "tamanyo": 50,
    "servicios": [
      { "logo": "xxxxx", "descripcion": "Aire Acondicionado" },
      { "logo": "xxxxx", "descripcion": "Televisión" },
      { "logo": "xxxxx", "descripcion": "Cafetera" },
      { "logo": "xxxxx", "descripcion": "Minibar" },
      { "logo": "xxxxx", "descripcion": "WiFi" }
    ],
    "numPersonas": 2,
    "precio": 125,
    "descripcion": "Lorem",
    "imagenes": [
      { "url": "https://example.com/muninn1.jpg", "plataforma": "general" },
      { "url": "https://example.com/muninn2.jpg", "plataforma": "general" },
      { "url": "https://example.com/muninn3.jpg", "plataforma": "general" }
    ],
    "habilitada": true
  },
  {
    "codigo": "HAB008",
    "nombre": "Geri",
    "categoria": "Estándar",
    "camas": [
      { "numCamas": 1, "nombre": "Double" }
    ],
    "tamanyo": 50,
    "servicios": [
      { "logo": "xxxxx", "descripcion": "Aire Acondicionado" },
      { "logo": "xxxxx", "descripcion": "Televisión" },
      { "logo": "xxxxx", "descripcion": "Cafetera" },
      { "logo": "xxxxx", "descripcion": "Minibar" },
      { "logo": "xxxxx", "descripcion": "WiFi" }
    ],
    "numPersonas": 2,
    "precio": 125,
    "descripcion": "Lorem",
    "imagenes": [
      { "url": "https://example.com/geri1.jpg", "plataforma": "general" },
      { "url": "https://example.com/geri2.jpg", "plataforma": "general" },
      { "url": "https://example.com/geri3.jpg", "plataforma": "general" }
    ],
    "habilitada": true
  },
  {
    "codigo": "HAB009",
    "nombre": "Rafn",
    "categoria": "Estándar",
    "camas": [
      { "numCamas": 1, "nombre": "Double" }
    ],
    "tamanyo": 50,
    "servicios": [
      { "logo": "xxxxx", "descripcion": "Aire Acondicionado" },
      { "logo": "xxxxx", "descripcion": "Televisión" },
      { "logo": "xxxxx", "descripcion": "Cafetera" },
      { "logo": "xxxxx", "descripcion": "Minibar" },
      { "logo": "xxxxx", "descripcion": "WiFi" }
    ],
    "numPersonas": 2,
    "precio": 125,
    "descripcion": "Lorem",
    "imagenes": [
      { "url": "https://example.com/rafn1.jpg", "plataforma": "general" },
      { "url": "https://example.com/rafn2.jpg", "plataforma": "general" },
      { "url": "https://example.com/rafn3.jpg", "plataforma": "general" }
    ],
    "habilitada": true
  },
  {
    "codigo": "HAB010",
    "nombre": "Valravn",
    "categoria": "Estándar",
    "camas": [
      { "numCamas": 1, "nombre": "Double" }
    ],
    "tamanyo": 50,
    "servicios": [
      "Aire Acondicionado",
      "Televisión",
      "Cafetera",
      "Minibar",
      "WiFi" 
    ],
    "numPersonas": 2,
    "precio": 125,
    "descripcion": "Lorem",
    "imagenes": [
      { "url": "https://example.com/valravn1.jpg", "plataforma": "general" },
      { "url": "https://example.com/valravn2.jpg", "plataforma": "general" },
      { "url": "https://example.com/valravn3.jpg", "plataforma": "general" }
    ],
    "habilitada": true
  },{
    "codigo": "HAB011",
    "nombre": "Sköll",
    "categoria": "Estándar",
    "camas": [
      { "numCamas": 2, "nombre": "Twin" }
    ],
    "tamanyo": 50,
    "servicios": [
      "Aire Acondicionado",
      "Televisión",
      "Cafetera",
       "Minibar",
       "WiFi"
    ],
    "numPersonas": 2,
    "precio": 125,
    "descripcion": "Lorem",
    "imagenes": [
      { "url": "https://example.com/skoll1.jpg", "plataforma": "general" },
      { "url": "https://example.com/skoll2.jpg", "plataforma": "general" },
      { "url": "https://example.com/skoll3.jpg", "plataforma": "general" }
    ],
    "habilitada": true
  },
  {
    "codigo": "HAB012",
    "nombre": "Dellingr",
    "categoria": "Estándar",
    "camas": [
      { "numCamas": 2, "nombre": "Twin" }
    ],
    "tamanyo": 50,
    "servicios": [
      "Aire Acondicionado",
       "Televisión",
      "Cafetera",
      "Minibar",
       "WiFi"
    ],
    "numPersonas": 2,
    "precio": 125,
    "descripcion": "Lorem",
    "imagenes": [
      { "url": "https://example.com/dellingr1.jpg", "plataforma": "general" },
      { "url": "https://example.com/dellingr2.jpg", "plataforma": "general" },
      { "url": "https://example.com/dellingr3.jpg", "plataforma": "general" }
    ],
    "habilitada": true
  },
  {
    "codigo": "HAB013",
    "nombre": "Svanr",
    "categoria": "Estándar",
    "camas": [
      { "numCamas": 2, "nombre": "Twin" }
    ],
    "tamanyo": 50,
    "servicios": [
      "Aire Acondicionado",
      "Televisión",
      "Cafetera",
      "Minibar",
      "WiFi"
    ],
    "numPersonas": 2,
    "precio": 125,
    "descripcion": "Lorem",
    "imagenes": [
      { "url": "https://example.com/svanr1.jpg", "plataforma": "general" },
      { "url": "https://example.com/svanr2.jpg", "plataforma": "general" },
      { "url": "https://example.com/svanr3.jpg", "plataforma": "general" }
    ],
    "habilitada": true
  },
  {
    "codigo": "HAB014",
    "nombre": "Gjallar",
    "categoria": "Estándar",
    "camas": [
      { "numCamas": 2, "nombre": "Twin" }
    ],
    "tamanyo": 50,
    "servicios": [
      "Aire Acondicionado",
      "Televisión",
      "Cafetera",
      "Minibar",
      "WiFi"
    ],
    "numPersonas": 2,
    "precio": 125,
    "descripcion": "Lorem",
    "imagenes": [
      { "url": "https://example.com/gjallar1.jpg", "plataforma": "general" },
      { "url": "https://example.com/gjallar2.jpg", "plataforma": "general" },
      { "url": "https://example.com/gjallar3.jpg", "plataforma": "general" }
    ],
    "habilitada": true
  },
  {
    "codigo": "HAB015",
    "nombre": "Arvakr",
    "categoria": "Estándar",
    "camas": [
      { "numCamas": 2, "nombre": "Twin" }
    ],
    "tamanyo": 50,
    "servicios": [
      "Aire Acondicionado",
      "Televisión",
      "Cafetera",
      "Minibar",
      "WiFi"
    ],
    "numPersonas": 2,
    "precio": 125,
    "descripcion": "Lorem",
    "imagenes": [
      { "url": "https://example.com/arvakr1.jpg", "plataforma": "general" },
      { "url": "https://example.com/arvakr2.jpg", "plataforma": "general" },
      { "url": "https://example.com/arvakr3.jpg", "plataforma": "general" }
    ],
    "habilitada": true
  },
  {
    "codigo": "HAB016",
    "nombre": "Fenrir",
    "categoria": "Estándar",
    "camas": [
      { "numCamas": 2, "nombre": "Twin" }
    ],
    "tamanyo": 50,
    "servicios": [
      "Aire Acondicionado",
      "Televisión",
      "Cafetera",
      "Minibar",
      "WiFi"
    ],
    "numPersonas": 2,
    "precio": 125,
    "descripcion": "Lorem",
    "imagenes": [
      { "url": "https://example.com/fenrir1.jpg", "plataforma": "general" },
      { "url": "https://example.com/fenrir2.jpg", "plataforma": "general" },
      { "url": "https://example.com/fenrir3.jpg", "plataforma": "general" }
    ],
    "habilitada": true
  }
]);
