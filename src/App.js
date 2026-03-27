// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Generos from "./components/Generos";
import Directores from "./components/Directores";
import Productoras from "./components/Productoras";
import Tipos from "./components/Tipos";
import Medias from "./components/Medias";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Barra de navegación */}
        <nav className="navbar">
          <h1>🎬 Películas App</h1>
          <div className="nav-links">
            <Link to="/">Media</Link>
            <Link to="/generos">Géneros</Link>
            <Link to="/directores">Directores</Link>
            <Link to="/productoras">Productoras</Link>
            <Link to="/tipos">Tipos</Link>
          </div>
        </nav>

        {/* Rutas */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Medias />} />
            <Route path="/generos" element={<Generos />} />
            <Route path="/directores" element={<Directores />} />
            <Route path="/productoras" element={<Productoras />} />
            <Route path="/tipos" element={<Tipos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
