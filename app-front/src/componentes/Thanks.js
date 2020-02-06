import React, { Component } from "react";
import "./Thanks.css"

class Thanks extends Component{
    constructor(props){
        super(props);

    }
    
    componentDidMount(){
        this.setState(this.state)
    }

    render(){
        return(
           
                <div className='logoDiv'>
            
                
            <a href="/thanks">
            
                <div className="logoequix">
                <a href="/home"> <img className="equix" src={require('../assets/simbolo-x.png')} /> 
                </a>                   
                </div>
            
                
                <div className="parrafo1">
                    <p>Reserva Completada</p>
                </div>
                <div className="logofenix">
                    <img className="pajaro" src={require('../assets/fenix@2x.png')} />                    
                </div>
                <div className="parrafo2">
                    <p>BE FREE!</p>                    
                </div>
                <div className="parrafo3">                    
                    <p>Contacta ya con tu guardian y espera que acepte tu reserva</p>
                </div>
            </a>
            </div>
            
        )
    }
}
export default Thanks