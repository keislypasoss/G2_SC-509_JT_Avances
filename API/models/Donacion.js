const mongoose = require('mongoose');

const DonacionSchema = new mongoose.Schema(
    {
        id: { type: Number },
        tipo: { type: String }, 
        donante: { type: String },
        fecha: { type: Date },
        cantidad: { type: Number }, 
        descripcion: { type: String }
    }
);

module.exports = mongoose.model('Donacion', DonacionSchema);
