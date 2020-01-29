import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import RegistroUsuarios from "./RegistroUsuarios";
import LoginUsuario from "./LoginUsuario";



function App(){
  
  return (
   
    <Router>
    <div className='wrapper'>
    <header className='cabeceraApp col-xs-12'>
    <nav class="navegadorN1">
        <div class="iniciarSesion">
        <Link to="/iniciarsesion" className='navLogin'> Iniciar sesión </Link>         </div>
        
        <div class="registro">
        <Link to="/registro" className='navRegistro'> Regístrate </Link>
        </div>
    </nav>
    </header>
          
          
          <Route path="/iniciarsesion" exact component={LoginUsuario}/>
          <Route path="/registro" exact component={RegistroUsuarios}/>
  
        
    </div>         
    </Router>
    
  );
}
export default App

