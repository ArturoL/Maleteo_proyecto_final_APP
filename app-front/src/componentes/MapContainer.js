
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
       
            latitud:'',
            longitud:'',
            datos :[]
        };
    }
    onMarkerClick(props, marker, event) {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
      }
 
    localizado = (posicion) => {
        this.setState({
            latitud: posicion.coords.latitude,
            longitud: posicion.coords.longitude,
        
        });
        console.log(this.state.latitud);
        console.log(this.state.longitud);
    }
    componentDidMount(){
        console.log('componentDidmount');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.localizado);
        }
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
            return (
            <Marker
                    name={dato.nombre}
                    //onClick={this.onMarkerClick}
                    title={dato.nombre + " " + dato.datos_guardian.titulo}
                    icon= "http://maps.google.com/mapfiles/kml/paddle/G.png"
                    position={{lat: dato.datos_guardian.ubicacion.lat, lng: dato.datos_guardian.ubicacion.lng}}
            />     
            );
         });
    }
    markersLoc(latitud,longitud){
        let currentLocation = this.state.datos.filter( dato => 'ubicacion' in dato.datos_guardian );
       
        return currentLocation.map(function(dato, i){
            return (
            <Marker
                    name="Mi posicion"
                    title="Mi pos"
                    icon = "http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"
                    showingInfoWindow = "YOU ARE HERE"
                    position={{lat: latitud, lng: longitud}}
            />      
            );
         });
    }
    render(){
        console.log('render');
        return (
            <Map google={this.props.google}
                zoom={12}
                center={{lat:this.state.latitud ,lng: this.state.longitud}}
            
            >
                { this.markersLoc(this.state.latitud, this.state.longitud) }
                { this.markers() }
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey:"AIzaSyDZD71P8o7Jppkz5IQLhzxtROFJeCi_HD4"
})(MapContainer)


