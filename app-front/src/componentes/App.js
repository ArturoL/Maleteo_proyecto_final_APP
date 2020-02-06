import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import './App.css';
import HomeMaleteo from "./HomeMaleteo";
import UbicacionBusquedaOpcciones from './UbicacionBusquedaOpciones';
import RegistroUsuarios from "./registro/RegistroUsuarios";
import Bienvenido from "./Bienvenido";
import LoginUsuario from "./login/LoginUsuario";
import DetallesReserva from './detalles_reserva/detalles_reserva';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from "./Inicio";
import ServicioLogin from '../servicios/ServicioLogin';
import MapContainer from "./MapContainer";
import Bienvenido2 from './Bienvenido2';
import NavRegLogin from './NavRegLogin';
import DentroApp from './DentroApp';
 
class App extends Component { 
  constructor(props) {
    super(props);
    
    this.state = {
      logueado: ServicioLogin.getLogueado()
    }
    this.onClickLogout = this.onClickLogout.bind(this);
  }
  
  componentDidMount(){
    ServicioLogin.getLogueado();
  }
  
  onClickLogout() {
    ServicioLogin.setLogueado(false);
  
    this.setState(this.state);
  
    //TODO: quitar window.location
    window.location = "nav/iniciarsesion";
  }
  
  render(){
  
    return (
      <Router>
        <div className='wrapper'>
        
          {/* { ServicioLogin.getLogueado() ? "logueado" : "NO login"} */}
          
          <Route path="/" exact component={Inicio}/>
          
          
          <Route path="/inicio" exact component={Bienvenido}/>
          <Route path="/continuar" exact component={Bienvenido2}/>
          <Route path="/nav/iniciarsesion" exact component={NavRegLogin}/>
          {/* <Route path="/nav/iniciarsesion" exact component={()=><LoginUsuario callback={()=>this.setState({logueado:true} )} /> }/> */}
          <Route path="/search" exact component={UbicacionBusquedaOpcciones}/>
           <Route path="/detalles_reserva" exact component={DetallesReserva}/>
         <Route path="/home" exact component={DentroApp}/>
          <Route path= "/mapa" exact component= {MapContainer}/>
          
          
        
        </div> 
      </Router>
    
    );
  }
 
}
export default App