const mongoose = require("mongoose");

const BD_RESERVAS = [
  {
    codigo: "RES006",
    fechaInicio: new Date("2025-02-08T10:00:00Z"),
    fechaFin: new Date("2025-02-11T10:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c150"), // Odin
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f79"), // Ana López
    precio: 375
  },
  {
    codigo: "RES007",
    fechaInicio: new Date("2025-02-09T14:00:00Z"),
    fechaFin: new Date("2025-02-10T14:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c151"), // Thor
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f7a"), // Carlos González
    precio: 125
  },
  {
    codigo: "RES008",
    fechaInicio: new Date("2025-02-10T09:00:00Z"),
    fechaFin: new Date("2025-02-15T09:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c152"), // Freyja
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f78"), // Juan Pérez
    precio: 1250
  },
  {
    codigo: "RES009",
    fechaInicio: new Date("2025-02-11T12:00:00Z"),
    fechaFin: new Date("2025-02-12T12:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c153"), // Loki
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f7b"), // María Sánchez
    precio: 125
  },
  {
    codigo: "RES010",
    fechaInicio: new Date("2025-02-12T16:00:00Z"),
    fechaFin: new Date("2025-02-14T16:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c154"), // Balder
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f7c"), // Luis Ramírez
    precio: 250
  },
  {
    codigo: "RES011",
    fechaInicio: new Date("2025-02-13T11:00:00Z"),
    fechaFin: new Date("2025-02-18T11:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c155"), // Heimdall
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f7d"), // Elena Torres
    precio: 1250
  },
  {
    codigo: "RES012",
    fechaInicio: new Date("2025-02-14T13:00:00Z"),
    fechaFin: new Date("2025-02-15T13:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c156"), // Bragi
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f7e"), // Pedro Flores
    precio: 125
  },
  {
    codigo: "RES013",
    fechaInicio: new Date("2025-02-15T10:00:00Z"),
    fechaFin: new Date("2025-02-17T10:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c157"), // Forseti
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f7f"), // Sofía Morales
    precio: 250
  },
  {
    codigo: "RES014",
    fechaInicio: new Date("2025-02-16T15:00:00Z"),
    fechaFin: new Date("2025-02-19T15:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c158"), // Vidar
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f80"), // Miguel Cruz
    precio: 750
  },
  {
    codigo: "RES015",
    fechaInicio: new Date("2025-02-17T08:00:00Z"),
    fechaFin: new Date("2025-02-18T08:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c159"), // Ullr
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f81"), // Laura Vega
    precio: 125
  },
  {
    codigo: "RES016",
    fechaInicio: new Date("2025-02-18T14:00:00Z"),
    fechaFin: new Date("2025-02-20T14:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c15a"), // Sif
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f82"), // Andrés Navarro
    precio: 250
  },
  {
    codigo: "RES017",
    fechaInicio: new Date("2025-02-19T09:00:00Z"),
    fechaFin: new Date("2025-02-23T09:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c15b"), // Huginn
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f83"), // Carmen Gil
    precio: 1000
  },
  {
    codigo: "RES018",
    fechaInicio: new Date("2025-02-20T11:00:00Z"),
    fechaFin: new Date("2025-02-21T11:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c15c"), // Muninn
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f84"), // Javier Méndez
    precio: 250
  },
  {
    codigo: "RES019",
    fechaInicio: new Date("2025-02-21T13:00:00Z"),
    fechaFin: new Date("2025-02-22T13:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c15d"), // Geri
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f85"), // Isabel Romero
    precio: 125
  },
  {
    codigo: "RES020",
    fechaInicio: new Date("2025-02-22T10:00:00Z"),
    fechaFin: new Date("2025-02-23T10:00:00Z"),
    habitacion: new mongoose.Types.ObjectId("67aa168b109beb65c801c15e"), // Rafn
    usuario: new mongoose.Types.ObjectId("67aa1964acc7f4ca632c6f86"), // Diego Ortega
    precio: 375
  }
];

module.exports = BD_RESERVAS;
