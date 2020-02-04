import React, { Component } from "react";
import "./Bienvenido2.css"
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";


class Bienvenido2 extends Component{
    constructor(props){
        super(props);

    }
    
    componentDidMount(){
        this.setState(this.state)
    }

    render(){
        return(
       <div className='wrapper contenedorBienvenido'>
           <div>
           <div className='fonditoBlanco col-xs-12'>
               <div className='contImagen'>
                <img src={require("../assets/cadena.png")} className='mundoimagen'/>
               </div>
               <h1 className='tituloBienvenido'>
                   Prepárate para liberarte de tu equipaje
               </h1>
               <div className='textito'>
                   <p>Encuentra a tu guardián y disfruta 
                    a tu manera. Miles de usuarios ya están aprovechando las ventajas.</p>
               </div>
               <Link className="linkeo" to="nav/iniciarsesion"  >
               <button className='botonBienvenida'>Continuar</button>
               </Link>
            </div>
           </div>

       </div>
        )
    }
}

export default Bienvenido2