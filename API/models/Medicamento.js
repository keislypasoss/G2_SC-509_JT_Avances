const mongoose = require('mongoose');

const MedicamentoSchema = new mongoose.Schema(
    {
        
        id: { type: Number },
        nombre: { type: String },
        descripcion: { type: String },
        dosis: { type: String },                      
        via_administracion: { type: String },        
        frecuencia: { type: String },                 
        fecha_caducidad: { type: Date },
        stock: { type: Number }, 
    }
);


module.exports = mongoose.model('Medicamento', MedicamentoSchema);