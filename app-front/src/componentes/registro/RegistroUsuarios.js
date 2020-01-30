import React, { Component } from 'react';
import './RegistroUsuarios.css'


class RegistroUsuarios extends /*React.*/ Component{

    constructor(props){
    super(props);
    this.state={
        nombre: '',
        edad: '',
        email: '',
        password:'',
    }
    
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeApellido = this.onChangeApellido.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEdad = this.onChangeEdad.bind(this);
    this.onSubmit = this.onSubmit.bind(this);    

 
    }

    onChangeNombre(evt){

        this.setState({// como parámetro recibimos un objeto con la prop email y le asignamos el valor
            nombre: evt.target.value
        });
    }
    onChangeApellido(evt){

        this.setState({// como parámetro recibimos un objeto con la prop email y le asignamos el valor
            apellido: evt.target.value
        });
    }
    onChangeEmail(evt){

        this.setState({// como parámetro recibimos un objeto con la prop email y le asignamos el valor
            email: evt.target.value
        });
    }

    onChangeEdad(evt){

        this.setState({// como parámetro recibimos un objeto con la prop email y le asignamos el valor
            edad: evt.target.value
        });
    }

    onChangePassword(evt){

        this.setState({
            password: evt.target.value
        });
    }

    
    onSubmit(evt){
        evt.preventDefault();// Invocamos al servicio Http ajax fetch....
        console.log(`Datos: ${this.state.nombre}, ${this.state.apellido}, ${this.state.password},${this.state.email},${this.state.edad}`)
        window.fetch('http://localhost:4000/api/malt/registro', {
            method: 'POST',
            body: JSON.stringify({
                "nombre": this.state.nombre,
                "apellido": this.state.apellido,
                "email": this.state.email,
                "edad": this.state.edad,
                "password":this.state.password
            }), 
            headers: {'Content-Type': 'application/json'}
        }).then((res)=> alert('Usuario creado'))
        .catch((vacas)=> 'Pues habra ido mal jojo')
    }
    

    render(){
        return(
    
    <div className='contenedorRegistro wrapper'>
    <div className="registrate col-xs-12">
    <h1 className='unete col-xs-12'>Únete a maleteo y disfruta de sus ventajas</h1>
    <div className="botonesFaceyGoogle col-xs-12">
        <button className='facebookbutton'>Facebook</button>
        <button className='googlebutton'> Google</button>
    </div>
    <p>o utiliza tu correo electrónico</p>

    <div className="formularioRegistro col-xs-12">
    <form className='formRegistro'onSubmit={this.onSubmit}>
        <label > Direccion de correo electrónico </label>
        <input type="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="Email" required/>
        
        <label >Nombre</label>
        <input type="text" value={this.state.nombre} onChange={this.onChangeNombre} placeholder="Nombre" required/>
        
        <label >Apellido</label>
        <input type="text" value={this.state.apellido} onChange={this.onChangeApellido}placeholder="Apellido" required/>
        
        <label >Contraseña</label>
        <input type="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Password" required/>
        
        <label >Edad</label>
        <input type="number" value={this.state.edad} onChange={this.onChangeEdad} placeholder="Debes ser mayor de edad para registrarte" required/>
        <div className='checkboxRegistro'>
        <input type="checkbox" value="checkbox" placeholder="Email" required/>
        <label >Quiero recibir consejos sobre como gestionar mi equipaje,ofertas y novedades.</label>
        
        </div>
        <button type="submit" className="botonRegistro" value="registrar">Resgístrate</button>

    </form>
    </div>
    </div>
    </div>

    ) }

}

export default RegistroUsuarios