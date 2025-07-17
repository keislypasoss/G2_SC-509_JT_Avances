const mongoose = require('mongoose');

const VoluntarioSchema = new mongoose.Schema(
    {
        id: { type: Number },
        nombre: { type: String },
        apellido: { type: String },
        especialidad: { type: String }, 
        disponibilidad: { type: String }, 
        actividades_realizadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actividad' }],
        contacto: { type: Number },
        estado: { type: String }
    }
);

module.exports = mongoose.model('Voluntario', VoluntarioSchema);
