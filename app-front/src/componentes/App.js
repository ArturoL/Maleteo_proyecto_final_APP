import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import HomeMaleteo from "./HomeMaleteo";
import UbicacionBusquedaOpcciones from './UbicacionBusquedaOpciones';
import RegistroUsuarios from "./registro/RegistroUsuarios";
import LoginUsuario from "./login/LoginUsuario";
import DetallesReserva from './detalles_reserva/detalles_reserva';



function App(){
  
  return (
   
    <Router>
    <div className='wrapper'>
    <header className='cabeceraApp col-xs-12'>
    <nav className="navegadorN1">
        <div className="iniciarSesion">
        <Link to="/iniciarsesion" className='navLogin'> Iniciar sesión </Link>         </div>
        
        <div className="registro">
        <Link to="/registro" className='navRegistro'> Regístrate </Link>
        </div>
    </nav>
    </header>
          
          
          <Route path="/iniciarsesion" exact component={LoginUsuario}/>
          <Route path="/registro" exact component={RegistroUsuarios}/>
          <Route path="/home" exact component={HomeMaleteo}/>
          <Route path="/search" exact component={UbicacionBusquedaOpcciones}/>
          <Route path="/detalles_reserva" exact component={DetallesReserva}/>
  
        
    </div>         
    </Router>
    
  );
}
export default App

