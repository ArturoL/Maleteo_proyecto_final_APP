import React, { Component } from 'react';
import './detalles_reserva.css';


class DetallesReserva extends /*React.*/ Component{


    constructor(props){
        super(props);    //Invocamos al constructor del padre
                        // pasándole las propiedades públicas.
        
        //Para evitar el problema del this con JS hacemos siguiente
        // en el futuro cuando se invoque el metodo this sea realmente this
        
        this.state={
            nombre: 'caca',
            email: 'caca@caca.com',
            fecha: '7464',
            numero_maletas:'3',
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
        window.fetch('http://localhost:4000/api/malt/detalles_reserva/reserva', {
            method: 'POST',
            body: JSON.stringify({
                "nombre_guardian": this.state.nombre,
                "email_guardian": this.state.email,
                "fecha": this.state.fecha,
                "numero_maletas":this.state.numero_maletas
            }), 
            headers: {'Content-Type': 'application/json'}
        }).then((res)=> { window.location = "/thanks"; 
                            console.log('Reserva Creada')})
        .catch((vacas)=> alert( 'Algo ha ido mal'))
       // window.location = "/thanks";
    }









    render(){
        return(
    
    
        <div className="contenedor">
            <h2>Detalles de tu reserva</h2>

            <div className="detalles">
            <form onSubmit={this.onSubmit}>
                <div className="detalles_reserva">
                    
                    <p>Nombre de tu guardián:</p>
                    <input type="text" value={this.state.nombre} onChange={this.onChangeNombre}/>
                    <p>Email de contacto:</p>
                    <input type="email" value={this.state.email} onChange={this.onChangeEmail}/>
                    <p>Fecha escogida:</p>
                    <input type="text" value={this.state.fecha} onChange={this.onChangeFecha}/>
                    <p>Nº de maletas:</p>
                    <input type="number" value={this.state.numero_maletas} onChange={this.onChangeNMaletas}/>
                    
                </div>
                <div className="detalles_button">
                    <button type='submit' className="detalles_button_btn">Reservar</button>
                </div>
                    </form> 
            </div>
           
        </div>
    
    
    )           
    }

}
export default DetallesReserva;