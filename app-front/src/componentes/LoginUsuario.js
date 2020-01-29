import React, { Component } from 'react';
import './LoginUsuario.css';


class LoginUsuario extends /*React.*/ Component{


    constructor(props){
        super(props);
        this.state={
            email: '',
            password:'',
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
        console.log(`Datos: ${this.state.password},${this.state.email}`)
        window.fetch('http://localhost:4000/api/malt/login', {
            method: 'POST',
            body: JSON.stringify({
                "email": this.state.email,
                "password":this.state.password
            }), 
            headers: {'Content-Type': 'application/json'}
        }).then((res)=> {
            if (res.status === 200) {

                window.location = '/home.html'
                alert('Usuario login')
           
            } else {
                alert('Usuario NO Autoriz')
           
            }})
        .catch((vacas)=> 'Pues habra ido mal jojo')
    }









    render(){
        return(
    
    
        <div class="sesion">
            <h1 class='iniciaTitulo'>Inicia sesión <br/> ahora</h1>
            <div class="botonesFaceyGoogle">
                <button class='facebookbutton'>Facebook</button>
                <button class='googlebutton'>Google</button>
            </div>
            <p>o utiliza tu correo electrónico</p>
        
            <div class="formularioLogin">
            <form class='formLogin' onSubmit={this.onSubmit}>
                <label for="">Direccion de correo electrónico</label>
                <input type="text" value={this.state.email} onChange={this.onChangeEmail} placeholder="Email"/>
                
                <label for="">Contraseña</label>
                <input type="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Contraseña"/>
                
                <button type="submit" class="botonLogin">Iniciar sesión</button>
        
            </form>
            </div>
        </div>
    
    
) }}

export default LoginUsuario