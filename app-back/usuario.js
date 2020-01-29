const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: Validaciones de campos en BBDD. ¡OBLIGATORIO!
let Usuario = new Schema({
    nombre: {
        type: String
    },
    apellido:{
        type: String
    },
    email: {
        type: String // String en mayus
    },
    password:{
        type: String
    },
    fecha_nac:{
        type: String
    },
    foto:{
        type: String
    },
    guardian:{
        type: Boolean
    }
});

// Como el export default pero para Node...
module.exports = mongoose.model('Usuario',Usuario);