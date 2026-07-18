import React from 'react';
import { useNavigate } from 'react-router-dom';
import './estilosJuegos.css';

function TablaJuegos({ juegos, onBorrar }) {
  const navigate = useNavigate();

  const manejarEditar = (juego) => {
   
    navigate(`/editar/${juego.id}`, { state: { juego } });
  };

  return (
    <div className="tabla-contenedor">
      <h2>Lista de Juegos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estudio</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map((juego) => (
            <tr key={juego.id}>
              <td>{juego.nombre}</td>
              <td>{juego.estudio}</td>
              <td>{juego.año}</td>
              <td>
                <button onClick={() => manejarEditar(juego)}>Editar</button>
                <button onClick={() => onBorrar(juego.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaJuegos;