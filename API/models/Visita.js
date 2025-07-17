const mongoose = require('mongoose');

const VisitaSchema = new mongoose.Schema(
    {
        id: { type: Number },
        nombre_visitante: { type: String },
        residente: { type: mongoose.Schema.Types.ObjectId, ref: 'Residente', required: true },
        fecha: { type: Date },
        hora: { type: String },
        observaciones: { type: String }
    }
);

module.exports = mongoose.model('Visita', VisitaSchema);
