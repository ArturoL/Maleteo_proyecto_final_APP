import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import './App.css';
import HomeMaleteo from "./HomeMaleteo";
import UbicacionBusquedaOpcciones from './UbicacionBusquedaOpciones';
import RegistroUsuarios from "./registro/RegistroUsuarios";
import LoginUsuario from "./login/LoginUsuario";
import DetallesReserva from './detalles_reserva/detalles_reserva';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from "./Inicio";
import ServicioLogin from '../servicios/ServicioLogin';
import MapContainer from "./MapContainer";

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
    window.location = "/iniciarsesion";
  }

  render(){

    return (
      <Router>
        <div className='wrapper'>

          {/* { ServicioLogin.getLogueado() ? "logueado" : "NO login"} */}

          <header className='cabeceraApp col-xs-12'>
            {/* <a href="/home">Atras</a> */}
            <nav className="navegadorN1">
              {
                !this.state.logueado ? (
                  <React.Fragment>

                    <div className="iniciarSesion">
                      <Link to="/iniciarsesion" className='navLogin'> Iniciar sesión </Link>         
                    </div>
                    
                    <div className="registro">
                      <Link to="/registro" className='navRegistro'> Regístrate </Link>
                    </div>
                  </React.Fragment>
                ) : (
                  <div>
                    <a onClick ={this.onClickLogout} >Cerrar Sesion</a>
                    <Redirect to="/iniciarsesion"/>
                  </div>
                )
              }
            </nav>
          </header>    
            <Route path="/iniciarsesion" exact component={() => <LoginUsuario callback={() => this.setState( {logueado: true} )} />}/>
            <Route path="/registro" exact component={RegistroUsuarios}/>
            <Route path="/inicio" exact component={Inicio}/>
            <Route path="/home" exact component={HomeMaleteo}/>
          <Route path="/search" exact component={UbicacionBusquedaOpcciones}/>
          <Route path="/detalles_reserva" exact component={DetallesReserva}/>
          <Route path= "/mapa" exact component= {MapContainer}/>
        </div>         
      </Router>
      
    );
  }
  
}
export default App

