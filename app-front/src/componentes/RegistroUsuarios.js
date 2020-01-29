import React, { Component } from 'react';
import './RegistroUsuarios.css'


class RegistroUsuarios extends /*React.*/ Component{

render(){
        return(
    
    <div className='contenedorRegistro wrapper'>
    <div class="registrate col-xs-12">
    <h1 className='unete col-xs-12'>Únete a maleteo y disfruta de sus ventajas</h1>
    <div class="botonesFaceyGoogle col-xs-12">
        <button class='facebookbutton'>Facebook</button>
        <button class='googlebutton'> Google</button>
    </div>
    <p>o utiliza tu correo electrónico</p>

    <div class="formularioRegistro col-xs-12">
    <form class='formRegistro'action="">
        <label for=""> Direccion de correo electrónico </label>
        <input type="text" value="email" placeholder="Email"/>
        
        <label for="">Nombre</label>
        <input type="text" value="nombre" placeholder="Email"/>
        
        <label for="">Apellido</label>
        <input type="text" value="apellido" placeholder="Email"/>
        
        <label for="">Contraseña</label>
        <input type="password" value="password" placeholder="Email"/>
        
        <label for="">Edad</label>
        <input type="number" value="number" placeholder="Debes ser mayor de edad para registrarte"/>
        <div className='checkboxRegistro'>
        <input type="checkbox" value="checkbox" placeholder="Email"/>
        <label for="checkbox">Quiero recibir consejos sobre como gestionar mi equipaje,ofertas y novedades.</label>
        
        </div>
        <button type="submit" class="botonRegistro">Resgístrate</button>

    </form>
    </div>
</div>
</div>

) }}

export default RegistroUsuarios