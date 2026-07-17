import "./estilosJuegos.css";


function Videojuegos({ juegos, onEditar, onBorrar }) {

  
  return (
    <div className="container">
      <h1>Videojuegos de Pelea</h1>
      <p>Catálogo de títulos disponibles</p>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estudio</th>
            <th>Año</th>
            <th>Precio</th>
            <th>Acciones / Progreso</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map((juego) => (
            <tr key={juego.id}>
              <td data-label="Nombre">{juego.nombre}</td>
              <td data-label="Estudio">{juego.estudio}</td>
              <td data-label="Año">{juego.año}</td>
              <td data-label="Precio">${juego.precio}</td>
              <td data-label="Acciones">
                {/* Contenedor de la barra de carga */}
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: '75%' }}></div>
                </div>
                <div className="button-group">
                  <button onClick={() => onEditar(juego)}>Editar</button>
                  <button onClick={() => onBorrar(juego.id)}>Borrar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Videojuegos;