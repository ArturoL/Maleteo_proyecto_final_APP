import React, { Component } from 'react';
import './detalles_reserva.css';


class DetallesReserva extends /*React.*/ Component{


    constructor(props){
        super(props);    //Invocamos al constructor del padre
                        // pasándole las propiedades públicas.
        
        //Para evitar el problema del this con JS hacemos siguiente
        // en el futuro cuando se invoque el metodo this sea realmente this
        
        this.state={
            nombre: '',
            email: '',
            fecha: '',
            numero_maletas:'',
        }
        
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFecha = this.onChangeFecha.bind(this);
        this.onChangeNMaletas= this.onChangeNMaletas.bind(this);
        this.onSubmit = this.onSubmit.bind(this);    

    }

    // metodo  onChange invocado por React cada vez que se cambia el valor de INPUT 
    // se envia un objeto con la informacion del metodo.


    onChangeNombre(evt){

        this.setState({// como parámetro recibimos un objeto con la prop email y le asignamos el valor
            nombre: evt.target.value
        });
    }
    onChangeEmail(evt){

        this.setState({// como parámetro recibimos un objeto con la prop email y le asignamos el valor
            email: evt.target.value
        });
    }

    onChangeFecha(evt){

        this.setState({// como parámetro recibimos un objeto con la prop email y le asignamos el valor
            fecha: evt.target.value
        });
    }

    onChangeNMaletas(evt){

        this.setState({
            numero_maletas: evt.target.value
        });
    }

    onSubmit(evt){
        evt.preventDefault();// Invocamos al servicio Http ajax fetch....
        console.log(`Datos: ${this.state.nombre}, ${this.state.email}, ${this.state.fecha},${this.state.numero_maletas}`)
        window.fetch('http://localhost:4000/api/usuarios/registro', {
            method: 'POST',
            body: JSON.stringify({
                "name": this.state.name,
                "email": this.state.email,
                "edad": this.state.edad,
                "password":this.state.password
            }), 
            headers: {'Content-Type': 'application/json'}
        }).then((res)=> alert('pues habra ido bien jeje'))
        .catch((vacas)=> 'Pues habra ido mal jojo')
    }









    render(){
        return(
    
    
        <div className="contenedor">
            <h2>Detalles de tu reserva</h2>

            <div className="detalles">
                <div className="detalles_reserva">
                    <p>Nombre de tu guardián:</p>
                    <p>Email de contacto:</p>
                    <p>Fecha escogida:</p>
                    <p>Nº de maletas:</p>
                </div>
                <div className="detalles_button">
                    <button className="detalles_button_btn">Reservar</button>
                </div>

            </div>
           
        </div>
    
    
    )           
    }

}
export default DetallesReserva;