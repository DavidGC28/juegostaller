import { useState } from 'react';
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
    <div className="App-contenedor">
      <Navbar onCambiarVista={setVista} />

      {vista === 'tabla' ? (
        <TablaJuegos 
          juegos={juegos} 
          onBorrar={eliminarJuego} 
          onEditar={editarJuego} 
        />
      ) : vista === 'formulario' ? (
        <Formulario 
          juegoAEditar={juegoAEditar} 
          onGuardar={guardarCambios} 
          onCancelar={() => { setJuegoAEditar(null); setVista('tabla'); }} 
        />
      ) : (
        <PaginaNoEncontrada />
      )}
    </div>
  );
}

export default App;