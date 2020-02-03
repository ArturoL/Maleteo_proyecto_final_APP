const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: Validaciones de campos en BBDD. ¡OBLIGATORIO!
let Usuario = new Schema({
    "nombre": {
      "type": "String"
    },
    "apellido": {
      "type": "String"
    },
    "email": {
      "type": "String"
    },
    "password": {
      "type": "String"
    },
    "edad": {
      "type": "Number"
    },
    "foto": {
      "type": "String"
    },
    "guardian": {
      "type": "String"
    },
    "datos_guardian": {
      "ubicacion": {
        "lat": {
          "type": "Number"
        },
        "lng": {
          "type": "Number"
        }
      },
      "capacidad_maletas": {
        "type": "Number"
      },
      "titulo": {
        "type": "String"
      },
      "disponibilidad": {
        "type": "String"
      },
      "no_disponible": {
        "type": [
          "String"
        ]
      },
      "valoracion": {
        "type": "Number"
      }
    }
  },
  {
    collection: 'usuarios'
  }
  );

// Como el export default pero para Node...
module.exports = mongoose.model('Usuario',Usuario);