const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: Validaciones de campos en BBDD. ¡OBLIGATORIO!
let Reserva = new Schema({
    "nombre_guardian":{
        type: String
    },
    "email_guardian":{
        type: String
    },
    "fecha":{
        type: String
    },
    "numero_maletas":{
        type: Number
    }
});

// Como el export default pero para Node...
module.exports = mongoose.model('Reserva',Reserva);