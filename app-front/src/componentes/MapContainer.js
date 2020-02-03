
import React, { Component } from 'react'
import { Map, 
        GoogleApiWrapper, 
        Marker,  
} from 'google-maps-react'  //despues de instalar npm i google-maps-react


//añadir a App.js import MapContainer from "./components/maps.component";



 export class MapContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            datos :[]
        }
        //this.onMarkerClick = this.onMarkerClick.bind(this);
    }
    // onMarkerClick(props, marker, event){
    //     console.log("marcador");
 
    // }   

    componentDidMount(){
        console.log('componentDidmount');
        fetch("http://127.0.0.1:4000/api/malt/usuarios/guardianes")
            .then(res => res.json())
            .then(datos => {
                console.log ("datos");
                //añado variables que son propiedades que le añado al mapa  
                this.setState({datos: datos});
        });     
    }
    markers(){
        console.log(this.state.datos);
        let datosConLatLong = this.state.datos.filter( dato => 'ubicacion' in dato.datos_guardian );
        console.log(datosConLatLong);
        return datosConLatLong.map(function(dato, i){
            return <Marker 
                name={dato.nombre}
                title={dato.nombre + " " + dato.datos_guardian.titulo}
                position={{lat: dato.datos_guardian.ubicacion.lat, lng: dato.datos_guardian.ubicacion.lng}}
               // onClick={this.onMarkerClick}
               >
            </Marker>
        });
    }
    
    

    render(){
        console.log('render');
        return (
            <Map google={this.props.google} 
                zoom={10}
                initialCenter={{lat:40.417090, lng:-3.703440}}>
                    { this.markers() }  
            </Map>
        );
    }
}




export default GoogleApiWrapper({
    apiKey:"AIzaSyDZD71P8o7Jppkz5IQLhzxtROFJeCi_HD4"
})(MapContainer)


