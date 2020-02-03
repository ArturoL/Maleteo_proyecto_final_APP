
import React, { Component } from 'react'
import { Map, 
        GoogleApiWrapper, 
        Marker, 
        InfoWindow, 
} from 'google-maps-react'  //despues de instalar npm i google-maps-react


//añadir a App.js import MapContainer from "./components/maps.component";

const style = {
    width:"90%",
    height:"90%",
}

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
        fetch("http://localhost:4000/usuario")
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
            <Map style={style}
                google={this.props.google} 
                zoom={12}
                initialCenter={{lat:40.417090, lng:-3.703440}}>
                    { this.markers() }  
            </Map>
        );
    }
}




export default GoogleApiWrapper({
    apiKey:"AIzaSyD5hrAlVFyCGhzu0_MsR90u6h0JDeCjlik"
})(MapContainer)


