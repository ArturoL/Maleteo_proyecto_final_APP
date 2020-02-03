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

mongoose.connect('mongodb://127.0.0.1:27017/maleteo');
const conexion = mongoose.connection;
conexion.once("open",function(){                            //conectar con BBDD a través de Mongoose
    console.log('¡¡Hemos conectado con Mongo!');

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
rutasAPI.route("/login").post(function(reqPeticionHttp, resRespuestaHttp){
    const email = reqPeticionHttp.body.email;
    const objUsuario = reqPeticionHttp.body;

    Usuario.findOne(
        {"email": email}, (err, usu)=>{
        if(err || usu === null){
            console.log("Error:  " + err);
            resRespuestaHttp.status(401).send("Correo incorrecto")
        }else{
            if(usu.email === objUsuario.email && usu.password === objUsuario.password){
                resRespuestaHttp.status(200).json({
                    "hola":"Bienvenido " + usu.nombre
                });
            }else{
                console.log("Contraseña incorrecta")
                resRespuestaHttp.status(401).send("Contraseña incorrecta");
            }
        }
    }).then(res=>res)
    .catch(err=>err);    
});

//Get Usuario unico
rutasAPI.route("/getUser/:id").get(function(req,res){
    const id = req.params.id;
    console.log('id', id);
    Usuario.findById(id)
        .then(response=>res.status(200).send(response))
        .catch(err=>err);
});

rutasAPI.route("/usuarios/guardianes").get(function(req,res){
    console.log('todo el mapa');
    Usuario.find({guardian: "True"})
        .then(response=>res.status(200).send(response))
        .catch(err=>err);
});

// //Editar perfil del usuario
// rutasAPI.route("/edit/:id").put(function(req,res){
//     console.log("Entrando en editar?")
//     let editUsu = new Usuario(req.body);
//     editUsu._id = req.params.id;
//     Usuario.findById(editUsu._id, function(err,user){
//         for(const prop in req.body){
//             user[prop] = req.body[prop];
//         }
//         user.save();
//     }).then(res=>res).catch(err=>err);
// });

// //Eliminar usuario
// rutasAPI.route("/:id").delete(function(req,res){
//     let consultaFindOne = Usuario.findById(req.params.id);
//     consultaFindOne.exec((err,resDoc)=>{
//         if(err){
//             res.json({"mensaje":"No se ha encontrado"});
//         }else{
//             console.log("Usuario encontrado", resDoc);
//             consultaFindOne.deleteOne().exec(
//                 (err,resDoc2)=>{
//                     let msjResp = "";
//                     if(resDoc2.deletedCount>=1){
//                         msjResp = "ELIMINADO";
//                     }else{
//                         msjResp = "NO eliminado";
//                     }
//                     console.log(resDoc2);
//                     res.json({"mensaje":msjResp});
//                 }
//             )
//         }
//     })
// });