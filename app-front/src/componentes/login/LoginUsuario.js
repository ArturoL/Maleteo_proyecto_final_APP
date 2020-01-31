import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import HomeMaleteo from "../HomeMaleteo";
import './LoginUsuario.css';
import ServicioLogin from '../../servicios/ServicioLogin';



class LoginUsuario extends /*React.*/ Component{


    constructor(props){
        super(props);
        this.state={
            email: 'aa@aa.aa',
            password:'aaaa1111',
        }
        
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChangeEmail(evt){

        this.setState({
            email: evt.target.value
        });
    }
    onChangePassword(evt){

        this.setState({
            password: evt.target.value
        });
    }

    onSubmit(evt){
        evt.preventDefault();// Invocamos al servicio Http ajax fetch....
        console.log(`Datos: ${this.state.email},${this.state.password}`)
        window.fetch('http://localhost:4000/api/malt/login', {
            method: 'POST',
            body: JSON.stringify({
                "email": this.state.email,
                "password":this.state.password
            }), 
            headers: {'Content-Type': 'application/json'}
        }).then((res)=> {
            if (res.status === 200) {
                ServicioLogin.setLogueado(true);
                alert('Usuario login')
                this.setState(this.state);
           
            } else {
                alert('Usuario NO Autorizado')
           
            }})
        .catch((vacas)=> 'Pues habra ido mal jojo')
    }


    render(){
        return( 
        <div className="sesion">
            <h1 className='iniciaTitulo'>Inicia sesión <br/> ahora</h1>
            <div className="botonesFaceyGoogle">
                <button className='facebookbutton'>Facebook</button>
                <button className='googlebutton'>Google</button>
            </div>
            <p>o utiliza tu correo electrónico</p>
        
            <div className="formularioLogin">
            <form className='formLogin' onSubmit={this.onSubmit}>
                <label>Direccion de correo electrónico</label>
                <input type="text" 
                    value={this.state.email} onChange={this.onChangeEmail} placeholder="Email"/>
                
                <label>Contraseña</label>
                <input type="password" 
                    value={this.state.password} onChange={this.onChangePassword} placeholder="Contraseña"/>
                
                <button type="submit" className="botonLogin">Iniciar sesión</button>
        
            </form>
            {
             (ServicioLogin.getLogueado() ? <Redirect to="/inicio" /> : "")
            }
            </div>
        </div>
    
    
) }}

export default LoginUsuario