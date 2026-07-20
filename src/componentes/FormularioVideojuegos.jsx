import { useState, useEffect } from 'react';
import "./estilosFormulario.css";

function Formulario({ onGuardar, juegoAEditar, onCancelar }) {


  const fechaActual = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    nombre: '',
    estudio: '',
    año: '',
    precio: '',
    fechaLanzamiento: '',
    sinopsis: '',
    calificacionCritica: ''
  });


  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (juegoAEditar) {
      setFormData(juegoAEditar);
    }
  }, [juegoAEditar]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
    if (errores[e.target.name]) {
      setErrores({ ...errores, [e.target.name]: '' });
    }
  };

  
  const validarFormulario = () => {
    const erroresActivos = {};


    if (!formData.nombre || formData.nombre.trim() === '') {
      erroresActivos.nombre = 'El nombre no puede estar vacío ni contener solo espacios.';
    }

  
    if (!formData.estudio || formData.estudio.trim() === '') {
      erroresActivos.estudio = 'El estudio es obligatorio.';
    }

    
    if (!formData.año) {
      erroresActivos.año = 'El año es obligatorio.';
    }

  
    if (!formData.precio || Number(formData.precio) < 0) {
      erroresActivos.precio = 'Debe ingresar un precio válido.';
    }

    
    if (formData.fechaLanzamiento > fechaActual) {
      erroresActivos.fechaLanzamiento = 'La fecha de lanzamiento no puede ser superior a la fecha actual.';
    }

    
    if (!formData.sinopsis || formData.sinopsis.trim().length < 10 || formData.sinopsis.length > 250) {
      erroresActivos.sinopsis = 'La sinopsis debe tener entre 10 y 250 caracteres.';
    }


    const calificacion = Number(formData.calificacionCritica);
    if (!formData.calificacionCritica || calificacion < 1 || calificacion > 100) {
      erroresActivos.calificacionCritica = 'La calificación de la crítica debe estar estrictamente entre 1 y 100.';
    }

    return erroresActivos;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const erroresActivos = validarFormulario();

    
    if (Object.keys(erroresActivos).length > 0) {
      setErrores(erroresActivos);
      return;
    }

    setErrores({});

    const juegoFinal = { ...juegoAEditar, ...formData };
    onGuardar(juegoFinal);
  };

  return (
    <div className="formulario-contenedor">
      <form onSubmit={handleSubmit} noValidate>
        <h2>{juegoAEditar ? "Editar Videojuego" : "Nuevo Videojuego"}</h2>
        
        <div className="form-group">
          <label>Nombre:</label>
          <input 
            type="text" name="nombre" placeholder="Nombre" 
            value={formData.nombre} onChange={handleChange} 
          />
          {errores.nombre && <span className="error-mensaje" style={{ color: 'red' }}>{errores.nombre}</span>}
        </div>

        <div className="form-group">
          <label>Estudio:</label>
          <input 
            type="text" name="estudio" placeholder="Estudio" 
            value={formData.estudio} onChange={handleChange} 
          />
          {errores.estudio && <span className="error-mensaje" style={{ color: 'red' }}>{errores.estudio}</span>}
        </div>

        <div className="form-group">
          <label>Año:</label>
          <input 
            type="number" name="año" placeholder="Año" 
            value={formData.año} onChange={handleChange} 
          />
          {errores.año && <span className="error-mensaje" style={{ color: 'red' }}>{errores.año}</span>}
        </div>

        <div className="form-group">
          <label>Precio:</label>
          <input 
            type="number" name="precio" placeholder="Precio" 
            value={formData.precio} onChange={handleChange} 
          />
          {errores.precio && <span className="error-mensaje" style={{ color: 'red' }}>{errores.precio}</span>}
        </div>

        <div className="form-group">
          <label>Fecha de Lanzamiento:</label>
          <input 
            type="date" 
            name="fechaLanzamiento" 
            value={formData.fechaLanzamiento} 
            max={fechaActual}
            onChange={handleChange} 
          />
          {errores.fechaLanzamiento && <span className="error-mensaje" style={{ color: 'red' }}>{errores.fechaLanzamiento}</span>}
        </div>

        <div className="form-group">
          <label>Sinopsis / Descripción:</label>
          <textarea 
            name="sinopsis" 
            placeholder="Escribe una reseña corta..." 
            value={formData.sinopsis} 
            onChange={handleChange} 
            rows="4"
          />
          <small>{formData.sinopsis.length}/250 caracteres</small>
          {errores.sinopsis && <span className="error-mensaje" style={{ color: 'red' }}>{errores.sinopsis}</span>}
        </div>

        <div className="form-group">
          <label>Calificación de la Crítica (1 - 100):</label>
          <input 
            type="number" 
            name="calificacionCritica" 
            placeholder="Ej. 85" 
            value={formData.calificacionCritica} 
            onChange={handleChange} 
          />
          {errores.calificacionCritica && <span className="error-mensaje" style={{ color: 'red' }}>{errores.calificacionCritica}</span>}
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