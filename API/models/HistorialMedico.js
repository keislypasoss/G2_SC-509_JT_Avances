const mongoose = require('mongoose');

const HistorialMedicoSchema = new mongoose.Schema(
    {
        id: { type: Number },
        residente: { type: mongoose.Schema.Types.ObjectId, ref: 'Residente', required: true },
        diagnosticos: [{ type: String }],
        tratamientos_anteriores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tratamiento' }],
        notas_medicas: { type: String },
        fecha_actualizacion: { type: Date }
    }
);

module.exports = mongoose.model('HistorialMedico', HistorialMedicoSchema);
