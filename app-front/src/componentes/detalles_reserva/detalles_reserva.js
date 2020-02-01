import React, { Component } from 'react';
import './detalles_reserva.css';


class DetallesReserva extends /*React.*/ Component{


    constructor(props){
        super(props);
    }

   /*  onSubmit(evt){
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

                window.location = '/home.html'
                alert('Usuario login')
           
            } else {
                alert('Usuario NO Autorizado')
           
            }})
        .catch((vacas)=> 'Pues habra ido mal jojo')
    } */









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
            <div className="footer">
                ajax        aaa         aaaa        ddd
            </div>
        </div>
    
    
    )           
    }

}
export default DetallesReserva;