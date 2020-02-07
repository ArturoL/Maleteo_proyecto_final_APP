import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react"; //despues de instalar npm i google-maps-react
//añadir a App.js import MapContainer from "./components/maps.component";
import  "./MapContainer.css";
import { BrowserRouter as Router, Link} from "react-router-dom";
import mapStyles from "./mapStyles";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitud: "",
      longitud: "",
      datos: [],
      indice: -1
    };
    this.markersInfo = this.markersInfo.bind(this)
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

  onMarkerClick (dato, indice) {
    this.setState( {
      "indice": indice
    })

    sessionStorage.setItem("datos_reserva", JSON.stringify(dato))
  
   }

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
      fetch("http://127.0.0.1:4000/api/malt/usuarios/guardianes",{
          method: 'post'
      })
      .then(res => res.json())
      .then(datos => {
        console.log("datos");
        var nuevoDato = [];
        const disponibles = sessionStorage.getItem("guardianes_disp");
        //disponibles = JSON.parse(disponibles);
        JSON.parse(disponibles).forEach(element => {
          element.mostrado = false;
          nuevoDato.push(element);
          console.log(element);
        });
        //añado variables que son propiedades que le añado al mapa
        this.setState({ datos: nuevoDato });
      });
      // const disponibles = sessionStorage.getItem("guardianes_disp");
      // this.setState({datos: JSON.parse(disponibles)})

  }
  
  markers() {
    console.log(this.state.datos);
    let datosConLatLong = this.state.datos.filter(
      dato => "ubicacion" in dato.datos_guardian
    );
    console.log(datosConLatLong);
    var that = this;
    return datosConLatLong.map(function(dato, i) {
      return (
        <Marker
          name={dato.nombre}
          onClick={that.onMarkerClick.bind(that, dato, i)}
          title={dato.nombre + " " + dato.datos_guardian.titulo}
        
          position={{
            lat: dato.datos_guardian.ubicacion.lat,
            lng: dato.datos_guardian.ubicacion.lng
          }}
          icon={{
              url: 'https://www.flaticon.es/premium-icon/icons/svg/1537/1537790.svg',
              scaledSize: new window.google.maps.Size(50, 50)
          }}
               
          
        />
      );
    });
  }

  markersInfo() {
    if (this.state.indice >= 0) {
        let dato = this.state.datos[this.state.indice];
        console.log(dato.nombre, dato.datos_guardian.valoracion);
      return (
        <InfoWindow 
          options={{Width: 900}} 
          position={{
            lat: dato.datos_guardian.ubicacion.lat,
            lng: dato.datos_guardian.ubicacion.lng
          }}
          visible={true}
        >
          <div className='markerCont'>
          <div className="detail campoMarker">
            <h1 className= 'tituloMark'>{dato.datos_guardian.titulo}</h1></div>
          <div className="detail campoMarker">
          <h1 className= 'tituloMark'>Nombre guardian: </h1>
          <div>{dato.nombre}</div></div>
          <div className="detail campoMarker">
          <h1 className= 'tituloMark'>Valoracion:</h1>
          <div> {dato.datos_guardian.valoracion}</div></div>
          <div><button className="button botonMarker"><a href="/detalles_reserva">Reservar</a></button></div>
          </div>
        </InfoWindow>
     );
    }
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
          icon={{
              url:"https://image.flaticon.com/icons/svg/1329/1329665.svg",
              scaledSize: new window.google.maps.Size(50, 50)}}
          position={{ lat: latitud, lng: longitud }}
        />
      );
    });
  }
  render() {
    console.log("render");

    let createMapOptions = function (maps) {
      return {
        panControl: false,
        mapTypeControl: false,
        scrollwheel: false,
        
      }
    };
    return (
      <Map
        google={this.props.google}
        zoom={12}
        center={{ lat: this.state.latitud, lng: this.state.longitud }}
        options={{styles:mapStyles}}
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
