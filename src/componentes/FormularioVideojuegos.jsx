import { useState, useEffect } from 'react';
import "./estilosFormulario.css";

function Formulario({ onGuardar, juegoAEditar, onCancelar }) {

  const [formData, setFormData] = useState({
    nombre: '',
    estudio: '',
    año: '',
    precio: ''
  });

  useEffect(() => {
    if (juegoAEditar) {
      setFormData(juegoAEditar);
    }
  }, [juegoAEditar]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- CORRECCIÓN AQUÍ ---
  const handleSubmit = (e) => {
    e.preventDefault();
    // Combinamos el juego original (para mantener el ID) con los nuevos datos
    const juegoFinal = { ...juegoAEditar, ...formData };
    onGuardar(juegoFinal);
  };
  // -----------------------

  return (
    <div className="formulario-contenedor">
      {/* Usamos handleSubmit como referencia */}
      <form onSubmit={handleSubmit}>
        <h2>{juegoAEditar ? "Editar Videojuego" : "Nuevo Videojuego"}</h2>
        
        <div className="form-group">
          <label>Nombre:</label>
          <input 
            type="text" name="nombre" placeholder="Nombre" 
            value={formData.nombre} onChange={handleChange} required 
          />
        </div>

        <div className="form-group">
          <label>Estudio:</label>
          <input 
            type="text" name="estudio" placeholder="Estudio" 
            value={formData.estudio} onChange={handleChange} required 
          />
        </div>

        <div className="form-group">
          <label>Año:</label>
          <input 
            type="number" name="año" placeholder="Año" 
            value={formData.año} onChange={handleChange} required 
          />
        </div>

        <div className="form-group">
          <label>Precio:</label>
          <input 
            type="number" name="precio" placeholder="Precio" 
            value={formData.precio} onChange={handleChange} required 
          />
        </div>

        <div className="botones-grupo">
          <button type="submit" className="btn-guardar">Guardar</button>
          <button type="button" className="btn-cancelar" onClick={onCancelar}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default Formulario;