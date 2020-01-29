import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from '../logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

          <nav>
            <Link to="/">Login</Link> - 
            <Link to="/registro"> Registro</Link>
          </nav>
          {/* <Route path="/" exact component={ ListarUsuario }/>
          <Route path="/registro" component={ CrearUsuario }/>
          <Route path="/api/usuarios/edit/:id" component={ EditarUsuario }/> */}
        </header>
      </div>
    </Router>
  );
}

export default App;
