import React, { Component } from 'react';  
import './HomeMaleteo.css';
import UbicacionBusquedaOpcciones from './UbicacionBusquedaOpciones';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import Modal from 'react-modal';
import ServicioLogin from '../servicios/ServicioLogin';


Modal.setAppElement('#root');

class HomeMaleteo extends /*React.*/ Component{
    constructor(props){
        super(props);
        this.state = {
            fechaIda: '',
            fechaVuelta: '',
            horaIda: '',
            horaVuelta: '',
            numeroMaletas: '',
            modalOpen: false
        }

        this.onClick = this.onClick.bind(this);
    }

    componentDidMount(){
        // this.setState(this.state)
    }

    onClick(){
        const obj ={
            fecha: this.state.fechaIda,
            maletas: this.state.numeroMaletas
        }

        sessionStorage.setItem("fecha_reserva", this.state.fechaIda + " / " + this.state.fechaVuelta)
        sessionStorage.setItem("maletas_reserva", this.state.numeroMaletas)

        // Esto lo hacemos debido a que la fecha nos viene como "año-mes-dia"
        // y para que lo haga bien necesitamos "dia-mes-año"
        obj.fecha = obj.fecha.split("-").reverse().join("-");
        // Con el split separamos la fecha por los guiones (-), esto crea un array
        // que podemos invertir con reverser(). Despues lo volvemos a juntar con join

        //alert("Mostrando BODY: " + JSON.stringify(obj));

        if((typeof obj.fecha !== undefined && obj.fecha !== '') && (typeof obj.maletas !== undefined && obj.maletas !== '' && obj.maletas !== 'Nº de Maletas')){

            window.fetch('http://localhost:4000/api/malt/usuarios/guardianes',{
                method: 'post',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then((resp)=> {
                if (resp.status === 200) {
                    console.log("Correcto????")
                    console.log("Body:" + JSON.stringify(resp.body));
                    resp.json().then(
                        (arrayGuardianesDisp) => {
                            console.log("JSON:" + JSON.stringify(arrayGuardianesDisp));
                            sessionStorage.setItem("guardianes_disp", JSON.stringify(arrayGuardianesDisp));
                            this.setState(this.state);
                            window.location = "/mapa"
                    });
                } else {
                    console.log("Fallo en la busqueda")
                }})
            .catch((vacas)=> 'Pues habra ido mal')

        }else{
            alert("No dejes los campos de busqueda vacios")
        }
    }

    renderModalContent = fechasSelecciondas => 
        <>
            <div className="container contPopup">
                <div className="row">
                    <div className='contPopup2'>
                        <div className="fechaCont">
                            <div className='nombreCampo'>
                            <label>Fecha de Ida</label>
                            <label>Fecha de Vuelta</label>
                            </div>
                            <div className='campos'>
                            <div className='campo'>
                            
                            <input 
                                onChange={e => {
                                    console.log(e.target.value);
                                    this.setState({ fechaIda: e.target.value })
                                }}
                                value={this.state.fechaIda}
                                className='calendarioHome' 
                                placeholder='Ida'
                                type="date"
                            />
                            </div>
                            <div className='campo'>
                           
                            <input 
                                onChange={e => {
                                    console.log(e.target.value);
                                    this.setState({ fechaVuelta: e.target.value })
                                }}
                                value={this.state.fechaVuelta}
                                className='calendarioHome' 
                                placeholder='Vuelta'
                                type="date"
                            />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            {
                fechasSelecciondas && (
                    <>
                    {/* <p>Horitas</p> */}
                    <div className="container">
                        <div className="row">
                            <div className='contPopup2'>
                                <div className='nombreCampo'>
                                <label>Hora de Ida</label>
                                <label>Hora de Vuelta</label>
                                </div>
                                <div className='campos'>
                                <div className="campo">
                                    <input
                                    className='inputCampo2'
                                    onChange={e=>{
                                        this.setState({horaIda: e.target.value})
                                    }}
                                    value={this.state.horaIda}
                                    type="time"
                                    min="01:00" max="00:00" required/>
                                </div>

                                <div className="campo">
                                    <input
                                    className='inputCampo2'
                                    onChange={e=>{
                                        this.setState({horaVuelta: e.target.value})
                                    }}
                                    value={this.state.horaVuelta}
                                    type="time"
                                    min="01:00" max="00:00" required/>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                    </>
                )
            }
            <button className='botonContinuar' onClick={() => this.setState({ modalOpen: false })}>¡Continuar!</button>
        </>

    render(){
        const { fechaIda, fechaVuelta, horaIda, horaVuelta } = this.state;
        const fechasSelecciondas = (fechaIda && fechaIda !== '') && (fechaVuelta && fechaVuelta !== '');

        console.log(fechasSelecciondas)
        return(
        <div className='wrapper'>
            <div className='contenedorHome col-xs-12'> 
            {
                (ServicioLogin.getLogueado() ?
                    <>
                    <div className='homeTitulo col-xs-12'>
                        <h1 className='titulohome'>Encuentra tu guardián</h1>
                    </div>
                    <div className="formHome col-xs-12">
                    {/* <div className="buscadorHome">
                        <a href="/mapa"><input type="text" className="buscador col-xs-12"/></a>
                    </div> */}
                    <div className="formcalendario col-xs-2">
                        {
                            fechasSelecciondas ? (
                                <p onClick={() => this.setState({ modalOpen: true })}>{`${horaIda}, ${fechaIda} - ${horaVuelta}, ${fechaVuelta}`}</p>
                            ) : (
                                <button onClick={() => this.setState({ modalOpen: true })}>Selecciona fechas</button>
                            )
                        }
                    </div>
                    <div className="botonyNumero">
                            <select className="numeroMaletas" name="NMaletas" placeholder='Nº Maletas'
                                onChange={e=>{
                                    console.log(e.target.value)
                                    this.setState({numeroMaletas: e.target.value})
                                }}>
                                <option defaultValue >Nº de Maletas</option>
                                <option>1</option>
                                <option>2</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
        
                            </select>
                        {/* TODO Falta añadirle el onClick */}
                        {/* <button className='buscarBoton' onClick={this.onClick}><Link className='linkbtn' to="/mapa">Buscar</Link></button> */}
                        <button className='buscarBoton' onClick={this.onClick}>Buscar</button>
                    </div>
                </div>
                </>
            : "")}
        
            <div className="novedades col-xs-12">
                <p className="tituloNovedades">Novedades</p>
                <Carousel id='carrusel'>
                    <Carousel.Item >
                        <div className='itemCarousel w-100'>
                        <img
                        id='imgcarousel'
                        className="d-block"
                        src={require("../assets/imagen02.jpeg")}
                        alt="First slide"
                        />
                        </div>
                        
                    </Carousel.Item>
                    <Carousel.Item >
                    <div className='itemCarousel w-100'>
                        <img
                        id='imgcarousel'
                        className="d-block imgcarousel"
                        src={require("../assets/imagen03.jpg")}
                        alt="Third slide"
                        />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                    <div className='itemCarousel w-100'>
                        <img
                        id='imgcarousel'
                        className="d-block imgcarousel"
                        src={require("../assets/imagen01.jpeg")}
                        alt="Third slide"
                        />
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
            
            <div className="experiencias col-xs-12">
                <p className="tituloExperiencias">Experiencias</p>
                <div className="experiencias">
                    <article className="expArticle">
                        <img className='imagenArticulo' src={require("../assets/groupCopy7@3x.png")}/>
                        <div className="descripcion col-xs-12">
                            <h3 className="tituloarticle">Un pedacito de italia en tu vida</h3>
                            <p> Ut efficitur erat eu dui consequat. In elementum, erat sed aliquet ullamcorper. Donec vitae feugiat varius ac ac mi. Proin in vulputate enim, eget egestas erat. Vivamus tempor at metus ut accumsan. In et arcu vel nisi gravida dignissim vitae nec mi. </p>
                        </div>
                    </article>
                    
                    <article className="expArticle">
                            <div className="descripcion col-xs-12">
                            <img className='imagenArticulo' src={require("../assets/groupCopy8@3x.png")}/>
                                <h3 className="tituloarticle">Un pedacito de italia en tu vida</h3>
                                <p> In elementum, erat sed aliquet ullamcorper, massa lectus mattis ligula. Donec velit feugiat varius ac ac mi. Proin in vulputate enim, eget egestas erat. Nunc eu odio purus. Vivamus tempor at metus ut accumsan. In et arcu vel nisi gravida dignissim vitae nec mi. </p>
                            </div>
                    </article>
                </div>
            </div>
    
        
            </div>

            <Modal
                isOpen={this.state.modalOpen}
            >
                { this.renderModalContent(fechasSelecciondas) }
            </Modal>
    
        </div>
        
        
        )    }
}

export default HomeMaleteo