import React, { Component } from "react";
import "./Bienvenido.css"
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";


class Bienvenido extends Component{
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
                <img src={require("../assets/world.png")} className='mundoimagen'/>
               </div>
               <h1 className='tituloBienvenido'>
                   El mismo precio en cualquier parte
               </h1>
               <div className='textito'>
                   <p>Dispondrás de un precio fijo estés donde estés sin importar el tamaño o el peso</p>
               </div>
               <Link className='linkeo' to="/continuar" >
            <button className='botonBienvenida'>Empezar ya</button>
               </Link>
            </div>
         </div>

       </div>
        )
    }
}

export default Bienvenido