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
    }

    componentDidMount(){
        // this.setState(this.state)
    }

    onClick(ev){
        ev.preventDefault();

        window.fetch('http://localhost:4000/api/malt/search',{
            method: 'POST',
            body: JSON.stringify({
                "fecha": this.state.fechaIda,
                "maletas":this.state.numeroMaletas
            }), 
            headers: {'Content-Type': 'application/json'}
        }).then((res)=> {
            if (res.status === 200) {
                this.setState(this.state);
           
            } else {
                console.log("Fallo en la busqueda")
            }})
        .catch((vacas)=> 'Pues habra ido mal')
    }

    // renderModalContent = fechasSelecciondas => {
    //     console.log('AAA: ', fechasSelecciondas)
    //     if (!fechasSelecciondas) {
    //         return (
    //             <>
    //                 <input 
    //                     onChange={e => {
    //                         console.log(e.target.value);
    //                         this.setState({ fechaIda: e.target.value })
    //                     }}
    //                     value={this.state.fechaIda}
    //                     className='calendarioHome' 
    //                     placeholder='Ida'
    //                     type="date"
    //                 />
    //                 <input 
    //                     onChange={e => {
    //                         console.log(e.target.value);
    //                         this.setState({ fechaVuelta: e.target.value })
    //                     }}
    //                     value={this.state.fechaVuelta}
    //                     className='calendarioHome' 
    //                     placeholder='Vuelta'
    //                     type="date"
    //                 />
    //                 {/* <button onClick={() => this.setState({ modalOpen: false })}>¡Continuar!</button> */}
    //             </>
    //         )
    //     }
    //     else {
    //         return (
    //             <p>HORITAS</p>
    //         )
    //     }
    // }

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
                    <div className="buscadorHome">
                        <a href="/mapa"><input type="text" className="buscador col-xs-12"/></a>
                    </div>
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
                        
                        <button className='buscarBoton' onClick={this.onClick}><Link className='linkbtn'to="/search">Buscar</Link></button>
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
                        src="https://via.placeholder.com/150x100"
                        alt="First slide"
                        />
                        </div>
                        
                    </Carousel.Item>
                    <Carousel.Item >
                    <div className='itemCarousel w-100'>
                        <img
                        id='imgcarousel'
                        className="d-block imgcarousel"
                        src="https://via.placeholder.com/150x100"
                        alt="Third slide"
                        />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                    <div className='itemCarousel w-100'>
                        <img
                        id='imgcarousel'
                        className="d-block imgcarousel"
                        src="https://via.placeholder.com/150x100"
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
                        <img className='imagenArticulo' src="https://via.placeholder.com/150"/>
                        <div className="descripcion col-xs-12">
                            <h3 className="tituloarticle">Un pedacito de italia en tu vida</h3>
                            <p>Pimpam trucu trucu pim pam lorem ipsum trucu trucu lorem sempen fidelis cucu meca peca lucu trucu trucu</p>
                        </div>
                    </article>
                    
                    <article className="expArticle">
                            <img  className='imagenArticulo' src="https://via.placeholder.com/150" />
                            <div className="descripcion col-xs-12">
                                <h3 className="tituloarticle">Un pedacito de italia en tu vida</h3>
                                <p>Pimpam trucu trucu pim pam lorem ipsum trucu trucu lorem sempen fidelis cucu meca peca lucu trucu trucu</p>
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