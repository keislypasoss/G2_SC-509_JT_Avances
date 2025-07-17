
const express = require('express');
//mongoose aca usa todas las funciones
const mongoose = require('mongoose');
//Formateo de los datos
const bodyParse = require('body-parser');

//Rutas de la api
const RouterFamiliar = require('./routers/FamiliarRourtes');
const RouterHabitacion = require('./routers/HabitacionRourtes');
const RouterMedicamento = require('./routers/MedicamentoRourtes');
const RouterPersonal = require('./routers/PersonalRourtes');
const RouterResidente = require('./routers/ResidenteRourtes');
const RouterTratamiento = require('./routers/TratamientoRourtes');
const RouterActividad = require('./routers/ActividadRourtes');
const RouterVisita = require('./routers/VisitaRourtes');
const RouterVoluntario = require('./routers/VoluntarioRourtes');
const RouterCitaMedica = require('./routers/CitaMedicaRourtes');
const RouterHistorialMedico = require('./routers/HistorialMedicoRourtes');
const RouterDonacion = require('./routers/DonacionRourtes');


//asignacion de rutas
//variables para el https o web
const cors = require('cors');

//se hace una instancia para que app sea el express
const app = express();
const PORT = 3000;


//Conexion hacia mongodb 
mongoose.connect('mongodb://127.0.0.1:27017/hogar_ancianos',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Middlewares el router del htpp
app.use(cors());
app.use(bodyParse.json());



//Rutas del api

app.use('/api/familiares', RouterFamiliar)
app.use('/api/habitaciones', RouterHabitacion)
app.use('/api/medicamentos', RouterMedicamento)
app.use('/api/personal', RouterPersonal)
app.use('/api/residentes', RouterResidente)
app.use('/api/tratamientos', RouterTratamiento)
app.use('/api/actividades', RouterActividad)
app.use('/api/visitas', RouterVisita)
app.use('/api/voluntarios', RouterVoluntario)
app.use('/api/citas_medicas', RouterCitaMedica)
app.use('/api/historiales_medicos', RouterHistorialMedico)
app.use('/api/donaciones', RouterDonacion)

//Ocupamos el servidor funcional
app.listen(PORT, ()=> {
        //version old
        //console.log('Servidor corriendo http://localhost:'+PORT);
        //version new
        console.log(`Servidor corriendo http://localhost:${PORT}`);

    }
)

//()=> esto es igual a crear una funcion en js
// function saludar(){
//     return "hola";
// }
//()=>{
//     return "hola";
// }