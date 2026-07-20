import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/navbar.jsx'; 
import TablaJuegos from './componentes/tablaJuegos.jsx';
import Formulario from './componentes/FormularioVideojuegos.jsx'; 
import PaginaNoEncontrada from './componentes/Paginanoencontrada.jsx';
import dataInicial from './data/juegos.js';
import "./App.css";

// --- COMPONENTE INTEGRADO DIRECTAMENTE AQUÍ PARA EVITAR ERRORES DE RUTA ---
function AlertaNotificacion({ mensaje, onCerrar }) {
  useEffect(() => {
    const temporizador = setTimeout(() => {
      if (onCerrar) {
        onCerrar();
      }
    }, 3000);
    return () => clearTimeout(temporizador);
  }, [onCerrar]);

  if (!mensaje) return null;

  return (
    <div className="alerta-flotante">
      <span>{mensaje}</span>
    </div>
  );
}

function App() {
  const [juegos, setJuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");
    return datosGuardados ? JSON.parse(datosGuardados) : dataInicial;
  });

  const [vista, setVista] = useState('tabla');
  const [juegoAEditar, setJuegoAEditar] = useState(null);
  const [alertaMensaje, setAlertaMensaje] = useState('');

  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(juegos));
  }, [juegos]);

  const eliminarJuego = (id) => {
    setJuegos(juegos.filter(j => j.id !== id));
    setAlertaMensaje('¡Videojuego eliminado con éxito!'); 
  };

  const editarJuego = (juego) => {
    setJuegoAEditar(juego);
    setVista('formulario');
  };

  const guardarCambios = (juego) => {
    const esEdicion = Boolean(juego.id);

    if (esEdicion) {
      setJuegos(juegos.map(j => (j.id === juego.id ? juego : j)));
      setAlertaMensaje('¡Videojuego actualizado con éxito!'); 
    } else {
      setJuegos([...juegos, { ...juego, id: Date.now() }]);
      setAlertaMensaje('¡Videojuego creado con éxito!'); 
    }

    setJuegoAEditar(null);
    setVista('tabla');
  };

  return (
    <BrowserRouter>
      <div className="App-contenedor">
        <AlertaNotificacion 
          mensaje={alertaMensaje} 
          onCerrar={() => setAlertaMensaje('')} 
        />

        <Navbar />
        <Routes>
          <Route path="/" element={<TablaJuegos juegos={juegos} onBorrar={eliminarJuego} />} />
          <Route path="/nuevo" element={<Formulario onGuardar={guardarCambios} />} />
          <Route path="/editar/:id" element={<Formulario onGuardar={guardarCambios} />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;