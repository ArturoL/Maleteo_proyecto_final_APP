const Usuario = require('./usuario');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//TODO: importar y usar modulo middle-ware CORS
const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/test');
const conexion = mongoose.connection;

conexion.once("open",function(){
    console.log("0) - Eureka hemos conectado en Mongoose");
});

app.listen(PORT,
    function () {
        console.log("servidor ejecutandose en " + PORT)
    });

const rutasAPI = express.Router();
app.use("/api/malt",rutasAPI);

function recibirRegistroPost(peticionHttp,respuestaHttp){
    console.log("2) - La peticion Http empieza ha ser procesada");
    let nuevoUsuario = new Usuario( peticionHttp.body );
    let promesaDeGuardado = nuevoUsuario.save();
    promesaDeGuardado.then( (usuario)=> {
        console.log("4) - Se ha registrado en bbdd");
        respuestaHttp.status(200).json({
            "usuario": "Creado satisfactoriamente"
        });
    }).catch( error => {
        console.log("4) - El registro ha fallado");
        respuestaHttp.status(400).send("El registro ha fallado");
    });
    console.log("3) - La peticion Http ha sido procesada");
}

//Registro de usuarios
rutasAPI.route("/registro").post(recibirRegistroPost);

//Login y comprobacion del usuario
rutasAPI.route("/iniciarsesion/:id").get(function(reqPeticionHttp, resRespuestaHttp){
    const id = reqPeticionHttp.params.id;
    const objUsuario = reqPeticionHttp.body;
    // const password = reqPeticionHttp.param.password;
    
    Usuario.findById(id, function(err, usu){
        if(err){
            console.log(" Error:  "+ err);
        }else{
            console.log(usu)
            console.log(objUsuario)
            console.log(objUsuario.password);
            if(usu.email === objUsuario.email && usu.password === objUsuario.password){
                resRespuestaHttp.status(200).json({
                    "hola":"Bienvenido " + usu.nombre
                });
            }else{
                console.log("contraseña incorrecta")
                resRespuestaHttp.status(404).send("Contraseña incorrecta");
            }
        }
    });
});