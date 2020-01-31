import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import './App.css';
import RegistroUsuarios from "./registro/RegistroUsuarios";
import LoginUsuario from "./login/LoginUsuario";
import Inicio from "./Inicio";
import ServicioLogin from '../servicios/ServicioLogin';

class App extends Component {

  
  constructor(props) {
    super(props);

    // this.setState({
    //   logueado: ServicioLogin.getLogueado()
    // });  
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

          { ServicioLogin.getLogueado() ? "logueado" : "NO login"}

          <header className='cabeceraApp col-xs-12'>
            <nav className="navegadorN1">
              {
                ! ServicioLogin.getLogueado() ? (
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
                    <a onClick = { this.onClickLogout } >Cerrar Sesion</a>
                    <Redirect to="/iniciarsesion"/>
                  </div>
                )
              }
            </nav>
          </header>    
            <Route path="/iniciarsesion" exact component={LoginUsuario}/>
            <Route path="/registro" exact component={RegistroUsuarios}/>
            <Route path="/inicio" exact component={Inicio}/>
        </div>         
      </Router>
      
    );
  }
  
}
export default App

