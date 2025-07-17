const mongoose = require('mongoose');

const ResidenteSchema = new mongoose.Schema(
    {
        
        id: { type: Number },
        nombre: { type: String },
        apellido: { type: String },
        genero: { type: String },
        contacto: { type: Number },
        direccion: { type: String }, 
        estado: { type: String }
    }
);


module.exports = mongoose.model('Residente', ResidenteSchema);