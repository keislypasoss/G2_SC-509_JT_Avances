const mongoose = require('mongoose');

const PersonalSchema = new mongoose.Schema(
    
   
    {
        id: { type: Number },
        nombre: { type: String },
        apellido: { type: String },
        genero: { type: String },
        puesto: { type: String }, 
        fecha_nacimiento: { type: Date },
        fecha_contratacion: { type: Date },
        contacto: { type: Number },
        direccion: { type: String },
        estado: { type: String },
        horario: { type: String }, 
        salario: { type: Number }
    }
);


module.exports = mongoose.model('Personal', PersonalSchema);