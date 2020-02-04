import React, { Component } from "react";
import "./Inicio.css"

class Inicio extends Component{
    constructor(props){
        super(props);

    }
    
    componentDidMount(){
        this.setState(this.state)
    }

    render(){
        return(
            <div className='wrapper contenedorInicio'>
                <div className='logoDiv'>
            <a href="/inicio">
                <div className="logo">
                    <img className="maleta" src={require('../assets/maleta@2x.png')} />
                    <img className="titulo" src={require("../assets/maleteo@2x.png")}/>
                </div>
            </a>
            </div>
            </div>
        )
    }
}

export default Inicio