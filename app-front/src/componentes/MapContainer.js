import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react"; //despues de instalar npm i google-maps-react
//añadir a App.js import MapContainer from "./components/maps.component";
import  "./MapContainer.css";
import { BrowserRouter as Router, Link} from "react-router-dom";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitud: "",
      longitud: "",
      datos: []
    };
  }
  // onMarkerClick = (props, marker, e) =>
  // this.setState({
  // selectedPlace: props,
  // activeMarker: marker,
  // showingInfoWindow: true
  // });

  // onClose = props => {
  // if (this.state.showingInfoWindow) {
  // this.setState({
  // showingInfoWindow: false,
  // activeMarker: null
  // });
  // }
  // };

  localizado = posicion => {
    this.setState({
      latitud: posicion.coords.latitude,
      longitud: posicion.coords.longitude
    });
    console.log(this.state.latitud);
    console.log(this.state.longitud);
  };
  componentDidMount() {
    console.log("componentDidmount");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.localizado);
    }
    /* fetch("http://127.0.0.1:4000/api/malt/usuarios/guardianes")
      .then(res => res.json())
      .then(datos => {
        console.log("datos");
        //añado variables que son propiedades que le añado al mapa
        this.setState({ datos: datos });
      }); */
      const disponibles = sessionStorage.getItem("guardianes_disp");
      this.setState({datos: JSON.parse(disponibles)})

  }
  markers() {
    console.log(this.state.datos);
    let datosConLatLong = this.state.datos.filter(
      dato => "ubicacion" in dato.datos_guardian
    );
    console.log(datosConLatLong);

    return datosConLatLong.map(function(dato, i) {
      return (
        <Marker
          name={dato.nombre}
          // onClick={this.onMarkerClick}
          title={dato.nombre + " " + dato.datos_guardian.titulo}
          icon="http://maps.google.mapaom/mapfiles/kml/paddle/G.png"
          position={{
            lat: dato.datos_guardian.ubicacion.lat,
            lng: dato.datos_guardian.ubicacion.lng
          }}
          icon={{
              url: '/maleta2.svg',
              scaledSize: new window.google.maps.Size(50, 50)
          }}
        /*  onClick={()=>{
              alert(dato.nombre)
          }}  */
        />
      );
    });
  }
  markersInfo() {
    console.log(this.state.datos);
    let datosConWindow = this.state.datos.filter(
      dato =>
        "ubicacion" in dato.datos_guardian &&
        "valoracion" in dato.datos_guardian
    );
    console.log(datosConWindow);

    return datosConWindow.map(function(dato, i) {
      return (
        //console.log(dato.nombre, dato.datos_guardian.valoracion),
        <Router>
        <InfoWindow options={{Width: 900}} 
        
          position={{
            lat: dato.datos_guardian.ubicacion.lat,
            lng: dato.datos_guardian.ubicacion.lng
          }}
          visible={true}
        >
       
           
          <div className="detail">{dato.datos_guardian.titulo}</div>
          <div className="detail">{dato.nombre}</div>
          <div className="detail">{dato.datos_guardian.valoracion}</div>
          <div><button className="button"><Link to="/detalles_reserva"> Reservar</Link></button></div>
        </InfoWindow>
        </Router>
      );
    });
  }
  markersLoc(latitud, longitud) {
    let currentLocation = this.state.datos.filter(
      dato => "ubicacion" in dato.datos_guardian
    );

    return currentLocation.map(function(dato, i) {
      return (
        <Marker
          name="Mi posicion"
          title="Mi pos"
          icon="http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"
          position={{ lat: latitud, lng: longitud }}
        />
      );
    });
  }
  I;
  render() {
    console.log("render");
    return (
      <Map
        google={this.props.google}
        zoom={12}
        center={{ lat: this.state.latitud, lng: this.state.longitud }}
      >
        {this.markersLoc(this.state.latitud, this.state.longitud)}
        {this.markers()}
        {this.markersInfo()}
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyDZD71P8o7Jppkz5IQLhzxtROFJeCi_HD4"
})(MapContainer);
