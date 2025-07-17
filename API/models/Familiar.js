const mongoose = require('mongoose');


const FamiliarSchema = new mongoose.Schema(
    {
        id: { type: Number },
        nombre: { type: String },
        apellido: { type: String },
        parentesco: { type: String }, 
        contacto: { type: Number },   
        direccion: { type: String },
        residente: { type: mongoose.Schema.Types.ObjectId, ref: 'Residente', required: true },
        estado: { type: String }
    }
);

module.exports = mongoose.model('Familiar', FamiliarSchema);
