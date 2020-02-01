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
        errors:{}
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
        
        if(this.handleValidation()){
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

            //TODO: quitar window.location
            window.location = "/iniciarsesion";
        }
    }

    handleValidation(){
        let errors = {};
        let formIsValid = true;

        //Name
        if(!this.state.nombre){
           formIsValid = false;
           errors["nombre"] = "No puede estar vacio";
        }

        if(typeof this.state.nombre !== "undefined"){
           if(!this.state.nombre.match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["nombre"] = "Solo letras";
           }        
        }

        //Apellido
        if(!this.state.apellido){
            formIsValid = false;
            errors["apellido"] = "No puede estar vacio";
        }
 
        if(typeof this.state.apellido !== "undefined"){
            if(!this.state.apellido.match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["apellido"] = "Solo letras";
            }        
        }

        //Email
        if(!this.state.email){
           formIsValid = false;
           errors["email"] = "No puede estar vacio";
        }

        if(typeof this.state.email !== "undefined"){
           let lastAtPos = this.state.email.lastIndexOf('@');
           let lastDotPos = this.state.email.lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email no valido";
            }
        }
        
        //Edad
        if(!this.state.edad){
            formIsValid = false;
            errors["edad"] = "No puede estar vacio";
        }

        if(typeof this.state.edad !== "undefined"){
            if(this.state.edad<18 || this.state.edad>=100){
                formIsValid = false;
                errors["edad"] = "Introduzca una edad valida";
            }
        }

        //Contraseña
        if(typeof this.state.password !== "undefined"){
            if(this.state.password.length<8){
                formIsValid = false;
                errors["password"] = "La contraseña debe tener mas de 8 carac.";
            }
        }

       this.setState({errors: errors});
       return formIsValid;
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
        <input type="email" value={this.state.email} onChange={this.onChangeEmail} 
            placeholder="Email" required/>
        <h5 style={{color: "red"}}>{this.state.errors["email"]}</h5>
        
        <label >Nombre</label>
        <input type="text" value={this.state.nombre} onChange={this.onChangeNombre} 
            placeholder="Nombre" required/>
        <h5 style={{color: "red"}}>{this.state.errors["nombre"]}</h5>
        
        <label >Apellido</label>
        <input type="text" value={this.state.apellido} onChange={this.onChangeApellido}
            placeholder="Apellido" required/>
        <h5 style={{color: "red"}}>{this.state.errors["apellido"]}</h5>
        
        <label >Contraseña</label>
        <input type="password" value={this.state.password} onChange={this.onChangePassword} 
            placeholder="Password" required/>
        <h5 style={{color: "red"}}>{this.state.errors["password"]}</h5>

        <label >Edad</label>
        <input type="number" value={this.state.edad} onChange={this.onChangeEdad} 
            placeholder="Debes ser mayor de edad para registrarte" required/>
        <h5 style={{color: "red"}}>{this.state.errors["edad"]}</h5>

        <div className='checkboxRegistro'>
        <input id="checkbox" type="checkbox" value="checkbox" placeholder="Email" required/>
        <label htmlFor="checkbox">Quiero recibir consejos sobre como gestionar mi equipaje,ofertas y novedades.</label>
        
        </div>
        <button type="submit" className="botonRegistro" value="registrar">Resgístrate</button>

    </form>
    </div>
    </div>
    </div>

    ) }

}

export default RegistroUsuarios