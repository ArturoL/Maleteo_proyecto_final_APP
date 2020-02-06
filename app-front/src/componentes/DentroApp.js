import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import './NavRegLogin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import MapContainer from "./MapContainer";
import HomeMaleteo from "./HomeMaleteo";
import DetallesReserva from "./detalles_reserva/detalles_reserva";
import "./DentroApp.css"

import ServicioLogin from '../servicios/ServicioLogin';
import Thanks from './Thanks';






class DentroApp extends Component {

  
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
        <div>
            <Router>
            <Route path="/home" exact component={HomeMaleteo}/>
            <Route path= "/mapa" exact component= {MapContainer}/>
            <Route path= "/thanks" exact component={Thanks}/>
            <Route path= "/detalle_reserva" exact component={DetallesReserva}/>
            </Router>
            <div className='futer'>
                    <div>
              
                    <img onClick ={this.onClickLogout} className='loguito' src={require('../assets/003-boton-de-encendido-apagado.svg')}/>
                    <Redirect to="nav/iniciarsesion"/>

                    </div>
                    <div><img className='loguito' src={require('../assets/001-casa.svg')}/></div>
                    <div><img className='loguito' src={require('../assets/002-busqueda.svg')}/></div>
                    <div><img className='loguito' src={require('../assets/004-comentario.svg')}/></div>
            </div>
            {
             (ServicioLogin.getLogueado() ? <Redirect to="/home"/> : "")
            }
        </div>
      );
    }
    
  }
  export default DentroApp