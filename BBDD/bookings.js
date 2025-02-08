
const mongoose = require("mongoose");


const BD_RESERVAS = [
    {
      codigo: "RES006",
      fechaInicio: new Date("2025-02-08T10:00:00Z"),
      fechaFin: new Date("2025-02-11T10:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de76"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d58"),
      precio: 375
    },
    {
      codigo: "RES007",
      fechaInicio: new Date("2025-02-09T14:00:00Z"),
      fechaFin: new Date("2025-02-10T14:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de7b"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d56"),
      precio: 125
    },
    {
      codigo: "RES008",
      fechaInicio: new Date("2025-02-10T09:00:00Z"),
      fechaFin: new Date("2025-02-15T09:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de73"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d58"),
      precio: 1250
    },
    {
      codigo: "RES009",
      fechaInicio: new Date("2025-02-11T12:00:00Z"),
      fechaFin: new Date("2025-02-12T12:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de7a"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d56"),
      precio: 125
    },
    {
      codigo: "RES010",
      fechaInicio: new Date("2025-02-12T16:00:00Z"),
      fechaFin: new Date("2025-02-14T16:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de7c"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d58"),
      precio: 250
    },
    {
      codigo: "RES011",
      fechaInicio: new Date("2025-02-13T11:00:00Z"),
      fechaFin: new Date("2025-02-18T11:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de71"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d57"),
      precio: 1250
    },
    {
      codigo: "RES012",
      fechaInicio: new Date("2025-02-14T13:00:00Z"),
      fechaFin: new Date("2025-02-15T13:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de78"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d56"),
      precio: 125
    },
    {
      codigo: "RES013",
      fechaInicio: new Date("2025-02-15T10:00:00Z"),
      fechaFin: new Date("2025-02-17T10:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de7f"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d58"),
      precio: 250
    },
    {
      codigo: "RES014",
      fechaInicio: new Date("2025-02-16T15:00:00Z"),
      fechaFin: new Date("2025-02-19T15:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de72"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d57"),
      precio: 750
    },
    {
      codigo: "RES015",
      fechaInicio: new Date("2025-02-17T08:00:00Z"),
      fechaFin: new Date("2025-02-18T08:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de79"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d56"),
      precio: 125
    },
    {
      codigo: "RES016",
      fechaInicio: new Date("2025-02-18T14:00:00Z"),
      fechaFin: new Date("2025-02-20T14:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de74"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d58"),
      precio: 250
    },
    {
      codigo: "RES017",
      fechaInicio: new Date("2025-02-19T09:00:00Z"),
      fechaFin: new Date("2025-02-23T09:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de75"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d57"),
      precio: 1000
    },
    {
      codigo: "RES018",
      fechaInicio: new Date("2025-02-20T11:00:00Z"),
      fechaFin: new Date("2025-02-21T11:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de77"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d56"),
      precio: 250
    },
    {
      codigo: "RES019",
      fechaInicio: new Date("2025-02-21T13:00:00Z"),
      fechaFin: new Date("2025-02-22T13:00:00Z"),
      habitacion:new mongoose.Types.ObjectId("67a22dc31df118df4f28de7a"),
      usuario:new mongoose.Types.ObjectId("679a714a6f2f5410e9c02d58"),
      precio: 125
    }
  ];

  
  module.exports =  BD_RESERVAS;