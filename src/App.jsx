import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './componentes/navbar.jsx'; 
import TablaJuegos from './componentes/tablaJuegos.jsx';
import Formulario from './componentes/FormularioVideojuegos.jsx';
import PaginaNoEncontrada from './componentes/Paginanoencontrada.jsx';
import dataInicial from './data/juegos.js';
import "./App.css";


function App() {
  const [juegos, setJuegos] = useState(dataInicial);
  const [vista, setVista] = useState('tabla');
  const [juegoAEditar, setJuegoAEditar] = useState(null);

  const eliminarJuego = (id) => {
    setJuegos(juegos.filter(j => j.id !== id));
  };

  const editarJuego = (juego) => {
    setJuegoAEditar(juego);
    setVista('formulario');
  };
  const guardarCambios = (juego) => {
    if (juego.id) {
      setJuegos(juegos.map(j => (j.id === juego.id ? juego : j)));
    } else {
      setJuegos([...juegos, { ...juego, id: Date.now() }]);
    }
    setJuegoAEditar(null);
    setVista('tabla');
  };

  return (
    <BrowserRouter>
      <div className="App-contenedor">
        <Navbar />
        <Routes>
          <Route path="/" element={<TablaJuegos juegos={juegos} onBorrar={eliminarJuego} />} />
          <Route path="/nuevo" element={<Formulario onGuardar={guardarCambios} />} />
          <Route path="/editar/:id" element={<Formulario onGuardar={guardarCambios} />} />
          <Route path="/nuevo" element={<Formulario onGuardar={guardarCambios} />} />
          <Route path="/editar/:id" element={<Formulario onGuardar={guardarCambios} />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;