const mongoose = require('mongoose');

const ActividadSchema = new mongoose.Schema(
    {
        id: { type: Number },
        nombre: { type: String },
        descripcion: { type: String },
        fecha: { type: Date },
        lugar: { type: String },
        residentes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Residente' }],
        personal: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Personal' }],
        estado: { type: String } 
    }
);

module.exports = mongoose.model('Actividad', ActividadSchema);
