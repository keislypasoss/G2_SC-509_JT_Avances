const mongoose = require('mongoose');


const HabitacionSchema = new mongoose.Schema(
    {
        id: { type: Number },
        numero: { type: Number },       
        capacidad: { type: Number },     
        estado: { type: String }, 
        residentes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Residente' }]
    }
);


module.exports = mongoose.model('Habitacion', HabitacionSchema);
