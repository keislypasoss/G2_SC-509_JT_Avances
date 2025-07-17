
const mongoose = require('mongoose');


const TratamientoSchema = new mongoose.Schema(
    {
        id: { type: Number },
        residente: { type: mongoose.Schema.Types.ObjectId, ref: 'Residente', required: true },
        medicamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicamento', required: true },
        dosis: { type: String },                      
        frecuencia: { type: String },                 
        via_administracion: { type: String },         
        fecha_inicio: { type: Date, required: true },
        fecha_fin: { type: Date },
        observaciones: { type: String },
        personal_asignado: { type: mongoose.Schema.Types.ObjectId, ref: 'Personal' }, 
        estado: { type: String }   
    }
);


module.exports = mongoose.model('Tratamiento', TratamientoSchema);
