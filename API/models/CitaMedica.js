const mongoose = require('mongoose');

const CitaMedicaSchema = new mongoose.Schema(
    {
        id: { type: Number },
        residente: { type: mongoose.Schema.Types.ObjectId, ref: 'Residente', required: true },
        fecha: { type: Date },
        hora: { type: String },
        motivo: { type: String },
        profesional_salud: { type: mongoose.Schema.Types.ObjectId, ref: 'Personal' },
        estado: { type: String } 
    }
);

module.exports = mongoose.model('CitaMedica', CitaMedicaSchema);
