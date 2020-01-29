import React, { Component } from 'react';
import './LoginUsuario.css';


class LoginUsuario extends /*React.*/ Component{










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
            <form class='formLogin'action="">
                <label for="">Direccion de correo electrónico</label>
                <input type="text" value="email" placeholder="Email"/>
                
                <label for="">Contraseña</label>
                <input type="password" value="password" placeholder="Contraseña"/>
                
                <button type="submit" class="botonLogin">Iniciar sesión</button>
        
            </form>
            </div>
        </div>
    
    
) }}

export default LoginUsuario