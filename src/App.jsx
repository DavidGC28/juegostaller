import { useState } from 'react'
import TablaJuegos from './componentes/tablaJuegos';
import data from './data/juegos';
import "./App.css";

function App() {
const [juegos, setJuegos] = useState(data[0]);

  return (
    <div className="App-contenedor">
      <h1>Tienda de Videojuegos</h1>
      <TablaJuegos juegos={juegos} />
    </div>
  );
}

export default App;
